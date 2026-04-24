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

interface HealthPackage {
    id: number;
    name: string;
    price: number;
    features: string[];
    is_featured: boolean;
}

interface Props {
    packages: HealthPackage[];
}

export default function Index({ packages }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this health package?')) {
            destroy(`/admin/health-packages/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Health Packages" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Health Packages
                </h1>
                <Button asChild>
                    <a href="/admin/health-packages/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Health Package
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Health Packages</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Name
                                </TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Featured</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {packages.length > 0 ? (
                                packages.map((pkg) => (
                                    <TableRow key={pkg.id}>
                                        <TableCell className="font-medium">
                                            {pkg.name}
                                        </TableCell>
                                        <TableCell>
                                            ₹{Number(pkg.price).toFixed(0)}
                                        </TableCell>
                                        <TableCell>
                                            {pkg.is_featured ? (
                                                <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-700">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/health-packages/${pkg.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(pkg.id)
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
