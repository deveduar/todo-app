// src/components/SidebarWithNavbar.tsx
"use client";

import React, { useState } from 'react';
import { Sidebar } from "@/components/sidebar"; 
import { ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Navbar } from "@/components/navbar";

export function SidebarWithNavbar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col">
              {/* Contenedor para el Navbar */}
      <div className="flex justify-center mb-6">
        <Navbar />
      </div>
      {/* Botón para abrir/cerrar la barra lateral */}
      <button
        className="flex items-center justify-center p-2 rounded-md text-[color:var(--foreground)] hover:bg-[color:var(--muted)] transition-colors duration-200 ease-in-out fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <ChevronRightIcon
          className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'rotate-180' : 'rotate-0'
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Barra lateral */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
    

      {/* Contenedor principal */}
      <main
        className={`flex flex-col p-7 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
