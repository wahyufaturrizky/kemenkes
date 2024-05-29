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
} from "@/lib/services/bias";
import {
  Filter3,
  Filter4,
  Filter5,
} from "../routine-baduta-immunization/Filter";
import { Filter1, Filter2 } from "./FilterBias";
import {
  graphOptions1,
  graphOptions2,
  graphOptions3,
  graphOptions4,
  graphOptions5,
} from "../routine-baduta-immunization/graphOptions";
import { openSans } from "@/assets/fonts";
import {
  useGetAverageImmunizationByGenderQuery,
  useGetExceedTargetPerVaccineQuery,
  useGetImmunizationWithHighetFemaleRecivientQuery,
  useGetImmunizationWithHighetMaleRecivientQuery,
  useGetInExceedTargetPerVaccineQuery,
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

const Bias = () => {
  const filterState = useState({
    tahun: 2024,
    bulan: dataMonth.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: "",
    kabkota: "",
    kecamatan: "",
    faskes: "",
    wilayah: "PROVINSI",
    kewilayahan_type: 0,
    tipe_vaksin: "bias",
    tipe_vaksin2: "bias",
    tren_type: "kumulatif",
  });
  const [filter] = filterState;
  const dateQuery = {
    year: filter.tahun,
    month: filter.bulan,
  };
  const filterQuery = {
    ...dateQuery,
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
    // faskes_parent_id:
    //   filter.provinsi !== "" &&
    //   filter.kabkota !== "" &&
    //   filter.kecamatan === undefined
    //     ? filter.provinsi
    //     : filter.provinsi !== "" &&
    //       filter.kabkota !== "" &&
    //       filter.kecamatan !== ""
    //     ? filter.kabkota
    //     : filter.provinsi !== "" && filter.kabkota !== ""
    //     ? filter.provinsi
    //     : filter.provinsi !== ""
    //     ? filter.provinsi
    //     : "All",
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
    region_type: "PROVINSI",
    // faskes_parent_id: 11,
    faskes_id: 11,
    vaccine_type: "bias",
  };
  const filterQueryTotalHighest = {
    ...dateQuery,
    region_type: filter.wilayah,
    vaccine_type: filter.tipe_vaksin,
    kewilayahan_type: filter.kewilayahan_type,
  };
  const filterQueryTotalChart = {
    // ...dateQuery,
    year: 2022,
    month: 1,
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
  // const filterQueryTotalLowest = {
  //   ...filterQueryTotalCoverage,
  //   faskes_desc: "PAPUA PEGUNUNGAN",
  // };
  const filterCumulativeCoverage = {
    ...dateQuery,
    region_type: filter?.wilayah,
    women_category: "All",
  };
  const filterCumulativeCoverageRecipients = {
    ...dateQuery,
    region_type: "All",
    women_category: "All",
  };
  // const filterQuery = {
  //   ...dateQuery,
  //   region_type: "PROVINSI",
  //   faskes_id: 11,
  // };

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
  // sample

  const { data: getTotalRecipients } = useGetTotalRecipientsQuery(
    filterQuery,
    optionQuery
  );

  const { data: getTotalFullBias } = useGetTotalFullBiasQuery(
    filterQuery,
    optionQuery
  );
  const { data: getTotalCampakRubela } = useGetTotalCampakRubelaQuery(
    filterQuery,
    optionQuery
  );
  const { data: getTotalDt1 } = useGetTotalDt1Query(filterQuery, optionQuery);
  const { data: getTotalTd1 } = useGetTotalTd1Query(filterQuery, optionQuery);
  const { data: getTotalTd2 } = useGetTotalTd2Query(filterQuery, optionQuery);
  const { data: getTotalTd3 } = useGetTotalTd3Query(filterQuery, optionQuery);
  const { data: getTotalHpv1 } = useGetTotalHpv1Query(filterQuery, optionQuery);
  const { data: getTotalHpv2 } = useGetTotalHpv2Query(filterQuery, optionQuery);

  // console.log(getTotalHpv2, "isi bias");
  const { data: getTotal } = useGetTotalQuery(filterQueryTotal, optionQuery);
  const { data: getTotalHighest } = useGetTotalHighestQuery(
    filterQueryTotalHighest,
    optionQuery
  );
  const { data: getTotalLowest } = useGetTotalLowestQuery(
    filterQueryTotalHighest,
    optionQuery
  );
  const { data: getAllRegion } = useGetAllRegionQuery(
    filterQueryTotalHighest,
    optionQuery
  );
  const { data: getChart } = useGetChartQuery(filterQueryTotalChart);
  const { data: getPct } = useGetPctQuery(filterQueryTotalChart);
  const { data: getFullBiasScope } = useGetFullBiasScopeQuery(
    filterQueryTotalChart
  );
  const { data: getHighestScope } = useGetHighestScopeQuery(
    filterQueryTotalChart
  );
  const { data: getLowestScope } = useGetLowestScopeQuery(
    filterQueryTotalChart
  );
  const { data: getExceedTargetScope } = useGetExceedTargetScopeQuery(
    filterQueryTotalChart
  );
  // filterQueryTotalHighest,
  // optionQuery

  // console.log(getExceedTargetScope, "total ");

  // const { data: getTotalImmunizationTotalCoverageQuery } =
  //   useGetTotalImmunizationTotalCoverageQuery(filterQueryTotalCoverage);
  // const { data: getTotalImmunizationTotalCoverageHighestQuery } =
  //   useGetTotalImmunizationTotalCoverageHighestQuery(filterQueryTotalHighest);
  // const { data: getTotalImmunizationTotalCoverageLowestQuery } =
  //   useGetTotalImmunizationTotalCoverageLowestQuery(
  //     filterQueryTotalCoverageLowest
  //   );
  const { data: getTotalImmunizationTotalCumulativeCoverageQuery } =
    useGetTotalImmunizationTotalCumulativeCoverageQuery(
      filterCumulativeCoverage
    );
  const { data: getTotalImmunizationTotalCumulativeCoverageRecipientsQuery } =
    useGetTotalImmunizationTotalCumulativeCoverageRecipientsQuery(
      filterCumulativeCoverageRecipients
    );

  // sample
  const {
    data: getInExceedTargetPerVaccineQuery,
    isLoading: isLoadingInExceedTargetPerVaccineQuery,
  } = useGetInExceedTargetPerVaccineQuery(filterQueryGraph, optionQuery);

  const {
    data: getExceedTargetPerVaccineQuery,
    isLoading: isLoadingExceedTargetPerVaccineQuery,
  } = useGetExceedTargetPerVaccineQuery(filterQueryGraph, optionQuery);

  const {
    data: getSummaryImmunizationByAgeQuery,
    isLoading: isLoadingSummaryImmunizationByAgeQuery,
  } = useGetSummaryImmunizationByAgeQuery(filterQueryGraph, optionQuery);
  const { data: getSummaryImmunizationPerVaccineQuery } =
    useGetSummaryImmunizationPerVaccineQuery(filterQueryGraph, optionQuery);
  const {
    data: getMaxImmunizationByAgeQuery3,
    isLoading: isLoadingMaxImmunizationByAgeQuery3,
  } = useGetMaxImmunizationByAgeQuery(
    { ...filterQueryGraph, age_type: 3 },
    optionQuery
  );
  const {
    data: getMaxImmunizationByAgeQuery2,
    isLoading: isLoadingMaxImmunizationByAgeQuery2,
  } = useGetMaxImmunizationByAgeQuery(
    { ...filterQueryGraph, age_type: 2 },
    optionQuery
  );
  const {
    data: getTotalScopeByVaccineTypeQuery,
    isLoading: isLoadingTotalScopeByVaccineTypeQuery,
  } = useGetTotalScopeByVaccineTypeQuery(
    { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin },
    optionQuery
  );
  const {
    data: getTotalHighestScopeByVaccineTypeQuery,
    isLoading: isLoadingTotalHighestScopeByVaccineTypeQuery,
  } = useGetTotalHighestScopeByVaccineTypeQuery(filterQueryGraph, optionQuery);
  const {
    data: getTotalLowestScopeByVaccineTypeQuery,
    isLoading: isLoadingTotalLowestScopeByVaccineTypeQuery,
  } = useGetTotalLowestScopeByVaccineTypeQuery(filterQueryGraph, optionQuery);
  const {
    data: getAverageImmunizationByGenderQuery,
    isLoading: isLoadingAverageImmunizationByGenderQuery,
  } = useGetAverageImmunizationByGenderQuery(filterQueryGraph, optionQuery);
  // console.log(getTotalHighest, "isi total");
  const {
    data: getImmunizationWithHighetMaleRecivientQuery,
    isLoading: isLoadingImmunizationWithHighetMaleRecivientQuery,
  } = useGetImmunizationWithHighetMaleRecivientQuery(
    filterQueryGraph,
    optionQuery
  );
  const {
    data: getImmunizationWithHighetFemaleRecivientQuery,
    isLoading: isLoadingImmunizationWithHighetFemaleRecivientQuery,
  } = useGetImmunizationWithHighetFemaleRecivientQuery(
    filterQueryGraph,
    optionQuery
  );
  const {
    data: getSummaryImmunizationPerGenderQuery,
    isLoading: isLoadingSummaryImmunizationPerGenderQuery,
  } = useGetSummaryImmunizationPerGenderQuery(filterQueryGraph, optionQuery);

  const dataGraphRegionalRoutineImmunizationCoverageTrend = [
    {
      title: `Total Cakupan BIAS Lengkap  Nasioanl Tahun ${filter.tahun}`,
      value: <div>{formatNumber(getTotal?.data.pct || 0)}%</div>,
      regional: "",
    },
    {
      title: "Cakupan Tertinggi Tahun 2024",
      value: <div>{formatNumber(getTotalHighest?.data?.pct || 0)}%</div>,
      regional: getTotalHighest?.data?.provinsi,
    },
    {
      title: "Cakupan Terendah Tahun 2024",
      value: getTotalLowest?.data?.pct,

      regional: getTotalLowest?.data?.provinsi,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend2 = [
    {
      title: `Cakupan Imunisasi BIAS Lengkap (ISL)`,
      value: <div>{formatNumber(getFullBiasScope?.data?.pct || 0)}%</div>,
      regional: (
        <div>
          Jumlah Cakupan: {formatNumber(getFullBiasScope?.data?.ytd || 0)}
        </div>
      ),
      isLoading: isLoadingTotalScopeByVaccineTypeQuery,
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
      isLoading: isLoadingTotalHighestScopeByVaccineTypeQuery,
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
      isLoading: isLoadingTotalLowestScopeByVaccineTypeQuery,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend3 = [
    {
      title: (
        <div className="font-bold text-xl">
          3 Imunisasi dengan Penerima{" "}
          <b style={{ color: "#83E0DB" }}>Usia Ideal</b> Terbanyak
        </div>
      ),
      value: getMaxImmunizationByAgeQuery2?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.vaccine}
        </li>
      )),
      isLoading: isLoadingMaxImmunizationByAgeQuery2,
    },
    {
      title: (
        <div className="font-bold text-xl">
          3 Imunisasi dengan Penerima{" "}
          <b style={{ color: "#00B1A9" }}>Usia Non Ideal</b> Terbanyak
        </div>
      ),
      value: getMaxImmunizationByAgeQuery3?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.vaccine}
        </li>
      )),
      isLoading: isLoadingMaxImmunizationByAgeQuery3,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend4 = [
    {
      title: `3 Imunisasi dengan Penerima Usia Perempuan Terbanyak`,
      value: getImmunizationWithHighetMaleRecivientQuery?.data?.map(
        (r: any, i: number) => (
          <li key={i + "max"}>
            {i + 1}. {r.vaccine}
          </li>
        )
      ),
      isLoading: isLoadingImmunizationWithHighetMaleRecivientQuery,
    },
    {
      title: `3 Imunisasi dengan Penerima Usia Susulan Terbanyak`,
      value: getImmunizationWithHighetFemaleRecivientQuery?.data?.map(
        (r: any, i: number) => (
          <li key={i + "max"}>
            {i + 1}. {r.vaccine}
          </li>
        )
      ),
      isLoading: isLoadingImmunizationWithHighetFemaleRecivientQuery,
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
        name: "Access From",
        type: "pie",
        radius: "50%",
        label: {
          show: true,
          position: "inner",
          formatter: (params: any, i: number) =>
            `${
              params.name === "Laki-laki"
                ? getAverageImmunizationByGenderQuery?.data?.pct_female
                : getAverageImmunizationByGenderQuery?.data?.pct_male
            }%`,
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: getAverageImmunizationByGenderQuery?.data?.total_male,
            name: "Laki-laki",
          },
          {
            value: getAverageImmunizationByGenderQuery?.data?.total_female,
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

  // console.log(filter, "isi filter");

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
              <div className={`${openSans.className}`}>
                UPDATE TERAKHIR: 23 SEPTEMBER 2023
              </div>
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
                <ChildSummaryImmunization
                  className={`px-4 border rounded-lg ${styles.scoreCardPurple}`}
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi BIAS"
                  value={formatNumber(getTotalRecipients?.data?.total) || "0"}
                />
                <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  title="Bias Lengkap"
                  contentTooltip={<>Bias Lengkap</>}
                  value={formatNumber(getTotalFullBias?.data?.total) || "0"}
                  percent={getTotalFullBias?.data?.pct || "0"}
                  target={formatNumber(getTotalFullBias?.data?.target) || "0"}
                  subtitle={" dari "}
                />
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
                  value={formatNumber(getTotalCampakRubela?.data?.total) || "0"}
                  percent={getTotalCampakRubela?.data?.pct || "0"}
                  target={
                    formatNumber(getTotalCampakRubela?.data?.target) || "0"
                  }
                  subtitle={" dari "}
                />
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
                          <b className="text-primary-2">BIAS Lengkap</b> pada
                          Provinsi di{" "}
                          <b className="text-primary-2">Indonesia</b> Selama
                          Tahun <b className="text-primary-2">2024</b>
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
                      graphOptions={graphOptions1(
                        (getAllRegion?.data || [])?.map((r: any) => {
                          return {
                            name: r.faskes,
                            data:
                              (getAllRegion?.data || [])?.map(
                                (r: any) => r?.pct
                              ) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              position: "right",
                              formatter: (params: any) =>
                                `${params.value}% (${r?.ytd})`,
                            },
                          };
                        })
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
                          Data Kumulatif Jumlah Penerima, Cakupan, dan Target
                          Cakupan <b className="text-primary-2">BIAS Lengkap</b>{" "}
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
                          {/* {isLoadingSetSummaryScopePercentageQuery && <Spin />} */}
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
                    <GraphRoutineImmunizationCoverageTrend
                      layout="vertical"
                      title={
                        <div className="font-bold md:text-2xl">
                          <b className="text-primary-2">
                            Grafik Cakupan Imunisasi pada Baduta Berdasarkan
                            Jenis Imunisasi
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan tren cakupan imunisasi berdasarkan jenis imunisasi pada baduta."
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
                        <div className="sm:w-32 md:w-64 text-sm">
                          <div className="relative flex justify-center items-center">
                            {isLoadingExceedTargetPerVaccineQuery && <Spin />}
                            <div
                              className="relative px-4 py-3 rounded-xl"
                              style={{
                                boxShadow: "0px 2px 12px 0px #00000014",
                              }}
                            >
                              <div className="font-bold">
                                Imunisasi yang Melampaui Target Cakupan
                              </div>
                              <div>
                                <ul>
                                  {getExceedTargetPerVaccineQuery?.data?.map(
                                    (r: any, i: number) => (
                                      <li key={i + "exceed"}>
                                        {i + 1}. {r.vaccine}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="relative flex justify-center items-center">
                            {isLoadingInExceedTargetPerVaccineQuery && <Spin />}
                            <div
                              className="px-4 py-3 rounded-xl"
                              style={{
                                boxShadow: "0px 2px 12px 0px #00000014",
                              }}
                            >
                              <div className="font-bold">
                                Imunisasi yang Belum Melampaui Target Cakupan
                              </div>
                              <div>
                                <ul>
                                  {getInExceedTargetPerVaccineQuery?.data?.map(
                                    (r: any, i: number) => (
                                      <li key={i + "inexceed"}>
                                        {i + 1}. {r.vaccine}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      // graphOptions={graphOptions3(
                      //   [
                      //     {
                      //       name: "% Cakupan",
                      //       data:
                      //         // getSummaryImmunizationPerVaccineQuery?.data ||
                      //         []?.map(
                      //           (r: any) =>
                      //             ((r?.pct || 0) / 100) * (r?.total || 0)
                      //         ) || [],
                      //       type: "line",
                      //       label: {
                      //         show: true,
                      //         precision: 1,
                      //         formatter: (params: any) =>
                      //           `${formatNumber(
                      //             ((params.value || 0) /
                      //               (getTotalHpv2?.data || [])[params.dataIndex]
                      //                 ?.total) *
                      //               100
                      //           )}%`,
                      //       },
                      //     },
                      //     {
                      //       name: "% Target Cakupan",
                      //       data:
                      //         (getTotalHpv2?.data || [])?.map(
                      //           (r: any) =>
                      //             ((r?.pct || 0) / 100) * (r?.total || 0)
                      //         ) || [],
                      //       type: "line",
                      //       label: {
                      //         show: true,
                      //         precision: 1,
                      //         formatter: (params: any) =>
                      //           `${formatNumber(
                      //             ((params.value || 0) /
                      //               (getTotalHpv2?.data || [])[params.dataIndex]
                      //                 ?.total) *
                      //               100
                      //           )}%`,
                      //       },
                      //     },
                      //     {
                      //       name: "Cakupan",
                      //       data:
                      //         (getTotalHpv2?.data || [])?.map(
                      //           (r: any) => r?.total
                      //         ) || [],
                      //       type: "bar",
                      //       label: {
                      //         show: true,
                      //         precision: 1,
                      //         formatter: (params: any) =>
                      //           `${formatNumber(params.value || 0)}`,
                      //       },
                      //     },
                      //   ],
                      //   getTotalHpv2?.data?.map((r: any) => r?.vaccine)
                      // )}
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
                            Grafik Cakupan Imunisasi pada Baduta Berdasarkan
                            Usia Pemberian Imunisasi
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan tren cakupan imunisasi pada baduta berdasarkan usia pemberian imunisasi."
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
                      isLoading={isLoadingSummaryImmunizationByAgeQuery}
                      graphOptions={graphOptions4(
                        [
                          {
                            name: "Usia Ideal",
                            data:
                              (
                                getSummaryImmunizationByAgeQuery?.data || []
                              )?.map((r: any) => r?.total_ideal) || [],
                            type: "bar",
                          },
                          {
                            name: "Usia Non Ideal",
                            data:
                              (
                                getSummaryImmunizationByAgeQuery?.data || []
                              )?.map((r: any) => r?.total_non_ideal) || [],
                            type: "bar",
                          },
                        ],
                        getSummaryImmunizationPerVaccineQuery?.data?.map(
                          (r: any) => r?.vaccine
                        )
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
                            Grafik Distribusi Imunisasi pada Baduta Berdasarkan
                            Jenis Kelamin
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan cakupan imunisasi pada baduta berdasarkan jenis kelamin."
                      addOn={
                        <div className="flex gap-4 text-sm">
                          <div className="relative flex flex-1 justify-center items-center">
                            {isLoadingAverageImmunizationByGenderQuery && (
                              <Spin />
                            )}
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
                                {r?.isLoading && <Spin />}
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
                      isLoading={isLoadingSummaryImmunizationPerGenderQuery}
                      graphOptions={graphOptions5(
                        [
                          {
                            name: "Laki-laki",
                            data:
                              (
                                getSummaryImmunizationPerGenderQuery?.data || []
                              )?.map((r: any) => r?.total_male) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(
                                  (getSummaryImmunizationPerGenderQuery?.data ||
                                    [])[params.dataIndex]?.pct_male
                                )}%`,
                            },
                          },
                          {
                            name: "Perempuan",
                            data:
                              (
                                getSummaryImmunizationPerGenderQuery?.data || []
                              )?.map((r: any) => r?.total_female) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(
                                  (getSummaryImmunizationPerGenderQuery?.data ||
                                    [])[params.dataIndex]?.pct_female
                                )}%`,
                            },
                          },
                        ],
                        getSummaryImmunizationPerGenderQuery?.data?.map(
                          (r: any) => r?.vaccine
                        )
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
