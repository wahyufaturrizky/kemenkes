import { useState } from "react";
import { Button, Select } from "@/components";
import {
  ageTypeOptions,
  genderOptions,
  regionOptions,
  trendTypeOptions,
  vaccineTypeOptions,
} from "@/utils/constants";
import { openSans } from "@/assets/fonts";

interface FilterProps {
  filterState: any;
}
export const Filter1: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            options={vaccineTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin1: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin1
                ? vaccineTypeOptions?.find(
                  (f) => f.value === filter.tipe_vaksin1
                )
                : filter.tipe_vaksin1
            }
          />
        </div>
        <div>
          <Select
            options={regionOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, wilayah1: e ? e.value : "All" });
            }}
            value={
              filter.wilayah1
                ? regionOptions?.find((f) => f.value === filter.wilayah1)
                : filter.wilayah1
            }
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
  );
};
export const Filter2: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={trendTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, jenis_tren: e ? e.value : "All" });
            }}
            value={
              filter.jenis_tren
                ? trendTypeOptions?.find((f) => f.value === filter.jenis_tren)
                : filter.jenis_tren
            }
          />
        </div>
        <div>
          <Select
            options={vaccineTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin2: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin2
                ? vaccineTypeOptions?.find(
                  (f) => f.value === filter.tipe_vaksin2
                )
                : filter.tipe_vaksin2
            }
            isClearable={false}
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
  );
};
export const Filter3: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={vaccineTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin3: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin3
                ? vaccineTypeOptions?.find(
                  (f) => f.value === filter.tipe_vaksin3
                )
                : filter.tipe_vaksin3
            }
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
  );
};
export const Filter4: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={vaccineTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin3: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin3
                ? vaccineTypeOptions?.find(
                  (f) => f.value === filter.tipe_vaksin3
                )
                : filter.tipe_vaksin3
            }
          />
        </div>
        <div>
          <Select
            options={ageTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_umur: e ? e.value : "All" });
            }}
            value={
              filter.tipe_umur
                ? ageTypeOptions?.find((f) => f.value === filter.tipe_umur)
                : filter.tipe_umur
            }
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
  );
};
export const Filter5: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={vaccineTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin5: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin5
                ? vaccineTypeOptions?.find(
                  (f) => f.value === filter.tipe_vaksin5
                )
                : filter.tipe_vaksin5
            }
          />
        </div>
        <div>
          <Select
            options={genderOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, jenis_kelamin: e ? e.value : "All" });
            }}
            value={
              filter.jenis_kelamin
                ? genderOptions?.find((f) => f.value === filter.jenis_kelamin)
                : filter.jenis_kelamin
            }
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
  );
};
