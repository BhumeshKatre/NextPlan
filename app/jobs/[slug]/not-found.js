import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Job Not Found</h1>
      <p className="text-slate-600 mb-8">
        The job you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
      >
        Back to NextPlan
      </Link>
    </div>
  )
}

