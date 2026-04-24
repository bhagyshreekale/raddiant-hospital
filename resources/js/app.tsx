import { createInertiaApp } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';


const appName = import.meta.env.VITE_APP_NAME || 'Raddiant Hospital';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('admin/auth'):
                return AuthLayout;
            case name.startsWith('admin/settings'):
                return [AppLayout, SettingsLayout];
            case name.startsWith('admin/'):
                return [AppLayout];
            default:
                return null;
        }
    },

    strictMode: true,

    withApp(app) {

        const RootApp = () => {
            const [loading, setLoading] = useState(true);

            useEffect(() => {
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 1500); // adjust timing

                return () => clearTimeout(timer);
            }, []);

            return (
                <TooltipProvider delayDuration={0}>
                    {loading ? <Preloader /> : app}
                </TooltipProvider>
            );
        };

        return <RootApp />;
    },

    progress: {
        color: '#4B5563',
    },
});

// Theme init
initializeTheme();