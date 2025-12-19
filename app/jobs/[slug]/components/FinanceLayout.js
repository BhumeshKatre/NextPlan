'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { generateSlug } from '../../../lib/jobs'
import SocialShare from '../../../components/SocialShare'

export default function FinanceLayout({ job, currentUrl, readingTime, relatedPosts }) {
  const [activeSection, setActiveSection] = useState('')

  // Generate table of contents from headings
  const tableOfContents = []
  if (job.eligibility) tableOfContents.push({ id: 'overview', title: 'Overview' })
  if (job.howToApply) tableOfContents.push({ id: 'key-points', title: 'Key Points' })
  if (job.applicationFee && job.applicationFee !== 'N/A') {
    tableOfContents.push({ id: 'important-info', title: 'Important Information' })
  }

  // Track active section for TOC highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(toc => document.getElementById(toc.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shareText = encodeURIComponent(`Check out: ${job.title}`)
  const shareUrl = encodeURIComponent(currentUrl)

  return (
    <>
      {/* Sticky Share Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white py-3 px-4 z-40 lg:hidden border-t border-slate-800">
        <div className="container mx-auto flex items-center justify-center space-x-4">
          <span className="text-sm font-medium">Share:</span>
          <a
            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors"
            aria-label="Share on WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
          <a
            href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
            aria-label="Share on Telegram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <article className="prose prose-slate prose-xl max-w-none">
          {/* Featured Image */}
          <div className="w-full h-64 md:h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-8 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-24 h-24 mx-auto text-orange-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-slate-600 text-sm">Featured Image</p>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {job.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {job.badge}
                </span>
              )}
              <span className="text-slate-500 text-sm">
                {readingTime} min read
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-sm">
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {job.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              {job.summary}
            </p>
            <div className="hidden lg:block">
              <SocialShare title={job.title} url={currentUrl} />
            </div>
          </header>

          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-slate-700 hover:text-orange-600 transition-colors ${
                      activeSection === item.id ? 'text-orange-600 font-semibold' : ''
                    }`}
                  >
                    → {item.title}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-slate prose-xl max-w-none">
            {job.eligibility && (
              <section id="overview" className="mb-12 scroll-mt-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview</h2>
                <div className="text-slate-700 leading-relaxed text-lg">
                  <p>{job.eligibility}</p>
                </div>
              </section>
            )}

            {job.howToApply && (
              <section id="key-points" className="mb-12 scroll-mt-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Points</h2>
                <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                  {job.howToApply}
                </div>
              </section>
            )}

            {job.applicationFee && job.applicationFee !== 'N/A' && (
              <section id="important-info" className="mb-12 scroll-mt-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Important Information</h2>
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed text-lg">{job.applicationFee}</p>
                </div>
              </section>
            )}
          </div>

          {/* Author Profile */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                NP
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">NextPlan Editorial Team</h3>
                <p className="text-slate-600 mb-2">
                  Expert financial advisors and government job specialists dedicated to helping you achieve your career and financial goals.
                </p>
                <div className="flex space-x-4 text-sm text-slate-500">
                  <span>Finance Expert</span>
                  <span>•</span>
                  <span>Investment Advisor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Finance Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Finance Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/jobs/${generateSlug(relatedPost.title)}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-orange-500 hover:shadow-md transition-all duration-200 h-full">
                      <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {relatedPost.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  )
}

