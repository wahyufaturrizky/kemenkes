import React from "react";
import { Spin } from "@/components";

interface card {
  title: string;
  value: string;
  pct: string;
  styles: string;
  size: string;
  isLoading?: boolean;
}

const Card8Disease: React.FC<card> = ({
  title,
  value,
  pct,
  styles,
  size,
  isLoading,
}) => {
  return (
    <div
      className={`${
        size === "l" ? "p-5" : "p-3"
      } text-white flex flex-col justify-between font-bold ${styles} relative`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin />
        </div>
      )}
      <p
        className="text-2xl"
        style={{
          whiteSpace: size === "s" ? "nowrap" : "normal",
          overflow: size === "s" ? "hidden" : "visible",
          textOverflow: size === "s" ? "ellipsis" : "clip",
        }}
      >
        {title}
      </p>
      <div className="flex justify-between items-end">
        <p
          className={
            size === "l" ? "text-3xl" : size === "m" ? "text-xl" : "text-base"
          }
        >
          {value}
        </p>
        <p className={size === "l" ? "text-5xl" : "text-3xl"}>{pct}</p>
      </div>
    </div>
  );
};

export default Card8Disease;
