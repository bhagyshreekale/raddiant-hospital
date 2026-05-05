import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Users,
    CalendarCheck,
    BedDouble,
    Stethoscope,
    Activity,
    MessageSquareQuote,
    FileText,
    Images,
    GraduationCap,
    UserPlus,
    PackageCheck,
    ShieldCheck,
    Globe,
    Link2,
    Settings,
    BookOpen,
    Cross,
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
        title: 'Doctors',
        href: '/admin/doctors',
        icon: Users,
    },
    {
        title: 'Appointments',
        href: '/admin/appointments',
        icon: CalendarCheck,
    },
    {
        title: 'Inquiries',
        href: '/admin/inquiries',
        icon: MessageSquareQuote,
    },
    {
        title: 'Bed Availability',
        href: '/admin/bed-availability',
        icon: BedDouble,
    },
    {
        title: 'Specializations',
        href: '/admin/specializations',
        icon: Cross,
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: Activity,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: MessageSquareQuote,
    },
    {
        title: 'Blogs',
        href: '/admin/blogs',
        icon: FileText,
    },
    {
        title: 'Gallery',
        href: '/admin/gallery',
        icon: Images,
    },
    {
        title: 'Careers',
        href: '/admin/careers',
        icon: GraduationCap,
    },
    {
        title: 'Job Applications',
        href: '/admin/job-applications',
        icon: UserPlus,
    },
    {
        title: 'Health Packages',
        href: '/admin/health-packages',
        icon: PackageCheck,
    },
    {
        title: 'Insurance Partners',
        href: '/admin/insurance-partners',
        icon: ShieldCheck,
    },
    {
        title: 'Website Settings',
        href: '/admin/website-settings',
        icon: Settings,
    },
    {
        title: 'Navigation Links',
        href: '/admin/navigation-links',
        icon: Link2,
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
        icon: CalendarCheck,
    },
    {
        title: 'Inquiries',
        href: '/admin/inquiries',
        icon: MessageSquareQuote,
    },
    {
        title: 'Bed Availability',
        href: '/admin/bed-availability',
        icon: BedDouble,
    },
    {
        title: 'Job Applications',
        href: '/admin/job-applications',
        icon: UserPlus,
    },
];

const footerNavItems: NavItem[] = [];

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