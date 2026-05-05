<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\BedAvailability;
use App\Models\Blog;
use App\Models\Doctor;
use App\Models\Inquiry;
use App\Models\JobApplication;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $isAdmin = method_exists($user, 'isAdmin') && $user->isAdmin();

        $stats = $this->getStats($isAdmin);
        $recentAppointments = $this->getRecentAppointments();
        $recentInquiries = $this->getRecentInquiries();
        $appointmentChart = $this->getAppointmentChart();
        $inquiryChart = $this->getInquiryChart();

        return inertia('admin/dashboard', [
            'stats' => $stats,
            'recentAppointments' => $recentAppointments,
            'recentInquiries' => $recentInquiries,
            'appointmentChart' => $appointmentChart,
            'inquiryChart' => $inquiryChart,
            'isAdmin' => $isAdmin,
        ]);
    }

    private function getStats(bool $isAdmin): array
    {
        $today = date('Y-m-d');
        $thisMonth = date('Y-m-01');
        $thisWeek = date('Y-m-d', strtotime('monday this week'));

        $baseStats = [
            'totalDoctors' => Doctor::count(),
            'totalAppointments' => Appointment::count(),
            'totalInquiries' => Inquiry::count(),
            'todayAppointments' => Appointment::whereDate('preferred_date', $today)->count(),
            'weekAppointments' => Appointment::where('preferred_date', '>=', $thisWeek)->count(),
            'monthAppointments' => Appointment::where('preferred_date', '>=', $thisMonth)->count(),
            'newInquiries' => Inquiry::where('status', 'new')->count(),
            'pendingInquiries' => Inquiry::whereIn('status', ['new', 'contacted'])->count(),
        ];

        if ($isAdmin) {
            return array_merge($baseStats, [
                'totalBlogs' => Blog::count(),
                'totalJobApplications' => JobApplication::count(),
                'recentJobApplications' => JobApplication::where('created_at', '>=', $thisWeek)->count(),
                'completedInquiries' => Inquiry::where('status', 'completed')->count(),
            ]);
        }

        return array_merge($baseStats, [
            'todayAppointmentsList' => Appointment::whereDate('preferred_date', $today)
                ->with(['doctor', 'specialization'])
                ->orderBy('time_slot')
                ->limit(10)
                ->get(),
            'bedAvailability' => BedAvailability::first(),
        ]);
    }

    private function getRecentAppointments()
    {
        return Appointment::with(['doctor', 'specialization'])
            ->orderBy('preferred_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(fn ($apt) => [
                'id' => $apt->id,
                'patient_name' => $apt->full_name,
                'phone' => $apt->phone,
                'doctor' => $apt->doctor?->name,
                'specialization' => $apt->specialization?->name,
                'date' => $apt->preferred_date,
                'time' => $apt->time_slot,
                'visit_type' => $apt->visit_type,
            ]);
    }

    private function getRecentInquiries()
    {
        return Inquiry::orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(fn ($inq) => [
                'id' => $inq->id,
                'name' => $inq->name,
                'email' => $inq->email,
                'phone' => $inq->phone,
                'department' => $inq->department,
                'status' => $inq->status,
                'created_at' => $inq->created_at->format('Y-m-d'),
            ]);
    }

    private function getAppointmentChart(): array
    {
        $startDate = date('Y-m-d', strtotime('-30 days'));
        $today = date('Y-m-d');

        $data = Appointment::where('preferred_date', '>=', $startDate)
            ->select(DB::raw('DATE(preferred_date) as date'), DB::raw('COUNT(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $labels = [];
        $values = [];
        $current = strtotime($startDate);
        $end = strtotime($today);

        while ($current <= $end) {
            $dateStr = date('Y-m-d', $current);
            $labels[] = date('M d', $current);
            $values[] = $data[$dateStr]->count ?? 0;
            $current = strtotime('+1 day', $current);
        }

        return [
            'labels' => $labels,
            'values' => $values,
        ];
    }

    private function getInquiryChart(): array
    {
        $colors = ['#ef4444', '#f59e0b', '#22c55e', '#6b7280'];

        return Inquiry::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(fn ($item, $index) => [
                'status' => $item->status,
                'count' => $item->count,
                'color' => $colors[$index] ?? '#6b7280',
            ])
            ->values()
            ->toArray();
    }
}
