<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Specialization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/appointments/index', [
            'appointments' => Appointment::with(['specialization', 'doctor'])->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/appointments/create', [
            'specializations' => Specialization::all()->map(fn ($s) => ['id' => $s->id, 'name' => $s->name]),
            'doctors' => Doctor::all()->map(fn ($d) => ['id' => $d->id, 'name' => $d->name]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|string|email',
            'age' => 'nullable|integer',
            'gender' => 'nullable|in:Male,Female,Other',
            'visit_type' => 'required|in:Emergency,OPD',
            'specialization_id' => 'nullable|exists:specializations,id',
            'doctor_id' => 'nullable|exists:doctors,id',
            'preferred_date' => 'required|date',
            'time_slot' => 'required|string|max:50',
            'description' => 'nullable|string',
        ]);

        Appointment::create($validated);

        return redirect()->route('appointments.index')
            ->with('message', 'Appointment created successfully.');
    }

    public function edit(Appointment $appointment): Response
    {
        return Inertia::render('admin/appointments/edit', [
            'appointment' => $appointment,
            'specializations' => Specialization::all()->map(fn ($s) => ['id' => $s->id, 'name' => $s->name]),
            'doctors' => Doctor::all()->map(fn ($d) => ['id' => $d->id, 'name' => $d->name]),
        ]);
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|string|email',
            'age' => 'nullable|integer',
            'gender' => 'nullable|in:Male,Female,Other',
            'visit_type' => 'required|in:Emergency,OPD',
            'specialization_id' => 'nullable|exists:specializations,id',
            'doctor_id' => 'nullable|exists:doctors,id',
            'preferred_date' => 'required|date',
            'time_slot' => 'required|string|max:50',
            'description' => 'nullable|string',
        ]);

        $appointment->update($validated);

        return redirect()->route('appointments.index')
            ->with('message', 'Appointment updated successfully.');
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return redirect()->route('appointments.index')
            ->with('message', 'Appointment deleted successfully.');
    }
}
