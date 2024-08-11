import { useState, useMemo } from "react";
import { openSans } from "@/assets/fonts";
import { downloadFile } from "@/helpers/hook";
import { Button, Select } from "@/components";
import {
  ageTypeOptions,
  dataMonth,
  genderOptions,
  regionOptions,
  trendTypeOptionsBayi,
  vaccineTypeBabyOptionsNew,
} from "@/utils/constants";

interface FilterProps {
  filterState: any;
  data?: any;
  showFilter?: boolean;
}
export const Filter1: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  const filteredRegionOptions = useMemo(() => {
    if (filter.faskes !== "") {
      return regionOptions.slice(4);
    } else if (filter.kecamatan !== "") {
      return regionOptions.slice(3);
    } else if (filter.kabkota !== "") {
      return regionOptions.slice(2);
    } else if (filter.provinsi !== "") {
      return regionOptions.slice(1);
    } else {
      return regionOptions;
    }
  }, [filter.provinsi, filter.kabkota, filter.kecamatan, filter.faskes]);

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            options={vaccineTypeBabyOptionsNew}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tipe_vaksin1: e ? e.value : "IMUNISASI DASAR LENGKAP",
              });
            }}
            value={
              filter.tipe_vaksin1
                ? vaccineTypeBabyOptionsNew?.find(
                  (f) => f.value === filter.tipe_vaksin1
                )
                : filter.tipe_vaksin1
            }
          />
        </div>
        <div>
          <Select
            options={filteredRegionOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, wilayah1: e ? e.value : "" });
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
        <div
          onClick={async () => {
            const pct = data?.map((r: any) => `${r.percentage.toString()}%`);
            const target = data?.map((r: any) => `${r.threshold.toString()}%`);
            const header = data?.map((r: any) => r.faskes_desc);
            const body = [pct, target];
            const verticalHeader = ["% Target Cakupan", "Target"];
            const fileName = "Grafik Tren Cakupan Daerah Imunisasi Bayi";
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
            options={trendTypeOptionsBayi}
            onChange={(e: any) => {
              setFilter({ ...filter, jenis_tren: e ? e.value : "Kumulatif" });
            }}
            value={
              filter.jenis_tren
                ? trendTypeOptionsBayi?.find(
                  (f) => f.value === filter.jenis_tren
                )
                : filter.jenis_tren
            }
          />
        </div>
        <div>
          <Select
            options={vaccineTypeBabyOptionsNew}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin2: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin2
                ? vaccineTypeBabyOptionsNew?.find(
                  (f) => f.value === filter.tipe_vaksin2
                )
                : filter.tipe_vaksin2
            }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div
          onClick={async () => {
            const pct = data?.map((r: any) => `${r.percentage.toString()}%`);
            const target = data?.map((r: any) => `${r.threshold.toString()}%`);
            const total = data?.map((r: any) => `${r.total.toString()}`);
            const header = dataMonth?.map((r) => r.label);
            const body = [pct, target, total];
            const verticalHeader = [
              "% Cakupan",
              "% Target Cakupan",
              "Jumlah Penerima Imunisasi",
            ];
            const fileName =
              "Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi Bayi";
            await downloadFile({
              header,
              body,
              verticalHeader,
              fileName,
            });
          }}
        >
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
            options={vaccineTypeBabyOptionsNew}
            onChange={(e: any) => {
              setFilter({ ...filter, tipe_vaksin3: e ? e.value : "All" });
            }}
            value={
              filter.tipe_vaksin3
                ? vaccineTypeBabyOptionsNew?.find(
                  (f) => f.value === filter.tipe_vaksin3
                )
                : filter.tipe_vaksin3
            }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div
          onClick={async () => {
            const pct = data?.map((r: any) => `${r.pct.toString()}%`);
            const target = data?.map((r: any) => `${r.threshold.toString()}%`);
            const total = data?.map((r: any) => `${r.ytd_total.toString()}`);
            const header = data?.map((r: any) => r.vaccine_name);
            const body = [pct, target, total];
            const verticalHeader = [
              "% Cakupan",
              "% Target Cakupan",
              "Jumlah Penerima Imunisasi",
            ];
            const fileName =
              "Grafik Cakupan Imunisasi Bayi berdasarkan Jenis Imunisasi";
            await downloadFile({
              header,
              body,
              verticalHeader,
              fileName,
            });
          }}
        >
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter4: React.FC<FilterProps> = ({ filterState, data, showFilter }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      {showFilter ?? (
        <div className="flex gap-4">
          <div>
            <Select
              options={vaccineTypeBabyOptionsNew}
              onChange={(e: any) => {
                setFilter({
                  ...filter,
                  tipe_vaksin4: e ? e.value : "IMUNISASI DASAR LENGKAP",
                });
              }}
              value={
                filter.tipe_vaksin3
                  ? vaccineTypeBabyOptionsNew?.find(
                    (f) => f.value === filter.tipe_vaksin4
                  )
                  : filter.tipe_vaksin3
              }
            />
          </div>
        </div>
      )}
      {showFilter ? (
        <div className="flex gap-4">
          <div
            onClick={async () => {
              const ideal = data?.map((r: any) => `${r.pct_ideal.toString()}%`);
              const non_ideal = data?.map(
                (r: any) => `${r.pct_non_ideal.toString()}%`
              );
              const header = data?.map((r: any) => r.vaccine_name);
              const body = [ideal, non_ideal];
              const verticalHeader = ["Usia Ideal", "Usia Non Ideal"];
              const fileName =
                "Grafik Cakupan Imunisasi pada Bayi berdasarkan Usia Pemberian Imunisasi";
              await downloadFile({
                header,
                body,
                verticalHeader,
                fileName,
              });
            }}
          >
            <Button text="Unduh" variant="outlined" />
          </div>

        </div>
      ) : (
        <div className="flex justify-end w-full gap-4">
          <div
            onClick={async () => {
              const ideal = data?.map((r: any) => `${r.pct_ideal.toString()}%`);
              const non_ideal = data?.map(
                (r: any) => `${r.pct_non_ideal.toString()}%`
              );
              const header = data?.map((r: any) => r.vaccine_name);
              const body = [ideal, non_ideal];
              const verticalHeader = ["Usia Ideal", "Usia Non Ideal"];
              const fileName =
                "Grafik Cakupan Imunisasi pada Bayi berdasarkan Usia Pemberian Imunisasi";
              await downloadFile({
                header,
                body,
                verticalHeader,
                fileName,
              });
            }}
          >
            <Button text="Unduh" variant="outlined" />
          </div>

        </div>
      )}
    </div>
  );
};
export const Filter5: React.FC<FilterProps> = ({ filterState, data, showFilter }) => {
  const [filter, setFilter] = filterState || useState({});
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      {showFilter ?? (
        <div className="flex gap-4">
          <div>
            <Select
              options={vaccineTypeBabyOptionsNew}
              onChange={(e: any) => {
                setFilter({
                  ...filter,
                  tipe_vaksin5: e ? e.value : "IMUNISASI DASAR LENGKAP",
                });
              }}
              value={
                filter.tipe_vaksin5
                  ? vaccineTypeBabyOptionsNew?.find(
                    (f) => f.value === filter.tipe_vaksin5
                  )
                  : filter.tipe_vaksin5
              }
            />
          </div>
        </div>
      )}
      {showFilter ? (
        <div className="flex gap-4">
          <div
            onClick={async () => {
              const male = data?.map((r: any) => `${r.pct_male.toString()}%`);
              const female = data?.map((r: any) => `${r.pct_female.toString()}%`);
              const header = data?.map((r: any) => r.vaccine_name);
              const body = [male, female];
              const verticalHeader = ["Laki-laki", "Perempuan"];
              const fileName =
                "Grafik Distribusi Imunisasi pada Bayi Berdasarkan Jenis Kelamin";
              await downloadFile({
                header,
                body,
                verticalHeader,
                fileName,
              });
            }}
          >
            <Button text="Unduh" variant="outlined" />
          </div>

        </div>
      ) : (
        <div className="flex justify-end w-full gap-4">
          <div
            onClick={async () => {
              const male = data?.map((r: any) => `${r.pct_male.toString()}%`);
              const female = data?.map((r: any) => `${r.pct_female.toString()}%`);
              const header = data?.map((r: any) => r.vaccine_name);
              const body = [male, female];
              const verticalHeader = ["Laki-laki", "Perempuan"];
              const fileName =
                "Grafik Distribusi Imunisasi pada Bayi Berdasarkan Jenis Kelamin";
              await downloadFile({
                header,
                body,
                verticalHeader,
                fileName,
              });
            }}
          >
            <Button text="Unduh" variant="outlined" />
          </div>

        </div>
      )}
    </div>
  );
};
