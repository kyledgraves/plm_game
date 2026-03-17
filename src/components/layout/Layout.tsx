import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-ds-bg">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <button
          className="lg:hidden absolute top-16 left-2 z-50 p-2 bg-white border border-ds-border rounded-lg shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} fixed lg:relative z-40 h-full`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>

        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
