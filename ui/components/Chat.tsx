'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import MessageInput from './MessageInput';
import { Message } from './ChatWindow';
import MessageBox from './MessageBox';
import MessageBoxLoading from './MessageBoxLoading';

const Chat = ({
  loading,
  messages,
  sendMessage,
  messageAppeared,
  rewrite,
}: {
  messages: Message[];
  sendMessage: (message: string) => void;
  loading: boolean;
  messageAppeared: boolean;
  rewrite: (messageId: string) => void;
}) => {
  const [dividerWidth, setDividerWidth] = useState(0);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const messageEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateDividerWidth = () => {
      if (dividerRef.current) {
        setDividerWidth(dividerRef.current.scrollWidth);
      }
    };

    updateDividerWidth();

    window.addEventListener('resize', updateDividerWidth);

    return () => {
      window.removeEventListener('resize', updateDividerWidth);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    const scrollToBottom = () => {
      if (messageEnd.current) {
        messageEnd.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToBottom();

    // Fallback: Force scroll to bottom after a slight delay
    // const timeout = setTimeout(scrollToBottom, 100);

    // return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto min-h-screen">
      {/* Messages container */}
      <div className="flex-grow flex flex-col space-y-6 pt-8 pb-6 lg:pb-6 sm:mx-4 md:mx-8 w-full">
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1;

          return (
            <Fragment key={msg.messageId}>
              <MessageBox
                key={i}
                message={msg}
                messageIndex={i}
                history={messages}
                loading={loading}
                isLast={isLast}
                rewrite={rewrite}
                sendMessage={sendMessage}
              />
              {!isLast && msg.role === 'assistant' && (
                <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
              )}
            </Fragment>
          );
        })}
        {loading && !messageAppeared && <MessageBoxLoading />}
        <div ref={messageEnd} className="h-0" />
      </div>
      {/* Fixed input area */}
      <div className="bg-light-primary w-full max-w-4xl pb-4 pt-4 sticky bottom-0">
        <MessageInput loading={loading} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
