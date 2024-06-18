import { useState } from "react";
import { Button, Select } from "@/components";
import { API_URL } from "@/helpers/config";
import { dataMonth } from "@/utils/constants";
import { downloadFile } from "@/helpers/downloadFile";
import {
  ageTypeOptions,
  genderOptions,
  regionOptions,
  trendTypeOptions,
  vaccineTypeOptions,
  regionOptionsBias,
} from "@/utils/constants";
import { openSans } from "@/assets/fonts";
import { standardOptions } from "@/helpers";

import {
  useGetJenisStatusListQuery,
  useGetWomencategoryQuery,
} from "@/lib/services/filter-wus";
import { useGetListVaccineQuery } from "@/lib/services/bias";

interface FilterProps {
  filterState: any;
  dataBias: any;
}

function formatNumberString(numStr: string) {
  // Mengganti koma dengan titik untuk format desimal
  numStr = numStr.replace(",", ".");

  // Mengonversi string ke angka
  let num = parseFloat(numStr);

  // Mengecek apakah hasil konversi adalah bilangan yang valid
  if (isNaN(num)) {
    throw new Error("Input is not a valid number");
  }

  // Menggunakan toFixed(2) untuk membatasi angka desimal menjadi 2 digit
  let formattedNum = num.toFixed(2);

  // Mengganti titik kembali dengan koma jika diperlukan
  formattedNum = formattedNum.replace(".", ",");

  return formattedNum;
}
export const Filter1: React.FC<FilterProps> = ({ filterState, dataBias }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisStatusList } = useGetJenisStatusListQuery({});
  const { data: getjenisVaksin } = useGetListVaccineQuery({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});

  const header = dataBias?.map((r: any) => r.faskes);
  // const faskes = dataBias?.map((r: any) => r.faskes);
  const persentase = dataBias?.map(
    (r: any) => `${r.pct?.toFixed(2).replace(".", ",")} %`
  );
  const threshold = dataBias?.map((r: any) => `${r.threshold} %`);
  const total = dataBias?.map((r: any) => r.ytd.toString());

  const handleDownload = () => {
    downloadFile(
      header,
      [persentase, threshold, total],
      ["Persentasi", "Target Cakupan", "Total"],
      "Tren Cakupan Daerah Imunisasi BIAS"
    );
  };

  // const downloadFile2 = async () => {
  //   const url = `${API_URL}/v1/csv/download`;
  //   let fileName = "Tren Cakupan Daerah Imunisasi BIAS";
  //   const data = {
  //     header: dataBias?.map((r: any) => r.faskes_desc),
  //     body: [faskes, persentase, threshold, total],
  //     verticalHeader: ["Faskes", "Presentasi", "Threshold", "Total"],
  //     fileName,
  //     title: fileName,
  //   };
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const blob = await response.blob();

  //     const downloadUrl = window.URL.createObjectURL(blob);

  //     const a = document.createElement("a");
  //     a.href = downloadUrl;
  //     a.download = `${data.fileName}.xlsx`;

  //     document.body.appendChild(a);

  //     a.click();

  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(downloadUrl);
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   }
  // };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            placeholder="Jenis Vaksin"
            options={standardOptions(
              getjenisVaksin?.data || [],
              "vaccine_name",
              "vaccine_id"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tipe_vaksin: e?.value ?? "bias",
                nama_vaksin: e?.label ?? "BIAS  Lengkap",
              });
            }}
            value={
              filter.tipe_vaksin
                ? standardOptions(
                    getjenisVaksin?.data || [],
                    "vaccine_name",
                    "vaccine_id"
                  )?.find((f) => f.value === filter.tipe_vaksin)
                : filter.tipe_vaksin
            }
            // isDisabled={!filter.bulan}
          />
        </div>
        <div>
          <Select
            placeholder="Kewilayahan"
            options={regionOptionsBias}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                wilayah2: e ? e.value.toUpperCase() : "PROVINSI",
                wilayah_name: e ? e.label : "PROVINSI",
              });
            }}
            value={
              filter.wilayah2
                ? regionOptionsBias?.find((f) => f.value === filter.wilayah2)
                : filter.wilayah2
            }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={handleDownload}>
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};
export const Filter2: React.FC<FilterProps> = ({ filterState, dataBias }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisVaksin } = useGetListVaccineQuery({});

  const header = dataMonth?.map((r) => r.label);
  // const faskes = dataBias?.map((r: any) => r.faskes);
  const target = dataBias?.map(
    (r: any) => `${formatNumberString(r.target_cakupan)} %`
  );
  const cakupan = dataBias?.map(
    (r: any) => `${r.cakupan.toFixed(2).replace(".", ",")} %`
  );
  const total = dataBias?.map((r: any) => r.jumlah_penerima?.toString());

  const handleDownload = () => {
    downloadFile(
      header,
      [target, cakupan, total],
      ["Target Cakupan", "Cakupan", "Total Penerima"],
      "Tren Cakupan Kumulatif atau Bulanan penerima Imunisasi BIAS"
    );
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            options={trendTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tren_type: e ? e.value : "kumulatif" });
            }}
            value={
              filter.tren_type
                ? trendTypeOptions?.find((f) => f.value === filter.tren_type)
                : filter.tren_type
            }
          />
        </div>
        <div>
          <Select
            placeholder="Jenis Vaksin"
            options={standardOptions(
              getjenisVaksin?.data || [],
              "vaccine_name",
              "vaccine_id"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tipe_vaksin2: e?.value ?? "bias",
                nama_vaksin: e?.label ?? "BIAS  Lengkap",
              });
            }}
            value={
              filter.tipe_vaksin2
                ? standardOptions(
                    getjenisVaksin?.data || [],
                    "vaccine_name",
                    "vaccine_id"
                  )?.find((f) => f.value === filter.tipe_vaksin2)
                : filter.tipe_vaksin2
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={handleDownload}>
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};
export const Filter3: React.FC<FilterProps> = ({ filterState, dataBias }) => {
  const header = dataBias?.map((r: any) => r.vaccine.toUpperCase());
  const pct = dataBias?.map(
    (r: any) => `${r.pct?.toFixed(2).replace(".", ",")} %`
  );
  const thrs = dataBias?.map((r: any) => `${r.thrs} %`);
  const total = dataBias?.map((r: any) => r.ytd?.toString());

  const handleDownload = () => {
    downloadFile(
      header,
      [pct, thrs, total],
      ["% Cakupan", "% Target Cakupan", "Cakupan"],
      "Imunisasi pada Anak Usia Sekolah"
    );
  };
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisVaksin } = useGetListVaccineQuery({});

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            placeholder="Jenis Vaksin"
            options={standardOptions(
              getjenisVaksin?.data || [],
              "vaccine_name",
              "vaccine_id"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tipe_vaksin3: e?.value ?? "bias",
              });
            }}
            value={
              filter.tipe_vaksin3
                ? standardOptions(
                    getjenisVaksin?.data || [],
                    "vaccine_name",
                    "vaccine_id"
                  )?.find((f) => f.value === filter.tipe_vaksin3)
                : filter.tipe_vaksin3
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={handleDownload}>
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};
export const Filter4: React.FC<FilterProps> = ({ filterState, dataBias }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisVaksin } = useGetListVaccineQuery({});

  const header = dataBias?.map((r: any) => r.name.toUpperCase());
  const ideal = dataBias?.map((r: any) => `${r.ideal} %`);
  const non_ideal = dataBias?.map((r: any) => `${r.non_ideal} %`);

  const handleDownload = () => {
    downloadFile(
      header,
      [ideal, non_ideal],
      ["Usia Ideal", "Usia Non Ideal"],
      "Cakupan Imunisasi berdasarkan Usia Pemberian Imunisasi"
    );
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            placeholder="Jenis Vaksin"
            options={standardOptions(
              getjenisVaksin?.data || [],
              "vaccine_name",
              "vaccine_id"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tipe_vaksin4: e?.value ?? "bias",
              });
            }}
            value={
              filter.tipe_vaksin4
                ? standardOptions(
                    getjenisVaksin?.data || [],
                    "vaccine_name",
                    "vaccine_id"
                  )?.find((f) => f.value === filter.tipe_vaksin4)
                : filter.tipe_vaksin4
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={handleDownload}>
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};
export const Filter5: React.FC<FilterProps> = ({ filterState, dataBias }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisVaksin } = useGetListVaccineQuery({});

  const header = dataBias?.map((r: any) => r.name.toUpperCase());
  const male = dataBias?.map(
    (r: any) => `${r.male?.toFixed(2).replace(".", ",")} %`
  );
  const female = dataBias?.map(
    (r: any) => `${r.female?.toFixed(2).replace(".", ",")} %`
  );

  const handleDownload = () => {
    downloadFile(
      header,
      [male, female],
      ["Laki-laki", "Perempuan"],
      "Distribusi Imunisasi pada Anak Usia Sekolah berdasarkan Jenis Kelamin"
    );
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className="flex gap-4">
        <div>
          <Select
            placeholder="Jenis Vaksin"
            options={standardOptions(
              getjenisVaksin?.data || [],
              "vaccine_name",
              "vaccine_id"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                tipe_vaksin5: e?.value ?? "bias",
              });
            }}
            value={
              filter.tipe_vaksin5
                ? standardOptions(
                    getjenisVaksin?.data || [],
                    "vaccine_name",
                    "vaccine_id"
                  )?.find((f) => f.value === filter.tipe_vaksin5)
                : filter.tipe_vaksin5
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={handleDownload}>
          <Button text="Unduh" variant="outlined" />
        </div>
        {/* <div>
          <Button text="Laporkan" variant="outlined" />
        </div> */}
      </div>
    </div>
  );
};
