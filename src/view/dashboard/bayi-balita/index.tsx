"use client";
import React, { useEffect, useState } from "react";
import styles from "../anc/anc.module.css";
import Header from "@/components/header";
import { dataMonth, dataTabBaduta } from "@/utils/constants";
import TabsBias from "@/components/tabsBias";
import FilterSummaryImmunizationWus from "@/view/home/components/FilterWus";
import SectionHeader from "@/components/sectionHeader";
import { GraphEcharts } from "@/components";
import { IoMdInformationCircleOutline } from "react-icons/io";
import CardDetailSasaran from "@/components/cardDetailSasaran";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Line } from "rc-progress";
import { color } from "echarts";
import Progress from "@/components/progress";
import ProgressCard1 from "@/components/progressCard1";

interface DataSection {
  color: string;
  label: string;
  value: number;
  percentage: number;
}

interface TooltipState {
  visible: boolean;
  content: string;
  position: number;
}
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
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    position: 0,
  });

  const handleClick = (color: any, data: any, event: any) => {
    const tooltipContent = `${data.label}: ${data.value} (${data.percentage}%)`;

    setTooltip({
      visible: true,
      content: tooltipContent,
      position: event.clientX, // posisi horizontal dari event klik
    });
  };

  const handleDocumentClick = (event: any) => {
    // Hide tooltip if clicking outside the progress bar
    if (event.target.closest(".progress-bar-container") === null) {
      setTooltip({ visible: false, content: "", position: 0 });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const dataSections = [
    { color: "#00bfa5", label: "Perempuan", value: 5500, percentage: 61 },
    { color: "#f7c548", label: "Laki-laki", value: 3500, percentage: 39 },
    { color: "red", label: "Anak-anak", value: 1500, percentage: 20 },
    { color: "blue", label: "Lansia", value: 2500, percentage: 25 },
  ];
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
        <div className="h-[388px] lg:col-span-7 col-span-12 rounded-2xl border border-[#D6D6D6]">
          dfgdfgdf
        </div>
      </div>
    </div>
  );
}
