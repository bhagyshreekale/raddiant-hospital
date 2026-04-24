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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        image: '',
        title: '',
        category: 'Facilities',
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
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter image title"
                                error={errors.title}
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
