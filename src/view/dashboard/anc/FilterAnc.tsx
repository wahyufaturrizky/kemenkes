import { Select } from "@/components";
import { dataMonth, indikatorAnc, subIndikatorAnc } from "@/utils/constants";
import { useState } from "react";

interface FilterProps {
  filterState: any;
}

export const Filter1: React.FC<FilterProps> = ({ filterState }) => {
  const [filter, setFilter] = filterState || useState({});

  return (
    <>
      <div>
        <Select
          placeholder="Pilih Indikator"
          options={indikatorAnc}
          onChange={(e: any) => {
            setFilter({
              ...filter,
              indikator: e ? e.value : "Indikator Program",
            });
          }}
          value={
            filter.indikator
              ? indikatorAnc?.find((f) => f.value === filter.indikator)
              : filter.indikator
          }
        />
      </div>
      <div>
        <Select
          placeholder="Persentase Ibu Hamil K1"
          options={subIndikatorAnc}
          onChange={(e: any) => {
            setFilter({
              ...filter,
              subIndikator: e ? e.value : "Indikator Program",
            });
          }}
          value={
            filter.subIndikator
              ? subIndikatorAnc?.find((f) => f.value === filter.subIndikator)
              : filter.subIndikator
          }
        />
      </div>
    </>
  );
};
