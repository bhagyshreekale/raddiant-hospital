import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const CATEGORIES = ['Facilities', 'Technology', 'Operation Theatre', 'Staff', 'Patients'];

interface GalleryImage {
    id: number;
    image: string;
    title: string;
    category: string;
}

interface Props {
    gallery: GalleryImage;
}

export default function Edit({ gallery }: Props) {
    const { data, setData, put, processing } = useForm({
        image: gallery.image || '',
        title: gallery.title || '',
        category: gallery.category || 'Facilities',
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
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter image title"
                            />
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={data.category} onValueChange={(val) => setData('category', val)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

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
