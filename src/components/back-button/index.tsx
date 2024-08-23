import React from "react";
import { IoMdArrowBack } from "react-icons/io";

interface BackButtonProps {
  label: string;
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="bg-primary flex h-9 rounded-[50px] justify-center items-center px-3 whitespace-nowrap cursor-pointer"
      onClick={onClick}
    >
      <IoMdArrowBack size={25} color="white" />
      <p className="text-white font-semibold">{label}</p>
    </button>
  );
};

export default BackButton;
