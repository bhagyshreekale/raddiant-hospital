import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Service {
    id: number;
    title: string;
    image: string | null;
    description: string | null;
    color: string | null;
}

export default function Edit({
    service,
}: {
    service: Service;
}) {
    const { data, setData, put, processing } = useForm({
        title: service.title || '',
        image: service.image || '',
        description: service.description || '',
        color: service.color ?? '#0a4d8c',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/services/${service.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Service</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                            />
                        </div>

                        <ImageUpload
                            name="image"
                            label="Image"
                            value={data.image}
                            onChange={(url) => setData('image', url)}
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
                        </div>

                        <div>
                            <Label htmlFor="color">Accent Color</Label>
                            <div className="flex items-center gap-3">
                                <Input
                                    id="color"
                                    type="color"
                                    value={data.color}
                                    onChange={(e) =>
                                        setData('color', e.target.value)
                                    }
                                    className="h-10 w-20 p-1 cursor-pointer"
                                />
                                <Input
                                    value={data.color}
                                    onChange={(e) =>
                                        setData('color', e.target.value)
                                    }
                                    className="flex-1"
                                    placeholder="#0a4d8c"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Service
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/services">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}