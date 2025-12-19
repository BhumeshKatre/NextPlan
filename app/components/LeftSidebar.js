'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

const categories = [
  { name: 'Finance Tips', slug: 'finance-tips', icon: '💰', count: 45 },
  { name: 'Central Govt Jobs', slug: 'central-govt-jobs', icon: '🏛️', count: 128 },
  { name: 'State Govt Jobs', slug: 'state-govt-jobs', icon: '🏢', count: 203 },
  { name: 'Admit Card', slug: 'admit-card', icon: '🎫', count: 67 },
  { name: 'Results', slug: 'results', icon: '📊', count: 89 },
]

export default function LeftSidebar({ isOpen, onClose }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  const handleCategoryClick = (slug) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all' || slug === activeCategory) {
      // If clicking "All" or the same category, remove the filter
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`${pathname}?${params.toString()}`)
    // Close mobile menu after selection
    if (onClose) onClose()
  }
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[45] lg:hidden"
          onClick={onClose}
          style={{ top: 0 }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-64 bg-slate-50 border-r border-slate-200
          transform transition-transform duration-300 ease-in-out z-[60]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Categories</h2>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-600 hover:text-slate-900"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="space-y-2">
            {/* All Categories Link */}
            <button
              onClick={() => handleCategoryClick('all')}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                !activeCategory
                  ? 'bg-orange-50 border border-orange-200'
                  : 'hover:bg-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <span
                  className={`font-medium ${
                    !activeCategory
                      ? 'text-orange-700 font-semibold'
                      : 'text-slate-700'
                  }`}
                >
                  All Categories
                </span>
              </div>
            </button>

            {categories.map((category, index) => {
              const isActive = activeCategory === category.slug
              return (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-orange-50 border border-orange-200'
                      : 'hover:bg-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span
                      className={`font-medium ${
                        isActive
                          ? 'text-orange-700 font-semibold'
                          : 'text-slate-700'
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      isActive
                        ? 'bg-orange-200 text-orange-700'
                        : 'text-slate-500 bg-slate-200'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Additional Links */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-600 uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 text-sm block py-2"
                >
                  Exam Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 text-sm block py-2"
                >
                  Syllabus
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 text-sm block py-2"
                >
                  Previous Papers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  )
}

