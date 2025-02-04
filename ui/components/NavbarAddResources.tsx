import React from 'react';
import { ExternalLink } from 'lucide-react';

const AdditionalResources = () => {
  const resources = [
    {
      title: 'Asian Liver Center - Stanford University',
      url: 'https://liver.stanford.edu',
      description: 'Leading research center focused on hepatitis B and liver cancer prevention in Asians and Asian Americans.',
      category: 'Medical Centers'
    },
    {
      title: 'Hep B Moms',
      url: 'https://hepbmoms.org',
      description: 'Support and resources for preventing mother-to-child hepatitis B transmission.',
      category: 'Support Groups'
    },
    {
      title: 'Team HBV',
      url: 'https://teamhbv.org',
      description: 'Student-run organization dedicated to raising awareness about hepatitis B in Asian and Pacific Islander communities.',
      category: 'Community Organizations'
    },
    {
      title: 'APAVH',
      url: 'https://stanfordapavh.org',
      description: 'Asian Pacific American Viral Hepatitis organization promoting awareness and education.',
      category: 'Education'
    },
    {
      title: 'JoinJade',
      url: 'https://joinjade.org',
      description: 'Campaign to raise awareness about hepatitis B and liver cancer in the Asian and Pacific Islander community.',
      category: 'Community Organizations'
    },
    {
      title: 'JoinJade [Chinese]',
      url: 'https://joinjade.cn',
      description: 'Chinese language platform for hepatitis B and liver cancer awareness and education.',
      category: 'Community Organizations'
    },
    {
      title: 'Hep B Calculator',
      url: 'https://hepbcalculator.org',
      description: 'Tool for calculating and assessing hepatitis B risks and treatment options.',
      category: 'Tools'
    },
    {
      title: 'Chronic Hepatitis B Treatment Decision Tool For Adults',
      url: 'https://nohepb.org',
      description: 'Interactive tool to help adults make informed decisions about hepatitis B treatment.',
      category: 'Tools'
    },
    {
      title: 'Hepatitis B Health Risk Assessment',
      url: 'https://hepbhra.org',
      description: 'Online assessment tool for evaluating personal hepatitis B health risks.',
      category: 'Tools'
    },
    {
      title: 'CDC - Hepatitis',
      url: 'https://cdc.gov/hepatitis.org',
      description: 'Official CDC resource for comprehensive hepatitis information and guidelines.',
      category: 'Government Resources'
    },
    {
      title: 'WHO - Hepatitis',
      url: 'https://who.int/health-topics/hepatitis',
      description: 'World Health Organization\'s global perspective and resources on hepatitis.',
      category: 'Government Resources'
    }
  ];

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-primary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-medium text-black dark:text-white mb-6">
          Additional Resources
        </h1>
        
        <div className="grid gap-4">
          {resources.map((resource, index) => (
            <div 
              key={index}
              // className="bg-light-secondary dark:bg-dark-secondary rounded-lg border border-light-200 dark:border-dark-200 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              className="bg-light-secondary rounded-lg border border-light-200 dark:border-dark-200 hover:border-[#1f8270] dark:hover:border-[#1f8270] dark:hover:bg-[#1f8270] transition-colors"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-light-tertiary uppercase tracking-wide">
                      {resource.category}
                    </span>
                    <h3 className="mt-1 text-lg font-medium text-black dark:text-white">
                      {resource.title}
                    </h3>
                  </div>
                  <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-tertiary hover:text-[#1f8270]"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                  {resource.description}
                </p>
                <a 
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-light-tertiary hover:text-[#1f8270]"
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalResources;