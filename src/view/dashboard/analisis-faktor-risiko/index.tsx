"use client";
import { DownloadButton, GraphEcharts } from "@/components";
import ButtonIcon from "@/components/button-icon";
import GraphItem from "@/components/graph-item";
import Header from "@/components/header";
import MapAnalisisiFaktorRisiko from "@/components/map-analisis-faktor-risiko";
import Progress from "@/components/progress";
import SectionHeader from "@/components/sectionHeader";
import { formatNumber } from "@/helpers";
import {
  useActivityBasedOnRegion,
  useActivityCheckDistribution,
  useActivityPyramid,
  useTotalParticipant,
} from "@/lib/services/analisis-faktor-risiko/useAnalisisFaktorRisiko";
import { formatPercentage, removeEmptyKeys } from "@/lib/utils";
import { FormValuesAnalisisFaktorRisiko } from "@/view/dashboard/analisis-faktor-risiko/type";
import {
  formatChartActivityBasedOnRegion,
  formatChartPiramida,
  formatChartPiramidaILP,
  formatChartTotalParticipant,
} from "@/view/dashboard/analisis-faktor-risiko/util";
import { formatChartBreakdownJenisKelamin } from "@/view/dashboard/monitoring-faktor-risiko/util";
import FilterMonitoringFaktorRisiko from "@/view/home/components/FilterMonitoringFaktorRisiko";
import { Spin } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import { graphOptions7 } from "../analisis-faktor-risiko/graphOptions";
import styles from "../anc/anc.module.css";
import BoxSelected from "./BoxSelected";
import { initFilterSelamatDatang } from "./init-value";

export default function AnalisisDiagnosaPTM() {
  const { control, reset } = useForm<FormValuesAnalisisFaktorRisiko>({
    defaultValues: {
      filterSelamatDatang: "",
      subFilterSelamatDatang: "",
    },
  });

  const filterState = useState({
    tahun: 2023,
    // tahun: new Date().getFullYear(),
    // bulan: dataMonth.find((r, i) => i === new Date().getMonth())?.value,
    bulan: "",
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

  const isBrowser = typeof window !== "undefined";

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
      data: dataNasional[sid],
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

  const { data: dataTotalParticipant, isPending: isPendingTotalParticipant } = useTotalParticipant({
    query: removeEmptyKeys(filter),
  });
  const { data: dataActivityPyramid, isPending: isPendingActivityPyramid } = useActivityPyramid({
    query: removeEmptyKeys(filter),
  });
  const { data: dataActivityCheckDistribution } = useActivityCheckDistribution({
    query: removeEmptyKeys(filter),
  });
  const { data: dataActivityBasedOnRegion, isPending: isPendingActivityBasedOnRegion } =
    useActivityBasedOnRegion({
      query: removeEmptyKeys(filter),
    });

  const { total_participant_based_on_gender, total_participant_based_on_time } =
    dataTotalParticipant?.data?.data ?? {};
  const { based_on_participant: dataActivityPyramidBasedOnParticipant } =
    dataActivityPyramid?.data?.data ?? {};
  const { based_on_participant: dataActivityCheckDistributionBasedOnParticipant } =
    dataActivityCheckDistribution?.data?.data ?? {};
  const { based_on_participant: dataActivityBasedOnRegionBasedOnParticipant } =
    dataActivityBasedOnRegion?.data?.data ?? {};

  const {
    all_total,
    total: totalMale,
    percentage: percentageMale,
  } = total_participant_based_on_gender?.[0] ?? {};

  const { total: totalFemale, percentage: percentageFemale } =
    total_participant_based_on_gender?.[1] ?? {};

  return (
    <div className={`flex flex-col items-center p-[30px]  ${styles.jakartaFont}`}>
      <Header
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Kesehatan Anak Usia Sekolah dan Remaja"
        desc={`Dashboard ini menampilkan:\nmonitoring capaian Indikator ANC berdasarkan data yang dikirim oleh faskes ke SATUSEHAT`}
        space={true}
        note="Dashboard ini menampilkan data berdasarkan pemeriksaan pertama dari setiap jenis skrining PTM yang dilakukan peserta dalam 1 tahun"
        classNameContainerGrey="px-2.5 py-6"
      />
      <div className="w-full my-5">
        <div className="flex justify-end">
          <ButtonIcon
            classNameContainer="bg-primary w-[203px] flex h-9 rounded-[50px] justify-center items-center px-2 whitespace-nowrap cursor-pointer"
            text="Halaman Kunjungan"
            classNameText="font-bold text-white pl-1"
            icon={<IoMdArrowForward size={25} color="white" />}
          />
        </div>
      </div>
      <section className="my-5 grid grid-cols-4 gap-4 items-center w-full">
        <p className="font-medium text-3xl">Selamat Datang !</p>

        {initFilterSelamatDatang.map((data) => (
          <BoxSelected
            key={data.subTitle}
            {...data}
            control={control}
            reset={reset}
            name="filterSelamatDatang"
            subName="subFilterSelamatDatang"
          />
        ))}
      </section>
      <div className="w-full">
        <FilterMonitoringFaktorRisiko filterState={filterState} />
      </div>
      <SectionHeader title="Capaian Deteksi Dini PTM" subtitle="Faktor Risiko" />
      <div className="mt-5 grid grid-cols-12 gap-6 w-full">
        <div className="h-[600px] lg:col-span-5 col-span-12">
          <div className="grid grid-rows-12 h-full gap-6">
            <div className="rounded-2xl row-span-5 bg-[#006A65] text-white pl-10 flex flex-col justify-center relative">
              <div className="absolute top-3 right-3">
                <IoMdInformationCircleOutline size={24} color="white" />
              </div>
              <p className="text-xl font-normal">Jumlah Peserta Skrining</p>
              <p className="text-xl font-bold">Aktivtas Fisik</p>
              <p className="text-4xl font-normal">
                {isPendingTotalParticipant ? "Loading..." : formatNumber(Number(all_total))}
              </p>
            </div>
            <div className="rounded-2xl row-span-7 border border-[#D6D6D6] px-4 py-8 flex flex-col justify-between h-full">
              <p className="font-semibold text-xl">Breakdown per jenis kelamin</p>
              <div className="grid grid-cols-12 gap-3 max-h-[100px]">
                <div className="col-span-4 text-center">
                  <p className="text-[#3BC6BE] font-semibold mb-7">Laki-laki</p>
                  <p className="font-semibold text-[#616161]">
                    {isPendingTotalParticipant ? "Loading..." : formatNumber(Number(totalMale))}
                  </p>
                  <p className="font-light text-[#616161]">
                    (
                    {isPendingTotalParticipant
                      ? "Loading..."
                      : formatPercentage(Number(percentageMale))}
                    %)
                  </p>
                </div>
                <div className="col-span-4 h-[300px]">
                  <GraphEcharts
                    showLoading={isPendingTotalParticipant}
                    graphOptions={formatChartBreakdownJenisKelamin({
                      isBrowser,
                      totalFemale,
                      totalMale,
                    })}
                  />
                </div>
                <div className="col-span-4 text-center">
                  <p className="text-[#CF3E53] font-semibold mb-7">Perempuan</p>
                  <p className="font-semibold text-[#616161]">
                    {isPendingTotalParticipant ? "Loading..." : formatNumber(Number(totalFemale))}
                  </p>
                  <p className="font-light text-[#616161]">
                    (
                    {isPendingTotalParticipant
                      ? "Loading..."
                      : formatPercentage(Number(percentageFemale))}
                    %)
                  </p>
                </div>
              </div>
              <div className="mt-[10px]">
                {isPendingTotalParticipant ? (
                  <div className="w-full flex justify-center">
                    <Spin tip="Loading..." />
                  </div>
                ) : (
                  <Progress
                    data={[
                      {
                        color: "#CF3E53",
                        label: "Perempuan",
                        value: totalFemale,
                        percentage: percentageFemale,
                      },
                      {
                        color: "#3BC6BE",
                        label: "Laki-laki",
                        value: totalMale,
                        percentage: percentageMale,
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[600px] lg:col-span-7 col-span-12 rounded-2xl border border-[#D6D6D6] py-8 pl-8 pr-2">
          <div className="relative h-[full] ">
            <GraphItem
              showDownload={false}
              graphOptions={formatChartTotalParticipant({
                total_participant_based_on_time,
              })}
              opts={{ height: 500 }}
            />
          </div>
          <DownloadButton />
        </div>
      </div>
      <section className="w-full">
        <SectionHeader
          title="Profil Piramida Penduduk Tediagnosis Hipertensi"
          subtitle="Profil Piramida Penduduk Tediagnosis Hipertensi"
        />
        <div className="flex mt-5 flex-wrap sm:flex-nowrap gap-4 relative  shadow-[0_1px_8px_0px_rgba(0,0,0,0.3)] rounded-[16px] p-10">
          <div className="flex-grow">
            <div className="relative flex justify-center items-center">
              <div
                className="w-full h-full overflow-scroll"
                style={{ minHeight: 550 }}
                id="graphhhh"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-plus-jakarta-sans font-bold text-sm text-center">
                      Hasil Skrining <span className="text-[#3BC6BE]">Aktivitas Fisik</span>{" "}
                      Berdasarkan Jenis Kelamin
                    </p>
                    <GraphEcharts
                      showLoading={isPendingActivityPyramid}
                      graphOptions={formatChartPiramida({ dataActivityPyramidBasedOnParticipant })}
                      opts={{
                        height: 900,
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-plus-jakarta-sans font-bold text-sm text-center">
                      Hasil Skrining <span className="text-[#3BC6BE]">Aktivitas Fisik</span>{" "}
                      Berdasarkan Umur ILP
                    </p>
                    <GraphEcharts
                      showLoading={isPendingActivityPyramid}
                      graphOptions={formatChartPiramidaILP({
                        dataActivityPyramidBasedOnParticipant,
                      })}
                      opts={{
                        height: 900,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full mt-10 grid grid-cols-12 gap-3">
        <div className="rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-8 py-8 px-5">
          <SectionHeader title="" subtitle="Peta Capaian Penerima Layanan Dasar" />
          <div className="mt-5 rounded-xl border border-[#D6D6D6] p-[13px] h-[550px]">
            {dataActivityCheckDistributionBasedOnParticipant?.length && (
              <MapAnalisisiFaktorRisiko
                dataActivityCheckDistributionBasedOnParticipant={
                  dataActivityCheckDistributionBasedOnParticipant
                }
              />
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-4 py-4 px-5 bg-[#4C5699]">
          <h4 className="text-white font-bold text-xl">Pemeriksaan Aktivittas Fisik</h4>
          <p className="text-[#EFEDFF] my-4 text-sm">
            Diurutkan dari wilayah dengan skrining Aktivitas Fisik tertinggi hingga terendah
          </p>
          <div className="bg-white shadow-md rounded-2xl py-5 px-3">
            <div className="h-[680px] overflow-y-auto">
              <GraphItem
                showDownload={false}
                showLoading={isPendingActivityBasedOnRegion}
                graphOptions={formatChartActivityBasedOnRegion({
                  dataActivityBasedOnRegionBasedOnParticipant,
                })}
                opts={{
                  height: 31999,
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <SectionHeader
          title="Aktivitas Fisik Berdasarkan Wilayah"
          subtitle="Kurang Aktivitas Fisik"
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
          title="Aktivitas Fisik Berdasarkan Waktu"
          subtitle="Kurang Aktivitas Fisik"
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
    </div>
  );
}
