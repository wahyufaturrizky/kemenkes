"use client";

import { Select } from "@/components";
import GraphItem from "@/components/graph-item";
import HeaderPTM from "@/components/header-ptm";
import MapPTM from "@/components/mapPTM";
import SectionHeader from "@/components/sectionHeader";
import { incGraphOptions1, ptmGraphOptions } from "@/utils/constants";
import { graphOptions6 } from "../early-detection-analysis/graphOptions";
import styles from "../ptm.module.css";
import FilterExaminationMonitoring from "./FilterExaminationMonitoring";

export default function ExaminationMonitoring({}) {
  const totalData = ptmGraphOptions.map((option) => option.ya + option.tidak);

  return (
    <div className={`flex flex-col items-center p-[30px] ${styles.jakartaFont}`}>
      <HeaderPTM
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Pengendalian Penyakit Tidak Menular (PTM) - Deteksi Dini"
        desc="Dashboard ini menampilkan capaian hasil skrining/deteksi dini Penyakit Tidak Menular (PTM) berdasarkan data yang dikirim oleh Fasyankes ke SATUSEHAT"
        space={true}
        miniDesc={`Dashboard ini menampilkan data berdasarkan pemeriksaan pertama dari setiap jenis\nskrining PTM yang dilakukan peserta dalam 1 tahun`}
        updateTime="12/12/2024"
      />
      {/* <TabsPTM /> */}
      {/* ExaminationMonitoring View */}

      {/* Tab Overview Start */}
      <FilterExaminationMonitoring />
      <div className="flex flex-row w-full justify-between mt-5 gap-5">
        <div className="bg-[#EFEDFF] flex flex-col items-center h-[1200px] w-[220px] px-3">
          <p className="text-[#4C5699] font-extrabold text-lg text-center mt-[100px]">
            Jumlah Pemeriksaan Tekanan Darah
          </p>
          <div className="flex flex-col gap-2 mt-[100px]">
            <p className="text-[#424242] font-semibold text-3xl text-center">865.000</p>
            <p className="text-[#616161] font-normal text-sm text-center">Kunjungan</p>
          </div>
        </div>
        <div className="rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-8 py-8 px-5 w-full">
          <SectionHeader title="" subtitle="Peta Sebaran Pemeriksaan Tekanan Darah" />
          <div className="mt-5 rounded-xl border border-[#D6D6D6] p-[13px] h-[450px]">
            <MapPTM />
          </div>
        </div>
        <div className="border border-[#D6D6D6] col-span-12 lg:col-span-4 py-4 px-5 bg-[#4C5699]">
          <h4 className="text-white font-bold text-xl">Kunjungan Pemeriksaan Tekanan Darah</h4>
          <p className="text-[#EFEDFF] my-4 text-sm">
            Diurutkan dari wilayah dengan skrining Tekanan Darah tertinggi hingga terendah
          </p>
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
      </div>
      {/* Tab Overview End */}
    </div>
  );
}
