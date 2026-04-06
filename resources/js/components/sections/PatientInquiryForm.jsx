'use client';
// src/components/sections/PatientInquiryForm.jsx
// ✅ CLIENT COMPONENT — all interactivity lives here, no metadata export
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { SITE } from '../../lib/data';

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

const pageStyles = `
  .inquiry-section { padding: 80px 0; background: var(--off-white); }

  .inquiry-wrap {
    display: grid;
    grid-template-columns: 1fr 1.55fr;
    gap: 48px;
    align-items: start;
  }

  /* left panel */
  .inquiry-left { position: sticky; top: 100px; }
  .inquiry-left .section-subtitle { margin-bottom: 28px; }

  .inq-trust-list {
    list-style: none;
    display: flex; flex-direction: column; gap: 14px;
    margin-bottom: 32px;
  }
  .inq-trust-item {
    display: flex; align-items: center; gap: 12px;
    font-size: .9rem; font-weight: 500; color: var(--gray-700);
  }
  .inq-trust-icon {
    width: 36px; height: 36px; border-radius: var(--radius-sm);
    background: linear-gradient(135deg, var(--primary-light), var(--primary));
    display: flex; align-items: center; justify-content: center;
    color: var(--white); font-size: .9rem; flex-shrink: 0;
  }

  .inq-contact-strip {
    background: var(--white); border: 1px solid var(--gray-200);
    border-radius: var(--radius-lg); padding: 22px 20px;
    display: flex; flex-direction: column; gap: 14px;
    box-shadow: var(--shadow-sm);
  }
  .inq-contact-row { display: flex; align-items: center; gap: 12px; }
  .inq-contact-icon {
    width: 36px; height: 36px; background: var(--primary); border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: var(--white); font-size: .9rem; flex-shrink: 0;
  }
  .inq-contact-label {
    font-size: .72rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: var(--gray-500); margin-bottom: 1px;
  }
  .inq-contact-val { font-size: .88rem; font-weight: 500; color: var(--gray-900); }

  /* form card */
  .inquiry-card {
    background: var(--white); border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg); border: 1px solid var(--gray-200); overflow: hidden;
  }
  .inquiry-card-head {
    background: linear-gradient(135deg, var(--primary-dark), var(--primary));
    padding: 28px 32px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .inquiry-card-head h3 { color: var(--white); font-size: 1.15rem; margin: 0; }
  .inquiry-card-head p  { color: rgba(255,255,255,.65); font-size: .82rem; margin: 4px 0 0; }
  .inquiry-card-badge {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
    padding: 6px 14px; border-radius: var(--radius-full);
    color: var(--accent-light); font-size: .72rem; font-weight: 700;
    letter-spacing: .07em; text-transform: uppercase; white-space: nowrap; flex-shrink: 0;
  }
  .live-dot-sm {
    width: 7px; height: 7px; border-radius: 50%; background: var(--accent-light);
    animation: pulse-sm 1.8s ease-in-out infinite;
  }
  @keyframes pulse-sm { 0%,100%{opacity:1} 50%{opacity:.4} }

  .inquiry-form { padding: 32px; }

  .form-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
  }
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
  .form-group.full { grid-column: 1 / -1; }
  .form-label {
    font-size: .78rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; color: var(--gray-700);
  }
  .form-label span { color: var(--danger); margin-left: 2px; }

  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 11px 14px;
    border: 1.5px solid var(--gray-200); border-radius: var(--radius-md);
    font-family: var(--font-body); font-size: .9rem;
    color: var(--gray-900); background: var(--white); outline: none;
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--primary-light);
    box-shadow: 0 0 0 3px rgba(26,107,191,.12);
  }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--gray-500); }
  .form-select {
    appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px;
  }
  .form-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }

  .radio-group { display: flex; flex-wrap: wrap; gap: 10px; }
  .radio-option input { display: none; }
  .radio-option label {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 16px; border-radius: var(--radius-full);
    border: 1.5px solid var(--gray-200); background: var(--white);
    font-size: .84rem; font-weight: 500; color: var(--gray-700);
    cursor: pointer; transition: all var(--transition);
  }
  .radio-option label::before {
    content: ''; width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid var(--gray-400); transition: all var(--transition); flex-shrink: 0;
  }
  .radio-option input:checked + label {
    border-color: var(--primary); background: rgba(26,107,191,.06); color: var(--primary);
  }
  .radio-option input:checked + label::before {
    background: var(--primary); border-color: var(--primary);
    box-shadow: inset 0 0 0 3px var(--white);
  }

  .form-divider { height: 1px; background: var(--gray-200); margin: 4px 0 22px; }
  .form-section-title {
    font-size: .72rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .1em; color: var(--accent); margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }
  .form-section-title::after { content: ''; flex: 1; height: 1px; background: rgba(0,180,216,.2); }

  .submit-btn {
    width: 100%; padding: 15px;
    background: linear-gradient(135deg, var(--primary-light), var(--primary));
    color: var(--white); border: none; border-radius: var(--radius-full);
    font-family: var(--font-body); font-size: 1rem; font-weight: 700;
    cursor: pointer; box-shadow: 0 4px 16px rgba(10,77,140,.3);
    transition: all var(--transition);
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(10,77,140,.4); }
  .submit-btn:disabled { opacity: .7; cursor: not-allowed; }

  .success-box { padding: 56px 32px; text-align: center; }
  .success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, var(--success), #16a34a);
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; color: var(--white);
    margin: 0 auto 20px;
    box-shadow: 0 8px 24px rgba(42,157,143,.35);
    animation: pop-in .4s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes pop-in { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
  .success-box h3 { font-size: 1.4rem; margin-bottom: 8px; }
  .success-box p { color: var(--gray-500); font-size: .95rem; max-width: 340px; margin: 0 auto 24px; }
  .success-ref {
    display: inline-block; background: var(--gray-100); border: 1px solid var(--gray-200);
    border-radius: var(--radius-md); padding: 10px 20px;
    font-size: .82rem; font-weight: 600; color: var(--gray-700); letter-spacing: .04em;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 900px) {
    .inquiry-wrap { grid-template-columns: 1fr; }
    .inquiry-left  { position: static; }
    .form-row      { grid-template-columns: 1fr; }
  }
  @media (max-width: 540px) {
    .inquiry-form { padding: 22px 18px; }
    .inquiry-card-head { padding: 22px 18px; flex-direction: column; align-items: flex-start; }
  }
`;

function generateRef() {
  return 'RPH-' + Date.now().toString(36).toUpperCase().slice(-6);
}

export default function PatientInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [refId,     setRefId]     = useState('');
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
    { icon: <FaMapMarkerAlt />, label: 'Address',   value: SITE.address },
    { icon: <FaPhoneAlt />,    label: 'Phone',     value: SITE.phone   },
    { icon: <FaEnvelope />,    label: 'Email',     value: SITE.email   },
    { icon: <FaClock />,       label: 'OPD Hours', value: 'Mon–Sat: 9 AM – 8 PM | Emergency: 24×7' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <section className="inquiry-section">
        <div className="container">
          <div className="inquiry-wrap">

            {/* ── LEFT ── */}
            <div className="inquiry-left">
              <span className="section-label">Patient Inquiry</span>
              <h2 className="section-title" style={{ marginBottom: 8 }}>Book an Appointment</h2>
              <div className="divider-accent" />
              <p className="section-subtitle">
                Fill in your details and we'll confirm your slot within 2 hours during OPD hours.
              </p>

              <ul className="inq-trust-list">
                {[
                  ['✓', 'Confirmation within 2 hours'],
                  ['🕐', 'Zero waiting time guarantee'],
                  ['🔒', 'Your data is 100% private'],
                  ['💳', 'Cashless insurance accepted'],
                  ['🚑', 'Emergency walk-ins welcome'],
                ].map(([icon, text]) => (
                  <li key={text} className="inq-trust-item">
                    <div className="inq-trust-icon">{icon}</div>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="inq-contact-strip">
                {CONTACT_ITEMS.map(item => (
                  <div key={item.label} className="inq-contact-row">
                    <div className="inq-contact-icon">{item.icon}</div>
                    <div>
                      <div className="inq-contact-label">{item.label}</div>
                      <div className="inq-contact-val">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — FORM CARD ── */}
            <div className="inquiry-card">
              <div className="inquiry-card-head">
                <div>
                  <h3>Patient Inquiry Form</h3>
                  <p>All fields marked * are required</p>
                </div>
                <div className="inquiry-card-badge">
                  <div className="live-dot-sm" />
                  Accepting Bookings
                </div>
              </div>

              {submitted ? (
                <div className="success-box">
                  <div className="success-icon">✓</div>
                  <h3>Inquiry Submitted!</h3>
                  <p>
                    Thank you, <strong>{form.firstName}</strong>. Our team will call you within
                    2 hours to confirm your appointment.
                  </p>
                  <div className="success-ref">Reference ID: {refId}</div>
                  <br /><br />
                  <button
                    className="btn-primary-custom"
                    style={{ margin: '0 auto' }}
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form className="inquiry-form" onSubmit={handleSubmit}>

                  {/* Personal */}
                  <div className="form-section-title">Personal Details</div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name <span>*</span></label>
                      <input className="form-input" placeholder="Rahul" required
                        value={form.firstName} onChange={set('firstName')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name <span>*</span></label>
                      <input className="form-input" placeholder="Sharma" required
                        value={form.lastName} onChange={set('lastName')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span>*</span></label>
                      <input className="form-input" type="tel" placeholder="+91 98765 43210" required
                        value={form.phone} onChange={set('phone')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" placeholder="you@email.com"
                        value={form.email} onChange={set('email')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Age <span>*</span></label>
                      <input className="form-input" type="number" min="0" max="120" placeholder="32" required
                        value={form.age} onChange={set('age')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender <span>*</span></label>
                      <select className="form-select" required value={form.gender} onChange={set('gender')}>
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-divider" />

                  {/* Appointment */}
                  <div className="form-section-title">Appointment Details</div>
                  <div className="form-row">
                    <div className="form-group full">
                      <label className="form-label">Visit Type <span>*</span></label>
                      <div className="radio-group">
                        {['OPD', 'Emergency', 'Second Opinion', 'Diagnostic / Lab', 'Health Package'].map(v => (
                          <div key={v} className="radio-option">
                            <input type="radio" id={`vt-${v}`} name="visitType" value={v}
                              checked={form.visitType === v} onChange={set('visitType')} />
                            <label htmlFor={`vt-${v}`}>{v}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="form-group full">
                      <label className="form-label">Department / Speciality <span>*</span></label>
                      <select className="form-select" required value={form.department} onChange={set('department')}>
                        <option value="">Select department</option>
                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Date <span>*</span></label>
                      <input className="form-input" type="date"
                        min={new Date().toISOString().split('T')[0]} required
                        value={form.preferredDate} onChange={set('preferredDate')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Time Slot</label>
                      <select className="form-select" value={form.preferredSlot} onChange={set('preferredSlot')}>
                        <option value="">Any available</option>
                        {TIME_SLOTS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-divider" />

                  {/* Insurance */}
                  <div className="form-section-title">Insurance & Additional Info</div>
                  <div className="form-row">
                    <div className="form-group full">
                      <label className="form-label">Insurance / TPA Provider</label>
                      <input className="form-input"
                        placeholder="e.g. Star Health, HDFC ERGO, PMJAY (leave blank if none)"
                        value={form.insurance} onChange={set('insurance')} />
                    </div>
                    <div className="form-group full">
                      <label className="form-label">Brief Description of Symptoms / Reason for Visit</label>
                      <textarea className="form-textarea"
                        placeholder="Briefly describe your symptoms or reason for visit…"
                        value={form.message} onChange={set('message')} />
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <span style={{
                          width: 18, height: 18,
                          border: '2px solid rgba(255,255,255,.4)',
                          borderTopColor: 'white', borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'spin .7s linear infinite',
                        }} />
                        Submitting…
                      </>
                    ) : '📋 Submit Inquiry'}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '.78rem', color: 'var(--gray-500)', marginTop: 14 }}>
                    🔒 Your information is confidential and used only to schedule your appointment.
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
