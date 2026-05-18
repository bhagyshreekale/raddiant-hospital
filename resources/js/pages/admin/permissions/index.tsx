import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Permission {
    id: number;
    name: string;
    slug: string;
    group: string;
    roles_count: number;
}

interface Props {
    groupedPermissions: Record<string, Permission[]>;
}

export default function Index({ groupedPermissions }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            destroy(`/admin/permissions/${id}`);
        }
    };

    const groupNames = Object.keys(groupedPermissions).sort();

    return (
        <div className="p-8">
            <Head title="Manage Permissions" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Permissions</h1>
                <Button asChild>
                    <Link href="/admin/permissions/create">
                        <Plus className="mr-2 h-4 w-4" /> Create Permission
                    </Link>
                </Button>
            </div>

            {groupNames.length > 0 ? (
                <div className="space-y-6">
                    {groupNames.map((group) => (
                        <Card key={group}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="capitalize">{group}</span>
                                    <Badge variant="outline">
                                        {groupedPermissions[group]?.length || 0} permissions
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[300px]">Name</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Roles</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {groupedPermissions[group]?.map((permission) => (
                                            <TableRow key={permission.id}>
                                                <TableCell className="font-medium">{permission.name}</TableCell>
                                                <TableCell className="font-mono text-sm text-muted-foreground">
                                                    {permission.slug}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{permission.roles_count}</Badge>
                                                </TableCell>
                                                <TableCell className="space-x-2 text-right">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/permissions/${permission.id}/edit`}>
                                                            <Pencil className="mr-1 h-4 w-4" /> Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(permission.id)}
                                                        disabled={permission.roles_count > 0}
                                                    >
                                                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-10 text-center text-muted-foreground">
                        No permissions found.
                    </CardContent>
                </Card>
            )}
        </div>
    );
}