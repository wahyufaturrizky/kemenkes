"use client";
import { DownloadButton, GraphEcharts, Select } from "@/components";
import ButtonIcon from "@/components/button-icon";
import Header from "@/components/header";
import Progress from "@/components/progress";
import SectionHeader from "@/components/sectionHeader";
import { formatNumber } from "@/helpers";
import { dataMonth } from "@/utils/constants";
import { initFilterSelamatDatang } from "@/view/dashboard/monitoring-faktor-risiko/init-value";
import FilterMonitoringFaktorRisiko from "@/view/home/components/FilterMonitoringFaktorRisiko";
import { useState } from "react";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import styles from "../anc/anc.module.css";
import BoxDiagnosaPTM from "./BoxDiagnosaPTM";
import TableMonitoringDiagnosaPTM from "./tableMonitoringDiagnosaPTM";
import { useForm } from "react-hook-form";
import { FormValuesMonitoringDiagnosaPTM } from "@/view/dashboard/monitoring-diagnosa-ptm/type";
import BoxSelected from "./BoxSelected";
import {
  useTotalParticipant,
  useTotalVisitation,
  useDisease,
  useBloodDisorder,
  useThalassema,
  useHearingDisorder,
  useVisualDisorder,
  usePPOK,
} from "@/lib/services/monitoring-diagnosa-ptm/useMonitoringDiagnosaPTM";
import { removeEmptyKeys, formatPercentage } from "@/lib/utils";
import {
  formatChartBreakdownJenisKelamin,
  formatChartTrenBulananJumlahPeserta,
} from "@/view/dashboard/monitoring-faktor-risiko/util";
import { Spin } from "antd";

export default function MonitoringDiagnosaPTM() {
  const { control, reset } = useForm<FormValuesMonitoringDiagnosaPTM>({
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
  });
  const [filter, setFilter] = filterState;

  const { tahun, bulan, provinsi, kabkota, kecamatan } = filter;

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
    color: ["#B3261E"],
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

  const { data: dataTotalParticipant, isPending: isPendingTotalParticipant } = useTotalParticipant({
    query: removeEmptyKeys(filter),
  });
  const { data: dataTotalVisitation, isPending: isPendingTotalVisitation } = useTotalVisitation({
    query: removeEmptyKeys(filter),
  });
  const { data: dataDisease, isPending: isPendingDisease } = useDisease({
    query: removeEmptyKeys(filter),
  });
  const { data: dataBloodDisorder, isPending: isPendingBloodDisorder } = useBloodDisorder({
    query: removeEmptyKeys(filter),
  });
  const { data: dataThalassema, isPending: isPendingThalassema } = useThalassema({
    query: removeEmptyKeys(filter),
  });
  const { data: dataHearingDisorder, isPending: isPendingHearingDisorder } = useHearingDisorder({
    query: removeEmptyKeys(filter),
  });
  const { data: dataVisualDisorder, isPending: isPendingVisualDisorder } = useVisualDisorder({
    query: removeEmptyKeys(filter),
  });
  const { data: datausePPOK, isPending: isPendingusePPOK } = usePPOK({
    query: removeEmptyKeys(filter),
  });

  const { total_participant_based_on_gender, total_participant_based_on_time } =
    dataTotalParticipant?.data?.data ?? {};
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
        subtitle="Pengendalian Penyakit Tidak Menular (PTM) - Diagnosis"
        desc={`Dashboard ini menampilkan:\nmonitoring capaian Indikator ANC berdasarkan data yang dikirim oleh faskes ke SATUSEHAT`}
        space={true}
        classNameContainerGrey="px-2.5 py-6"
        note="Dashboard ini menampilkan data berdasarkan pemeriksaan pertama dari setiap jenis skrining PTM yang dilakukan peserta dalam 1 tahun"
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

      <SectionHeader title="Capaian Deteksi Dini PTM" subtitle="Diagnosa PTM" />
      <div className="mt-5 grid grid-cols-12 gap-6 w-full">
        <div className="h-[600px] lg:col-span-5 col-span-12">
          <div className="grid grid-rows-12 h-full gap-6">
            <div className="rounded-2xl row-span-5 bg-[#B3261E] text-white pl-10 flex flex-col justify-center relative">
              <div className="absolute top-3 right-3">
                <IoMdInformationCircleOutline size={24} color="white" />
              </div>
              <p className="text-xl font-normal">Jumlah Peserta Terdiagnosis</p>
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
          <div className="flex justify-between">
            <p className="font-semibold text-xl">
              Tren Bulanan Jumlah <span className="text-[#006A65]">Peserta</span>
              <br />
              Tahun {tahun}
            </p>
            <div>
              <p className="text-sm mb-2">Parameter</p>
              <Select placeholder="Bulanan" />
            </div>
          </div>
          <div className="relative h-[full] ">
            <p className="[writing-mode:vertical-rl] [transform:rotate(180deg)] absolute top-28 left-4 font-semibold text-xs text-[#616161]">
              Kunjungan [juta]
            </p>
            <GraphEcharts
              showLoading={isPendingTotalParticipant}
              graphOptions={formatChartTrenBulananJumlahPeserta({
                total_participant_based_on_time,
              })}
              opts={{ height: 400 }}
            />
          </div>
          <div className="w-full flex justify-end items-end mt-20">
            <DownloadButton text="Unduh Excel" />
          </div>
        </div>
      </div>

      <section className="w-full">
        <SectionHeader
          title="Gangguan Kardiovaskular dan Metabolik"
          subtitle="Card yang menampilkan diagnosa berkaitan dengan gangguan kardiovaskular dan metabolik"
        />
        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Penyandang Penyakit Jantung"
            subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
            titleAmount="Peserta"
            amount="715,619"
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {[1, 2, 3, 4, 5].map(() => (
              <BoxDiagnosaPTM
                title="Penyandang Penyakit Jantung"
                subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
                titleAmount=""
                showInfo={false}
                amount="715,619"
                classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4].map(() => (
            <BoxDiagnosaPTM
              title="Penyandang Penyakit Jantung"
              subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
              titleAmount="Peserta"
              amount="715,619"
              classNameContainer="rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F] flex flex-col gap-5 p-5"
            />
          ))}
        </div>
      </section>

      <section className="w-full">
        <SectionHeader title="Kanker" subtitle="Card yang menampilkan diagnosa penyakit kanker" />

        <div className="grid grid-cols-3 gap-3 my-5">
          {[1, 2, 3, 4].map(() => (
            <BoxDiagnosaPTM
              title="Penyandang Penyakit Jantung"
              subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
              titleAmount="Peserta"
              amount="715,619"
              classNameContainer="rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F] flex flex-col gap-5 p-5"
            />
          ))}
        </div>

        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Penyandang Penyakit Jantung"
            subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
            titleAmount="Peserta"
            amount="715,619"
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {[1, 2, 3, 4, 5].map(() => (
              <BoxDiagnosaPTM
                title="Penyandang Penyakit Jantung"
                subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
                titleAmount=""
                showInfo={false}
                amount="715,619"
                classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 my-5">
          {[1, 2, 3, 4].map(() => (
            <BoxDiagnosaPTM
              title="Penyandang Penyakit Jantung"
              subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
              titleAmount="Peserta"
              amount="715,619"
              classNameContainer="rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F] flex flex-col gap-5 p-5"
            />
          ))}
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          title="Gangguan Indera"
          subtitle="Card yang menampilkan diagnosa berkaitan dengan gangguan indera"
        />

        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Penyandang Penyakit Jantung"
            subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
            titleAmount="Peserta"
            amount="715,619"
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {[1, 2, 3, 4, 5].map(() => (
              <BoxDiagnosaPTM
                title="Penyandang Penyakit Jantung"
                subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
                titleAmount=""
                showInfo={false}
                amount="715,619"
                classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          title="Gangguan Pernapasan"
          subtitle="Card yang menampilkan diagnosa berkaitan dengan gangguan pernapasan"
        />

        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Penyandang Penyakit Jantung"
            subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
            titleAmount="Peserta"
            amount="715,619"
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {[1, 2, 3, 4, 5].map(() => (
              <BoxDiagnosaPTM
                title="Penyandang Penyakit Jantung"
                subTitle="57.5% dari jumlah seluruh Peserta tediagnosa"
                titleAmount=""
                showInfo={false}
                amount="715,619"
                classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
              />
            ))}
          </div>
        </div>
      </section>

      <TableMonitoringDiagnosaPTM titleTable="Tabel Data Agregat " />
    </div>
  );
}
