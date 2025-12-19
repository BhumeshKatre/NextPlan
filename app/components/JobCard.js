'use client'

import Link from 'next/link'
import { generateSlug } from '../lib/jobs'

/**
 * JobCard Component
 * A reusable card component for displaying job listings, schemes, and finance tips
 * 
 * @param {Object} job - The job/scheme/tip data object
 * @param {string} job.id - Unique identifier
 * @param {string} job.title - Main title of the card
 * @param {string} job.summary - Description/summary text
 * @param {string} job.badge - Badge type: 'New', 'Last Date', 'Finance Tips', 'Scheme', or custom
 * @param {string} [job.lastDate] - Optional last date for application
 * @param {string} [job.vacancies] - Optional number of vacancies
 * @param {string} [job.qualification] - Optional qualification requirement
 * @param {string} [job.location] - Optional location
 * @param {string} [job.buttonText] - Optional custom button text (default: 'View More')
 * @param {Function} [job.onClick] - Optional click handler for the card
 * @param {Function} [job.onButtonClick] - Optional click handler for the button
 * @param {string} [job.href] - Optional link URL
 * @param {Array} [job.tags] - Optional array of additional tags
 * @param {string} [job.image] - Optional image URL
 * @param {string} [job.category] - Optional category name
 */

export default function JobCard({
  job = {},
  onClick,
  onButtonClick,
  className = '',
}) {
  const {
    id,
    title = 'Job Title',
    summary = '',
    badge,
    lastDate,
    vacancies,
    qualification,
    location,
    buttonText = 'View More',
    href,
    tags = [],
    image,
    category,
  } = job

  // Badge color mapping
  const getBadgeColor = (badgeType) => {
    const badgeColors = {
      New: 'bg-green-100 text-green-700',
      'Last Date': 'bg-red-100 text-red-700',
      'Finance Tips': 'bg-blue-100 text-blue-700',
      Scheme: 'bg-purple-100 text-purple-700',
      Results: 'bg-yellow-100 text-yellow-700',
      'Admit Card': 'bg-indigo-100 text-indigo-700',
      default: 'bg-slate-100 text-slate-700',
    }
    return badgeColors[badgeType] || badgeColors.default
  }

  // Generate job detail URL
  const jobSlug = generateSlug(title)
  const jobDetailUrl = `/jobs/${jobSlug}`

  // Handle card click
  const handleCardClick = () => {
    if (onClick) {
      onClick(job)
    } else if (href) {
      window.location.href = href
    } else {
      window.location.href = jobDetailUrl
    }
  }

  // Handle button click
  const handleButtonClick = (e) => {
    e.stopPropagation() // Prevent card click when button is clicked
    if (onButtonClick) {
      onButtonClick(job)
    } else if (href) {
      window.location.href = href
    } else {
      window.location.href = jobDetailUrl
    }
  }

  return (
    <article
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden ${
        onClick || href || jobDetailUrl ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={handleCardClick}
    >
      {/* Image (if provided) */}
      {image && (
        <div className="w-full h-48 overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Badge and Date */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {badge && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(
                badge
              )}`}
            >
              {badge}
            </span>
          )}
          {lastDate && (
            <span className="text-xs text-slate-500 font-medium">
              Last Date: {lastDate}
            </span>
          )}
        </div>
        {category && (
          <span className="text-xs text-slate-400 mt-2 block">{category}</span>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 hover:text-orange-600 transition-colors">
          {title}
        </h3>
        {summary && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-3">{summary}</p>
        )}

        {/* Meta Info Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {vacancies && (
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
              {vacancies} {vacancies.includes('Vacancies') ? '' : 'Vacancies'}
            </span>
          )}
          {qualification && (
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
              {qualification}
            </span>
          )}
          {location && (
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
              {location}
            </span>
          )}
          {/* Additional tags */}
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleButtonClick}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 active:scale-95"
        >
          <span>{buttonText}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}

