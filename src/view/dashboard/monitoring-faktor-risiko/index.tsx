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
import {
  useActivity,
  useConsumption,
  useSmoking,
  useTotalParticipant,
  useTotalVisitation,
} from "@/lib/services/monitoring-faktor-risiko/useMonitoringFaktorRisiko";
import { dataMonth } from "@/utils/constants";
import { initFilterSelamatDatang } from "@/view/dashboard/monitoring-faktor-risiko/init-value";
import FilterMonitoringFaktorRisiko from "@/view/home/components/FilterMonitoringFaktorRisiko";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import styles from "../anc/anc.module.css";
import BoxSelected from "./BoxSelected";
import TableMonitoringFaktorRisiko from "./tableMonitoringFaktorRisiko";
import { FormValuesMonitoringFaktorRisiko } from "./type";
import { formatPercentage } from "@/lib/utils";

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

  const { data: dataTotalParticipant, isPending: isPendingTotalParticipant } =
    useTotalParticipant();
  const { data: dataTotalVisitation, isPending: isPendingTotalVisitation } = useTotalVisitation();
  const { data: dataActivity, isPending: isPendingActivity } = useActivity();
  const { data: dataConsumption, isPending: isPendingConsumption } = useConsumption();
  const { data: dataSmoking, isPending: isPendingSmoking } = useSmoking();

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
        <FilterMonitoringFaktorRisiko filterState={filterState} />
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
                {isPendingTotalParticipant
                  ? "Loading..."
                  : formatNumber(
                      Number(
                        dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[0]
                          ?.all_total
                      )
                    )}
              </p>
            </div>
            <div className="rounded-2xl row-span-7 border border-[#D6D6D6] px-4 py-8 flex flex-col justify-between h-full">
              <p className="font-semibold text-xl">Breakdown per jenis kelamin</p>
              <div className="grid grid-cols-12 gap-3 max-h-[100px]">
                <div className="col-span-4 text-center">
                  <p className="text-[#3BC6BE] font-semibold mb-7">Laki-laki</p>
                  <p className="font-semibold text-[#616161]">
                    {isPendingTotalParticipant
                      ? "Loading..."
                      : formatNumber(
                          Number(
                            dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[0]
                              ?.total
                          )
                        )}
                  </p>
                  <p className="font-light text-[#616161]">
                    (
                    {isPendingTotalParticipant
                      ? "Loading..."
                      : formatPercentage(
                          Number(
                            dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[0]
                              ?.percentage
                          )
                        )}
                    %)
                  </p>
                </div>
                <div className="col-span-4 h-[100px]">
                  <GraphEcharts graphOptions={chartOptions} />
                </div>
                <div className="col-span-4 text-center">
                  <p className="text-[#CF3E53] font-semibold mb-7">Perempuan</p>
                  <p className="font-semibold text-[#616161]">
                    {isPendingTotalParticipant
                      ? "Loading..."
                      : formatNumber(
                          Number(
                            dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[1]
                              ?.total
                          )
                        )}
                  </p>
                  <p className="font-light text-[#616161]">
                    (
                    {isPendingTotalParticipant
                      ? "Loading..."
                      : formatPercentage(
                          Number(
                            dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[1]
                              ?.percentage
                          )
                        )}
                    %)
                  </p>
                </div>
              </div>
              <div className="mt-[10px]">
                <Progress
                  data={[
                    {
                      color: "#CF3E53",
                      label: "Perempuan",
                      value:
                        dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[1]
                          ?.total,
                      percentage:
                        dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[1]
                          ?.percentage,
                    },
                    {
                      color: "#3BC6BE",
                      label: "Laki-laki",
                      value:
                        dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[0]
                          ?.total,
                      percentage:
                        dataTotalParticipant?.data?.data?.total_participant_based_on_gender?.[0]
                          ?.percentage,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[600px] lg:col-span-7 col-span-12 rounded-2xl border border-[#D6D6D6] py-8 pl-8 pr-2">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">
              Tren Bulanan Jumlah <span className="text-[#006A65]">Peserta</span>
              <br />
              Tahun 2024
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
            <GraphEcharts graphOptions={chartOptions2} opts={{ height: 400 }} />
          </div>
          <div className="w-full flex justify-end items-end mt-20">
            <DownloadButton text="Unduh Excel" />
          </div>
        </div>
      </div>
      <SectionHeader
        title="Pola konsumsi dan Gaya Hidup"
        subtitle="Card yang menampilkan hasil wawancara faktor risiko berkaitan dengan pola konsumsi dan gaya hidup"
      />
      <div className="grid grid-cols-12 w-full gap-3 mt-5">
        <CardPemeriksaan
          label="IMT/U"
          value={7015619}
          pct="57.5"
          data={BodyMassIndexAge?.data?.map((data: any) => ({
            color:
              data.bmi_category === "Gizi Baik"
                ? "#27A762"
                : data.bmi_category === "Gizi Kurang"
                ? "#FFEE16"
                : data.bmi_category === "Gizi Buruk"
                ? "#F3B239"
                : data.bmi_category === "Gizi Lebih"
                ? "#FF8800"
                : data.bmi_category === "Obesitas"
                ? "#CF3E53"
                : "#000000", // Warna default jika kategori tidak cocok
            label: data.bmi_category,
            value: data.total, // Sesuaikan sesuai dengan data Anda
            percentage: data.percentage, // Sesuaikan sesuai dengan data Anda
          }))}
        />
        <CardPemeriksaan
          label="Tekanan Darah"
          value={7015619}
          pct="57.5"
          data={BloodPresure?.data?.map((data: any) => ({
            color:
              data.hypertension_risk === "Hipertensi Tingkat 1"
                ? "#FF8800"
                : data.hypertension_risk === "Hipertensi Tingkat 2"
                ? "#CF3E53"
                : data.hypertension_risk === "Gizi Buruk"
                ? "#F3B239"
                : data.hypertension_risk === "Gizi Lebih"
                ? "#FF8800"
                : data.hypertension_risk === "Obesitas"
                ? "#CF3E53"
                : "#000000", // Warna default jika kategori tidak cocok
            label: data.hypertension_risk,
            value: data.total, // Sesuaikan sesuai dengan data Anda
            percentage: data.percentage, // Sesuaikan sesuai dengan data Anda
          }))}
        />
        <CardPemeriksaan
          label="Skrining Penglihatan"
          value={7015619}
          pct="57.5"
          data={Vision?.data?.map((data: any) => ({
            color:
              data.vision === "Normal"
                ? "#27A762"
                : data.vision === "Gizi Kurang"
                ? "#FFEE16"
                : data.vision === "Gizi Buruk"
                ? "#F3B239"
                : data.vision === "Gizi Lebih"
                ? "#FF8800"
                : data.vision === "Obesitas"
                ? "#CF3E53"
                : "#000000", // Warna default jika kategori tidak cocok
            label: data.vision,
            value: data.total, // Sesuaikan sesuai dengan data Anda
            percentage: data.percentage, // Sesuaikan sesuai dengan data Anda
          }))}
        />
        <CardPemeriksaan
          label="Pendengaran"
          value={7015619}
          pct="57.5"
          data={Hearing?.data?.map((data: any) => ({
            color:
              data.hearing === "Normal"
                ? "#27A762"
                : data.hearing === "Bermasalah"
                ? "#CF3E53"
                : "#000000",
            label: data.hearing,
            value: data.total,
            percentage: data.percentage,
          }))}
        />
        <CardPemeriksaan
          label="Skrining Kesehatan Jiwa"
          value={7015619}
          pct="57.5"
          data={MentalHealth?.data?.map((data: any) => ({
            color:
              data.mental_health === "Normal"
                ? "#27A762"
                : data.mental_health === "Borderline"
                ? "#FFEE16"
                : data.mental_health === "Abnormal"
                ? "#CF3E53"
                : "#000000",
            label: data.mental_health,
            value: data.total,
            percentage: data.percentage,
          }))}
        />
        <CardPemeriksaan
          label="Skrining Napza"
          value={7015619}
          pct="57.5"
          data={NapzaScreening?.data?.map((data: any) => ({
            color:
              data.napza_risk === "Tidak Beresiko Napza"
                ? "#27A762"
                : data.napza_risk === "Beresiko Napza"
                ? "#CF3E53"
                : "#000000",
            label: data.napza_risk,
            value: data.total,
            percentage: data.percentage,
          }))}
        />
        <CardPemeriksaan
          label="Kesehatan Gigi & Mulut"
          value={7015619}
          pct="57.5"
          data={Health?.data?.map((data: any) => ({
            color:
              data.health === "Tidak Beresiko Napza"
                ? "#27A762"
                : data.health === "Beresiko Napza"
                ? "#CF3E53"
                : "#000000",
            label: data.health,
            value: data.total,
            percentage: data.percentage,
          }))}
        />
        <CardPemeriksaan
          label="Kebugaran"
          value={7015619}
          pct="57.5"
          data={Fitness?.data?.map((data: any) => ({
            color:
              data.fitness === "Baik"
                ? "#32DE81"
                : data.fitness === "Cukup"
                ? "#FFEE16"
                : data.fitness === "Kurang"
                ? "#FF8800"
                : "#000000",
            label: data.fitness,
            value: data.total,
            percentage: data.percentage,
          }))}
        />
        <CardPemeriksaan
          label="Skiring Anemia"
          value={7015619}
          pct="57.5"
          data={AnemiaScreening?.data?.map((data: any) => ({
            color:
              data.anemia_risk === "Tidak Anemia"
                ? "#27A762"
                : data.anemia_risk === "Anemia Ringan"
                ? "#FFEE16"
                : data.anemia_risk === "Anemia Sedang"
                ? "#F3B239"
                : data.anemia_risk === "Anemia Berat"
                ? "#CF3E53"
                : "#000000",
            label: data.anemia_risk,
            value: data.total,
            percentage: data.percentage,
          }))}
          textBlue
        />
        <CardPemeriksaan
          label="Faktor Risiko Merokok"
          value={7015619}
          pct="57.5"
          data={Smoking?.data?.map((data: any) => ({
            color:
              data.smoking === "Tidak Merokok"
                ? "#27A762"
                : data.smoking === "Merokok"
                ? "#CF3E53"
                : "#000000",
            label: data.smoking,
            value: data.total,
            percentage: data.percentage,
          }))}
        />
        <CardPemeriksaan
          label="Paparan Asap Rokok"
          value={7015619}
          pct="57.5"
          data={CigaretteSmoking?.data?.map((data: any) => ({
            color:
              data.cigarette_smoking === "Tidak Terpapar"
                ? "#27A762"
                : data.cigarette_smoking === "Terpapar"
                ? "#CF3E53"
                : "#000000",
            label: data.cigarette_smoking,
            value: data.total,
            percentage: data.percentage,
          }))}
          textBlue
        />
      </div>

      <TableMonitoringFaktorRisiko titleTable="Tabel Data Agregat" />
    </div>
  );
}
