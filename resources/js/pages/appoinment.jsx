'use client';
import { useState } from 'react';
import { DOCTORS, SERVICES } from '../lib copy/data';
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FloatingActions from '../components/design/FloatingActions'
export default function AppointmentPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', gender: '', doctor: '', service: '', date: '', time: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid phone number';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.service) e.service = 'Please select a specialty';
    if (!form.date) e.date = 'Please select a preferred date';
    if (!form.gender) e.gender = 'Please select gender';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // Add your API call logic here
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputClass = (err) => `
    w-full px-4 py-3 rounded-xl border transition-all outline-none text-sm
    ${err ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}
  `;

  return (
  <>

    <Navbar/>

    <main className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest mb-4">
            Online Booking
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Book an Appointment
          </h1>
          <p className="text-blue-100/80 text-lg max-w-xl mx-auto leading-relaxed">
            Schedule your visit online. Our team will confirm within 2 hours during working hours.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 -mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Form Column */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="bg-white rounded-[2rem] p-12 text-center shadow-xl shadow-slate-200/60 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    ✓
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h2>
                  <p className="text-slate-500 mb-2">
                    Thank you, <span className="font-bold text-slate-800">{form.name}</span>.
                  </p>
                  <p className="text-slate-500 mb-8">
                    Our team will call you at <strong className="text-blue-700">{form.phone}</strong> to confirm your slot.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setForm({ name:'',phone:'',email:'',dob:'',gender:'',doctor:'',service:'',date:'',time:'',message:'' }); }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-8 py-3 rounded-xl transition-colors"
                  >
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/60 border border-white">
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-slate-900">Patient Details</h2>
                    <p className="text-slate-400 text-sm mt-1">Please fill in the details accurately.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Meera Joshi" className={inputClass(errors.name)} />
                        {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Phone Number *</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass(errors.phone)} />
                        {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Email Address</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass(errors.email)} />
                      </div>

                      {/* Gender */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Gender *</label>
                        <select name="gender" value={form.gender} onChange={handleChange} className={inputClass(errors.gender)}>
                          <option value="">Select</option>
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>

                      {/* Specialty */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Specialty *</label>
                        <select name="service" value={form.service} onChange={handleChange} className={inputClass(errors.service)}>
                          <option value="">Select Specialty</option>
                          {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                        </select>
                      </div>

                      {/* Doctor */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Preferred Doctor</label>
                        <select name="doctor" value={form.doctor} onChange={handleChange} className={inputClass(false)}>
                          <option value="">No preference</option>
                          {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Preferred Date *</label>
                        <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass(errors.date)} min={new Date().toISOString().split('T')[0]} />
                      </div>

                      {/* Time */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase ml-1">Preferred Time</label>
                        <select name="time" value={form.time} onChange={handleChange} className={inputClass(false)}>
                          <option value="">Select time slot</option>
                          {['9:00 AM','11:00 AM','2:00 PM','5:00 PM'].map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase ml-1">Symptoms / Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={4} className={`${inputClass(false)} resize-none`} placeholder="Briefly describe your symptoms..." />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:scale-95">
                      Confirm Appointment Request
                    </button>
                    
                    <p className="text-center text-slate-400 text-[10px] mt-4 uppercase tracking-widest font-bold">
                      For medical emergencies, call 108 immediately.
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-white">
                <h4 className="text-xl font-bold text-slate-900 mb-6">OPD Timings</h4>
                <div className="space-y-4">
                  {[
                    ['Mon – Sat', '9:00 AM – 8:00 PM'],
                    ['Sunday', '10:00 AM – 2:00 PM'],
                    ['Emergency', '24 × 7']
                  ].map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                      <span className="font-bold text-slate-700 text-sm">{day}</span>
                      <span className="text-slate-500 text-sm font-medium">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500 p-8 rounded-[2rem] shadow-xl shadow-red-200/40 text-white relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <h4 className="text-xl font-bold mb-2 relative z-10">🚨 Emergency?</h4>
                <p className="text-red-100 text-sm mb-6 relative z-10">Call our emergency response team immediately for rapid assistance.</p>
                <a href="tel:108" className="block w-full bg-white text-red-600 text-center py-4 rounded-xl text-2xl font-black shadow-lg shadow-black/10 transition-transform active:scale-95">
                  108
                </a>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </main>
    <FloatingActions/>
<Footer/>
      </>
  );
}