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

interface BedAvailability {
    id: number;
    total_beds: number;
    available_beds: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    beds: BedAvailability[];
}

export default function Index({ beds }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this bed availability?')) {
            destroy(`/admin/bed-availability/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Bed Availability" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Bed Availability
                </h1>
                <Button asChild>
                    <a href="/admin/bed-availability/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Bed Availability
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Bed Availability Records</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Total Beds</TableHead>
                                <TableHead>Available Beds</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {beds.length > 0 ? (
                                beds.map((bed) => (
                                    <TableRow key={bed.id}>
                                        <TableCell className="font-medium">
                                            {bed.total_beds}
                                        </TableCell>
                                        <TableCell>
                                            {bed.available_beds}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`rounded px-2 py-1 text-sm ${
                                                    bed.status === 'Good'
                                                        ? 'bg-green-100 text-green-800'
                                                        : bed.status ===
                                                            'Limited'
                                                          ? 'bg-yellow-100 text-yellow-800'
                                                          : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {bed.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                bed.updated_at,
                                            ).toLocaleString()}
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/bed-availability/${bed.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(bed.id)
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
                                        colSpan={5}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No bed availability records found.
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
