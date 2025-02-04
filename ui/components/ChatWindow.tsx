'use client';

import { useEffect, useRef, useState } from 'react';
import { Document } from '@langchain/core/documents';
import Navbar from './Navbar';
import Chat from './Chat';
import EmptyChat from './EmptyChat';
import crypto from 'crypto';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { getSuggestions } from '@/lib/actions';
import Error from 'next/error';

export type Message = {
  messageId: string;
  chatId: string;
  createdAt: Date;
  content: string;
  role: 'user' | 'assistant';
  suggestions?: string[];
  sources?: Document[];
};

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

const useSocket = (
  url: string,
  setIsWSReady: (ready: boolean) => void,
  setError: (error: boolean) => void,
) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!ws) {
      const connectWs = async () => {
        // let chatModel = localStorage.getItem('chatModel');
        // let chatModelProvider = localStorage.getItem('chatModelProvider');
        // let embeddingModel = localStorage.getItem('embeddingModel');
        // let embeddingModelProvider = localStorage.getItem(
        //   'embeddingModelProvider',
        // );
        let chatModel = 'gpt-3.5-turbo'; // e.g., 'gpt-3.5-turbo'
        let chatModelProvider = 'openai'; // e.g., 'openai'
        let embeddingModel = 'text-embedding-3-small'; // e.g., 'BGE Small'
        let embeddingModelProvider = 'openai'; // e.g., 'openai'
        
        console.log('CHAT MODEL UI', chatModel);
        console.log('CHAT MODEL PROVIDER UI', chatModelProvider);
        console.log('EMBEDDING MODEL UI', embeddingModel);
        console.log('EMBEDDING MODEL PROVIDER UI', embeddingModelProvider);

        if (
          !chatModel ||
          !chatModelProvider ||
          !embeddingModel ||
          !embeddingModelProvider
        ) {
          // console.log("IN IF STATEMENT")
          // const providers = await fetch(
          //   `${process.env.NEXT_PUBLIC_API_URL}/models`,
          //   {
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //   },
          // ).then(async (res) => await res.json());

          // const chatModelProviders = providers.chatModelProviders;
          // const embeddingModelProviders = providers.embeddingModelProviders;

          // console.log('PROVIDERS', providers);

          // if (
          //   !chatModelProviders ||
          //   Object.keys(chatModelProviders).length === 0
          // )
          //   return toast.error('No chat models available');

          // if (
          //   !embeddingModelProviders ||
          //   Object.keys(embeddingModelProviders).length === 0
          // )
          //   return toast.error('No embedding models available');

          // chatModelProvider = Object.keys(chatModelProviders)[0];
          // chatModel = Object.keys(chatModelProviders[chatModelProvider])[0];

          // embeddingModelProvider = Object.keys(embeddingModelProviders)[0];
          // embeddingModel = Object.keys(
          //   embeddingModelProviders[embeddingModelProvider],
          // )[0];

          // localStorage.setItem('chatModel', chatModel!);
          // localStorage.setItem('chatModelProvider', chatModelProvider);
          // localStorage.setItem('embeddingModel', embeddingModel!);
          // localStorage.setItem(
          //   'embeddingModelProvider',
          //   embeddingModelProvider,
          // );
        } else {
          console.log("IN ELSE STATEMENT")
          console.log("NEXT PUBLIC API URL", process.env.NEXT_PUBLIC_API_URL)
          const providers = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/models`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          ).then(async (res) => await res.json());

          console.log('PROVIDERS', providers);

          const chatModelProviders = providers.chatModelProviders;
          const embeddingModelProviders = providers.embeddingModelProviders;

          if (
            Object.keys(chatModelProviders).length > 0 &&
            !chatModelProviders[chatModelProvider]
          ) {
            chatModelProvider = Object.keys(chatModelProviders)[0];
            localStorage.setItem('chatModelProvider', chatModelProvider);
          }

          if (
            chatModelProvider &&
            !chatModelProviders[chatModelProvider][chatModel]
          ) {
            console.log("IN ELSE STATEMENT SETTING CHATMODEL", Object.keys(chatModelProviders[chatModelProvider]))
            chatModel = Object.keys(chatModelProviders[chatModelProvider])[0];
            localStorage.setItem('chatModel', chatModel);
          }

          if (
            Object.keys(embeddingModelProviders).length > 0 &&
            !embeddingModelProviders[embeddingModelProvider]
          ) {
            embeddingModelProvider = Object.keys(embeddingModelProviders)[0];
            localStorage.setItem(
              'embeddingModelProvider',
              embeddingModelProvider,
            );
          }

          if (
            embeddingModelProvider &&
            !embeddingModelProviders[embeddingModelProvider][embeddingModel]
          ) {
            embeddingModel = Object.keys(
              embeddingModelProviders[embeddingModelProvider],
            )[0];
            localStorage.setItem('embeddingModel', embeddingModel);
          }

          
        }


        const wsURL = new URL(url);
        const searchParams = new URLSearchParams({});

        searchParams.append('chatModel', chatModel!);
        searchParams.append('chatModelProvider', chatModelProvider);

        if (chatModelProvider === 'custom_openai') {
          searchParams.append(
            'openAIApiKey',
            localStorage.getItem('openAIApiKey')!,
          );
          searchParams.append(
            'openAIBaseURL',
            localStorage.getItem('openAIBaseURL')!,
          );
        }

        searchParams.append('embeddingModel', embeddingModel!);
        searchParams.append('embeddingModelProvider', embeddingModelProvider);

        wsURL.search = searchParams.toString();

        const ws = new WebSocket(wsURL.toString());

        const timeoutId = setTimeout(() => {
          if (ws.readyState !== 1) {
            ws.close();
            setError(true);
            toast.error(
              'Failed to connect to the server. Please try again later.',
            );
          }
        }, 10000);

        ws.onopen = () => {
          console.log('[DEBUG] open');
          clearTimeout(timeoutId);
          setError(false);
          setIsWSReady(true);
        };

        ws.onerror = () => {
          clearTimeout(timeoutId);
          setError(true);
          toast.error('WebSocket connection error.');
        };

        ws.onclose = () => {
          clearTimeout(timeoutId);
          setError(true);
          console.log('[DEBUG] closed');
        };

        setWs(ws);
      };

      connectWs();
    }

    return () => {
      if (ws?.readyState === 1) {
        ws?.close();
        console.log('[DEBUG] closed');
      }
    };
  }, [ws, url, setIsWSReady, setError]);

  return ws;
};

const loadMessages = async (
  chatId: string,
  setMessages: (messages: Message[]) => void,
  setIsMessagesLoaded: (loaded: boolean) => void,
  setChatHistory: (history: [string, string][]) => void,
  setFocusMode: (mode: string) => void,
  setNotFound: (notFound: boolean) => void,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (res.status === 404) {
    setNotFound(true);
    setIsMessagesLoaded(true);
    return;
  }

  const data = await res.json();

  const messages = data.messages.map((msg: any) => {
    return {
      ...msg,
      ...JSON.parse(msg.metadata),
    };
  }) as Message[];

  setMessages(messages);

  const history = messages.map((msg) => {
    return [msg.role, msg.content];
  }) as [string, string][];

  console.log('[DEBUG] messages loaded');

  document.title = messages[0].content;

  setChatHistory(history);
  setFocusMode(data.chat.focusMode);
  setIsMessagesLoaded(true);
};

const ChatWindow = ({ id }: { id?: string }) => {
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get('q');

  const [chatId, setChatId] = useState<string | undefined>(id);
  const [newChatCreated, setNewChatCreated] = useState(false);

  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [isWSReady, setIsWSReady] = useState(false);
  const ws = useSocket(
    process.env.NEXT_PUBLIC_WS_URL!,
    setIsWSReady,
    setHasError,
  );

  const [loading, setLoading] = useState(false);
  const [messageAppeared, setMessageAppeared] = useState(false);

  const [chatHistory, setChatHistory] = useState<[string, string][]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [focusMode, setFocusMode] = useState('webSearch');

  const [isMessagesLoaded, setIsMessagesLoaded] = useState(false);

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (
      chatId &&
      !newChatCreated &&
      !isMessagesLoaded &&
      messages.length === 0
    ) {
      loadMessages(
        chatId,
        setMessages,
        setIsMessagesLoaded,
        setChatHistory,
        setFocusMode,
        setNotFound,
      );
    } else if (!chatId) {
      setNewChatCreated(true);
      setIsMessagesLoaded(true);
      setChatId(crypto.randomBytes(20).toString('hex'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (isMessagesLoaded && isWSReady) {
      setIsReady(true);
    }
  }, [isMessagesLoaded, isWSReady]);

  const sendMessage = async (message: string) => {
    if (loading) return;
    setLoading(true);
    setMessageAppeared(false);

    let sources: Document[] | undefined = undefined;
    let recievedMessage = '';
    let added = false;

    const messageId = crypto.randomBytes(7).toString('hex');

    ws?.send(
      JSON.stringify({
        type: 'message',
        message: {
          chatId: chatId!,
          content: message,
        },
        focusMode: focusMode,
        history: [...chatHistory, ['human', message]],
      }),
    );

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: message,
        messageId: messageId,
        chatId: chatId!,
        role: 'user',
        createdAt: new Date(),
      },
    ]);

    const messageHandler = async (e: MessageEvent) => {
      const data = JSON.parse(e.data);

      if (data.type === 'error') {
        toast.error(data.data);
        setLoading(false);
        return;
      }

      if (data.type === 'sources') {
        sources = data.data;
        if (!added) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              content: '',
              messageId: data.messageId,
              chatId: chatId!,
              role: 'assistant',
              sources: sources,
              createdAt: new Date(),
            },
          ]);
          added = true;
        }
        setMessageAppeared(true);
      }

      if (data.type === 'message') {
        if (!added) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              content: data.data,
              messageId: data.messageId,
              chatId: chatId!,
              role: 'assistant',
              sources: sources,
              createdAt: new Date(),
            },
          ]);
          added = true;
        }

        setMessages((prev) =>
          prev.map((message) => {
            if (message.messageId === data.messageId) {
              return { ...message, content: message.content + data.data };
            }

            return message;
          }),
        );

        recievedMessage += data.data;
        setMessageAppeared(true);
      }

      if (data.type === 'messageEnd') {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          ['human', message],
          ['assistant', recievedMessage],
        ]);

        ws?.removeEventListener('message', messageHandler);
        setLoading(false);

        const lastMsg = messagesRef.current[messagesRef.current.length - 1];

        if (
          lastMsg.role === 'assistant' &&
          lastMsg.sources &&
          lastMsg.sources.length > 0 &&
          !lastMsg.suggestions
        ) {
          const suggestions = await getSuggestions(messagesRef.current);
          setMessages((prev) =>
            prev.map((msg) => {
              if (msg.messageId === lastMsg.messageId) {
                return { ...msg, suggestions: suggestions };
              }
              return msg;
            }),
          );
        }
      }
    };

    ws?.addEventListener('message', messageHandler);
  };

  const rewrite = (messageId: string) => {
    const index = messages.findIndex((msg) => msg.messageId === messageId);

    if (index === -1) return;

    const message = messages[index - 1];

    setMessages((prev) => {
      return [...prev.slice(0, messages.length > 2 ? index - 1 : 0)];
    });
    setChatHistory((prev) => {
      return [...prev.slice(0, messages.length > 2 ? index - 1 : 0)];
    });

    sendMessage(message.content);
  };

  useEffect(() => {
    if (isReady && initialMessage) {
      sendMessage(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, initialMessage]);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="dark:text-white/70 text-black/70 text-sm">
          Failed to connect to the server. Please try again later.
        </p>
      </div>
    );
  }

  return isReady ? (
    notFound ? (
      <Error statusCode={404} />
    ) : (
      <div>
        {messages.length > 0 ? (
          <>
            <Navbar messages={messages} />
            <Chat
              loading={loading}
              messages={messages}
              sendMessage={sendMessage}
              messageAppeared={messageAppeared}
              rewrite={rewrite}
            />
          </>
        ) : (
          <><div className="fixed z-40 top-0 left-0 right-0 px-4 lg:pl-[104px] lg:pr-6 lg:px-8 flex flex-row items-center justify-between w-full py-4 text-sm text-black dark:text-white/70">
                <div className="hidden lg:flex flex-row items-center justify-center space-x-2">
                  <ChatHepLogo />
                  <p className="text-sm font-semibold">ChatHEP</p>
                </div>
              </div><EmptyChat
                  sendMessage={sendMessage}
                  focusMode={focusMode}
                  setFocusMode={setFocusMode} /></>
        )}
      </div>
    )
  ) : (
    <div className="flex flex-row items-center justify-center min-h-screen">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-light-200 fill-light-secondary dark:text-[#202020] animate-spin dark:fill-[#ffffff3b]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100.003 78.2051 78.1951 100.003 50.5908 100C22.9765 99.9972 0.997224 78.018 1 50.4037C1.00281 22.7993 22.8108 0.997224 50.4251 1C78.0395 1.00281 100.018 22.8108 100 50.4251ZM9.08164 50.594C9.06312 73.3997 27.7909 92.1272 50.5966 92.1457C73.4023 92.1642 92.1298 73.4365 92.1483 50.6308C92.1669 27.8251 73.4392 9.0973 50.6335 9.07878C27.8278 9.06026 9.10003 27.787 9.08164 50.594Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4037 97.8624 35.9116 96.9801 33.5533C95.1945 28.8227 92.871 24.3692 90.0681 20.348C85.6237 14.1775 79.4473 9.36872 72.0454 6.45794C64.6435 3.54717 56.3134 2.65431 48.3133 3.89319C45.869 4.27179 44.3768 6.77534 45.014 9.20079C45.6512 11.6262 48.1343 13.0956 50.5786 12.717C56.5073 11.8281 62.5542 12.5399 68.0406 14.7911C73.527 17.0422 78.2187 20.7487 81.5841 25.4923C83.7976 28.5886 85.4467 32.059 86.4416 35.7474C87.1273 38.1189 89.5423 39.6781 91.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};

export default ChatWindow;
