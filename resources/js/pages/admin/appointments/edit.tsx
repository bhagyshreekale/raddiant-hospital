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

interface Appointment {
    id: number;
    full_name: string;
    phone: string;
    email: string | null;
    age: number | null;
    gender: string | null;
    visit_type: string;
    specialization_id: number | null;
    doctor_id: number | null;
    preferred_date: string;
    time_slot: string;
    description: string | null;
}

interface Specialization {
    id: number;
    name: string;
}

interface Doctor {
    id: number;
    name: string;
}

interface Props {
    appointment: Appointment;
    specializations: Specialization[];
    doctors: Doctor[];
}

export default function Edit({ appointment, specializations, doctors }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: appointment.full_name || '',
        phone: appointment.phone || '',
        email: appointment.email || '',
        age: appointment.age || '',
        gender: appointment.gender || '',
        visit_type: appointment.visit_type || '',
        specialization_id: appointment.specialization_id
            ? String(appointment.specialization_id)
            : '',
        doctor_id: appointment.doctor_id ? String(appointment.doctor_id) : '',
        preferred_date: appointment.preferred_date || '',
        time_slot: appointment.time_slot || '',
        description: appointment.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/appointments/${appointment.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
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
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email || ''}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={data.age || ''}
                                    onChange={(e) =>
                                        setData('age', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(val) =>
                                        setData('gender', val)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
                                        <SelectItem value="Other">
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="visit_type">Visit Type</Label>
                            <Select
                                value={data.visit_type}
                                onValueChange={(val) =>
                                    setData('visit_type', val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select visit type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Emergency">
                                        Emergency
                                    </SelectItem>
                                    <SelectItem value="OPD">OPD</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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
                                <Label htmlFor="doctor_id">Doctor</Label>
                                <Select
                                    value={data.doctor_id}
                                    onValueChange={(val) =>
                                        setData('doctor_id', val)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doc) => (
                                            <SelectItem
                                                key={doc.id}
                                                value={String(doc.id)}
                                            >
                                                {doc.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="preferred_date">
                                    Preferred Date
                                </Label>
                                <Input
                                    id="preferred_date"
                                    type="date"
                                    value={data.preferred_date}
                                    onChange={(e) =>
                                        setData(
                                            'preferred_date',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <Label htmlFor="time_slot">Time Slot</Label>
                                <Input
                                    id="time_slot"
                                    value={data.time_slot}
                                    onChange={(e) =>
                                        setData('time_slot', e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description || ''}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Appointment
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/appointments">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
