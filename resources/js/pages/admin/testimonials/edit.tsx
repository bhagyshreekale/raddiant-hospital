import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/ui/image-upload';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Testimonial {
    id: number;
    patient_name: string;
    specialization_id: number | null;
    patient_type: string | null;
    description: string;
    profile_image: string | null;
}

interface Specialization {
    id: number;
    name: string;
}

interface Props {
    testimonial: Testimonial;
    specializations: Specialization[];
}

export default function Edit({ testimonial, specializations }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        specialization_id: testimonial.specialization_id
            ? String(testimonial.specialization_id)
            : '',
        patient_name: testimonial.patient_name || '',
        patient_type: testimonial.patient_type || '',
        description: testimonial.description || '',
        profile_image: testimonial.profile_image || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/testimonials/${testimonial.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Testimonial</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="patient_name">Patient Name</Label>
                            <Input
                                id="patient_name"
                                value={data.patient_name}
                                onChange={(e) =>
                                    setData('patient_name', e.target.value)
                                }
                            />
                            {errors.patient_name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.patient_name}
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
                        </div>

                        <div>
                            <Label htmlFor="patient_type">Patient Type</Label>
                            <Input
                                id="patient_type"
                                value={data.patient_type || ''}
                                onChange={(e) =>
                                    setData('patient_type', e.target.value)
                                }
                            />
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

                        <ImageUpload
                            name="profile_image"
                            label="Profile Image"
                            value={data.profile_image}
                            onChange={(url) => setData('profile_image', url)}
                        />

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Testimonial
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/testimonials">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
