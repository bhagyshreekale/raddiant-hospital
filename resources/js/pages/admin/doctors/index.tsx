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

interface Doctor {
    id: number;
    name: string;
    specialization_id: number | null;
    specialization: { name: string } | null;
    education: string | null;
    image: string | null;
    availability: string | null;
}

interface Props {
    doctors: Doctor[];
}

export default function Index({ doctors }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this doctor?')) {
            destroy(`/admin/doctors/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Doctors" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Doctors</h1>
                <Button asChild>
                    <a href="/admin/doctors/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Doctor
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Doctors</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Name
                                </TableHead>
                                <TableHead>Specialization</TableHead>
                                <TableHead>Education</TableHead>
                                <TableHead>Availability</TableHead>
                                <TableHead className="w-[100px]">
                                    Photo
                                </TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {doctors.length > 0 ? (
                                doctors.map((doctor) => (
                                    <TableRow key={doctor.id}>
                                        <TableCell className="font-medium">
                                            {doctor.name}
                                        </TableCell>
                                        <TableCell>
                                            {doctor.specialization?.name ||
                                                'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {doctor.education || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {doctor.availability || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {doctor.image ? (
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">No img</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/doctors/${doctor.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(doctor.id)
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
                                        No doctors found.
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
