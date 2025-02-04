import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MessageSources = ({ sources }: { sources: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const sourcesPerPage = 4;
  const totalPages = Math.ceil(sources.length / sourcesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = (currentPage - 1) * sourcesPerPage;
  const visibleSources = sources.slice(startIndex, startIndex + sourcesPerPage);

  return (
    <div className="bg-light-secondary p-4 rounded-lg">
      <p className="text-sm text-gray-600 mb-4">Here are some reliable resources you can reference.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleSources.map((source, index) => (
          <a
            key={index}
            href={source.metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${source.metadata.url}`}
                  alt="favicon"
                  className="w-4 h-4 mr-2"
                />
                <span className="text-xs text-gray-600 truncate">
                  {source.metadata.url.replace(/.+\/\/|www.|\..+/g, '')}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {startIndex + index + 1}
              </span>
            </div>
            <p className="text-sm font-medium truncate">{source.metadata.title}</p>
          </a>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i + 1 === currentPage ? 'bg-light-tertiary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageSources;