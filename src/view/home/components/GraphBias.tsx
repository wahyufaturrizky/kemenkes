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

const GraphRoutineImmunizationCoverageTrendBias: React.FC<
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
              {/* <div className="flex gap-4">
            <div>
              <Select
                options={vaccineTypeOptions}
                onChange={(e: any) => {
                  setFilter({ ...filter, tipe_vaksin: e ? e.value : "All" })
                }}
                value={filter.tipe_vaksin ?
                  vaccineTypeOptions
                    ?.find((f) => f.value === filter.tipe_vaksin)
                  : filter.tipe_vaksin}
              />
            </div>
            <div>
              <Select
                options={regionOptions}
                onChange={(e: any) => { setFilter({ ...filter, wilayah: e ? e.value : "All" }) }}
                value={filter.wilayah ?
                  vaccineTypeOptions
                    ?.find((f) => f.value === filter.wilayah)
                  : filter.wilayah}
              />
            </div>
          </div> */}
              <div className="flex gap-4">
                <div>
                  <Button text="Unduh" variant="outlined" />
                </div>
                {/* <div>
              <Button text="Laporkan" variant="outlined" />
            </div> */}
              </div>
            </div>
          )}
      <div className="font-bold md:text-2xl">{title}</div>
      <div className={`${openSans.className}`}>{subTitle}</div>
      <div>
        <div className="mt-4">{addOn}</div>
        <div>
          {threshold}
          <div className="flex-grow">
            <div className="relative flex justify-center items-center">
              {isLoading && <Spin />}
              {graphOptions ? (
                <div className="w-full h-full overflow-scroll" id="graphhhh">
                  <GraphEcharts graphOptions={graphOptions} opts={opts || {}} />
                </div>
              ) : (
                <GraphComposed />
              )}
            </div>
          </div>
        </div>
        {variant === "public" && (
          <div className="flex flex-wrap justify-between items-center gap-4 mt-8 sm:mt-20 md:mt-0">
            <div className="flex gap-4">
              <div>
                <Select
                  options={options}
                  onChange={(e) => {}}
                  value={{ value: "vanilla", label: "Vanilla" }}
                />
              </div>
              <div>
                <Select
                  options={options}
                  onChange={(e) => {}}
                  value={{ value: "vanilla", label: "Vanilla" }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <Button text="Unduh" variant="outlined" />
              </div>
              {/* <div>
                <Button text="Laporkan" variant="outlined" />
              </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GraphRoutineImmunizationCoverageTrendBias;
