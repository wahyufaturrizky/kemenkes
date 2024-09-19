import { formatNumber } from "@/helpers";
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface DataSection {
  color: string;
  label: string;
  value: number;
  percentage: number;
}

interface TooltipState {
  visible: boolean;
  content: string;
  position: number;
}

interface ProgressProps {
  data: any;
  styles?: string;
  title?: any; // Sudah ada prop title untuk judul
}

const Progress: React.FC<ProgressProps> = ({ data, styles, title }) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    content: "",
    position: 0,
  });

  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (
    data: DataSection,
    event: MouseEvent<HTMLDivElement>
  ) => {
    const tooltipContent = `${data.label}: ${formatNumber(
      data.value
    )} (${formatNumber(data.percentage)}%)`;

    if (progressBarRef.current) {
      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const offset = event.clientX - progressBarRect.left;

      setTooltip({
        visible: true,
        content: tooltipContent,
        position: offset,
      });
    }
  };

  const handleDocumentClick = (event: Event) => {
    if (
      (event.target as HTMLElement).closest(".progress-bar-container") === null
    ) {
      setTooltip({ visible: false, content: "", position: 0 });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick as EventListener);

    return () => {
      document.removeEventListener(
        "click",
        handleDocumentClick as EventListener
      );
    };
  }, []);

  const dataSections: DataSection[] = data;

  return (
    <div
      style={{ position: "relative" }}
      className={`progress-bar-container ${styles}`}
    >
      {title && (
        <div className="font-bold text-[#505581] flex items-center">
          <p className="mr-1">{title}</p>
          <IoMdInformationCircleOutline size={20} color="#00B1A9" />
        </div>
      )}
      <div
        style={{ display: "flex", alignItems: "center" }}
        ref={progressBarRef}
      >
        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#eee",
            borderRadius: "5px",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {dataSections?.map((section, index) => (
            <div
              key={index}
              style={{
                width: `${section.percentage}%`,
                backgroundColor: section.color,
                cursor: "pointer",
              }}
              onClick={(e) => handleClick(section, e)}
            />
          ))}
        </div>
      </div>
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: tooltip.position,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {tooltip.content}
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              width: "0",
              height: "0",
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid rgba(0, 0, 0, 0.7)",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Progress;
