import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    username: string;
    usernameLabel: string;
    status?: string;
    errors?: Record<string, string>;
};

export default function AdminLogin({
    username,
    usernameLabel,
    status,
    errors,
}: Props) {
    return (
        <>
            <Head title="Admin Login" />

            <Form
                action="/admin/login"
                method="post"
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor={username}>
                                    {usernameLabel}
                                </Label>
                                <Input
                                    id={username}
                                    name={username}
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete={
                                        username === 'email'
                                            ? 'email'
                                            : 'username'
                                    }
                                    placeholder={
                                        username === 'email'
                                            ? 'admin@example.com'
                                            : 'username'
                                    }
                                />
                                <InputError message={errors?.[username]} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors?.password} />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm"
                                    >
                                        Remember me
                                    </Label>
                                </div>

                                <TextLink
                                    href="/admin/forgot-password"
                                    className="text-sm"
                                    tabIndex={5}
                                >
                                    Forgot password?
                                </TextLink>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

AdminLogin.layout = {
    title: 'Admin Login',
    description: 'Log in to the admin panel',
};
