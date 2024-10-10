"use client";
import { DownloadButton, GraphEcharts } from "@/components";
import ButtonIcon from "@/components/button-icon";
import GraphItem from "@/components/graph-item";
import Header from "@/components/header";
import Progress from "@/components/progress";
import SectionHeader from "@/components/sectionHeader";
import { formatNumber } from "@/helpers";
import { useGetGraphImmunizationScopeQuery } from "@/lib/services/baby-immunization";
import { ancGtaphOptions5, dataMonth } from "@/utils/constants";
import { graphOptions5 } from "@/view/graphOptions";
import FilterMonitoringFaktorRisiko from "@/view/home/components/FilterMonitoringFaktorRisiko";
import { useMemo, useState } from "react";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import { graphOptions1 } from "../analisis-faktor-risiko/graphOptions";
import styles from "../anc/anc.module.css";
import TableMonitoringFaktorRisiko from "./tableMonitoringFaktorRisiko";

export default function AnalisisFaktorRisiko() {
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

  const filterGraph1a = useMemo(
    () => ({
      ...dateQuery,
      region_type: "All",
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

  return (
    <div className={`flex flex-col items-center p-[30px]  ${styles.jakartaFont}`}>
      {" "}
      <Header
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Kesehatan Anak Usia Sekolah dan Remaja"
        desc={`Dashboard ini menampilkan:\nmonitoring capaian Indikator ANC berdasarkan data yang dikirim oleh faskes ke SATUSEHAT`}
        space={true}
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
      <div className="w-full my-5">
        <p className="font-medium text-3xl">Selamat Datang !</p>
      </div>
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
              <p className="text-4xl font-normal">11,037,458</p>
            </div>
            <div className="rounded-2xl row-span-7 border border-[#D6D6D6] px-4 py-8 flex flex-col justify-between h-full">
              <p className="font-semibold text-xl">Breakdown per jenis kelamin</p>
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
                  <p className="font-semibold text-[#616161]">34,753,536</p>
                  <p className="font-light text-[#616161]">(41.5%)</p>
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
      <SectionHeader
        title="Profil Piramida Penduduk Skrining Aktivitas Fisik"
        subtitle="Profil Piramida Penduduk Skrining Aktivitas Fisik"
      />
      <div className={`flex flex-wrap sm:flex-nowrap gap-4 relative`}>
        <div className="flex-grow">
          <div className="relative flex justify-center items-center">
            <div className="w-full h-full overflow-scroll" style={{ minHeight: 550 }} id="graphhhh">
              <GraphEcharts
                graphOptions={graphOptions1(
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
      <TableMonitoringFaktorRisiko titleTable="Tabel Data Agregat" />
    </div>
  );
}
