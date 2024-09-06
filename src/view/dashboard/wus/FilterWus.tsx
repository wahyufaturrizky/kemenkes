import { useState } from "react";
import { Button, Select } from "@/components";
import { API_URL } from "@/helpers/config";
import {
  ageTypeOptions,
  genderOptions,
  regionOptions,
  trendTypeOptions,
  vaccineTypeOptions,
} from "@/utils/constants";
import { openSans } from "@/assets/fonts";
import { standardOptions } from "@/helpers";

import {
  useGetJenisStatusListQuery,
  useGetWomencategoryQuery,
} from "@/lib/services/filter-wus";

import { useDownloadImmunizationExcelMutation } from "@/lib/services/wus";
import { dataMonth } from "@/utils/constants";
import { formatNumber } from "@/helpers";

interface FilterProps {
  filterState: any;
}
interface FilterProps2 {
  filterState: any;
  dataWus: any;
}
export const Filter1: React.FC<FilterProps2> = ({ filterState, dataWus }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisStatusList } = useGetJenisStatusListQuery({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});

  const dataBody = dataWus?.map((data: any) => [
    `${formatNumber(data.ytd_pct_total)}%`,
    `${formatNumber(data.ytd_total)}`,
  ]);
  const downloadFile = async () => {
    const url = `${API_URL}/v1/csv/download`;

    const data = {
      verticalHeader: dataWus?.map((r: any) => r.faskes_desc),
      body: dataBody,
      header: ["% Jumlah Penerima Imunisasi", "Total Penerima"],
      fileName: "Tren Cakupan daerah imunisasi WUS",
      title: "Tren Cakupan daerah imunisasi WUS",
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${data.fileName}.xlsx`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            placeholder="Kewilayahan"
            options={regionOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, wilayah: e ? e.value : "All" });
            }}
            value={
              filter.wilayah
                ? regionOptions?.find((f) => f.value === filter.wilayah)
                : filter.wilayah
            }
          />
        </div>
        <div>
          <Select
            placeholder="Jenis Status T"
            options={standardOptions(
              getjenisStatusList?.data || [],
              "jenisStatusName",
              "jenisStatusId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                status_type_daerah: e?.value ?? "t2plus",
              });
            }}
            value={
              filter.status_type_daerah
                ? standardOptions(
                    getjenisStatusList?.data || [],
                    "jenisStatusName",
                    "jenisStatusId"
                  )?.find((f) => f.value === filter.status_type_daerah)
                : filter.status_type_daerah
            }
            // isDisabled={!filter.bulan}
          />
        </div>
        <div>
          <Select
            placeholder="Status Kehamilan"
            options={standardOptions(
              getWomenCategory?.data || [],
              "womenCategoryName",
              "womenCategoryId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                women_category_daerah: e?.value ?? "All",
              });
            }}
            value={
              filter.women_category_daerah
                ? standardOptions(
                    getWomenCategory?.data || [],
                    "womenCategoryName",
                    "womenCategoryId"
                  )?.find((f) => f.value === filter.women_category_daerah)
                : filter.women_category_daerah
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={downloadFile}>
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter2: React.FC<FilterProps2> = ({ filterState, dataWus }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getjenisStatusList } = useGetJenisStatusListQuery({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});

  const dataBody = dataWus?.map((data: any) => [
    `${formatNumber(data.pct_total)}%`,
    `${formatNumber(data.total)}`,
  ]);

  const downloadFile = async () => {
    const url = `${API_URL}/v1/csv/download`;
    let fileName = "Cakupan Kumulatif atau Bulanan penerima imunisasi WUS";
    const data = {
      verticalHeader: dataMonth?.map((r) => r.label),
      body: dataBody,
      header: ["% Cakupan", "Jumlah Penerima Imunisasi"],
      fileName,
      title: fileName,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${data.fileName}.xlsx`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div>
          <Select
            placeholder="Jenis Tren"
            options={trendTypeOptions}
            onChange={(e: any) => {
              setFilter({ ...filter, tren_type: e?.value ?? "kumulatif" });
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
            placeholder="Jenis Status T"
            options={standardOptions(
              getjenisStatusList?.data || [],
              "jenisStatusName",
              "jenisStatusId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                status_type_kumulatif: e?.value ?? "t2plus",
              });
            }}
            value={
              filter.status_type_kumulatif
                ? standardOptions(
                    getjenisStatusList?.data || [],
                    "jenisStatusName",
                    "jenisStatusId"
                  )?.find((f) => f.value === filter.status_type_kumulatif)
                : filter.status_type_kumulatif
            }
            // isDisabled={!filter.bulan}
          />
        </div>
        <div>
          <Select
            placeholder="Status Kehamilan"
            options={standardOptions(
              getWomenCategory?.data || [],
              "womenCategoryName",
              "womenCategoryId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                women_category_kumulatif: e?.value ?? "All",
              });
            }}
            value={
              filter.women_category_kumulatif
                ? standardOptions(
                    getWomenCategory?.data || [],
                    "womenCategoryName",
                    "womenCategoryId"
                  )?.find((f) => f.value === filter.women_category_kumulatif)
                : filter.women_category_kumulatif
            }
            // isDisabled={!filter.bulan}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={downloadFile}>
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter3: React.FC<FilterProps2> = ({ filterState, dataWus }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});
  const downloadFile = async () => {
    const url = `${API_URL}/v1/csv/download`;
    let fileName = "Sebaran Status T";

    const dataBody = dataWus?.map((data: any) => [
      `${formatNumber(data.pct)}%`,
      `${formatNumber(data.total)}`,
    ]);

    const data = {
      // Your data here (if required)
      verticalHeader: ["T1", "T2", "T3", "T4", "T5", "T2+"],
      body: dataBody,
      header: ["% Cakupan", "Total Penerima"],
      fileName,
      title: fileName,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${data.fileName}.xlsx`;

      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div className="font-bold md:text-2xl">
          <b className="text-primary-2">Grafik Sebaran Status T</b>
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <Select
            placeholder="Status Kehamilan"
            options={standardOptions(
              getWomenCategory?.data || [],
              "womenCategoryName",
              "womenCategoryId"
            )}
            onChange={(e: any) => {
              setFilter({
                ...filter,
                women_category_status_T: e?.value ?? "All",
              });
            }}
            value={
              filter.women_category_status_T
                ? standardOptions(
                    getWomenCategory?.data || [],
                    "womenCategoryName",
                    "womenCategoryId"
                  )?.find((f) => f.value === filter.women_category_status_T)
                : filter.women_category_status_T
            }
            // isDisabled={!filter.bulan}
          />
        </div>
        <div onClick={downloadFile}>
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
export const Filter4: React.FC<FilterProps2> = ({ filterState, dataWus }) => {
  const [filter, setFilter] = filterState || useState({});
  const { data: getWomenCategory } = useGetWomencategoryQuery({});
  const downloadFile = async () => {
    const url = `${API_URL}/v1/csv/download`; // Your endpoint URL
    let fileName = "Sebaran Status Kehamilan Terhadap Status T";
    // const dataBody1 = dataWus?.[0]?.result.map((data: any) => [
    //   `${formatNumber(data.pct)}%`, //pct dari dataWus?.[0]
    //   `${formatNumber(data.pct)}%`, //pct dari dataWus?.[1]
    //   // `${formatNumber(data.total)}`,
    // ]);
    // const dataBody2 = dataWus?.[1]?.result.map((data: any) => [
    //   `${formatNumber(data.pct)}%`,
    //   // `${formatNumber(data.total)}`,
    // ]);
    const dataBody = dataWus?.[1]?.result.map((data: any, index: number) => [
      `${formatNumber(data.pct)}%`, // pct dari dataWus?.[0]
      `${formatNumber(dataWus?.[0]?.result[index]?.pct)}%`, // pct dari dataWus?.[1]
      // `${formatNumber(data.total)}`,
    ]);

    // const dataBody = [dataBody1, dataBody2];
    const data = {
      // Your data here (if required)
      verticalHeader: ["T1", "T2", "T3", "T4", "T5", "T2+"],
      body: dataBody,
      // body: [
      //   [`${formatNumber(dataWus?.ytd_total_t1)}`],
      //   [`${formatNumber(dataWus?.ytd_total_t2)}`],
      //   [`${formatNumber(dataWus?.ytd_total_t3)}`],
      //   [`${formatNumber(dataWus?.ytd_total_t4)}`],
      //   [`${formatNumber(dataWus?.ytd_total_t5)}`],
      //   [`${formatNumber(dataWus?.ytd_total_t2plus)}`],
      // ],
      header: ["WUS Tidak  Hamil", "WUS Hamil"],
      fileName,
      title: fileName,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a URL for the blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `${data.fileName}.xlsx`; // Set the desired file name

      // Append the anchor to the body (required for some browsers)
      document.body.appendChild(a);

      // Programmatically click the anchor to trigger the download
      a.click();

      // Clean up by removing the anchor and revoking the blob URL
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
      <div className={`flex gap-4 ${openSans.className}`}>
        <div className="font-bold md:text-2xl">
          <b className="text-primary-2">
            Grafik Sebaran Status Kehamilan Terhadap Status T
          </b>
        </div>
      </div>
      <div className="flex gap-4">
        <div onClick={downloadFile}>
          <Button text="Unduh" variant="outlined" />
        </div>
      </div>
    </div>
  );
};
