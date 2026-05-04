import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TinyMCE } from "@/components/ui/tinymce";

interface Blog {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    read_time: string;
}

interface FormData {
    title: string;
    category: string;
    image: File | string;
    description: string;
    read_time: string;
}

export default function Edit({ blog }: { blog: Blog }) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        title: blog.title || '',
        category: blog.category || '',
        image: blog.image || '',
        description: blog.description || '',
        read_time: blog.read_time || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const submitData = new FormData();
        submitData.append('title', data.title);
        submitData.append('category', data.category);
        submitData.append('description', data.description);
        submitData.append('read_time', data.read_time);
        
        // Only append image if it's a new file upload, not the existing URL string
        if (data.image && typeof data.image !== 'string') {
            submitData.append('image', data.image);
        }
        
        put(`/admin/blogs/${blog.id}`, submitData);
    };

    return (
        <>
            <Head title="Edit Blog" />
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Edit Blog</h1>
                        <a href="/admin/blogs" className="text-gray-600 hover:text-gray-900">← Back to Blogs</a>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <form onSubmit={submit} className="space-y-6">

                                {/* Title */}
                                <div>
                                    <Label htmlFor="title" className="text-gray-700 font-medium">Title</Label>
                                    <Input 
                                        id="title" 
                                        value={data.title} 
                                        onChange={e => setData('title', e.target.value)} 
                                        className="mt-1"
                                        placeholder="Enter blog title"
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                </div>

                                {/* Category & Read Time Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
                                        <Input 
                                            id="category" 
                                            value={data.category} 
                                            onChange={e => setData('category', e.target.value)} 
                                            className="mt-1"
                                            placeholder="e.g. Health, News"
                                        />
                                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="read_time" className="text-gray-700 font-medium">Read Time</Label>
                                        <Input 
                                            id="read_time"
                                            type="text"
                                            value={data.read_time}
                                            onChange={e => setData('read_time', e.target.value)}
                                            className="mt-1"
                                            placeholder="e.g. 5 min read"
                                        />
                                        {errors.read_time && <p className="text-red-500 text-sm mt-1">{errors.read_time}</p>}
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <Label htmlFor="image" className="text-gray-700 font-medium">Cover Image</Label>
                                    <Input 
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('image', e.target.files?.[0] || null)}
                                        className="mt-1"
                                    />
                                    {typeof data.image === 'string' && data.image && (
                                        <img 
                                            src={data.image}
                                            alt="Current cover"
                                            className="mt-2 w-32 h-32 object-cover rounded-lg border"
                                        />
                                    )}
                                    {data.image && typeof data.image !== 'string' && (
                                        <img 
                                            src={URL.createObjectURL(data.image as File)}
                                            alt="Preview"
                                            className="mt-2 w-32 h-32 object-cover rounded-lg border"
                                        />
                                    )}
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <Label className="text-gray-700 font-medium block mb-2">Description</Label>
                                    <TinyMCE 
                                        value={data.description} 
                                        onChange={(val) => setData('description', val)}
                                        height={400}
                                        className="mt-1"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <Button type="submit" disabled={processing} className="bg-teal-600 hover:bg-teal-700">
                                        {processing ? 'Updating...' : 'Update Blog'}
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <a href="/admin/blogs">Cancel</a>
                                    </Button>
                                </div>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}