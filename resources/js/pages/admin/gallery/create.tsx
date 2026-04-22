import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        image: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/gallery');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Add Gallery Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <ImageUpload
                            name="image"
                            label="Image"
                            value={data.image}
                            onChange={(url) => setData('image', url)}
                            error={errors.image}
                        />

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Save Image
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/gallery">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
