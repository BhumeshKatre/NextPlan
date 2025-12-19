import Link from 'next/link'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && (
            <span className="text-slate-400">/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-orange-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? 'text-slate-900 font-semibold' : ''}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

