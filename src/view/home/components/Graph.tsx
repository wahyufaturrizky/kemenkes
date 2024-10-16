"use client";

import { regionOptions, vaccineTypeOptions } from "@/utils/constants";
import styles from "../home.module.css";
import {
  Button,
  GraphComposed,
  GraphEcharts,
  Select,
  Spin,
} from "@/components";
import { useState } from "react";
import { openSans } from "@/assets/fonts";
import { Opts } from "echarts-for-react/lib/types";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

interface GraphRoutineImmunizationCoverageTrendProps {
  title: JSX.Element;
  subTitle: string;
  addOn?: JSX.Element;
  layout?: "horizontal" | "vertical";
  variant?: "public" | "private";
  threshold?: JSX.Element;
  graphOptions?: any;
  opts?: Opts;
  filterState?: any;
  filterComp?: JSX.Element;
  isLoading?: boolean;
}

const GraphRoutineImmunizationCoverageTrend: React.FC<
  GraphRoutineImmunizationCoverageTrendProps
> = ({
  title,
  subTitle,
  addOn,
  variant = "public",
  graphOptions,
  opts,
  filterState,
  threshold,
  filterComp,
  isLoading,
}) => {
    const [filter, setFilter] = filterState || useState({});
    return (
      <>
        {filterComp
          ? filterComp
          : variant === "private" && (
            <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">

              <div className="flex gap-4">
                <div>
                  <Button text="Unduh" variant="outlined" />
                </div>
              </div>
            </div>
          )}
        <div className="font-bold md:text-2xl">{title}</div>
        <div className={`${openSans.className}`}>{subTitle}</div>
        <div>
          <div className="mb-4">{addOn}</div>
          <div className={`flex flex-wrap sm:flex-nowrap gap-4 relative`}>
            <div className="flex-grow">
              <div className="relative flex justify-center items-center">
                {isLoading && <Spin />}
                {graphOptions ? (
                  <div className="w-full h-full overflow-scroll" style={{ minHeight: 550 }} id="graphhhh">
                    <GraphEcharts graphOptions={graphOptions} opts={opts || {}} />
                  </div>
                ) : (
                  <GraphComposed />
                )}
              </div>
            </div>
            {threshold}
          </div>

          {variant === "public" && (
            <div className="flex flex-wrap justify-between items-center gap-4 mt-8 sm:mt-20 md:mt-0">
              <div className="flex gap-4">
                <div>
                  <Select
                    options={options}
                    onChange={(e) => { }}
                    value={{ value: "vanilla", label: "Vanilla" }}
                  />
                </div>
                <div>
                  <Select
                    options={options}
                    onChange={(e) => { }}
                    value={{ value: "vanilla", label: "Vanilla" }}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Button text="Unduh" variant="outlined" />
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

export default GraphRoutineImmunizationCoverageTrend;
