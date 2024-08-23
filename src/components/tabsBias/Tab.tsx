import React from "react";

interface TabProps {
  text: string;
  value?: number;
  active?: boolean;
  variant?: string;
  handleClick?: () => void;
  isDisabled?: boolean;
}

const Tab: React.FC<TabProps> = ({
  text,
  value,
  active,
  variant,
  handleClick,
  isDisabled,
}) => {
  return (
    <button
      className={`tab ${variant} ${active ? "active" : ""}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export { Tab };
