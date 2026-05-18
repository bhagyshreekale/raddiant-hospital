import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface Props {
    permission: {
        id: number;
        name: string;
        slug: string;
        group: string;
    };
}

export default function Edit({ permission }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name,
        slug: permission.slug,
        group: permission.group,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/permissions/${permission.id}`);
    };

    return (
        <div className="p-8">
            <Head title="Edit Permission" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Edit Permission</h1>
            </div>

            <div className="max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
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
                            required
                        />
                        <InputError message={errors.slug} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="group">Group</Label>
                        <Input
                            id="group"
                            value={data.group}
                            onChange={(e) => setData('group', e.target.value)}
                            required
                        />
                        <InputError message={errors.group} />
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
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