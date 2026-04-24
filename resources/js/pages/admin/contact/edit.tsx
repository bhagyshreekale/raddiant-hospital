import { useForm, Link, Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft, Mail, Phone, Clock, MapPin, Globe } from "lucide-react";

interface Contact {
    id: number;
    email: string;
    phone: string;
    address: string;
    open_hours: string;
    map_link: string;
}

export default function Edit({ contact }: { contact: Contact }) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        email: contact?.email || '',
        phone: contact?.phone || '',
        address: contact?.address || '',
        open_hours: contact?.open_hours || '',
        map_link: contact?.map_link || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Target the update route specifically with the ID
        put(`/admin/contact-settings/${contact.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                // Success feedback is handled by recentlySuccessful
            },
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <Head title="Edit Contact" />
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Edit Contact Info</h2>
                    <p className="text-muted-foreground">
                        Update the details for this specific location.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/admin/contact-settings">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </Button>
            </div>

            <Separator />

            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                    <h3 className="text-lg font-semibold">Contact Details</h3>
                    <p className="text-sm text-muted-foreground">
                        Changes made here will update the public website immediately after saving.
                    </p>
                    <div className="p-4 bg-blue-50/50  rounded-lg border border-blue-100 text-xs">
                        <Globe className="w-4 h-4 mb-2" />
                        Tip: Ensure Google Maps links are the full "Share" URL.
                    </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Public Information</CardTitle>
                            <CardDescription>Update communication channels and location.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Support Email
                                    </Label>
                                    <Input 
                                        id="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)} 
                                        className={errors.email ? "border-destructive" : ""}
                                    />
                                    {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Phone Number
                                    </Label>
                                    <Input 
                                        id="phone" 
                                        value={data.phone} 
                                        onChange={e => setData('phone', e.target.value)} 
                                        className={errors.phone ? "border-destructive" : ""}
                                    />
                                    {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="open_hours" className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Opening Hours
                                </Label>
                                <Input 
                                    id="open_hours" 
                                    value={data.open_hours} 
                                    onChange={e => setData('open_hours', e.target.value)} 
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Physical Address
                                </Label>
                                <Textarea 
                                    id="address" 
                                    rows={3}
                                    value={data.address} 
                                    onChange={e => setData('address', e.target.value)} 
                                />
                                {errors.address && <p className="text-destructive text-xs">{errors.address}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="map_link" className="flex items-center gap-2">
                                    <Globe className="w-4 h-4" /> Map Link
                                </Label>
                                <Input 
                                    id="map_link" 
                                    value={data.map_link} 
                                    onChange={e => setData('map_link', e.target.value)} 
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-4 border-t">
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Saving..." : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" /> Save Changes
                                        </>
                                    )}
                                </Button>
                                
                                {recentlySuccessful && (
                                    <span className="text-sm text-green-600 font-medium">
                                        Successfully updated!
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}