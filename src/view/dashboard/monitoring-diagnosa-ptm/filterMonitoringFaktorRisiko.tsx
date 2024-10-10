import { useState } from "react";
import { downloadFile } from "@/helpers/downloadFile";
import { DownloadButton, Select } from "@/components";
interface FilterProps {
  filterState: any;
  data: any;
}

export const Filter1: React.FC<FilterProps> = ({ filterState, data }) => {
  const [filter, setFilter] = filterState || useState({});
  const [activeTab, setActiveTab] = useState("Chart View");
  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };
  const header = data?.map((r: any) => r.faskes);
  // const faskes = data?.map((r: any) => r.faskes);
  const persentase = data?.map(
    (r: any) => `${r.pct?.toFixed(2).replace(".", ",")} %`
  );
  const threshold = data?.map((r: any) => `${r.threshold} %`);
  const total = data?.map((r: any) => r.ytd.toString());

  const handleDownload = () => {
    console.log("isi download");
    downloadFile(
      //   header,
      "tes",
      [1, 2, 3],
      //   [persentase, threshold, total],
      ["Persentasi", "Target Cakupan", "Total"],
      "Capaian Skrining Kesehatan Usia Sekolah dan Remaja"
    );
  };

  return (
    <div className="flex justify-between items-center mt-5">
      <div>
        <div className="mb-3" onClick={handleDownload}>
          <DownloadButton text="Unduh Excel" />
        </div>
        <Select placeholder="Semua Peserta Jenis Pemeriksaan" />
      </div>
      <div className="flex space-x-4">
        <button
          className={`relative pb-2 ${
            activeTab === "Chart View"
              ? "text-teal-500 font-semibold border-b-2 border-teal-500"
              : "text-gray-500 font-normal"
          }`}
          onClick={() => handleTabClick("Chart View")}
        >
          Chart View
          {activeTab === "Chart View" && (
            <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-teal-500"></span>
          )}
        </button>
        <button
          className={`pb-2 ${
            activeTab === "Table View"
              ? "text-teal-500 font-semibold border-b-2 border-teal-500"
              : "text-gray-500 font-normal"
          }`}
          onClick={() => handleTabClick("Table View")}
        >
          Table View
          {activeTab === "Table View" && (
            <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-teal-500"></span>
          )}
        </button>
      </div>
    </div>
  );
};
