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

interface Role {
    id: number;
    name: string;
    description: string | null;
    permissions_count: number;
    users_count: number;
    created_at: string;
}

interface Props {
    roles: Role[];
}

export default function Index({ roles }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (name === 'Super Admin' || name === 'Admin' || name === 'Receptionist') {
            alert('Cannot delete system role.');
            return;
        }
        if (confirm('Are you sure you want to delete this role?')) {
            destroy(`/admin/roles/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Roles" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Roles</h1>
                <Button asChild>
                    <Link href="/admin/roles/create">
                        <Plus className="mr-2 h-4 w-4" /> Create Role
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Roles</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead>Users</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.length > 0 ? (
                                roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">
                                            {role.name}
                                            {['Super Admin', 'Admin', 'Receptionist'].includes(role.name) && (
                                                <Badge variant="secondary" className="ml-2">
                                                    System
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {role.description || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{role.permissions_count}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{role.users_count}</Badge>
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/roles/${role.id}/edit`}>
                                                    <Pencil className="mr-1 h-4 w-4" /> Edit
                                                </Link>
                                            </Button>
                                            {!['Super Admin', 'Admin', 'Receptionist'].includes(role.name) && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(role.id, role.name)}
                                                >
                                                    <Trash2 className="mr-1 h-4 w-4" /> Delete
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No roles found.
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