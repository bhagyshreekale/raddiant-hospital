'use client';

import { useState, useRef } from 'react';
import { JOB_LISTINGS, DEPARTMENTS } from '../../lib copy/careersData';
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

// ── UI Components ──────────────────────────────────────────────────────────

function Field({ label, error, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[0.7rem] font-medium text-red-500">{error}</p>}
    </div>
  );
}

const inputClass = (error) => `
  w-full rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition-all
  ${error ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10'}
`;

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
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-h-[90vh] w-full max-w-xl animate-in fade-in zoom-in duration-200 overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 bg-gray-50/50 p-6">
          <div className="flex gap-4">
            <div className="text-2xl">{job.icon}</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
              <p className="text-xs font-medium text-gray-500">
                {job.department} • {job.type} • {job.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
                <FaCheckCircle size={40} />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Application Submitted!</h4>
              <p className="mt-3 text-sm text-gray-500">
                Thank you, <strong>{fields.name}</strong>! Our HR team will reach out to{' '}
                <strong>{fields.email}</strong> within 3–5 working days.
              </p>
              <button
                onClick={onClose}
                className="mt-8 rounded-full bg-[var(--primary)] px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name *" error={errors.name}>
                  <input
                    value={fields.name}
                    onChange={set('name')}
                    placeholder="Dr. Priya Sharma"
                    className={inputClass(errors.name)}
                  />
                </Field>
                <Field label="Email Address *" error={errors.email}>
                  <input
                    type="email"
                    value={fields.email}
                    onChange={set('email')}
                    placeholder="priya@example.com"
                    className={inputClass(errors.email)}
                  />
                </Field>
                <Field label="Mobile Number *" error={errors.phone}>
                  <input
                    type="tel"
                    value={fields.phone}
                    onChange={set('phone')}
                    placeholder="98765 43210"
                    className={inputClass(errors.phone)}
                  />
                </Field>
                <Field label="Experience *" error={errors.experience}>
                  <select
                    value={fields.experience}
                    onChange={set('experience')}
                    className={inputClass(errors.experience)}
                  >
                    <option value="">Select range</option>
                    {['0–1 year', '1–3 years', '3–5 years', '5–8 years', '12+ years'].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Cover Note (optional)">
                <textarea
                  value={fields.message}
                  onChange={set('message')}
                  rows={3}
                  placeholder="Tell us why you'd be a great fit…"
                  className={inputClass() + ' resize-none'}
                />
              </Field>

              <Field label="Resume / CV *" error={errors.file}>
                <div
                  onClick={() => fileRef.current.click()}
                  className={`flex flex-col items-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
                    file ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <FaUpload className={`mb-2 text-xl ${file ? 'text-green-500' : 'text-gray-400'}`} />
                  <p className="text-xs font-semibold text-gray-500">
                    {file ? `✅ ${file.name}` : 'Click to upload PDF or DOC (max 5MB)'}
                  </p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setErrors((p) => ({ ...p, file: undefined }));
                    }}
                  />
                </div>
              </Field>

              <button
                onClick={handleSubmit}
                className="w-full rounded-xl bg-[var(--primary)] py-4 text-sm font-bold text-white shadow-lg shadow-[var(--primary)]/20 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Submit Application
              </button>
            </div>
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
    <div
      className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50"
      style={{ animation: `fadeInUp 0.4s ease-out forwards ${index * 0.05}s`, opacity: 0 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
          {job.icon}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
            {job.urgent && (
              <span className="flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-amber-700">
                <FaFire /> Urgent
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[0.75rem] font-medium text-gray-500">
            <span className="flex items-center gap-1.5"><FaBriefcase className="opacity-60" /> {job.department}</span>
            <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="opacity-60" /> {job.location}</span>
            <span className="flex items-center gap-1.5"><FaClock className="opacity-60" /> {job.type}</span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-50 pt-4 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <span className="rounded-lg bg-blue-50 px-3 py-1 text-[0.7rem] font-bold text-blue-700">{job.experience}</span>
          <span className="text-[0.65rem] font-medium text-gray-400">{timeAgo(job.posted)}</span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-gray-600">{job.description}</p>

      {expanded && (
        <div className="mt-6 space-y-6 border-t border-gray-100 pt-6 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-[0.7rem] font-bold uppercase tracking-widest text-gray-900">Responsibilities</h4>
              <ul className="mt-3 space-y-2 list-inside list-disc text-sm text-gray-600">
                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-[0.7rem] font-bold uppercase tracking-widest text-gray-900">Requirements</h4>
              <ul className="mt-3 space-y-2 list-inside list-disc text-sm text-gray-600">
                {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-green-700">Salary Range</span>
            <span className="text-base font-bold text-green-700">{job.salary}</span>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
        >
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
        <button
          onClick={() => onApply(job)}
          className="rounded-full bg-[var(--primary)] px-8 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[var(--primary)]/20"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────

export default function JobListingsClient() {
  const [activeTab, setActiveTab] = useState('All');
  const [applyJob, setApplyJob] = useState(null);

  const filtered = activeTab === 'All'
    ? JOB_LISTINGS
    : JOB_LISTINGS.filter((j) => j.department === activeTab);

  return (
    <div className="mx-auto max-w-5xl">
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Department Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveTab(dept)}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
              activeTab === dept
                ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                : 'border-2 border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:text-gray-700'
            }`}
          >
            {dept}
            {dept !== 'All' && (
              <span className="ml-2 opacity-60">
                ({JOB_LISTINGS.filter((j) => j.department === dept).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <p className="text-sm font-medium text-gray-500">
          Showing <span className="font-bold text-gray-900">{filtered.length}</span> positions
          {activeTab !== 'All' && (
            <span> in <span className="text-[var(--primary)]">{activeTab}</span></span>
          )}
        </p>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filtered.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} onApply={setApplyJob} />
        ))}
      </div>

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
}
