import { Head, useForm, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react'; // Using router for Delete
import { Pencil, Mail, Phone, MapPin, ExternalLink, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

interface Contact {
    id: number;
    email: string;
    phone: string;
    address: string;
    open_hours: string;
    map_link: string;
}

interface Props {
    contacts: Contact[];
}

export default function Index({ contacts }: Props) {
    
    // DELETE FUNCTION
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this contact?")) {
            router.delete(`/admin/contact-settings/${id}`);
        }
    };

    return (
        <div className="p-8 space-y-6">
            <Head title="Contact Settings" />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Contact Management</h1>
                    <p className="text-muted-foreground text-sm">Update clinic locations and communication channels.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Public Contact Points</CardTitle>
                    <CardDescription>This information is visible to all website visitors.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Communication</TableHead>
                                <TableHead>Address & Hours</TableHead>
                                <TableHead>Map Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.length > 0 ? (
                                contacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell className="space-y-1">
                                            <div className="flex items-center text-sm font-medium">
                                                <Mail className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                                {contact.email}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Phone className="mr-2 h-3.5 w-3.5" />
                                                {contact.phone}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="max-w-[300px] truncate text-sm">
                                                <span className="font-semibold text-xs uppercase text-muted-foreground block">Address:</span>
                                                {contact.address}
                                            </div>
                                            <div className="mt-1">
                                                <Badge variant="secondary" className="font-normal">
                                                    {contact.open_hours}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {contact.map_link ? (
                                                <a 
                                                    href={contact.map_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-xs text-blue-600 hover:underline"
                                                >
                                                    <MapPin className="mr-1 h-3 w-3" /> View Map <ExternalLink className="ml-1 h-2 w-2" />
                                                </a>
                                            ) : (
                                                <span className="text-xs text-muted-foreground italic">No link set</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {/* EDIT BUTTON: Opens the info */}
                                     {/* Inside your contacts.map((contact) => ( ... )) */}

<Button variant="outline" size="sm" asChild>
    <Link href={`/admin/contact-settings/${contact.id}/edit`}>
        <Pencil className="h-4 w-4 mr-2" /> Edit Info
    </Link>
</Button>

                                            {/* DELETE BUTTON */}
                                        <Button 
        variant="destructive" 
        size="sm" 
        onClick={() => {
            if(confirm('Delete?')) {
                // ADD THE LEADING SLASH HERE TOO
                router.delete(`/admin/contact-settings/${contact.id}`);
            }
        }}
    >
        <Trash2 className="h-4 w-4" />
    </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No contact information found.
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