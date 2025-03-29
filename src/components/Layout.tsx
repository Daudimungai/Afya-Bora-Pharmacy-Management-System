import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Presentation as Prescription, Receipt, BarChart3, Settings as SettingsIcon, LogOut, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Prescriptions', href: '/prescriptions', icon: Prescription },
    { name: 'Sales', href: '/sales', icon: Receipt },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Afya Bora</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2.5 mt-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${location.pathname === item.href ? 'text-blue-700' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-200 ${isSidebarOpen ? 'lg:pl-64' : 'pl-0'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 ${isSidebarOpen ? 'hidden' : 'block'}`}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-10 w-10 flex items-center justify-center">
                  <svg viewBox="0 0 1200 1200" className="h-full w-full">
                    <g>
                      <path fill="#8BC34A" d="M900 100c100 0 200 100 200 200C1100 400 900 500 900 500s-50-100-100-150S800 100 900 100z"/>
                      <path fill="#8BC34A" d="M300 100c-100 0-200 100-200 200C100 400 300 500 300 500s50-100 100-150S400 100 300 100z"/>
                      <path fill="#4CAF50" d="M600 300c-200 0-400 100-400 300s200 300 400 300 400-100 400-300-200-300-400-300z"/>
                      <path fill="#8BC34A" d="M600 400c-150 0-300 50-300 200s150 200 300 200 300-50 300-200-150-200-300-200z"/>
                      <path fill="#4CAF50" d="M450 600c0-75 75-150 150-150s150 75 150 150-75 150-150 150-150-75-150-150z"/>
                      <path fill="#8BC34A" d="M550 450c-50 0-100 75-100 150s50 150 100 150 100-75 100-150-50-150-100-150z"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}