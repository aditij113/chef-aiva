import React from 'react';

interface OptionPillProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionPill: React.FC<OptionPillProps> = ({ label, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors duration-200
        ${isSelected
          ? 'bg-emerald-500 border-emerald-500 text-white'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
        }`}
    >
      {label}
    </button>
  );
};

export default OptionPill;
