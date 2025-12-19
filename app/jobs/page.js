'use client'

import { useContext, useMemo, Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SidebarContext } from '../contexts/SidebarContext'
import { SearchContext } from '../contexts/SearchContext'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import JobCard from '../components/JobCard'
import { jobCards } from '../lib/jobs'
import Breadcrumb from '../components/Breadcrumb'

// Helper function to determine job category
const getJobCategory = (job) => {
  const title = job.title.toLowerCase()
  const summary = job.summary.toLowerCase()
  const badge = job.badge?.toLowerCase() || ''

  // Finance Tips
  if (badge === 'finance tips' || title.includes('tax') || title.includes('sip') || title.includes('investment') || title.includes('finance')) {
    return 'finance-tips'
  }

  // Scheme
  if (badge === 'scheme' || title.includes('scheme') || title.includes('kisan')) {
    return 'scheme'
  }

  // Central Govt Jobs
  const centralKeywords = ['ssc', 'upsc', 'rbi', 'ibps', 'lic', 'epfo', 'sbi po', 'banking', 'civil services']
  if (centralKeywords.some(keyword => title.includes(keyword) || summary.includes(keyword))) {
    return 'central-govt-jobs'
  }

  // State Govt Jobs
  if (title.includes('state') || title.includes('railway')) {
    return 'state-govt-jobs'
  }

  // Default to central govt jobs
  return 'central-govt-jobs'
}

function AllJobsContent() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)
  const { searchQuery } = useContext(SearchContext)
  const searchParams = useSearchParams()
  const [displayCount, setDisplayCount] = useState(12)
  const itemsPerPage = 12

  // Filter only job-related posts (exclude finance tips and schemes)
  const allJobs = useMemo(() => {
    return jobCards.filter((job) => {
      const category = getJobCategory(job)
      return category === 'central-govt-jobs' || category === 'state-govt-jobs'
    })
  }, [])

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    let filtered = allJobs

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((job) => {
        const searchableText = `
          ${job.title} 
          ${job.summary} 
          ${job.badge || ''} 
          ${job.qualification || ''} 
          ${job.location || ''} 
          ${job.vacancies || ''}
        `.toLowerCase()

        return searchableText.includes(query)
      })
    }

    return filtered
  }, [searchQuery, allJobs])

  // Get jobs to display (paginated)
  const jobsToDisplay = useMemo(() => {
    return filteredJobs.slice(0, displayCount)
  }, [filteredJobs, displayCount])

  const hasMore = displayCount < filteredJobs.length

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + itemsPerPage)
  }

  useEffect(() => {
    setDisplayCount(itemsPerPage)
  }, [searchQuery])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'All Jobs' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <LeftSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Center Feed */}
        <main className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              All Government Jobs
            </h1>
            <p className="text-slate-600">
              Browse all available government job opportunities across India
            </p>
            {searchQuery && (
              <p className="text-sm text-slate-500 mt-2">
                Found {filteredJobs.length} result{filteredJobs.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Job Cards Grid */}
          {jobsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobsToDisplay.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-slate-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No jobs found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search terms.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Load More ({filteredJobs.length - displayCount} remaining)
              </button>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default function AllJobs() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-slate-500">Loading...</div>
        </div>
      </div>
    }>
      <AllJobsContent />
    </Suspense>
  )
}

