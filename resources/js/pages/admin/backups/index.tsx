import { Head, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import {
    Download,
    Trash2,
    RotateCcw,
    Plus,
    HardDrive,
    AlertTriangle,
    CheckCircle2,
    Loader2,
    Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Backup {
    filename: string;
    size: number;
    size_formatted: string;
    created_at: string;
    download_url: string;
}

interface BackupsIndexProps {
    backups: Backup[];
}

export default function BackupsIndex({ backups }: BackupsIndexProps) {
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [restoring, setRestoring] = useState<string | null>(null);
    const [uploadRestoring, setUploadRestoring] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [restoreTarget, setRestoreTarget] = useState<string | null>(null);
    const [uploadRestoreTarget, setUploadRestoreTarget] = useState(false);
    const [uploadFileName, setUploadFileName] = useState<string | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [statusMessage, setStatusMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const reloadBackups = () => {
        setLoading(true);
        router.reload({ only: ['backups'], onFinish: () => setLoading(false) });
    };

    const createBackup = async () => {
        setCreating(true);
        setStatusMessage(null);
        try {
            const response = await fetch('/admin/backups', {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '' },
            });
            const data = await response.json();
            if (response.ok) {
                setStatusMessage({ type: 'success', text: 'Backup created successfully!' });
                reloadBackups();
            } else {
                setStatusMessage({ type: 'error', text: data.message || 'Backup failed' });
            }
        } catch {
            setStatusMessage({ type: 'error', text: 'Failed to create backup' });
        } finally {
            setCreating(false);
        }
    };

    const downloadBackup = (backup: Backup) => {
        const link = document.createElement('a');
        link.href = `/admin/backups/download/${encodeURIComponent(backup.filename)}`;
        link.download = backup.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const deleteBackup = async () => {
        if (!deleteTarget) return;
        try {
            const response = await fetch(`/admin/backups/${encodeURIComponent(deleteTarget)}`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '' },
            });
            if (response.ok) {
                setStatusMessage({ type: 'success', text: 'Backup deleted' });
                reloadBackups();
            } else {
                setStatusMessage({ type: 'error', text: 'Failed to delete backup' });
            }
        } catch {
            setStatusMessage({ type: 'error', text: 'Failed to delete backup' });
        } finally {
            setDeleteTarget(null);
        }
    };

    const restoreBackup = async () => {
        if (!restoreTarget) return;
        setRestoring(restoreTarget);
        setStatusMessage(null);
        try {
            const response = await fetch(`/admin/backups/restore/${encodeURIComponent(restoreTarget)}`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '' },
            });
            const data = await response.json();
            if (response.ok) {
                setStatusMessage({ type: 'success', text: 'Backup restored successfully! The page will now reload...' });
                setTimeout(() => window.location.reload(), 2000);
            } else {
                setStatusMessage({ type: 'error', text: data.message || 'Restore failed' });
            }
        } catch {
            setStatusMessage({ type: 'error', text: 'Failed to restore backup' });
        } finally {
            setRestoring(null);
            setRestoreTarget(null);
        }
    };

    const uploadAndRestore = async () => {
        if (!uploadFile) return;

        setUploadRestoring(true);
        setStatusMessage(null);

        try {
            const formData = new FormData();
            formData.append('backup_file', uploadFile);

            const response = await fetch('/admin/backups/upload-restore', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]')?.getAttribute('content') ?? '',
                },
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                setStatusMessage({ type: 'success', text: 'Backup restored successfully from uploaded file! Reloading...' });
                setUploadRestoreTarget(false);
                setUploadFileName(null);
                setUploadFile(null);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                setStatusMessage({ type: 'error', text: data.message || 'Upload restore failed' });
                setUploadRestoreTarget(false);
                setUploadFileName(null);
                setUploadFile(null);
            }            } catch (err) {
            const message = err instanceof TypeError && err.message.includes('JSON')
                ? 'Upload failed. The file may exceed server size limits (max 500MB).'
                : 'Failed to upload and restore backup';
            setStatusMessage({ type: 'error', text: message });
            setUploadRestoreTarget(false);
            setUploadFileName(null);
            setUploadFile(null);
        } finally {
            setUploadRestoring(false);
        }
    };

    return (
        <div className="p-8">
            <Head title="Backup & Restore" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Backup & Restore
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage database and file backups. Backups include the database, uploaded files, and .env configuration.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadRestoring}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload & Restore
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".zip,.tar.gz"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setUploadFileName(file.name);
                                setUploadFile(file);
                                setUploadRestoreTarget(true);
                            }
                            // Reset so the same file can be selected again
                            e.target.value = '';
                        }}
                    />
                    <Button onClick={createBackup} disabled={creating}>
                        {creating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Plus className="mr-2 h-4 w-4" />
                        )}
                        {creating ? 'Creating...' : 'Create Backup'}
                    </Button>
                </div>
            </div>

            {statusMessage && (
                <div
                    className={`mb-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
                        statusMessage.type === 'success'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                            : 'border-red-200 bg-red-50 text-red-800'
                    }`}
                >
                    {statusMessage.type === 'success' ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                    )}
                    {statusMessage.text}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <HardDrive className="h-5 w-5" />
                        Backup Archives
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            <span className="ml-3 text-muted-foreground">
                                Reloading backups...
                            </span>
                        </div>
                    ) : backups.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Filename</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {backups.map((backup) => (
                                    <TableRow key={backup.filename}>
                                        <TableCell className="font-mono text-sm">
                                            {backup.filename}
                                        </TableCell>
                                        <TableCell>
                                            {backup.size_formatted}
                                        </TableCell>
                                        <TableCell>
                                            {backup.created_at}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        downloadBackup(backup)
                                                    }
                                                >
                                                    <Download className="mr-1 h-4 w-4" />
                                                    Download
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() =>
                                                        setRestoreTarget(
                                                            backup.filename,
                                                        )
                                                    }
                                                    disabled={
                                                        restoring ===
                                                        backup.filename
                                                    }
                                                >
                                                    {restoring ===
                                                    backup.filename ? (
                                                        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <RotateCcw className="mr-1 h-4 w-4" />
                                                    )}
                                                    Restore
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        setDeleteTarget(
                                                            backup.filename,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="mr-1 h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <HardDrive className="mb-4 h-12 w-12 text-muted-foreground/40" />
                            <h3 className="text-lg font-semibold">
                                No backups yet
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Create your first backup to protect your data.
                            </p>
                            <Button
                                onClick={createBackup}
                                disabled={creating}
                                className="mt-4"
                            >
                                {creating ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Plus className="mr-2 h-4 w-4" />
                                )}
                                Create Backup
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Delete Backup
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong className="font-mono">{deleteTarget}</strong>
                            ? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteTarget(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={deleteBackup}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Upload & Restore Confirmation Dialog */}
            <Dialog
                open={uploadRestoreTarget}
                onOpenChange={(open) => {
                    if (!open) {
                        setUploadRestoreTarget(false);
                        setUploadFileName(null);
                        setUploadFile(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Upload className="h-5 w-5 text-amber-500" />
                            Upload & Restore Backup
                        </DialogTitle>
                        <DialogDescription>
                            <div className="space-y-3">
                                <p>
                                    You are about to restore from{' '}
                                    <strong className="font-mono">
                                        {uploadFileName}
                                    </strong>
                                    .
                                </p>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800 text-sm">
                                    <strong>⚠️ This will overwrite:</strong>
                                    <ul className="mt-1 ml-4 list-disc space-y-1">
                                        <li>
                                            The entire database (all tables)
                                        </li>
                                        <li>
                                            Uploaded files in storage/app/public
                                        </li>
                                    </ul>
                                </div>
                                <p>
                                    This action cannot be undone. Consider
                                    creating a backup first.
                                </p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setUploadRestoreTarget(false);
                                setUploadFileName(null);
                                setUploadFile(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            className="bg-amber-600 hover:bg-amber-700"
                            onClick={uploadAndRestore}
                            disabled={uploadRestoring}
                        >
                            {uploadRestoring ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Upload className="mr-2 h-4 w-4" />
                            )}
                            Upload & Restore
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Restore Confirmation Dialog (from existing backup) */}
            <Dialog
                open={!!restoreTarget}
                onOpenChange={(open) => !open && setRestoreTarget(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Restore Backup
                        </DialogTitle>
                        <DialogDescription>
                            <div className="space-y-3">
                                <p>
                                    You are about to restore{' '}
                                    <strong className="font-mono">
                                        {restoreTarget}
                                    </strong>
                                    .
                                </p>
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800 text-sm">
                                    <strong>⚠️ This will overwrite:</strong>
                                    <ul className="mt-1 ml-4 list-disc space-y-1">
                                        <li>
                                            The entire database (all tables)
                                        </li>
                                        <li>
                                            Uploaded files in storage/app/public
                                        </li>
                                    </ul>
                                </div>
                                <p>
                                    This action cannot be undone. Consider
                                    creating a backup first.
                                </p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setRestoreTarget(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            className="bg-amber-600 hover:bg-amber-700"
                            onClick={restoreBackup}
                            disabled={restoring === restoreTarget}
                        >
                            {restoring === restoreTarget ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <RotateCcw className="mr-2 h-4 w-4" />
                            )}
                            Restore Backup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
