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

interface Testimonial {
    id: number;
    patient_name: string;
    specialization_id: number | null;
    specialization: { name: string } | null;
    patient_type: string | null;
    description: string;
    profile_image: string | null;
}

interface Props {
    testimonials: Testimonial[];
}

export default function Index({ testimonials }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            destroy(`/admin/testimonials/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Testimonials" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Testimonials
                </h1>
                <Button asChild>
                    <a href="/admin/testimonials/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Testimonials</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Patient Name
                                </TableHead>
                                <TableHead>Specialization</TableHead>
                                <TableHead>Patient Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.length > 0 ? (
                                testimonials.map((testimonial) => (
                                    <TableRow key={testimonial.id}>
                                        <TableCell className="font-medium">
                                            {testimonial.patient_name}
                                        </TableCell>
                                        <TableCell>
                                            {testimonial.specialization?.name ||
                                                'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {testimonial.patient_type || 'N/A'}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {testimonial.description}
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/testimonials/${testimonial.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(testimonial.id)
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
                                        No testimonials found.
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
