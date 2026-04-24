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

interface BedAvailability {
    id: number;
    total_beds: number;
    available_beds: number;
    status: string;
}

interface Props {
    bedAvailability: BedAvailability;
}

export default function Edit({ bedAvailability }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        total_beds: String(bedAvailability.total_beds) || '',
        available_beds: String(bedAvailability.available_beds) || '',
        status: bedAvailability.status || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/bed-availability/${bedAvailability.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Bed Availability</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="total_beds">Total Beds</Label>
                                <Input
                                    id="total_beds"
                                    type="number"
                                    value={data.total_beds}
                                    onChange={(e) =>
                                        setData('total_beds', e.target.value)
                                    }
                                />
                                {errors.total_beds && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.total_beds}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="available_beds">
                                    Available Beds
                                </Label>
                                <Input
                                    id="available_beds"
                                    type="number"
                                    value={data.available_beds}
                                    onChange={(e) =>
                                        setData(
                                            'available_beds',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(val) => setData('status', val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Limited">
                                        Limited
                                    </SelectItem>
                                    <SelectItem value="Full">Full</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Bed Availability
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/bed-availability">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
