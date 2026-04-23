'use client';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

interface FormState {
  name: string;
  phone: string;
  email: string;
  gender: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  gender?: string;
  service?: string;
  date?: string;
  [key: string]: string | undefined;
}

interface Service {
  id: string;
  title: string;
}

interface Doctor {
  id: string;
  name: string;
}

interface OpdTiming {
  day: string;
  time: string;
  icon: string;
}

interface FloatingInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  min?: string;
}

interface FloatingSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string | null;
  children: React.ReactNode;
}

const SERVICES: Service[] = [
  { id: 'cardiology', title: 'Cardiology' },
  { id: 'neurology', title: 'Neurology' },
  { id: 'orthopedics', title: 'Orthopedics' },
  { id: 'dermatology', title: 'Dermatology' },
  { id: 'gynecology', title: 'Gynecology' },
  { id: 'pediatrics', title: 'Pediatrics' },
  { id: 'ophthalmology', title: 'Ophthalmology' },
  { id: 'ent', title: 'ENT' },
];

const DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr. Ananya Sharma' },
  { id: 'd2', name: 'Dr. Rohan Mehta' },
  { id: 'd3', name: 'Dr. Priya Nair' },
  { id: 'd4', name: 'Dr. Vikram Iyer' },
  { id: 'd5', name: 'Dr. Sunita Rao' },
];

const TIME_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

const OPD_TIMINGS: OpdTiming[] = [
  { day: 'Mon – Sat', time: '9:00 AM – 8:00 PM', icon: '📅' },
  { day: 'Sunday', time: '10:00 AM – 2:00 PM', icon: '🌤' },
  { day: 'Emergency', time: '24 × 7', icon: '🚑' },
];

function FloatingInput({ label, name, type = 'text', value, onChange, error, placeholder, min }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;

  return (
    
    <div style={{ position: 'relative', paddingTop: '8px' }}>
      <label style={{
        position: 'absolute', left: '14px',
        top: active ? '-2px' : '18px',
        fontSize: active ? '11px' : '14px',
        fontWeight: active ? '600' : '400',
        color: error ? '#ef4444' : (active ? '#0d9488' : '#94a3b8'),
        background: active ? '#fff' : 'transparent',
        padding: active ? '0 4px' : '0',
        pointerEvents: 'none',
        transition: 'all 0.18s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 1,
        letterSpacing: active ? '0.04em' : 'normal',
        textTransform: active ? 'uppercase' : 'none',
      }}>{label}</label>
      <input
        type={type} name={name} value={value} min={min}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={active ? placeholder : ''}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '14px 14px 10px',
          fontSize: '14px', color: '#1e293b',
          background: error ? '#fff5f5' : '#fff',
          border: `1.5px solid ${error ? '#ef4444' : (focused ? '#0d9488' : '#e2e8f0')}`,
          borderRadius: '12px',
          outline: 'none',
          transition: 'all 0.18s ease',
          boxShadow: focused ? '0 0 0 3px rgba(13,148,136,0.1)' : 'none',
          fontFamily: 'DM Sans, sans-serif',
        }}
      />
      {error && <p style={{ margin: '4px 0 0 4px', fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>{error}</p>}
    </div>
  );
}

function FloatingSelect({ label, name, value, onChange, error, children }: FloatingSelectProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;

  return (
    <div style={{ position: 'relative', paddingTop: '8px' }}>
      <label style={{
        position: 'absolute', left: '14px',
        top: active ? '-2px' : '18px',
        fontSize: active ? '11px' : '14px',
        fontWeight: active ? '600' : '400',
        color: error ? '#ef4444' : (active ? '#0d9488' : '#94a3b8'),
        background: active ? '#fff' : 'transparent',
        padding: active ? '0 4px' : '0',
        pointerEvents: 'none',
        transition: 'all 0.18s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 1,
        letterSpacing: active ? '0.04em' : 'normal',
        textTransform: active ? 'uppercase' : 'none',
      }}>{label}</label>
      <select
        name={name} value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '14px 36px 10px 14px',
          fontSize: '14px', color: value ? '#1e293b' : 'transparent',
          background: error ? '#fff5f5' : '#fff',
          border: `1.5px solid ${error ? '#ef4444' : (focused ? '#0d9488' : '#e2e8f0')}`,
          borderRadius: '12px',
          outline: 'none',
          appearance: 'none',
          cursor: 'pointer',
          transition: 'all 0.18s ease',
          boxShadow: focused ? '0 0 0 3px rgba(13,148,136,0.1)' : 'none',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >{children}</select>
      <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-30%)', color: '#94a3b8', pointerEvents: 'none', fontSize: '12px' }}>▾</span>
      {error && <p style={{ margin: '4px 0 0 4px', fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>{error}</p>}
    </div>
  );
}

export default function AppointmentPage() {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', email: '', gender: '', doctor: '', service: '', date: '', time: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const e: FormErrors = {};

    if (!form.name.trim()) {
e.name = 'Full name is required';
}

    if (!/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ''))) {
e.phone = 'Enter a valid phone number';
}

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
e.email = 'Enter a valid email';
}

    if (!form.service) {
e.service = 'Please select a specialty';
}

    if (!form.date) {
e.date = 'Please select a date';
}

    if (!form.gender) {
e.gender = 'Please select gender';
}

    return e;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));

    if (errors[name]) {
setErrors(er => ({ ...er, [name]: '' }));
}
  };

  const handleTimeSelect = (t: string): void => {
    setForm(f => ({ ...f, time: t }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
 setErrors(errs);

 return; 
}

    setSubmitted(true);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ✅ Navbar added here */}
      <Navbar />

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'DM Sans', sans-serif; background: #f0fafa; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 70% { box-shadow: 0 0 0 12px rgba(239,68,68,0); } 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes checkmark { from { stroke-dashoffset: 50; } to { stroke-dashoffset: 0; } }
        .card { animation: fadeUp 0.5s ease both; }
        .card:nth-child(2) { animation-delay: 0.1s; }
        .submit-btn:hover { background: linear-gradient(135deg, #0f766e, #0d9488) !important; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(13,148,136,0.35) !important; }
        .submit-btn:active { transform: scale(0.98); }
        .time-chip:hover { background: #f0fdfa !important; border-color: #0d9488 !important; }
        textarea { resize: none; font-family: 'DM Sans', sans-serif; }
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .main-grid { grid-template-columns: 1fr !important; }
          .hero-section { padding: 64px 20px 80px !important; }
          .form-card { padding: 28px 20px !important; }
          .time-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #0f2027 0%, #134e4a 40%, #0d9488 100%)',
        padding: '80px 24px 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', left: '5%', width: '1px', height: '120px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)' }} />

        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#99f6e4', padding: '6px 16px', borderRadius: '100px',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2dd4bf', display: 'inline-block' }} />
            Online Booking · Confirm in 2 Hours
          </span>
          <h1 className="hero-title" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '3rem', fontWeight: 700, color: '#fff',
            margin: '0 0 16px', lineHeight: 1.2, letterSpacing: '-0.02em',
          }}>
            Book Your <span style={{ color: '#5eead4', fontStyle: 'italic' }}>Appointment</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
            Expert care, just a few clicks away. Our specialists are ready to see you.
          </p>

          {/* Stats strip */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px', flexWrap: 'wrap' }}>
            {[['50+', 'Specialists'], ['98%', 'Patient Satisfaction'], ['24/7', 'Emergency Care']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#fff' }}>{num}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '-48px auto 60px', padding: '0 20px' }}>
        <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' }}>

          {/* Form Card */}
          <div className="card form-card" style={{
            background: '#fff', borderRadius: '24px', padding: '44px 40px',
            boxShadow: '0 4px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.8)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0', animation: 'scaleIn 0.4s ease' }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                  boxShadow: '0 12px 32px rgba(13,148,136,0.3)',
                }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M9 18l7 7 11-14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ strokeDasharray: 50, animation: 'checkmark 0.5s ease 0.2s both' }} />
                  </svg>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#0f2027', margin: '0 0 12px' }}>Request Confirmed!</h2>
                <p style={{ color: '#64748b', marginBottom: '6px' }}>
                  Thank you, <strong style={{ color: '#0f2027' }}>{form.name}</strong>.
                </p>
                <p style={{ color: '#64748b', marginBottom: '32px' }}>
                  We'll call you at <strong style={{ color: '#0d9488' }}>{form.phone}</strong> to confirm your slot.
                </p>
                <div style={{ background: '#f0fdf9', borderRadius: '16px', padding: '20px', marginBottom: '32px', border: '1px solid #99f6e4' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
                    {[['Specialty', SERVICES.find(s => s.id === form.service)?.title], ['Date', form.date], ['Time', form.time || 'TBD'], ['Doctor', DOCTORS.find(d => d.id === form.doctor)?.name || 'Any Available']].map(([k, v]) => v && (
                      <div key={k}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#0d9488', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>{k}</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => {
 setSubmitted(false); setForm({ name:'',phone:'',email:'',gender:'',doctor:'',service:'',date:'',time:'',message:'' }); 
}}
                  style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#475569', fontWeight: 600, padding: '12px 28px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s' }}>
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #0d9488, #0f766e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#0f2027', margin: 0 }}>Patient Details</h2>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 0 48px' }}>All fields marked * are required</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Section: Personal Info */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                      <div style={{ height: '1px', flex: 1, background: '#f1f5f9' }} />
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Personal Information</span>
                      <div style={{ height: '1px', flex: 1, background: '#f1f5f9' }} />
                    </div>
                    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                      <FloatingInput label="Full Name *" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Meera Joshi" />
                      <FloatingInput label="Phone Number *" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+91 98765 43210" />
                      <FloatingInput label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
                      <FloatingSelect label="Gender *" name="gender" value={form.gender} onChange={handleChange} error={errors.gender}>
                        <option value="" />
                        {['Male', 'Female', 'Other'].map(g => <option key={g}>{g}</option>)}
                      </FloatingSelect>
                    </div>
                  </div>

                  {/* Section: Appointment */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                      <div style={{ height: '1px', flex: 1, background: '#f1f5f9' }} />
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Appointment Details</span>
                      <div style={{ height: '1px', flex: 1, background: '#f1f5f9' }} />
                    </div>
                    <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                      <FloatingSelect label="Specialty *" name="service" value={form.service} onChange={handleChange} error={errors.service}>
                        <option value="" />
                        {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                      </FloatingSelect>
                      <FloatingSelect label="Preferred Doctor" name="doctor" value={form.doctor} onChange={handleChange} error={null}>
                        <option value="" />
                        {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </FloatingSelect>
                    </div>
                    <FloatingInput label="Preferred Date *" name="date" type="date" value={form.date} onChange={handleChange} error={errors.date} min={new Date().toISOString().split('T')[0]} />
                  </div>

                  {/* Time slots */}
                  <div style={{ marginBottom: '28px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px 2px' }}>Preferred Time Slot</p>
                    <div className="time-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                      {TIME_SLOTS.map(t => (
                        <button key={t} type="button" className="time-chip"
                          onClick={() => handleTimeSelect(t)}
                          onMouseEnter={() => setHoveredSlot(t)}
                          onMouseLeave={() => setHoveredSlot(null)}
                          style={{
                            padding: '10px 6px', fontSize: '13px', fontWeight: form.time === t ? 700 : 500,
                            background: form.time === t ? 'linear-gradient(135deg, #0d9488, #0f766e)' : '#f8fafc',
                            color: form.time === t ? '#fff' : '#475569',
                            border: `1.5px solid ${form.time === t ? '#0d9488' : '#e2e8f0'}`,
                            borderRadius: '10px', cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            fontFamily: 'DM Sans, sans-serif',
                            boxShadow: form.time === t ? '0 4px 12px rgba(13,148,136,0.25)' : 'none',
                          }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '32px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px 2px' }}>Symptoms / Message</p>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        padding: '14px', fontSize: '14px', color: '#1e293b',
                        background: '#fff', border: '1.5px solid #e2e8f0',
                        borderRadius: '12px', outline: 'none',
                        transition: 'border 0.18s ease',
                        fontFamily: 'DM Sans, sans-serif',
                        lineHeight: 1.6,
                      }}
                      onFocus={e => e.target.style.border = '1.5px solid #0d9488'}
                      onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                    />
                  </div>

                  <button type="submit" className="submit-btn" style={{
                    width: '100%', padding: '16px',
                    background: 'linear-gradient(135deg, #0d9488, #134e4a)',
                    color: '#fff', fontSize: '15px', fontWeight: 700,
                    border: 'none', borderRadius: '14px', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 8px 24px rgba(13,148,136,0.25)',
                    fontFamily: 'DM Sans, sans-serif',
                    letterSpacing: '0.02em',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Confirm Appointment Request
                  </button>

                  <p style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '16px' }}>
                    For medical emergencies, call 108 immediately
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '24px' }}>

            {/* OPD Timings */}
            <div className="card" style={{
              background: '#fff', borderRadius: '20px', padding: '28px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #f0fdf9',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🕐</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#0f2027', margin: 0 }}>OPD Timings</h4>
              </div>
              {OPD_TIMINGS.map(({ day, time, icon }, i) => (
                <div key={day} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '13px 0',
                  borderBottom: i < OPD_TIMINGS.length - 1 ? '1px solid #f8fafc' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px' }}>{icon}</span>
                    <span style={{ fontWeight: 600, color: '#334155', fontSize: '13px' }}>{day}</span>
                  </div>
                  <span style={{
                    fontSize: '12px', fontWeight: 600, color: '#0d9488',
                    background: '#f0fdf9', padding: '4px 10px', borderRadius: '100px',
                    border: '1px solid #99f6e4',
                  }}>{time}</span>
                </div>
              ))}
            </div>

            {/* Why Us */}
            <div className="card" style={{
              background: '#fff', borderRadius: '20px', padding: '28px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #f0fdf9',
            }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', color: '#0f2027', margin: '0 0 18px' }}>Why Choose Us?</h4>
              {[
                ['🏅', 'NABH Accredited Hospital'],
                ['🩺', 'Expert Panel of 50+ Specialists'],
                ['💊', 'In-house Pharmacy & Lab'],
                ['📱', 'Digital Health Records'],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>{icon}</div>
                  <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Emergency */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, #1e0a0a 0%, #7f1d1d 100%)',
              borderRadius: '20px', padding: '28px',
              boxShadow: '0 8px 32px rgba(239,68,68,0.25)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>🚨</div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#fff', margin: '0 0 8px' }}>Emergency?</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: '0 0 20px', lineHeight: 1.6 }}>
                  Rapid response team available around the clock for critical cases.
                </p>
                <a href="tel:108" style={{
                  display: 'block', textAlign: 'center',
                  background: '#fff', color: '#dc2626',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '28px', fontWeight: 700,
                  padding: '14px', borderRadius: '14px',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  transition: 'all 0.15s ease',
                  animation: 'pulse-ring 2s infinite',
                }}>108</a>
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* ✅ Footer added here */}
      <Footer />
    </>
  );
}
