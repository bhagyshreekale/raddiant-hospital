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

interface InsurancePartner {
    id: number;
    name: string;
    category: 'public' | 'private' | 'tpa';
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
            destroy(`/admin/insurance-partners/${id}`);
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
                                <TableHead>Category</TableHead>
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
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize ${
                                                partner.category === 'public' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : partner.category === 'private'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-purple-100 text-purple-800'
                                            }`}>
                                                {partner.category === 'tpa' ? 'TPA Agency' : `${partner.category} Sector`}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {partner.logo ? (
                                                <img 
                                                    src={partner.logo} 
                                                    alt={partner.name}
                                                    className="h-10 w-10 object-contain"
                                                />
                                            ) : (
                                                'No logo'
                                            )}
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
