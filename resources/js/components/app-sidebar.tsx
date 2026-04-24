import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    Stethoscope,
    UserCog,
    MessageSquare,
    Calendar,
    Bed,
    Package,
    Shield,
    Image,
    Briefcase,
    FileText,
    Users,
    LogOut,
    Settings,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Specializations',
        href: '/admin/specializations',
        icon: Stethoscope,
    },
    {
        title: 'Doctors',
        href: '/admin/doctors',
        icon: UserCog,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: MessageSquare,
    },
    {
        title: 'Appointments',
        href: '/admin/appointments',
        icon: Calendar,
    },
    {
        title: 'Bed Availability',
        href: '/admin/bed-availability',
        icon: Bed,
    },
    {
        title: 'Health Packages',
        href: '/admin/health-packages',
        icon: Package,
    },
    {
        title: 'Insurance Partners',
        href: '/admin/insurance-partners',
        icon: Shield,
    },
    {
        title: 'Gallery',
        href: '/admin/gallery',
        icon: Image,
    },
    {
        title: 'Careers',
        href: '/admin/careers',
        icon: Briefcase,
    },
    {
        title: 'Job Applications',
        href: '/admin/job-applications',
        icon: FileText,
    },
    {
        title: 'Admins',
        href: '/admin/admins',
        icon: Users,
    },
];

const receptionistNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Appointments',
        href: '/admin/appointments',
        icon: Calendar,
    },
    {
        title: 'Bed Availability',
        href: '/admin/bed-availability',
        icon: Bed,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/admin/settings/profile',
        icon: Settings,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const role = auth?.user?.role;
    const isAdmin = role === 'admin';

    const mainNavItems = isAdmin ? adminNavItems : receptionistNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
