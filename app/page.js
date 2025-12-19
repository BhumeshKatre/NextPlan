'use client'

import { useContext, useMemo, Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SidebarContext } from './contexts/SidebarContext'
import { SearchContext } from './contexts/SearchContext'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import JobCard from './components/JobCard'
import { jobCards } from './lib/jobs'

// Helper function to determine job category
const getJobCategory = (job) => {
  const title = job.title.toLowerCase()
  const summary = job.summary.toLowerCase()
  const badge = job.badge?.toLowerCase() || ''

  // Finance Tips
  if (badge === 'finance tips' || title.includes('tax') || title.includes('sip') || title.includes('investment') || title.includes('finance')) {
    return 'finance-tips'
  }

  // Admit Card
  if (badge === 'admit card' || title.includes('admit card')) {
    return 'admit-card'
  }

  // Results
  if (badge === 'results' || title.includes('results') || title.includes('result')) {
    return 'results'
  }

  // Scheme
  if (badge === 'scheme' || title.includes('scheme') || title.includes('kisan')) {
    return 'scheme'
  }

  // Central Govt Jobs (SSC, UPSC, RBI, IBPS, LIC, EPFO, etc.)
  const centralKeywords = ['ssc', 'upsc', 'rbi', 'ibps', 'lic', 'epfo', 'sbi po', 'banking', 'civil services']
  if (centralKeywords.some(keyword => title.includes(keyword) || summary.includes(keyword))) {
    return 'central-govt-jobs'
  }

  // State Govt Jobs
  if (title.includes('state') || title.includes('railway')) {
    return 'state-govt-jobs'
  }

  // Default to central govt jobs for government job posts
  return 'central-govt-jobs'
}

// Job data is imported from lib/jobs.js

function HomeContent() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)
  const { searchQuery } = useContext(SearchContext)
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [displayCount, setDisplayCount] = useState(12) // Initial display count
  const itemsPerPage = 12

  // Filter jobs based on search query and category
  const filteredJobs = useMemo(() => {
    let filtered = jobCards

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter((job) => {
        const jobCategory = getJobCategory(job)
        return jobCategory === category
      })
    }

    // Filter by search query
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
  }, [searchQuery, category])

  // Get jobs to display (paginated)
  const jobsToDisplay = useMemo(() => {
    return filteredJobs.slice(0, displayCount)
  }, [filteredJobs, displayCount])

  // Check if there are more jobs to load
  const hasMore = displayCount < filteredJobs.length

  // Load more function
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + itemsPerPage)
  }

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(itemsPerPage)
  }, [searchQuery, category])

  return (
    <div className="container mx-auto px-4 py-8">
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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Latest Updates
            </h1>
            <p className="text-slate-600">
              Stay updated with the latest government jobs, schemes, and finance tips
            </p>
            {(searchQuery || category) && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {category && category !== 'all' && (
                  <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-medium">
                    Category: {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                )}
                {searchQuery && (
                  <span className="text-sm text-slate-500">
                    Found {filteredJobs.length} result{filteredJobs.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </span>
                )}
              </div>
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
                No results found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search terms or browse all jobs.
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

export default function Home() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-slate-500">Loading...</div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}

