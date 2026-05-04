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
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                </div>
                <div className={`rounded-full p-3 ${color}`}>
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
            className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
            <div className="rounded-full bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
        </Link>
    );
}

function BarChart({ data }: { data: ChartData }) {
    const maxValue = Math.max(...data.values, 1);
    const height = 200;

    return (
        <div className="relative h-[200px] w-full">
            <div className="flex h-full items-end gap-2">
                {data.values.map((value, index) => (
                    <div
                        key={index}
                        className="flex-1 rounded-t bg-primary/80 transition-all hover:bg-primary"
                        style={{ height: `${(value / maxValue) * height}px` }}
                        title={`${data.labels[index]}: ${value}`}
                    />
                ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                {data.labels.filter((_, i) => i % 5 === 0).map((label, i) => (
                    <span key={i}>{label}</span>
                ))}
            </div>
        </div>
    );
}

function DonutChart({ data }: { data: Array<{ status: string; count: number; color: string }> }) {
    const total = data.reduce((sum, d) => sum + d.count, 0);
    let cumulativePercent = 0;

    return (
        <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
                {data.map((item, index) => {
                    const percent = total > 0 ? (item.count / total) * 100 : 0;
                    const dashArray = `${percent} ${100 - percent}`;
                    const dashOffset = -cumulativePercent;
                    cumulativePercent += percent;

                    return (
                        <circle
                            key={index}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth="20"
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            transform="rotate(-90 50 50)"
                        />
                    );
                })}
            </svg>
            <div className="absolute text-center">
                <p className="text-2xl font-bold">{total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        new: 'bg-red-100 text-red-700',
        contacted: 'bg-yellow-100 text-yellow-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-gray-100 text-gray-700',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
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
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Appointment Trends (30 Days)</h2>
                                <Link href={appointments.index.url()} className="text-sm text-primary hover:underline">
                                    View All
                                </Link>
                            </div>
                            {appointmentChart.labels?.length > 0 ? (
                                <BarChart data={appointmentChart} />
                            ) : (
                                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                                    No appointment data available
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Recent Appointments</h2>
                                <Link href={appointments.index.url()} className="text-sm text-primary hover:underline">
                                    View All
                                </Link>
                            </div>
                            {recentAppointments?.length > 0 ? (
                                <div className="space-y-3">
                                    {recentAppointments.slice(0, 5).map((apt) => (
                                        <div key={apt.id} className="flex items-center justify-between rounded-lg border p-3">
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
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Inquiry Status</h2>
                            {inquiryChart?.length > 0 ? (
                                <div className="flex justify-center mb-4">
                                    <DonutChart data={inquiryChart} />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-[160px] text-muted-foreground">
                                    No inquiry data
                                </div>
                            )}
                            <div className="space-y-2">
                                {inquiryChart?.map((item) => (
                                    <div key={item.status} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="capitalize">{item.status}</span>
                                        </div>
                                        <span className="font-medium">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Recent Inquiries</h2>
                            {recentInquiries?.length > 0 ? (
                                <div className="space-y-3">
                                    {recentInquiries.slice(0, 4).map((inq) => (
                                        <div key={inq.id} className="flex items-start justify-between rounded-lg border p-3">
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
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                        <div className="grid gap-2">
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
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Admin Overview</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-muted/50 p-4 text-center">
                                    <p className="text-2xl font-bold">{stats.totalBlogs}</p>
                                    <p className="text-sm text-muted-foreground">Total Blogs</p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-4 text-center">
                                    <p className="text-2xl font-bold">{stats.totalJobApplications}</p>
                                    <p className="text-sm text-muted-foreground">Job Applications</p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-4 text-center">
                                    <p className="text-2xl font-bold">{stats.completedInquiries}</p>
                                    <p className="text-sm text-muted-foreground">Completed Inquiries</p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-4 text-center">
                                    <p className="text-2xl font-bold">{stats.pendingInquiries}</p>
                                    <p className="text-sm text-muted-foreground">Pending Inquiries</p>
                                </div>
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Link href={blogs.index.url()} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50">
                                    <span className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Manage Blogs
                                    </span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href={jobApplications.index.url()} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50">
                                    <span className="flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" />
                                        View Job Applications
                                    </span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Bed Availability</h2>
                            {stats.bedAvailability ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Total Beds</span>
                                        <span className="text-2xl font-bold">{stats.bedAvailability.total_beds}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Available</span>
                                        <span className="text-2xl font-bold text-green-600">{stats.bedAvailability.available_beds}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                            stats.bedAvailability.status === 'Good' ? 'bg-green-100 text-green-700' :
                                            stats.bedAvailability.status === 'Limited' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            <Activity className="mr-1 h-4 w-4" />
                                            {stats.bedAvailability.status}
                                        </span>
                                    </div>
                                    <Link href={bedAvailability.index.url()} className="mt-2 block text-center text-sm text-primary hover:underline">
                                        Update Bed Status
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <BedDouble className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                    <p className="mt-2 text-muted-foreground">No bed data configured</p>
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