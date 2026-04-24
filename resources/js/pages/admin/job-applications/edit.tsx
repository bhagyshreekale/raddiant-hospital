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

interface JobApplication {
    id: number;
    job_id: number;
    full_name: string;
    email: string;
    phone: string;
    experience: string | null;
    resume_url: string;
}

interface Job {
    id: number;
    title: string;
}

interface Props {
    jobApplication: JobApplication;
    jobs: Job[];
}

export default function Edit({ jobApplication, jobs }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        job_id: String(jobApplication.job_id) || '',
        full_name: jobApplication.full_name || '',
        email: jobApplication.email || '',
        phone: jobApplication.phone || '',
        experience: jobApplication.experience || '',
        resume_url: jobApplication.resume_url || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/job-applications/${jobApplication.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Job Application</CardTitle>
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
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Application
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
