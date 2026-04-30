import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: 'tpa' as 'public' | 'private' | 'tpa',
        logo: null as File | string | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/admin/insurance-partners', {
            preserveScroll: true, 
        });
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Insurance Partner</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Partner Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="category">Sector Category</Label>
                            <Select
                                value={data.category}
                                onValueChange={(val) => setData('category', val as 'public' | 'private' | 'tpa')}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public Sector</SelectItem>
                                    <SelectItem value="private">Private Sector</SelectItem>
                                    <SelectItem value="tpa">TPA Agency</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div>
                            <ImageUpload
                                name="logo"
                                label="Logo"
                                value={typeof data.logo === 'string' ? data.logo : undefined}
                                onChange={(val) => setData('logo', val)}
                            />
                            {errors.logo && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.logo}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Insurance Partner'}
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/insurance-partners">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}