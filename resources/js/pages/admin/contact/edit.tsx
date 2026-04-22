import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Contact {
    id?: number;
    email: string;
    phone: string;
    address: string;
    open_hours: string;
    map_link: string;
}

export default function Edit({ contact }: { contact: Contact }) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        open_hours: contact.open_hours || '',
        map_link: contact.map_link || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Adjust this path to match your Laravel route (e.g., admin.contact.update)
        put(`/admin/contact-settings/${contact.id || 1}`); 
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
                <p className="text-muted-foreground text-sm">Update your public contact details and location information.</p>
            </div>

            <Separator />

            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Information Column */}
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium">Contact Details</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        These details will appear on the website footer and contact page. Ensure the email and phone numbers are active.
                    </p>
                </div>

                {/* Form Column */}
                <Card className="md:col-span-2 shadow-sm">
                    <CardHeader>
                        <CardTitle>Public Information</CardTitle>
                        <CardDescription>All fields are shown publicly unless left blank.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Support Email</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)} 
                                />
                                {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input 
                                    id="phone" 
                                    value={data.phone} 
                                    onChange={e => setData('phone', e.target.value)} 
                                />
                                {errors.phone && <p className="text-destructive text-xs">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="open_hours">Opening Hours</Label>
                            <Input 
                                id="open_hours" 
                                placeholder="e.g. Mon - Fri: 9:00 AM - 6:00 PM"
                                value={data.open_hours} 
                                onChange={e => setData('open_hours', e.target.value)} 
                            />
                            {errors.open_hours && <p className="text-destructive text-xs">{errors.open_hours}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Physical Address</Label>
                            <Textarea 
                                id="address" 
                                value={data.address} 
                                onChange={e => setData('address', e.target.value)} 
                            />
                            {errors.address && <p className="text-destructive text-xs">{errors.address}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="map_link">Google Maps Link (Embed URL)</Label>
                            <Input 
                                id="map_link" 
                                value={data.map_link} 
                                onChange={e => setData('map_link', e.target.value)} 
                            />
                            {errors.map_link && <p className="text-destructive text-xs">{errors.map_link}</p>}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Settings'}
                            </Button>
                            
                            {recentlySuccessful && (
                                <span className="text-sm text-green-600 animate-in fade-in duration-500">
                                    Saved successfully.
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}