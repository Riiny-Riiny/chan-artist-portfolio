import React from 'react';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

const Prose: React.FC<ProseProps> = ({ children, className = '' }) => {
  return (
    <div className={`prose prose-invert prose-lg max-w-none prose-p:text-white prose-headings:text-white prose-a:text-white prose-strong:text-white ${className}`}>
      {children}
    </div>
  );
};

export default Prose; 