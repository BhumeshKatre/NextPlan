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

// Helper function to determine if it's a finance tip
const isFinanceTip = (job) => {
  const title = job.title.toLowerCase()
  const summary = job.summary.toLowerCase()
  const badge = job.badge?.toLowerCase() || ''

  return badge === 'finance tips' || title.includes('tax') || title.includes('sip') || title.includes('investment') || title.includes('finance')
}

function FinanceTipsContent() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)
  const { searchQuery } = useContext(SearchContext)
  const [displayCount, setDisplayCount] = useState(12)
  const itemsPerPage = 12

  // Filter only finance tips
  const allFinanceTips = useMemo(() => {
    return jobCards.filter(isFinanceTip)
  }, [])

  // Add more dummy finance tips data
  const additionalFinanceTips = [
    {
      id: 201,
      title: 'Emergency Fund: How to Build ₹5 Lakhs in 2 Years',
      summary: 'Learn the importance of emergency funds and practical strategies to build a ₹5 lakh emergency fund within 2 years. Essential for financial security.',
      badge: 'Finance Tips',
      qualification: 'General',
      location: 'India',
      officialWebsite: 'https://rbi.org.in',
      applicationFee: 'N/A',
      eligibility: 'Anyone can start building an emergency fund regardless of income.',
      howToApply: 'Open a high-yield savings account or liquid mutual fund. Set up automatic monthly transfers. Aim to save 6-12 months of expenses.',
    },
    {
      id: 202,
      title: 'ELSS vs PPF vs NSC: Which Tax Saving Option is Best?',
      summary: 'Compare ELSS, PPF, and NSC to choose the best tax-saving investment option based on your risk appetite, lock-in period, and returns.',
      badge: 'Finance Tips',
      qualification: 'Taxpayers',
      location: 'India',
      officialWebsite: 'https://incometax.gov.in',
      applicationFee: 'N/A',
      eligibility: 'All Indian taxpayers can invest in these tax-saving instruments.',
      howToApply: 'ELSS: Invest through mutual fund platforms. PPF: Open account at post office or bank. NSC: Available at post offices.',
    },
    {
      id: 203,
      title: 'Health Insurance: Complete Guide for 2025',
      summary: 'Everything you need to know about health insurance in India. Learn about coverage, premiums, claim process, and how to choose the right policy.',
      badge: 'Finance Tips',
      qualification: 'General',
      location: 'India',
      officialWebsite: 'https://irdai.gov.in',
      applicationFee: 'Varies by policy',
      eligibility: 'Anyone between 18-65 years can purchase health insurance.',
      howToApply: 'Compare policies online, check coverage and exclusions, apply through insurance company website or agent, complete medical checkup if required.',
    },
    {
      id: 204,
      title: 'Credit Card Debt: 5 Strategies to Pay Off Faster',
      summary: 'Struggling with credit card debt? Learn proven strategies including debt snowball method, balance transfers, and negotiation techniques.',
      badge: 'Finance Tips',
      qualification: 'Credit Card Holders',
      location: 'India',
      officialWebsite: 'https://rbi.org.in',
      applicationFee: 'N/A',
      eligibility: 'Anyone with credit card debt can use these strategies.',
      howToApply: 'List all debts, prioritize high-interest cards, negotiate with banks for lower rates, consider balance transfer, create repayment plan.',
    },
    {
      id: 205,
      title: 'Mutual Funds for Beginners: Step-by-Step Investment Guide',
      summary: 'Complete beginner\'s guide to mutual fund investing. Learn about types of funds, how to start, SIP vs lump sum, and common mistakes to avoid.',
      badge: 'Finance Tips',
      qualification: 'General',
      location: 'India',
      officialWebsite: 'https://amfiindia.com',
      applicationFee: 'Varies by fund',
      eligibility: 'Any Indian resident above 18 years can invest in mutual funds.',
      howToApply: 'Complete KYC online or offline, choose a fund based on goals, invest through AMC website or platforms like Zerodha, Groww, etc.',
    },
    {
      id: 206,
      title: 'Home Loan EMI Calculator: Save Lakhs with Prepayment',
      summary: 'Understand how home loan EMIs work and learn strategies to save lakhs of rupees through prepayments and interest rate negotiations.',
      badge: 'Finance Tips',
      qualification: 'Home Loan Borrowers',
      location: 'India',
      officialWebsite: 'https://rbi.org.in',
      applicationFee: 'N/A',
      eligibility: 'Anyone with a home loan can benefit from prepayment strategies.',
      howToApply: 'Use online EMI calculators, negotiate interest rates with bank, make partial prepayments when possible, consider refinancing if rates are lower.',
    },
  ]

  const allFinanceTipsWithDummy = [...allFinanceTips, ...additionalFinanceTips]

  // Filter finance tips based on search query
  const filteredTips = useMemo(() => {
    let filtered = allFinanceTipsWithDummy

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((tip) => {
        const searchableText = `
          ${tip.title} 
          ${tip.summary} 
          ${tip.badge || ''} 
          ${tip.qualification || ''} 
          ${tip.location || ''}
        `.toLowerCase()

        return searchableText.includes(query)
      })
    }

    return filtered
  }, [searchQuery, allFinanceTipsWithDummy])

  // Get tips to display (paginated)
  const tipsToDisplay = useMemo(() => {
    return filteredTips.slice(0, displayCount)
  }, [filteredTips, displayCount])

  const hasMore = displayCount < filteredTips.length

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + itemsPerPage)
  }

  useEffect(() => {
    setDisplayCount(itemsPerPage)
  }, [searchQuery])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Finance Tips' },
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
              Finance Tips & Investment Guide
            </h1>
            <p className="text-slate-600">
              Expert financial advice, tax-saving strategies, and investment tips to help you achieve your financial goals
            </p>
            {searchQuery && (
              <p className="text-sm text-slate-500 mt-2">
                Found {filteredTips.length} result{filteredTips.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Finance Tips Cards Grid */}
          {tipsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tipsToDisplay.map((tip) => (
                <JobCard key={tip.id} job={tip} />
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
                No finance tips found
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
                Load More ({filteredTips.length - displayCount} remaining)
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

export default function FinanceTips() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-slate-500">Loading...</div>
        </div>
      </div>
    }>
      <FinanceTipsContent />
    </Suspense>
  )
}

