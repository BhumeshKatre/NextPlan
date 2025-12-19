'use client'

import { useContext, useState } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import { SearchContext } from '../contexts/SearchContext'

export default function Header() {
  const { setIsSidebarOpen } = useContext(SidebarContext)
  const { setSearchQuery } = useContext(SearchContext)
  const [localSearchValue, setLocalSearchValue] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearchValue(value)
    setSearchQuery(value)
  }

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-[5000]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              className="lg:hidden text-white focus:outline-none"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              aria-label="Toggle menu"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-xl">
                NP
              </div>
              <span className="text-xl font-bold hidden sm:block">NextPlan</span>
            </div>
          </div>

          {/* Search Bar - Centered */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs, schemes, tips..."
                value={localSearchValue}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
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
            </div>
          </div>

          {/* Login Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200">
            Login
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs, schemes, tips..."
              value={localSearchValue}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
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
          </div>
        </div>
      </div>
    </header>
  )
}

