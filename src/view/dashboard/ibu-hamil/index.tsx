"use client";

import React, { useState } from "react";
import { DownloadButton, InputSearch, Select, TableData } from "@/components";
import { graphOptions4, graphOptions5, graphOptions6 } from "./graphOptions";
import {
  ancGraphOptions1,
  ancGraphOptions4,
  ancGtaphOptions5,
  dataMonth,
  incGraphOptions1,
} from "@/utils/constants";
import { formatNumber } from "@/helpers";
import Header from "@/components/header";
import styles from "./anc.module.css";
import SectionHeader from "@/components/sectionHeader";
import ScoreCardItem from "@/components/score-card-item";
import GraphItem from "@/components/graph-item";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import IndividualData from "./IndividualData";
// import MapComponent from "@/components/map-component";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useGetScopePostfarumQuery, useGetScoreCardQuery } from "@/lib/services/pnc";
import FilterSection from "./FilterSection";
import MapEChartsAnc from "@/components/map-echarts-anc";
import MapAnc2 from "@/components/mapAnc2";
import DataCard from "./totalPercentage";
import VerticalBarChart from "./verticalBar";

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
});

type Data = {
  id: number;
  No: string;
  Provinsi: string;
  Kab_Kota: string;
  Target: string;
  Realisasi: number;
  percentase_Penerima_Layanan: number;
};

const defaultData: Data[] = [
  {
    id: 1,
    No: "001",
    Provinsi: "Jawa Barat",
    Kab_Kota: "Bandung",
    Target: "10000",
    Realisasi: 7500,
    percentase_Penerima_Layanan: 75,
  },
  {
    id: 2,
    No: "002",
    Provinsi: "Jawa Timur",
    Kab_Kota: "Surabaya",
    Target: "8000",
    Realisasi: 6000,
    percentase_Penerima_Layanan: 75,
  },
  {
    id: 3,
    No: "003",
    Provinsi: "DKI Jakarta",
    Kab_Kota: "Jakarta Pusat",
    Target: "12000",
    Realisasi: 9000,
    percentase_Penerima_Layanan: 75,
  },
];

const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor("No", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Provinsi", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Kab_Kota", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Target", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Realisasi", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("percentase_Penerima_Layanan", {
    cell: (info) => info.getValue(),
  }),
];

export default function IbuHamil() {
  const { data: dataScoreCard, isFetching: isFetchingDataScoreCard } = useGetScoreCardQuery({});
  const { data: dataScopePostfarum } = useGetScopePostfarumQuery({});

  const [data, _setData] = useState(() => [...defaultData]);

  const [showIndividualData, setShowIndividualData] = useState<boolean>(false);

  const handleShowIndividualData: () => void = () => {
    setShowIndividualData(true);
  };

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalData = ancGraphOptions1.map((option) => option.ya + option.tidak);
  return (
    <div className={`flex flex-col p-[30px]  ${styles.jakartaFont}`}>
      {showIndividualData ? (
        <IndividualData handleBackClick={() => setShowIndividualData(false)} />
      ) : (
        <>
          <Header
            title={`Dashboard\nMonev ASIK`}
            subtitle="Capaian Penerimaan Layanan Dasar SPM"
            desc={`Dashboard ini menampilkan monitoring data yang diterima dari hasil pencatatan ibu hamil di Posyandu pada aplikasi SATUSEHAT Indonesiaku (ASIK)`}
            space={false}
          />

          <div className="container">
            <h2>Selamat Datang!</h2>
          </div>

          <div className="container mx-auto">
            <section className="mt-[39px]">
              <FilterSection />
            </section>

            <section className="mt-10">
              <DataCard />
            </section>

            <section className="w-full mt-10 grid grid-cols-12 gap-3">
              <div className="rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-8 py-8 px-5">
                <SectionHeader title="" subtitle="Peta Capaian Penerima Layanan Dasar" />
                <div className="mt-5 rounded-xl border border-[#D6D6D6] p-[13px] h-[550px]">
                  <MapAnc2 />
                </div>
              </div>
              <div className="rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-4 py-4 px-5 bg-[#4C5699]">
                <h4 className="text-white font-bold text-xl">Capaian Penerima Layanan Dasar</h4>
                <p className="text-[#EFEDFF] my-4 text-sm">lorem</p>
                <div className="bg-white shadow-md mt-5 rounded-2xl py-5 px-3">
                  <div className="w-1/2 mb-2">
                    <Select placeholder="Terendah" />
                  </div>
                  <div className="h-[680px]">
                    <GraphItem
                      isHideButtonDownload={true}
                      graphOptions={graphOptions6(
                        [
                          {
                            name: "Melaksanakan Layanan Kesehatan Ibu Hamil",
                            type: "bar",
                            stack: "total",
                            label: {
                              show: true,
                              formatter: (params: any) => {
                                const total = totalData[params.dataIndex];
                                const value = params.value;
                                const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
                                return `${params.value}%`;
                              },
                            },
                            emphasis: {
                              focus: "series",
                            },
                            itemStyle: {
                              color: "#00B3AC",
                            },
                            data: (incGraphOptions1 || [])?.map((r: any) => r?.pct) || [],
                          },
                        ],
                        incGraphOptions1?.map((r: any) => r.label) || []
                      )}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <SectionHeader
                title="Capaian Penerima Layanan Dasar Berdasarkan Provinsi"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <div className="bg-white shadow-md mt-5 rounded-2xl p-[21px]">
                {/* <div className="w-[335px] mb-4">
                  <Select placeholder="Indikator Ibu Bersalin & Nifas" />
                </div> */}
                <div className="h-[650px]">
                  <GraphItem
                    isHideButtonDownload={true}
                    graphOptions={graphOptions5(
                      [
                        {
                          name: "Target",
                          data: [],
                          type: "bar",
                        },
                        {
                          name: "Realisasi",
                          data:
                            (ancGtaphOptions5 || [])?.map((r: any) => r?.persentase_bumil_anemia) ||
                            [],
                          type: "bar",
                          showBackground: true,
                          backgroundStyle: {
                            color: "#C7EDEB",
                          },
                          label: {
                            show: false,
                            // precision: 1,
                            // formatter: (params: any) =>
                            //   `${formatNumber(params.value)}%`,
                          },
                        },
                        {
                          name: "Cakupan % Nasional Anemia",
                          data:
                            (ancGtaphOptions5 || [])?.map((r: any) => r?.persentase_nasional) || [],
                          type: "line",
                          label: {
                            show: false,
                            // precision: 1,
                            // formatter: (params: any) =>
                            //   `${formatNumber(params.value)}%`,
                          },
                        },
                      ],
                      ancGtaphOptions5?.map((r) => r.region)
                    )}
                  />
                </div>
              </div>
            </section>

            <section className="mt-10">
              <SectionHeader
                title="Capaian Penerima Layanan Dasar Berdasarkan Provinsi"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <div className="bg-white shadow-md mt-5 rounded-2xl p-[21px]">
                {/* <div className="w-[335px]">
                  <Select placeholder="Indikator Ibu Bersalin & Nifas" />
                </div> */}
                <div className="h-[650px]">
                  <GraphItem
                    isHideButtonDownload={true}
                    graphOptions={graphOptions4(
                      [
                        // {
                        //   name: "Target",
                        //   data: [],
                        //   type: "bar",
                        // },
                        {
                          name: "Realisasi",
                          data: (ancGraphOptions4 || [])?.map((r: any) => r?.value) || [],
                          type: "bar",
                          label: {
                            show: false,
                          },
                          showBackground: true,
                          backgroundStyle: {
                            color: "#C7EDEB",
                          },
                        },
                        {
                          name: "% Penerima Layanan Dasar",
                          data: (ancGraphOptions4 || [])?.map((r: any) => r?.pct) || [],
                          type: "line",
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(params.value)}%`,
                          },
                        },
                      ],
                      dataMonth?.map((r) => r.label)
                    )}
                  />
                </div>
              </div>
            </section>

            <section className="mt-10">
              <SectionHeader
                title="Jumlah % Persentase Program Ibu Melahirkan dan Ibu Nifas"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <div className="bg-white shadow-md mt-5 rounded-2xl p-[21px]">
                <div className="w-[335px]">
                  <Select placeholder="Indikator Ibu Bersalin & Nifas" />
                </div>
                <div className="h-[650px]">
                  <GraphItem
                    graphOptions={graphOptions6(
                      [
                        {
                          name: "Melaksanakan Layanan Kesehatan Ibu Hamil",
                          type: "bar",
                          stack: "total",
                          label: {
                            show: true,
                            formatter: (params: any) => {
                              const total = totalData[params.dataIndex];
                              const value = params.value;
                              const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
                              return `${params.value}%`;
                            },
                          },
                          emphasis: {
                            focus: "series",
                          },
                          itemStyle: {
                            color: "#00B3AC",
                          },
                          data: (incGraphOptions1 || [])?.map((r: any) => r?.pct) || [],
                        },
                      ],
                      incGraphOptions1?.map((r: any) => r.label) || []
                    )}
                  />
                </div>
              </div>
            </section>

            <section className="mt-10">
              <div className="flex justify-between items-center">
                <h1 className="text-xl leading-10 font-medium">
                  Tabel Capaian Penerima Layanan Dasar
                </h1>
                <p className="text-[14px] font-semibold">19 Mei 2024 - 20 Mei 2024</p>
              </div>
              <div className="mt-5 w-full flex justify-between items-center mb-4">
                <div className="flex gap-3 items-center">
                  <DownloadButton text="Download" />
                  <div className="flex items-center gap-[7px]">
                    <p className="text-sm font-semibold">Show</p>
                    <select
                      name=""
                      id=""
                      className="border border-[#D6D6D6] py-[5px] px-[16px] rounded-xl"
                    >
                      <option value="">10</option>
                      <option value="">20</option>
                      <option value="">30</option>
                    </select>
                    <p className="text-sm font-semibold">Entries</p>
                  </div>
                </div>
                <div className="flex items-center gap-[7px]">
                  <p className="text-sm font-semibold">Search</p>
                  <InputSearch />
                </div>
              </div>
              <TableData
                tableInstance={tableInstance}
                titleTable={"Pelayanan Kesehatan Ibu Hamil"}
              />
            </section>
          </div>
        </>
      )}
    </div>
  );
}
