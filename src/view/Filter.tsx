import { useState } from "react";
import { Button, Select } from "@/components";
import {
  ageTypeOptions,
  dataMonths,
  genderOptions,
  regionOptions,
  trendTypeOptions
} from "@/utils/constants";
import { openSans } from "@/assets/fonts";
import { downloadFile } from "@/helpers/hook";
import { useGetListVaccineQuery } from "@/lib/services/public-immunization";

interface FilterProps {
  filterState: any;
  data?: any;
}
export const Filter1: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getListVaccine } = useGetListVaccineQuery({});
  const regionTypeOptions = filter.kecamatan ? regionOptions.filter((r) => r.value === "faskes")
    : filter.kabkota ? regionOptions.filter((r) => r.value === "district" || r.value === "faskes")
      : filter.provinsi ? regionOptions.filter((r) => r.value === "city" || r.value === "district" || r.value === "faskes")
        : regionOptions

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            options={(getListVaccine?.data || [])?.map((r: any) => {
              return {
                label: r?.vaccine_name,
                value: r?.vaccine_id
              }
            })}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin1: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin1
                ? (getListVaccine?.data || [])?.map((r: any) => {
                  return {
                    label: r?.vaccine_name,
                    value: r?.vaccine_id
                  }
                })?.find(
                  (f: any) => f.value === filter.tipe_vaksin1
                )
                : filter.tipe_vaksin1
            }
          />
        </div>
        <div>
          <Select
            options={regionTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, wilayah1: e ? e.value : "All" });
            }}
            value={
              filter.wilayah1
                ? regionTypeOptions?.find((f) => f.value === filter.wilayah1)
                : filter.wilayah1
            }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={async () => {
          const total = data?.map((r: any) => r.total.toString());
          const pct = data?.map((r: any) => r.pct.toString());
          const target = data?.map((r: any) => r.threshold.toString());
          const header = data?.map((r: any) => r.domicile);
          const body = [pct, total, target];
          const verticalHeader = ["% Target Cakupan", "Jumlah Penerima Imunisasi", "Cakupan"];
          const fileName = "Data Kumulatif";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};
export const Filter2: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getListVaccine } = useGetListVaccineQuery({});

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
            options={(getListVaccine?.data || [])?.map((r: any) => {
              return {
                label: r?.vaccine_name,
                value: r?.vaccine_id
              }
            })}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin2: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin2
                ? (getListVaccine?.data || [])?.map((r: any) => {
                  return {
                    label: r?.vaccine_name,
                    value: r?.vaccine_id
                  }
                })?.find(
                  (f: any) => f.value === filter.tipe_vaksin2
                )
                : filter.tipe_vaksin2
            }
            isClearable={false}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={async () => {
          const total = data?.map((r: any) => r.total.toString());
          const pct = data?.map((r: any) => r.pct.toString());
          const target = data?.map((r: any) => r.threshold.toString());
          const header = data?.map((r: any) => r.domicile);
          const body = [pct, total, target];
          const verticalHeader = ["% Target Cakupan", "Jumlah Imunisasi", "Target"];
          const fileName = "Grafik Cakupan";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};