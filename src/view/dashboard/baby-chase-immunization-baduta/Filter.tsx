import { useState } from "react";
import { Button, Select } from "@/components";
import {
  ageTypeOptions,
  dataMonths,
  genderOptions,
  regionOptions,
  trendTypeOptions,
  vaccineTypeKejarOptions,
} from "@/utils/constants";
import { openSans } from "@/assets/fonts";
import { downloadFile } from "@/helpers/hook";

interface FilterProps {
  filterState: any;
  data: any;
}
export const Filter1: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  const regionTypeOptions = filter.kecamatan ? regionOptions.filter((r) => r.value === "faskes")
    : filter.kabkota ? regionOptions.filter((r) => r.value === "district" || r.value === "faskes")
      : filter.provinsi ? regionOptions.filter((r) => r.value === "city" || r.value === "district" || r.value === "faskes")
        : regionOptions
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            options={vaccineTypeKejarOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin1: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin1
                ? vaccineTypeKejarOptions?.find(
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
        <div onClick={async () => {
          // const pct = data?.map((r: any) => r.percentage.toString());
          // const target = data?.map((r: any) => r.threshold.toString());
          const total = data?.map((r: any) => r.total.toString());
          const header = data?.map((r: any) => r.faskes_desc);
          const body = [total];
          const verticalHeader = ["Total"];
          const fileName = "Grafik Cakupan";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
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
              setFilter({ ...filter, jenis_tren1: e ? e.value : "All" });
            }}
            value={
              filter.jenis_tren1
                ? trendTypeOptions?.find((f) => f.value === filter.jenis_tren1)
                : filter.jenis_tren1
            }
          />
        </div>
        <div>
          <Select
            options={vaccineTypeKejarOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin2: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin2
                ? vaccineTypeKejarOptions?.find(
                  (f) => f.label === filter.tipe_vaksin2
                )
                : filter.tipe_vaksin2
            }
            isClearable={false}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={async () => {
          const total = data?.map((r: any) => (r.pyd_kejar || 0).toString());
          const header = data?.map((r: any) => r?.vaccine_name)
          const body = [total];
          const verticalHeader = ["Cakupan"];
          const fileName = "Grafik Cakupan Berdasarkan Jenis Imunisasi";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter3: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={vaccineTypeKejarOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin3: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin3
                ? vaccineTypeKejarOptions?.find(
                  (f) => f.label === filter.tipe_vaksin3
                )
                : filter.tipe_vaksin3
            }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={async () => {
          const ideal = data?.map((r: any) => (r.pct_kejar || 0).toString());
          const nonIdeal = data?.map((r: any) => (r.pct_non_kejar || 0).toString());
          const header = data?.map((r: any) => r.vaccine_name);
          const body = [ideal, nonIdeal];
          const verticalHeader = ["Ideal", "Non Ideal"];
          const fileName = "Grafik Perbandingan Imunisasi Kejar Terhadap Imunisasi Ideal";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
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
            options={vaccineTypeKejarOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin4: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin4
                ? vaccineTypeKejarOptions?.find(
                  (f) => f.label === filter.tipe_vaksin4
                )
                : filter.tipe_vaksin4
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
        <div onClick={async () => {
          const data12 = data?.map((r: any) => (r.pct_1_2 || 0).toString());
          const data23 = data?.map((r: any) => (r.pct_2_3 || 0).toString());
          const data34 = data?.map((r: any) => (r.pct_3_4 || 0).toString());
          const data45 = data?.map((r: any) => (r.pct_4_5 || 0).toString());
          const header = data?.map((r: any) => r.vaccine_name);
          const body = [data12, data23, data34, data45];
          const verticalHeader = ["Usia 1-2 Tahun", "Usia 2-3 Tahun", "Usia 3-4 Tahun", "Usia 4-5 Tahun"];
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
        <div>
          <Select
            options={vaccineTypeKejarOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin5: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin5
                ? vaccineTypeKejarOptions?.find(
                  (f) => f.label === filter.tipe_vaksin5
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
        <div onClick={async () => {
          const male = data?.map((r: any) => (r.pct_male || 0).toString());
          const female = data?.map((r: any) => (r.pct_female || 0).toString());
          const header = data?.map((r: any) => r.vaccine_name);
          const body = [male, female];
          const verticalHeader = ["Laki-laki", "Perempuan"];
          const fileName = "Grafik Cakupan Berdasarkan Jenis Kelamin";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter6: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={trendTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, jenis_tren2: e ? e.value : "All" });
            }}
            value={
              filter.jenis_tren2
                ? trendTypeOptions?.find((f) => f.value === filter.jenis_tren2)
                : filter.jenis_tren2
            }
          />
        </div>
        <div>
          <Select
            options={vaccineTypeKejarOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin6: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin6
                ? vaccineTypeKejarOptions?.find(
                  (f) => f.label === filter.tipe_vaksin6
                )
                : filter.tipe_vaksin6
            }
            isClearable={false}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={async () => {
          const total = data?.map((r: any) => r.total.toString());
          const header = dataMonths?.map((r) => r.label);
          const body = [total];
          const verticalHeader = ["Total"];
          const fileName = "Grafik Distribusi Imunisasi pada Bayi dan Baduta Berdasarkan Waktu";
          await downloadFile({ header, body, verticalHeader, fileName });
        }} >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
