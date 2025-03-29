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
import ChatHepLogo from './ChatHepLogo';


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
