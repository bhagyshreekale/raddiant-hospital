import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    username: string;
    errors?: Record<string, string>;
};

export default function TwoFactorChallenge({ username, errors }: Props) {
    return (
        <>
            <Head title="Two-Factor Authentication" />

            <Form
                action="/admin/2fa/verify"
                method="post"
                resetOnSuccess={['two_factor_code']}
                className="flex flex-col gap-6"
            >
                {({ processing }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="text-center">
                                <h1 className="text-xl font-semibold">
                                    Two-Factor Authentication
                                </h1>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Enter the verification code from your
                                    authenticator app
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="two_factor_code">
                                    Verification code
                                </Label>
                                <Input
                                    id="two_factor_code"
                                    name="two_factor_code"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    required
                                    autoFocus
                                    autoComplete="one-time-code"
                                    placeholder="000000"
                                    className="text-center text-2xl tracking-widest"
                                    maxLength={6}
                                />
                                <InputError message={errors?.two_factor_code} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Verify
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

TwoFactorChallenge.layout = {
    title: 'Two-Factor Authentication',
    description: 'Enter your verification code to continue',
};
