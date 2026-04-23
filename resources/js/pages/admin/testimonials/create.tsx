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
import { Textarea } from '@/components/ui/textarea';

interface Specialization {
    id: number;
    name: string;
}

interface Props {
    specializations: Specialization[];
}

export default function Create({ specializations }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        specialization_id: '',
        patient_name: '',
        patient_type: '',
        description: '',
        profile_image: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/testimonials');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Testimonial</CardTitle>
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
                                placeholder="e.g., cardiac, maternity"
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
                                Save Testimonial
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
