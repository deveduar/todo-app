"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importa usePathname para obtener la ruta actual
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar as CalendarIcon, BarChart as ChartBarIcon, Folder as FolderIcon, Home as HomeIcon, Inbox as InboxIcon, Users as UsersIcon } from 'lucide-react';

type NavigationItem = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
  href?: string;
  children?: { name: string; href: string }[];
};

const navigation: NavigationItem[] = [
  { name: 'Dashboard', icon: HomeIcon, current: false, href: '/' },
  {
    name: 'Archive',
    icon: FolderIcon,
    current: false,
    children: [
      { name: 'Overview', href: '/overview' },
      { name: 'Members', href: '/members' },
      { name: 'Calendar', href: '/calendar' },
      { name: 'Settings', href: '/settings' },
    ],
  },
  {
    name: 'About',
    icon: UsersIcon,
    current: false,
    href: '/about',
  },
  // Resto de los elementos...
];

function classNames(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const pathname = usePathname(); // Obtén la ruta actual

  return (
    <div
      className={classNames(
        'fixed top-16 left-0 h-screen flex flex-col overflow-y-auto border-r bg-[hsl(var(--background))] border-[hsl(var(--border))] pt-5 pb-4 transition-transform duration-300 ease-in-out',
        isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full' // Ajusta el ancho y la posición
      )}
    >
      <div className="mt-5 flex flex-col flex-grow">
        <nav className="flex-1 space-y-1 bg-[hsl(var(--background))] px-2" aria-label="Sidebar">
          {navigation.map((item) => {
            const isItemActive = item.href ? pathname === item.href : item.children?.some(child => pathname === child.href);
            return !item.children ? (
              <div key={item.name}>
                <Link href={item.href || '#'}>
                  <span
                    className={classNames(
                      isItemActive
                        ? 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                        : 'bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]',
                      'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
                      !isSidebarOpen && 'hidden' // Oculta el ítem cuando la barra está colapsada
                    )}
                  >
                    <item.icon
                      className={classNames(
                        isItemActive ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </span>
                </Link>
              </div>
            ) : (
              <Collapsible key={item.name} className="space-y-1">
                <CollapsibleTrigger
                  className={classNames(
                    isItemActive
                      ? 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                      : 'bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]',
                    'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]'
                  )}
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]"
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                  <svg
                    className={classNames(
                      'ml-3 h-5 w-5 flex-shrink-0 transform transition-transform duration-150 ease-in-out',
                      'text-[hsl(var(--muted-foreground))]'
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-1">
                    {item.children.map((subItem) => {
                      const isSubItemActive = pathname === subItem.href;
                      return (
                        <Link key={subItem.name} href={subItem.href}>
                          <span
                            className={classNames(
                              isSubItemActive
                                ? 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                                : 'bg-[hsl(var(--background))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]',
                              'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium'
                            )}
                          >
                            {subItem.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
