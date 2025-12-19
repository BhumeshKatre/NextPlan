'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { generateSlug } from '../../../lib/jobs'
import SocialShare from '../../../components/SocialShare'

// Helper function to calculate time ago
const getTimeAgo = (dateString) => {
  if (!dateString) return 'Recently'
  
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  return `${Math.floor(diffInSeconds / 604800)} weeks ago`
}

export default function NewsLayout({ job, currentUrl, relatedJobs }) {
  const [timeAgo, setTimeAgo] = useState('Recently')
  
  useEffect(() => {
    // Update time ago every minute
    const updateTime = () => {
      // Use updatedAt, lastDate, or current date as fallback
      const dateToUse = job.updatedAt || job.lastDate || new Date().toISOString()
      setTimeAgo(getTimeAgo(dateToUse))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [job.updatedAt, job.lastDate])

  // Parse key highlights from eligibility or howToApply
  const keyHighlights = job.keyHighlights || 
    (job.eligibility ? job.eligibility.split('\n').filter(h => h.trim()) : []) ||
    (job.howToApply ? job.howToApply.split('\n').filter(h => h.trim()) : [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breaking News Border */}
      <div className="border-l-4 border-red-500 bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        {/* Header with Big Headline */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white uppercase tracking-wide">
              Breaking News
            </span>
            <span className="text-sm text-slate-600 font-medium">
              Updated on: {timeAgo}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            {job.title}
          </h1>
          <SocialShare title={job.title} url={currentUrl} />
        </div>

        {/* Quick Summary Box */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Summary</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            {job.summary}
          </p>
        </div>

        {/* Key Highlights */}
        {keyHighlights.length > 0 && (
          <div className="p-6 bg-white">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Highlights</h2>
            <ul className="space-y-3">
              {keyHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-slate-700 text-lg leading-relaxed">{highlight.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Details */}
        {(job.eligibility || job.howToApply) && (
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <div className="prose prose-slate max-w-none">
              {job.eligibility && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Details</h3>
                  <p className="text-slate-700 leading-relaxed">{job.eligibility}</p>
                </div>
              )}
              {job.howToApply && (
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">More Information</h3>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">{job.howToApply}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-6 bg-white border-t border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {job.officialWebsite && (
              <a
                href={job.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Check Status</span>
              </a>
            )}
            <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <span>View Beneficiary List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related News */}
      {relatedJobs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Related News Updates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedJobs.map((relatedJob) => (
              <Link
                key={relatedJob.id}
                href={`/jobs/${generateSlug(relatedJob.title)}`}
                className="block group"
              >
                <div className="bg-white rounded-lg border-l-4 border-red-500 border border-slate-200 p-4 hover:shadow-md transition-all duration-200 h-full">
                  <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {relatedJob.title}
                  </h4>
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {relatedJob.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

