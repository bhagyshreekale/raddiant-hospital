import { Head, Link, usePage } from '@inertiajs/react';
import {
    Users,
    CalendarCheck,
    MessageSquare,
    BedDouble,
    FileText,
    Briefcase,
    TrendingUp,
    Clock,
    ArrowRight,
    Activity,
} from 'lucide-react';
import { dashboard } from '@/routes';
import appointments from '@/routes/appointments';
import inquiries from '@/routes/inquiries';
import doctors from '@/routes/doctors';
import blogs from '@/routes/blogs';
import jobApplications from '@/routes/job-applications';
import bedAvailability from '@/routes/bed-availability';

interface Stats {
    totalDoctors: number;
    totalAppointments: number;
    totalInquiries: number;
    todayAppointments: number;
    weekAppointments: number;
    monthAppointments: number;
    newInquiries: number;
    pendingInquiries: number;
    totalBlogs?: number;
    totalJobApplications?: number;
    recentJobApplications?: number;
    completedInquiries?: number;
    todayAppointmentsList?: Array<{
        id: number;
        patient_name: string;
        doctor: string;
        date: string;
        time: string;
    }>;
    bedAvailability?: {
        total_beds: number;
        available_beds: number;
        status: string;
    };
}

interface RecentAppointment {
    id: number;
    patient_name: string;
    phone: string;
    doctor: string;
    specialization: string;
    date: string;
    time: string;
    visit_type: string;
}

interface RecentInquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    status: string;
    created_at: string;
}

interface ChartData {
    labels: string[];
    values: number[];
}

function StatCard({ title, value, icon: Icon, href, color }: {
    title: string;
    value: number;
    icon: React.ElementType;
    href?: string;
    color: string;
}) {
    const content = (
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center justify-between mt-auto pt-3">
                <p className="text-3xl font-bold">{value}</p>
                <div className={`rounded-xl ${color} p-3 shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}

function QuickAction({ title, description, href, icon: Icon }: {
    title: string;
    description: string;
    href: string;
    icon: React.ElementType;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-4 rounded-xl border border-border/50 p-4 transition-all duration-200 hover:bg-muted/50 hover:border-primary/30"
        >
            <div className="rounded-xl bg-primary/10 p-2.5">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
    );
}

function BarChart({ data }: { data: ChartData }) {
    const maxValue = Math.max(...data.values, 1);

    return (
        <div className="flex h-40 items-end gap-1.5 px-2">
            {data.values.map((value, index) => (
                <div key={index} className="group relative flex-1">
                    <div
                        className="w-full rounded-t-md bg-gradient-to-t from-primary/60 to-primary hover:from-primary/80 transition-all duration-300"
                        style={{ height: `${(value / maxValue) * 100}%` }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                        <div className="rounded bg-card border border-border/50 px-2 py-1 text-xs font-medium shadow-sm">
                            {data.labels[index]}: {value}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function DonutChart({ data }: { data: Array<{ status: string; count: number; color: string }> }) {
    const total = data.reduce((sum, d) => sum + d.count, 0);

    if (total === 0) {
        return (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                No data
            </div>
        );
    }

    return (
        <div className="flex items-center gap-8">
            <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {data.map((item, index) => {
                        const prevPercent = data.slice(0, index).reduce((sum, d) => sum + (d.count / total) * 100, 0);
                        const percent = (item.count / total) * 100;

                        return (
                            <circle
                                key={item.status}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={item.color}
                                strokeWidth="16"
                                strokeDasharray={`${percent} ${100 - percent}`}
                                strokeDashoffset={-prevPercent}
                                className="transition-all duration-500"
                            />
                        );
                    })}
                </svg>
            </div>
            <div className="space-y-3">
                {data.map((item) => (
                    <div key={item.status} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full ring-1 ring-border" style={{ backgroundColor: item.color }} />
                        <span className="text-sm capitalize w-20">{item.status}</span>
                        <span className="text-sm font-semibold">{item.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        new: 'bg-red-50 text-red-600 border border-red-100',
        contacted: 'bg-amber-50 text-amber-600 border border-amber-100',
        completed: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        cancelled: 'bg-slate-50 text-slate-600 border border-slate-100',
    };

    return (
        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
            {status}
        </span>
    );
}

export default function Dashboard() {
    const { stats, recentAppointments, recentInquiries, appointmentChart, inquiryChart, isAdmin } = usePage<{
        stats: Stats;
        recentAppointments: RecentAppointment[];
        recentInquiries: RecentInquiry[];
        appointmentChart: ChartData;
        inquiryChart: Array<{ status: string; count: number; color: string }>;
        isAdmin: boolean;
    }>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Today's Appointments"
                        value={stats.todayAppointments}
                        icon={CalendarCheck}
                        href={appointments.index.url()}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Total Doctors"
                        value={stats.totalDoctors}
                        icon={Users}
                        href={doctors.index.url()}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="New Inquiries"
                        value={stats.newInquiries}
                        icon={MessageSquare}
                        href={inquiries.index.url()}
                        color="bg-orange-500"
                    />
                    <StatCard
                        title="This Month"
                        value={stats.monthAppointments}
                        icon={TrendingUp}
                        color="bg-green-500"
                    />
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Appointments This Month</h2>
                                <Link href={appointments.index.url()} className="text-sm text-primary hover:underline">
                                    View All
                                </Link>
                            </div>
                            {appointmentChart.labels?.length > 0 ? (
                                <BarChart data={appointmentChart} />
                            ) : (
                                <div className="flex items-center justify-center h-40 text-muted-foreground">
                                    No appointment data available
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Recent Appointments</h2>
                                <Link href={appointments.index.url()} className="text-sm text-primary hover:underline">
                                    View All
                                </Link>
                            </div>
                            {recentAppointments?.length > 0 ? (
                                <div className="space-y-2">
                                    {recentAppointments.slice(0, 5).map((apt) => (
                                        <div key={apt.id} className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                                            <div>
                                                <p className="font-medium">{apt.patient_name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {apt.doctor || 'No doctor'} • {apt.specialization || ''}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">{apt.date}</p>
                                                <p className="text-xs text-muted-foreground">{apt.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No recent appointments</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Inquiry Status</h2>
                            {inquiryChart?.length > 0 ? (
                                <div className="flex justify-center mb-6">
                                    <DonutChart data={inquiryChart} />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-40 text-muted-foreground">
                                    No inquiry data
                                </div>
                            )}
                            <div className="space-y-3">
                                {inquiryChart?.map((item) => (
                                    <div key={item.status} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="capitalize">{item.status}</span>
                                        </div>
                                        <span className="font-semibold">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Recent Inquiries</h2>
                            {recentInquiries?.length > 0 ? (
                                <div className="space-y-2">
                                    {recentInquiries.slice(0, 4).map((inq) => (
                                        <div key={inq.id} className="flex items-start justify-between rounded-lg border border-border/50 p-3">
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium truncate">{inq.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{inq.email}</p>
                                            </div>
                                            <StatusBadge status={inq.status} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">No recent inquiries</p>
                            )}
                            <Link href={inquiries.index.url()} className="mt-4 block text-center text-sm text-primary hover:underline">
                                View All Inquiries
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                        <div className="grid gap-3">
                            <QuickAction
                                title="Manage Appointments"
                                description="View and update patient appointments"
                                href={appointments.index.url()}
                                icon={CalendarCheck}
                            />
                            <QuickAction
                                title="Handle Inquiries"
                                description="Process new patient inquiries"
                                href={inquiries.index.url()}
                                icon={MessageSquare}
                            />
                            {!isAdmin && (
                                <QuickAction
                                    title="Bed Availability"
                                    description="Update hospital bed status"
                                    href={bedAvailability.index.url()}
                                    icon={BedDouble}
                                />
                            )}
                            {isAdmin && (
                                <>
                                    <QuickAction
                                        title="Manage Doctors"
                                        description="Add or update doctor records"
                                        href={doctors.index.url()}
                                        icon={Users}
                                    />
                                    <QuickAction
                                        title="Job Applications"
                                        description="Review candidate applications"
                                        href={jobApplications.index.url()}
                                        icon={Briefcase}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {isAdmin ? (
                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Admin Overview</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-lg bg-muted/30 border border-border/30 p-4 text-center">
                                    <p className="text-2xl font-bold">{stats.totalBlogs}</p>
                                    <p className="text-sm text-muted-foreground">Total Blogs</p>
                                </div>
                                <div className="rounded-lg bg-muted/30 border border-border/30 p-4 text-center">
                                    <p className="text-2xl font-bold">{stats.totalJobApplications}</p>
                                    <p className="text-sm text-muted-foreground">Job Applications</p>
                                </div>
                                <div className="rounded-lg bg-muted/30 border border-border/30 p-4 text-center">
                                    <p className="text-2xl font-bold">{stats.completedInquiries}</p>
                                    <p className="text-sm text-muted-foreground">Completed Inquiries</p>
                                </div>
                                <div className="rounded-lg bg-muted/30 border border-border/30 p-4 text-center">
                                    <p className="text-2xl font-bold">{stats.pendingInquiries}</p>
                                    <p className="text-sm text-muted-foreground">Pending Inquiries</p>
                                </div>
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Link href={blogs.index.url()} className="flex items-center justify-between rounded-lg border border-border/50 p-3 hover:bg-muted/50 transition-colors">
                                    <span className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Manage Blogs
                                    </span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href={jobApplications.index.url()} className="flex items-center justify-between rounded-lg border border-border/50 p-3 hover:bg-muted/50 transition-colors">
                                    <span className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" />
                                        View Job Applications
                                    </span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Bed Availability</h2>
                            {stats.bedAvailability ? (
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between border-b border-border/30 pb-4">
                                        <span className="text-muted-foreground">Total Beds</span>
                                        <span className="text-2xl font-bold">{stats.bedAvailability.total_beds}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-border/30 pb-4">
                                        <span className="text-muted-foreground">Available</span>
                                        <span className="text-2xl font-bold text-green-600">{stats.bedAvailability.available_beds}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-medium ${
                                            stats.bedAvailability.status === 'Good' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                            stats.bedAvailability.status === 'Limited' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                            'bg-red-50 text-red-600 border border-red-100'
                                        }`}>
                                            <Activity className="mr-1.5 h-4 w-4" />
                                            {stats.bedAvailability.status}
                                        </span>
                                    </div>
                                    <Link href={bedAvailability.index.url()} className="mt-2 block text-center text-sm text-primary hover:underline">
                                        Update Bed Status
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <BedDouble className="mx-auto h-12 w-12 text-muted-foreground/30" />
                                    <p className="mt-3 text-muted-foreground">No bed data configured</p>
                                    <Link href={bedAvailability.index.url()} className="mt-2 text-sm text-primary hover:underline">
                                        Configure Now
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};