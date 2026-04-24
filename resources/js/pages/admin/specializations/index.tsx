import { Head, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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

interface Specialization {
    id: number;
    name: string;
    image: string | null;
    description: string | null;
}

interface Props {
    specializations: Specialization[];
}

export default function Index({ specializations }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this specialization?')) {
            destroy(`/admin/specializations/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Specializations" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Specializations
                </h1>
                <Button asChild>
                    <a href="/admin/specializations/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Specialization
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Specializations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Name
                                </TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {specializations.length > 0 ? (
                                specializations.map((spec) => (
                                    <TableRow key={spec.id}>
                                        <TableCell className="font-medium">
                                            {spec.name}
                                        </TableCell>
                                        <TableCell>
                                            {spec.image || 'No image'}
                                        </TableCell>
                                        <TableCell>
                                            {spec.description ||
                                                'No description'}
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/specializations/${spec.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(spec.id)
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
                                        colSpan={4}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No specializations found.
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