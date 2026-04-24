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

interface Appointment {
    id: number;
    full_name: string;
    phone: string;
    email: string | null;
    age: number | null;
    gender: string | null;
    visit_type: string;
    specialization_id: number | null;
    specialization: { name: string } | null;
    doctor_id: number | null;
    doctor: { name: string } | null;
    preferred_date: string;
    time_slot: string;
    description: string | null;
}

interface Props {
    appointments: Appointment[];
}

export default function Index({ appointments }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this appointment?')) {
            destroy(`/admin/appointments/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Appointments" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Appointments
                </h1>
                <Button asChild>
                    <a href="/admin/appointments/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Appointment
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">
                                    Patient Name
                                </TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Visit Type</TableHead>
                                <TableHead>Specialization</TableHead>
                                <TableHead>Doctor</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.length > 0 ? (
                                appointments.map((apt) => (
                                    <TableRow key={apt.id}>
                                        <TableCell className="font-medium">
                                            {apt.full_name}
                                        </TableCell>
                                        <TableCell>{apt.phone}</TableCell>
                                        <TableCell>{apt.visit_type}</TableCell>
                                        <TableCell>
                                            {apt.specialization?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {apt.doctor?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {apt.preferred_date}
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/appointments/${apt.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(apt.id)
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
                                        colSpan={7}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No appointments found.
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
