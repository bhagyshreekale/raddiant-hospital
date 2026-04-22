import { Head, useForm } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Admin {
    id: number;
    username: string;
    created_at: string;
}

interface Props {
    admins: Admin[];
}

export default function Index({ admins }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this admin?')) {
            destroy(`/admins/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Admins" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Admins</h1>
                <Button asChild>
                    <a href="/admin/admins/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Admin
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Admins</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Username
                                </TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {admins.length > 0 ? (
                                admins.map((admin) => (
                                    <TableRow key={admin.id}>
                                        <TableCell className="font-medium">
                                            {admin.username}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                admin.created_at,
                                            ).toLocaleString()}
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/admins/${admin.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(admin.id)
                                                }
                                            >
                                                <Trash2 className="mr-1 h-4 w-4" />{' '}
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No admins found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
