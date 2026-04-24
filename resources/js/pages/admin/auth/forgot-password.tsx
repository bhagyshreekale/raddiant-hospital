import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    status?: string;
    errors?: Record<string, string>;
};

export default function AdminForgotPassword({ status, errors }: Props) {
    return (
        <>
            <Head title="Admin Forgot Password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form
                    action="/admin/forgot-password"
                    method="post"
                    className="flex flex-col gap-6"
                >
                    {({ processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="username"
                                />
                                <InputError message={errors?.username} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Email password reset link
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href="/admin/login">log in</TextLink>
                </div>
            </div>
        </>
    );
}

AdminForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your username to receive a password reset link',
};
