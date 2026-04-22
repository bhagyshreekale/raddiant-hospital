import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';

interface GalleryImage {
    id: number;
    image: string;
}

interface Props {
    gallery: GalleryImage;
}

export default function Edit({ gallery }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        image: gallery.image || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/gallery/${gallery.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Gallery Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <ImageUpload
                            name="image"
                            label="Image"
                            value={data.image}
                            onChange={(url) => setData('image', url)}
                        />

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Image
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
