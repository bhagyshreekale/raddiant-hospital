import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/admins');
    };

    return (
        <div className="mx-auto max-w-2xl p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Admin</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={data.username}
                                onChange={(e) =>
                                    setData('username', e.target.value)
                                }
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                Save Admin
                            </Button>
                            <Button variant="ghost" asChild>
                                <a href="/admin/admins">Cancel</a>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
