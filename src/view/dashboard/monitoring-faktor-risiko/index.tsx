"use client";
import { DownloadButton, GraphEcharts, Select } from "@/components";
import ButtonIcon from "@/components/button-icon";
import CardPemeriksaan from "@/components/cardPemeriksaan";
import Header from "@/components/header";
import Progress from "@/components/progress";
import SectionHeader from "@/components/sectionHeader";
import { formatNumber } from "@/helpers";
import {
  useActivity,
  useConsumption,
  useSmoking,
  useTableAggregate,
  useTotalParticipant,
} from "@/lib/services/monitoring-faktor-risiko/useMonitoringFaktorRisiko";
import { formatPercentage, removeEmptyKeys } from "@/lib/utils";
import { dataMonths } from "@/utils/constants";
import { initFilterSelamatDatang } from "@/view/dashboard/monitoring-faktor-risiko/init-value";
import {
  DataActivityType,
  DataConsumptionType,
  DataSmokingType,
  ListSubType,
} from "@/view/dashboard/monitoring-faktor-risiko/type";
import {
  accumulatorData,
  formatChartBreakdownJenisKelamin,
  formatChartTrenBulananJumlahPeserta,
  labelGayaHidup,
  labelMerokok,
} from "@/view/dashboard/monitoring-faktor-risiko/util";
import FilterMonitoringFaktorRisiko from "@/view/home/components/FilterMonitoringFaktorRisiko";
import { Spin } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import styles from "../anc/anc.module.css";
import BoxSelected from "./BoxSelected";
import TableMonitoringFaktorRisiko from "./tableMonitoringFaktorRisiko";
import { FormValuesMonitoringFaktorRisiko } from "./type";

export default function MonitoringFaktorRisiko() {
  const { control, reset } = useForm<FormValuesMonitoringFaktorRisiko>({
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
  const { tahun, bulan } = filter;

  const isBrowser = typeof window !== "undefined";

  const { data: dataTotalParticipant, isPending: isPendingTotalParticipant } = useTotalParticipant({
    query: removeEmptyKeys(filter),
  });
  const { data: dataActivity } = useActivity({
    query: removeEmptyKeys(filter),
  });
  const { data: dataConsumption } = useConsumption({
    query: removeEmptyKeys(filter),
  });
  const { data: dataSmoking } = useSmoking({
    query: removeEmptyKeys(filter),
  });
  const { data: dataTableAggregate } = useTableAggregate({
    query: removeEmptyKeys({ ...filter, indicator: "Aktifitas Fisik" }),
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

  const { data: activityData } = dataActivity?.data ?? {};
  const { data: tableAggregateData } = dataTableAggregate?.data ?? {};

  const consumptionData: DataConsumptionType | {} = dataConsumption?.data?.data ?? {};
  const smokingData: DataSmokingType | {} = dataSmoking?.data?.data ?? {};

  return (
    <div className={`flex flex-col items-center p-[30px]  ${styles.jakartaFont}`}>
      <Header
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Kesehatan Anak Usia Sekolah dan Remaja"
        note="Dashboard ini menampilkan data berdasarkan pemeriksaan pertama dari setiap jenis skrining PTM yang dilakukan peserta dalam 1 tahun"
        desc={`Dashboard ini menampilkan:\nmonitoring capaian Indikator ANC berdasarkan data yang dikirim oleh faskes ke SATUSEHAT`}
        space={true}
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
        <FilterMonitoringFaktorRisiko showPilihFaskes={false} filterState={filterState} />
      </div>

      <SectionHeader title="Capaian Deteksi Dini PTM" subtitle="Faktor Risiko PTM" />
      <div className="mt-5 grid grid-cols-12 gap-6 w-full">
        <div className="h-[600px] lg:col-span-5 col-span-12">
          <div className="grid grid-rows-12 h-full gap-6">
            <div className="rounded-2xl row-span-5 bg-[#006A65] text-white pl-10 flex flex-col justify-center relative">
              <div className="absolute top-3 right-3">
                <IoMdInformationCircleOutline size={24} color="white" />
              </div>
              <p className="text-xl font-normal">Jumlah Peserta</p>
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
              <Select
                placeholder="Bulanan"
                options={dataMonths}
                onChange={(e: any) => {
                  setFilter({
                    ...filter,
                    bulan: e?.value,
                  });
                }}
                value={dataMonths?.find((f) => f.value === bulan)}
                isDisabled={!tahun}
              />
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
          <DownloadButton />
        </div>
      </div>
      <SectionHeader
        title="Pola konsumsi dan Gaya Hidup"
        subtitle="Card yang menampilkan hasil wawancara faktor risiko berkaitan dengan pola konsumsi dan gaya hidup"
      />
      <div className="grid grid-cols-12 w-full gap-3 mt-5">
        <CardPemeriksaan
          label="Aktivitas fisik"
          value={Number(accumulatorData(activityData, "total"))}
          pct={String(formatPercentage(Number(accumulatorData(activityData, "percentage"))))}
          data={activityData?.map((itemAct: DataActivityType) => {
            const { activity_type, total, percentage } = itemAct;
            return {
              color:
                activity_type === "Setiap Hari"
                  ? "#27A762"
                  : activity_type === "Tidak Setiap Hari"
                  ? "#FFEE16"
                  : "#000000",
              label: activity_type,
              value: total,
              percentage: formatPercentage(percentage),
            };
          })}
        />
        {Object.keys(consumptionData || {}).map((itemConsumtion: string) => {
          return (
            <CardPemeriksaan
              label={labelGayaHidup[itemConsumtion]}
              value={Number(accumulatorData((consumptionData as any)[itemConsumtion], "total"))}
              pct={String(
                formatPercentage(
                  Number(accumulatorData((consumptionData as any)[itemConsumtion], "percentage"))
                )
              )}
              data={(consumptionData as any)[itemConsumtion]?.map((itemFruit: ListSubType) => {
                const { status, total, percentage } = itemFruit;
                return {
                  color:
                    status === "Setiap Hari"
                      ? "#FF8800"
                      : status === "Tidak Setiap Hari"
                      ? "#CF3E53"
                      : "#000000",
                  label: status,
                  value: total,
                  percentage: formatPercentage(percentage),
                };
              })}
            />
          );
        })}

        {Object.keys(smokingData || {}).map((itemConsumtion: any) => {
          return (
            <CardPemeriksaan
              label={labelMerokok[itemConsumtion]}
              value={Number(accumulatorData((smokingData as any)[itemConsumtion], "total"))}
              pct={String(
                formatPercentage(
                  Number(accumulatorData((smokingData as any)[itemConsumtion], "percentage"))
                )
              )}
              data={(smokingData as any)[itemConsumtion]?.map((itemFruit: ListSubType) => {
                const { status, total, percentage } = itemFruit;
                return {
                  color:
                    status === "Berhenti < 10 Tahun"
                      ? "#FF8800"
                      : status === "Merokok"
                      ? "#CF3E53"
                      : status === "Perokok Aktif"
                      ? "#27A762"
                      : status === "Perokok Pasif"
                      ? "#FFEE16"
                      : "#000000",
                  label: status,
                  value: total,
                  percentage: formatPercentage(percentage),
                };
              })}
            />
          );
        })}
      </div>

      <TableMonitoringFaktorRisiko
        tableAggregateData={tableAggregateData || []}
        titleTable="Tabel Data Agregat"
      />
    </div>
  );
}
