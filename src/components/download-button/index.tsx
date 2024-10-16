import React, { useState } from "react";
import { FiArrowDownCircle, FiChevronDown } from "react-icons/fi";

interface DownloadOption {
  label: string;
  onClick: () => void;
}

interface DownloadButtonProps {
  text?: string;
  isDropdown?: boolean;
  options?: DownloadOption[];
  onClick?: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  text = "",
  isDropdown = false,
  options = [],
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isDropdown) {
      setIsOpen(!isOpen);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className="px-2 py-1 border flex gap-1 items-center border-[#00B1A9] text-[#00B1A9] rounded-md hover:bg-[#00B1A9] hover:text-white transition-colors"
      >
        <FiArrowDownCircle />
        <span className="text-sm font-semibold">{text}</span>
        {isDropdown && (
          <FiChevronDown className={`ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        )}
      </button>

      {isDropdown && isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.onClick();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
