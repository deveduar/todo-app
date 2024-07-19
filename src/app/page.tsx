"use client";

import React, { useState } from 'react';
import { Sidebar } from "@/components/sidebar"; // Ajusta la importación según tu estructura
import { ChevronRight as ChevronRightIcon } from 'lucide-react';
import { MyCard } from "@/components/card";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Botón para abrir/cerrar la barra lateral */}
      <button
        className="flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-700 transition-colors duration-200 ease-in-out fixed top-4 left-4 z-50"
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
        {/* Contenedor para el Navbar */}
        <div className="flex justify-center mb-6">
          <Navbar />
        </div>

        {/* Contenedor para los Card */}
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          {/* Puedes agregar más tarjetas si es necesario */}
        </div>

        {/* Contenedor para el Post */}
        {/* <div className="lg:w-11/12 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex p-5">
          <Post />
        </div> */}
      </main>
    </div>
  );
}
