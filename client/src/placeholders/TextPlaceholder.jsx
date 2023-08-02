import React from "react";

const TextPlaceholder = ({ className }) => {
  return (
    <div className={`text-xl h-4 bg-gray-500 font-bold mb-2 animate-pulse ${className}`}>
    </div>
  );
};

export default TextPlaceholder;

