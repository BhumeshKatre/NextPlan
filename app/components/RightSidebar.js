'use client'

import { useState } from 'react'

const trendingTopics = [
  'SSC CGL 2024',
  'UPSC Prelims',
  'Banking Jobs',
  'Railway Recruitment',
  'PM Kisan Scheme',
  'Tax Saving Tips',
  'PPF vs FD',
  'Government Schemes 2024',
]

export default function RightSidebar() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'success', 'error', or null
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    // Simulate API call (replace with actual API endpoint)
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // })
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, just show success message
      setStatus('success')
      setEmail('')
      
      // In production, handle the actual API response
      // if (response.ok) {
      //   setStatus('success')
      //   setEmail('')
      // } else {
      //   setStatus('error')
      // }
    } catch (error) {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Trending Topics */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          Trending Topics
        </h2>
        <ul className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-200 transition-colors duration-200 group"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-slate-700 group-hover:text-slate-900 font-medium">
                  {topic}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Google AdSense Placeholder */}
      <div className="bg-slate-100 rounded-lg p-6 border-2 border-dashed border-slate-300">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto text-slate-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
          <p className="text-sm text-slate-500 font-medium">Advertisement</p>
          <p className="text-xs text-slate-400 mt-1">
            Google AdSense Placeholder
          </p>
          <p className="text-xs text-slate-400 mt-2">
            300 x 250
          </p>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-navy-800 to-slate-900 rounded-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
        <p className="text-sm text-slate-300 mb-4">
          Get the latest job notifications and finance tips delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'success' && (
            <p className="text-sm text-green-400 text-center">
              ✓ Successfully subscribed! Check your email.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400 text-center">
              ✗ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </aside>
  )
}

