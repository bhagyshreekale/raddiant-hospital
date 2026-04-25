'use client';

import { useState } from 'react';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaTimes,
  FaCheckCircle,
  FaUpload,
} from 'react-icons/fa';

const JOBS = [
  {
    id: 1,
    title: 'Senior Radiologist',
    department: 'Radiology',
    location: 'Nashik, MH',
    type: 'Full-time',
    experience: '5+ years',
    salary: '₹12L – ₹18L / yr',
    posted: '2 days ago',
    description:
      'We are looking for an experienced Senior Radiologist to lead our diagnostic imaging department. You will interpret complex imaging studies, mentor junior staff, and collaborate with clinical teams to provide timely and accurate reports.',
    responsibilities: [
      'Interpret CT, MRI, X-Ray, and ultrasound studies with high accuracy',
      'Collaborate with referring physicians and clinical teams',
      'Mentor and guide junior radiologists and radiology residents',
      'Ensure compliance with radiation safety and quality standards',
      'Participate in departmental CME programs',
    ],
    requirements: [
      'MD/DNB in Radiodiagnosis from a recognised institution',
      '5+ years of post-qualification experience',
      'Proficiency in CT/MRI interpretation including advanced protocols',
      'Strong communication and team collaboration skills',
    ],
  },
  {
    id: 2,
    title: 'Staff Nurse – ICU',
    department: 'Nursing',
    location: 'Nashik, MH',
    type: 'Full-time',
    experience: '2+ years',
    salary: '₹4L – ₹6L / yr',
    posted: '4 days ago',
    description:
      'We are seeking a dedicated Staff Nurse for our Intensive Care Unit. The ideal candidate is calm under pressure, skilled in critical care, and committed to compassionate patient care.',
    responsibilities: [
      'Provide direct nursing care to critically ill patients',
      'Monitor and record patient vitals and clinical observations',
      'Administer medications and IV therapies as prescribed',
      'Coordinate with physicians and multidisciplinary teams',
      'Maintain accurate nursing records and documentation',
    ],
    requirements: [
      'B.Sc Nursing or GNM from a recognised institute',
      'Valid nursing registration with MNC',
      '2+ years of ICU/Critical Care experience preferred',
      'ACLS/BLS certification is an advantage',
    ],
  },
  {
    id: 3,
    title: 'Cardiologist – Consultant',
    department: 'Cardiology',
    location: 'Nashik, MH',
    type: 'Consultant',
    experience: '8+ years',
    salary: '₹20L – ₹30L / yr',
    posted: '1 week ago',
    description:
      'Raddiant Plus is expanding its Cardiac Sciences department and invites applications from experienced Cardiologists. The role involves outpatient clinics, inpatient management, and performing interventional procedures.',
    responsibilities: [
      'Conduct OPD consultations and manage inpatient cardiac cases',
      'Perform and interpret ECG, Echo, TMT, Holter monitoring',
      'Conduct interventional procedures (cath lab, angioplasty)',
      'Work closely with cardiac surgery and critical care teams',
      'Participate in academic and CME activities',
    ],
    requirements: [
      'DM/DNB in Cardiology from a recognised institution',
      '8+ years post-DM experience',
      'Interventional cardiology skills preferred',
      'Good clinical acumen and patient communication',
    ],
  },
  {
    id: 4,
    title: 'HR Executive',
    department: 'Administration',
    location: 'Nashik, MH',
    type: 'Full-time',
    experience: '1–3 years',
    salary: '₹3L – ₹4.5L / yr',
    posted: '3 days ago',
    description:
      'We are looking for a proactive HR Executive to support recruitment, onboarding, and employee engagement activities at Raddiant Plus Hospital.',
    responsibilities: [
      'Manage end-to-end recruitment for clinical and non-clinical roles',
      'Coordinate onboarding and induction programs',
      'Maintain employee records and HR databases',
      'Handle employee queries and grievance redressal',
      'Assist in payroll processing and leave management',
    ],
    requirements: [
      'MBA/PGDM in HR or equivalent',
      '1–3 years of HR experience, preferably in healthcare',
      'Proficiency in MS Office and HRMS tools',
      'Strong interpersonal and communication skills',
    ],
  },
  {
    id: 5,
    title: 'Physiotherapist',
    department: 'Rehabilitation',
    location: 'Nashik, MH',
    type: 'Full-time',
    experience: '2+ years',
    salary: '₹3.5L – ₹5L / yr',
    posted: '5 days ago',
    description:
      'Join our Rehabilitation department as a Physiotherapist. You will provide evidence-based therapy to post-operative, neurological, and orthopaedic patients to restore function and improve quality of life.',
    responsibilities: [
      'Assess and treat patients with musculoskeletal and neurological conditions',
      'Design and implement personalised rehabilitation programs',
      'Use electrotherapy, manual therapy, and exercise modalities',
      'Document treatment progress and update medical records',
      'Educate patients and families on home exercise programs',
    ],
    requirements: [
      'BPT / MPT from a recognised institution',
      'Valid physiotherapy council registration',
      '2+ years of clinical experience',
      'Compassionate approach with strong patient rapport',
    ],
  },
  {
    id: 6,
    title: 'Medical Lab Technician',
    department: 'Pathology',
    location: 'Nashik, MH',
    type: 'Full-time',
    experience: '1+ years',
    salary: '₹2.5L – ₹4L / yr',
    posted: '1 week ago',
    description:
      'We require a skilled Medical Lab Technician for our busy Pathology and Clinical Laboratory. The role involves performing a wide range of diagnostic tests and ensuring accurate, timely reporting.',
    responsibilities: [
      'Perform haematology, biochemistry, microbiology, and serology tests',
      'Operate and maintain laboratory instruments and equipment',
      'Ensure quality control and NABL compliance',
      'Collect and process patient samples with proper identification',
      'Maintain accurate lab records and report results promptly',
    ],
    requirements: [
      'DMLT / BMLT from a recognised institute',
      '1+ year of lab experience',
      'Familiarity with LIS software preferred',
      'Attention to detail and adherence to safety protocols',
    ],
  },
];

const DEPARTMENTS = ['All', ...Array.from(new Set(JOBS.map((j) => j.department)))];

const DEPT_COLORS = {
  Radiology:      { bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-100'  },
  Nursing:        { bg: 'bg-pink-50',    text: 'text-pink-700',    border: 'border-pink-100'    },
  Cardiology:     { bg: 'bg-red-50',     text: 'text-red-600',     border: 'border-red-100'     },
  Administration: { bg: 'bg-sky-50',     text: 'text-sky-700',     border: 'border-sky-100'     },
  Rehabilitation: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  Pathology:      { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100'   },
};

// ── Apply Modal ───────────────────────────────────────────────────────────────
function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: '',
    file: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handle     = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleFile = (e) => setForm((f) => ({ ...f, file: e.target.files?.[0] ?? null }));

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  return (
    /*
     * FIX: top-[72px] instead of inset-0
     * Your navbar is ~72px tall and fixed. Using inset-0 made the backdrop
     * start at top:0 (behind the navbar), so items-center was centering
     * across the full 100vh and the modal header got hidden under the nav.
     * top-[72px] starts the backdrop BELOW the navbar — modal is always visible.
     * If your navbar height differs, update this value to match.
     */
    <div
      className="fixed inset-x-0 bottom-0 top-[72px] z-50 flex items-end sm:items-center justify-center sm:px-4 sm:py-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex-shrink-0 bg-[#0A1F44] px-6 sm:px-7 pt-6 sm:pt-7 pb-5 sm:pb-6">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <FaTimes className="text-xs" />
          </button>
          <div className="pr-10 min-w-0">
            <p className="text-white/50 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-1">
              Applying for
            </p>
            <h3 className="text-white text-lg sm:text-xl font-extrabold leading-tight line-clamp-2">
              {job.title}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1 truncate">
              {job.department} · {job.location}
            </p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-7 py-5 sm:py-6">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <FaCheckCircle className="text-emerald-500 text-3xl" />
              </div>
              <h4 className="text-slate-800 text-lg font-extrabold">Application Submitted!</h4>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Thanks <strong className="text-slate-700">{form.name}</strong>! Our HR team will
                review your application and get back to you within 3–5 business days.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 bg-[#0A1F44] text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Full Name *</label>
                  <input
                    name="name" required value={form.name} onChange={handle}
                    placeholder="Dr. Priya Sharma"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email *</label>
                  <input
                    type="email" name="email" required value={form.email} onChange={handle}
                    placeholder="you@example.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Phone *</label>
                  <input
                    name="phone" required value={form.phone} onChange={handle}
                    placeholder="+91 98765 43210"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Years of Experience *</label>
                  <select
                    name="experience" required value={form.experience} onChange={handle}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition bg-white"
                  >
                    <option value="">Select</option>
                    <option>Fresher (0–1 yr)</option>
                    <option>1–3 years</option>
                    <option>3–5 years</option>
                    <option>5–8 years</option>
                    <option>8+ years</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Upload CV / Resume *</label>
                <label className="flex items-center gap-3 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl px-4 py-4 cursor-pointer transition-colors group">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <FaUpload className="text-blue-500 text-xs" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">
                      {form.file ? form.file.name : 'Click to upload PDF / DOC'}
                    </p>
                    <p className="text-[11px] text-slate-400">Max 5 MB</p>
                  </div>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" required />
                </label>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Cover Note <span className="normal-case font-normal">(optional)</span>
                </label>
                <textarea
                  name="message" value={form.message} onChange={handle} rows={3}
                  placeholder="Briefly tell us why you're a great fit…"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition resize-none"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="mt-1 w-full py-3.5 bg-black hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting…
                  </>
                ) : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Details Drawer ────────────────────────────────────────────────────────────
function DetailsDrawer({ job, onClose, onApply }) {
  const c = DEPT_COLORS[job.department] ?? { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' };

  return (
    /* Same fix as ApplyModal — top-[72px] keeps drawer below the navbar */
    <div
      className="fixed inset-x-0 bottom-0 top-[72px] z-50 flex items-end sm:items-stretch sm:justify-end bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full sm:w-[480px] sm:h-full bg-white rounded-t-3xl sm:rounded-none shadow-2xl max-h-[90vh] sm:max-h-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex-shrink-0 bg-[#0A1F44] px-7 pt-7 pb-6">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <FaTimes className="text-xs" />
          </button>
          <div className="pr-10 min-w-0">
            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border ${c.bg} ${c.text} ${c.border}`}>
              {job.department}
            </span>
            <h3 className="text-white text-xl font-extrabold leading-snug line-clamp-2">{job.title}</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { icon: <FaMapMarkerAlt className="text-[9px]" />, label: job.location   },
                { icon: <FaClock        className="text-[9px]" />, label: job.type       },
                { icon: <FaBriefcase   className="text-[9px]" />, label: job.experience },
              ].map((m) => (
                <span key={m.label} className="inline-flex items-center gap-1.5 bg-white/10 text-white/75 text-[11px] font-semibold px-3 py-1 rounded-full">
                  {m.icon}{m.label}
                </span>
              ))}
            </div>
            <p className="mt-3 text-amber-300 font-bold text-sm">{job.salary}</p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-6">
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">About the Role</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{job.description}</p>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Key Responsibilities</h4>
            <ul className="flex flex-col gap-2.5">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Requirements</h4>
            <ul className="flex flex-col gap-2.5">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <FaCheckCircle className="mt-0.5 text-emerald-500 shrink-0 text-xs" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[11px] text-slate-300 font-medium">Posted {job.posted}</p>
        </div>

        {/* Footer CTA */}
        <div className="flex-shrink-0 px-7 py-5 border-t border-slate-100 bg-white flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => { onClose(); onApply(job); }}
            className="flex-1 py-3 bg-black hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all duration-200 active:scale-[0.98]"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Job Card ──────────────────────────────────────────────────────────────────
function JobCard({ job, onApply, onDetails }) {
  const c = DEPT_COLORS[job.department] ?? { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };

  return (
    <div className="group relative bg-white border border-slate-100 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col gap-4">
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl" />

      <div className="flex items-start justify-between gap-3">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${c.bg} ${c.text} ${c.border}`}>
          {job.department}
        </span>
        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{job.posted}</span>
      </div>

      <div>
        <h3 className="text-slate-800 font-extrabold text-base md:text-[17px] leading-snug group-hover:text-blue-700 transition-colors">
          {job.title}
        </h3>
        <p className="text-amber-600 text-sm font-bold mt-1">{job.salary}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { icon: <FaMapMarkerAlt className="text-[9px]" />, label: job.location   },
          { icon: <FaClock        className="text-[9px]" />, label: job.type       },
          { icon: <FaBriefcase   className="text-[9px]" />, label: job.experience },
        ].map((m) => (
          <span key={m.label} className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-500 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-100">
            {m.icon}{m.label}
          </span>
        ))}
      </div>

      <div className="flex gap-2.5 mt-auto pt-1">
        <button
          onClick={() => onDetails(job)}
          className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 active:scale-95"
        >
          View Details
        </button>
        <button
          onClick={() => onApply(job)}
          className="flex-1 py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all duration-150 active:scale-95 shadow-md shadow-black/20"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function JobListingsClient() {
  const [activeDept, setActiveDept] = useState('All');
  const [applyJob,   setApplyJob]   = useState(null);
  const [detailJob,  setDetailJob]  = useState(null);

  const filtered = activeDept === 'All' ? JOBS : JOBS.filter((j) => j.department === activeDept);

  return (
    <>
      {/* Department filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 border ${
              activeDept === dept
                ? 'bg-[#0A1F44] text-white border-[#0A1F44] shadow-md shadow-blue-900/20'
                : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-700'
            }`}
          >
            {dept}
            {dept !== 'All' && (
              <span className={`ml-1.5 text-[10px] font-bold ${activeDept === dept ? 'text-white/60' : 'text-slate-300'}`}>
                {JOBS.filter((j) => j.department === dept).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Job cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={setApplyJob}
            onDetails={setDetailJob}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm">
          No openings in this department right now. Check back soon!
        </div>
      )}

      {applyJob  && <ApplyModal    job={applyJob}  onClose={() => setApplyJob(null)} />}
      {detailJob && <DetailsDrawer job={detailJob} onClose={() => setDetailJob(null)} onApply={setApplyJob} />}
    </>
  );
}