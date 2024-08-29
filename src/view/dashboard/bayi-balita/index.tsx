"use client";
import React, { useEffect, useState } from "react";
import styles from "../anc/anc.module.css";
import Header from "@/components/header";
import { dataMonth, dataTabBaduta } from "@/utils/constants";
import TabsBias from "@/components/tabsBias";
import FilterSummaryImmunizationWus from "@/view/home/components/FilterWus";
import SectionHeader from "@/components/sectionHeader";
import { GraphEcharts, Select } from "@/components";
import { IoMdInformationCircleOutline } from "react-icons/io";
import CardDetailSasaran from "@/components/cardDetailSasaran";
import Progress from "@/components/progress";
import ProgressCard1 from "@/components/progressCard1";
import { graphOptions1, graphOptions2 } from "./graphOptions";
import TableBayiBalita from "./tableBayiBalita";
import {
  useGetTotalKidsHavingMeasurementQuery,
  useGetBalitaMinitoredMoreThan2Query,
  useGetMeaserementResultQuery,
  useGetNutritionGovernanceQuery,
  useGetVisitationAnalyticQuery,
  useGetVisitationFaskesQuery,
  useGetAnaliticIndicatorQuery,
} from "@/lib/services/bayi-balita";
export default function BayiBalita() {
  const filterState = useState({
    tahun: new Date().getFullYear(),
    bulan: dataMonth.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: "",
    kabkota: "",
    kecamatan: "",
    jenis_sarana: "",
    faskes: "",
    wilayah: "ALL",
    wilayah2: "PROVINSI",
    wilayah_name: "Provinsi",
    kewilayahan_type: 0,
    tipe_vaksin: "bias",
    nama_vaksin: "BIAS  Lengkap",
    tipe_vaksin2: "bias",
    tipe_vaksin3: "bias",
    tipe_vaksin4: "bias",
    tipe_vaksin5: "bias",
    tren_type: "kumulatif",
  });
  const [filter] = filterState;

  const dateQuery = {
    year: filter.tahun,
    month: filter.bulan,
  };

  const optionQuery = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };

  const {
    data: totalKidsMeasurement,
    isFetching: isLoadingtotalKidsMeasurement,
  } = useGetTotalKidsHavingMeasurementQuery(dateQuery, optionQuery);
  const {
    data: BalitaMinitoredMoreThan2,
    isFetching: isLoadingBalitaMinitoredMoreThan2,
  } = useGetBalitaMinitoredMoreThan2Query(dateQuery, optionQuery);
  const { data: MeaserementResult, isFetching: isLoadingMeaserementResult } =
    useGetMeaserementResultQuery(dateQuery, optionQuery);
  const {
    data: NutritionGovernance,
    isFetching: isLoadingNutritionGovernance,
  } = useGetNutritionGovernanceQuery(dateQuery, optionQuery);
  const { data: VisitationAnalytic, isFetching: isLoadingVisitationAnalytic } =
    useGetVisitationAnalyticQuery(dateQuery, optionQuery);
  const { data: VisitationFaskes, isFetching: isLoadingVisitationFaskes } =
    useGetVisitationFaskesQuery(dateQuery, optionQuery);
  const { data: AnaliticIndicator, isFetching: isLoadingAnaliticIndicator } =
    useGetAnaliticIndicatorQuery(dateQuery, optionQuery);

  // console.log(AnaliticIndicator, "isi data");

  const ageChartOptions: any = {
    color: ["#008E87", "#CF3E53"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      show: false,
    },
    series: [
      {
        name: "Total",
        type: "pie",
        radius: ["30%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 65, name: "Laki-laki" },
          { value: 35, name: "Perempuan" },
        ],
      },
    ],
  };

  const chartOptions: any = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      show: false,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        top: "-180px",
        radius: ["40%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 65, name: "Laki-laki" },
          { value: 35, name: "Perempuan" },
        ],
      },
    ],
  };

  const chartOptions2: any = {
    color: ["#006A65"],
    xAxis: {
      type: "category",
      data: dataMonth.map((data: any) => data.label.slice(0, 3)),
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3],
        type: "line",
      },
    ],
  };

  // const [tooltip, setTooltip] = useState({
  //   visible: false,
  //   content: "",
  //   position: 0,
  // });

  // const handleDocumentClick = (event: any) => {
  //   // Hide tooltip if clicking outside the progress bar
  //   if (event.target.closest(".progress-bar-container") === null) {
  //     setTooltip({ visible: false, content: "", position: 0 });
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleDocumentClick);

  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //   };
  // }, []);

  const dataNasional = [
    [
      1386, 976, 1473, 805, 1201, 1039, 1465, 1106, 923, 702, 1172, 731, 833,
      1254, 1471, 1043, 1347, 994, 1305, 1387, 1259, 1230, 986, 1462, 679, 1390,
      931, 854, 1091, 1358, 824, 1365, 1176, 1008, 1395, 1332, 1102, 1297,
    ], // Data pertama
    [
      1086, 1099, 1380, 1460, 1301, 896, 762, 1189, 1083, 900, 1258, 1080, 1267,
      1092, 1132, 1059, 1260, 1200, 1382, 1199, 1389, 1407, 1223, 1006, 1284,
      871, 1031, 1192, 1444, 1261, 1396, 1306, 987, 808, 1303, 799, 1299, 1004,
    ], // Data kedua
    [
      768, 1035, 1093, 1075, 1390, 762, 1177, 1176, 1003, 813, 1290, 1193, 1355,
      1257, 1112, 1338, 948, 746, 997, 1131, 1362, 1478, 1291, 1426, 1434, 819,
      1322, 1495, 924, 1447, 1226, 931, 1103, 1456, 827, 1023, 1350, 927,
    ], // Data ketiga
    [
      1296, 1258, 1337, 1351, 1284, 1436, 971, 1275, 1191, 1302, 1273, 813,
      1238, 1195, 1123, 1171, 1378, 1372, 1104, 1143, 1037, 1440, 1376, 1309,
      1082, 1072, 1449, 1250, 1277, 874, 1486, 1209, 1328, 1293, 1397, 1307,
      1205, 1183,
    ], // Data keempat
  ];

  const rawData = [
    [100, 302, 301, 334, 390, 330, 320, 340, 360, 380, 400, 420], // Data pertama
    [320, 132, 101, 134, 90, 230, 210, 220, 240, 260, 280, 300], // Data kedua
    [220, 182, 191, 234, 290, 330, 310, 320, 340, 360, 380, 400], // Data ketiga
    [150, 212, 201, 154, 190, 330, 410, 420, 440, 460, 480, 500], // Data keempat
    [820, 832, 901, 934, 1290, 1330, 1320, 1340, 1360, 1380, 1400, 1420], // Data kelima
  ];
  const totalData = rawData[0].map((_, idx) =>
    rawData.reduce((sum, data) => sum + data[idx], 0)
  );

  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50,
  };

  const series2: any[] = [
    "Direct",
    "Mail Ad",
    "Affiliate Ad",
    "Video Ad",
    // "Search Engine",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "60%",
      // label:
      //   sid === rawData.length - 1
      //     ? {
      //         // Hanya pada seri terakhirshow: true,
      //         position: "top", // Tampilkan di atas barformatter: (params: any) => totalData[params.dataIndex].toString(), // Tampilkan totalfontWeight: 'bold',
      //       }
      //     : undefined,
      // label: {
      //   show: sid === rawData.length - 1, // Hanya di seri terakhir
      //   position: "top",
      //   formatter: (params: any) => totalData[params.dataIndex].toString(),
      //   fontWeight: "bold",
      // },
      data: dataNasional[sid], // Menggunakan data asli tanpa pembagian
    };
  });

  series2.push({
    name: "New Line Ad",
    type: "line",
    data: [
      1120, 1399, 888, 1333, 1222, 925, 1257, 1234, 1285, 1349, 1231, 1291,
      1458, 1367, 1416, 1335, 1138, 1453, 1294, 1160, 1178, 1446, 1278, 1295,
      1279, 1057, 1169, 1348, 1417, 1124, 1339, 1044, 1336, 1281, 1025, 1368,
      1374, 1314,
    ], // Data kelima

    lineStyle: {
      width: 2,
    },
    itemStyle: {
      color: "black",
    },
  });

  const series: any[] = [
    {
      name: "Direct",
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: false,
      },
      itemStyle: {
        color: "#00B3AC", // Mengubah warna seri ini menjadi biru
      },
      data: rawData[0],
    },
    {
      name: "Mail Ad",
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: false,
      },
      itemStyle: {
        color: "#00626D", // Mengubah warna seri ini menjadi hijau
      },
      data: rawData[1],
    },
    {
      name: "Affiliate Ad",
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: false,
      },
      itemStyle: {
        color: "#FF8800", // Mengubah warna seri ini menjadi ungu
      },
      data: rawData[2],
    },
    {
      name: "Video Ad",
      type: "bar",
      stack: "total",
      barWidth: "60%",
      // label: {
      //   show: false,
      // },
      itemStyle: {
        color: "#008E87", // Mengubah warna seri ini menjadi oranye
      },
      label: {
        show: true,
        position: "top",
        formatter: (params: any) => totalData[params.dataIndex].toString(), // Menampilkan total data
        fontWeight: "bold",
        color: "#CF3E53",
      },
      data: rawData[3],
    },
    // {
    //   name: "Search Engine",
    //   type: "bar",
    //   stack: "total",
    //   barWidth: "60%",
    //   label: {
    //     show: true,
    //     position: "top",
    //     formatter: (params: any) => totalData[params.dataIndex].toString(),
    //     fontWeight: "bold",
    //   },
    //   itemStyle: {
    //     color: "red", // Mengubah warna seri ini menjadi merah
    //   },
    //   data: rawData[4],
    // },
    // {
    //   name: "New Line Ad",
    //   type: "line",
    //   data: [150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700],
    //   lineStyle: {
    //     width: 2,
    //     color: "black", // Warna garis untuk seri line
    //   },
    // },
  ];

  const chartOptions3: any = {
    legend: {
      selectedMode: false,
      icon: "circle",
      bottom: -5,
    },
    grid,
    yAxis: {
      type: "value",
    },
    xAxis: {
      type: "category",
      data: dataMonth.map((data: any) => data.label.slice(0, 3)),
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        let tooltipText = params[0].name + "<br/>";
        params.forEach((item: any) => {
          tooltipText += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
        });
        return tooltipText;
      },
    },
    series,
  };

  // const chartOptions4: any = {
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       type: "shadow",
  //     },
  //   },
  //   legend: {
  //     data: ["Perempuan", "Laki-laki"],
  //     bottom: 0,
  //   },
  //   grid: {
  //     left: "3%",
  //     right: "4%",
  //     bottom: "10%",
  //     containLabel: true,
  //   },
  //   xAxis: {
  //     type: "value",
  //     min: 0,
  //     max: 100,
  //     axisLabel: {
  //       formatter: "{value}%",
  //       color: "#888",
  //     },
  //   },
  //   yAxis: {
  //     type: "category",
  //     data: ["Tinggi", "Normal", "Pendek", "Sangat Pendek"],
  //     axisLabel: {
  //       color: "#444",
  //       fontWeight: "bold",
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Perempuan",
  //       type: "bar",
  //       stack: "total",
  //       label: {
  //         show: true,
  //         position: "insideLeft",
  //         formatter: "{c}%",
  //         color: "#fff",
  //       },
  //       data: [55, 40, 60, 70],
  //       itemStyle: {
  //         color: "#D84B4B", // color for "Perempuan"
  //       },
  //     },
  //     {
  //       name: "Laki-laki",
  //       type: "bar",
  //       stack: "total",
  //       label: {
  //         show: true,
  //         position: "insideRight",
  //         formatter: "{c}%",
  //         color: "#fff",
  //       },
  //       data: [45, 60, 40, 30],
  //       itemStyle: {
  //         color: "#00A2A2", // color for "Laki-laki"
  //       },
  //     },
  //   ],
  // };

  const chartOptions4 = {
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
          `Perempuan: ${Math.abs(female.value)}%<br/>` +
          `Laki-laki: ${male.value}%`
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
      data: ["Tinggi", "Normal", "Pendek", "Sangat Pendek"],
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
        data: [-55, -40, -60, -70], // Nilai negatif agar bergerak ke kiri
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
        data: [45, 60, 40, 30], // Nilai positif agar bergerak ke kanan
        itemStyle: {
          color: "#00A2A2", // Warna biru untuk "Laki-laki"
        },
      },
    ],
  };

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
      <TabsBias
        data={dataTabBaduta}
        variant="private"
        value={filter.kewilayahan_type}
        filterState={filterState}
      />
      <div className="w-full">
        <FilterSummaryImmunizationWus filterState={filterState} />
      </div>
      <SectionHeader
        title="Sasaran Balita"
        subtitle="Jumlah individu berusia 0-59 bulan 29 hari yang mendapatkan pengukuran antropometri dan pemantauan perkembangan "
      />
      <div className="w-full mt-10 grid grid-cols-12 gap-3">
        <div className="h-[418px] rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-7 py-8 px-5">
          <div className="h-full grid grid-cols-12">
            <div className="h-full col-span-5 flex flex-col justify-between">
              <div>
                <p className="font-bold text-2xl text-[#505581]">
                  Jumlah Sasaran Balita
                </p>
                <p className="font-bold text-5xl text-[#505581] mt-3">
                  555.875
                </p>
              </div>
              <div>
                <div className="flex">
                  <div className="bg-[#008E87] h-5 w-5  rounded mr-2 mb-3 text-lg font-medium"></div>
                  <p>Laki-laki</p>
                </div>
                <div className="flex">
                  <div className="bg-[#CF3E53] h-5 w-5  rounded mr-2 text-lg font-medium"></div>
                  <p>Perempuan</p>
                </div>
              </div>
            </div>
            <div className="h-full col-span-7">
              <GraphEcharts graphOptions={ageChartOptions} />
            </div>
          </div>
        </div>
        <div className="h-[418px] rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-5 py-8 px-6">
          <p className="font-bold text-2xl text-[#505581] mb-3">
            Detail Sasaran Balita
          </p>
          <div className="grid grid-cols-12 gap-3">
            <CardDetailSasaran
              title="Bayi Baru Lahir"
              subtitle="(0-28 Hari)"
              value="500"
              pct="1.90%"
              isLoading={false}
              className="h-[150px] col-span-6 bg-[#00B8AE] rounded-xl p-3"
            />
            <CardDetailSasaran
              title="Bayi Baru Lahir"
              subtitle="(0-28 Hari)"
              value="500"
              pct="1.90%"
              isLoading={false}
              className="h-[150px] col-span-6 bg-[#00B8AE] rounded-xl p-3"
            />
            <CardDetailSasaran
              title="Bayi Baru Lahir"
              subtitle="(0-28 Hari)"
              value="500"
              pct="1.90%"
              isLoading={false}
              className="h-[150px] col-span-6 bg-[#00B8AE] rounded-xl p-3"
            />
            <CardDetailSasaran
              title="Bayi Baru Lahir"
              subtitle="(0-28 Hari)"
              value="500"
              pct="1.90%"
              isLoading={false}
              className="h-[150px] col-span-6 bg-[#00B8AE] rounded-xl p-3"
            />
          </div>
        </div>
      </div>
      <SectionHeader
        title="Pemantauan Pertumbuhan dan Perkembangan"
        subtitle="Jumlah individu berusia 0-59 bulan 29 hari yang mendapatkan pengukuran antropometri dan pemantauan perkembangan"
      />
      <div className="h-[300px] grid grid-cols-12 gap-3 w-full mt-5">
        <ProgressCard1
          title="Total Anak Mendapatkan Pengukuran"
          sub="&ge; 2 kali/ tahun"
          total={9000}
          pct={70}
          pct2={2}
          data={[
            {
              color: "#CF3E53",
              label: "Perempuan",
              value: 5500,
              percentage: 70,
            },
            {
              color: "#3BC6BE",
              label: "Laki-laki",
              value: 3500,
              percentage: 30,
            },
          ]}
        />
        <ProgressCard1
          title="Total Anak Mendapatkan Pengukuran"
          total={9000}
          pct={70}
          pct2={2}
          data={[
            {
              color: "#CF3E53",
              label: "Perempuan",
              value: 5500,
              percentage: 70,
            },
            {
              color: "#3BC6BE",
              label: "Laki-laki",
              value: 3500,
              percentage: 30,
            },
          ]}
        />
      </div>
      <SectionHeader
        title="Capaian Indikator"
        subtitle="Capaian indikator kesehatan terkait layanan bayi dan balita"
      />
      <div className="grid grid-cols-12 gap-3 w-full mt-5">
        <div className="col-span-4 rounded-xl border border-[#D6D6D6] h-[300px] py-6 px-8 text-[#505581]">
          <p className="font-bold text-2xl">Hasil Pengukuran</p>
          <div className="mt-[21px]">
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"Kenaikan Berat Badan"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#FFB0AA",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"BB/U"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#00626D",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"TB/U"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#00626D",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"TB/U"}
            />
          </div>
        </div>
        <div className="col-span-4 rounded-xl border border-[#D6D6D6] h-[300px] py-6 px-8 text-[#505581]">
          <p className="font-bold text-2xl">Hasil Pengukuran</p>
          <div className="mt-[21px]">
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"Kenaikan Berat Badan"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#FFB0AA",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"BB/U"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#00626D",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"TB/U"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#00626D",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"TB/U"}
            />
          </div>
        </div>
        <div className="col-span-4 rounded-xl border border-[#D6D6D6] h-[300px] py-6 px-8 text-[#505581]">
          <p className="font-bold text-2xl">Hasil Pengukuran</p>
          <div className="mt-[21px]">
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"Kenaikan Berat Badan"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#FFB0AA",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"BB/U"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#00626D",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"TB/U"}
            />
            <Progress
              data={[
                {
                  color: "#CF3E53",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#FFB0AA",
                  label: "Perempuan",
                  value: 5500,
                  percentage: 70,
                },
                {
                  color: "#3BC6BE",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
                {
                  color: "#00626D",
                  label: "Laki-laki",
                  value: 3500,
                  percentage: 30,
                },
              ]}
              title={"TB/U"}
            />
          </div>
        </div>
      </div>
      <SectionHeader title="Analisis Bayi/Balita" />
      <div className="mt-5 grid grid-cols-12 gap-6 w-full">
        <div className="h-[388px] lg:col-span-5 col-span-12">
          <div className="grid grid-rows-12 h-full gap-6">
            <div className="rounded-2xl row-span-5 bg-[#006A65] text-white pl-10 flex flex-col justify-center relative">
              <div className="absolute top-3 right-3">
                <IoMdInformationCircleOutline size={24} color="white" />
              </div>
              <p className="text-4xl font-normal">11,037,458</p>
              <p className="text-xl font-normal">Kunjungan</p>
            </div>
            <div className="rounded-2xl row-span-7 border border-[#D6D6D6] px-4 py-8 flex flex-col justify-between">
              <p className="font-semibold text-xl">
                Breakdown berdasarkan jenis kelamin
              </p>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4 text-center">
                  <p className="text-[#3BC6BE] font-semibold mb-7">Laki-laki</p>
                  <p className="font-semibold text-[#616161]">34,753,536</p>
                  <p className="font-light text-[#616161]">(41.5%)</p>
                </div>
                <div className="col-span-4 h-full">
                  <GraphEcharts graphOptions={chartOptions} />
                </div>
                <div className="col-span-4 text-center">
                  <p className="text-[#CF3E53] font-semibold mb-7">Perempuan</p>
                  <p className="font-semibold text-[#616161]">34,753,536</p>
                  <p className="font-light text-[#616161]">(41.5%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[388px] lg:col-span-7 col-span-12 rounded-2xl border border-[#D6D6D6] py-8 pl-8 pr-2">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">
              Tren Bulanan Jumlah{" "}
              <span className="text-[#006A65]">Kunjungan</span>
              <br />
              Tahun 2023
            </p>
            <div>
              <p className="text-sm mb-2">Parameter</p>
              <Select placeholder="Bulanan" />
            </div>
          </div>
          <div className="relative">
            <p className="[writing-mode:vertical-rl] [transform:rotate(180deg)] absolute top-24 left-4 font-semibold text-xs text-[#616161]">
              Kunjungan [juta]
            </p>
            <GraphEcharts graphOptions={chartOptions2} />
            <div className="bg-yellow-100 col-span-11"></div>
          </div>
        </div>
      </div>
      <SectionHeader
        title="Kunjungan Bayi/ Balita ke Fasilitas Kesehatan"
        subtitle="Jumlah kunjungan bayi dan balita ke fasilitas kesehatan berdasarkan waktu"
      />
      <div className="w-full mt-6  border border-[#D6D6D6] rounded-2xl pb-14">
        <GraphEcharts
          graphOptions={graphOptions1([
            {
              name: "Direct",
              type: "bar",
              stack: "total",
              barWidth: "60%",
              label: {
                show: false,
              },
              itemStyle: {
                color: "#00B3AC", // Mengubah warna seri ini menjadi biru
              },
              data: rawData[0],
            },
            {
              name: "Mail Ad",
              type: "bar",
              stack: "total",
              barWidth: "60%",
              label: {
                show: false,
              },
              itemStyle: {
                color: "#00626D", // Mengubah warna seri ini menjadi hijau
              },
              data: rawData[1],
            },
            {
              name: "Affiliate Ad",
              type: "bar",
              stack: "total",
              barWidth: "60%",
              label: {
                show: false,
              },
              itemStyle: {
                color: "#FF8800", // Mengubah warna seri ini menjadi ungu
              },
              data: rawData[2],
            },
            {
              name: "Video Ad",
              type: "bar",
              stack: "total",
              barWidth: "60%",
              // label: {
              //   show: false,
              // },
              itemStyle: {
                color: "#008E87", // Mengubah warna seri ini menjadi oranye
              },
              label: {
                show: true,
                position: "top",
                formatter: (params: any) =>
                  totalData[params.dataIndex].toString(), // Menampilkan total data
                fontWeight: "bold",
                color: "#CF3E53",
              },
              data: rawData[3],
            },
          ])}
        />
      </div>
      <SectionHeader
        title="Analisa Capaian Indikator Berdasarkan Waktu"
        subtitle="Analisa capaian indikator kesehatan bayi dan balita berdasarkan waktu"
      />
      <div className="w-full mt-6  border border-[#D6D6D6] rounded-2xl pb-14">
        <div className="flex justify-between mx-7 mt-7">
          <Select placeholder="Indikator" />
          <a href="#" className="text-red-600  italic">
            *Klik untuk info lebih detail
          </a>
        </div>
        <GraphEcharts
          graphOptions={graphOptions1([
            {
              name: "Direct",
              type: "bar",
              stack: "total",
              barWidth: "60%",
              label: {
                show: false,
              },
              itemStyle: {
                color: "#AA0000", // Mengubah warna seri ini menjadi biru
              },
              data: rawData[0],
            },
            {
              name: "Mail Ad",
              type: "bar",
              stack: "total",
              barWidth: "60%",
              label: {
                show: false,
              },
              itemStyle: {
                color: "#E62E05", // Mengubah warna seri ini menjadi hijau
              },
              data: rawData[1],
            },
            {
              name: "Affiliate Ad",
              type: "bar",
              stack: "total",
              barWidth: "60%",
              label: {
                show: false,
              },
              itemStyle: {
                color: "#27A762", // Mengubah warna seri ini menjadi ungu
              },
              data: rawData[2],
            },
            {
              name: "Video Ad",
              type: "bar",
              stack: "total",
              barWidth: "60%",
              // label: {
              //   show: false,
              // },
              itemStyle: {
                color: "#0087F4", // Mengubah warna seri ini menjadi oranye
              },
              data: rawData[3],
            },
            {
              name: "New Line Ad",
              type: "line",
              data: [
                150, 170, 250, 350, 350, 500, 100, 500, 200, 800, 650, 560,
              ], // Contoh data untuk seri line
              lineStyle: {
                width: 2,
              },
              itemStyle: {
                color: "black",
              },
            },
          ])}
        />
      </div>
      <SectionHeader
        title="Analisa Capaian Indikator Berdasarkan Kewilayahan"
        subtitle="Analisa capaian indikator kesehatan bayi dan balita berdasarkan wilayah"
      />
      <div className="w-full mt-6  border border-[#D6D6D6] rounded-2xl pb-14 h-[600px]">
        <div className="flex justify-between mx-7 mt-7">
          <Select placeholder="Indikator" />
          <a href="#" className="text-red-600  italic">
            *Klik untuk info lebih detail
          </a>
        </div>
        <GraphEcharts
          graphOptions={graphOptions2(series2)}
          opts={{
            height: 500,
          }}
        />
      </div>
      <SectionHeader
        title="Analisa Berdasarkan Jenis Kelamin"
        subtitle="Analisa capaian indikator kesehatan bayi dan balita berdasarkan jenis kelamin"
      />
      <div className="w-full mt-6 pb-14">
        <div className="flex justify-between mx-7 mt-7">
          <Select placeholder="Indikator" />
          <a href="#" className="text-red-600  italic">
            *Klik untuk info lebih detail
          </a>
        </div>
        <GraphEcharts graphOptions={chartOptions4} />
      </div>
      <TableBayiBalita />
    </div>
  );
}
