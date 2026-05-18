import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Error403() {
    return (
        <>
            <Head title="Access Denied" />

            <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">403</h1>
                    <p className="text-muted-foreground">
                        You don't have permission to access this resource.
                    </p>
                </div>

                <div className="flex gap-4">
                    <Button asChild>
                        <Link href="/admin/dashboard">Go to Dashboard</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/admin/login">Sign Out</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}