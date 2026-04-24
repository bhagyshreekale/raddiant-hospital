import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HealthPackage {
    id: number;
    name: string;
    price: number;
    features: string[];
    is_featured: boolean;
}

interface Props {
    healthPackage: HealthPackage;
}

export default function Edit({ healthPackage }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: healthPackage.name || '',
        price: String(healthPackage.price) || '',
        features: healthPackage.features?.length ? healthPackage.features : [''],
        is_featured: healthPackage.is_featured || false,
    });

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index: number) => {
        setData('features', data.features.filter((_, i) => i !== index));
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/health-packages/${healthPackage.id}`, {
            data: {
                ...data,
                features: data.features.filter(f => f.trim() !== ''),
            },
        });
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

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <Label>Features</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                    Add Feature
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {data.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder={`Feature ${index + 1}`}
                                        />
                                        {data.features.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeFeature(index)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="is_featured">Mark as Featured (Most Popular)</Label>
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
