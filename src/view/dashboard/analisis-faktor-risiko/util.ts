import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatDateChart } from "@/lib/utils";
import { TotalParticipantBasedOnTimeType } from "@/view/dashboard/monitoring-faktor-risiko/type";
import {
  SubActivityPyramidType,
  SubActivityBasedOnRegionType,
} from "@/view/dashboard/analisis-faktor-risiko/type";

export const formatChartTotalParticipant = ({
  total_participant_based_on_time,
}: {
  total_participant_based_on_time?: TotalParticipantBasedOnTimeType[];
}) => {
  const option: EChartsOptionProps = {
    color: ["#00B3AC"],
    xAxis: {
      type: "category",
      data: formatDateChart(total_participant_based_on_time || []),
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: total_participant_based_on_time?.map(
          (data: TotalParticipantBasedOnTimeType) => data.total
        ),
        type: "bar",
      },
    ],
  };
  return option;
};

export const formatChartPiramida = ({
  dataActivityPyramidBasedOnParticipant,
}: {
  dataActivityPyramidBasedOnParticipant?: SubActivityPyramidType[];
}) => {
  const res = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        const female = params.find((p: any) => p.seriesName === "Perempuan");
        const male = params.find((p: any) => p.seriesName === "Laki-laki");

        return (
          `${params[0].name}<br/>` +
          `Perempuan: ${Math.abs(female?.value)}%<br/>` +
          `Laki-laki: ${male?.value}%`
        );
      },
    },
    legend: {
      data: ["Perempuan", "Laki-laki"],
      bottom: 0,
      icon: "circle",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      min: -100, // Atur nilai minimum menjadi negatif
      max: 100, // Atur nilai maksimum menjadi positif
      axisLabel: {
        formatter: "{value}%",
        color: "#888",
      },
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: [
        "Anak Usia Sekolah IV",
        "Usia Dewasa I",
        "Usia Dewasa II",
        "Usia Dewasa III",
        "Usia Dewasa IV",
      ],
      axisLabel: {
        color: "#444",
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Perempuan",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideLeft",
          formatter: function (params: any) {
            return Math.abs(params.value) + "%";
          },
          color: "#fff",
        },
        data: dataActivityPyramidBasedOnParticipant
          ?.filter((filtering: SubActivityPyramidType) => filtering.gender === "perempuan")
          .map((mapping: SubActivityPyramidType) => -Math.abs(mapping.total_per_gender)), // Nilai negatif agar bergerak ke kiri
        itemStyle: {
          color: "#D84B4B", // Warna merah untuk "Perempuan"
        },
      },
      {
        name: "Laki-laki",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideRight",
          formatter: "{c}%",
          color: "#fff",
        },
        data: dataActivityPyramidBasedOnParticipant
          ?.filter((filtering: SubActivityPyramidType) => filtering.gender === "laki-laki")
          .map((mapping: SubActivityPyramidType) => mapping.total_per_gender), // Nilai positif agar bergerak ke kanan
        itemStyle: {
          color: "#00A2A2", // Warna biru untuk "Laki-laki"
        },
      },
    ],
  };
  return res;
};

export const formatChartPiramidaILP = ({
  dataActivityPyramidBasedOnParticipant,
}: {
  dataActivityPyramidBasedOnParticipant?: SubActivityPyramidType[];
}) => {
  const res = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        const female = params.find((p: any) => p.seriesName === "Perempuan");
        const male = params.find((p: any) => p.seriesName === "Laki-laki");

        return (
          `${params[0].name}<br/>` +
          `Perempuan: ${Math.abs(female?.value)}%<br/>` +
          `Laki-laki: ${male?.value}%`
        );
      },
    },
    legend: {
      data: ["Perempuan", "Laki-laki"],
      bottom: 0,
      icon: "circle",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      min: -100, // Atur nilai minimum menjadi negatif
      max: 100, // Atur nilai maksimum menjadi positif
      axisLabel: {
        formatter: "{value}%",
        color: "#888",
      },
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: [
        "Anak Usia Sekolah IV",
        "Usia Dewasa I",
        "Usia Dewasa II",
        "Usia Dewasa III",
        "Usia Dewasa IV",
      ],
      axisLabel: {
        color: "#444",
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Perempuan",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideLeft",
          formatter: function (params: any) {
            return Math.abs(params.value) + "%";
          },
          color: "#fff",
        },
        data: dataActivityPyramidBasedOnParticipant
          ?.filter((filtering: SubActivityPyramidType) => filtering.gender === "perempuan")
          .map((mapping: SubActivityPyramidType) => -Math.abs(mapping.total_per_ilp)), // Nilai negatif agar bergerak ke kiri
        itemStyle: {
          color: "#D84B4B", // Warna merah untuk "Perempuan"
        },
      },
      {
        name: "Laki-laki",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideRight",
          formatter: "{c}%",
          color: "#fff",
        },
        data: dataActivityPyramidBasedOnParticipant
          ?.filter((filtering: SubActivityPyramidType) => filtering.gender === "laki-laki")
          .map((mapping: SubActivityPyramidType) => mapping.total_per_ilp), // Nilai positif agar bergerak ke kanan
        itemStyle: {
          color: "#00A2A2", // Warna biru untuk "Laki-laki"
        },
      },
    ],
  };
  return res;
};

export const formatChartActivityBasedOnRegion = ({
  dataActivityBasedOnRegionBasedOnParticipant,
}: {
  dataActivityBasedOnRegionBasedOnParticipant?: SubActivityBasedOnRegionType[];
}) => {
  const res = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      max: 100, // Atur nilai maksimum menjadi positif
      axisLabel: {
        formatter: "{value}%",
        color: "#888",
      },
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: dataActivityBasedOnRegionBasedOnParticipant?.map(
        (item: SubActivityBasedOnRegionType) => item.city_name
      ),
      axisLabel: {
        color: "#444",
        fontWeight: "bold",
      },
    },
    series: [
      {
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideRight",
          formatter: "{c}%",
          color: "#fff",
        },
        data: dataActivityBasedOnRegionBasedOnParticipant?.map(
          (mapping: SubActivityBasedOnRegionType) => mapping.total_participant
        ),
        itemStyle: {
          color: "#00A2A2",
        },
      },
    ],
  };
  return res;
};
