import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';

interface Permission {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    role: {
        id: number;
        name: string;
        description: string | null;
    };
    groupedPermissions: Record<string, Permission[]>;
    assignedPermissionIds: number[];
}

export default function Edit({ role, groupedPermissions, assignedPermissionIds }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        description: role.description || '',
        permission_ids: assignedPermissionIds,
    });

    const handlePermissionToggle = (permissionId: number) => {
        const current = data.permission_ids || [];
        const updated = current.includes(permissionId)
            ? current.filter((id) => id !== permissionId)
            : [...current, permissionId];
        setData('permission_ids', updated);
    };

    const handleSelectAll = (group: string, select: boolean) => {
        const groupPerms = groupedPermissions[group] || [];
        const groupIds = groupPerms.map((p) => p.id);
        const current = data.permission_ids || [];

        if (select) {
            const merged = [...new Set([...current, ...groupIds])];
            setData('permission_ids', merged);
        } else {
            const filtered = current.filter((id) => !groupIds.includes(id));
            setData('permission_ids', filtered);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`);
    };

    return (
        <div className="p-8">
            <Head title="Edit Role" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Edit Role</h1>
            </div>

            <div className="max-w-4xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Role Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <a href="/admin/roles">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {Object.keys(groupedPermissions).length > 0 ? (
                            <div className="space-y-6">
                                {Object.entries(groupedPermissions).map(([group, permissions]) => {
                                    const groupIds = permissions.map((p) => p.id);
                                    const selectedCount = (data.permission_ids || []).filter((id) => groupIds.includes(id)).length;

                                    return (
                                        <div key={group} className="border-b pb-4 last:border-0">
                                            <div className="mb-3 flex items-center justify-between">
                                                <h3 className="font-medium capitalize">{group}</h3>
                                                <div className="space-x-2">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleSelectAll(group, true)}
                                                    >
                                                        Select All ({selectedCount}/{permissions.length})
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleSelectAll(group, false)}
                                                    >
                                                        Deselect All
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                                                {permissions.map((permission) => (
                                                    <label
                                                        key={permission.id}
                                                        className="flex items-center gap-2 rounded border p-2 hover:bg-muted cursor-pointer"
                                                    >
                                                        <Checkbox
                                                            checked={(data.permission_ids || []).includes(permission.id)}
                                                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                                                        />
                                                        <span className="text-sm">{permission.slug}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No permissions available.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}