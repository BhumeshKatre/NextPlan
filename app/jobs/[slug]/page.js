import { notFound } from 'next/navigation'
import { getJobBySlug, getRelatedJobs, jobCards } from '../../lib/jobs'
import Breadcrumb from '../../components/Breadcrumb'
import FinanceLayout from './components/FinanceLayout'
import RecruitmentLayout from './components/RecruitmentLayout'
import RegistrationLayout from './components/RegistrationLayout'
import NewsLayout from './components/NewsLayout'

// Helper function to determine post category and content type
const getPostCategory = (job) => {
  // First check contentType field (highest priority)
  if (job.contentType === 'registration') {
    return 'Registration'
  }
  if (job.contentType === 'news') {
    return 'News'
  }
  
  // Then check category-based logic
  const title = job.title.toLowerCase()
  const summary = job.summary.toLowerCase()
  const badge = job.badge?.toLowerCase() || ''
  
  // Check if it's Finance
  if (badge === 'finance tips' || title.includes('tax') || title.includes('sip') || 
      title.includes('investment') || title.includes('finance') || 
      title.includes('emergency fund') || title.includes('mutual fund') ||
      title.includes('credit card') || title.includes('home loan') ||
      title.includes('health insurance')) {
    return 'Finance'
  }
  
  // Default to Government Jobs
  return 'Government Jobs'
}

// Helper function to determine if post is Finance (for backward compatibility)
const isFinancePost = (job) => {
  return getPostCategory(job) === 'Finance'
}

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (text) => {
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return minutes
}

// Get related finance posts only
const getRelatedFinancePosts = (currentJobId, limit = 3) => {
  return jobCards
    .filter((job) => job.id !== currentJobId && isFinancePost(job))
    .slice(0, limit)
}

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

  const category = getPostCategory(job)
  const isFinance = category === 'Finance'
  const isRegistration = category === 'Registration'
  const isNews = category === 'News'
  
  // Get related jobs based on category
  let relatedJobs
  if (isFinance) {
    relatedJobs = getRelatedFinancePosts(job.id, 3)
  } else if (isRegistration || isNews) {
    // For registration and news, show related items of same type
    relatedJobs = jobCards
      .filter((j) => j.id !== job.id && getPostCategory(j) === category)
      .slice(0, 3)
  } else {
    relatedJobs = getRelatedJobs(job.id, 3)
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextplan.com'
  const currentUrl = `${baseUrl}/jobs/${params.slug}`
  const readingTime = calculateReadingTime(job.summary + ' ' + (job.eligibility || '') + ' ' + (job.howToApply || ''))

  // Determine breadcrumb label based on category
  let breadcrumbLabel = 'Jobs'
  let breadcrumbHref = '/jobs'
  if (isFinance) {
    breadcrumbLabel = 'Finance Tips'
    breadcrumbHref = '/finance-tips'
  } else if (isRegistration) {
    breadcrumbLabel = 'Registration Guide'
    breadcrumbHref = '/jobs'
  } else if (isNews) {
    breadcrumbLabel = 'News Updates'
    breadcrumbHref = '/jobs'
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: breadcrumbLabel, href: breadcrumbHref },
    { label: job.title },
  ]

  // Structured Data (JSON-LD) for SEO
  let structuredData
  if (isFinance) {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: job.title,
      description: job.summary,
      author: {
        '@type': 'Organization',
        name: 'NextPlan',
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      publisher: {
        '@type': 'Organization',
        name: 'NextPlan',
      },
    }
  } else if (isNews) {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: job.title,
      description: job.summary,
      datePublished: job.updatedAt ? new Date(job.updatedAt).toISOString() : new Date().toISOString(),
      dateModified: job.updatedAt ? new Date(job.updatedAt).toISOString() : new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'NextPlan',
      },
      publisher: {
        '@type': 'Organization',
        name: 'NextPlan',
      },
    }
  } else if (isRegistration) {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: job.title,
      description: job.summary,
      step: job.howToApply ? job.howToApply.split('\n').map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text: step.trim(),
      })) : [],
    }
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.summary,
      identifier: {
        '@type': 'PropertyValue',
        name: 'NextPlan',
        value: job.id.toString(),
      },
      datePosted: new Date().toISOString(),
      validThrough: job.lastDate ? new Date(job.lastDate).toISOString() : undefined,
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: job.title.split(' ')[0] + ' ' + (job.title.split(' ')[1] || ''),
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.location || 'All India',
          addressCountry: 'IN',
        },
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
      },
      qualifications: job.qualification,
      numberOfOpenings: job.vacancies,
    }
  }

  // Conditional rendering based on category
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Breadcrumb items={breadcrumbItems} />

      {category === 'Finance' ? (
        <FinanceLayout
          job={job}
          currentUrl={currentUrl}
          readingTime={readingTime}
          relatedPosts={relatedJobs}
        />
      ) : category === 'Registration' ? (
        <RegistrationLayout
          job={job}
          currentUrl={currentUrl}
          relatedJobs={relatedJobs}
        />
      ) : category === 'News' ? (
        <NewsLayout
          job={job}
          currentUrl={currentUrl}
          relatedJobs={relatedJobs}
        />
      ) : (
        <RecruitmentLayout
          job={job}
          currentUrl={currentUrl}
          relatedJobs={relatedJobs}
        />
      )}
    </>
  )
}

