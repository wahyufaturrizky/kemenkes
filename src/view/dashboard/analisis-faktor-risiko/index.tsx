"use client";
import { DownloadButton, GraphEcharts, Select } from "@/components";
import ButtonIcon from "@/components/button-icon";
import CardPemeriksaan from "@/components/cardPemeriksaan";
import Header from "@/components/header";
import Progress from "@/components/progress";
import SectionHeader from "@/components/sectionHeader";
import { formatNumber } from "@/helpers";
import {
  useGetAnemiaScreeningQuery,
  useGetBloodPresureQuery,
  useGetBodyMassIndexAgeQuery,
  useGetCigaretteSmokingQuery,
  useGetFitnessQuery,
  useGetHealthQuery,
  useGetHearingQuery,
  useGetMentalHealthQuery,
  useGetNapzaScreeningQuery,
  useGetSmokingQuery,
  useGetVisionQuery,
} from "@/lib/services/monitoring-faktor-risiko";
import { ancGtaphOptions5, dataMonth } from "@/utils/constants";
import FilterMonitoringFaktorRisiko from "@/view/home/components/FilterMonitoringFaktorRisiko";
import { useState } from "react";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import styles from "../anc/anc.module.css";
import TableMonitoringFaktorRisiko from "./tableMonitoringFaktorRisiko";
import GraphItem from "@/components/graph-item";
import { graphOptions5 } from "@/view/graphOptions";

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

  const { data: BodyMassIndexAge, isFetching: isLoadingBodyMassIndexAge } =
    useGetBodyMassIndexAgeQuery(dateQuery, optionQuery);
  const { data: BloodPresure, isFetching: isLoadingBloodPresure } = useGetBloodPresureQuery(
    dateQuery,
    optionQuery
  );
  const { data: Vision, isFetching: isLoadingVision } = useGetVisionQuery(dateQuery, optionQuery);
  const { data: Hearing, isFetching: isLoadingHearing } = useGetHearingQuery(
    dateQuery,
    optionQuery
  );
  const { data: MentalHealth, isFetching: isLoadingMentalHealth } = useGetMentalHealthQuery(
    dateQuery,
    optionQuery
  );
  const { data: NapzaScreening, isFetching: isLoadingNapzaScreening } = useGetNapzaScreeningQuery(
    dateQuery,
    optionQuery
  );
  const { data: Health, isFetching: isLoadingHealth } = useGetHealthQuery(dateQuery, optionQuery);
  const { data: Fitness, isFetching: isLoadingFitness } = useGetFitnessQuery(
    dateQuery,
    optionQuery
  );
  const { data: AnemiaScreening, isFetching: isLoadingAnemiaScreening } =
    useGetAnemiaScreeningQuery(dateQuery, optionQuery);
  const { data: Smoking, isFetching: isLoadingSmoking } = useGetSmokingQuery(
    dateQuery,
    optionQuery
  );
  const { data: CigaretteSmoking, isFetching: isLoadingCigaretteSmoking } =
    useGetCigaretteSmokingQuery(dateQuery, optionQuery);

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

  const chartOptions2: any = {
    color: ["#006A65"],
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return `${params.marker} ${params.name}: ${formatNumber(params.value)}`;
      },
    },
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
  const dataSD = [30, 40, 50, 60, 80];
  const dataSMP = [45, 55, 65, 75, 85];
  const dataSMA = [40, 50, 60, 70, 80];

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
      <div className="px-4">
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
        <div className="grid grid-cols-12 w-full gap-3 mt-5"></div>

        <TableMonitoringFaktorRisiko titleTable="Tabel Data Agregat" />
      </div>
    </div>
  );
}
