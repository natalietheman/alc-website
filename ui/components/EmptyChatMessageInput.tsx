import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';


const EmptyChatMessageInput = ({
  sendMessage,
  focusMode,
  setFocusMode,
}: {
  sendMessage: (message: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
}) => {
  // const [copilotEnabled, setCopilotEnabled] = useState(false);
  const [message, setMessage] = useState('');

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '/') {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(message);
          setMessage('');
        }
      }}
      className="w-full"
    >
      <div className="flex flex-col bg-light-secondary dark:bg-dark-secondary px-5 pt-5 pb-2 rounded-lg w-full border border-light-200 dark:border-dark-200">
        <TextareaAutosize
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={2}
          className="bg-transparent placeholder:text-light-tertiary/70 text-sm text-black resize-none focus:outline-none w-full max-h-24 lg:max-h-36 xl:max-h-48"
          placeholder="Ask ChatHEP a question..."
        />
        <div className="flex flex-row items-center justify-between mt-4">
          <div className="flex flex-row items-center space-x-1 -mx-2">
            {/* <Focus focusMode={focusMode} setFocusMode={setFocusMode} /> */}
            {/* <Attach /> */}
          </div>
          <div className="flex flex-row items-center space-x-4 -mx-2">
            {/* <CopilotToggle
              copilotEnabled={copilotEnabled}
              setCopilotEnabled={setCopilotEnabled}
            /> */}
            <button
              disabled={message.trim().length === 0}
              className="bg-[#27A28B] text-white disabled:text-black/50 dark:disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#e0e0dc79] dark:disabled:bg-[#ececec21] rounded-full p-2"
              // className="bg-[#27A28B] text-white disabled:text-light-tertiary/50 dark:disabled:text-white/50 disabled:bg-[#f0f0ee] dark:disabled:bg-[#ececec21] hover:bg-opacity-85 transition duration-100 rounded-full p-2"
            >
              <ArrowRight className="bg-background" size={17} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmptyChatMessageInput;
