// lib/careersData.js
// ─────────────────────────────────────────────────────────────────────────────
// Job listings + benefits data for the Careers page.
// Replace with a real API call / CMS fetch when backend is ready.
// ─────────────────────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  'All',
  'Clinical',
  'Nursing',
  'Radiology',
  'Administration',
  'Pharmacy',
  'IT & Technology',
];

export const JOB_LISTINGS = [
  {
    id: 'job-001',
    title: 'Senior Cardiologist',
    department: 'Clinical',
    type: 'Full-Time',
    experience: '8+ years',
    location: 'Nashik, Maharashtra',
    posted: '2025-03-28',
    urgent: true,
    description:
      'Lead cardiology services including diagnostics, interventional procedures, and patient care. Work with state-of-the-art cath lab and echo suite.',
    responsibilities: [
      'Perform diagnostic & interventional cardiac procedures',
      'Lead a team of 4 junior cardiologists and residents',
      'Conduct daily ward rounds and OPD consultations',
      'Participate in CME programs and clinical research',
    ],
    requirements: [
      'DM/DNB Cardiology from recognized institution',
      '8+ years post-DM experience',
      'Proficient in cath lab procedures',
      'MCI/NMC registration mandatory',
    ],
    salary: '₹3.5L – ₹5L / month',
    icon: '🫀',
  },
  {
    id: 'job-002',
    title: 'ICU Staff Nurse',
    department: 'Nursing',
    type: 'Full-Time',
    experience: '2+ years',
    location: 'Nashik, Maharashtra',
    posted: '2025-04-01',
    urgent: true,
    description:
      'Provide specialized nursing care in our 10-bed ICU. Night and rotational shifts. Competitive allowances for ICU duty.',
    responsibilities: [
      'Monitor critically ill patients round-the-clock',
      'Administer medications and IV therapies',
      'Assist in central line insertions and intubations',
      'Maintain accurate nursing documentation',
    ],
    requirements: [
      'B.Sc. / GNM Nursing',
      'BLS & ACLS certification',
      '2+ years ICU experience preferred',
      'Maharashtra Nursing Council registration',
    ],
    salary: '₹28,000 – ₹42,000 / month',
    icon: '🩺',
  },
  {
    id: 'job-003',
    title: 'Radiologist (MRI & CT)',
    department: 'Radiology',
    type: 'Full-Time',
    experience: '5+ years',
    location: 'Nashik, Maharashtra',
    posted: '2025-03-20',
    urgent: false,
    description:
      'Interpret MRI, CT, and X-ray images and provide detailed diagnostic reports. Work with 1.5T MRI and 128-slice CT scanner.',
    responsibilities: [
      'Report MRI, CT, USG and X-ray studies',
      'Liaise with clinical teams for complex cases',
      'Supervise radiology technicians',
      'Maintain turnaround time standards',
    ],
    requirements: [
      'MD Radiodiagnosis',
      '5+ years post-MD experience',
      'Experience with PACS/RIS systems',
      'MCI/NMC registration',
    ],
    salary: '₹2.5L – ₹3.5L / month',
    icon: '🔬',
  },
  {
    id: 'job-004',
    title: 'Hospital Administrator',
    department: 'Administration',
    type: 'Full-Time',
    experience: '4+ years',
    location: 'Nashik, Maharashtra',
    posted: '2025-03-25',
    urgent: false,
    description:
      'Oversee daily hospital operations, coordinate between departments, manage budgets, and ensure compliance with healthcare regulations.',
    responsibilities: [
      'Manage day-to-day hospital operations',
      'Coordinate with clinical and non-clinical departments',
      'Handle vendor contracts and procurement',
      'Drive NABH accreditation compliance',
    ],
    requirements: [
      'MHA / MBA (Hospital Administration)',
      '4+ years in hospital management',
      'Knowledge of NABH standards',
      'Strong communication and leadership skills',
    ],
    salary: '₹80,000 – ₹1.2L / month',
    icon: '🏥',
  },
  {
    id: 'job-005',
    title: 'Clinical Pharmacist',
    department: 'Pharmacy',
    type: 'Full-Time',
    experience: '2+ years',
    location: 'Nashik, Maharashtra',
    posted: '2025-04-02',
    urgent: false,
    description:
      'Manage pharmacy operations, conduct medication reconciliation, counsel patients, and support clinical teams with drug therapy decisions.',
    responsibilities: [
      'Dispense and verify prescriptions',
      'Conduct drug utilization reviews',
      'Patient counseling on medication adherence',
      'Maintain pharmacy records and inventory',
    ],
    requirements: [
      'Pharm.D. or M.Pharm',
      'Maharashtra Pharmacy Council registration',
      '2+ years hospital pharmacy experience',
      'Familiarity with HMS software',
    ],
    salary: '₹35,000 – ₹55,000 / month',
    icon: '💊',
  },
  {
    id: 'job-006',
    title: 'Healthcare IT Analyst',
    department: 'IT & Technology',
    type: 'Full-Time',
    experience: '3+ years',
    location: 'Nashik, Maharashtra',
    posted: '2025-03-18',
    urgent: false,
    description:
      'Maintain and enhance the Hospital Management System, ensure data security, and support digital transformation initiatives including telemedicine.',
    responsibilities: [
      'Manage HIS/HMS implementation and upgrades',
      'Ensure HIPAA/IT security compliance',
      'Support integration of lab, radiology, and billing modules',
      'Train staff on new digital tools',
    ],
    requirements: [
      'B.E./B.Tech Computer Science or MCA',
      '3+ years in healthcare IT',
      'Experience with HL7/FHIR standards preferred',
      'Knowledge of SQL and cloud infrastructure',
    ],
    salary: '₹50,000 – ₹85,000 / month',
    icon: '💻',
  },
  {
    id: 'job-007',
    title: 'General Duty Medical Officer',
    department: 'Clinical',
    type: 'Full-Time',
    experience: '1+ years',
    location: 'Nashik, Maharashtra',
    posted: '2025-04-03',
    urgent: true,
    description:
      'Handle emergency and inpatient care, write-up clinical notes, and assist senior consultants on ward rounds.',
    responsibilities: [
      'Initial assessment and management in emergency',
      'Write inpatient case notes and discharge summaries',
      'Assist in minor procedures',
      'Rotational shifts including nights',
    ],
    requirements: [
      'MBBS from MCI/NMC recognized institution',
      'MCI/NMC registration',
      '1+ year post-internship experience',
      'BLS certification',
    ],
    salary: '₹65,000 – ₹90,000 / month',
    icon: '👨‍⚕️',
  },
  {
    id: 'job-008',
    title: 'MRI Technologist',
    department: 'Radiology',
    type: 'Full-Time',
    experience: '2+ years',
    location: 'Nashik, Maharashtra',
    posted: '2025-03-30',
    urgent: false,
    description:
      'Operate 1.5T MRI scanner, prepare patients, execute scan protocols, and ensure image quality for radiologist reporting.',
    responsibilities: [
      'Operate MRI equipment and execute scan protocols',
      'Prepare and position patients safely',
      'Maintain scanner performance logs',
      'Coordinate with radiology team for urgent scans',
    ],
    requirements: [
      'B.Sc. Medical Imaging Technology',
      'AERB radiation safety certificate',
      '2+ years MRI experience',
      'Familiarity with PACS systems',
    ],
    salary: '₹30,000 – ₹48,000 / month',
    icon: '🧲',
  },
];

export const PERKS = [
  {
    icon: '📈',
    title: 'Career Growth',
    desc: 'Structured promotion tracks, CME sponsorships, and skill development programs every quarter.',
  },
  {
    icon: '🏥',
    title: 'Health Coverage',
    desc: 'Comprehensive medical insurance for employee and family, including cashless hospitalization at our facility.',
  },
  {
    icon: '💰',
    title: 'Competitive Pay',
    desc: 'Market-leading salaries with performance bonuses, night-duty allowances, and annual increments.',
  },
  {
    icon: '⏰',
    title: 'Work-Life Balance',
    desc: 'Structured shifts, earned leave policy, and mental wellness support through our employee care program.',
  },
  {
    icon: '🎓',
    title: 'Learning & Development',
    desc: 'In-house training, access to online medical libraries, and conference sponsorships for top performers.',
  },
  {
    icon: '🤝',
    title: 'Collaborative Culture',
    desc: 'Flat hierarchy, open-door leadership, and multidisciplinary team approach to patient care.',
  },
];

export const STATS = [
  { value: '350+', label: 'Team Members' },
  { value: '18', label: 'Departments' },
  { value: '12+', label: 'Years of Excellence' },
  { value: '95%', label: 'Employee Retention' },
];
