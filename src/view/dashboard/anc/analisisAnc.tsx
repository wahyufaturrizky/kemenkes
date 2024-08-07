import React from "react";
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
import { formatNumber } from "@/helpers";
import SectionHeader from "@/components/sectionHeader";
import Card8Disease from "@/components/card8Disease";
import { Filter1 } from "../bias/FilterBias";
import GraphAnc from "@/components/graphAnc";
interface AnalisisProps {
  btn: boolean;
  filterState: object;
}
const AnalisisAnc: React.FC<AnalisisProps> = ({ btn, filterState }) => {
  const totalData = ancGraphOptions1.map((option) => option.ya + option.tidak);
  return (
    <>
      <div className="px-4 container  ">
        {btn === false ? (
          <>
            <GraphAnc
              title="Analisis Pemeriksaan dan Tatalaksana Anemia pada Ibu Hamil"
              subtitle="Jumlah dan persentase ibu hamil yang melakukan kunjungan ANC dalam periode waktu dan wilayah tertentu"
              filter={<Filter1 filterState={filterState} dataBias={[]} />}
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
                    data:
                      (ancGraphOptions4 || [])?.map((r: any) => r?.pct) || [],
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
            <GraphAnc
              title="Indikator Kesehatan Ibu Hamil per Wilayah"
              subtitle="Jumlah dan persentase indikator morbiditas dan indikator program ibu hamil"
              filter={<Filter1 filterState={filterState} dataBias={[]} />}
              graphOptions={graphOptions5(
                [
                  {
                    name: "Jumlah Bumil Anemia",
                    data:
                      (ancGtaphOptions5 || [])?.map((r: any) => r?.jumlah) ||
                      [],
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
            <GraphAnc
              title="Capaian Kunjungan ANC Ibu Hamil"
              subtitle="Jumlah dan persentase kunjungan ANC ibu hamil"
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
                    data:
                      (ancGraphOptions6 || [])?.map((r: any) => r?.pct) || [],
                  },
                ],
                ancGraphOptions6?.map((r: any) => r.label) || []
              )}
            />
            <GraphAnc
              title="Capaian Program Layanan ANC Ibu Hamil"
              subtitle="Jumlah dan persentase program layanan ANC ibu hamil"
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
                    data:
                      (ancGraphOptions6 || [])?.map((r: any) => r?.pct) || [],
                  },
                ],
                ancGraphOptions6?.map((r: any) => r.label) || []
              )}
            />
            <GraphAnc
              title="Detail Capaian Program Layanan Ibu Hamil per Tiap Layanan 10T"
              subtitle="Jumlah dan persentase detail Ibu Hamil per kategori 4T"
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
                    data:
                      (ancGraphOptions4 || [])?.map((r: any) => r?.pct) || [],
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
            <GraphAnc
              title="Jumlah dan Persentase Detail Ibu Hamil Per Kategori 4T"
              subtitle="Jumlah dan persentase detail Ibu Hamil per kategori 4T"
              graphTitle="Jumlah Total Ibu Hamil dengan 4T: dari 20.000 Ibu Hamil"
              graphOptions={graphOptions7(
                [
                  {
                    name: "Sasaran",
                    type: "bar",
                    barWidth: "50%",
                    data:
                      ancGraphOptions7?.map((r: any) => r?.total || 0) || [],
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
          </>
        ) : (
          <>
            <GraphAnc
              title="Jumlah % Persentase Cakupan  Program Ibu Hamil"
              subtitle="Jumlah dan persentase pemeriksaan dan tatalaksana anemia bagi ibu hamil"
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
                    data:
                      ancGraphOptions1?.map((r: any) => r?.tidak || 0) || [],
                  },
                ],
                ancGraphOptions1?.map((r: any) => r.label) || []
              )}
            />
            <GraphAnc
              title="Analisis Sebaran Ibu Hamil KEK dan Pemberian Makanan Tambahan"
              subtitle="Jumlah dan persentase ibu hamil KEK dan intervensi pemberian makanan tambahan"
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
                    data:
                      ancGraphOptions1?.map((r: any) => r?.tidak || 0) || [],
                  },
                ],
                ancGraphOptions1?.map((r: any) => r.label) || []
              )}
            />
            <GraphAnc
              title="Analisis Perbandingan Ibu Hamil Anemia dengan Mendapatkan dan Mengonsumsi TTD"
              subtitle="Jumlah dan persentase ibu hamil anemia dibandingkan ibu hamil mendapatkan dan mengonsumsi TTD"
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
                    data:
                      ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
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
            <GraphAnc
              title="Analisis Ibu KEK dan Mendapatkan PMT dengan Target RPJMN 2024 Ibu Hamil KEK"
              subtitle="Jumlah dan persentase Ibu Hamil KEK dan mendapatkan PMT dengan target RPJMN untuk ibu hamil KEK"
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
                    data:
                      ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
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
            <GraphAnc
              title="Analisis Ibu Hamil Komplikasi dan Dirujuk"
              subtitle="Jumlah dan persentase Ibu Hamil komplikasi dan dirujuk"
              graphOptions={graphOptions3(
                [
                  {
                    name: "Direct",
                    type: "bar",
                    barWidth: "50%",
                    data:
                      ancGraphOptions3?.map((r: any) => r?.value || 0) || [],
                  },
                ],
                ancGraphOptions3?.map((r: any) => r.label)
              )}
            />
            {/* <div className="h-[600px] ">
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
                      data:
                        ancGraphOptions1?.map((r: any) => r?.tidak || 0) || [],
                    },
                  ],
                  ancGraphOptions1?.map((r: any) => r.label) || []
                )}
              />
            </div> */}
            {/* <div className="h-[600px]">
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
                      data:
                        ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
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
                        ancGraphOptions2?.map((r: any) => r?.dapatTtd || 0) ||
                        [],
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
                        ancGraphOptions2?.map(
                          (r: any) => r?.konsumsiTtd || 0
                        ) || [],
                    },
                  ],
                  ancGraphOptions2?.map((r: any) => r.region)
                )}
              />
            </div> */}
            {/* <div className="h-[600px]">
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
                      data:
                        ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
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
                        ancGraphOptions2?.map((r: any) => r?.dapatTtd || 0) ||
                        [],
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
                        ancGraphOptions2?.map(
                          (r: any) => r?.konsumsiTtd || 0
                        ) || [],
                    },
                  ],
                  ancGraphOptions2?.map((r: any) => r.region)
                )}
              />
            </div> */}
            {/* <div className="h-[600px]">
              <GraphEchartsAnc
                graphOptions={graphOptions3(
                  [
                    {
                      name: "Direct",
                      type: "bar",
                      barWidth: "50%",
                      data:
                        ancGraphOptions3?.map((r: any) => r?.value || 0) || [],
                    },
                  ],
                  ancGraphOptions3?.map((r: any) => r.label)
                )}
              />
            </div> */}
            <SectionHeader
              title="Analisis Mordibilitas Ibu Hami"
              subtitle="Jumlah dan persentase penyakit yang dialami Ibu Hamil"
            />
            <div className="mx-14 my-11 grid grid-cols-8 gap-3">
              <div className="w-full h-5 col-span-5 grid gap-3">
                <div className="grid grid-cols-5 gap-3 h-[200px]">
                  {/* <div className="col-span-3 h-full bg-[#F38739]"></div> */}
                  <Card8Disease
                    title={"Rank 4"}
                    value={formatNumber(113578) || "0"}
                    pct={`${formatNumber(9) || 0}%`}
                    styles="col-span-3 h-full bg-[#F38739]"
                    size="l"
                  />
                  <Card8Disease
                    title={"Rank 5"}
                    value={formatNumber(113578) || "0"}
                    pct={`${formatNumber(8) || 0}%`}
                    styles="col-span-2 h-full bg-[#F36639]"
                    size="l"
                  />
                  {/* <div className="col-span-2 h-full bg-[#F36639]"></div> */}
                </div>
                <div className="grid grid-cols-4 gap-3 h-[300px]">
                  <Card8Disease
                    title={"Rank 2"}
                    value={formatNumber(113578) || "0"}
                    pct={`${formatNumber(8) || 0}%`}
                    styles="col-span-2 h-full bg-[#F3B239]"
                    size="l"
                  />
                  <Card8Disease
                    title={"Rank 3"}
                    value={formatNumber(113578) || "0"}
                    pct={`${formatNumber(8) || 0}%`}
                    styles="col-span-2 h-full bg-[#F3CA39]"
                    size="l"
                  />
                  {/* <div className="col-span-2 h-full bg-[#F3B239]"></div> */}
                  {/* <div className="col-span-2 h-full bg-[#F3CA39]"></div> */}
                </div>
                {/* <div className="h-[197px] bg-[#CF3E53]"></div> */}
                <Card8Disease
                  title={"Rank 1"}
                  value={formatNumber(113578) || "0"}
                  pct={`${formatNumber(8) || 0}%`}
                  styles="h-[197px] bg-[#CF3E53]"
                  size="l"
                />
              </div>
              <div className="w-full h-5 col-span-3 gap-3 grid">
                <div className="grid grid-cols-12 h-44 gap-3">
                  <div className="col-span-7 h-[175px] w-full">
                    {/* <div className="w-[33.33%] bg-[#27A790] h-full"></div> */}
                    {/* <div className="w-[33.33%] bg-[#27A790] h-full"></div> */}
                    {/* <div className="w-[33.33%] bg-[#27A790] h-full"></div> */}
                    <div className="w-full h-full grid grid-cols-12 gap-3">
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#27A790] h-full"
                        size="xs"
                      />
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#27A790] h-full"
                        size="xs"
                      />
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#27A790] h-full"
                        size="xs"
                      />
                    </div>
                  </div>
                  <div className="col-span-5 h-[175px] w-full">
                    <div className="w-full h-full grid grid-cols-12 gap-3">
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#223D82] h-full"
                        size="xxs"
                      />
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#223D82] h-full"
                        size="xxs"
                      />
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#223D82] h-full"
                        size="xxs"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-10 h-[175px] gap-3">
                  <div className="col-span-8 h-44 w-full">
                    {/* <div className="w-[33.33%] bg-[#5F27A7] h-full"></div>
                    <div className="w-[33.33%] bg-[#5F27A7] h-full"></div>
                    <div className="w-[33.33%] bg-[#5F27A7] h-full"></div> */}
                    <div className="w-full h-full grid grid-cols-12 gap-3">
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#5F27A7] h-full"
                        size="s"
                      />
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#5F27A7] h-full"
                        size="s"
                      />
                      <Card8Disease
                        title={"Rank 15"}
                        value={formatNumber(113578) || "0"}
                        pct={`${formatNumber(8) || 0}%`}
                        styles="col-span-4 bg-[#5F27A7] h-full"
                        size="s"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 h-44 w-full flex gap-3">
                    {/* <div className="w-full bg-[#27A790] h-full"></div> */}
                    <Card8Disease
                      title={"Rank 15"}
                      value={formatNumber(113578) || "0"}
                      pct={`${formatNumber(8) || 0}%`}
                      styles="w-full bg-[#27A790] h-full"
                      size="xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-10 h-44 gap-3">
                  <div className="col-span-4 h-[175px] w-full flex gap-3">
                    {/* <div className="w-full bg-[#A7276C] h-full"></div> */}
                    <Card8Disease
                      title={"Rank 15"}
                      value={formatNumber(113578) || "0"}
                      pct={`${formatNumber(8) || 0}%`}
                      styles="w-full bg-[#A7276C] h-full"
                      size="m"
                    />
                  </div>
                  <div className="col-span-6 h-[175px] w-full flex gap-3">
                    {/* <div className="w-[50%] bg-[#A72787] h-full"></div>
                    <div className="w-[50%] bg-[#A72787] h-full"></div> */}
                    <Card8Disease
                      title={"Rank 15"}
                      value={formatNumber(113578) || "0"}
                      pct={`${formatNumber(8) || 0}%`}
                      styles="w-[50%] bg-[#A72787] h-full"
                      size="s"
                    />
                    <Card8Disease
                      title={"Rank 15"}
                      value={formatNumber(113578) || "0"}
                      pct={`${formatNumber(8) || 0}%`}
                      styles="w-[50%] bg-[#A72787] h-full"
                      size="s"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-10 h-[160px] gap-3">
                  <div className="col-span-6 h-full w-full">
                    {/* <div className="w-full bg-[#A7276C] h-full"></div> */}
                    <Card8Disease
                      title={"Rank 15"}
                      value={formatNumber(113578) || "0"}
                      pct={`${formatNumber(8) || 0}%`}
                      styles="w-full bg-[#00A2B3] h-full"
                      size="m"
                    />
                  </div>
                  <div className="col-span-4 h-full w-full">
                    {/* <div className="w-full bg-[#A72787] h-full"></div> */}
                    <Card8Disease
                      title={"Rank 15"}
                      value={formatNumber(113578) || "0"}
                      pct={`${formatNumber(8) || 0}%`}
                      styles="w-full bg-[#EC407A] h-full"
                      size="s"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AnalisisAnc;
