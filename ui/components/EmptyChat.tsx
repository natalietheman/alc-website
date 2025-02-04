import EmptyChatMessageInput from './EmptyChatMessageInput';
import SampleTopicBox from './SampleTopicBox';
import { ArrowRight, Pill, Syringe, TestTubeDiagonal } from 'lucide-react';


const HepatitisIcon = ({ size = 24, color = '#27A28B' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
      <path d="M2010 2224 c-25 -9 -91 -43 -148 -76 -148 -87 -225 -117 -326 -127 -145 -14 -172 -48 -164 -206 6 -109 42 -238 94 -329 65 -116 202 -226 281 -226 85 0 213 108 321 268 105 158 163 337 166 514 1 83 -2 100 -20 124 -50 67 -121 88 -204 58z"/>
      <path d="M845 1836 c-188 -37 -337 -135 -435 -288 -108 -166 -115 -387 -21 -623 43 -106 80 -170 168 -286 162 -215 369 -357 447 -306 15 10 33 43 50 94 67 189 133 272 363 456 137 110 188 164 205 219 16 55 -3 90 -91 165 -144 122 -230 278 -231 418 0 59 -31 102 -94 131 -68 31 -252 41 -361 20z"/>
    </g>
  </svg>
);

const EmptyChat = ({
  sendMessage,
  focusMode,
  setFocusMode,
}: {
  sendMessage: (message: string) => void;
  focusMode: string;
  setFocusMode: (mode: string) => void;
}) => {
  const sampleTopics = [
    { topic: 'Hepatitis B', icon: <HepatitisIcon size={24} /> },
    { topic: 'Screening', icon: <TestTubeDiagonal className="text-light-tertiary" size={24} /> },
    { topic: 'Vaccination', icon: <Syringe className="text-light-tertiary" size={24} /> },
    { topic: 'Treatment', icon: <Pill className="text-light-tertiary" size={24} /> },
  ];

  const handleTopicSelect = (topic: string) => {
    let message: string;
    if (topic === 'Hepatitis B') {
      message = "What is Hepatitis B?";
    } else if (topic === 'Screening') {
      message = "How do I screen for Hepatitis B?";
    } else if (topic === 'Vaccination') {
      message = "What are the recommended Hepatitis B vaccination schedules?";
    } else {
      message = "What are the current treatment options for Hepatitis B?";
    }
    sendMessage(message);
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center min-h-screen max-w-screen-sm mx-auto p-2 space-y-8">
        <h2 className="text-black/70 dark:text-white/70 text-3xl font-medium -mt-8">
          Find knowledge and references.
        </h2>
        <EmptyChatMessageInput
          sendMessage={sendMessage}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
        />
        <div className="w-full mt-8">
        <h3 className="text-black/70 font-medium mb-4 text-center">Sample Topics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleTopics.map((topic, index) => (
              <SampleTopicBox
                key={index}
                topic={topic.topic}
                icon={topic.icon}
                onSelect={handleTopicSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
