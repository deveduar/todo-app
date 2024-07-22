"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from "@/components/sidebar"; 
import { ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Navbar } from "@/components/navbar";

export function SidebarWithNavbar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        if (window.innerWidth < 768) {
          setIsSidebarOpen(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    handleResize(); // Verifica el tamaño de pantalla al cargar la página

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="">
        <Navbar />
      </div>
      <button
        ref={buttonRef}
        className="flex items-center justify-center p-2 rounded-md text-[color:var(--foreground)] hover:bg-[color:var(--muted)] transition-colors duration-200 ease-in-out fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <ChevronRightIcon
          className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden="true"
        />
      </button>
      <div ref={sidebarRef}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <main
        className={`flex flex-col p-7 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-64' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
