import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/ui/image-upload';

interface InsurancePartner {
    id: number;
    name: string;
    logo: string | null;
}

interface Props {
    insurancePartner: InsurancePartner;
}

export default function Edit({ insurancePartner }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: insurancePartner.name || '',
        logo: insurancePartner.logo || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/insurance-partners/${insurancePartner.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Insurance Partner</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Partner Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                        </div>

                        <ImageUpload
                            name="logo"
                            label="Logo"
                            value={data.logo}
                            onChange={(url) => setData('logo', url)}
                        />

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Insurance Partner
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/insurance-partners">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
