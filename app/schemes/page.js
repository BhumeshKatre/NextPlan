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

// Helper function to determine if it's a scheme
const isScheme = (job) => {
  const title = job.title.toLowerCase()
  const summary = job.summary.toLowerCase()
  const badge = job.badge?.toLowerCase() || ''

  return badge === 'scheme' || title.includes('scheme') || title.includes('kisan')
}

function SchemesContent() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)
  const { searchQuery } = useContext(SearchContext)
  const [displayCount, setDisplayCount] = useState(12)
  const itemsPerPage = 12

  // Filter only schemes
  const allSchemes = useMemo(() => {
    return jobCards.filter(isScheme)
  }, [])

  // Add more dummy scheme data
  const additionalSchemes = [
    {
      id: 101,
      title: 'Ayushman Bharat Yojana - Free Health Insurance Scheme',
      summary: 'Get free health insurance coverage up to ₹5 lakhs per family per year. This scheme provides financial protection against catastrophic health expenditures.',
      badge: 'Scheme',
      qualification: 'All Indian Citizens',
      location: 'All India',
      officialWebsite: 'https://pmjay.gov.in',
      applicationFee: 'Free',
      eligibility: 'All families listed in SECC database. No age limit or income criteria.',
      howToApply: 'Visit the official PM-JAY website, check your eligibility, and get your e-card from the nearest Common Service Centre or hospital.',
    },
    {
      id: 102,
      title: 'Pradhan Mantri Awas Yojana (PMAY) - Housing for All',
      summary: 'Affordable housing scheme providing financial assistance for building or buying homes. Interest subsidy available for home loans.',
      badge: 'Scheme',
      qualification: 'Economically Weaker Section',
      location: 'All India',
      officialWebsite: 'https://pmaymis.gov.in',
      applicationFee: 'Free',
      eligibility: 'Families with annual income up to ₹3 lakhs. Must not own a pucca house.',
      howToApply: 'Apply online through PMAY portal or visit your local municipal corporation office with required documents.',
    },
    {
      id: 103,
      title: 'Ujjwala Yojana - Free LPG Connection Scheme',
      summary: 'Get free LPG connection for eligible BPL families. Reduces health hazards and environmental pollution.',
      badge: 'Scheme',
      qualification: 'BPL Families',
      location: 'All India',
      officialWebsite: 'https://www.pmuy.gov.in',
      applicationFee: 'Free',
      eligibility: 'Women from BPL households. Must not have an existing LPG connection.',
      howToApply: 'Visit nearest LPG distributor with Aadhaar card, BPL certificate, and bank account details.',
    },
  ]

  const allSchemesWithDummy = [...allSchemes, ...additionalSchemes]

  // Filter schemes based on search query
  const filteredSchemes = useMemo(() => {
    let filtered = allSchemesWithDummy

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((scheme) => {
        const searchableText = `
          ${scheme.title} 
          ${scheme.summary} 
          ${scheme.badge || ''} 
          ${scheme.qualification || ''} 
          ${scheme.location || ''}
        `.toLowerCase()

        return searchableText.includes(query)
      })
    }

    return filtered
  }, [searchQuery, allSchemesWithDummy])

  // Get schemes to display (paginated)
  const schemesToDisplay = useMemo(() => {
    return filteredSchemes.slice(0, displayCount)
  }, [filteredSchemes, displayCount])

  const hasMore = displayCount < filteredSchemes.length

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + itemsPerPage)
  }

  useEffect(() => {
    setDisplayCount(itemsPerPage)
  }, [searchQuery])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Schemes' },
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
              Government Schemes
            </h1>
            <p className="text-slate-600">
              Explore various government schemes and benefits available for Indian citizens
            </p>
            {searchQuery && (
              <p className="text-sm text-slate-500 mt-2">
                Found {filteredSchemes.length} result{filteredSchemes.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Scheme Cards Grid */}
          {schemesToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schemesToDisplay.map((scheme) => (
                <JobCard key={scheme.id} job={scheme} />
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
                No schemes found
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
                Load More ({filteredSchemes.length - displayCount} remaining)
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

export default function Schemes() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-slate-500">Loading...</div>
        </div>
      </div>
    }>
      <SchemesContent />
    </Suspense>
  )
}

