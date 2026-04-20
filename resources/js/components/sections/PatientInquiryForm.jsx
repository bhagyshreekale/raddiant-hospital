'use client';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { SITE } from '../../lib copy/data';

// ── Design tokens (no CSS vars — all hardcoded) ──
const C = {
  primary:     '#00364f',   // dark navy
  primaryHov:  '#00273a',
  accent:      '#0ea5e9',   // sky blue
  accentLight: 'rgba(14,165,233,0.10)',
  green:       '#22c55e',
  white:       '#ffffff',
  bg:          '#f1f5f9',
  card:        '#ffffff',
  border:      '#e2e8f0',
  dark:        '#0f172a',
  text:        '#1e293b',
  muted:       '#64748b',
  subtle:      '#94a3b8',
  inputBg:     '#f8fafc',
};

const DEPARTMENTS = [
  'General Medicine','Cardiology','Orthopaedics','Gynaecology & Obstetrics',
  'Paediatrics','Neurology','Urology','ENT','Dermatology',
  'Ophthalmology','Oncology','Radiology & Diagnostics','Emergency / Casualty','Other',
];

const TIME_SLOTS = [
  '9:00 AM – 10:00 AM','10:00 AM – 11:00 AM','11:00 AM – 12:00 PM',
  '12:00 PM – 1:00 PM','2:00 PM – 3:00 PM','3:00 PM – 4:00 PM',
  '4:00 PM – 5:00 PM','5:00 PM – 6:00 PM','6:00 PM – 7:00 PM',
];

const VISIT_TYPES = ['OPD','Emergency','Second Opinion','Diagnostic'];

const TRUST_ITEMS = [
  { icon: '✓', text: 'Confirmation within 2 hours' },
  { icon: '🕐', text: 'Zero waiting time guarantee' },
  { icon: '🔒', text: 'Your data is 100% private' },
  { icon: '🚑', text: 'Emergency walk-ins welcome' },
];

function generateRef() {
  return 'RPH-' + Date.now().toString(36).toUpperCase().slice(-6);
}

// ── Base input style ──
const baseInp = {
  width: '100%', padding: '11px 14px', fontSize: 14,
  color: C.text, background: C.inputBg,
  border: `1.5px solid ${C.border}`, borderRadius: 10,
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s',
};

function inpStyle(key, focused) {
  return {
    ...baseInp,
    borderColor: focused === key ? C.accent : C.border,
    boxShadow:   focused === key ? `0 0 0 3px rgba(14,165,233,0.12)` : 'none',
  };
}

function Field({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11.5, fontWeight: 700, color: C.muted, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0 14px' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: C.subtle, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

export default function PatientInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [refId,     setRefId]     = useState('');
  const [focused,   setFocused]   = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    age: '', gender: '', department: '', visitType: 'OPD',
    preferredDate: '', preferredSlot: '', message: '',
  });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const fi  = k => inpStyle(k, focused);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setRefId(generateRef());
    setLoading(false);
    setSubmitted(true);
  };

  const CONTACT_ITEMS = [
    { icon: <FaMapMarkerAlt />, label: 'Address',   value: SITE.address },
    { icon: <FaPhoneAlt />,     label: 'Phone',     value: SITE.phone },
    { icon: <FaEnvelope />,     label: 'Email',     value: SITE.email },
    { icon: <FaClock />,        label: 'OPD Hours', value: 'Mon–Sat: 9 AM – 8 PM' },
  ];

  return (
    <>
      <style>{`
        @media(max-width:900px){.inq-layout{grid-template-columns:1fr!important}}
        @media(max-width:540px){.inq-grid-2{grid-template-columns:1fr!important}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{transform:scale(0.5)}75%{transform:scale(1.15)}100%{transform:scale(1)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .inq-submit:hover:not(:disabled){background:#00273a!important;transform:translateY(-1px)}
        .inq-submit:disabled{opacity:.65;cursor:not-allowed}
        .inq-radio:hover{border-color:#0ea5e9!important}
        .inq-another:hover{background:#00364f!important;color:#fff!important}
      `}</style>

      <section style={{ background: C.bg, padding: 'clamp(48px,8vw,96px) 20px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>

          {/* ── Heading ── */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', background: C.accentLight, color: C.accent, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100, marginBottom: 12 }}>
              Patient Inquiry
            </span>
            <h2 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: C.dark, margin: 0, lineHeight: 1.2 }}>
              Book an Appointment
            </h2>
            <p style={{ marginTop: 10, color: C.muted, fontSize: 15 }}>
              We'll confirm your slot within 2 hours during OPD hours.
            </p>
          </div>

          <div className="inq-layout" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>

            {/* ── LEFT ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Trust */}
              <div style={{ background: C.card, borderRadius: 16, padding: '24px 20px', border: `1px solid ${C.border}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.subtle, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>Why choose us</p>
                {TRUST_ITEMS.map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div
  style={{
    flexShrink: 0,
    width: 36,
    height: 36,
    borderRadius: 10,
    background: C.accentLight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: '#001d3b' // 👈 icon color added
  }}
>
  {item.icon}
</div>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: '#334155' }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div style={{ background: C.dark, borderRadius: 16, padding: '24px 20px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>Contact Info</p>
                {CONTACT_ITEMS.map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                    <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,0.08)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b' }}>{item.label}</p>
                      <p style={{ margin: 0, fontSize: 13.5, fontWeight: 500, color: '#e2e8f0', lineHeight: 1.5 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── FORM CARD ── */}
            <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.border}`, overflow: 'hidden', animation: 'fadeUp 0.4s ease' }}>

              {/* Card header — solid dark navy, white text */}
              <div style={{ background: C.primary, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.white }}>Patient Inquiry Form</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>All fields marked * are required</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 100, padding: '6px 14px' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.white, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Accepting Bookings</span>
                </div>
              </div>

              {submitted ? (
                /* ── SUCCESS ── */
                <div style={{ padding: '56px 28px', textAlign: 'center', animation: 'fadeUp 0.4s ease' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.green, color: C.white, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', animation: 'pop 0.45s ease' }}>✓</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: C.dark, margin: '0 0 10px' }}>Inquiry Submitted!</h3>
                  <p style={{ color: C.muted, fontSize: 14.5, maxWidth: 340, margin: '0 auto 24px', lineHeight: 1.7 }}>
                    Thank you, <strong style={{ color: C.dark }}>{form.firstName}</strong>. Our team will call you within 2 hours to confirm your appointment.
                  </p>
                  <div style={{ display: 'inline-block', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '10px 24px', fontSize: 13, fontWeight: 700, color: '#166534', marginBottom: 28 }}>
                    Reference ID: {refId}
                  </div>
                  <br />
                  <button
                    className="inq-another"
                    onClick={() => setSubmitted(false)}
                    style={{ marginTop: 8, padding: '11px 32px', borderRadius: 100, border: `2px solid ${C.primary}`, background: 'none', color: C.primary, fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* ── FORM ── */
                <form onSubmit={handleSubmit} style={{ padding: 'clamp(20px,4vw,32px)' }}>

                  <SectionLabel>Personal Details</SectionLabel>
                  <div className="inq-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <Field label="First Name" required>
                      <input required style={fi('firstName')} value={form.firstName} onChange={set('firstName')} onFocus={()=>setFocused('firstName')} onBlur={()=>setFocused('')} placeholder="Rahul" />
                    </Field>
                    <Field label="Last Name" required>
                      <input required style={fi('lastName')} value={form.lastName} onChange={set('lastName')} onFocus={()=>setFocused('lastName')} onBlur={()=>setFocused('')} placeholder="Sharma" />
                    </Field>
                    <Field label="Phone" required>
                      <input required type="tel" style={fi('phone')} value={form.phone} onChange={set('phone')} onFocus={()=>setFocused('phone')} onBlur={()=>setFocused('')} placeholder="+91 98765 43210" />
                    </Field>
                    <Field label="Age" required>
                      <input required type="number" min="1" max="120" style={fi('age')} value={form.age} onChange={set('age')} onFocus={()=>setFocused('age')} onBlur={()=>setFocused('')} placeholder="32" />
                    </Field>
                    <Field label="Email">
                      <input type="email" style={fi('email')} value={form.email} onChange={set('email')} onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')} placeholder="rahul@example.com" />
                    </Field>
                    <Field label="Gender">
                      <select style={fi('gender')} value={form.gender} onChange={set('gender')} onFocus={()=>setFocused('gender')} onBlur={()=>setFocused('')}>
                        <option value="">Select</option>
                        <option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </Field>
                  </div>

                  <SectionLabel>Appointment Details</SectionLabel>

                  <Field label="Visit Type" required>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                      {VISIT_TYPES.map(v => {
                        const active = form.visitType === v;
                        return (
                          <label key={v} className="inq-radio" style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            padding: '8px 16px', borderRadius: 100,
                            border: `1.5px solid ${active ? C.accent : C.border}`,
                            background: active ? C.accentLight : C.white,
                            cursor: 'pointer', fontSize: 13, fontWeight: 600,
                            color: active ? C.accent : C.muted,
                            transition: 'all 0.15s', userSelect: 'none',
                          }}>
                            <input type="radio" name="visitType" value={v} checked={active} onChange={set('visitType')} style={{ display: 'none' }} />
                            <span style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${active ? C.accent : '#cbd5e1'}`, background: active ? C.accent : 'transparent', flexShrink: 0 }} />
                            {v}
                          </label>
                        );
                      })}
                    </div>
                  </Field>

                  <div className="inq-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <Field label="Department" required>
                      <select required style={fi('department')} value={form.department} onChange={set('department')} onFocus={()=>setFocused('department')} onBlur={()=>setFocused('')}>
                        <option value="">Select department</option>
                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </Field>
                    <div />
                    <Field label="Preferred Date" required>
                      <input required type="date" style={fi('preferredDate')} value={form.preferredDate} onChange={set('preferredDate')} min={new Date().toISOString().split('T')[0]} onFocus={()=>setFocused('preferredDate')} onBlur={()=>setFocused('')} />
                    </Field>
                    <Field label="Preferred Time Slot">
                      <select style={fi('preferredSlot')} value={form.preferredSlot} onChange={set('preferredSlot')} onFocus={()=>setFocused('preferredSlot')} onBlur={()=>setFocused('')}>
                        <option value="">Any available</option>
                        {TIME_SLOTS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Symptoms / Description">
                    <textarea
                      style={{ ...fi('message'), minHeight: 90, resize: 'vertical' }}
                      value={form.message}
                      onChange={set('message')}
                      onFocus={()=>setFocused('message')}
                      onBlur={()=>setFocused('')}
                      placeholder="Briefly describe your reason for visit…"
                    />
                  </Field>

                  {/* Submit button — solid dark navy, always visible */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inq-submit"
                    style={{
                      marginTop: 22, width: '100%', padding: '14px',
                      borderRadius: 12, background: C.primary,
                      border: 'none', color: C.white,
                      fontSize: 15, fontWeight: 700,
                      cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', gap: 10,
                      transition: 'background 0.2s, transform 0.15s',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {loading
                      ? <span style={{ width: 20, height: 20, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: C.white, display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                      : <>Submit Inquiry</>
                    }
                  </button>

                  <p style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: C.subtle }}>
                    🔒 Your information is confidential and used only for medical scheduling.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
