// Job data and utility functions

export const jobCards = [
  {
    id: 1,
    title: 'SSC CGL 2024 Notification Released - Apply for 17,727 Posts',
    summary: 'Staff Selection Commission has released the notification for Combined Graduate Level Examination 2024. Apply online before the last date.',
    badge: 'New',
    lastDate: '24 Jan 2024',
    vacancies: '17,727',
    qualification: 'Graduate',
    location: 'All India',
    officialWebsite: 'https://ssc.nic.in',
    applicationFee: '₹100 (General), ₹0 (SC/ST/Women)',
    eligibility: 'Bachelor\'s degree from a recognized university. Age limit: 18-32 years.',
    howToApply: 'Visit the official SSC website, register online, fill the application form, upload required documents, and pay the application fee.',
  },
  {
    id: 2,
    title: 'UPSC Civil Services 2024 - 1,056 Vacancies',
    summary: 'Union Public Service Commission invites applications for Civil Services Examination 2024. This is one of the most prestigious exams in India.',
    badge: 'Last Date',
    lastDate: '16 Feb 2024',
    vacancies: '1,056',
    qualification: 'Graduate',
    location: 'All India',
    officialWebsite: 'https://upsc.gov.in',
    applicationFee: '₹100 (General/OBC), ₹0 (SC/ST/PWD)',
    eligibility: 'Bachelor\'s degree from any recognized university. Age limit: 21-32 years (relaxation for reserved categories).',
    howToApply: 'Apply online through UPSC website, complete the registration, fill detailed application form, and submit before the deadline.',
  },
  {
    id: 3,
    title: 'RBI Grade B Officer Recruitment 2024',
    summary: 'Reserve Bank of India is recruiting for Grade B Officers. Excellent salary package and career growth opportunities.',
    badge: 'New',
    lastDate: '28 Jan 2024',
    vacancies: '291',
    qualification: 'Graduate/Post Graduate',
    location: 'All India',
    officialWebsite: 'https://rbi.org.in',
    applicationFee: '₹850 (General/OBC), ₹100 (SC/ST/PWD)',
    eligibility: 'Graduate/Post Graduate with minimum 60% marks. Age limit: 21-30 years.',
    howToApply: 'Visit RBI official website, register for the exam, fill application form, upload documents, and pay fees online.',
  },
  {
    id: 4,
    title: 'Railway Group D Recruitment - 1.2 Lakh Posts',
    summary: 'Indian Railways has announced massive recruitment for Group D positions. Great opportunity for 10th/12th pass candidates.',
    badge: 'New',
    lastDate: '15 Feb 2024',
    vacancies: '1,20,000',
    qualification: '10th/12th',
    location: 'All India',
    officialWebsite: 'https://indianrailways.gov.in',
    applicationFee: '₹500 (General/OBC), ₹250 (SC/ST/EWS)',
    eligibility: '10th pass or ITI from recognized board. Age limit: 18-33 years.',
    howToApply: 'Apply through Railway Recruitment Board website, complete registration, fill form, and submit with required documents.',
  },
  {
    id: 5,
    title: 'Top 10 Tax Saving Investment Options for FY 2024-25',
    summary: 'Discover the best tax-saving investment options including ELSS, PPF, NSC, and more. Maximize your tax savings legally.',
    badge: 'Finance Tips',
    qualification: 'General',
    location: 'India',
    officialWebsite: 'https://incometax.gov.in',
    applicationFee: 'N/A',
    eligibility: 'All Indian taxpayers can benefit from these investment options.',
    howToApply: 'Consult with a financial advisor or visit the official Income Tax website for detailed information on tax-saving investments.',
  },
  {
    id: 6,
    title: 'SBI PO 2024 Recruitment - 2,000 Vacancies',
    summary: 'State Bank of India is recruiting Probationary Officers. One of the most sought-after banking jobs in India.',
    badge: 'New',
    lastDate: '20 Feb 2024',
    vacancies: '2,000',
    qualification: 'Graduate',
    location: 'All India',
    officialWebsite: 'https://sbi.co.in',
    applicationFee: '₹750 (General/OBC), ₹0 (SC/ST/PWD)',
    eligibility: 'Graduate in any discipline from a recognized university. Age limit: 21-30 years.',
    howToApply: 'Apply online through SBI official website, register for the exam, complete application, and pay fees.',
  },
  {
    id: 7,
    title: 'PM Kisan Scheme: How to Apply and Check Status Online',
    summary: 'Complete guide to PM Kisan Samman Nidhi Scheme. Learn eligibility, application process, and how to check payment status.',
    badge: 'Scheme',
    qualification: 'Farmers',
    location: 'All India',
    officialWebsite: 'https://pmkisan.gov.in',
    applicationFee: 'Free',
    eligibility: 'Small and marginal farmers owning cultivable land. Age: No specific age limit.',
    howToApply: 'Visit PM Kisan portal, register with Aadhaar, fill application form, and submit to local agriculture office.',
  },
  {
    id: 8,
    title: 'IBPS Clerk 2024 Notification - 6,000+ Vacancies',
    summary: 'Institute of Banking Personnel Selection has released notification for Clerk positions in various public sector banks.',
    badge: 'New',
    lastDate: '25 Jan 2024',
    vacancies: '6,000+',
    qualification: 'Graduate',
    location: 'All India',
    officialWebsite: 'https://ibps.in',
    applicationFee: '₹850 (General/OBC), ₹175 (SC/ST/PWD)',
    eligibility: 'Graduate in any discipline. Age limit: 20-28 years.',
    howToApply: 'Apply through IBPS official website, complete registration, fill application form, and pay application fee online.',
  },
  {
    id: 9,
    title: 'EPFO Assistant Recruitment 2024 - Apply Now',
    summary: 'Employees Provident Fund Organisation is recruiting Assistants. Good opportunity for government job aspirants.',
    badge: 'Last Date',
    lastDate: '18 Jan 2024',
    vacancies: '280',
    qualification: 'Graduate',
    location: 'All India',
    officialWebsite: 'https://epfindia.gov.in',
    applicationFee: '₹700 (General/OBC), ₹0 (SC/ST/PWD)',
    eligibility: 'Graduate with minimum 50% marks. Age limit: 18-27 years.',
    howToApply: 'Visit EPFO website, register online, fill application form, upload documents, and submit before deadline.',
  },
  {
    id: 10,
    title: 'Best SIP Plans for Long-term Wealth Creation',
    summary: 'Systematic Investment Plans (SIP) are the best way to build wealth. Here are the top-performing SIP plans for 2024.',
    badge: 'Finance Tips',
    qualification: 'General',
    location: 'India',
    officialWebsite: 'https://amfiindia.com',
    applicationFee: 'Varies by fund',
    eligibility: 'Any Indian resident above 18 years can invest in SIPs.',
    howToApply: 'Contact a registered mutual fund distributor or invest online through AMFI registered platforms.',
  },
  {
    id: 11,
    title: 'LIC AAO Recruitment 2024 - 170 Vacancies',
    summary: 'Life Insurance Corporation of India is recruiting Assistant Administrative Officers. Excellent salary and benefits.',
    badge: 'New',
    lastDate: '22 Feb 2024',
    vacancies: '170',
    qualification: 'Graduate',
    location: 'All India',
    officialWebsite: 'https://licindia.in',
    applicationFee: '₹700 (General/OBC), ₹85 (SC/ST/PWD)',
    eligibility: 'Graduate with minimum 60% marks. Age limit: 21-30 years.',
    howToApply: 'Apply online through LIC official website, complete registration, fill application, and pay fees.',
  },
  {
    id: 12,
    title: 'How to Save Tax on Salary: Complete Guide 2024',
    summary: 'Learn various tax-saving strategies including HRA, LTA, medical expenses, and investments to reduce your tax liability.',
    badge: 'Finance Tips',
    qualification: 'Salaried',
    location: 'India',
    officialWebsite: 'https://incometax.gov.in',
    applicationFee: 'N/A',
    eligibility: 'All salaried individuals can benefit from tax-saving strategies.',
    howToApply: 'Consult with a CA or use online tax filing platforms to maximize your tax savings under Section 80C and other provisions.',
  },
]

// Generate slug from title
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Get job by slug
export function getJobBySlug(slug) {
  return jobCards.find((job) => generateSlug(job.title) === slug)
}

// Get related jobs (exclude current job)
export function getRelatedJobs(currentJobId, limit = 3) {
  return jobCards
    .filter((job) => job.id !== currentJobId)
    .slice(0, limit)
}

