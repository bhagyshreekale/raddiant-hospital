'use client';

// components/sections/JobListingsClient.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Self-contained 'use client' component — merges everything in one file.
// No dynamic() import, no separate JobListings.jsx needed.
//
// Usage in app/careers/page.jsx  (plain static import is fine):
//   import JobListingsClient from '../../components/sections/JobListingsClient';
//   ...
//   <JobListingsClient />
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from 'react';
import { JOB_LISTINGS, DEPARTMENTS } from '../../lib/careersData';
import {
  FaBriefcase, FaMapMarkerAlt, FaClock, FaChevronDown,
  FaChevronUp, FaTimes, FaUpload, FaCheckCircle, FaFire,
} from 'react-icons/fa';

// ── Helpers ────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return `${diff} days ago`;
}

// ── Field helpers ──────────────────────────────────────────────────────────

function Field({ label, error, children, style }) {
  return (
    <div style={style}>
      <label style={{
        display: 'block', fontSize: '0.75rem', fontWeight: 600,
        color: 'var(--gray-600,#4b5563)', marginBottom: 5,
        textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        {label}
      </label>
      {children}
      {error && <p style={{ margin: '4px 0 0', fontSize: '0.7rem', color: '#ef4444' }}>{error}</p>}
    </div>
  );
}

function fieldStyle(error) {
  return {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    border: `1.5px solid ${error ? '#ef4444' : 'var(--gray-200,#e5e7eb)'}`,
    fontSize: '0.85rem', color: 'var(--gray-800,#1f2937)',
    background: 'white', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s', fontFamily: 'inherit',
  };
}

// ── Apply Modal ────────────────────────────────────────────────────────────

function ApplyModal({ job, onClose }) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', experience: '', message: '' });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const set = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.value }));

  function validate() {
    const e = {};
    if (!fields.name.trim()) e.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(fields.phone.replace(/\s/g, ''))) e.phone = '10-digit number required';
    if (!fields.experience) e.experience = 'Required';
    if (!file) e.file = 'Please attach your resume';
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    // TODO: POST to /api/careers/apply
    setSubmitted(true);
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div onClick={handleBackdrop} style={modal.backdrop}>
      <div style={modal.box}>
        {/* Header */}
        <div style={modal.header}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ fontSize: '1.4rem' }}>{job.icon}</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--gray-800,#1f2937)' }}>{job.title}</h3>
              <p style={{ margin: '3px 0 0', fontSize: '0.76rem', color: 'var(--gray-500,#6b7280)' }}>
                {job.department} · {job.type} · {job.location}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={modal.closeBtn} aria-label="Close modal">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div style={modal.body}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 8 }}>🎉</div>
              <FaCheckCircle style={{ color: '#10b981', fontSize: '2rem', marginBottom: 12 }} />
              <h4 style={{ margin: '0 0 8px', color: 'var(--gray-800,#1f2937)' }}>Application Submitted!</h4>
              <p style={{ color: 'var(--gray-500,#6b7280)', fontSize: '0.87rem', margin: 0 }}>
                Thank you, <strong>{fields.name}</strong>! Our HR team will reach out to{' '}
                <strong>{fields.email}</strong> within 3–5 working days.
              </p>
              <button
                onClick={onClose}
                style={{ ...modal.submitBtn, marginTop: 24, width: 'auto', padding: '10px 32px' }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div style={modal.grid2}>
                <Field label="Full Name *" error={errors.name}>
                  <input value={fields.name} onChange={set('name')} placeholder="Dr. Priya Sharma" style={fieldStyle(errors.name)} />
                </Field>
                <Field label="Email Address *" error={errors.email}>
                  <input type="email" value={fields.email} onChange={set('email')} placeholder="priya@example.com" style={fieldStyle(errors.email)} />
                </Field>
                <Field label="Mobile Number *" error={errors.phone}>
                  <input type="tel" value={fields.phone} onChange={set('phone')} placeholder="98765 43210" style={fieldStyle(errors.phone)} />
                </Field>
                <Field label="Years of Experience *" error={errors.experience}>
                  <select value={fields.experience} onChange={set('experience')} style={fieldStyle(errors.experience)}>
                    <option value="">Select range</option>
                    {['0–1 year', '1–3 years', '3–5 years', '5–8 years', '8–12 years', '12+ years'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Cover Note (optional)" style={{ marginTop: 14 }}>
                <textarea
                  value={fields.message} onChange={set('message')} rows={3}
                  placeholder="Tell us why you'd be a great fit…"
                  style={{ ...fieldStyle(), resize: 'vertical', minHeight: 80 }}
                />
              </Field>

              <Field label="Resume / CV *" error={errors.file} style={{ marginTop: 14 }}>
                <div
                  onClick={() => fileRef.current.click()}
                  style={{
                    border: `2px dashed ${errors.file ? '#ef4444' : 'var(--gray-200,#e5e7eb)'}`,
                    borderRadius: 10, padding: 16, textAlign: 'center',
                    cursor: 'pointer', background: file ? '#f0fdf4' : '#fafafa',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <FaUpload style={{ color: file ? '#10b981' : 'var(--gray-400,#9ca3af)', fontSize: '1.2rem', marginBottom: 6 }} />
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--gray-500,#6b7280)' }}>
                    {file ? `✅ ${file.name}` : 'Click to upload PDF, DOC, or DOCX (max 5MB)'}
                  </p>
                  <input
                    ref={fileRef} type="file" accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setErrors(p => ({ ...p, file: undefined }));
                    }}
                  />
                </div>
              </Field>

              <button onClick={handleSubmit} style={modal.submitBtn}>
                Submit Application
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Job Card ──────────────────────────────────────────────────────────────

function JobCard({ job, onApply, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="job-card-anim" style={{ ...card.wrapper, animationDelay: `${index * 60}ms` }}>
      <div style={card.top}>
        <div style={card.iconCircle}>{job.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={card.title}>{job.title}</h3>
            {job.urgent && (
              <span style={card.urgentBadge}>
                <FaFire style={{ fontSize: '0.6rem' }} /> Urgent
              </span>
            )}
          </div>
          <div style={card.meta}>
            <span><FaBriefcase style={card.metaIcon} />{job.department}</span>
            <span><FaMapMarkerAlt style={card.metaIcon} />{job.location}</span>
            <span><FaClock style={card.metaIcon} />{job.type}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
          <span style={card.expBadge}>{job.experience}</span>
          <span style={card.date}>{timeAgo(job.posted)}</span>
        </div>
      </div>

      <p style={card.desc}>{job.description}</p>

      {expanded && (
        <div style={card.expandedArea}>
          <div style={card.expandGrid}>
            <div>
              <h4 style={card.subHead}>Responsibilities</h4>
              <ul style={card.list}>{job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
            <div>
              <h4 style={card.subHead}>Requirements</h4>
              <ul style={card.list}>{job.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          </div>
          <div style={card.salaryRow}>
            <span style={card.salaryLabel}>Salary Range</span>
            <span style={card.salaryValue}>{job.salary}</span>
          </div>
        </div>
      )}

      <div style={card.footer}>
        <button onClick={() => setExpanded(!expanded)} style={card.detailsBtn}>
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
        <button onClick={() => onApply(job)} style={card.applyBtn}>
          Apply Now
        </button>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export default function JobListingsClient() {
  const [activeTab, setActiveTab] = useState('All');
  const [applyJob, setApplyJob] = useState(null);

  const filtered = activeTab === 'All'
    ? JOB_LISTINGS
    : JOB_LISTINGS.filter((j) => j.department === activeTab);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .job-card-anim { animation: cardIn 0.4s ease both; }
        .job-card-anim:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.10) !important;
          transform: translateY(-2px);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .filter-tab:hover {
          background: var(--primary,#0d6efd) !important;
          color: white !important;
        }
      `}</style>

      {/* Department filter tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            className="filter-tab"
            onClick={() => setActiveTab(dept)}
            style={{
              padding: '7px 18px', borderRadius: 20, border: '1.5px solid',
              borderColor: activeTab === dept ? 'var(--primary,#0d6efd)' : 'var(--gray-200,#e5e7eb)',
              background: activeTab === dept ? 'var(--primary,#0d6efd)' : 'white',
              color: activeTab === dept ? 'white' : 'var(--gray-600,#4b5563)',
              fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s',
            }}
          >
            {dept}
            {dept !== 'All' && (
              <span style={{ marginLeft: 6, fontSize: '0.68rem', opacity: 0.75 }}>
                ({JOB_LISTINGS.filter(j => j.department === dept).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ fontSize: '0.82rem', color: 'var(--gray-500,#6b7280)', marginBottom: 16 }}>
        Showing{' '}
        <strong style={{ color: 'var(--gray-700,#374151)' }}>{filtered.length}</strong>{' '}
        open position{filtered.length !== 1 ? 's' : ''}
        {activeTab !== 'All' ? ` in ${activeTab}` : ''}
      </p>

      {/* Job cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} onApply={setApplyJob} />
        ))}
      </div>

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────

const card = {
  wrapper: {
    background: 'white', border: '1.5px solid var(--gray-200,#e5e7eb)',
    borderRadius: 16, padding: '22px 24px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  top: { display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12 },
  iconCircle: {
    width: 46, height: 46, borderRadius: 12, background: 'var(--gray-100,#f3f4f6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.4rem', flexShrink: 0,
  },
  title: { margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--gray-800,#1f2937)' },
  urgentBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 8px', borderRadius: 6, background: '#fef3c7', color: '#b45309',
    fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  meta: {
    display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 5,
    fontSize: '0.78rem', color: 'var(--gray-500,#6b7280)',
  },
  metaIcon: { fontSize: '0.65rem', marginRight: 3, opacity: 0.6 },
  expBadge: {
    padding: '3px 10px', borderRadius: 6, background: '#eff6ff',
    color: '#1d4ed8', fontSize: '0.72rem', fontWeight: 700,
  },
  date: { fontSize: '0.68rem', color: 'var(--gray-400,#9ca3af)' },
  desc: { fontSize: '0.85rem', color: 'var(--gray-600,#4b5563)', lineHeight: 1.6, margin: '0 0 14px' },
  expandedArea: { borderTop: '1px solid var(--gray-100,#f3f4f6)', paddingTop: 16, marginBottom: 16 },
  expandGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  subHead: {
    fontSize: '0.78rem', fontWeight: 700, color: 'var(--gray-700,#374151)',
    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8,
  },
  list: { margin: 0, paddingLeft: 18, fontSize: '0.82rem', color: 'var(--gray-600,#4b5563)', lineHeight: 1.7 },
  salaryRow: {
    display: 'flex', alignItems: 'center', gap: 12, marginTop: 14,
    padding: '10px 14px', background: '#f0fdf4', borderRadius: 8,
  },
  salaryLabel: { fontSize: '0.72rem', fontWeight: 700, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.05em' },
  salaryValue: { fontSize: '0.9rem', fontWeight: 700, color: '#065f46' },
  footer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' },
  detailsBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', borderRadius: 8,
    border: '1.5px solid var(--gray-200,#e5e7eb)',
    background: 'white', color: 'var(--gray-600,#4b5563)',
    fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s',
  },
  applyBtn: {
    padding: '9px 24px', borderRadius: 8, border: 'none',
    background: 'var(--primary,#0d6efd)', color: 'white',
    fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
    transition: 'box-shadow 0.2s, transform 0.15s',
  },
};

const modal = {
  backdrop: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px 16px', overflowY: 'auto',
  },
  box: {
    background: 'white', borderRadius: 18, width: '100%', maxWidth: 580,
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden',
    maxHeight: '90vh', overflowY: 'auto',
  },
  header: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14,
    padding: '20px 24px', borderBottom: '1px solid var(--gray-100,#f3f4f6)',
    background: 'var(--gray-50,#f9fafb)',
  },
  body: { padding: '24px' },
  closeBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: 'var(--gray-400,#9ca3af)', fontSize: '1rem', padding: 4, flexShrink: 0,
  },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 16px' },
  submitBtn: {
    marginTop: 20, width: '100%', padding: '12px', borderRadius: 10,
    border: 'none', background: 'var(--primary,#0d6efd)', color: 'white',
    fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
    transition: 'opacity 0.2s', display: 'block',
  },
};
