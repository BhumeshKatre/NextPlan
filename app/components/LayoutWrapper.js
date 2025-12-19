'use client'

import { useState } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import { SearchContext } from '../contexts/SearchContext'
import Header from './Header'
import BreakingNewsBar from './BreakingNewsBar'
import Footer from './Footer'

export default function LayoutWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        <Header />
        <BreakingNewsBar />
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <Footer />
      </SearchContext.Provider>
    </SidebarContext.Provider>
  )
}

