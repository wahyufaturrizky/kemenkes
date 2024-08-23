"use client";

import { Spin } from "@/components";
import { formatNumber } from "@/helpers";
import { cn } from "@/utils/cn";
import { Line } from "rc-progress";
import { AiFillExclamationCircle } from "react-icons/ai";

export interface ChildSummaryImmunizationProps {
  title: string | JSX.Element;
  value: string;
  subtitle?: string;
  total?: number;
  target?: number | string;
  className?: string;
  classNameTitle?: string;
  classNameValue?: string;
  titleIcon?: JSX.Element;
  contentTooltip?: JSX.Element;
  background?: string;
  showLine?: boolean;
}

const ChildSummaryImmunizationZeroDose: React.FC<
  ChildSummaryImmunizationProps
> = ({
  title,
  value,
  subtitle,
  total,
  target,
  className,
  classNameTitle,
  classNameValue,
  titleIcon,
  contentTooltip,
  background,
  showLine = true,
}) => {
  return (
    <div
      className={`relative group flex flex-col gap-2 py-4 ${className} ${
        className?.includes("public") ? "h-fit" : "h-full"
      } w-full`}
      style={{
        background: background ? background : "#FEFAFF",
        borderColor: total ? "#F6D0FE" : "",
      }}
    >
      {contentTooltip && (
        <div className="group-hover:block bottom-full left-1/2 absolute hidden bg-gray-700 shadow-lg mb-2 p-2 rounded text-sm text-white transform -translate-x-1/2">
          {contentTooltip}
        </div>
      )}
      <div>
        <div
          className={cn(
            `flex items-center gap-1 font-bold ${classNameTitle} ${
              contentTooltip ? "justify-between" : ""
            }`
          )}
        >
          {titleIcon && <div>{titleIcon}</div>}
          <div style={{ color: "#424242" }}>{title}</div>
          {contentTooltip && <AiFillExclamationCircle color="#1C272D" />}
        </div>
        <div
          className={cn(
            `text-2xl text-support-b2 py-2 ${classNameValue} mt-12`
          )}
          style={{ color: "#424242" }}
        >
          {value}
        </div>
        <div>
          {total && (
            <>
              <div style={{ color: "#424242" }}>
                {formatNumber(total || 0)} {subtitle} {target}
              </div>
              {showLine && (
                <Line
                  percent={total}
                  strokeWidth={5}
                  strokeColor={"#00B1A9"}
                  trailColor="#83E0DB"
                  trailWidth={5}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildSummaryImmunizationZeroDose;
