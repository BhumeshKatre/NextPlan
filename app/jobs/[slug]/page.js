import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getJobBySlug, getRelatedJobs, generateSlug } from '../../lib/jobs'
import Breadcrumb from '../../components/Breadcrumb'
import SocialShare from '../../components/SocialShare'

export async function generateMetadata({ params }) {
  const job = getJobBySlug(params.slug)

  if (!job) {
    return {
      title: 'Job Not Found | NextPlan',
    }
  }

  return {
    title: `${job.title} - Apply Online 2025 | NextPlan`,
    description: job.summary,
    openGraph: {
      title: `${job.title} - Apply Online 2025 | NextPlan`,
      description: job.summary,
      type: 'article',
    },
  }
}

export default function JobDetailPage({ params }) {
  const job = getJobBySlug(params.slug)

  if (!job) {
    notFound()
  }

  const relatedJobs = getRelatedJobs(job.id, 3)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Jobs', href: '/' },
    { label: job.title },
  ]

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

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
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {job.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {job.summary}
            </p>
            <SocialShare title={job.title} url={currentUrl} />
          </div>

          {/* Summary Table */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Job Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-semibold text-slate-600 block mb-1">
                    Post Name
                  </span>
                  <span className="text-slate-900 font-medium">
                    {job.title.split('-')[0].trim()}
                  </span>
                </div>
                {job.vacancies && (
                  <div>
                    <span className="text-sm font-semibold text-slate-600 block mb-1">
                      Total Vacancy
                    </span>
                    <span className="text-slate-900 font-medium">
                      {job.vacancies}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {job.lastDate && (
                  <div>
                    <span className="text-sm font-semibold text-slate-600 block mb-1">
                      Last Date
                    </span>
                    <span className="text-slate-900 font-medium">
                      {job.lastDate}
                    </span>
                  </div>
                )}
                {job.officialWebsite && (
                  <div>
                    <span className="text-sm font-semibold text-slate-600 block mb-1">
                      Official Website
                    </span>
                    <a
                      href={job.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 font-medium break-all"
                    >
                      {job.officialWebsite.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Eligibility Section */}
          {job.eligibility && (
            <div className="prose prose-slate max-w-none mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Eligibility
              </h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <p className="text-slate-700 leading-relaxed">
                  {job.eligibility}
                </p>
              </div>
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

          {/* How to Apply Section */}
          {job.howToApply && (
            <div className="prose prose-slate max-w-none mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                How to Apply
              </h2>
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {job.howToApply}
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
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-lg animate-pulse hover:animate-none shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Apply Online</span>
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
                <span>Download Notification</span>
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
                Related Jobs
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
    </>
  )
}

