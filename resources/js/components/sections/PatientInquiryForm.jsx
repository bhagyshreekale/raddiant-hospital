'use client';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { SITE } from '../../lib copy/data';

const DEPARTMENTS = [
  'General Medicine', 'Cardiology', 'Orthopaedics', 'Gynaecology & Obstetrics',
  'Paediatrics', 'Neurology', 'Urology', 'ENT', 'Dermatology',
  'Ophthalmology', 'Oncology', 'Radiology & Diagnostics', 'Emergency / Casualty', 'Other',
];

const TIME_SLOTS = [
  '9:00 AM – 10:00 AM', '10:00 AM – 11:00 AM', '11:00 AM – 12:00 PM',
  '12:00 PM – 1:00 PM',  '2:00 PM – 3:00 PM',   '3:00 PM – 4:00 PM',
  '4:00 PM – 5:00 PM',   '5:00 PM – 6:00 PM',   '6:00 PM – 7:00 PM',
];

function generateRef() {
  return 'RPH-' + Date.now().toString(36).toUpperCase().slice(-6);
}

export default function PatientInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refId, setRefId] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    age: '', gender: '', department: '', visitType: 'OPD',
    preferredDate: '', preferredSlot: '', insurance: '', message: '',
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setRefId(generateRef());
    setLoading(false);
    setSubmitted(true);
  };

  const CONTACT_ITEMS = [
    { icon: <FaMapMarkerAlt />, label: 'Address', value: SITE.address },
    { icon: <FaPhoneAlt />, label: 'Phone', value: SITE.phone },
    { icon: <FaEnvelope />, label: 'Email', value: SITE.email },
    { icon: <FaClock />, label: 'OPD Hours', value: 'Mon–Sat: 9 AM – 8 PM' },
  ];

  return (
    <section className="bg-[var(--off-white)] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.55fr] items-start">
          
          {/* LEFT PANEL: Trust & Contact */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-block rounded-full bg-[var(--primary)]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
              Patient Inquiry
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">Book an Appointment</h2>
            <div className="my-6 h-1 w-16 rounded-full bg-[var(--accent)]" />
            <p className="mb-8 text-gray-600">
              Fill in your details and we'll confirm your slot within 2 hours during OPD hours.
            </p>

            <ul className="mb-10 flex flex-col gap-4">
              {[
                ['✓', 'Confirmation within 2 hours'],
                ['🕐', 'Zero waiting time guarantee'],
                ['🔒', 'Your data is 100% private'],
                ['🚑', 'Emergency walk-ins welcome'],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-4 text-sm font-semibold text-gray-700">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary)] text-white">
                    {icon}
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              {CONTACT_ITEMS.map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] text-white text-xs">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">{item.label}</div>
                    <div className="text-sm font-bold text-gray-900">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: Form Card */}
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] p-8 text-white">
              <div>
                <h3 className="text-xl font-bold">Patient Inquiry Form</h3>
                <p className="mt-1 text-xs text-white/70">All fields marked * are required</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-widest text-[var(--accent-light)]">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-light)]" />
                Accepting Bookings
              </div>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 animate-[pop_0.4s_ease-out] items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-lg shadow-green-200">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Inquiry Submitted!</h3>
                <p className="mx-auto mt-4 max-w-xs text-gray-500">
                  Thank you, <strong className="text-gray-900">{form.firstName}</strong>. Our team will call you within 2 hours to confirm your appointment.
                </p>
                <div className="mt-8 inline-block rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-bold text-gray-700">
                  Reference ID: {refId}
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 block w-full rounded-full border-2 border-[var(--primary)] py-3 text-sm font-bold text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8">
                {/* Section: Personal */}
                <div className="mb-4 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-widest text-[var(--accent)]">
                  Personal Details <div className="h-px flex-1 bg-[var(--accent)]/20" />
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input required className="w-full rounded-xl border-2 border-gray-100 p-3 text-sm outline-none transition-all focus:border-[var(--primary-light)] focus:ring-4 focus:ring-[var(--primary-light)]/10" value={form.firstName} onChange={set('firstName')} placeholder="Rahul" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input required className="w-full rounded-xl border-2 border-gray-100 p-3 text-sm outline-none focus:border-[var(--primary-light)] focus:ring-4 focus:ring-[var(--primary-light)]/10" value={form.lastName} onChange={set('lastName')} placeholder="Sharma" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">Phone <span className="text-red-500">*</span></label>
                    <input required type="tel" className="w-full rounded-xl border-2 border-gray-100 p-3 text-sm outline-none focus:border-[var(--primary-light)] focus:ring-4 focus:ring-[var(--primary-light)]/10" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">Age <span className="text-red-500">*</span></label>
                    <input required type="number" className="w-full rounded-xl border-2 border-gray-100 p-3 text-sm outline-none focus:border-[var(--primary-light)] focus:ring-4 focus:ring-[var(--primary-light)]/10" value={form.age} onChange={set('age')} placeholder="32" />
                  </div>
                </div>

                {/* Section: Appointment */}
                <div className="my-8 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-widest text-[var(--accent)]">
                  Appointment Details <div className="h-px flex-1 bg-[var(--accent)]/20" />
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">Visit Type <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {['OPD', 'Emergency', 'Second Opinion', 'Diagnostic'].map(v => (
                        <label key={v} className={`flex cursor-pointer items-center gap-2 rounded-full border-2 px-4 py-2 text-xs font-bold transition-all ${form.visitType === v ? 'border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]' : 'border-gray-100 text-gray-600 hover:border-gray-200'}`}>
                          <input type="radio" name="visitType" value={v} checked={form.visitType === v} onChange={set('visitType')} className="hidden" />
                          <div className={`h-3 w-3 rounded-full border-2 ${form.visitType === v ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-gray-300'}`} />
                          {v}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="col-span-full space-y-1">
                      <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">Department <span className="text-red-500">*</span></label>
                      <select required className="w-full rounded-xl border-2 border-gray-100 p-3 text-sm outline-none focus:border-[var(--primary-light)]" value={form.department} onChange={set('department')}>
                        <option value="">Select department</option>
                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">Preferred Date <span className="text-red-500">*</span></label>
                      <input required type="date" className="w-full rounded-xl border-2 border-gray-100 p-3 text-sm outline-none focus:border-[var(--primary-light)]" value={form.preferredDate} onChange={set('preferredDate')} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">Preferred Time Slot</label>
                      <select className="w-full rounded-xl border-2 border-gray-100 p-3 text-sm outline-none focus:border-[var(--primary-light)]" value={form.preferredSlot} onChange={set('preferredSlot')}>
                        <option value="">Any available</option>
                        {TIME_SLOTS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[0.75rem] font-bold uppercase tracking-wider text-gray-700">Symptoms / Description</label>
                    <textarea className="min-h-[100px] w-full rounded-xl border-2 border-gray-100 p-3 text-sm outline-none focus:border-[var(--primary-light)]" value={form.message} onChange={set('message')} placeholder="Briefly describe your reason for visit..." />
                  </div>
                  
                  <button disabled={loading} className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[var(--primary-light)] to-[var(--primary)] py-4 font-bold text-white shadow-lg shadow-[var(--primary)]/30 transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-70">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {loading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : '📋 Submit Inquiry'}
                    </span>
                  </button>
                  <p className="text-center text-[0.7rem] text-gray-400">
                    🔒 Your information is confidential and used only for medical scheduling.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}