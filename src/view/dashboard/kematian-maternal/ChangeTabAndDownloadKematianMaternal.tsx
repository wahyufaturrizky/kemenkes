import { useState } from "react";
import { downloadFile } from "@/helpers/downloadFile";
import { DownloadButton } from "@/components";

export interface tabData {
  tab: string;
  tabClicked: string;
}

interface FilterProps {
  filterState: any;
  data: any;
  tabActive: (data: tabData) => void;
  btnDownloadPostion?: 'bottom' | 'top';
  btnWithTitle?: boolean;
  sectionClicked: string;
}

export const ChangeTabAndDownloadKematianMaternal: React.FC<FilterProps> = ({ filterState, data, tabActive, btnDownloadPostion, btnWithTitle, sectionClicked }) => {
  const [filter, setFilter] = filterState || useState({});
  const [activeTab, setActiveTab] = useState("Chart View");
  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    tabActive({
      tab: tab,
      tabClicked: sectionClicked
    });
  };
  const header = data?.map((r: any) => r.faskes);
  // const faskes = data?.map((r: any) => r.faskes);
  const persentase = data?.map(
    (r: any) => `${r.pct?.toFixed(2).replace(".", ",")} %`
  );
  const threshold = data?.map((r: any) => `${r.threshold} %`);
  const total = data?.map((r: any) => r.ytd.toString());

  // TODO : Handle Download
  const handleDownload = () => {
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
        {btnDownloadPostion === 'bottom' && activeTab === 'Chart View' && (
          <h3 className="text-[20px] font-[500]">Tren Kematian Maternal</h3>
        )
        }
        {activeTab === 'Table View' && (
          <div className="mb-3 flex flex-row gap-4" onClick={handleDownload}>
            <h3 className="text-[20px] font-[500]">Tren Kematian Maternal</h3>
            <DownloadButton text="Unduh Excel" />
          </div>)
        }
        {
          !btnWithTitle && btnDownloadPostion === undefined && activeTab !== 'Table View'   && (
            <div className="mb-3 flex flex-row gap-4">
              <DownloadButton
                text=""
                isDropdown={true}
                options={[
                  { label: 'Png', onClick: () => handleDownload() },
                  { label: 'Jpeg', onClick: () => handleDownload() }
                ]}
              />
            </div>
          )
        }

      </div>
      <div className="flex space-x-4">
        <button
          className={`relative pb-2 ${activeTab === "Chart View"
            ? "text-teal-500 font-semibold border-b-2 border-teal-500"
            : "text-gray-500 font-normal"
            }`}
          onClick={() => handleTabClick("Chart View")}
        >
          Chart View
        </button>
        <button
          className={`pb-2 ${activeTab === "Table View"
            ? "text-teal-500 font-semibold border-b-2 border-teal-500"
            : "text-gray-500 font-normal"
            }`}
          onClick={(e) => {
            console.log(e.target);
            console.log(e)
            handleTabClick("Table View")
          }}
        >
          Table View
        </button>
      </div>
    </div>
  );
};
