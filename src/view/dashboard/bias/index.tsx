"use client";

import Image from "next/image";
import {
  Banner,
  BannerHighlightFooter,
  BannerText,
  GraphEcharts,
  Navbar,
  Sidebar,
  Spin,
  Tabs,
} from "@/components";
// import FilterSummaryImmunizationWus from "@/view/home/components/FilterWus";
import { useState } from "react";
import { dataMonth, dataTabBaduta } from "@/utils/constants";
import {
  ChildSummaryImmunization,
  GraphRoutineImmunizationCoverageTrend,
  RoutineImmunizationCoverageTrendGraph,
  GraphAddOn,
} from "@/view/home";
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png";
import styles from "@/assets/css/styles.module.css";
import { formatNumber } from "@/helpers";

import {
  useGetTotalImmunizationTotalCumulativeCoverageQuery,
  useGetTotalImmunizationTotalCumulativeCoverageRecipientsQuery,
} from "@/lib/services/wus";
import {
  useGetTotalCampakRubelaQuery,
  useGetTotalDt1Query,
  useGetTotalFullBiasQuery,
  useGetTotalRecipientsQuery,
  useGetTotalTd1Query,
  useGetTotalTd2Query,
  useGetTotalTd3Query,
  useGetTotalHpv1Query,
  useGetTotalHpv2Query,
  useGetTotalQuery,
  useGetTotalHighestQuery,
  useGetTotalLowestQuery,
  useGetAllRegionQuery,
  useGetChartQuery,
  useGetPctQuery,
  useGetFullBiasScopeQuery,
  useGetHighestScopeQuery,
  useGetLowestScopeQuery,
  useGetExceedTargetScopeQuery,
  // useGetNotExceedTargetScopeQuery,
  useGetChartScopeQuery,
  useGetNonIdealAgeQuery,
  useGetIdealAgeQuery,
  useGetChartbyAgeQuery,
  useGetAverageGenderQuery,
  useGetMostMaleQuery,
  useGetMostFemaleQuery,
  useGetChartByGenderQuery,
} from "@/lib/services/bias";
// import { Filter5 } from "../routine-baduta-immunization/Filter";
import { Filter1, Filter2, Filter3, Filter4, Filter5 } from "./FilterBias";
import {
  graphOptions2,
  graphOptions5,
} from "../routine-baduta-immunization/graphOptions";
import { graphOptions1 } from "../wus/graphOptions";

import { graphOptions3, graphOptions4 } from "./graphOptionts";

import { openSans } from "@/assets/fonts";
import {
  useGetAverageImmunizationByGenderQuery,
  useGetImmunizationWithHighetFemaleRecivientQuery,
  useGetImmunizationWithHighetMaleRecivientQuery,
  useGetMaxImmunizationByAgeQuery,
  useGetSummaryImmunizationByAgeQuery,
  useGetSummaryImmunizationPerGenderQuery,
  useGetSummaryImmunizationPerVaccineQuery,
  useGetTotalHighestScopeByVaccineTypeQuery,
  useGetTotalLowestScopeByVaccineTypeQuery,
  useGetTotalScopeByVaccineTypeQuery,
} from "@/lib/services/baduta-immunization";
import FilterSummaryImmunizationBias from "@/view/home/components/FilterBias";
import TabsBias from "@/components/tabsBias";
import GraphRoutineImmunizationCoverageTrendBias from "@/view/home/components/GraphBias";

const Bias = () => {
  const filterState = useState({
    tahun: 2024,
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
  const regionType = {
    region_type:
      filter.faskes && filter.kewilayahan_type == 0
        ? "FASKES"
        : filter.faskes && filter.kewilayahan_type == 1
          ? "KELURAHAN"
          : filter.kecamatan
            ? "KECAMATAN"
            : filter.kabkota
              ? "KABKO"
              : filter.provinsi
                ? "PROVINSI"
                : "ALL",
  };
  const filterQuery = {
    ...dateQuery,
    ...regionType,
    faskes_id: filter.faskes
      ? filter.faskes
      : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
          ? filter.kabkota
          : filter.provinsi
            ? filter.provinsi
            : "ALL",
    kewilayahan_type: filter.kewilayahan_type,
  };
  const optionQuery = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };
  const filterQueryTotal = {
    ...dateQuery,
    region_type: filter.wilayah2,
    // faskes_parent_id: 11,
    // faskes_id: filter.faskes
    //   ? filter.faskes
    //   : filter.kecamatan
    //   ? filter.kecamatan
    //   : filter.kabkota
    //   ? filter.kabkota
    //   : filter.provinsi
    //   ? filter.provinsi
    //   : "ALL",
    vaccine_type: filter.tipe_vaksin,
    kewilayahan_type: filter.kewilayahan_type,
  };
  const filterQueryGetAllRegion = {
    ...dateQuery,
    ...regionType,
    region_type_chart: filter.wilayah2,

    // faskes_parent_id: 11,
    // faskes_id: filter.faskes
    //   ? filter.faskes
    //   : filter.kecamatan
    //   ? filter.kecamatan
    //   : filter.kabkota
    //   ? filter.kabkota
    //   : filter.provinsi
    //   ? filter.provinsi
    //   : "ALL",
    vaccine_type: filter.tipe_vaksin,
    kewilayahan_type: filter.kewilayahan_type,
  };
  const filterQueryTotalHighest = {
    ...dateQuery,
    region_type: filter.wilayah2,
    vaccine_type: filter.tipe_vaksin,
    kewilayahan_type: filter.kewilayahan_type,
  };
  const filterQueryTotalChart = {
    ...dateQuery,
    // year: 2022,
    // month: 1,
    region_type: filter.wilayah,
    vaccine_type: filter.tipe_vaksin2,
    faskes_id: filter.faskes
      ? filter.faskes
      : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
          ? filter.kabkota
          : filter.provinsi
            ? filter.provinsi
            : "ALL",
    tren_type: filter.tren_type,
    kewilayahan_type: filter.kewilayahan_type,
  };

  // sample
  const regionIdQuery =
    filter.wilayah === "faskes"
      ? filter.faskes
      : filter.wilayah === "district"
        ? filter.kecamatan
        : filter.wilayah === "city"
          ? filter.kabkota
          : filter.wilayah === "province"
            ? filter.provinsi
            : "All";
  const filterQueryGraph = {
    ...dateQuery,
    region_type: filter.wilayah,
    region_id: regionIdQuery,
    kewilayahan_type: filter.kewilayahan_type,
  };
  const filterFullBiasScope = {
    ...dateQuery,
    region_type: filter.wilayah,
    faskes_id: filter.faskes
      ? filter.faskes
      : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
          ? filter.kabkota
          : filter.provinsi
            ? filter.provinsi
            : "ALL",
    kewilayahan_type: filter.kewilayahan_type,
    vaccine_type: filter.tipe_vaksin3,
  };
  const filterIdealAge = {
    ...dateQuery,
    region_type: filter.wilayah,
    faskes_id: filter.faskes
      ? filter.faskes
      : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
          ? filter.kabkota
          : filter.provinsi
            ? filter.provinsi
            : "ALL",
    kewilayahan_type: filter.kewilayahan_type,
    vaccine_type: filter.tipe_vaksin4,
  };
  const filterAverageGender = {
    ...dateQuery,
    // region_type: filter.wilayah,
    faskes_id: filter.faskes
      ? filter.faskes
      : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
          ? filter.kabkota
          : filter.provinsi
            ? filter.provinsi
            : "ALL",
    kewilayahan_type: filter.kewilayahan_type,
    vaccine_type: filter.tipe_vaksin5,
  };
  // sample

  // scorecard start
  const { data: getTotalRecipients, isLoading: isLoadingTotalRecipients } =
    useGetTotalRecipientsQuery(filterQuery, optionQuery);
  const { data: getTotalFullBias, isLoading: isLoadingTotalFullBias } =
    useGetTotalFullBiasQuery(filterQuery, optionQuery);
  const { data: getTotalCampakRubela, isLoading: isLoadingTotalCampakRubela } =
    useGetTotalCampakRubelaQuery(filterQuery, optionQuery);
  const { data: getTotalDt1, isLoading: isLoadingTotalDt1 } =
    useGetTotalDt1Query(filterQuery, optionQuery);
  const { data: getTotalTd1, isLoading: isLoadingTotalTd1 } =
    useGetTotalTd1Query(filterQuery, optionQuery);
  const { data: getTotalTd2, isLoading: isLoadingTotalTd2 } =
    useGetTotalTd2Query(filterQuery, optionQuery);
  const { data: getTotalTd3, isLoading: isLoadingTotalTd3 } =
    useGetTotalTd3Query(filterQuery, optionQuery);
  const { data: getTotalHpv1, isLoading: isLoadingTotalHpv1 } =
    useGetTotalHpv1Query(filterQuery, optionQuery);
  const { data: getTotalHpv2, isLoading: isLoadingTotalHpv2 } =
    useGetTotalHpv2Query(filterQuery, optionQuery);
  // scorecard end

  // cakupan daerah start
  const { data: getAllRegion, isLoading: isLoadingGetAllRegion } =
    useGetAllRegionQuery(filterQueryGetAllRegion, optionQuery);
  // cakupan daerah end

  const { data: getTotal, isLoading: isLoadingGetTotal } = useGetTotalQuery(
    filterQueryTotal,
    optionQuery
  );
  const { data: getTotalHighest, isLoading: isLoadingTotalHighest } =
    useGetTotalHighestQuery(filterQueryTotalHighest, optionQuery);
  const { data: getTotalLowest, isLoading: isLoadingTotalLowest } =
    useGetTotalLowestQuery(filterQueryTotal, optionQuery);

  const { data: getChart, isLoading: isLoadingChart } = useGetChartQuery(
    filterQueryTotalChart,
    optionQuery
  );

  const { data: getPct, isLoading: isLoadingPct } = useGetPctQuery(
    filterQueryTotalChart,
    optionQuery
  );
  const { data: getFullBiasScope, isLoading: isLoadingFullBiasScope } =
    useGetFullBiasScopeQuery(filterFullBiasScope, optionQuery);
  const { data: getHighestScope, isLoading: isLoadingHighestScope } =
    useGetHighestScopeQuery(
      // filterQueryHighestScope
      filterFullBiasScope,
      optionQuery
    );
  const { data: getLowestScope, isLoading: isLoadingLowestScope } =
    useGetLowestScopeQuery(filterFullBiasScope, optionQuery);
  const { data: getExceedTargetScope, isLoading: isLoadingExceedTargetScope } =
    useGetExceedTargetScopeQuery(filterFullBiasScope, optionQuery);
  const { data: getChartScope, isLoading: isLoadingChartScope } =
    useGetChartScopeQuery(filterFullBiasScope, optionQuery);
  const { data: getNonIdealAge, isLoading: isLoadingNonIdealAge } =
    useGetNonIdealAgeQuery(filterIdealAge, optionQuery);
  const { data: getIdealAge, isLoading: isLoadingIdealAge } =
    useGetIdealAgeQuery(filterIdealAge, optionQuery);
  const { data: getChartByAge, isLoading: isLoadingChartByAge } =
    useGetChartbyAgeQuery(filterIdealAge, optionQuery);
  const { data: getAverageGender, isLoading: isLoadingAverageGender } =
    useGetAverageGenderQuery(filterAverageGender, optionQuery);
  const { data: getMostMale, isLoading: isLoadingMostMale } =
    useGetMostMaleQuery(filterAverageGender, optionQuery);
  const { data: getMostFemale, isLoading: isLoadingMostFemale } =
    useGetMostFemaleQuery(filterAverageGender, optionQuery);
  const { data: getChartByGender, isLoading: isLoadingChartByGender } =
    useGetChartByGenderQuery(filterAverageGender, optionQuery);

  const dataGraphRegionalRoutineImmunizationCoverageTrend = [
    {
      title: `Total Cakupan BIAS Lengkap  Nasioanl Tahun ${filter.tahun}`,
      value: <div>{formatNumber(getTotal?.data?.pct || 0)}%</div>,
      regional: <></>,
      isLoading: isLoadingGetTotal,
    },
    {
      title: `Cakupan Tertinggi Tahun ${filter.tahun}`,
      value: <div>{formatNumber(getTotalHighest?.data?.pct || 0)}%</div>,
      regional: getTotalHighest?.data?.provinsi,
      isLoading: isLoadingTotalHighest,
    },
    {
      title: `Cakupan Terendah Tahun ${filter.tahun}`,
      value: getTotalLowest?.data?.pct,
      regional: getTotalLowest?.data?.provinsi,
      isLoading: isLoadingTotalLowest,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend2 = [
    {
      title: `Cakupan Imunisasi BIAS Lengkap (ISL)`,
      value: <div>{formatNumber(getFullBiasScope?.data?.pct || 0)}%</div>,
      regional: (
        <div>
          Jumlah Cakupan:{" "}
          {formatNumber(getFullBiasScope?.data?.target_6_sd || 0)}
        </div>
      ),
      isLoading: isLoadingFullBiasScope,
    },
    {
      title: `Cakupan Imunisasi Tertinggi`,
      value: <div>{getHighestScope?.data?.vaksin || ""}</div>,
      regional: (
        <div>
          Jumlah Cakupan: {formatNumber(getHighestScope?.data?.total || 0)}
        </div>
      ),
      threshold: (
        <div>% Cakupan: {formatNumber(getHighestScope?.data?.pct || 0)}%</div>
      ),
      isLoading: isLoadingHighestScope,
    },
    {
      title: `Cakupan Imunisasi Terendah`,
      value: (
        <div>
          {getLowestScope?.data?.vaksin === "ALL"
            ? "Baduta Lengkap"
            : getLowestScope?.data?.vaksin}
        </div>
      ),
      regional: (
        <div>
          Jumlah Cakupan: {formatNumber(getLowestScope?.data?.total || 0)}
        </div>
      ),
      threshold: (
        <div>% Cakupan: {formatNumber(getLowestScope?.data?.pct || 0)}%</div>
      ),
      isLoading: isLoadingLowestScope,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend3 = [
    {
      title: (
        <div className="font-bold text-xl">
          3 Imunisasi dengan Penerima{" "}
          <b style={{ color: "#EBB220" }}>Usia Non-Ideal</b> Terbanyak
        </div>
      ),
      value: getNonIdealAge?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.name}
        </li>
      )),
      isLoading: isLoadingNonIdealAge,
    },
    {
      title: (
        <div className="font-bold text-xl">
          3 Imunisasi dengan Penerima{" "}
          <b style={{ color: "#00B1A9" }}>Usia Ideal</b> Terbanyak
        </div>
      ),
      value: getIdealAge?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.name}
        </li>
      )),
      isLoading: isLoadingIdealAge,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend4 = [
    {
      title: `3 Imunisasi dengan Penerima Laki-laki Terbanyak`,
      value: getMostMale?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.name}
        </li>
      )),
      isLoading: isLoadingMostMale,
    },
    {
      title: `3 Imunisasi dengan Penerima Perempuan Terbanyak`,
      value: getMostFemale?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.name}
        </li>
      )),
      isLoading: isLoadingMostFemale,
    },
  ];
  const ageChartOptions: any = {
    color: ["#2E90FA", "#E478FA"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      x: "right",
    },
    series: [
      {
        name: "% cakupan",
        type: "pie",
        radius: "50%",
        label: {
          show: true,
          position: "inner",
          formatter: (params: any, i: number) =>
            `${params.name === "Laki-laki"
              ? getAverageGender?.data?.[0]?.pct_unique
              : getAverageGender?.data?.[1]?.pct_unique
            }%`,
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: getAverageGender?.data?.[0]?.pct_unique,
            name: "Laki-laki",
          },
          {
            value: getAverageGender?.data?.[1]?.pct_unique,
            name: "Perempuan",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center bg-image1 bg-support-b2 w-full">
        <div className="px-4 container">
          <Banner
            text={
              <BannerText
                highlight={`Dasbor Program Imunisasi Rutin`}
                highlightFooter={
                  <BannerHighlightFooter
                    look="567"
                    comment="145"
                    share="24"
                    classNameShare="text-support-b2"
                  />
                }
              />
            }
          />
        </div>
      </div>

      <div className="px-4 container">
        <div className="flex gap-6">
          <Sidebar />
          <div className="w-full">
            <TabsBias
              data={dataTabBaduta}
              variant="private"
              value={filter.kewilayahan_type}
              filterState={filterState}
            />
            <div className="flex flex-col gap-4 text-sm">
              <div className="font-bold text-primary-1 text-xl md:text-3xl">
                Imunisasi Rutin BIAS
              </div>
              <div className={`${openSans.className}`}>
                Menampilkan data cakupan imunisasi rutin anak usia sekolah
                berdasarkan jenis imunisasi, daerah cakupan, usia pemberian, dan
                jenis kelammin bayi.
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunizationBias filterState={filterState} />
            </div>
            <div className="py-6"></div>

            <div className="pb-12">
              <div className="font-bold text-primary-2 text-xl md:text-3xl">
                Ringkasan Data Cakupan Imunisasi Rutin BIAS
              </div>
              <div>
                Ringkasan berisi data total penerima imunisasi rutin anak
                sekolah dan jenis imunusasi rutin anak sekolah terhadap target
                cakupan yang sudah ditentukan.
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-4 mt-4">
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalRecipients && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-4 border rounded-lg ${styles.scoreCardPurple}`}
                    background="#9F1AB1"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title="Total Penerima Imunisasi BIAS"
                    value={formatNumber(getTotalRecipients?.data?.total) || "0"}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalFullBias && <Spin />}
                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    title="Bias Lengkap"
                    contentTooltip={<>Bias Lengkap</>}
                    value={formatNumber(getTotalFullBias?.data?.total) || "0"}
                    percent={getTotalFullBias?.data?.pct || "0"}
                    target={formatNumber(getTotalFullBias?.data?.target) || "0"}
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalCampakRubela && <Spin />}
                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={"Campak Rubela - Kelas 1"}
                    value={
                      formatNumber(getTotalCampakRubela?.data?.total) || "0"
                    }
                    percent={getTotalCampakRubela?.data?.pct || "0"}
                    target={
                      formatNumber(getTotalCampakRubela?.data?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalDt1 && <Spin />}

                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={"DT 1 - Kelas 1"}
                    value={formatNumber(getTotalDt1?.data?.total) || "0"}
                    percent={getTotalDt1?.data?.pct || "0"}
                    target={formatNumber(getTotalDt1?.data?.target) || "0"}
                    subtitle={"dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalTd1 && <Spin />}
                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={"Td 1 - Kelas 2"}
                    value={formatNumber(getTotalTd1?.data?.total) || "0"}
                    percent={getTotalTd1?.data?.pct || "0"}
                    target={formatNumber(getTotalTd1?.data?.target) || "0"}
                    subtitle={"dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalTd2 && <Spin />}
                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={"Td 2 - Kelas 5"}
                    value={formatNumber(getTotalTd2?.data?.total) || "0"}
                    percent={getTotalTd2?.data?.pct || "0"}
                    target={formatNumber(getTotalTd2?.data?.target) || "0"}
                    subtitle={"dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalTd3 && <Spin />}
                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={"Td 3"}
                    value={formatNumber(getTotalTd3?.data?.total) || "0"}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalHpv1 && <Spin />}
                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={"HPV 1 - Kelas 5"}
                    value={formatNumber(getTotalHpv1?.data?.total) || "0"}
                    percent={getTotalHpv1?.data?.pct || "0"}
                    target={formatNumber(getTotalHpv1?.data?.target) || "0"}
                    subtitle={"dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalHpv2 && <Spin />}
                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={"HPV 2 - Kelas 6"}
                    value={formatNumber(getTotalHpv2?.data?.total) || "0"}
                    percent={getTotalHpv2?.data?.pct || "0"}
                    target={formatNumber(getTotalHpv2?.data?.target) || "0"}
                    subtitle={"dari "}
                  />
                </div>
              </div>
            </div>

            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Daerah Imunisasi BIAS"
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      layout="vertical"
                      title={
                        <div className="font-bold md:text-2xl">
                          Data Cakupan{" "}
                          <b className="text-primary-2">{filter.nama_vaksin}</b>{" "}
                          pada {filter.wilayah_name} di{" "}
                          <b className="text-primary-2">Indonesia</b> Selama
                          Tahun <b className="text-primary-2">{filter.tahun}</b>
                        </div>
                      }
                      subTitle="Grafik menampilkan hasil cakupan imunisasi dasar lengkap dari 38 provinsi di Indonesia"
                      addOn={
                        <GraphAddOn
                          dataCard={
                            dataGraphRegionalRoutineImmunizationCoverageTrend
                          }
                        />
                      }
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter1 filterState={filterState} />}
                      isLoading={isLoadingGetAllRegion}
                      opts={{
                        height: 900,
                      }}
                      graphOptions={graphOptions1(
                        [
                          {
                            // @ts-ignore
                            name: "Target Cakupan per Daerah = 100%",
                            data:
                              (getAllRegion?.data || [])?.map(
                                (r: any) => r?.pct
                              ) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              position: "right",
                              formatter: (params: any) => `${params.value}%`,
                            },
                          },
                          {
                            name: "Target",
                            type: "line",
                            color: "#CD4243",
                            data:
                              (getAllRegion?.data || [])?.map(
                                (r: any) => r?.threshold
                              ) || [],
                          },
                        ],
                        (getAllRegion?.data || [])?.map((r: any) => r.faskes)
                      )}
                    />
                  </div>
                }
              />
            </div>

            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi BIAS "
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={
                        <div className="font-bold md:text-2xl">
                          Data{" "}
                          {filter.tren_type
                            .toLowerCase()
                            .replace(
                              /^./,
                              filter.tren_type[0].toUpperCase()
                            )}{" "}
                          Jumlah Penerima, Cakupan, dan Target Cakupan{" "}
                          <b className="text-primary-2">{filter.nama_vaksin}</b>{" "}
                          pada Anak Usia Sekolah Selama Tahun{" "}
                          <b className="text-primary-2">{filter.tahun}</b>
                        </div>
                      }
                      subTitle={`Grafik menampilkan tren cakupan kumulatif penerima imunisasi dasar lengkap pada anak sekolah selama tahun ${filter.tahun}`}
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter2 filterState={filterState} />}
                      threshold={
                        <div className="relative flex justify-center items-center">
                          {isLoadingPct && <Spin />}
                          <div className="p-2 sm:w-32 md:w-64 h-fit">
                            <div className="text-sm">
                              Total cakupan kumulatif pada tahun {filter.tahun}
                            </div>
                            <div className="py-2 font-bold text-3xl text-primary">
                              {formatNumber(getPct?.data?.pct || 0)}%
                            </div>
                            <div>
                              Jumlah BIAS Lengkap:{" "}
                              {formatNumber(getPct?.data?.ytd || 0)}
                            </div>
                          </div>
                        </div>
                      }
                      isLoading={isLoadingChart}
                      graphOptions={graphOptions2([
                        {
                          name: "% Target Cakupan",
                          data:
                            (getChart?.data || [])?.map(
                              (r: any) => r?.target_cakupan
                            ) || [],
                          type: "line",
                        },
                        {
                          name: "Jumlah Penerima Imunisasi",
                          data:
                            (getChart?.data || [])?.map(
                              (r: any) => r?.jumlah_penerima
                            ) || [],
                          type: "bar",
                        },
                        {
                          name: "% Cakupan",
                          data:
                            (getChart?.data || [])?.map(
                              (r: any) => r?.cakupan
                            ) || [],
                          type: "line",
                        },
                      ])}
                    />
                  </div>
                }
              />
            </div>
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title=""
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrendBias
                      layout="vertical"
                      title={
                        <div className="font-bold md:text-2xl">
                          <b className="text-primary-2">
                            Grafik Cakupan Imunisasi pada Anak Usia Sekolah
                            Berdasarkan Jenis Imunisasi
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan tren cakupan imunisasi berdasarkan jenis imunisasi pada anak sekolah."
                      addOn={
                        <GraphAddOn
                          dataCard={
                            dataGraphRegionalRoutineImmunizationCoverageTrend2
                          }
                        />
                      }
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter3 filterState={filterState} />}
                      threshold={
                        <div className="text-sm">
                          <div className="relative">
                            {isLoadingExceedTargetScope && <Spin />}
                            <div
                              className="relative mt-5 px-4 py-3 rounded-xl h-32"
                              style={{
                                boxShadow: "0px 2px 12px 0px #00000014",
                              }}
                            >
                              <div className="font-bold">
                                Imunisasi yang Melampaui Target Cakupan
                              </div>
                              <div style={{ display: "flex" }}>
                                {getExceedTargetScope?.data
                                  ?.filter((item: any) => item.value === 1)
                                  .map((r: any, i: number) => (
                                    <p key={i + "exceed"}>
                                      {r.name}
                                      {", "}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            {isLoadingExceedTargetScope && <Spin />}
                            <div
                              className="my-5 px-4 py-3 rounded-xl h-32"
                              style={{
                                boxShadow: "0px 2px 12px 0px #00000014",
                              }}
                            >
                              <div className="font-bold">
                                Imunisasi yang Belum Melampaui Target Cakupan
                              </div>
                              <div style={{ display: "flex" }}>
                                {getExceedTargetScope?.data
                                  ?.filter((item: any) => item.value === 0)
                                  .map((r: any, i: number) => (
                                    <p key={i + "exceed"}>
                                      {r.name}
                                      {", "}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      isLoading={isLoadingChartScope}
                      graphOptions={graphOptions3(
                        [
                          {
                            name: "Cakupan",
                            data:
                              (getChartScope?.data || [])?.map(
                                (r: any) => r?.ytd
                              ) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(params.value || 0)}`,
                            },
                          },
                          {
                            name: "% Cakupan",
                            data:
                              (getChartScope?.data || [])?.map(
                                (r: any) =>
                                  ((r?.pct || 0) / 100) * (r?.ytd || 0)
                              ) || [],
                            type: "line",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(
                                  ((params.value || 0) /
                                    (getChartScope?.data || [])[
                                      params.dataIndex
                                    ]?.ytd) *
                                  100
                                )}%`,
                            },
                          },
                          {
                            name: "% Target Cakupan",
                            data:
                              (getChartScope?.data || [])?.map(
                                (r: any) =>
                                  ((r?.thrs || 0) / 100) * (r?.ytd || 0)
                              ) || [],
                            type: "line",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(
                                  ((params.value || 0) /
                                    (getChartScope?.data || [])[
                                      params.dataIndex
                                    ]?.ytd) *
                                  100
                                )}%`,
                            },
                          },
                        ],
                        getChartScope?.data?.map((r: any) => r?.vaccine)
                      )}
                    />
                  </div>
                }
              />
            </div>
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title=""
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      layout="vertical"
                      title={
                        <div className="font-bold md:text-2xl">
                          <b className="text-primary-2">
                            Grafik Cakupan Imunisasi Berdasarkan Usia Pemberian
                            Imunisasi
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan tren cakupan imunisasi pada anak usia sekolah berdasarkan usia pemberian imunisasi."
                      addOn={
                        <div
                          className={`gap-4 grid grid-cols-2 text-sm ${openSans.className}`}
                        >
                          {dataGraphRegionalRoutineImmunizationCoverageTrend3.map(
                            (r, i) => (
                              <div
                                className="px-4 py-3 rounded-xl"
                                style={{
                                  boxShadow: "0px 2px 12px 0px #00000014",
                                }}
                              >
                                <div className="font-bold">{r.title}</div>
                                <div>
                                  <ul>{r?.value}</ul>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      }
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter4 filterState={filterState} />}
                      isLoading={isLoadingChartByAge}
                      graphOptions={graphOptions4(
                        [
                          {
                            name: "Usia Ideal",
                            data:
                              (getChartByAge?.data || [])?.map(
                                (r: any) => r?.ideal
                              ) || [],
                            type: "bar",
                          },
                          {
                            name: "Usia Non Ideal",
                            data:
                              (getChartByAge?.data || [])?.map(
                                (r: any) => r?.non_ideal
                              ) || [],
                            type: "bar",
                          },
                        ],
                        getChartByAge?.data?.map((r: any) => r?.name)
                      )}
                    />
                  </div>
                }
              />
            </div>
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title=""
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      layout="vertical"
                      title={
                        <div className="font-bold md:text-2xl">
                          <b className="text-primary-2">
                            Grafik Distribusi Imunisasi pada Anak Sekolah
                            Berdasarkan Jenis Kelamin
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan cakupan imunisasi pada anak sekolah berdasarkan jenis kelamin."
                      addOn={
                        <div className="flex gap-4 text-sm">
                          <div className="relative flex flex-1 justify-center items-center">
                            {/* {isLoadingAverageImmunizationByGenderQuery && (
                              <Spin />
                            )} */}
                            <div
                              className="px-4 py-3 rounded-xl w-full h-full"
                              style={{
                                boxShadow: "0px 2px 12px 0px #00000014",
                              }}
                            >
                              <div className="font-bold text-lg">
                                Rata-Rata Penerima Imunisasi Berdasarkan Jenis
                                Kelamin
                              </div>
                              <GraphEcharts graphOptions={ageChartOptions} />
                            </div>
                          </div>
                          {dataGraphRegionalRoutineImmunizationCoverageTrend4.map(
                            (r, i) => (
                              <div
                                key={`gender-score-${i}`}
                                className="relative flex flex-1 justify-center items-center"
                              >
                                {/* {r?.isLoading && <Spin />} */}
                                <div
                                  className="flex-1 px-4 py-3 rounded-xl w-full h-full"
                                  style={{
                                    boxShadow: "0px 2px 12px 0px #00000014",
                                  }}
                                >
                                  <div className="font-bold text-lg">
                                    {r.title}
                                  </div>
                                  <div>
                                    <ul>{r?.value}</ul>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      }
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter5 filterState={filterState} />}
                      isLoading={isLoadingChartByGender}
                      graphOptions={graphOptions5(
                        [
                          {
                            name: "Laki-laki",
                            data:
                              (getChartByGender?.data || [])?.map(
                                (r: any) => r?.male
                              ) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(
                                  (getChartByGender?.data || [])[
                                    params.dataIndex
                                  ]?.male
                                )}%`,
                            },
                          },
                          {
                            name: "Perempuan",
                            data:
                              (getChartByGender?.data || [])?.map(
                                (r: any) => r?.female
                              ) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(
                                  (getChartByGender?.data || [])[
                                    params.dataIndex
                                  ]?.female
                                )}%`,
                            },
                          },
                        ],
                        getChartByGender?.data?.map((r: any) => r?.name)
                      )}
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bias;
