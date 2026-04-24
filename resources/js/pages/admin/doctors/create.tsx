import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Specialization {
    id: number;
    name: string;
}

interface Props {
    specializations: Specialization[];
}

export default function Create({ specializations }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        specialization_id: '',
        education: '',
        image: '',
        availability: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/doctors');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Doctor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
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
                            <Label htmlFor="specialization_id">
                                Specialization
                            </Label>
                            <Select
                                value={data.specialization_id}
                                onValueChange={(val) =>
                                    setData('specialization_id', val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select specialization" />
                                </SelectTrigger>
                                <SelectContent>
                                    {specializations.map((spec) => (
                                        <SelectItem
                                            key={spec.id}
                                            value={String(spec.id)}
                                        >
                                            {spec.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.specialization_id && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.specialization_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="education">Education</Label>
                            <Input
                                id="education"
                                value={data.education || ''}
                                onChange={(e) =>
                                    setData('education', e.target.value)
                                }
                                placeholder="e.g., MD, DM"
                            />
                            {errors.education && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.education}
                                </p>
                            )}
                        </div>

                        <ImageUpload
                            name="image"
                            label="Photo"
                            value={data.image}
                            onChange={(url) => setData('image', url)}
                            error={errors.image}
                        />

                        <div>
                            <Label htmlFor="availability">Availability</Label>
                            <Input
                                id="availability"
                                value={data.availability || ''}
                                onChange={(e) =>
                                    setData('availability', e.target.value)
                                }
                                placeholder="e.g., Mon-Sat 10AM-4PM"
                            />
                            {errors.availability && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.availability}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Save Doctor
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/doctors">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
