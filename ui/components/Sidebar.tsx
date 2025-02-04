'use client';

import { cn } from '@/lib/utils';
import { Home, FilePlus2, FileClock } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { useState, type ReactNode } from 'react';
import Layout from './Layout';
import AdditionalResources from './NavbarAddResources';


const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-y-3 w-full">{children}</div>
  );
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const [showResources, setShowResources] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    {
      icon: Home,
      href: '/',
      id: 'home',
      active: activeSection === 'home',
      label: 'Home',
      onClick: () => {
        setActiveSection('home');
        setShowResources(false);
      },
      className: cn(
        "cursor-pointer",
        activeSection === 'home' ? "text-light-tertiary" : ""
      )
    },
    {
      icon: FileClock,
      id: 'resources',
      active: activeSection === 'resources',
      label: 'Resources',
      onClick: () => {
        setActiveSection('resources');
        setShowResources(true);
      },
      className: cn(
        "cursor-pointer",
        activeSection === 'resources' ? "text-light-tertiary" : ""
      )
    },
  ];

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-20 lg:flex-col">
        <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto bg-light-secondary dark:bg-dark-secondary px-2 py-8">
          <a 
            onClick={(e) => {
              e.preventDefault();
              if (confirm("This action will erase your current chat completely. Are you sure you want to continue?")) {
                window.location.href = '/';
              }
            }}
            className="cursor-pointer"
          >
            <FilePlus2 />
          </a>
          
          <VerticalIconContainer>
            {navLinks.map((link, i) => (
              <div
                key={i}
                onClick={link.onClick}
                className={cn(
                  'relative flex flex-row items-center justify-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 duration-150 transition w-full py-2 rounded-lg',
                  link.active
                    ? 'text-black dark:text-white'
                    : 'text-black/70 dark:text-white/70',
                  link.className
                )}
              >
                <link.icon />
                {link.active && (
                  <div className="absolute right-0 -mr-2 h-full w-1 rounded-l-lg bg-black dark:bg-white" />
                )}
              </div>
            ))}
          </VerticalIconContainer>
        </div>
      </div>

      <div className="fixed bottom-0 w-full z-50 flex flex-row items-center gap-x-6 bg-light-primary dark:bg-dark-primary px-4 py-4 shadow-sm lg:hidden">
        {navLinks.map((link, i) => (
          <div
            key={i}
            onClick={link.onClick}
            className={cn(
              'relative flex flex-col items-center space-y-1 text-center w-full cursor-pointer',
              link.active
                ? 'text-black dark:text-white'
                : 'text-black dark:text-white/70',
              link.className
            )}
          >
            {link.active && (
              <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
            )}
            <link.icon />
            <p className="text-xs">{link.label}</p>
          </div>
        ))}
      </div>

      <Layout>
        {showResources ? <AdditionalResources /> : children}
      </Layout>
    </div>
  );
};

export default Sidebar;