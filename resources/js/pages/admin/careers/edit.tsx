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

interface Career {
    id: number;
    specialization: string | null;
    title: string;
    salary: string | null;
    location: string;
    job_type: string;
    experience: string | null;
    description: string;
}

interface Props {
    career: Career;
}

export default function Edit({ career }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        specialization: career.specialization || '',
        title: career.title || '',
        salary: career.salary || '',
        location: career.location || '',
        job_type: career.job_type || '',
        experience: career.experience || '',
        description: career.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/careers/${career.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Career</CardTitle>
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
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Career
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
