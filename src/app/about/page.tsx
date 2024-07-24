"use client";

import React from 'react';
import AboutCard from "@/components/card-about";

const AboutPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-[color:var(--background)]">
      <div className="w-full max-w-lg">
        <h2 className="mb-6 text-center text-3xl font-extrabold">About</h2>
        <AboutCard />
      </div>
    </div>
  );
};

export default AboutPage;
