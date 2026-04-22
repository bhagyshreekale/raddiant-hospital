import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface HealthPackage {
    id: number;
    name: string;
    description: string;
    price: number;
}

interface Props {
    healthPackage: HealthPackage;
}

export default function Edit({ healthPackage }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: healthPackage.name || '',
        description: healthPackage.description || '',
        price: String(healthPackage.price) || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/health-packages/${healthPackage.id}`);
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Health Package</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Package Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
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
                        </div>

                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Update Health Package
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/health-packages">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
