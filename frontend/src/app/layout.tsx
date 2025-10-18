"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { WeatherProvider } from "@/context/WeatherContext";
import LoginModal from "@/components/LoginModal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} text-white`}>
        <WeatherProvider>
          {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
          <div className="min-h-screen flex flex-col">
            <header>
              {/* Full-width wrapper with centered background image area */}
              <div className="bg-[url('/header-background.png')] bg-cover bg-center bg-no-repeat max-w-7xl mx-auto w-full">
                {/* Increased bottom padding to reveal more of the background image */}
                <div className="container mx-auto px-4 pt-6 pb-28">
                  <div className="flex justify-center items-center gap-3 mb-6">
                    <Image src="/logo.png" alt="Weather App Logo" width={32} height={32} />
                    <h1 className="text-2xl font-semibold">Weather App</h1>
                  </div>
                  <div className="max-w-md mx-auto flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter a city"
                      className="w-full bg-black/20 text-white placeholder-gray-400 rounded-md px-4 py-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400"
                      disabled
                    />
                    {/* Looks enabled but non-functional for now */}
                    <button className="bg-purple-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-600 transition-colors">
                      Add City
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Adjusted negative margin to maintain the correct overlap */}
            <main className="container mx-auto px-4 -mt-24 flex-grow">{children}</main>

            <footer className="py-6 mt-8">
              <p className="text-center text-gray-400 text-sm">2021 Fidenz Technologies</p>
            </footer>
          </div>
        </WeatherProvider>
      </body>
    </html>
  );
}
