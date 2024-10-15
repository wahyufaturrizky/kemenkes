"use client";
import { DownloadButton, GraphEcharts, Select } from "@/components";
import ButtonIcon from "@/components/button-icon";
import Header from "@/components/header";
import Progress from "@/components/progress";
import SectionHeader from "@/components/sectionHeader";
import { formatNumber } from "@/helpers";
import {
  useBloodDisorder,
  useDisease,
  useHearingDisorder,
  usePPOK,
  useTableAggregate,
  useThalassema,
  useTotalParticipant,
  useTotalVisitation,
  useVisualDisorder,
} from "@/lib/services/monitoring-diagnosa-ptm/useMonitoringDiagnosaPTM";
import { formatPercentage, removeEmptyKeys } from "@/lib/utils";
import { FormValuesMonitoringDiagnosaPTM } from "@/view/dashboard/monitoring-diagnosa-ptm/type";
import {
  formatBloodDisorderMap,
  formatHearingDisorderMap,
  formatPPOKMap,
  formatVisualDisorderMap,
} from "@/view/dashboard/monitoring-diagnosa-ptm/util";
import { initFilterSelamatDatang } from "@/view/dashboard/monitoring-faktor-risiko/init-value";
import {
  formatChartBreakdownJenisKelamin,
  formatChartTrenBulananJumlahPeserta,
} from "@/view/dashboard/monitoring-faktor-risiko/util";
import FilterMonitoringFaktorRisiko from "@/view/home/components/FilterMonitoringFaktorRisiko";
import { Spin } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import styles from "../anc/anc.module.css";
import BoxDiagnosaPTM from "./BoxDiagnosaPTM";
import BoxSelected from "./BoxSelected";
import TableMonitoringDiagnosaPTM from "./tableMonitoringDiagnosaPTM";
import { labelKardiovaskular, labelKardiovaskularThumb } from "./util";

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

  const { tahun } = filter;

  const isBrowser = typeof window !== "undefined";

  const { data: dataTotalParticipant, isPending: isPendingTotalParticipant } = useTotalParticipant({
    query: removeEmptyKeys(filter),
  });
  const { data: dataTotalVisitation, isPending: isPendingTotalVisitation } = useTotalVisitation({
    query: removeEmptyKeys(filter),
  });
  const { data: dataDisease } = useDisease({
    query: removeEmptyKeys(filter),
  });
  const { data: dataBloodDisorder } = useBloodDisorder({
    query: removeEmptyKeys(filter),
  });
  const { data: dataThalassema } = useThalassema({
    query: removeEmptyKeys(filter),
  });
  const { data: dataHearingDisorder } = useHearingDisorder({
    query: removeEmptyKeys(filter),
  });
  const { data: dataVisualDisorder } = useVisualDisorder({
    query: removeEmptyKeys(filter),
  });
  const { data: datausePPOK } = usePPOK({
    query: removeEmptyKeys(filter),
  });
  const { data: dataTableAggregate } = useTableAggregate({
    query: removeEmptyKeys({ ...filter, indicator: "Penyakit Jantung" }),
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

  const { data: diseaseData } = dataDisease?.data || {};
  const { data: bloodDisorderData } = dataBloodDisorder?.data || {};
  const { data: thalassemaData } = dataThalassema?.data || {};
  const {
    based_on_participant: dataHearingDisorderBasedOnParticipant,
    based_on_visitation: dataHearingDisorderBasedOnVisitation,
  } = dataHearingDisorder?.data?.data || {};
  const {
    based_on_participant: participantVisualDisorder,
    based_on_visitation: visitationVisualDisorder,
  } = dataVisualDisorder?.data?.data || {};

  const { based_on_participant: participantPPOK, based_on_visitation: visitationPPOK } =
    datausePPOK?.data?.data || {};

  const { data: tableAggregateData } = dataTableAggregate?.data ?? {};

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
                color: "#B3261E",
              })}
              opts={{ height: 400 }}
            />
          </div>
          <DownloadButton />
        </div>
      </div>

      <section className="w-full">
        <SectionHeader
          title="Gangguan Kardiovaskular dan Metabolik"
          subtitle="Card yang menampilkan diagnosa berkaitan dengan gangguan kardiovaskular dan metabolik"
        />
        {Object.keys(diseaseData || {})
          .filter((subFilter: string) => !["obesity", "stroke"].includes(subFilter))
          .map((item: string) => {
            const { total_participant, percentage } = (diseaseData as any)[item];

            return (
              <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
                <BoxDiagnosaPTM
                  key={item}
                  title={(labelKardiovaskular as any)[item]}
                  subTitle={`${formatPercentage(
                    Number(percentage)
                  )}% dari jumlah seluruh Peserta tediagnosa`}
                  titleAmount="Peserta"
                  amount={formatNumber(total_participant)}
                  classNameContainer="w-[300px] flex flex-col gap-5 p-5"
                />
                <div className="flex gap-5 overflow-x-auto w-[1200]">
                  {[1, 2, 3, 4, 5].map((subItem) => (
                    <BoxDiagnosaPTM
                      key={subItem}
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
            );
          })}

        <div className="grid grid-cols-3 gap-3">
          {Object.keys(diseaseData || {})
            .filter((subFilter: string) => ["obesity", "stroke"].includes(subFilter))
            .map((itemThumb) => {
              const { total_participant, percentage } = (diseaseData as any)[itemThumb];

              return (
                <BoxDiagnosaPTM
                  key={itemThumb}
                  title={(labelKardiovaskularThumb as any)[itemThumb]}
                  subTitle={`${formatPercentage(
                    Number(percentage)
                  )}% dari jumlah seluruh Peserta tediagnosa`}
                  titleAmount="Peserta"
                  amount={formatNumber(total_participant)}
                  classNameContainer="rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F] flex flex-col gap-5 p-5"
                />
              );
            })}
        </div>
      </section>

      <section className="w-full">
        <SectionHeader
          title="Kelanian Darah"
          subtitle="Card yang menampilkan diagnosa berkaitan dengan penyakit kelainan darah"
        />

        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Penyandang Thalassemia"
            subTitle={`${formatPercentage(
              Number(thalassemaData?.percentage)
            )}}% dari jumlah seluruh Peserta tediagnosa`}
            titleAmount="Peserta"
            amount={formatNumber(Number(thalassemaData?.total_participant))}
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {formatBloodDisorderMap(bloodDisorderData).map((itemBlood) => {
              const { title, amount, percentage } = itemBlood;
              return (
                <BoxDiagnosaPTM
                  key={title}
                  title={title}
                  subTitle={percentage}
                  titleAmount=""
                  showInfo={false}
                  amount={amount}
                  classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                  classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                  classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                  classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
                />
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 my-5">
          {[1, 2, 3, 4].map((i) => (
            <BoxDiagnosaPTM
              key={i}
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
            title="Penyandang Gangguan Pendengaran"
            subTitle={`${formatPercentage(
              Number(dataHearingDisorderBasedOnParticipant?.percentage)
            )}% dari jumlah seluruh Peserta tediagnosa`}
            titleAmount="Peserta"
            amount={formatNumber(Number(dataHearingDisorderBasedOnParticipant?.total))}
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {formatHearingDisorderMap(dataHearingDisorderBasedOnParticipant).map((itemHear) => {
              const { title, amount, percentage } = itemHear;

              return (
                <BoxDiagnosaPTM
                  key={title}
                  title={title}
                  subTitle={percentage}
                  titleAmount=""
                  showInfo={false}
                  amount={amount}
                  classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                  classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                  classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                  classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
                />
              );
            })}
          </div>
        </div>

        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Penyandang Gangguan Penglihatan"
            subTitle={`${formatPercentage(
              Number(participantVisualDisorder?.percentage)
            )}% dari jumlah seluruh Peserta tediagnosa`}
            titleAmount="Peserta"
            amount={formatNumber(Number(participantVisualDisorder?.total))}
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {formatVisualDisorderMap(participantVisualDisorder).map((itemHear) => {
              const { title, amount, percentage } = itemHear;

              return (
                <BoxDiagnosaPTM
                  key={title}
                  title={title}
                  subTitle={percentage}
                  titleAmount=""
                  showInfo={false}
                  amount={amount}
                  classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                  classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                  classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                  classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
                />
              );
            })}
          </div>
        </div>

        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Kunjungan Gangguan Pendengaran"
            subTitle={`${formatPercentage(
              Number(dataHearingDisorderBasedOnVisitation?.percentage)
            )}% dari jumlah seluruh Peserta tediagnosa`}
            titleAmount="Peserta"
            amount={formatNumber(Number(dataHearingDisorderBasedOnVisitation?.total))}
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {formatHearingDisorderMap(dataHearingDisorderBasedOnVisitation).map((itemHear) => {
              const { title, amount, percentage } = itemHear;

              return (
                <BoxDiagnosaPTM
                  key={title}
                  title={title}
                  subTitle={percentage}
                  titleAmount=""
                  showInfo={false}
                  amount={amount}
                  classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                  classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                  classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                  classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
                />
              );
            })}
          </div>
        </div>

        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Kunjungan Gangguan Penglihatan"
            subTitle={`${formatPercentage(
              Number(visitationVisualDisorder?.percentage)
            )}% dari jumlah seluruh Peserta tediagnosa`}
            titleAmount="Peserta"
            amount={formatNumber(Number(visitationVisualDisorder?.total))}
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {formatVisualDisorderMap(visitationVisualDisorder).map((itemHear) => {
              const { title, amount, percentage } = itemHear;

              return (
                <BoxDiagnosaPTM
                  key={title}
                  title={title}
                  subTitle={percentage}
                  titleAmount=""
                  showInfo={false}
                  amount={amount}
                  classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                  classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                  classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                  classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
                />
              );
            })}
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
            title="Kunjungan Gangguan Penglihatan"
            subTitle={`${formatPercentage(
              Number(participantPPOK?.percentage)
            )}% dari jumlah seluruh Peserta tediagnosa`}
            titleAmount="Peserta"
            amount={formatNumber(Number(participantPPOK?.total))}
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {formatPPOKMap(participantPPOK).map((itemHear) => {
              const { title, amount, percentage } = itemHear;

              return (
                <BoxDiagnosaPTM
                  key={title}
                  title={title}
                  subTitle={percentage}
                  titleAmount=""
                  showInfo={false}
                  amount={amount}
                  classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                  classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                  classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                  classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
                />
              );
            })}
          </div>
        </div>

        <div className="p-5 my-5 flex rounded-[16px] shadow-[0_4px_6px_0px_#10182808] shadow-[0_0px_16px_0px_#1018281F]">
          <BoxDiagnosaPTM
            title="Kunjungan Gangguan Penglihatan"
            subTitle={`${formatPercentage(
              Number(visitationPPOK?.percentage)
            )}% dari jumlah seluruh Peserta tediagnosa`}
            titleAmount="Peserta"
            amount={formatNumber(Number(visitationPPOK?.total))}
            classNameContainer="w-[300px] flex flex-col gap-5 p-5"
          />
          <div className="flex gap-5 overflow-x-auto w-[1200]">
            {formatPPOKMap(visitationPPOK).map((itemHear) => {
              const { title, amount, percentage } = itemHear;

              return (
                <BoxDiagnosaPTM
                  key={title}
                  title={title}
                  subTitle={percentage}
                  titleAmount=""
                  showInfo={false}
                  amount={amount}
                  classNameContainer="flex w-[190px] flex-col p-5 border border-[#F6D0FE] rounded-[12px] bg-[#FEFAFF]"
                  classNameTitle="font-plus-jakarta-sans text-[16px] font-semibold leading-[27px] text-left"
                  classNameAmount="font-plus-jakarta-sans text-[24px] font-semibold leading-[54px] text-left text-[#821790]"
                  classNameSubTitle="font-plus-jakarta-sans text-[14px] font-normal leading-[27px] text-left"
                />
              );
            })}
          </div>
        </div>
      </section>

      <TableMonitoringDiagnosaPTM
        tableAggregateData={tableAggregateData || []}
        titleTable="Tabel Data Agregat"
      />
    </div>
  );
}
