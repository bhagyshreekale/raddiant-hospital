'use client';
import { useState } from 'react';
import { DOCTORS, SERVICES } from '../../lib/data';

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
    setSubmitted(true);
  };

  const inputStyle = err => ({
    width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${err ? 'var(--danger)' : 'var(--gray-200)'}`,
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none',
    transition: 'border 0.2s', background: 'white',
  });

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '80px 0 64px' }}>
        <div className="container text-center">
          <span className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--accent-light)', border: '1px solid rgba(255,255,255,0.2)' }}>Appointments</span>
          <h1 style={{ color: 'white', marginTop: 12 }}>Book an Appointment</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '16px auto 0', fontSize: '1.05rem' }}>Schedule your visit online. Our team will confirm within 2 hours during working hours.</p>
        </div>
      </section>

      <section className="section-py" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {submitted ? (
                <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '64px 40px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
                  <div style={{ fontSize: '4rem', marginBottom: 20 }}>✅</div>
                  <h2 style={{ color: 'var(--primary)', marginBottom: 12 }}>Appointment Request Received!</h2>
                  <p style={{ color: 'var(--gray-500)', fontSize: '1rem', marginBottom: 8 }}>Thank you, <strong>{form.name}</strong>. Our team will call you at <strong>{form.phone}</strong> to confirm your appointment.</p>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginBottom: 32 }}>For urgent care, call us directly at <a href="tel:+919876543210" style={{ color: 'var(--primary)', fontWeight: 600 }}>+91 98765 43210</a></p>
                  <button className="btn-primary-custom" onClick={() => { setSubmitted(false); setForm({ name:'',phone:'',email:'',dob:'',gender:'',doctor:'',service:'',date:'',time:'',message:'' }); }}>
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
                  <h2 style={{ marginBottom: 8 }}>Patient Details</h2>
                  <p style={{ color: 'var(--gray-500)', marginBottom: 32, fontSize: '0.9rem' }}>Fields marked with * are required.</p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-4">
                      {/* Name */}
                      <div className="col-md-6">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Meera Joshi" style={inputStyle(errors.name)} />
                        {errors.name && <span style={{ color: 'var(--danger)', fontSize: '0.78rem' }}>{errors.name}</span>}
                      </div>
                      {/* Phone */}
                      <div className="col-md-6">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Phone Number *</label>
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle(errors.phone)} />
                        {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.78rem' }}>{errors.phone}</span>}
                      </div>
                      {/* Email */}
                      <div className="col-md-6">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Email Address</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle(errors.email)} />
                        {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.78rem' }}>{errors.email}</span>}
                      </div>
                      {/* Gender */}
                      <div className="col-md-6">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Gender *</label>
                        <select name="gender" value={form.gender} onChange={handleChange} style={inputStyle(errors.gender)}>
                          <option value="">Select gender</option>
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                        {errors.gender && <span style={{ color: 'var(--danger)', fontSize: '0.78rem' }}>{errors.gender}</span>}
                      </div>
                      {/* Specialty */}
                      <div className="col-md-6">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Specialty / Department *</label>
                        <select name="service" value={form.service} onChange={handleChange} style={inputStyle(errors.service)}>
                          <option value="">Select specialty</option>
                          {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                        </select>
                        {errors.service && <span style={{ color: 'var(--danger)', fontSize: '0.78rem' }}>{errors.service}</span>}
                      </div>
                      {/* Doctor */}
                      <div className="col-md-6">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Preferred Doctor</label>
                        <select name="doctor" value={form.doctor} onChange={handleChange} style={inputStyle(false)}>
                          <option value="">No preference</option>
                          {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name} – {d.specialty}</option>)}
                        </select>
                      </div>
                      {/* Date */}
                      <div className="col-md-6">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Preferred Date *</label>
                        <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle(errors.date)} min={new Date().toISOString().split('T')[0]} />
                        {errors.date && <span style={{ color: 'var(--danger)', fontSize: '0.78rem' }}>{errors.date}</span>}
                      </div>
                      {/* Time */}
                      <div className="col-md-6">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Preferred Time</label>
                        <select name="time" value={form.time} onChange={handleChange} style={inputStyle(false)}>
                          <option value="">Select time slot</option>
                          {['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'].map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      {/* Message */}
                      <div className="col-12">
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, display: 'block' }}>Symptoms / Message</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Briefly describe your symptoms or reason for visit..." style={{ ...inputStyle(false), resize: 'vertical' }} />
                      </div>
                      {/* Submit */}
                      <div className="col-12">
                        <button type="submit" className="btn-primary-custom" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem' }}>
                          📅 Confirm Appointment Request
                        </button>
                        <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: '0.8rem', marginTop: 12 }}>
                          By submitting, you agree to be contacted by our team. For emergencies, call 108 immediately.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Sidebar info */}
            <div className="col-lg-4 d-none d-lg-block">
              <div style={{ position: 'sticky', top: 100 }}>
                <div className="card-custom p-4 mb-4">
                  <h4 style={{ marginBottom: 16 }}>OPD Timings</h4>
                  {[['Mon – Sat','9:00 AM – 8:00 PM'],['Sunday','10:00 AM – 2:00 PM'],['Emergency','24 × 7']].map(([d,t]) => (
                    <div key={d} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-200)', fontSize: '0.875rem' }}>
                      <span style={{ fontWeight: 600 }}>{d}</span><span style={{ color: 'var(--gray-500)' }}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--danger)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', color: 'white' }}>
                  <h4 style={{ color: 'white', marginBottom: 8 }}>🚨 Emergency?</h4>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', marginBottom: 12 }}>Do not use this form for emergencies. Call immediately:</p>
                  <a href="tel:108" style={{ display: 'block', background: 'white', color: 'var(--danger)', fontWeight: 800, textAlign: 'center', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '1.2rem' }}>108</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
