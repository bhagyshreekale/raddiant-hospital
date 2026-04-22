import { Head, useForm } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface InsurancePartner {
    id: number;
    name: string;
    logo: string | null;
}

interface Props {
    partners: InsurancePartner[];
}

export default function Index({ partners }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (
            confirm('Are you sure you want to delete this insurance partner?')
        ) {
            destroy(`/insurance-partners/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Insurance Partners" />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Insurance Partners
                </h1>
                <Button asChild>
                    <a href="/admin/insurance-partners/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Insurance Partner
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Insurance Partners</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Name
                                </TableHead>
                                <TableHead>Logo</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partners.length > 0 ? (
                                partners.map((partner) => (
                                    <TableRow key={partner.id}>
                                        <TableCell className="font-medium">
                                            {partner.name}
                                        </TableCell>
                                        <TableCell>
                                            {partner.logo || 'No logo'}
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`/admin/insurance-partners/${partner.id}/edit`}
                                                >
                                                    <Pencil className="mr-1 h-4 w-4" />{' '}
                                                    Edit
                                                </a>
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(partner.id)
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
                                        colSpan={3}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No insurance partners found.
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
