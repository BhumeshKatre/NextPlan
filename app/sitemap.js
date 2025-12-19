import { jobCards } from './lib/jobs'
import { generateSlug } from './lib/jobs'

export default function sitemap() {
  const baseUrl = 'https://govjobsblog.com' // Update with your actual domain

  // Generate job URLs
  const jobUrls = jobCards.map((job) => ({
    url: `${baseUrl}/jobs/${generateSlug(job.title)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...jobUrls,
  ]
}

