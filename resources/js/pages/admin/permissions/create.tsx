import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        group: '',
    });

    useEffect(() => {
        if (data.name && !data.slug) {
            const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            setData('slug', slug);
        }
        if (data.slug && !data.group) {
            const parts = data.slug.split('.');
            setData('group', parts[0] || data.slug);
        }
    }, [data.name, data.slug]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/permissions');
    };

    return (
        <div className="p-8">
            <Head title="Create Permission" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Create Permission</h1>
            </div>

            <div className="max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g., View Doctors"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="e.g., doctors.view"
                            required
                        />
                        <p className="text-sm text-muted-foreground">
                            Format: resource.action (e.g., doctors.view, doctors.create)
                        </p>
                        <InputError message={errors.slug} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="group">Group</Label>
                        <Input
                            id="group"
                            value={data.group}
                            onChange={(e) => setData('group', e.target.value)}
                            placeholder="e.g., doctors"
                            required
                        />
                        <InputError message={errors.group} />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Permission'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <a href="/admin/permissions">Cancel</a>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}