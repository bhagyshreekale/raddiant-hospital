import { Head, useForm, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

interface Blog {
    id: number;
    title: string;
    category: string;
    image: string | null;
    description: string;
    read_time: string | null;
}

interface Props {
    blogs: Blog[];
}

export default function Index({ blogs = [] }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this blog?')) {
            destroy(`/admin/blogs/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Blogs" />
            
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
                <Button asChild>
                    <Link href="/admin/blogs/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Blog
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Blogs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Read Time</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell className="font-medium">{blog.title}</TableCell>
                                        <TableCell>{blog.category}</TableCell>
                                        <TableCell>{blog.read_time || "N/A"}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">
                                            {blog.description || "No description"}
                                        </TableCell>
                                        <TableCell>
                                            {blog.image ? (
                                                <img src={blog.image} alt="" className="h-10 w-10 object-cover rounded" />
                                            ) : (
                                                <span className="text-gray-400">No Image</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/blogs/${blog.id}/edit`}>
                                                    <Pencil className="h-4 w-4 mr-1" /> Edit
                                                </Link>
                                            </Button>
                                            
                                            <Button 
                                                variant="destructive" 
                                                size="sm" 
                                                onClick={() => handleDelete(blog.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        No blogs found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}