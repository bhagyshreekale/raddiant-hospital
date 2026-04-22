import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Job {
    id: number;
    title: string;
}

interface Props {
    jobs: Job[];
}

export default function Create({ jobs }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        job_id: '',
        full_name: '',
        email: '',
        phone: '',
        experience: '',
        resume_url: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/job-applications');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Job Application</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="job_id">Job Position</Label>
                            <Select
                                value={data.job_id}
                                onValueChange={(val) => setData('job_id', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select job" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobs.map((job) => (
                                        <SelectItem
                                            key={job.id}
                                            value={String(job.id)}
                                        >
                                            {job.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.job_id && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.job_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                value={data.full_name}
                                onChange={(e) =>
                                    setData('full_name', e.target.value)
                                }
                            />
                            {errors.full_name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.full_name}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="experience">Experience</Label>
                            <Input
                                id="experience"
                                value={data.experience || ''}
                                onChange={(e) =>
                                    setData('experience', e.target.value)
                                }
                                placeholder="e.g., 2 years"
                            />
                        </div>

                        <div>
                            <Label htmlFor="resume_url">Resume URL</Label>
                            <Input
                                id="resume_url"
                                value={data.resume_url}
                                onChange={(e) =>
                                    setData('resume_url', e.target.value)
                                }
                            />
                            {errors.resume_url && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.resume_url}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Save Application
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/job-applications">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
