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
        size === "l"
          ? "p-5"
          : size === "m" || size === "s"
          ? "p-3"
          : "py-3 px-0"
      } text-white flex flex-col justify-between font-bold ${styles} relative`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin />
        </div>
      )}
      <p
        className={
          size === "xxs" ? "text-sm" : size === "xs" ? "text-xl" : "text-2xl"
        }
        style={{
          // whiteSpace: size === "s" ? "nowrap" : "normal",
          whiteSpace: size !== "m" && size !== "l" ? "nowrap" : "normal",
          overflow: size !== "m" && size !== "l" ? "hidden" : "visible",
          textOverflow: size !== "m" && size !== "l" ? "ellipsis" : "clip",
        }}
      >
        {title}
      </p>
      <div
        className={`flex justify-between items-end flex-wrap ${
          size === "xs" || size === "xxs" ? "items-center" : ""
        }`}
      >
        <p
          className={
            size === "l"
              ? "text-3xl"
              : size === "m"
              ? "text-xl"
              : size === "s"
              ? "text-base"
              : "text-xs"
          }
        >
          {value}
        </p>
        <p
          className={
            size === "l"
              ? "text-5xl"
              : size === "xxs"
              ? "text-sm"
              : size === "xs"
              ? "text-lg"
              : "text-3xl"
          }
        >
          {pct}
        </p>
      </div>
    </div>
  );
};

export default Card8Disease;
