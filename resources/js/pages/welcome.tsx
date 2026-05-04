import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome - Raddiant Hospital">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Admin Login
                            </Link>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 text-2xl font-semibold">
                                Raddiant Hospital
                            </h1>
                            <p className="mb-4 text-[#706f6c] dark:text-[#A1A09A]">
                                Your trusted healthcare partner. Experience quality medical care with our expert team of professionals.
                            </p>
                            <ul className="mb-6 flex flex-col gap-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-green-500" />
                                    <span>24/7 Emergency Services</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-green-500" />
                                    <span>Expert Medical Professionals</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-green-500" />
                                    <span>Advanced Healthcare Facilities</span>
                                </li>
                            </ul>
                            <div className="flex gap-3 text-sm">
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                >
                                    Admin Panel
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Visit Website
                                </Link>
                            </div>
                        </div>
                        <div className="relative -mb-px aspect-[335/364] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#e8f5e9] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#0f1f14]">
                            <div className="flex h-full w-full items-center justify-center">
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-600">
                                        <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium text-green-800 dark:text-green-400">
                                        RHA Panel
                                    </p>
                                    <p className="text-sm text-green-700 dark:text-green-500">
                                        Hospital Management System
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}