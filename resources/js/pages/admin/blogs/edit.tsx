import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Blog {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    read_time: string;
}

export default function Edit({ blog }: { blog: Blog }) {
    const { data, setData, put, processing, errors } = useForm({
        title: blog.title || '',
        category: blog.category || '',
        image: blog.image || '',
        description: blog.description || '',
        read_time: blog.read_time || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we aren't using route helpers, we use the direct path
        // For updates, we use PUT/PATCH
        put(`/admin/blogs/${blog.id}`); 
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Blog</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input 
                                id="title" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input 
                                id="category" 
                                value={data.category} 
                                onChange={e => setData('category', e.target.value)} 
                            />
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <Label htmlFor="image">Image</Label>
                            <Input 
                                id="image"
                                type="file"
                                onChange={e => setData('image', e.target.files[0])}
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)} 
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

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


                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>Update Blog</Button>
                            <Button variant="ghost" asChild>
                                <a href="/blogs">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}