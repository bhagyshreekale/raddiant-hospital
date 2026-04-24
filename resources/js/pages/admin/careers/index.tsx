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

interface Career {
    id: number;
    specialization: string | null;
    title: string;
    salary: string | null;
    location: string;
    job_type: string;
    experience: string | null;
    description: string;
}

interface Props {
    careers: Career[];
}

export default function Index({ careers }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this career?')) {
            destroy(`/admin/careers/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Careers" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Careers</h1>
                <Button asChild>
                    <a href="/admin/careers/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Career
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Careers</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Title
                                </TableHead>
                                <TableHead>Specialization</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Job Type</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {careers.length > 0 ? (
                                careers.map((career) => (
                                    <TableRow key={career.id}>
                                        <TableCell className="font-medium">
                                            {career.title}
                                        </TableCell>
                                        <TableCell>
                                            {career.specialization || 'N/A'}
                                        </TableCell>
                                        <TableCell>{career.location}</TableCell>
                                        <TableCell>{career.job_type}</TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/careers/${career.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(career.id)
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
                                        No careers found.
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
