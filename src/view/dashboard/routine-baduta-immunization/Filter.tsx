import { useState } from "react";
import { Button, Select } from "@/components";
import {
  ageTypeOptions,
  dataMonths,
  genderOptions,
  regionOptions,
  trendTypeOptions,
  vaccineTypeOptions,
} from "@/utils/constants";
import { openSans } from "@/assets/fonts";
import { downloadFile } from "@/helpers/hook";

interface FilterProps {
  filterState: any;
  data?: any;
  showFilter?: boolean;
}
export const Filter1: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  const regionTypeOptions = filter.kecamatan
    ? regionOptions.filter((r) => r.value === "faskes")
    : filter.kabkota
      ? regionOptions.filter(
        (r) => r.value === "district" || r.value === "faskes"
      )
      : filter.provinsi
        ? regionOptions.filter(
          (r) =>
            r.value === "city" || r.value === "district" || r.value === "faskes"
        )
        : regionOptions;
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            options={vaccineTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin1: e ? e.label : "All" });
            }}
            value={
              filter.tipe_vaksin1
                ? vaccineTypeOptions?.find(
                  (f) => f.label === filter.tipe_vaksin1
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
        <div
          onClick={async () => {
            const pct = data?.map((r: any) => r.percentage.toString());
            const target = data?.map((r: any) => r.threshold.toString());
            const verticalHeader = data?.map((r: any) => r.faskes_desc);
            const body = data?.map((r: any, i: number) => {
              return [pct[i], target[i]]
            });
            const header = ["% Target Cakupan", "Target"];
            const fileName = "Grafik Cakupan";
            await downloadFile({ header, body, verticalHeader, fileName });
          }}
        >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter2: React.FC<FilterProps> = ({ filterState, data }) => {
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
              setFilter({ ...filter, tipe_vaksin2: e ? e.label : "All" });
            }}
            value={
              filter.tipe_vaksin2
                ? vaccineTypeOptions?.find(
                  (f) => f.label === filter.tipe_vaksin2
                )
                : filter.tipe_vaksin2
            }
            isClearable={false}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div
          onClick={async () => {
            const pct = data?.map((r: any) => r.percentage.toString());
            const total = data?.map((r: any) => r.total.toString());
            // const target = data?.map((r: any) => r.threshold.toString());
            const verticalHeader = dataMonths?.map((r) => r.label);
            const body = data?.map((r: any, i: number) => {
              return [total[i], pct[i]]
            });
            const header = [
              "Jumlah Penerima Imunisasi",
              "%Cakupan",
            ];
            const fileName = "Data Kumulatif";
            await downloadFile({ header, body, verticalHeader, fileName });
          }}
        >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter3: React.FC<FilterProps> = ({ filterState, data, showFilter }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      {showFilter ?? (
        <div className="flex gap-4">
          <div>
            <Select
              options={vaccineTypeOptions}
              onChange={(e: any) => {
                setFilter({ ...filter, tipe_vaksin3: e ? e.label : "All" });
              }}
              value={
                filter.tipe_vaksin3
                  ? vaccineTypeOptions?.find(
                    (f) => f.label === filter.tipe_vaksin3
                  )
                  : filter.tipe_vaksin3
              }
            />
          </div>
        </div>
      )}
      {showFilter ? (
        <div className="flex gap-4">
          <div onClick={async () => {
            const pct = data?.map((r: any) => r?.pct.toString())
            const total = data?.map((r: any) => r?.ytd_total.toString())
            // const target = data?.map((r: any) => r?.threshold.toString())
            const verticalHeader = data?.map((r: any) => r?.vaccine_name)
            const body = data?.map((r: any, i: number) => {
              return [pct[i], total[i]]
            });
            const header = ["%Cakupan", "Cakupan"];
            const fileName = "Grafik Cakupan Berdasarkan Jenis Imunisasi";
            await downloadFile({ header, body, verticalHeader, fileName });
          }} >
            <Button text="Unduh" variant="outlined" />
          </div>
        </div>
      ): (
        <div className="flex justify-end w-full gap-4">
          <div onClick={async () => {
            const pct = data?.map((r: any) => r?.pct.toString())
            const total = data?.map((r: any) => r?.ytd_total.toString())
            // const target = data?.map((r: any) => r?.threshold.toString())
            const verticalHeader = data?.map((r: any) => r?.vaccine_name)
            const body = data?.map((r: any, i: number) => {
              return [pct[i], total[i]]
            });
            const header = ["%Cakupan", "Cakupan"];
            const fileName = "Grafik Cakupan Berdasarkan Jenis Imunisasi";
            await downloadFile({ header, body, verticalHeader, fileName });
          }} >
            <Button text="Unduh" variant="outlined" />
          </div>
        </div>
      )}
    </div>
  );
};
export const Filter4: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={vaccineTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin4: e ? e.label : "All" });
            }}
            value={
              filter.tipe_vaksin4
                ? vaccineTypeOptions?.find(
                  (f) => f.label === filter.tipe_vaksin4
                )
                : filter.tipe_vaksin4
            }
          />
        </div>
        {/* <div>
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
        </div> */}
      </div>
      <div className="flex gap-4">
        <div onClick={async () => {
          const ideal = data?.map((r: any) => r.ytd_ideal.toString());
          const nonIdeal = data?.map((r: any) => r.ytd_non_ideal.toString());
          const verticalHeader = data?.map((r: any) => r.vaccine_name.toString());
          const body = data?.map((r: any, i: number) => {
            return [ideal[i], nonIdeal[i]]
          });
          const header = ["Ideal", "Non Ideal"];
          const fileName = "Grafik Cakupan Berdasarkan Usia";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter5: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
      </div>
      <div className="flex gap-4">
        <div onClick={async () => {
          const male = data?.map((r: any) => r.ytd_male.toString());
          const female = data?.map((r: any) => r.ytd_female.toString());
          const verticalHeader = data?.map((r: any) => r.vaccine_name);
          const body = data?.map((r: any, i: number) => {
            return [male[i], female[i]]
          });
          const header = ["Laki-laki", "Perempuan"];
          const fileName = "Grafik Cakupan Berdasarkan Jenis Kelamin";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
