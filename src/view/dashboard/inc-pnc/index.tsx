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
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import IndividualData from "./IndividualData";
// import MapComponent from "@/components/map-component";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useGetScoreCardQuery } from "@/lib/services/pnc";
import FilterSection from "./FilterSection";

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
});

type Data = {
  province: string;
  city: string;
  kecamatan: string;
  kelurahan_desa: string;
  jumlah_hamil: number;
  percentase_hamil: number;
};

const defaultData: Data[] = [
  {
    province: "DKI Jakarta",
    city: "Jakarta Utara",
    kecamatan: "Tebet",
    kelurahan_desa: "Desa Mawar Indah",
    jumlah_hamil: 511.0,
    percentase_hamil: 9.0,
  },
  {
    province: "DKI Jakarta",
    city: "Kota Jakarta Timur",
    kecamatan: "Kecamatan Cempaka",
    kelurahan_desa: "Kelurahan Cempaka Timur",
    jumlah_hamil: 423.8,
    percentase_hamil: 9.0,
  },
];

const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor("province", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("city", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("kecamatan", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("kelurahan_desa", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jumlah_hamil", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("percentase_hamil", {
    cell: (info) => info.getValue(),
  }),
];

export default function IncPnc() {
  const { data: dataScoreCard, isFetching: isFetchingDataScoreCard } =
    useGetScoreCardQuery();

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
            subtitle="Layanan Ibu Bersalin dan Ibu Nifas di Puskesmas"
            desc={`Dashboard ini menampilkan monitoring data yang diterima dari hasil pencatatan ibu bersalin dan ibu nifas di SATUSEHAT`}
            space={false}
          />

          <div className="container mx-auto">
            <section className="mt-[39px]">
              <FilterSection />
            </section>

            <section className="">
              <SectionHeader
                title="Layanan Ibu Bersalin"
                subtitle="Cakupan dan persentase ibu bersalin tercatat"
              />
              <div className="mt-6 flex gap-1">
                <div className="w-[280px]">
                  <ScoreCardItem
                    className="rounded-l-xl"
                    title="Jumlah Sasaran Ibu Bersalin"
                    total="113.564"
                    percentage="30"
                    isLoading={false}
                    showPercent
                    onClick={handleShowIndividualData}
                  />
                </div>
                <div className="w-[280px]">
                  <ScoreCardItem
                    title="Ibu bersalin Tercatat"
                    total="113.564"
                    percentage="30"
                    isLoading={false}
                    showPercent
                    onClick={handleShowIndividualData}
                  />
                </div>
                <div className="w-[280px]">
                  <ScoreCardItem
                    className="rounded-r-xl"
                    title="Ibu Bersalin di Faskes"
                    total="113.564"
                    percentage="30"
                    isLoading={false}
                    showPercent
                    onClick={handleShowIndividualData}
                  />
                </div>
              </div>
            </section>

            <section className="mt-10">
              <SectionHeader
                title="Layanan Ibu Nifas"
                subtitle="Cakupan dan persentase ibu nifas tercatat"
              />
              <div className="mt-6 flex flex-wrap gap-1">
                <div className="w-[280px]">
                  <ScoreCardItem
                    className="rounded-l-xl"
                    title="Jumlah Sasaran Ibu Nifas"
                    total={formatNumber(
                      dataScoreCard?.data?.total_postpartum_mother || "0"
                    )}
                    percentage="0"
                    showPercent={false}
                    isLoading={isFetchingDataScoreCard}
                  />
                </div>
                <div className="w-[280px]">
                  <ScoreCardItem
                    title="Ibu Nifas Tercatat"
                    total="113.564"
                    percentage="0"
                    showPercent={false}
                    isLoading={false}
                  />
                </div>
                <div className="w-[280px]">
                  <ScoreCardItem
                    title="Ibu Nifas KF1"
                    total={formatNumber(
                      dataScoreCard?.data?.total_postpartum_mother_kf4 || "0"
                    )}
                    percentage="0"
                    showPercent={false}
                    isLoading={isFetchingDataScoreCard}
                  />
                </div>
                <div className="w-[280px]">
                  <ScoreCardItem
                    className="rounded-r-xl"
                    title="Ibu Nifas Mendapatkan Vit A"
                    total={formatNumber(
                      dataScoreCard?.data?.total_postpartum_mother_vit_a || "0"
                    )}
                    percentage="0"
                    showPercent={false}
                    isLoading={isFetchingDataScoreCard}
                  />
                </div>
                <div className="w-[280px]">
                  <ScoreCardItem
                    className="rounded-r-xl rounded-l-xl"
                    title="Ibu Nifas KF Lengkap"
                    total="113.564"
                    percentage="0"
                    showPercent={false}
                    isLoading={false}
                  />
                </div>
              </div>
            </section>

            <section className="mt-10">
              <SectionHeader
                title="Peta Sebaran"
                subtitle="Peta sebarna capaian indikator ibu bersalin dan ibu nifas"
              />
              <div className="mt-5 rounded-xl border border-[#D6D6D6] p-[13px] h-[550px]">
                <MapComponent />
              </div>
            </section>

            <section className="mt-10">
              <SectionHeader
                title="Jumlah dan Persentase Indikator Ibu Melahirkan, Ibu Nifas"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <div className="bg-white shadow-md mt-5 rounded-2xl p-[21px]">
                <div className="w-[335px]">
                  <Select placeholder="Indikator Ibu Bersalin & Nifas" />
                </div>
                <div className="h-[650px]">
                  <GraphItem
                    graphOptions={graphOptions5(
                      [
                        {
                          name: "Jumlah Bumil Anemia",
                          data:
                            (ancGtaphOptions5 || [])?.map(
                              (r: any) => r?.jumlah
                            ) || [],
                          type: "bar",
                          label: {
                            show: false,
                          },
                        },
                        {
                          name: "% Bumil Anemia",
                          data:
                            (ancGtaphOptions5 || [])?.map(
                              (r: any) => r?.persentase_bumil_anemia
                            ) || [],
                          type: "line",
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
                            (ancGtaphOptions5 || [])?.map(
                              (r: any) => r?.persentase_nasional
                            ) || [],
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
                title="Jumlah Capaian Ibu Melahirkan dan Ibu Nifas yang Dilayani"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
              <div className="bg-white shadow-md mt-5 rounded-2xl p-[21px]">
                <div className="w-[335px]">
                  <Select placeholder="Indikator Ibu Bersalin & Nifas" />
                </div>
                <div className="h-[650px]">
                  <GraphItem
                    graphOptions={graphOptions4(
                      [
                        {
                          name: "Jumlah",
                          data:
                            (ancGraphOptions4 || [])?.map(
                              (r: any) => r?.value
                            ) || [],
                          type: "bar",
                          label: {
                            show: false,
                          },
                        },
                        {
                          name: "Persentase",
                          data:
                            (ancGraphOptions4 || [])?.map((r: any) => r?.pct) ||
                            [],
                          type: "line",
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) =>
                              `${formatNumber(params.value)}%`,
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
                              const percentage = (
                                (value / total) *
                                100
                              ).toFixed(2); // Calculate percentage and format it to 2 decimal places
                              return `${params.value}%`;
                            },
                          },
                          emphasis: {
                            focus: "series",
                          },
                          itemStyle: {
                            color: "#00B3AC",
                          },
                          data:
                            (incGraphOptions1 || [])?.map((r: any) => r?.pct) ||
                            [],
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
                  Tabel Jumlah Ibu Hamil K1 Akses: Nasional
                </h1>
                <p className="text-[14px] font-semibold">
                  19 Mei 2024 - 20 Mei 2024
                </p>
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
              <TableData tableInstance={tableInstance} />
            </section>
          </div>
        </>
      )}
    </div>
  );
}
