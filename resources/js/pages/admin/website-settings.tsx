import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import { edit, update } from '@/routes/website-settings';

interface Props {
    hospital_name?: string;
    tagline?: string;
    phone?: string;
    email?: string;
    address?: string;
    emergency_number?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
    nav_menu?: string; // Replaces all the individual nav_ variables
    footer_tagline?: string;
    footer_description?: string;
    footer_specialties_title?: string;
    footer_column3_links?: string;
    footer_contact_title?: string;
    footer_address?: string;
    footer_phone?: string;
    footer_email?: string;
    footer_timing?: string;
}

export default function WebsiteSettings({
    hospital_name,
    tagline,
    phone,
    email,
    address,
    emergency_number,
    facebook,
    instagram,
    youtube,
    whatsapp,
    nav_menu,
    footer_tagline,
    footer_description,
    footer_specialties_title,
    footer_column3_links,
    footer_contact_title,
    footer_address,
    footer_phone,
    footer_email,
    footer_timing,
}: Props) {
    // Parse existing JSON for the menu, or provide a default layout
    const [navItems, setNavItems] = useState<{ label: string; href: string }[]>(() => {
        try {
            return nav_menu ? JSON.parse(nav_menu) : [
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Facilities', href: '/facilities' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/contact' },
            ];
        } catch {
            return [{ label: 'Home', href: '/' }];
        }
    });

    const addNavItem = () => setNavItems([...navItems, { label: '', href: '' }]);
    
    const removeNavItem = (index: number) => {
        const newItems = [...navItems];
        newItems.splice(index, 1);
        setNavItems(newItems);
    };

    const updateNavItem = (index: number, field: 'label' | 'href', value: string) => {
        const newItems = [...navItems];
        newItems[index][field] = value;
        setNavItems(newItems);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 p-8">
            <Head title="Website Settings" />
            <div>
                <Heading title="Website Settings" description="Manage your hospital website header/navbar and footer content" />
            </div>

            <Form action={update.url()} method="post" className="space-y-8">
                {/* Hidden input to pass the dynamic JSON to the backend */}
                <input type="hidden" name="nav_menu" value={JSON.stringify(navItems)} />

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

                {/* Dynamic Navbar Builder */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Navigation Menu & Footer Quick Links</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Define the links for your Header. These will automatically sync to your Footer's Quick Links (Column 2).
                    </p>
                    <div className="space-y-4">
                        {navItems.map((item, index) => (
                            <div key={index} className="flex gap-4 items-end border-b pb-4">
                                <div className="grid flex-1 gap-2">
                                    <Label>Menu Label</Label>
                                    <Input 
                                        value={item.label} 
                                        onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                                        placeholder="e.g. Testimonials" 
                                    />
                                </div>
                                <div className="grid flex-1 gap-2">
                                    <Label>URL Path</Label>
                                    <Input 
                                        value={item.href} 
                                        onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                                        placeholder="e.g. /testimonials" 
                                    />
                                </div>
                                <Button 
                                    type="button" 
                                    variant="destructive" 
                                    size="icon" 
                                    onClick={() => removeNavItem(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addNavItem} className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add Menu Item
                        </Button>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Social Media Links</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="grid gap-2">
                            <Label htmlFor="facebook">Facebook URL</Label>
                            <Input id="facebook" name="facebook" defaultValue={facebook} placeholder="https://facebook.com/hospital" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="instagram">Instagram URL</Label>
                            <Input id="instagram" name="instagram" defaultValue={instagram} placeholder="https://instagram.com/hospital" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="youtube">YouTube URL</Label>
                            <Input id="youtube" name="youtube" defaultValue={youtube} placeholder="https://youtube.com/hospital" />
                        </div>
                    </div>
                </div>

                {/* Footer - Column 1: Brand */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Footer Column 1: Brand & Description</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="footer_tagline">Tagline (below logo)</Label>
                            <Input id="footer_tagline" name="footer_tagline" defaultValue={footer_tagline} placeholder="Touching Lives, Healing Souls" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_description">Description</Label>
                            <Textarea id="footer_description" name="footer_description" defaultValue={footer_description} placeholder="Brief description about your hospital..." rows={3} />
                        </div>
                    </div>
                </div>

                {/* Footer - Column 3: Custom Links */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Footer Column 3: Custom Links (Specialties)</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="footer_specialties_title">Column Title</Label>
                            <Input id="footer_specialties_title" name="footer_specialties_title" defaultValue={footer_specialties_title} placeholder="Specialties" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_column3_links">Column 3 Links (Enter as JSON array)</Label>
                            <p className="text-xs text-muted-foreground">Format: [&#123;"label":"Cardiology","href":"/services"&#125;,&#123;"label":"Orthopedics","href":"/doctors"&#125;]</p>
                            <Textarea id="footer_column3_links" name="footer_column3_links" defaultValue={footer_column3_links} placeholder='[{"label":"Cardiology","href":"/services"},{"label":"Orthopedics","href":"/doctors"}]' rows={4} />
                        </div>
                    </div>
                </div>

                {/* Footer - Column 4: Contact Info */}
                <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold">Footer Column 4: Contact Information</h3>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="footer_contact_title">Column Title</Label>
                            <Input id="footer_contact_title" name="footer_contact_title" defaultValue={footer_contact_title} placeholder="Contact Information" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_address">Location</Label>
                            <Input id="footer_address" name="footer_address" defaultValue={footer_address} placeholder="Nashik, Maharashtra" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_phone">Phone Number</Label>
                            <Input id="footer_phone" name="footer_phone" defaultValue={footer_phone} placeholder="+91 93565 10704" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_email">Email</Label>
                            <Input id="footer_email" name="footer_email" type="email" defaultValue={footer_email} placeholder="care@raddiantplus.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="footer_timing">Hospital Timing</Label>
                            <Input id="footer_timing" name="footer_timing" defaultValue={footer_timing} placeholder="24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM" />
                        </div>
                    </div>
                </div>

                <Button type="submit">Save Changes</Button>
            </Form>
        </div>
    );
}

WebsiteSettings.layout = {
    breadcrumbs: [{ title: 'Website Settings', href: edit() }],
};