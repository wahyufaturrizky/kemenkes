"use client";

import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import { Banner, BannerHighlightFooter, BannerText } from "@/components";
import {
  graphOptions1,
  graphOptions2,
  graphOptions3,
  graphOptions4,
  graphOptions5,
  graphOptions6,
  graphOptions7,
} from "./graphOptions";
import GraphEchartsAnc from "@/components/graph-echarts-anc";
import {
  ancGraphOptions1,
  ancGraphOptions2,
  ancGraphOptions3,
  ancGraphOptions4,
  ancGraphOptions6,
  ancGraphOptions7,
  ancGtaphOptions5,
  dataMonth,
} from "@/utils/constants";
import FilterSummaryImmunizationAnc from "@/view/home/components/FilterAnc";
import { formatNumber } from "@/helpers";
import Header from "@/components/header";
import styles from "./anc.module.css";
import SectionHeader from "@/components/sectionHeader";
import Scorecard1 from "@/components/scorecard1";
import Scorecard2 from "@/components/scorecard2";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Anc() {
  const totalData = ancGraphOptions1.map((option) => option.ya + option.tidak);
  return (
    <div
      className={`flex flex-col items-center p-[30px]  ${styles.jakartaFont}`}
    >
      <Header
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Layanan Ibu Hamil"
        desc={`Dashboard ini menampilkan:\nmonitoring capaian Indikator ANC berdasarkan data yang dikirim oleh faskes ke SATUSEHAT`}
        space={true}
      />
      <FilterSummaryImmunizationAnc />
      <SectionHeader
        title="Jumlah Sasaran Ibu Hamil"
        subtitle="Ringkasan berisi jumlah sasaran ibu hamil dan cakupan ibu hamil yang
            sudah mendapatkan layanan pemeriksaan"
        btn="Halaman Analisis"
      />
      <div className="w-full grid grid-cols-2 gap-2 mt-6">
        <Scorecard1 title="Sasaran Ibu Hamil" total="555.876" direction="l" />
        <Scorecard1
          title="Ibu Hamil Tercatat"
          total="111.876"
          pct="30%"
          direction="r"
        />
      </div>
      <SectionHeader
        title="Cakupan Kunjungan ANC"
        subtitle="Jumlah dan persentase ibu hamil yang sudah melakukan kunjungan ANC K1 - K6 di fasilitas kesehatan"
      />
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6 mt-6">
        <Scorecard2
          title="K1"
          value="111.234"
          pct="30%"
          className="rounded-l-xl"
        />
        <Scorecard2
          title="K1"
          subtitle="Akses"
          value="111.234"
          pct="30%"
          className="rounded-r-xl lg:rounded-none"
        />
        <Scorecard2
          title="K1"
          subtitle="Murni"
          value="111.234"
          pct="30%"
          className="rounded-l-xl lg:rounded-none"
        />
        <Scorecard2
          title="K1"
          subtitle="USG"
          value="111.234"
          pct="30%"
          className="rounded-r-xl"
        />
        <Scorecard2
          title="K4"
          value="111.234"
          pct="30%"
          className="rounded-l-xl"
        />
        <Scorecard2
          title="K5"
          value="111.234"
          pct="30%"
          className="rounded-r-xl lg:rounded-none"
        />
        <Scorecard2
          title="K5"
          subtitle="USG"
          value="111.234"
          pct="30%"
          className="rounded-l-xl lg:rounded-none"
        />
        <Scorecard2
          title="K6"
          value="111.234"
          pct="30%"
          className="rounded-r-xl"
        />
      </div>
      <SectionHeader
        title="Cakupan Program Ibu Hamil"
        subtitle="Jumlah dan persentase capaian indikator program kesehatan ibu hamil"
      />
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="h-44 bg-primary grid grid-cols-2 p-5 text-white rounded-xl">
          <div className="flex flex-col justify-between">
            <p className="font-bold text-2xl">ANC</p>
            <p className="font-bold text-6xl">bj</p>
            <p className="font-bold text-2xl">kk</p>
          </div>
          <div className="flex flex-col items-end">
            <IoMdInformationCircleOutline size={24} />
            <p className="font-bold text-3xl m-3">jjv</p>
            <p className="font-bold text-2xl">kbkb</p>
          </div>
        </div>
      </div>

      <div className="px-4 container  ">
        <div className="h-[600px] ">
          <GraphEchartsAnc
            graphOptions={graphOptions1(
              [
                {
                  name: "Ya",
                  type: "bar",
                  stack: "total",
                  label: {
                    show: true,
                    formatter: (params: any) => {
                      const total = totalData[params.dataIndex];
                      const value = params.value;
                      const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
                      return `${percentage}%`;
                    },
                  },
                  emphasis: {
                    focus: "series",
                  },
                  itemStyle: {
                    color: "#00B3AC",
                  },
                  data: ancGraphOptions1?.map((r: any) => r?.ya || 0) || [],
                },
                {
                  name: "Tidak",
                  type: "bar",
                  stack: "total",
                  label: {
                    show: true,
                    formatter: (params: any) => {
                      const total = totalData[params.dataIndex];
                      const value = params.value;
                      const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
                      return `${percentage}%`;
                    },
                  },
                  emphasis: {
                    focus: "series",
                  },
                  itemStyle: {
                    color: "#BC2A3F",
                  },
                  data: ancGraphOptions1?.map((r: any) => r?.tidak || 0) || [],
                },
              ],
              ancGraphOptions1?.map((r: any) => r.label) || []
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions2(
              [
                {
                  name: "Anemia",
                  type: "bar",
                  color: "#00968E",
                  barGap: 0,
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data: ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
                },
                {
                  name: "Mendapatkan TTD",
                  type: "bar",
                  color: "#04DACF",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.dapatTtd || 0) || [],
                },
                {
                  name: "Mengonsumsi TTD",
                  type: "bar",
                  color: "#737373",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.konsumsiTtd || 0) ||
                    [],
                },
              ],
              ancGraphOptions2?.map((r: any) => r.region)
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions2(
              [
                {
                  name: "Anemia",
                  type: "bar",
                  color: "#00968E",
                  barGap: 0,
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data: ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
                },
                {
                  name: "Mendapatkan TTD",
                  type: "bar",
                  color: "#04DACF",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.dapatTtd || 0) || [],
                },
                {
                  name: "Mengonsumsi TTD",
                  type: "line",
                  color: "#BC2A3F",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.konsumsiTtd || 0) ||
                    [],
                },
              ],
              ancGraphOptions2?.map((r: any) => r.region)
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions3(
              [
                {
                  name: "Direct",
                  type: "bar",
                  barWidth: "50%",
                  data: ancGraphOptions3?.map((r: any) => r?.value || 0) || [],
                },
              ],
              ancGraphOptions3?.map((r: any) => r.label)
            )}
          />
        </div>
        {/* 444444 start*/}
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions4(
              [
                {
                  name: "Jumlah",
                  data:
                    (ancGraphOptions4 || [])?.map((r: any) => r?.value) || [],
                  type: "bar",
                  label: {
                    show: false,
                  },
                },
                {
                  name: "Persentase",
                  data: (ancGraphOptions4 || [])?.map((r: any) => r?.pct) || [],
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
        {/* 444444 end*/}
        {/* 55555 start*/}
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions5(
              [
                {
                  name: "Jumlah Bumil Anemia",
                  data:
                    (ancGtaphOptions5 || [])?.map((r: any) => r?.jumlah) || [],
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
        {/* 55555 end*/}
        {/* 66666666 */}
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions6(
              [
                {
                  name: "Melaksanakan Kunjungan ANC",
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
                  data: (ancGraphOptions6 || [])?.map((r: any) => r?.pct) || [],
                },
              ],
              ancGraphOptions6?.map((r: any) => r.label) || []
            )}
          />
        </div>
        {/* 66666666 */}
        {/* 777777 */}
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions7(
              [
                {
                  name: "Sasaran",
                  type: "bar",
                  barWidth: "50%",
                  data: ancGraphOptions7?.map((r: any) => r?.total || 0) || [],
                },
                {
                  name: "Persentase",
                  type: "line",
                  barWidth: "50%",
                  data: ancGraphOptions7?.map((r: any) => r?.pct || 0) || [],
                },
              ],
              ancGraphOptions7?.map((r: any) => r.label)
            )}
          />
        </div>
        {/* 777777 */}
      </div>
    </div>
  );
}
