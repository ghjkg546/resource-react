// TipMessage.tsx
import React from 'react';

type TipMessageType = 'info' | 'success' | 'warning' | 'error';

interface TipMessageProps {
  message: string;
  type?: TipMessageType;
}

const TipMessage: React.FC<TipMessageProps> = ({ message, type = 'info' }) => {
  // Define different styles based on the type of message
  const getStyle = (): string => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 border-l-4 p-4 rounded-md shadow-lg ${getStyle()}`}
    style={{ zIndex: 1000 }}>
      <p>{message}</p>
    </div>
  );
};

export default TipMessage;
