import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        logo: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/insurance-partners');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Insurance Partner</CardTitle>
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
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <ImageUpload
                            name="logo"
                            label="Logo"
                            value={data.logo}
                            onChange={(url) => setData('logo', url)}
                        />

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Save Insurance Partner
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
