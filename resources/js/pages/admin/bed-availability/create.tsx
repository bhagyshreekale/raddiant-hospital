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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        total_beds: '',
        available_beds: '',
        status: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/bed-availability');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create Bed Availability</CardTitle>
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
                                {errors.available_beds && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.available_beds}
                                    </p>
                                )}
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
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Save Bed Availability
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
