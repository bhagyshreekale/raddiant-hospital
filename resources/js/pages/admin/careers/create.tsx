import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        specialization: '',
        title: '',
        salary: '',
        location: '',
        job_type: '',
        experience: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/careers');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Career</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="title">Job Title</Label>
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

                        <div>
                            <Label htmlFor="specialization">
                                Specialization
                            </Label>
                            <Input
                                id="specialization"
                                value={data.specialization || ''}
                                onChange={(e) =>
                                    setData('specialization', e.target.value)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="salary">Salary Range</Label>
                                <Input
                                    id="salary"
                                    value={data.salary || ''}
                                    onChange={(e) =>
                                        setData('salary', e.target.value)
                                    }
                                    placeholder="e.g., 50k-70k"
                                />
                            </div>
                            <div>
                                <Label htmlFor="experience">Experience</Label>
                                <Input
                                    id="experience"
                                    value={data.experience || ''}
                                    onChange={(e) =>
                                        setData('experience', e.target.value)
                                    }
                                    placeholder="e.g., 2-3 years"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) =>
                                    setData('location', e.target.value)
                                }
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.location}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="job_type">Job Type</Label>
                            <Select
                                value={data.job_type}
                                onValueChange={(val) =>
                                    setData('job_type', val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full-time">
                                        Full-time
                                    </SelectItem>
                                    <SelectItem value="Part-time">
                                        Part-time
                                    </SelectItem>
                                    <SelectItem value="Contract">
                                        Contract
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.job_type && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.job_type}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
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
                                Save Career
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/careers">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
