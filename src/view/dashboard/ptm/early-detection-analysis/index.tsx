"use client";

import React, { useState, useMemo } from "react";
import { DownloadButton, GraphEcharts, Select } from "@/components";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import GraphItem from "@/components/graph-item";
import ButtonIcon from "@/components/button-icon";
import HeaderPTM from "@/components/header-ptm";
import { ptmGraphOptions, ancGtaphOptions5, dataMonth, incGraphOptions1 } from "@/utils/constants";
import { useGetGraphImmunizationScopeQuery } from "@/lib/services/baby-immunization";
import WelcomeFilterPTM from "@/components/welcome-filter-ptm";
import FilterEarlyDetectionAnalysis from "@/view/home/components/FilterEarlyDetectionAnalysis";
import SectionHeader from "@/components/sectionHeader";
import Progress from "@/components/progress";
import { graphOptions5 } from "@/view/graphOptions";
import { formatNumber } from "@/helpers";
import { graphOptions4, graphOptions6, graphOptions7 } from "../early-detection-analysis/graphOptions";

import styles from "../ptm.module.css";
import MapPTM from "@/components/mapPTM";


export default function EarlyDetectionAnalysis() {
  const filterState = useState({
    tahun: 2023,
    // tahun: new Date().getFullYear(),
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
    tipe_vaksin1: "IMUNISASI DASAR LENGKAP",
    wilayah1: "province",
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
      (!filter.bulan && (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };

  const [rergionTypeGraph1, setRegionTypeGraph1] = useState("province");

  const isBrowser = typeof window !== "undefined";
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
        top: isBrowser && window?.innerWidth >= 2500 ? "-120px" : "-180px",
        radius: ["40%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
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

  const filterGraph1 = useMemo(
    () => ({
      ...dateQuery,
      region_type: filter.wilayah1,
      vaccine_type: filter.tipe_vaksin1,
      faskes_parent: filter.faskes
        ? filter.faskes
        : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
        ? filter.kabkota
        : filter.provinsi
        ? filter.provinsi
        : "",
      // faskes_parent: filter.faskes_parent,
    }),
    [rergionTypeGraph1, filter, dateQuery]
  );

  const { data: getGraphImmunizationScope, isLoading: isLoadingGraphImmunizationScope } =
    useGetGraphImmunizationScopeQuery(filterGraph1, optionQuery);

  const dataNasional = [
    [
      1386, 976, 1473, 805, 1201, 1039, 1465, 1106, 923, 702, 1172, 731, 833, 1254, 1471, 1043,
      1347, 994, 1305, 1387, 1259, 1230, 986, 1462, 679, 1390, 931, 854, 1091, 1358, 824, 1365,
      1176, 1008, 1395, 1332, 1102, 1297,
    ], // Data pertama
    [
      1086, 1099, 1380, 1460, 1301, 896, 762, 1189, 1083, 900, 1258, 1080, 1267, 1092, 1132, 1059,
      1260, 1200, 1382, 1199, 1389, 1407, 1223, 1006, 1284, 871, 1031, 1192, 1444, 1261, 1396, 1306,
      987, 808, 1303, 799, 1299, 1004,
    ], // Data kedua
    [
      768, 1035, 1093, 1075, 1390, 762, 1177, 1176, 1003, 813, 1290, 1193, 1355, 1257, 1112, 1338,
      948, 746, 997, 1131, 1362, 1478, 1291, 1426, 1434, 819, 1322, 1495, 924, 1447, 1226, 931,
      1103, 1456, 827, 1023, 1350, 927,
    ], // Data ketiga
    [
      1296, 1258, 1337, 1351, 1284, 1436, 971, 1275, 1191, 1302, 1273, 813, 1238, 1195, 1123, 1171,
      1378, 1372, 1104, 1143, 1037, 1440, 1376, 1309, 1082, 1072, 1449, 1250, 1277, 874, 1486, 1209,
      1328, 1293, 1397, 1307, 1205, 1183,
    ], // Data keempat
  ];

  const totalData = ptmGraphOptions.map((option) => option.ya + option.tidak);

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
      1120, 1399, 888, 1333, 1222, 925, 1257, 1234, 1285, 1349, 1231, 1291, 1458, 1367, 1416, 1335,
      1138, 1453, 1294, 1160, 1178, 1446, 1278, 1295, 1279, 1057, 1169, 1348, 1417, 1124, 1339,
      1044, 1336, 1281, 1025, 1368, 1374, 1314,
    ], // Data kelima

    lineStyle: {
      width: 2,
    },
    itemStyle: {
      color: "black",
    },
  });

  return (
    <div
      className={`flex flex-col items-center p-[30px] ${styles.jakartaFont}`}
    >
      <HeaderPTM
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Pengendalian Penyakit Tidak Menular (PTM) - Deteksi Dini"
        desc="Dashboard ini menampilkan capaian hasil skrining/deteksi dini Penyakit Tidak Menular (PTM) berdasarkan data yang dikirim oleh Fasyankes ke SATUSEHAT"
        space={true}
        miniDesc={`Dashboard ini menampilkan data berdasarkan pemeriksaan pertama dari setiap jenis\nskrining PTM yang dilakukan peserta dalam 1 tahun`}
        updateTime="12/12/2024"
      />
      <WelcomeFilterPTM />

      <div className="w-full">
        <FilterEarlyDetectionAnalysis filterState={filterState} />
      </div>

      <SectionHeader title="Capaian Deteksi Dini PTM" subtitle="Deteksi Dini" />
      <div className="mt-5 grid grid-cols-12 gap-6 w-full">
        <div className="h-[600px] lg:col-span-5 col-span-12">
          <div className="grid grid-rows-12 h-full gap-6">
            <div className="rounded-2xl row-span-5 bg-[#006A65] text-white pl-10 flex flex-col justify-center relative">
              <div className="absolute top-3 right-3">
                <IoMdInformationCircleOutline size={24} color="white" />
              </div>
              <p className="text-xl font-normal">Jumlah Peserta Skrining</p>
              <p className="text-xl font-bold">Tekanan Darah</p>
              <p className="text-4xl font-normal">11,037,458</p>
            </div>
            <div className="rounded-2xl row-span-7 border border-[#D6D6D6] px-4 py-8 flex flex-col justify-between h-full">
              <p className="font-semibold text-xl">Breakdown per Jenis Kelamin</p>
              <div className="grid grid-cols-12 gap-3 max-h-[100px]">
                <div className="col-span-4 text-center">
                  <p className="text-[#3BC6BE] font-semibold mb-7">Laki-laki</p>
                  <p className="font-semibold text-[#616161]">34,753,536</p>
                  <p className="font-light text-[#616161]">(41.5%)</p>
                </div>
                <div className="col-span-4 h-[100px]">
                  <GraphEcharts graphOptions={chartOptions} />
                </div>
                <div className="col-span-4 text-center">
                  <p className="text-[#CF3E53] font-semibold mb-7">Perempuan</p>
                  <p className="font-semibold text-[#616161]">48,990,876</p>
                  <p className="font-light text-[#616161]">(58.5%)</p>
                </div>
              </div>
              <div className="mt-[10px]">
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[600px] lg:col-span-7 col-span-12 rounded-2xl border border-[#D6D6D6] py-8 pl-8 pr-2">
          <div className="relative h-[full] ">
            <GraphItem
              showDownload={false}
              graphOptions={graphOptions5(
                [
                  {
                    name: "Jumlah Bumil Anemia",
                    data: (ancGtaphOptions5 || [])?.map((r: any) => r?.jumlah) || [],
                    type: "bar",
                    label: {
                      show: false,
                    },
                  },
                  {
                    name: "% Bumil Anemia",
                    data:
                      (ancGtaphOptions5 || [])?.map((r: any) => r?.persentase_bumil_anemia) || [],
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
                    data: (ancGtaphOptions5 || [])?.map((r: any) => r?.persentase_nasional) || [],
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
          <div className="w-full flex items-end mt-20">
            <DownloadButton text="Unduh Excel" />
          </div>
        </div>
      </div>

      <section className="w-full">
        <SectionHeader
          title="Profil Piramida Penduduk Skrining Tekanan Darah"
          subtitle="Profil Piramida Penduduk Skrining Tekanan Darah"
        />
        <div className="flex mt-5 flex-wrap sm:flex-nowrap gap-4 relative  shadow-[0_1px_8px_0px_rgba(0,0,0,0.3)] rounded-[16px] p-10">
          <div className="flex-grow">
            <div className="relative flex justify-center items-center">
              <div
                className="w-full h-full overflow-scroll"
                style={{ minHeight: 550 }}
                id="graphhhh"
              >
                <GraphEcharts
                  graphOptions={graphOptions4(
                    [
                      {
                        // @ts-ignore
                        name: "Persentase",
                        data:
                          (getGraphImmunizationScope?.data || [])?.map((r: any) => ({
                            value: r?.percentage,
                            itemStyle: {
                              color: r.faskes_desc === "All" ? "#2D9CED" : undefined,
                            },
                          })) || [],
                        type: "bar",
                        label: {
                          show: true,
                          precision: 1,
                          position: "right",
                          // formatter: (params: any) => `${params.value}%`,
                          formatter: (params: any) => {
                            const reversedData = (getGraphImmunizationScope?.data || [])
                              .slice()
                              .reverse(); // Membuat salinan dan membalik urutan
                            const totalData = reversedData[params.dataIndex]?.total;
                            const valueWithComma = params?.value?.toString().replace(".", ",");

                            return filter.wilayah1 === "province" || filter.wilayah1 === "city"
                              ? `${valueWithComma}% (${formatNumber(totalData)})`
                              : `(${formatNumber(totalData)})`;
                          },
                        },
                      },
                      {
                        name: "Target",
                        type: "line",
                        color: "#CD4243",
                        data:
                          (getGraphImmunizationScope?.data || [])?.map((r: any) => r?.threshold) ||
                          [],
                      },
                      {
                        name: "Total Penerima",
                        type: "line",
                        color: "#FAC515",
                        data:
                          (getGraphImmunizationScope?.data || [])?.map((r: any) => r?.total) || [],
                        show: false, // Menyembunyikan seri secara default
                        itemStyle: {
                          opacity: 0, // Mengatur opacity item menjadi 0 untuk menyembunyikan item
                        },
                        lineStyle: {
                          opacity: 0, // Mengatur opacity garis menjadi 0 untuk menyembunyikan garis
                        },
                      },
                    ],
                    (getGraphImmunizationScope?.data || [])?.map((r: any) =>
                      r.faskes_desc === "All" ? "NASIONAL" : r.faskes_desc
                    )
                  )}
                  opts={{
                    height: 900,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mt-10 grid grid-cols-12 gap-3">
        <div className="rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-8 py-8 px-5">
          <SectionHeader title="" subtitle="Peta Sebaran Pemeriksaan Tekanan Darah" />
          <div className="mt-5 rounded-xl border border-[#D6D6D6] p-[13px] h-[550px]">
            <MapPTM />
          </div>
        </div>
        <div className="rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-4 py-4 px-5 bg-[#4C5699]">
          <h4 className="text-white font-bold text-xl">Pemeriksaan Tekanan Darah</h4>
          <p className="text-[#EFEDFF] my-4 text-sm">Diurutkan dari wilayah dengan skrining Tekanan Darah tertinggi hingga terendah
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
      </section>

      <section className="w-full">
        <SectionHeader
          title="Jumlah dan Hasil Skrining Hipertensi Berdasarkan Wilayah"
          subtitle="Tekanan Darah"
        />
        <div className="w-full mt-6  border border-[#D6D6D6] rounded-2xl pb-14 h-[600px]">
          <GraphEcharts
            graphOptions={graphOptions7(series2)}
            opts={{
              height: 500,
            }}
          />
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          title="Jumlah dan Hasil Skrining Hipertensi Berdasarkan Waktu"
          subtitle="Tekanan Darah"
        />
        <div className="w-full mt-6  border border-[#D6D6D6] rounded-2xl pb-14 h-[600px]">
          <GraphEcharts
            graphOptions={graphOptions7(series2)}
            opts={{
              height: 500,
            }}
          />
        </div>
      </section>
      {/* EarlyDetectionAnalysis View */}
    </div>
  );
}
