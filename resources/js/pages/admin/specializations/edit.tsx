import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Specialization {
    id: number;
    name: string;
    image: string | null;
    description: string | null;
}

export default function Edit({
    specialization,
}: {
    specialization: Specialization;
}) {
    const { data, setData, put, processing, errors } = useForm({
        name: specialization.name || '',
        image: specialization.image || '',
        description: specialization.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/specializations/${specialization.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Specialization</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
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
                            name="image"
                            label="Image"
                            value={data.image}
                            onChange={(url) => setData('image', url)}
                            error={errors.image}
                        />

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description || ''}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Specialization
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/specializations">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
