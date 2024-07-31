"use client";

import React from "react";
import { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { Banner, BannerHighlightFooter, BannerText } from "@/components";
import {
  graphOptions1,
  graphOptions2,
  graphOptions3,
  graphOptions4,
  graphOptions5,
  graphOptions6,
  graphOptions7,
} from "./graphOptions";
import GraphEchartsAnc from "@/components/graph-echarts-anc";
import {
  ancGraphOptions1,
  ancGraphOptions2,
  ancGraphOptions3,
  ancGraphOptions4,
  ancGraphOptions6,
  ancGraphOptions7,
  ancGtaphOptions5,
  dataMonth,
} from "@/utils/constants";
import FilterSummaryImmunizationAnc from "@/view/home/components/FilterAnc";
import { formatNumber } from "@/helpers";
import Header from "@/components/header";
import styles from "./anc.module.css";
import SectionHeader from "@/components/sectionHeader";
import Scorecard1 from "@/components/scorecard1";
import Scorecard2 from "@/components/scorecard2";
import Scorecard3 from "@/components/scorecard3";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useGetTotalImmunizationQuery } from "@/lib/services/anc";
import { Spin } from "@/components";

export default function Anc() {
  const filterState = useState({
    tahun: 2023,
    // tahun: new Date().getFullYear(),
    // bulan: 12,
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
  const optionQuery = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };
  const dateQuery = {
    year: filter.tahun,
    month: filter.bulan,
  };
  const regionType = {
    region_type: filter.faskes
      ? "village"
      : filter.kecamatan
      ? "district"
      : filter.kabkota
      ? "city"
      : filter.provinsi
      ? "province"
      : "All",
  };

  const faksesParentId = {
    faskes_parent_id:
      filter.faskes !== ""
        ? filter.kecamatan
        : filter.provinsi !== "" &&
          filter.kabkota !== "" &&
          filter.kecamatan === undefined
        ? filter.provinsi
        : filter.provinsi !== "" &&
          filter.kabkota !== "" &&
          filter.kecamatan !== ""
        ? filter.kabkota
        : filter.provinsi !== "" && filter.kabkota !== ""
        ? filter.provinsi
        : filter.provinsi !== ""
        ? filter.provinsi
        : "All",
  };

  const faskesId = {
    faskes_id: filter.faskes
      ? filter.faskes
      : filter.kecamatan
      ? filter.kecamatan
      : filter.kabkota
      ? filter.kabkota
      : filter.provinsi
      ? filter.provinsi
      : "All",
  };

  const filterTotal = {
    ...dateQuery,
    ...regionType,
    ...faskesId,
    ...faksesParentId,
  };

  const createFilter = (
    // filterTotal: any,
    diagramType: string,
    withPct: boolean
  ) => ({
    ...filterTotal,
    diagram_type: diagramType,
    with_pct: withPct,
  });

  const filterSasaranIbuHamil = createFilter("preg_target", false);
  const filterIbuHamilTercatat = createFilter("preg_registered", true);
  const filterK1 = createFilter("k1", true);
  const filterK1Akses = createFilter("k1_akses", true);
  const filterK1Murni = createFilter("k1_murni", true);
  const filterK1Usg = createFilter("k1_usg", true);
  const filterK4 = createFilter("k4", true);
  const filterK5 = createFilter("k5", true);
  const filterK5Usg = createFilter("k5_usg", true);
  const filterK6 = createFilter("k6", true);
  const filterTenT = createFilter("10t", true);
  const filterFourT = createFilter("4t", true);

  // SCORECARD
  const { data: SasaranIbuHamil, isFetching: isLoadingTotalImmunization } =
    useGetTotalImmunizationQuery(filterSasaranIbuHamil, optionQuery);
  const { data: IbuHamilTercatat, isFetching: isLoadingIbuHamilTercatat } =
    useGetTotalImmunizationQuery(filterIbuHamilTercatat, optionQuery);
  const { data: K1, isFetching: isLoadingK1 } = useGetTotalImmunizationQuery(
    filterK1,
    optionQuery
  );
  const { data: K1Akses, isFetching: isLoadingK1Akses } =
    useGetTotalImmunizationQuery(filterK1Akses, optionQuery);
  const { data: K1Murni, isFetching: isLoadingK1Murni } =
    useGetTotalImmunizationQuery(filterK1Murni, optionQuery);
  const { data: K1Usg, isFetching: isLoadingK1Usg } =
    useGetTotalImmunizationQuery(filterK1Usg, optionQuery);
  const { data: K4, isFetching: isLoadingK4 } = useGetTotalImmunizationQuery(
    filterK4,
    optionQuery
  );
  const { data: K5, isFetching: isLoadingK5 } = useGetTotalImmunizationQuery(
    filterK5,
    optionQuery
  );
  const { data: K5Usg, isFetching: isLoadingK5Usg } =
    useGetTotalImmunizationQuery(filterK5Usg, optionQuery);
  const { data: K6, isFetching: isLoadingK6 } = useGetTotalImmunizationQuery(
    filterK6,
    optionQuery
  );
  const { data: TenT, isFetching: isLoadingTenT } =
    useGetTotalImmunizationQuery(filterTenT, optionQuery);
  const { data: FourT, isFetching: isLoadingFourT } =
    useGetTotalImmunizationQuery(filterFourT, optionQuery);

  // console.log(TotalImmunization, "isi data");
  // SCORECARD

  const totalData = ancGraphOptions1.map((option) => option.ya + option.tidak);
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
      <FilterSummaryImmunizationAnc filterState={filterState} />
      <SectionHeader
        title="Jumlah Sasaran Ibu Hamil"
        subtitle="Ringkasan berisi jumlah sasaran ibu hamil dan cakupan ibu hamil yang
            sudah mendapatkan layanan pemeriksaan"
        btn="Halaman Analisis"
      />
      <div className="w-full grid grid-cols-2 gap-2 mt-6">
        <Scorecard1
          title="Sasaran Ibu Hamil"
          total={formatNumber(SasaranIbuHamil?.data?.total || "0")}
          direction="l"
          isLoading={isLoadingTotalImmunization}
        />
        <Scorecard1
          title="Ibu Hamil Tercatat"
          total={formatNumber(IbuHamilTercatat?.data?.total || "0")}
          pct={`${formatNumber(IbuHamilTercatat?.data?.pct) || 0}%`}
          direction="r"
          isLoading={isLoadingIbuHamilTercatat}
        />
      </div>
      <SectionHeader
        title="Cakupan Kunjungan ANC"
        subtitle="Jumlah dan persentase ibu hamil yang sudah melakukan kunjungan ANC K1 - K6 di fasilitas kesehatan"
      />
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-7 mt-6">
        <Scorecard2
          title="K1"
          value={formatNumber(K1?.data?.total || "0")}
          pct={`${formatNumber(K1?.data?.pct) || 0}%`}
          isLoading={isLoadingK1}
          className="rounded-l-xl"
        />
        <Scorecard2
          title="K1"
          subtitle="Akses"
          value={formatNumber(K1Akses?.data?.total || "0")}
          pct={`${formatNumber(K1Akses?.data?.pct) || 0}%`}
          isLoading={isLoadingK1Akses}
          className="rounded-r-xl lg:rounded-none"
        />

        <Scorecard2
          title="K1"
          subtitle="Murni"
          value={formatNumber(K1Murni?.data?.total || "0")}
          pct={`${formatNumber(K1Murni?.data?.pct) || 0}%`}
          isLoading={isLoadingK1Murni}
          className="rounded-l-xl lg:rounded-none"
        />

        <Scorecard2
          title="K1"
          subtitle="USG"
          value={formatNumber(K1Usg?.data?.total || "0")}
          pct={`${formatNumber(K1Usg?.data?.pct) || 0}%`}
          isLoading={isLoadingK1Usg}
          className="rounded-r-xl"
        />

        <Scorecard2
          title="K4"
          value={formatNumber(K4?.data?.total || "0")}
          pct={`${formatNumber(K4?.data?.pct) || 0}%`}
          isLoading={isLoadingK4}
          className="rounded-l-xl"
        />

        <Scorecard2
          title="K5"
          value={formatNumber(K5?.data?.total || "0")}
          pct={`${formatNumber(K5?.data?.pct) || 0}%`}
          isLoading={isLoadingK5}
          className="rounded-r-xl lg:rounded-none"
        />

        <Scorecard2
          title="K5"
          subtitle="USG"
          value={formatNumber(K5Usg?.data?.total || "0")}
          pct={`${formatNumber(K5Usg?.data?.pct) || 0}%`}
          isLoading={isLoadingK5Usg}
          className="rounded-l-xl lg:rounded-none"
        />

        <Scorecard2
          title="K6"
          value={formatNumber(K6?.data?.total || "0")}
          pct={`${formatNumber(K6?.data?.pct) || 0}%`}
          isLoading={isLoadingK6}
          className="rounded-r-xl"
        />
      </div>
      <SectionHeader
        title="Cakupan Program Ibu Hamil"
        subtitle="Jumlah dan persentase capaian indikator program kesehatan ibu hamil"
      />
      <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
        <Scorecard3
          title="10T"
          value={formatNumber(TenT?.data?.total || "0")}
          pct={`${formatNumber(TenT?.data?.pct) || 0}%`}
          isLoading={isLoadingTenT}
          color="#9CEE8C"
        />
        <Scorecard3
          title="4T"
          subtitle="terlalu muda, terlalu tua, terlalu dekat, terlalu banyak"
          value={formatNumber(FourT?.data?.total || "0")}
          pct={`${formatNumber(FourT?.data?.pct) || 0}%`}
          isLoading={isLoadingFourT}
          color="#D9EF82"
        />
        {/*
        <Scorecard3
          title="ANEMIA"
          status={"Sedang \n& Berat"}
          subtitle="mendapatkan rujukan ke FKRTL"
          value="117.000"
          pct="10,2%"
          color="#60D3AA"
        />
        <Scorecard3
          title="ANEMIA"
          status={"Sedang \n& Berat"}
          subtitle="mendapatkan rujukan ke FKRTL"
          value="117.000"
          pct="10,2%"
          color="#60D3AA"
        />
        <Scorecard3 title="10T" value="117.000" pct="10,2%" color="#9CEE8C" />
        <Scorecard3
          title="ANEMIA"
          status={"Sedang \n& Berat"}
          subtitle="mendapatkan rujukan ke FKRTL"
          value="117.000"
          pct="10,2%"
          color="#60D3AA"
        /> */}
      </div>
      <SectionHeader
        title="Morbiditas pada Ibu Hamil"
        subtitle="Top 8 morbiditas yang dialami oleh Ibu Hamil"
      />
      {/* Morbiditas */}
      <div className="w-full mt-10">
        <div className="h-40 bg-primary flex items-center justify-center text-white relative">
          <div className="absolute right-2 top-2">
            <IoMdInformationCircleOutline size={24} />
          </div>
          <p className="font-bold text-8xl">8</p>
          <p className="font-bold text-4xl">
            Penyakit yang sering <br /> dialami ibu hamil
          </p>
        </div>
        <div className="grid grid-cols-3 h-full gap-4 mt-6">
          <div className=" col-span-3 lg:col-span-2">
            <div className="h-[200px] bg-[#F3B239] mb-3"></div>
            <div className="h-[400px] bg-[#CF3E53]"></div>
          </div>
          <div className="col-span-3 lg:col-span-1">
            <div className="grid grid-cols-12 gap-3">
              <div className="bg-[#00B8AE] h-[106px] col-span-5"></div>
              <div className="bg-[#008E87] h-[106px] col-span-7"></div>
              <div className="bg-[#00A2B3] h-[160px] col-span-7"></div>
              <div className="bg-[#EC407A] h-[160px] col-span-5"></div>
              <div className="bg-[#ADBB38] h-[130px] col-span-12"></div>
              <div className="bg-[#A72787] h-[180px] col-span-12"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Morbiditas */}

      <div className="px-4 container  ">
        <div className="h-[600px] ">
          <GraphEchartsAnc
            graphOptions={graphOptions1(
              [
                {
                  name: "Ya",
                  type: "bar",
                  stack: "total",
                  label: {
                    show: true,
                    formatter: (params: any) => {
                      const total = totalData[params.dataIndex];
                      const value = params.value;
                      const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
                      return `${percentage}%`;
                    },
                  },
                  emphasis: {
                    focus: "series",
                  },
                  itemStyle: {
                    color: "#00B3AC",
                  },
                  data: ancGraphOptions1?.map((r: any) => r?.ya || 0) || [],
                },
                {
                  name: "Tidak",
                  type: "bar",
                  stack: "total",
                  label: {
                    show: true,
                    formatter: (params: any) => {
                      const total = totalData[params.dataIndex];
                      const value = params.value;
                      const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage and format it to 2 decimal places
                      return `${percentage}%`;
                    },
                  },
                  emphasis: {
                    focus: "series",
                  },
                  itemStyle: {
                    color: "#BC2A3F",
                  },
                  data: ancGraphOptions1?.map((r: any) => r?.tidak || 0) || [],
                },
              ],
              ancGraphOptions1?.map((r: any) => r.label) || []
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions2(
              [
                {
                  name: "Anemia",
                  type: "bar",
                  color: "#00968E",
                  barGap: 0,
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data: ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
                },
                {
                  name: "Mendapatkan TTD",
                  type: "bar",
                  color: "#04DACF",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.dapatTtd || 0) || [],
                },
                {
                  name: "Mengonsumsi TTD",
                  type: "bar",
                  color: "#737373",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.konsumsiTtd || 0) ||
                    [],
                },
              ],
              ancGraphOptions2?.map((r: any) => r.region)
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions2(
              [
                {
                  name: "Anemia",
                  type: "bar",
                  color: "#00968E",
                  barGap: 0,
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data: ancGraphOptions2?.map((r: any) => r?.anemia || 0) || [],
                },
                {
                  name: "Mendapatkan TTD",
                  type: "bar",
                  color: "#04DACF",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.dapatTtd || 0) || [],
                },
                {
                  name: "Mengonsumsi TTD",
                  type: "line",
                  color: "#BC2A3F",
                  // label: labelOption,
                  emphasis: {
                    focus: "series",
                  },
                  data:
                    ancGraphOptions2?.map((r: any) => r?.konsumsiTtd || 0) ||
                    [],
                },
              ],
              ancGraphOptions2?.map((r: any) => r.region)
            )}
          />
        </div>
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions3(
              [
                {
                  name: "Direct",
                  type: "bar",
                  barWidth: "50%",
                  data: ancGraphOptions3?.map((r: any) => r?.value || 0) || [],
                },
              ],
              ancGraphOptions3?.map((r: any) => r.label)
            )}
          />
        </div>
        {/* 444444 start*/}
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions4(
              [
                {
                  name: "Jumlah",
                  data:
                    (ancGraphOptions4 || [])?.map((r: any) => r?.value) || [],
                  type: "bar",
                  label: {
                    show: false,
                  },
                },
                {
                  name: "Persentase",
                  data: (ancGraphOptions4 || [])?.map((r: any) => r?.pct) || [],
                  type: "line",
                  label: {
                    show: true,
                    precision: 1,
                    formatter: (params: any) =>
                      `${formatNumber(params.value)}%`,
                  },
                },
              ],
              dataMonth?.map((r) => r.label)
            )}
          />
        </div>
        {/* 444444 end*/}
        {/* 55555 start*/}
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions5(
              [
                {
                  name: "Jumlah Bumil Anemia",
                  data:
                    (ancGtaphOptions5 || [])?.map((r: any) => r?.jumlah) || [],
                  type: "bar",
                  label: {
                    show: false,
                  },
                },
                {
                  name: "% Bumil Anemia",
                  data:
                    (ancGtaphOptions5 || [])?.map(
                      (r: any) => r?.persentase_bumil_anemia
                    ) || [],
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
                  data:
                    (ancGtaphOptions5 || [])?.map(
                      (r: any) => r?.persentase_nasional
                    ) || [],
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
        {/* 55555 end*/}
        {/* 66666666 */}
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions6(
              [
                {
                  name: "Melaksanakan Kunjungan ANC",
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
                  data: (ancGraphOptions6 || [])?.map((r: any) => r?.pct) || [],
                },
              ],
              ancGraphOptions6?.map((r: any) => r.label) || []
            )}
          />
        </div>
        {/* 66666666 */}
        {/* 777777 */}
        <div className="h-[600px]">
          <GraphEchartsAnc
            graphOptions={graphOptions7(
              [
                {
                  name: "Sasaran",
                  type: "bar",
                  barWidth: "50%",
                  data: ancGraphOptions7?.map((r: any) => r?.total || 0) || [],
                },
                {
                  name: "Persentase",
                  type: "line",
                  barWidth: "50%",
                  data: ancGraphOptions7?.map((r: any) => r?.pct || 0) || [],
                },
              ],
              ancGraphOptions7?.map((r: any) => r.label)
            )}
          />
        </div>
        {/* 777777 */}
      </div>
    </div>
  );
}
