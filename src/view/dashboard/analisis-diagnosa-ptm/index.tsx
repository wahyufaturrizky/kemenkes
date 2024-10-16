"use client";
import { DownloadButton, GraphEcharts } from "@/components";
import ButtonIcon from "@/components/button-icon";
import GraphItem from "@/components/graph-item";
import Header from "@/components/header";
import MapAnalisisiDiagnosaPTM from "@/components/map-analisis-diagnosa-ptm";
import Progress from "@/components/progress";
import SectionHeader from "@/components/sectionHeader";
import { formatNumber } from "@/helpers";
import {
  useControlledPatientIn3Month,
  useHypertensionDistributionMap,
  useHypertensionPyramid,
  usePatientLostFollowUp,
  usePatientUnderTreatment,
  useUncontrolledPatientIn3Month,
} from "@/lib/services/analisis-diagnosa-ptm/useAnalisisDiagnosaPTM";
import { useGetGraphImmunizationScopeQuery } from "@/lib/services/baby-immunization";
import { useTotalParticipant } from "@/lib/services/monitoring-diagnosa-ptm/useMonitoringDiagnosaPTM";
import { formatPercentage, removeEmptyKeys } from "@/lib/utils";
import {
  ChartType,
  FormValuesAnalisisDiagnosaPTM,
  SubDataSectionType,
} from "@/view/dashboard/analisis-diagnosa-ptm/type";
import { mapChartSection } from "@/view/dashboard/analisis-diagnosa-ptm/util";
import { formatChartBreakdownJenisKelamin } from "@/view/dashboard/monitoring-faktor-risiko/util";
import FilterMonitoringFaktorRisiko from "@/view/home/components/FilterMonitoringFaktorRisiko";
import { Spin } from "antd";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import { formatChartTotalParticipant } from "../analisis-faktor-risiko/util";
import styles from "../anc/anc.module.css";
import { BoxChart } from "./BoxChart";
import BoxSelected from "./BoxSelected";
import { initFilterSelamatDatang } from "./init-value";
import {
  formatChartActivityBasedOnRegion,
  formatChartPiramida,
  formatChartPiramidaILP,
} from "./util";

export default function AnalisisFaktorRisiko() {
  const { control, reset } = useForm<FormValuesAnalisisDiagnosaPTM>({
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

  const { data: dataTotalParticipant, isPending: isPendingTotalParticipant } = useTotalParticipant({
    query: removeEmptyKeys(filter),
  });
  const { data: dataHypertensionPyramid, isPending: isPendingHypertensionPyramid } =
    useHypertensionPyramid({
      query: removeEmptyKeys(filter),
    });
  const { data: dataHypertensionDistributionMap, isPending: isPendingHypertensionDistributionMap } =
    useHypertensionDistributionMap({
      query: removeEmptyKeys(filter),
    });
  const { data: dataPatientUnderTreatment, isPending: isPendingPatientUnderTreatment } =
    usePatientUnderTreatment({
      query: removeEmptyKeys(filter),
    });
  const { data: dataPatientLostFollowUp, isPending: isPendingPatientLostFollowUp } =
    usePatientLostFollowUp({
      query: removeEmptyKeys(filter),
    });
  const { data: dataControlledPatientIn3Month, isPending: isPendingControlledPatientIn3Month } =
    useControlledPatientIn3Month({
      query: removeEmptyKeys(filter),
    });
  const { data: dataUncontrolledPatientIn3Month, isPending: isPendingUncontrolledPatientIn3Month } =
    useUncontrolledPatientIn3Month({
      query: removeEmptyKeys(filter),
    });

  const { based_on_participant: dataHypertensionPyramidBasedOnParticipant } =
    dataHypertensionPyramid?.data?.data ?? {};

  const { total_participant_based_on_gender, total_participant_based_on_time } =
    dataTotalParticipant?.data?.data ?? {};

  const { based_on_participant: dataHypertensionDistributionMapBasedOnParticipant } =
    dataHypertensionDistributionMap?.data?.data ?? {};

  const { data: patientUnderTreatmentData } = dataPatientUnderTreatment?.data ?? {};
  const { data: dataPatientLostFollowUpData } = dataPatientLostFollowUp?.data ?? {};
  const { data: dataControlledPatientIn3MonthData } = dataControlledPatientIn3Month?.data ?? {};
  const { data: dataUncontrolledPatientIn3MonthData } = dataUncontrolledPatientIn3Month?.data ?? {};

  const {
    all_total,
    total: totalMale,
    percentage: percentageMale,
  } = total_participant_based_on_gender?.[0] ?? {};

  const { total: totalFemale, percentage: percentageFemale } =
    total_participant_based_on_gender?.[1] ?? {};

  const isLoadingSectionChart =
    isPendingPatientUnderTreatment ||
    isPendingPatientLostFollowUp ||
    isPendingControlledPatientIn3Month ||
    isPendingUncontrolledPatientIn3Month;

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
          title="Profil Piramida Penduduk Skrining Aktivitas Fisik"
          subtitle="Profil Piramida Penduduk Skrining Aktivitas Fisik"
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
                      showLoading={isPendingHypertensionPyramid}
                      graphOptions={formatChartPiramida({
                        dataHypertensionPyramidBasedOnParticipant,
                      })}
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
                      showLoading={isPendingHypertensionPyramid}
                      graphOptions={formatChartPiramidaILP({
                        dataHypertensionPyramidBasedOnParticipant,
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
          <SectionHeader
            title="Peta Sebaran Peserta Terdiagnosis Hipertensi"
            subtitle="Peta Sebaran Peserta Terdiagnosis Hipertensi"
          />
          <div className="mt-5 rounded-xl border border-[#D6D6D6] p-[13px] h-[550px]">
            {dataHypertensionDistributionMapBasedOnParticipant?.length && (
              <MapAnalisisiDiagnosaPTM
                dataHypertensionDistributionMapBasedOnParticipant={
                  dataHypertensionDistributionMapBasedOnParticipant
                }
              />
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-[#D6D6D6] col-span-12 lg:col-span-4 py-4 px-5 bg-[#4C5699]">
          <h4 className="text-white font-bold text-xl">Diagnosis Hipertensi</h4>
          <p className="text-[#EFEDFF] my-4 text-sm">
            Diurutkan dari wilayah dengan Hipertensi paling banyak:
          </p>
          <div className="bg-white shadow-md mt-5 rounded-2xl py-5 px-3">
            <div className="h-[680px] overflow-y-auto">
              <GraphItem
                showDownload={false}
                showLoading={isPendingHypertensionDistributionMap}
                graphOptions={formatChartActivityBasedOnRegion({
                  dataHypertensionDistributionMapBasedOnParticipant,
                })}
                opts={{
                  height: 1500,
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {mapChartSection({
        patientUnderTreatmentData,
        dataPatientLostFollowUpData,
        dataControlledPatientIn3MonthData,
        dataUncontrolledPatientIn3MonthData,
      }).map((data: SubDataSectionType) => {
        const { title, subTitle, chart } = data;
        return (
          <section key={title} className="w-full">
            <SectionHeader title={title} subtitle={subTitle} />

            <div className="grid grid-cols-3 gap-2">
              {chart.map((itemChart: ChartType, i: number) => {
                const { title, subTitle, dataChart, amount, note1, note2 } = itemChart;

                return (
                  <BoxChart
                    key={i}
                    title={title}
                    subTitle={subTitle}
                    amount={amount}
                    note1={note1}
                    note2={note2}
                    dataChart={dataChart}
                    showLoading={isLoadingSectionChart}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
