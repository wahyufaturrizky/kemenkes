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
interface AnalisisProps {
  btn: boolean;
}
const AnalisisAnc: React.FC<AnalisisProps> = ({ btn }) => {
  const totalData = ancGraphOptions1.map((option) => option.ya + option.tidak);
  return (
    <>
      <div className="px-4 container  ">
        {btn === false ? (
          <>
            <div className="h-[600px]">
              <GraphEchartsAnc
                graphOptions={graphOptions4(
                  [
                    {
                      name: "Jumlah",
                      data:
                        (ancGraphOptions4 || [])?.map((r: any) => r?.value) ||
                        [],
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
            </div>
            <div className="h-[600px]">
              <GraphEchartsAnc
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
            </div>
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
                      data:
                        (ancGraphOptions6 || [])?.map((r: any) => r?.pct) || [],
                    },
                  ],
                  ancGraphOptions6?.map((r: any) => r.label) || []
                )}
              />
            </div>
            <div className="h-[600px]">
              <GraphEchartsAnc
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
                      data:
                        ancGraphOptions7?.map((r: any) => r?.pct || 0) || [],
                    },
                  ],
                  ancGraphOptions7?.map((r: any) => r.label)
                )}
              />
            </div>
          </>
        ) : (
          <>
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
                      data:
                        ancGraphOptions1?.map((r: any) => r?.tidak || 0) || [],
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
            </div>
            <div className="h-[600px]">
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AnalisisAnc;
