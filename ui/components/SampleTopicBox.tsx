// SampleTopicBox.tsx
import React from 'react';

interface SampleTopicBoxProps {
  topic: string;
  icon: React.ReactNode;
  onSelect: (topic: string) => void;
}

const SampleTopicBox: React.FC<SampleTopicBoxProps> = ({ topic, icon, onSelect }) => (
  <button
    onClick={() => onSelect(topic)}
    className="flex flex-col items-center justify-center p-4 bg-light-100 border-2 border-transparent hover:border-light-200 rounded-lg transition-colors"
  >
    {icon}
    <span className="mt-2 text-sm text-light-tertiary">{topic}</span>
  </button>
);

export default SampleTopicBox;