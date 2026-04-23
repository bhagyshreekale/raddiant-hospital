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

interface JobApplication {
    id: number;
    job_id: number;
    career: { title: string } | null;
    full_name: string;
    email: string;
    phone: string;
    experience: string | null;
    resume_url: string;
}

interface Props {
    applications: JobApplication[];
}

export default function Index({ applications }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this application?')) {
            destroy(`/job-applications/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Job Applications" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Job Applications
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Job Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">
                                    Applicant Name
                                </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Job Title</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead>Resume</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell className="font-medium">
                                            {app.full_name}
                                        </TableCell>
                                        <TableCell>{app.email}</TableCell>
                                        <TableCell>{app.phone}</TableCell>
                                        <TableCell>
                                            {app.career?.title || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            {app.experience || 'N/A'}
                                        </TableCell>
                                        <TableCell>
                                            <a
                                                href={app.resume_url}
                                                target="_blank"
                                                className="text-blue-600 underline"
                                            >
                                                View
                                            </a>
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(app.id)
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
                                        No job applications found.
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
