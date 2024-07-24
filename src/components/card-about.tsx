"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card as UiCard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Linkedin as LinkedinIcon, Github as GithubIcon, FileText as FileTextIcon } from 'lucide-react';

// Define los datos directamente en el componente
const aboutData = {
  avatarSrc: "https://github.com/shadcn.png",
  name: "Deveduar",
  description: "Hi, I'm Deveduar, a web developer passionate about technology, design, and music production.",
  socialLinks: [
    { name: 'LinkedIn', url: 'http://www.linkedin.com/in/deveduar', icon: LinkedinIcon },
    { name: 'GitHub', url: 'https://github.com/deveduar', icon: GithubIcon },
    { name: 'Portfolio', url: 'https://example.com', icon: FileTextIcon }
  ]
};

const AboutCard: React.FC = () => {
  return (
    <UiCard>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <Avatar>
            <AvatarImage src={aboutData.avatarSrc} />
            <AvatarFallback>{aboutData.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-center mb-4">
          <CardTitle>{aboutData.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{aboutData.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        {aboutData.socialLinks.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="mr-4">
            <link.icon className="w-6 h-6 text-[color:var(--primary)]" aria-hidden="true" />
          </a>
        ))}
      </CardFooter>
    </UiCard>
  );
};

export default AboutCard;
