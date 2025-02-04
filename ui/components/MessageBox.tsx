'use client';

/* eslint-disable @next/next/no-img-element */
import React, { MutableRefObject, useEffect, useState } from 'react';
import { Message } from './ChatWindow';
import { cn } from '@/lib/utils';
import {
  BookCopy,
  Disc3,
  Volume2,
  StopCircle,
  Layers3,
  Plus,
} from 'lucide-react';
import Markdown from 'markdown-to-jsx';

import MessageSources from './MessageSources';
import { useSpeech } from 'react-text-to-speech';

const ChatHepLogo = () => (
  <svg width="24" height="24" viewBox="0 0 209 209" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M168.39 184.512L135.178 151.299C130.753 146.874 123.58 146.874 119.156 151.297C114.733 155.721 114.734 162.894 119.158 167.318L152.371 200.531C156.796 204.956 163.968 204.956 168.392 200.533C172.816 196.109 172.815 188.936 168.39 184.512Z" fill="#65BBAB"/>
    <path d="M40.2792 182.673L88.5023 134.45C88.5023 134.45 104.342 117.607 107.657 114.08C108.058 113.651 108.541 113.325 109.057 113.043C112.421 111.209 114.706 107.649 114.706 103.553C114.706 97.5837 109.855 92.7327 103.897 92.7327C97.9385 92.7327 93.0875 97.5837 93.0875 103.553C93.0875 104.974 93.782 107.329 93.8037 107.4C93.8037 107.4 93.8037 107.4 93.8037 107.405C95.0518 118.518 86.1147 121.28 86.0659 121.296C75.1754 124.167 71.3771 115.007 70.8724 113.613C69.7166 109.825 69.1794 105.777 69.4236 101.567C70.46 83.546 85.3605 69.2587 103.403 69.0037C122.677 68.7324 138.429 84.3382 138.429 103.547C138.429 115.914 132.075 123.489 122.123 132.86L56.2867 198.68C52.1084 202.858 45.2822 202.858 41.1149 198.68L40.2738 197.839C36.0956 193.661 36.0956 186.835 40.2738 182.667L40.2792 182.673Z" fill="#65BBAB"/>
    <path d="M76.1204 124.037C76.0822 123.988 76.044 123.939 76.0059 123.885C76.044 123.934 76.0822 123.983 76.1204 124.037Z" fill="#65BBAB"/>
    <path d="M24.0303 168.39L57.2429 135.178C61.6675 130.753 61.6684 123.58 57.2448 119.157C52.8212 114.733 45.6483 114.734 41.2237 119.159L8.01113 152.371C3.58648 156.796 3.58562 163.969 8.0092 168.392C12.4328 172.816 19.6057 172.815 24.0303 168.39Z" fill="#65BBAB"/>
    <path d="M25.8694 40.2794L74.0925 88.5025C74.0925 88.5025 90.9356 104.342 94.4627 107.657C94.8913 108.059 95.2169 108.542 95.4991 109.057C97.3331 112.421 100.893 114.706 104.99 114.706C110.958 114.706 115.81 109.855 115.81 103.897C115.81 97.9387 110.958 93.0877 104.99 93.0877C103.568 93.0877 101.213 93.7822 101.142 93.8039C101.142 93.8039 101.142 93.8039 101.137 93.8039C90.024 95.052 87.262 86.1149 87.2457 86.0661C84.3753 75.1756 93.5348 71.3772 94.9293 70.8726C98.7168 69.7168 102.765 69.1796 106.976 69.4238C124.996 70.4602 139.283 85.3607 139.539 103.403C139.81 122.677 124.204 138.429 104.995 138.429C92.6286 138.429 85.0535 132.075 75.6824 122.124L9.86201 56.2868C5.68381 52.1086 5.68381 45.2824 9.86201 41.115L10.7031 40.274C14.8813 36.0958 21.7075 36.0958 25.8749 40.274L25.8694 40.2794Z" fill="#65BBAB"/>
    <path d="M84.5045 76.1205C84.5536 76.0823 84.6027 76.0441 84.6572 76.006C84.6081 76.0441 84.5591 76.0823 84.5045 76.1205Z" fill="#65BBAB"/>
    <path d="M40.1519 24.0307L73.3644 57.2432C77.7891 61.6679 84.962 61.6687 89.3856 57.2452C93.8092 52.8216 93.8083 45.6487 89.3837 41.224L56.1711 8.0115C51.7465 3.58685 44.5736 3.58599 40.15 8.00957C35.7264 12.4332 35.7273 19.6061 40.1519 24.0307Z" fill="#65BBAB"/>
    <path d="M168.263 25.8696L120.04 74.0927C120.04 74.0927 104.2 90.9358 100.885 94.4628C100.484 94.8915 100.001 95.2171 99.4851 95.4993C96.1208 97.3333 93.8363 100.893 93.8363 104.99C93.8363 110.959 98.6874 115.81 104.645 115.81C110.603 115.81 115.455 110.959 115.455 104.99C115.455 103.568 114.76 101.213 114.738 101.143C114.738 101.143 114.738 101.143 114.738 101.137C113.49 90.0242 122.427 87.2622 122.476 87.2459C133.367 84.3754 137.165 93.535 137.67 94.9295C138.825 98.717 139.363 102.765 139.118 106.976C138.082 124.996 123.181 139.284 105.139 139.539C85.8652 139.81 70.1128 124.204 70.1128 104.995C70.1128 92.6288 76.4669 85.0537 86.4187 75.6826L152.255 9.8622C156.434 5.68399 163.26 5.68399 167.427 9.8622L168.268 10.7033C172.446 14.8815 172.446 21.7077 168.268 25.8751L168.263 25.8696Z" fill="#65BBAB"/>
    <path d="M132.422 84.505C132.46 84.554 132.498 84.6031 132.536 84.6577C132.498 84.6086 132.46 84.5595 132.422 84.505Z" fill="#65BBAB"/>
    <path d="M184.512 40.152L151.299 73.3646C146.874 77.7892 146.874 84.9621 151.297 89.3857C155.721 93.8093 162.894 93.8084 167.318 89.3838L200.531 56.1713C204.956 51.7466 204.956 44.5737 200.533 40.1501C196.109 35.7265 188.936 35.7274 184.512 40.152Z" fill="#68BBAB"/>
    <path d="M182.673 168.263L134.449 120.04C134.449 120.04 117.606 104.201 114.079 100.885C113.651 100.484 113.325 100.001 113.043 99.4853C111.209 96.121 107.649 93.8365 103.552 93.8365C97.5835 93.8365 92.7325 98.6876 92.7325 104.646C92.7325 110.604 97.5835 115.455 103.552 115.455C104.974 115.455 107.329 114.76 107.4 114.738C107.4 114.738 107.4 114.738 107.405 114.738C118.518 113.49 121.28 122.427 121.296 122.476C124.167 133.367 115.007 137.165 113.613 137.67C109.825 138.826 105.777 139.363 101.566 139.119C83.5458 138.082 69.2585 123.182 69.0035 105.139C68.7322 85.8654 84.3381 70.113 103.547 70.113C115.913 70.113 123.488 76.4671 132.86 86.4188L198.68 152.256C202.858 156.434 202.858 163.26 198.68 167.427L197.839 168.268C193.661 172.447 186.834 172.447 182.667 168.268L182.673 168.263Z" fill="#68BBAB"/>
    <path d="M124.037 132.422C123.988 132.46 123.939 132.498 123.885 132.536C123.934 132.498 123.983 132.46 124.037 132.422Z" fill="#68BBAB"/>
    <circle cx="104.14" cy="103.542" r="13" transform="rotate(-90 104.14 103.542)" fill="white"/>
  </svg>
);

const MessageBox = ({
  message,
  messageIndex,
  history,
  loading,
  dividerRef,
  isLast,
  rewrite,
  sendMessage,
}: {
  message: Message;
  messageIndex: number;
  history: Message[];
  loading: boolean;
  dividerRef?: MutableRefObject<HTMLDivElement | null>;
  isLast: boolean;
  rewrite: (messageId: string) => void;
  sendMessage: (message: string) => void;
}) => {
  const [parsedMessage, setParsedMessage] = useState(message.content);
  const [speechMessage, setSpeechMessage] = useState(message.content);

  useEffect(() => {
    const regex = /\[(\d+)\]/g;

    if (
      message.role === 'assistant' &&
      message?.sources &&
      message.sources.length > 0
    ) {
      return setParsedMessage(
        message.content.replace(
          regex,
          (_, number) =>
            `<a href="${message.sources?.[number - 1]?.metadata?.url}" target="_blank" className="bg-light-secondary dark:bg-dark-secondary px-1 rounded ml-1 no-underline text-xs text-black/70 dark:text-white/70 relative">${number}</a>`,
        ),
      );
    }

    setSpeechMessage(message.content.replace(regex, ''));
    setParsedMessage(message.content);
  }, [message.content, message.sources, message.role]);

  const { speechStatus, start, stop } = useSpeech({ text: speechMessage });

  return (
    <div className="w-full max-w-4xl mx-auto">
      {message.role === 'user' && (
        <div className={cn('w-full flex justify-end', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
          <div className="bg-light-tertiary rounded-lg p-3 max-w-[90%]">
            <h2 className="text-white font-medium">
              {message.content}
            </h2>
          </div>
        </div>
      )}

    {message.role === 'assistant' && (
      <div className={cn('w-full', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
        <div ref={dividerRef} className="w-full">
          <div className="bg-light-secondary rounded-2xl p-6 w-full">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-white rounded-full flex border border-light-200 items-center justify-center mr-3 flex-shrink-0">
                <ChatHepLogo/>
              </div>
              <div className="flex-grow overflow-hidden">
                <Markdown
                  className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none break-words text-gray-800 text-base"
                >
                  {parsedMessage}
                </Markdown>
              </div>
            </div>
          </div>
          {message.sources && message.sources.length > 0 && (
            <div className="mt-6 w-full">
              <div className="flex flex-row items-center space-x-2 mb-2">
                <BookCopy className="text-black dark:text-white" size={20} />
                <h3 className="text-black dark:text-white font-medium text-xl">
                  Sources
                </h3>
              </div>
              <MessageSources sources={message.sources} />
            </div>
          )}
        </div>
      </div>
    )}
    </div>
  );
};

export default MessageBox;
