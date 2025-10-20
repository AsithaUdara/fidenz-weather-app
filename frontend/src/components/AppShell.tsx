"use client";

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import LoginModal from '@/components/LoginModal';
import LogoutLink from '@/components/LogoutLink';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col bg-[#1E1E28]">
      <header>
        {/* Header with background image covering entire area */}
        <div className="relative overflow-hidden">
          {/* Background image section */}
          <div className="relative">
            <div className="absolute inset-0">
              <Image 
                src="/header-background.png" 
                alt="header background" 
                fill
                className="object-cover object-bottom"
                priority
              />
            </div>
            
            <div className="relative container mx-auto px-6 pt-12 pb-32">
              {!user && <LoginModal />}
              
              {/* Logout link in top-right corner */}
              {user && (
                <div className="absolute top-12 right-6">
                  <LogoutLink />
                </div>
              )}
              
              {/* Centered logo and title */}
              <div className="flex flex-col items-center justify-center mb-12">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Weather App Logo" width={40} height={40} />
                  <h1 className="text-3xl font-bold text-white">Weather App</h1>
                </div>
              </div>
              
              {/* Centered search bar - only show on main page */}
              {pathname === '/' && (
                <div className="max-w-xl mx-auto flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter a city"
                    className="flex-1 bg-[#2D2D38]/60 text-white placeholder-gray-400 rounded-lg px-5 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm transition-all"
                    disabled
                  />
                  <button className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
                    Add City
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content - overlaps header slightly */}
      <main className="container mx-auto px-6 -mt-20 flex-grow relative z-10">{children}</main>

      <footer className="py-8 mt-12 bg-[#23232b]" style={{ marginTop: '40px' }}>
        <p className="text-center text-gray-400 text-sm">2021 Fidenz Technologies</p>
      </footer>
    </div>
  );
}