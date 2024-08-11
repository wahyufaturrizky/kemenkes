import { FiArrowDownCircle } from "react-icons/fi";

interface DownloadButtonProps {
  text: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ text }) => {
  return (
    <button className="px-2 py-1 border flex gap-1 items-center border-[#00B1A9] text-[#00B1A9] rounded-md">
      <FiArrowDownCircle />
      <span className="text-sm font-semibold">{text}</span>
    </button>
  );
};

export default DownloadButton;
