"use client";

import { formatNumber } from "@/helpers";
import { cn } from "@/utils/cn";
import { Line } from "rc-progress";
import { AiFillExclamationCircle } from "react-icons/ai";

export interface ChildSummaryImmunizationProps {
  title: string;
  value: string;
  subtitle?: string;
  percent?: number;
  target?: number | string;
  className?: string;
  classNameTitle?: string;
  classNameValue?: string;
  titleIcon?: JSX.Element;
  contentTooltip?: JSX.Element;
  background?: string;
  showLine?: boolean;
}

const ChildSummaryImmunization: React.FC<ChildSummaryImmunizationProps> = ({
  title,
  value,
  subtitle,
  percent,
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
      className={`flex flex-col gap-2 justify-between py-4 ${className}`}
      style={{
        background: background ? background : "#FEFAFF",
        borderColor: percent ? "#F6D0FE" : "",
      }}
    >
      <div>
        <div
          className={cn(
            `flex items-center gap-1 font-bold ${classNameTitle} ${contentTooltip ? "justify-between" : ""
            }`
          )}
        >
          {titleIcon && <div>{titleIcon}</div>}
          <div>{title}</div>
          {contentTooltip && <AiFillExclamationCircle color="#1C272D" />}
        </div>
        <div className={cn(`text-2xl text-support-b2 py-2 ${classNameValue}`)}>
          {value}
        </div>
      </div>
      <div>
        {percent && (
          <>
            <div>
              {formatNumber(percent || 0)}% {subtitle} {target}
            </div>
            {showLine && (
              <Line
                percent={percent}
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
  );
};

export default ChildSummaryImmunization;
