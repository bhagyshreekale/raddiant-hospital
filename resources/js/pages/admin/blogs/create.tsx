import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type FormData = {
    title: string;
    category: string;
    image: File | null; // ✅ FIX HERE
    description: string;
    read_time: string;
};

export default function Create() {
   const { data, setData, post, processing, errors } = useForm<FormData>({
    title: '',
    category: '',
    image: null,
    description: '',
    read_time: '',
});

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/admin/blogs', {
            forceFormData: true, // ✅ VERY IMPORTANT for file upload
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input 
                                id="title" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input 
                                id="category" 
                                value={data.category} 
                                onChange={e => setData('category', e.target.value)} 
                            />
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <Label htmlFor="image">Image</Label>
                            <Input 
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={e => setData('image', e.target.files?.[0] || null)}
                            />

                            {/* ✅ Image Preview */}
                            {data.image && (
                                <img 
                                    src={URL.createObjectURL(data.image)}
                                    className="mt-2 w-32 h-32 object-cover rounded"
                                />
                            )}

                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)} 
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Read Time */}
                        <div>
                            <Label htmlFor="read_time">Read Time</Label>
                            <Input 
                                id="read_time"
                                type="text"
                                value={data.read_time}
                                onChange={e => setData('read_time', e.target.value)}
                                placeholder="e.g. 5 min read"
                            />
                            {errors.read_time && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.read_time}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Blog'}
                            </Button>

                            <Button variant="ghost" asChild>
                                <a href="/admin/blogs">Cancel</a>
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}