import Link from 'next/link'
import { generateSlug } from '../../../lib/jobs'
import SocialShare from '../../../components/SocialShare'

export default function RegistrationLayout({ job, currentUrl, relatedJobs }) {
  // Parse step-by-step guide from howToApply or create from eligibility
  const steps = job.howToApply ? job.howToApply.split('\n').filter(step => step.trim()) : []
  
  // Parse required documents (if available in a specific field, otherwise use eligibility)
  const requiredDocuments = job.requiredDocuments || 
    (job.eligibility ? job.eligibility.split(',').map(doc => doc.trim()) : [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Main Content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              {job.badge && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.badge === 'New'
                      ? 'bg-green-100 text-green-700'
                      : job.badge === 'Last Date'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {job.badge}
                </span>
              )}
              {job.lastDate && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                  Last Date: {job.lastDate}
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {job.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {job.summary}
            </p>
            <SocialShare title={job.title} url={currentUrl} />
          </div>

          {/* Step-by-Step Guide */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Step-by-Step Registration Guide
            </h2>
            <div className="space-y-4">
              {steps.length > 0 ? (
                steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-slate-700 leading-relaxed">{step.trim()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {job.howToApply || 'Registration steps will be updated soon.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Eligibility Table */}
          {job.eligibility && (
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Eligibility Criteria
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200 w-1/3">
                        Qualification
                      </td>
                      <td className="px-4 py-3 text-slate-900">
                        {job.qualification || 'As per notification'}
                      </td>
                    </tr>
                    {job.ageLimit && (
                      <tr className="bg-white">
                        <td className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200">
                          Age Limit
                        </td>
                        <td className="px-4 py-3 text-slate-900">
                          {job.ageLimit}
                        </td>
                      </tr>
                    )}
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200">
                        Eligibility Details
                      </td>
                      <td className="px-4 py-3 text-slate-900">
                        {job.eligibility}
                      </td>
                    </tr>
                    {job.location && (
                      <tr className="bg-white">
                        <td className="px-4 py-3 font-semibold text-slate-700 border-r border-slate-200">
                          Location
                        </td>
                        <td className="px-4 py-3 text-slate-900">
                          {job.location}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Required Documents List */}
          {requiredDocuments.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Required Documents
              </h2>
              <ul className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-slate-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application Fee Section */}
          {job.applicationFee && (
            <div className="prose prose-slate max-w-none mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Application Fee
              </h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <p className="text-slate-700 leading-relaxed">
                  {job.applicationFee}
                </p>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {job.qualification && (
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <span className="text-sm font-semibold text-slate-600 block mb-1">
                  Qualification
                </span>
                <span className="text-slate-900 font-medium">
                  {job.qualification}
                </span>
              </div>
            )}
            {job.location && (
              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <span className="text-sm font-semibold text-slate-600 block mb-1">
                  Location
                </span>
                <span className="text-slate-900 font-medium">
                  {job.location}
                </span>
              </div>
            )}
          </div>
        </main>

        {/* Right Side - Sidebar */}
        <aside className="lg:w-80 flex-shrink-0 space-y-6">
          {/* Important Links Box */}
          <div className="bg-gradient-to-br from-slate-900 to-navy-900 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Important Links</h3>
            <div className="space-y-3">
              {job.officialWebsite && (
                <a
                  href={job.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Apply Now</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              )}
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Official Notification PDF</span>
              </button>
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span>Syllabus</span>
              </button>
              {job.officialWebsite && (
                <a
                  href={job.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span>Official Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Related Jobs Widget */}
          {relatedJobs.length > 0 && (
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Related Guides
              </h3>
              <div className="space-y-4">
                {relatedJobs.map((relatedJob) => (
                  <Link
                    key={relatedJob.id}
                    href={`/jobs/${generateSlug(relatedJob.title)}`}
                    className="block"
                  >
                    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-orange-500 hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
                        {relatedJob.title}
                      </h4>
                      {relatedJob.vacancies && (
                        <p className="text-sm text-slate-600">
                          {relatedJob.vacancies} Vacancies
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

