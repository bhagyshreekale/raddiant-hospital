import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        image: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/services');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Service</CardTitle>
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
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title}
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
                                Save Service
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