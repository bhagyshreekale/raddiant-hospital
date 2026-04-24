import { Transition } from '@headlessui/react';
import { Form, Head, router, usePage } from '@inertiajs/react';
import { ShieldCheck, ShieldX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
    twoFactorEnabled?: boolean;
    twoFactorQrCode?: string;
    twoFactorSecret?: string;
    recoveryCodes?: string[];
    status?: string;
};

export default function Security({
    twoFactorEnabled = false,
    twoFactorQrCode,
    twoFactorSecret,
    recoveryCodes = [],
    status,
}: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const { props } = usePage();
    const [showSetupModal, setShowSetupModal] = useState(false);
    const [recoveryCodesList, setRecoveryCodesList] =
        useState<string[]>(recoveryCodes);

    useEffect(() => {
        if (props.status) {
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }, [props.status]);

    return (
        <>
            <Head title="Security settings" />

            <h1 className="sr-only">Security settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Update password"
                    description="Ensure your account is using a long, random password to stay secure"
                />

                <Form
                    action="/admin/settings/password"
                    method="post"
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnError={[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]}
                    onError={(errors) => {
                        if (errors.password) {
                            passwordInput.current?.focus();
                        }
                        if (errors.current_password) {
                            currentPasswordInput.current?.focus();
                        }
                    }}
                    className="space-y-6"
                >
                    {({ errors, processing, recentlySuccessful }) => (
                        <>
                            <input type="hidden" name="_method" value="put" />

                            <div className="grid gap-2">
                                <Label htmlFor="current_password">
                                    Current password
                                </Label>

                                <PasswordInput
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    name="current_password"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    placeholder="Current password"
                                />

                                <InputError message={errors.current_password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">New password</Label>

                                <PasswordInput
                                    id="password"
                                    ref={passwordInput}
                                    name="password"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="New password"
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>

                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-password-button"
                                >
                                    Save password
                                </Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">
                                        Saved
                                    </p>
                                </Transition>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Two-factor authentication"
                    description="Manage your two-factor authentication settings"
                />

                {twoFactorEnabled ? (
                    <div className="flex flex-col items-start justify-start space-y-4">
                        <p className="text-sm text-muted-foreground">
                            You will be prompted for a secure, random pin during
                            login, which you can retrieve from the
                            TOTP-supported application on your phone.
                        </p>

                        <div className="flex gap-3">
                            <Form
                                action="/admin/settings/two-factor/disable"
                                method="post"
                                resetOnError={['current_password']}
                            >
                                {({ errors, processing }) => (
                                    <>
                                        <InputError
                                            message={errors.current_password}
                                        />
                                        <Button
                                            variant="destructive"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            <ShieldX className="mr-2 h-4 w-4" />
                                            Disable 2FA
                                        </Button>
                                    </>
                                )}
                            </Form>

                            <Form
                                action="/admin/settings/two-factor/regenerate"
                                method="post"
                                resetOnError={['current_password']}
                            >
                                {({ errors, processing }) => (
                                    <>
                                        <InputError
                                            message={errors.current_password}
                                        />
                                        <Button
                                            variant="outline"
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Regenerate codes
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </div>

                        {recoveryCodesList.length > 0 && (
                            <div className="mt-4 rounded-lg border p-4">
                                <h4 className="mb-2 text-sm font-medium">
                                    Recovery Codes
                                </h4>
                                <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                                    {recoveryCodesList.map((code, i) => (
                                        <code key={i}>{code}</code>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Dialog
                        open={showSetupModal}
                        onOpenChange={setShowSetupModal}
                    >
                        <DialogTrigger asChild>
                            <div>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    When you enable two-factor authentication,
                                    you will be prompted for a secure pin during
                                    login. This pin can be retrieved from a
                                    TOTP-supported application on your phone.
                                </p>

                                <Button type="button">
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    Enable 2FA
                                </Button>
                            </div>
                        </DialogTrigger>

                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>
                                    Two-Factor Authentication Setup
                                </DialogTitle>
                                <DialogDescription>
                                    Scan this QR code with your authenticator
                                    app, then enter the code to enable 2FA.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col items-center space-y-4">
                                {twoFactorQrCode && (
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(twoFactorQrCode)}`}
                                        alt="QR Code"
                                        className="rounded-lg border"
                                    />
                                )}

                                {twoFactorSecret && (
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground">
                                            Or enter this secret key manually:
                                        </p>
                                        <code className="text-sm">
                                            {twoFactorSecret}
                                        </code>
                                    </div>
                                )}

                                <Form
                                    action="/admin/settings/two-factor/enable"
                                    method="post"
                                    onSuccess={() => {
                                        setShowSetupModal(false);
                                        router.reload();
                                    }}
                                    className="w-full space-y-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="two_factor_code">
                                            Verification code
                                        </Label>
                                        <input
                                            id="two_factor_code"
                                            name="two_factor_code"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Enter 6-digit code"
                                            maxLength={6}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Verify & Enable
                                    </Button>
                                </Form>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        {
            title: 'Security settings',
            href: '/admin/settings/security',
        },
    ],
};
