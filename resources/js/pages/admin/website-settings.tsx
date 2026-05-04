import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface Props {
    hospital_name?: string;
    tagline?: string;
    logo?: string;
    phone?: string;
    email?: string;
    address?: string;
    emergency_number?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
    footer_tagline?: string;
    footer_description?: string;
    footer_specialties_title?: string;
    footer_specialties?: string;
    footer_contact_title?: string;
    footer_address?: string;
    footer_phone?: string;
    footer_email?: string;
    footer_timing?: string;
}

export default function WebsiteSettings({
    hospital_name,
    tagline,
    logo,
    phone,
    email,
    address,
    emergency_number,
    facebook,
    instagram,
    youtube,
    whatsapp,
    footer_tagline,
    footer_description,
    footer_specialties_title,
    footer_specialties,
    footer_contact_title,
    footer_address,
    footer_phone,
    footer_email,
    footer_timing,
}: Props) {
    const [logoUrl, setLogoUrl] = useState(logo || '/images/logo.png');
    const [uploading, setUploading] = useState(false);

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('filename', 'logo');

        try {
            const response = await fetch('/upload/image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setLogoUrl(data.url);
            }
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setUploading(false);
        }
    };

    const [specialties, setSpecialties] = useState<string[]>(() => {
        if (footer_specialties) {
            return footer_specialties.split(',').map(s => s.trim());
        }
        return ['Cardiology', 'Orthopedics', 'Neurology'];
    });

    const addSpecialty = () => setSpecialties([...specialties, '']);
    
    const removeSpecialty = (index: number) => {
        const newItems = [...specialties];
        newItems.splice(index, 1);
        setSpecialties(newItems);
    };

    const updateSpecialty = (index: number, value: string) => {
        const newItems = [...specialties];
        newItems[index] = value;
        setSpecialties(newItems);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 p-8">
            <Head title="Website Settings" />
            <div>
                <Heading title="Website Settings" description="Manage your hospital website header/navbar and footer content" />
            </div>

            <Form action="/admin/website-settings" method="post" className="space-y-8">
                <input type="hidden" name="logo" value={logoUrl} />
                <input type="hidden" name="footer_specialties" value={specialties.join(',')} />

                {/* Logo Upload */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Logo</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-40 h-24 border rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                            <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                disabled={uploading}
                                className="max-w-xs"
                            />
                            <p className="text-sm text-muted-foreground mt-1">
                                {uploading ? 'Uploading...' : 'Upload logo (recommended: 320x170px)'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Header Information */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Header Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="hospital_name">Hospital Name</Label>
                            <Input id="hospital_name" name="hospital_name" defaultValue={hospital_name} placeholder="Raddiant Plus Hospital" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tagline">Tagline</Label>
                            <Input id="tagline" name="tagline" defaultValue={tagline} placeholder="Multispecialty & Diagnostic Centre" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" defaultValue={phone} placeholder="+91 98765 43210" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input id="whatsapp" name="whatsapp" defaultValue={whatsapp} placeholder="+91 98765 43210" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" defaultValue={email} placeholder="info@hospital.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="emergency_number">Emergency Number</Label>
                            <Input id="emergency_number" name="emergency_number" defaultValue={emergency_number} placeholder="108" />
                        </div>
                        <div className="grid gap-2 sm:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" name="address" defaultValue={address} placeholder="Nashik, Maharashtra" rows={2} />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Social Links</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="grid gap-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input id="facebook" name="facebook" defaultValue={facebook} placeholder="https://facebook.com/..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input id="instagram" name="instagram" defaultValue={instagram} placeholder="https://instagram.com/..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="youtube">YouTube</Label>
                            <Input id="youtube" name="youtube" defaultValue={youtube} placeholder="https://youtube.com/..." />
                        </div>
                    </div>
                </div>

                {/* Footer Information */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Footer Information</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="footer_tagline">Tagline</Label>
                            <Input id="footer_tagline" name="footer_tagline" defaultValue={footer_tagline} placeholder="Touching Lives, Healing Souls" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_description">Description</Label>
                            <Textarea id="footer_description" name="footer_description" defaultValue={footer_description} placeholder="Brief description about your hospital..." rows={3} />
                        </div>
                    </div>
                </div>

                {/* Specialties */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Specialties</h3>
                    <div className="grid gap-2">
                        <Label htmlFor="footer_specialties_title">Specialties Title</Label>
                        <Input id="footer_specialties_title" name="footer_specialties_title" defaultValue={footer_specialties_title || 'Specialties'} placeholder="Specialties" />
                    </div>
                    <div className="mt-4 space-y-2">
                        {specialties.map((specialty, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={specialty}
                                    onChange={(e) => updateSpecialty(index, e.target.value)}
                                    placeholder="Specialty name"
                                />
                                <Button type="button" variant="destructive" onClick={() => removeSpecialty(index)}>Remove</Button>
                            </div>
                        ))}
                        <Button type="button" onClick={addSpecialty}>Add Specialty</Button>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="footer_contact_title">Contact Title</Label>
                            <Input id="footer_contact_title" name="footer_contact_title" defaultValue={footer_contact_title || 'Contact Information'} placeholder="Contact Information" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_address">Address</Label>
                            <Input id="footer_address" name="footer_address" defaultValue={footer_address} placeholder="Nashik, Maharashtra" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_phone">Phone</Label>
                            <Input id="footer_phone" name="footer_phone" defaultValue={footer_phone} placeholder="+91 98765 43210" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_email">Email</Label>
                            <Input id="footer_email" name="footer_email" type="email" defaultValue={footer_email} placeholder="info@hospital.com" />
                        </div>
                        <div className="grid gap-2 sm:col-span-2">
                            <Label htmlFor="footer_timing">Timing</Label>
                            <Input id="footer_timing" name="footer_timing" defaultValue={footer_timing} placeholder="24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM" />
                        </div>
                    </div>
                </div>

                <Button type="submit">Save Settings</Button>
            </Form>
        </div>
    );
}