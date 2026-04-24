import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock, Save, Globe } from "lucide-react";

interface Props {
    contact?: {
        email: string;
        phone: string;
        address: string;
        open_hours: string;
        map_link: string;
    };
}

export default function ContactSettings({ contact }: Props) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        email: contact?.email || '',
        phone: contact?.phone || '',
        address: contact?.address || '',
        open_hours: contact?.open_hours || '',
        map_link: contact?.map_link || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/contact');
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Contact Settings</h2>
                    <p className="text-muted-foreground">Manage the clinic's public contact information and location details.</p>
                </div>
            </div>

            <Separator />

            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Instructions */}
                <div className="md:col-span-1">
                    <h3 className="text-lg font-medium">Public Information</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        This information will be displayed on the website's footer, contact page, and header.
                    </p>
                </div>

                {/* Right Column: Form Fields */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Channels</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Email Address
                                    </Label>
                                    <Input 
                                        id="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)} 
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Phone Number
                                    </Label>
                                    <Input 
                                        id="phone" 
                                        value={data.phone} 
                                        onChange={e => setData('phone', e.target.value)} 
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="open_hours" className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Opening Hours
                                </Label>
                                <Input 
                                    id="open_hours" 
                                    placeholder="e.g. Mon-Sat: 9 AM - 7 PM"
                                    value={data.open_hours} 
                                    onChange={e => setData('open_hours', e.target.value)} 
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Location Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Physical Address
                                </Label>
                                <Textarea 
                                    id="address" 
                                    value={data.address} 
                                    onChange={e => setData('address', e.target.value)} 
                                    placeholder="Full clinic address..."
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="map_link" className="flex items-center gap-2">
                                    <Globe className="w-4 h-4" /> Google Maps Link
                                </Label>
                                <Input 
                                    id="map_link" 
                                    value={data.map_link} 
                                    onChange={e => setData('map_link', e.target.value)} 
                                    placeholder="https://goo.gl/maps/..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? "Saving..." : "Save Changes"}
                        </Button>
                        
                        {recentlySuccessful && (
                            <p className="text-sm text-green-600 font-medium animate-in fade-in duration-300">
                                Settings saved successfully!
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

function route(arg0: string): string {
    throw new Error('Function not implemented.');
}
