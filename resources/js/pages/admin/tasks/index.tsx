import { Head, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

interface Task {
    id: number;
    title: string;
    description: string;
}

interface Props {
    tasks: Task[];
}

export default function Index({ tasks }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this task?')) {
            // Using direct string path for the delete request
            destroy(`/tasks/${id}`);
        }
    };

    return (
        <div className="p-8">
            <Head title="Manage Tasks" />
            
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
                <Button asChild>
                    {/* Direct link to create page */}
                    <a href="/admin/tasks/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Task
                    </a>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="font-medium">{task.title}</TableCell>
                                        <TableCell>{task.description || "No description"}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {/* Direct link to edit page */}
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={`/admin/tasks/${task.id}/edit`}>
                                                    <Pencil className="h-4 w-4 mr-1" /> Edit
                                                </a>
                                            </Button>
                                            
                                            <Button 
                                                variant="destructive" 
                                                size="sm" 
                                                onClick={() => handleDelete(task.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                        No tasks found.
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