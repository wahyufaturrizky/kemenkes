"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import styles from "@/assets/css/styles.module.css";
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png";
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
import {
  ChildSummaryImmunization,
  GraphAddOn,
  GraphRoutineImmunizationCoverageTrend,
  RoutineImmunizationCoverageTrendGraph,
  SummaryImmunization,
  TotalSummaryImmunization,
} from "@/view/home";
import FilterSummaryImmunizationBayi from "@/view/home/components/FilterBayi";

import ChildSummaryImmunizationBayi from "@/view/home/components/ChildSuemmryBayi";
import {
  Filter1,
  Filter2,
  Filter3,
  Filter4,
  Filter5,
} from "@/view/dashboard/routine-infant-immunization/Filter";
import {
  graphOptions1,
  graphOptions2,
  graphOptions5,
} from "@/view/dashboard/routine-infant-immunization/graphOptions";
import { graphOptions3 } from "../bias/graphOptionts";

import { graphOptions4 } from "../bias/graphOptionts";

import {
  useGetTotalImmunizationQuery,
  useGetScopeCommpleteBaseQuery,
  useGetScopeHb0Query,
  useGetScopeBcgQuery,
  useGetScopePolio1Query,
  useGetScopePolio2Query,
  useGetScopePolio3Query,
  useGetScopePolio4Query,
  useGetScopeDptHbHib1Query,
  useGetScopeDptHbHib2Query,
  useGetScopeDptHbHib3Query,
  useGetScopeRubelaQuery,
  useGetScopePcv1Query,
  useGetScopePcv2Query,
  useGetScopeIpv1Query,
  useGetScopeIpv2Query,
  useGetScopeIpv1DiyQuery,
  useGetScopeIpv2DiyQuery,
  useGetScopeIpv3DiyQuery,
  useGetScopeRotavirus1Query,
  useGetScopeRotavirus2Query,
  useGetScopeRotavirus3Query,
  useGetScopeJeQuery,
  useGetLeftoutPercentageQuery,
  useGetDropoutQuery,
  useGetDropoutRubelaQuery,
  useGetNumberZeroQuery,
  useGetTotalBayiImmunizationScopeQuery,
  useGetHighestScopeImmunizationQuery,
  useGetLowestScopeImmunizationQuery,
  useGetGraphImmunizationScopeQuery,
  useGetCumulativeScopeImmunizationQuery,
  useGetTotalCumulativeScopeImmunizationQuery,
  useGetTotalCompleteBaseQuery,
  useGetHighestScopeQuery,
  useGetLowestScopeQuery,
  useGetTypeSuspaseQuery,
  useGetGraphScopeQuery,
  useGetNonIdealAgeQuery,
  useGetIdealAgeQuery,
  useGetGraphImmunizationAgeQuery,
  useGetAverageGenderQuery,
  useGetMostImmunizationTypeMaleQuery,
  useGetMostImmunizationTypeFemaleQuery,
  useGetGraphImmunizationGenderQuery,
} from "@/lib/services/baby-immunization";
import {
  dataMonths,
  dataTabBaduta,
  trendTypeOptions,
  vaccineTypeBabyOptionsNew,
  vaccineTypeOptions,
} from "@/utils/constants";
import { formatNumber } from "@/helpers";
import { openSans } from "@/assets/fonts";
import GraphRoutineImmunizationCoverageTrendBias from "@/view/home/components/GraphBias";
import ChildSummaryImmunizationZeroDose from "@/view/home/components/ChildSummaryZeroDose";

const RoutineBabyImmunization = () => {
  const filterState = useState({
    tahun: new Date().getFullYear(),
    bulan: dataMonths.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: "",
    kabkota: "",
    kecamatan: "",
    jenis_sarana: "",
    faskes: "",
    tipe_vaksin1: "IMUNISASI DASAR LENGKAP",
    tipe_vaksin2: "IMUNISASI DASAR LENGKAP",
    tipe_vaksin3: "IMUNISASI DASAR LENGKAP",
    tipe_vaksin4: "IMUNISASI DASAR LENGKAP",
    tipe_vaksin5: "IMUNISASI DASAR LENGKAP",
    jenis_tren: "Kumulatif",
    tipe_umur: 1,
    jenis_kelamin: 1,
    wilayah: "All",
    wilayah1: "province",
    wilayah1a: "All",
    faskes_parent: "",
    kewilayahan_type: 0,
  });
  const [filter] = filterState;

  const dateQuery = {
    year: filter.tahun,
    month: filter.bulan,
  };

  const filterQuery = {
    ...dateQuery,
    region_type: filter.faskes
      ? "faskes"
      : filter.kecamatan
        ? "district"
        : filter.kabkota
          ? "city"
          : filter.provinsi
            ? "province"
            : "All",
    faskes_id: filter.faskes
      ? filter.faskes
      : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
          ? filter.kabkota
          : filter.provinsi && filter.provinsi,
    kewilayahan_type: filter.kewilayahan_type,
  };

  const [rergionTypeGraph1, setRegionTypeGraph1] = useState("province");

  useEffect(() => {
    filter.faskes
      ? setRegionTypeGraph1("faskes")
      : filter.kecamatan
        ? setRegionTypeGraph1("district")
        : filter.kabkota
          ? setRegionTypeGraph1("city")
          : filter.provinsi
            ? setRegionTypeGraph1("province")
            : setRegionTypeGraph1("All");
  }, [filter.faskes, filter.kecamatan, filter.kabkota, filter.provinsi]);

  useEffect(() => {
    filter.wilayah1
      ? setRegionTypeGraph1(filter.wilayah1)
      : setRegionTypeGraph1("province");
  }, [filter.wilayah1]);

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
  const filterGraph1a = useMemo(
    () => ({
      ...dateQuery,
      region_type: "All",
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

  const faskesIdQuery = filter.faskes
    ? filter.faskes
    : filter.kecamatan
      ? filter.kecamatan
      : filter.kabkota
        ? filter.kabkota
        : filter.provinsi
          ? filter.provinsi
          : "All";

  const filterCumulativeScope = {
    ...dateQuery,
    region_type: regionIdQuery,
    faskes_id: faskesIdQuery,
    vaccine_type: filter.tipe_vaksin2,
    tren_type: filter.jenis_tren,
  };
  const filterGender = {
    ...dateQuery,
    region_type: regionIdQuery,
    faskes_id: faskesIdQuery,
    vaccine_type: filter.tipe_vaksin5,
    gender: filter.jenis_kelamin,
  };
  const filterAge = {
    ...dateQuery,
    region_type: regionIdQuery,
    faskes_id: faskesIdQuery,
    vaccine_type: filter.tipe_vaksin4,
  };

  const filterTotalBayi = {
    ...dateQuery,
    region_type: regionIdQuery,
    faskes_id: faskesIdQuery,
    vaccine_type: filter.tipe_vaksin3,
  };

  const filterGraph3 = {
    ...dateQuery,
    region_type: regionIdQuery,
    faskes_id: faskesIdQuery,
  };

  const optionQuery = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };
  const optionQueryGraph = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      !filter.bulan ||
      !filter.wilayah ||
      ((!filter.tipe_vaksin1 || !filter.tipe_vaksin2 || !filter.tipe_vaksin3) &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };
  const optionQueryTotal = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.wilayah ||
      !filter.tipe_vaksin1 ||
      !filter.tipe_vaksin2 ||
      !filter.tipe_vaksin3,
  };

  // scorecard start
  const {
    data: getTotalImmunizationQuery,
    isLoading: isLoadingTotalImmunizationQuery,
  } = useGetTotalImmunizationQuery(filterQuery, optionQuery);
  const {
    data: getScopeCompleteBase,
    isLoading: isLoadingScopeCompleteBaseQuery,
  } = useGetScopeCommpleteBaseQuery(filterQuery, optionQuery);
  const { data: getScopeHb0, isLoading: isLoadingScopeHb0Query } =
    useGetScopeHb0Query(filterQuery, optionQuery);
  const { data: getScopeBcg, isLoading: isLoadingScopeBcgQuery } =
    useGetScopeBcgQuery(filterQuery, optionQuery);
  const { data: getScopePolio1, isLoading: isLoadingScopePolio1Query } =
    useGetScopePolio1Query(filterQuery, optionQuery);
  const { data: getScopePolio2, isLoading: isLoadingScopePolio2Query } =
    useGetScopePolio2Query(filterQuery, optionQuery);
  const { data: getScopePolio3, isLoading: isLoadingScopePolio3Query } =
    useGetScopePolio3Query(filterQuery, optionQuery);
  const { data: getScopePolio4, isLoading: isLoadingScopePolio4Query } =
    useGetScopePolio4Query(filterQuery, optionQuery);
  const { data: getScopeDptHbHib1, isLoading: isLoadingScopeDptHbHib1Query } =
    useGetScopeDptHbHib1Query(filterQuery, optionQuery);
  const { data: getScopeDptHbHib2, isLoading: isLoadingScopeDptHbHib2Query } =
    useGetScopeDptHbHib2Query(filterQuery, optionQuery);
  const { data: getScopeDptHbHib3, isLoading: isLoadingScopeDptHbHib3Query } =
    useGetScopeDptHbHib3Query(filterQuery, optionQuery);
  const { data: getScopeRubela, isLoading: isLoadingScopeRubelaQuery } =
    useGetScopeRubelaQuery(filterQuery, optionQuery);
  const { data: getScopePcv1, isLoading: isLoadingScopePcv1Query } =
    useGetScopePcv1Query(filterQuery, optionQuery);
  const { data: getScopePcv2, isLoading: isLoadingScopePcv2Query } =
    useGetScopePcv2Query(filterQuery, optionQuery);
  const { data: getScopeIpv1, isLoading: isLoadingScopeIpv1Query } =
    useGetScopeIpv1Query(filterQuery, optionQuery);
  const { data: getScopeIpv2, isLoading: isLoadingScopeIpv2Query } =
    useGetScopeIpv2Query(filterQuery, optionQuery);
  const { data: getScopeIpv1Diy, isLoading: isLoadingScopeIpv1DiyQuery } =
    useGetScopeIpv1DiyQuery(filterQuery, optionQuery);
  const { data: getScopeIpv2Diy, isLoading: isLoadingScopeIpv2DiyQuery } =
    useGetScopeIpv2DiyQuery(filterQuery, optionQuery);
  const { data: getScopeIpv3Diy, isLoading: isLoadingScopeIpv3DiyQuery } =
    useGetScopeIpv3DiyQuery(filterQuery, optionQuery);
  const { data: getScopeRotavirus1, isLoading: isLoadingScopeRotavirus1Query } =
    useGetScopeRotavirus1Query(filterQuery, optionQuery);
  const { data: getScopeRotavirus2, isLoading: isLoadingScopeRotavirus2Query } =
    useGetScopeRotavirus2Query(filterQuery, optionQuery);
  const { data: getScopeRotavirus3, isLoading: isLoadingScopeRotavirus3Query } =
    useGetScopeRotavirus3Query(filterQuery, optionQuery);
  const { data: getScopeJe, isLoading: isLoadingScopeJeQuery } =
    useGetScopeJeQuery(filterQuery, optionQuery);
  const {
    data: getLeftoutPercentage,
    isLoading: isLoadingLeftoutPercentageQuery,
  } = useGetLeftoutPercentageQuery(filterQuery, optionQuery);
  const { data: getDropout, isLoading: isLoadingDropoutQuery } =
    useGetDropoutQuery(filterQuery, optionQuery);
  const { data: getDropoutRubela, isLoading: isLoadingDropoutRubelaQuery } =
    useGetDropoutRubelaQuery(filterQuery, optionQuery);
  const { data: getNumberZero, isLoading: isLoadingNumberZeroQuery } =
    useGetNumberZeroQuery(filterQuery, optionQuery);

  // scorecard end

  // grafik 1 start
  const {
    data: getTotalBayiImmunizationScope,
    isLoading: isLoadingTotalBayiImmunizationScope,
  } = useGetTotalBayiImmunizationScopeQuery(filterGraph1a, optionQuery);
  const {
    data: getHighestScopeImmunization,
    isLoading: isLoadingHighestScopeImmunization,
  } = useGetHighestScopeImmunizationQuery(filterGraph1, optionQuery);
  const {
    data: getLowestScopeImmunization,
    isLoading: isLoadingLowestScopeImmunization,
  } = useGetLowestScopeImmunizationQuery(filterGraph1, optionQuery);
  const {
    data: getGraphImmunizationScope,
    isLoading: isLoadingGraphImmunizationScope,
  } = useGetGraphImmunizationScopeQuery(filterGraph1, optionQuery);

  // grafik 1 end

  // grafik 2 start
  const {
    data: getCumulativeScopeImmunizationQuery,
    isLoading: isLoadingCumulativeScopeImmunizationQuery,
  } = useGetCumulativeScopeImmunizationQuery(
    filterCumulativeScope,
    optionQuery
  );
  const {
    data: getTotalCumulativeScopeImmunization,
    isLoading: isLoadingTotalCumulativeScopeImmunization,
  } = useGetTotalCumulativeScopeImmunizationQuery(
    filterCumulativeScope,
    optionQuery
  );

  // grafik 2 end

  // grafik 3 start
  const { data: getTotalCompleteBase, isLoading: isLoadingTotalCompleteBase } =
    useGetTotalCompleteBaseQuery(filterTotalBayi, optionQuery);
  const { data: getHighestScope, isLoading: isLoadingHighestScope } =
    useGetHighestScopeQuery(filterTotalBayi, optionQuery);
  const { data: getLowestScope, isLoading: isLoadingLowestScope } =
    useGetLowestScopeQuery(filterTotalBayi, optionQuery);
  const { data: getTypeSuspase, isLoading: isLoadingTypeSuspase } =
    useGetTypeSuspaseQuery(filterTotalBayi, optionQuery);
  const { data: getGraphScope, isLoading: isLoadingGraphScope } =
    useGetGraphScopeQuery(filterGraph3, optionQuery);

  // grafik 4 start
  const { data: getNonIdealAge, isLoading: isLoadingNonIdealAge } =
    useGetNonIdealAgeQuery(filterAge, optionQuery);
  const { data: getIdealAge, isLoading: isLoadingIdealAge } =
    useGetIdealAgeQuery(filterAge, optionQuery);
  const {
    data: getGraphImmunizationAge,
    isLoading: isLoadingGraphImmunizationAge,
  } = useGetGraphImmunizationAgeQuery({
    ...dateQuery,
    region_type: regionIdQuery,
    faskes_id: faskesIdQuery
  }, optionQuery);
  const aliasSummaryImmunizationByAgeQuery = Object.entries(
    getGraphImmunizationAge?.data?.[0] || []
  ).map(([key, value]) => ({ label: key, value: value }));
  // grafik 4 end

  // grafik 5 start
  const { data: getAverageGender, isLoading: isLoadingAverageGender } =
    useGetAverageGenderQuery(filterGender, optionQuery);
  const {
    data: getMostImmunizationTypeMale,
    isLoading: isLoadingMostImmunizationTypeMale,
  } = useGetMostImmunizationTypeMaleQuery(filterGender, optionQuery);
  const {
    data: getMostImmunizationTypFemale,
    isLoading: isLoadingMostImmunizationTypeFemale,
  } = useGetMostImmunizationTypeFemaleQuery(filterGender, optionQuery);
  const {
    data: getGraphImmunizationGender,
    isLoading: isLoadingGraphImmunizationGender,
  } = useGetGraphImmunizationGenderQuery(filterGender, optionQuery);
  const aliasGraphImmunizationGenderQuery = Object.entries(
    getGraphImmunizationGender?.data?.[0] || []
  ).map(([key, value]) => ({ label: key, value: value }));
  // grafik 5 end

  const dataGraphRegionalRoutineImmunizationCoverageTrend1 = [
    {
      title: `Total Cakupan Imunisasi Rutin Lengkap Nasional Tahun ${filter.tahun}`,
      value: (
        <div>
          {formatNumber(
            getTotalBayiImmunizationScope?.data?.[0]?.percentage || 0
          )}
          %
        </div>
      ),
      regional: <></>,
      isLoading: isLoadingTotalBayiImmunizationScope,
    },
    {
      title: `Cakupan Tertinggi Tahun ${filter.tahun}`,
      value: (
        <div className="font-bold">
          {formatNumber(getHighestScopeImmunization?.data?.percentage || 0)}%
        </div>
      ),
      regional: <div>{getHighestScopeImmunization?.data?.wilayah_desc}</div>,
      isLoading: isLoadingHighestScopeImmunization,
    },
    {
      title: `Cakupan Terendah Tahun ${filter.tahun}`,
      value: (
        <div className="font-bold">
          {formatNumber(getLowestScopeImmunization?.data?.percentage || 0)}%
        </div>
      ),
      regional: <div>{getLowestScopeImmunization?.data?.wilayah_desc}</div>,
      isLoading: isLoadingLowestScopeImmunization,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend2 = [
    {
      // title: `Cakupan ${filterTotalBayi.vaccine_type}`,
      title: `Cakupan ${vaccineTypeBabyOptionsNew.find((type) => type.value === filterTotalBayi.vaccine_type)?.label}`,
      value: (
        <div>
          {formatNumber(getTotalCompleteBase?.data?.[0]?.percentage || 0)}%
        </div>
      ),
      regional: (
        <div>
          Jumlah Cakupan:{" "}
          {formatNumber(getTotalCompleteBase?.data?.[0]?.total || 0)}
        </div>
      ),
      isLoading: isLoadingTotalCompleteBase,
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
        <div>
          % Cakupan: {formatNumber(getHighestScope?.data?.percentage || 0)}%
        </div>
      ),
      isLoading: isLoadingHighestScope,
    },
    {
      title: `Cakupan Imunisasi Terendah`,
      value: <div>{getLowestScope?.data?.vaksin}</div>,
      regional: (
        <div>
          Jumlah Cakupan: {formatNumber(getLowestScope?.data?.total || 0)}
        </div>
      ),
      threshold: (
        <div>
          % Cakupan: {formatNumber(getLowestScope?.data?.percentage || 0)}%
        </div>
      ),
      isLoading: isLoadingLowestScope,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend3 = [
    {
      title: (
        <div className="font-bold text-xl">
          3 Imunisasi dengan Penerima{" "}
          <b style={{ color: "#EBB220" }}>Usia Non Ideal</b> Terbanyak
        </div>
      ),
      value: getNonIdealAge?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.vaksin}
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
          {i + 1}. {r.vaksin}
        </li>
      )),
      isLoading: isLoadingIdealAge,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend4 = [
    {
      title: `3 Imunisasi dengan Penerima Perempuan Terbanyak`,
      value: getMostImmunizationTypeMale?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.vaksin}
        </li>
      )),
      isLoading: isLoadingMostImmunizationTypeMale,
    },
    {
      title: `3 Imunisasi dengan Penerima Laki-Laki Terbanyak`,
      value: getMostImmunizationTypFemale?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.vaksin}
        </li>
      )),
      isLoading: isLoadingMostImmunizationTypeFemale,
    },
  ];

  const ageChartOptions: any = {
    color: ["#2E90FA", "#E478FA"],
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const value = params.data.value;
        const formattedValue = value;
        return `${params.marker} ${params.name}: <span style="float: right; margin-left: 8px;"><strong>${formattedValue}</strong></span><br/>`;
      },
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
        radius: "100%",
        label: {
          show: true,
          position: "inner",
          formatter: (params: any) => {
            const value =
              params.name === "Laki-laki"
                ? getAverageGender?.data?.[0]?.pct_male
                : getAverageGender?.data?.[0]?.pct_female;
            return `${value?.toFixed(2).replace(".", ",")}%`;
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: getAverageGender?.data?.[0]?.ytd_male_all,
            name: "Laki-laki",
          },
          {
            value: getAverageGender?.data?.[0]?.ytd_female_all,
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
                  <BannerHighlightFooter look="567" comment="145" share="24" />
                }
              />
            }
          />
        </div>
      </div>
      <div className="px-4 container">
        <div className="flex gap-6">
          <Sidebar />
          <div>
            <Tabs
              data={dataTabBaduta}
              variant="private"
              value={filter.kewilayahan_type}
              filterState={filterState}
            />
            <div className="flex flex-col gap-4 text-sm">
              <div className="font-bold text-primary-1 text-xl md:text-3xl">
                Imunisasi Rutin Bayi
              </div>
              <div>
                Menampilkan data cakupan imunisasi rutin bayi berdasarkan jenis
                imunisasi, cakupan daerah, usia pemberian, dan jenis kelamin
                bayi.
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunizationBayi filterState={filterState} />
            </div>
            <div className="py-6"></div>
            {/* scorecard */}
            <div>
              <div className="font-bold text-primary-2 text-xl md:text-3xl">
                Ringkasan Data Cakupan Imunisasi Rutin Bayi
              </div>
              <div>
                Ringkasan berisi data total penerima imunisasi rutin bayi dan
                jenis imunisasi rutin bayi terhadap target cakupan yang sudah
                ditentukan.
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mt-4">
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalImmunizationQuery && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-8 ${styles.scoreCardPurple}`}
                    background="white"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title="Total Penerima Imunisasi Bayi"
                    value={formatNumber(
                      getTotalImmunizationQuery?.data?.[0]?.total || 0
                    )}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeCompleteBaseQuery && <Spin />}
                  <ChildSummaryImmunization
                    className="px-4 border rounded-lg"
                    title="Imunisasi Dasar Lengkap"
                    contentTooltip={<>Imunisasi Dasar Lengkap</>}
                    value={formatNumber(
                      getScopeCompleteBase?.data?.[0]?.total || 0
                    )}
                    percent={getScopeCompleteBase?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeCompleteBase?.data?.[0].target) ||
                      "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeHb0Query && <Spin />}
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
                    title={"HB - 0"}
                    value={formatNumber(getScopeHb0?.data?.[0]?.total) || "0"}
                    percent={getScopeHb0?.data?.[0]?.percentage || "0"}
                    target={formatNumber(getScopeHb0?.data?.[0]?.target) || "0"}
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeBcgQuery && <Spin />}
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
                    title={"BCG"}
                    value={formatNumber(getScopeBcg?.data?.[0]?.total) || "0"}
                    percent={getScopeBcg?.data?.[0]?.percentage || "0"}
                    target={formatNumber(getScopeBcg?.data?.[0]?.target) || "0"}
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopePolio1Query && <Spin />}
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
                    title={"Polio 1"}
                    value={
                      formatNumber(getScopePolio1?.data?.[0]?.total) || "0"
                    }
                    percent={getScopePolio1?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopePolio1?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopePolio2Query && <Spin />}
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
                    title={"Polio 2"}
                    value={
                      formatNumber(getScopePolio2?.data?.[0]?.total) || "0"
                    }
                    percent={getScopePolio2?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopePolio2?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopePolio3Query && <Spin />}
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
                    title={"Polio 3"}
                    value={
                      formatNumber(getScopePolio3?.data?.[0]?.total) || "0"
                    }
                    percent={getScopePolio3?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopePolio3?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopePolio4Query && <Spin />}
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
                    title={"Polio 4"}
                    value={
                      formatNumber(getScopePolio4?.data?.[0]?.total) || "0"
                    }
                    percent={getScopePolio4?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopePolio4?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeDptHbHib1Query && <Spin />}
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
                    title={"DPT-HB-Hib 1"}
                    value={
                      formatNumber(getScopeDptHbHib1?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeDptHbHib1?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeDptHbHib1?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeDptHbHib2Query && <Spin />}
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
                    title={"DPT-HB-Hib 2"}
                    value={
                      formatNumber(getScopeDptHbHib2?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeDptHbHib2?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeDptHbHib2?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeDptHbHib3Query && <Spin />}
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
                    title={"DPT-HB-Hib 3"}
                    value={
                      formatNumber(getScopeDptHbHib3?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeDptHbHib3?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeDptHbHib3?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeRubelaQuery && <Spin />}
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
                    title={"Campak Rubela"}
                    value={
                      formatNumber(getScopeRubela?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeRubela?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeRubela?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopePcv1Query && <Spin />}
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
                    title={"PCV 1"}
                    value={formatNumber(getScopePcv1?.data?.[0]?.total) || "0"}
                    percent={getScopePcv1?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopePcv1?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopePcv2Query && <Spin />}
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
                    title={"PCV 2"}
                    value={formatNumber(getScopePcv2?.data?.[0]?.total) || "0"}
                    percent={getScopePcv2?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopePcv2?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeIpv1Query && <Spin />}
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
                    title={"IPV 1"}
                    value={formatNumber(getScopeIpv1?.data?.[0]?.total) || "0"}
                    percent={getScopeIpv1?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeIpv1?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeIpv2Query && <Spin />}
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
                    title={"IPV 2"}
                    value={formatNumber(getScopeIpv2?.data?.[0]?.total) || "0"}
                    percent={getScopeIpv2?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeIpv2?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeIpv1DiyQuery && <Spin />}
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
                    title={"IPV 1 DIY"}
                    value={
                      formatNumber(getScopeIpv1Diy?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeIpv1Diy?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeIpv1Diy?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeIpv2DiyQuery && <Spin />}
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
                    title={"IPV 2 DIY"}
                    value={
                      formatNumber(getScopeIpv2Diy?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeIpv2Diy?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeIpv2Diy?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeIpv3DiyQuery && <Spin />}
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
                    title={"IPV 3 DIY"}
                    value={
                      formatNumber(getScopeIpv3Diy?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeIpv3Diy?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeIpv3Diy?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeRotavirus1Query && <Spin />}
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
                    title={"Rotavirus 1"}
                    value={
                      formatNumber(getScopeRotavirus1?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeRotavirus1?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeRotavirus1?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeRotavirus2Query && <Spin />}
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
                    title={"Rotavirus 2"}
                    value={
                      formatNumber(getScopeRotavirus2?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeRotavirus2?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeRotavirus2?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeRotavirus3Query && <Spin />}
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
                    title={"Rotavirus 3"}
                    value={
                      formatNumber(getScopeRotavirus3?.data?.[0]?.total) || "0"
                    }
                    percent={getScopeRotavirus3?.data?.[0]?.percentage || "0"}
                    target={
                      formatNumber(getScopeRotavirus3?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingScopeJeQuery && <Spin />}
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
                    title={"JE"}
                    value={formatNumber(getScopeJe?.data?.[0]?.total) || "0"}
                    percent={getScopeJe?.data?.[0]?.percentage || "0"}
                    target={formatNumber(getScopeJe?.data?.[0]?.target) || "0"}
                    subtitle={" dari "}
                  />
                </div>
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mt-4">
                <div className="relative flex justify-center items-center">
                  {isLoadingLeftoutPercentageQuery && <Spin />}
                  <ChildSummaryImmunizationBayi
                    className={`px-8 ${styles.scoreCardYellow}`}
                    background="white"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title="Persentase Left Out"
                    contentTooltip={<>Persentase Left Out</>}
                    value={`${getLeftoutPercentage?.data
                      ? formatNumber(
                        getLeftoutPercentage?.data?.[0]
                          ?.left_out_percentage || 0
                      )
                      : "0"
                      }%`}
                    total={getLeftoutPercentage?.data?.[0]?.total || "0"}
                    target={
                      formatNumber(getLeftoutPercentage?.data?.[0]?.target) ||
                      "0"
                    }
                    subtitle={" dari "}
                    showLine={false}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingDropoutQuery && <Spin />}
                  <ChildSummaryImmunizationBayi
                    className={`px-8 ${styles.scoreCardYellow}`}
                    background="white"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title={
                      <span
                        style={{ whiteSpace: "pre-line", display: "block" }}
                      >
                        {"Persentase Drop Out \nDPT-HB-Hib"}
                      </span>
                    }
                    contentTooltip={<>Persentase Drop Out DPT-HB-Hib</>}
                    value={`${getDropout?.data
                      ? formatNumber(
                        getDropout?.data?.[0]?.drop_out_percentage || 0
                      )
                      : "0"
                      }%`}
                    total={getDropout?.data?.[0]?.total || "0"}
                    target={formatNumber(getDropout?.data?.[0]?.target) || "0"}
                    subtitle={" dari "}
                    showLine={false}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingDropoutRubelaQuery && <Spin />}
                  <ChildSummaryImmunizationBayi
                    className={`px-8 ${styles.scoreCardYellow}`}
                    background="white"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title={
                      <span
                        style={{ whiteSpace: "pre-line", display: "block" }}
                      >
                        {"Persentase Drop Out \nCampak Rubela"}
                      </span>
                    }
                    contentTooltip={<>Persentase Drop Out Campak Rubela</>}
                    value={`${getDropoutRubela?.data
                      ? formatNumber(
                        getDropoutRubela?.data?.[0]?.drop_out_percentage ||
                        0
                      )
                      : "0"
                      }%`}
                    total={getDropoutRubela?.data?.[0]?.total || "0"}
                    target={
                      formatNumber(getDropoutRubela?.data?.[0]?.target) || "0"
                    }
                    subtitle={" dari "}
                    showLine={false}
                  />
                </div>

                <div className="relative flex justify-center items-center">
                  {isLoadingNumberZeroQuery && <Spin />}
                  <ChildSummaryImmunizationZeroDose
                    className={`px-8 ${styles.scoreCardYellow}`}
                    background="white"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title="Jumlah Zero Dose"
                    contentTooltip={<>Jumlah Zero Dose</>}
                    value={
                      getNumberZero?.data
                        ? formatNumber(
                          getNumberZero?.data?.[0]?.number_of_zero_dose || 0
                        )
                        : "0"
                    }
                  />
                </div>
              </div>
            </div>
            {/* grafik1 */}
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Daerah Imunisasi Bayi"
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={
                        <div className="font-bold md:text-2xl">
                          Grafik Cakupan{" "}
                          <b className="text-primary-2">
                            {/* {
                              vaccineTypeOptions.find(
                                (r) => r.value === filter.tipe_vaksin1
                              )?.label
                            } */}
                            {filter.tipe_vaksin1}
                          </b>{" "}
                          pada Provinsi di{" "}
                          <b className="text-primary-2">Indonesia</b> Selama
                          Tahun <b className="text-primary-2">{filter.tahun}</b>
                        </div>
                      }
                      subTitle={`Grafik menampilkan hasil cakupan ${
                        // vaccineTypeOptions.find(
                        //   (r) => r.value === filter.tipe_vaksin1
                        // )?.label
                        filter.tipe_vaksin1
                        } dari 34 provinsi di Indonesia`}
                      addOn={
                        <GraphAddOn
                          dataCard={
                            dataGraphRegionalRoutineImmunizationCoverageTrend1
                          }
                        />
                      }
                      variant="private"
                      filterState={filterState}
                      filterComp={
                        <Filter1
                          filterState={filterState}
                          data={getGraphImmunizationScope?.data || []}
                        />
                      }
                      isLoading={isLoadingGraphImmunizationScope}
                      opts={{
                        height: 900,
                      }}
                      graphOptions={graphOptions1(
                        [
                          {
                            // @ts-ignore
                            name: "Persentase",
                            data:
                              (getGraphImmunizationScope?.data || [])?.map(
                                (r: any) => ({
                                  value: r?.percentage,
                                  itemStyle: {
                                    color:
                                      r.faskes_desc === "All"
                                        ? "#2D9CED"
                                        : undefined,
                                  },
                                })
                              ) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              position: "right",
                              // formatter: (params: any) => `${params.value}%`,
                              formatter: (params: any) => {
                                const reversedData = (
                                  getGraphImmunizationScope?.data || []
                                )
                                  .slice()
                                  .reverse(); // Membuat salinan dan membalik urutan
                                const totalData =
                                  reversedData[params.dataIndex]?.total;
                                const valueWithComma = params?.value
                                  ?.toString()
                                  .replace(".", ",");

                                return filter.wilayah1 === "province" ||
                                  filter.wilayah1 === "city"
                                  ? `${valueWithComma}% (${formatNumber(
                                    totalData
                                  )})`
                                  : `(${formatNumber(totalData)})`;
                              },
                            },
                          },
                          {
                            name: "Target",
                            type: "line",
                            color: "#CD4243",
                            data:
                              (getGraphImmunizationScope?.data || [])?.map(
                                (r: any) => r?.threshold
                              ) || [],
                          },
                          {
                            name: "Total Penerima",
                            type: "line",
                            color: "#FAC515",
                            data:
                              (getGraphImmunizationScope?.data || [])?.map(
                                (r: any) => r?.total
                              ) || [],
                            show: false, // Menyembunyikan seri secara default
                            itemStyle: {
                              opacity: 0, // Mengatur opacity item menjadi 0 untuk menyembunyikan item
                            },
                            lineStyle: {
                              opacity: 0, // Mengatur opacity garis menjadi 0 untuk menyembunyikan garis
                            },
                          },
                        ],
                        (getGraphImmunizationScope?.data || [])?.map((r: any) =>
                          r.faskes_desc === "All" ? "NASIONAL" : r.faskes_desc
                        )
                      )}
                    />
                  </div>
                }
              />
            </div>
            {/* grafik1 */}

            {/* grafik2 */}

            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi Bayi"
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      opts={{
                        height: 500
                      }}
                      title={
                        <div className="font-bold md:text-2xl">
                          Data{" "}
                          {
                            trendTypeOptions.find(
                              (r) => r.value === filter.jenis_tren
                            )?.label
                          }{" "}
                          Jumlah Penerima, Cakupan, dan Target Cakupan{" "}
                          <b className="text-primary-2">
                            {
                              vaccineTypeOptions.find(
                                (r) => r.value === filter.tipe_vaksin2
                              )?.label
                            }
                          </b>{" "}
                          pada Bayi Selama Tahun{" "}
                          <b className="text-primary-2">{filter.tahun}</b>
                        </div>
                      }
                      subTitle={`Grafik menampilkan tren cakupan ${trendTypeOptions.find(
                        (r) => r.value === filter.jenis_tren
                      )?.label
                        } penerima ${vaccineTypeOptions.find(
                          (r) => r.value === filter.tipe_vaksin2
                        )?.label
                        } pada bayi selama tahun ${filter.tahun}`}
                      variant="private"
                      filterState={filterState}
                      filterComp={
                        <Filter2
                          filterState={filterState}
                          data={getCumulativeScopeImmunizationQuery?.data || []}
                        />
                      }
                      threshold={
                        <div className="relative flex justify-center items-center">
                          {isLoadingTotalCumulativeScopeImmunization && (
                            <Spin />
                          )}
                          <div className="p-2 sm:w-32 md:w-64 h-fit">
                            <div className="text-sm">
                              Total cakupan{" "}
                              {
                                trendTypeOptions.find(
                                  (r) => r.value === filter.jenis_tren
                                )?.label
                              }{" "}
                              pada bulan{" "}
                              {dataMonths?.find((f) => f.value === filter.bulan)
                                ?.label || ""}{" "}
                              tahun {filter.tahun}
                            </div>
                            <div className="py-2 font-bold text-3xl text-primary">
                              {formatNumber(
                                getTotalCumulativeScopeImmunization?.data?.[0]
                                  ?.percentage || 0
                              )}
                              %
                            </div>
                            <div>
                              Jumlah Imunisasi Bayi Lengkap:{" "}
                              {formatNumber(
                                getTotalCumulativeScopeImmunization?.data?.[0]
                                  ?.total || 0
                              )}
                            </div>
                          </div>
                        </div>
                      }
                      isLoading={isLoadingCumulativeScopeImmunizationQuery}
                      graphOptions={graphOptions2([
                        {
                          name: "% Cakupan",
                          data:
                            (
                              getCumulativeScopeImmunizationQuery?.data || []
                            )?.map(
                              (r: any) =>
                                ((r?.percentage || 0) / 100) *
                                ((r?.total * 100) / r?.percentage || 0)
                            ) || [],
                          type: "line",
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) =>
                              `${formatNumber(
                                (getCumulativeScopeImmunizationQuery?.data ||
                                  [])[params.dataIndex]?.percentage
                              )}%`,
                          },
                          additionalData:
                            (
                              getCumulativeScopeImmunizationQuery?.data || []
                            )?.map((r: any) => r?.percentage || 0) || [],
                        },
                        {
                          name: "% Target Cakupan",
                          data:
                            (
                              getCumulativeScopeImmunizationQuery?.data || []
                            )?.map(
                              (r: any) =>
                                ((r?.threshold || 0) / 100) *
                                ((r?.total * 100) / r?.percentage || 0)
                            ) || [],
                          type: "line",
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) =>
                              `${formatNumber(
                                (getCumulativeScopeImmunizationQuery?.data ||
                                  [])[params.dataIndex]?.threshold
                              )}%`,
                          },
                          tooltip: {
                            show: false,
                          },
                        },
                        {
                          name: "Jumlah Penerima Imunisasi",
                          data:
                            (
                              getCumulativeScopeImmunizationQuery?.data || []
                            )?.map(
                              (r: any) =>
                                (((r?.percentage || 0) / 100) *
                                  (r?.total * 100)) /
                                r?.percentage || 0
                            ) || [],
                          type: "bar",
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) =>
                              `${formatNumber(params.value || 0)}`,
                          },
                        },
                      ])}
                    />
                  </div>
                }
              />
            </div>

            {/* grafik2 */}

            {/* grafik3 */}

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
                            Grafik Cakupan Imunisasi pada Bayi Berdasarkan Jenis
                            Imunisasi
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan tren cakupan imunisasi berdasarkan jenis imunisasi pada bayi."
                      addOn={
                        <GraphAddOn
                          dataCard={
                            dataGraphRegionalRoutineImmunizationCoverageTrend2
                          }
                        />
                      }
                      variant="private"
                      filterState={filterState}
                      filterComp={
                        <Filter3
                          filterState={filterState}
                          data={getGraphScope?.data?.[0]?.vaccine_list}
                        />
                      }
                      threshold={
                        <div className="text-sm">
                          <div className="relative">
                            {isLoadingTypeSuspase && <Spin />}
                            <div
                              className="relative mt-5 px-4 py-3 rounded-xl h-32"
                              style={{
                                boxShadow: "0px 2px 12px 0px #00000014",
                              }}
                            >
                              <div className="font-bold">
                                Imunisasi yang Melampaui Target Cakupan
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                }}
                              >
                                {getTypeSuspase?.data
                                  ?.filter((item: any) => item.status !== 0)
                                  .map((r: any, i: number) => (
                                    <p key={i + "exceed"}>
                                      {r.vaksin?.toUpperCase()}
                                      {", "}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            {isLoadingTypeSuspase && <Spin />}
                            <div
                              className="my-5 px-4 py-3 rounded-xl h-32"
                              style={{
                                boxShadow: "0px 2px 12px 0px #00000014",
                              }}
                            >
                              <div className="font-bold">
                                Imunisasi yang Belum Melampaui Target Cakupan
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                }}
                              >
                                {getTypeSuspase?.data
                                  ?.filter((item: any) => item.status === 0)
                                  .map((r: any, i: number) => (
                                    <p
                                      key={i + "exceed"}
                                      style={{ marginRight: "0.5rem" }}
                                    >
                                      {r.vaksin?.toUpperCase()}
                                      {", "}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      graphOptions={graphOptions3(
                        [
                          {
                            name: "Cakupan",
                            data:
                              (
                                getGraphScope?.data?.[0]?.vaccine_list || []
                              )?.map((r: any) => r?.ytd_total) || [],
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
                              (
                                getGraphScope?.data?.[0]?.vaccine_list || []
                              )?.map((r: any) => r?.pct) || [],
                            type: "line",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(params.value)}%`,
                            },
                            // additionalData:
                            //   (
                            //     getGraphScope?.data?.[0]?.vaccine_list || []
                            //   )?.map(
                            //     (r: any) =>
                            //       // ((r?.percentage || 0) / 100) * (r?.total || 0)
                            //       r?.pct || 0
                            //   ) || [],
                          },
                          {
                            name: "% Target Cakupan",
                            data:
                              (
                                getGraphScope?.data?.[0]?.vaccine_list || []
                              )?.map((r: any) => r?.threshold || 0) || [],
                            type: "line",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(params.value)}%`,
                            },
                            tooltip: {
                              show: false,
                            },
                          },
                        ],
                        (getGraphScope?.data?.[0]?.vaccine_list || [])?.map(
                          (r: any) => r?.vaccine_name
                        ) || []
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
                      opts={{
                        height: 550
                      }}
                      layout="vertical"
                      title={
                        <div className="font-bold md:text-2xl">
                          <b className="text-primary-2">
                            Grafik Cakupan Imunisasi pada Bayi Berdasarkan Usia
                            Pemberian Imunisasi
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan tren cakupan imunisasi pada bayi berdasarkan usia pemberian imunisasi."
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
                      filterComp={
                        <Filter4
                          filterState={filterState}
                          data={
                            getGraphImmunizationAge?.data?.[0]?.vaccine_list
                          }
                          showFilter={false}
                        />
                      }
                      isLoading={isLoadingGraphImmunizationAge}
                      graphOptions={graphOptions4(
                        [
                          {
                            name: "Usia Ideal",
                            data:
                              (
                                getGraphImmunizationAge?.data?.[0]
                                  ?.vaccine_list || []
                              )?.map((r: any) => r?.pct_ideal) || [],
                            type: "bar",
                          },
                          {
                            name: "Usia Ideal Total",
                            data:
                              (
                                getGraphImmunizationAge?.data?.[0]
                                  ?.vaccine_list || []
                              )?.map((r: any) => r?.ytd_ideal) || [],
                            type: "line",
                          },
                          {
                            name: "Usia Non Ideal",
                            data:
                              (
                                getGraphImmunizationAge?.data?.[0]
                                  ?.vaccine_list || []
                              )?.map((r: any) => r?.pct_non_ideal) || [],
                            type: "bar",
                          },
                          {
                            name: "Usia Non Ideal Total",
                            data:
                              (
                                getGraphImmunizationAge?.data?.[0]
                                  ?.vaccine_list || []
                              )?.map((r: any) => r?.ytd_non_ideal) || [],
                            type: "line",
                            itemStyle: { opacity: 0 },
                          },
                        ],
                        (
                          getGraphImmunizationAge?.data?.[0]?.vaccine_list || []
                        )?.map((r: any) => r?.vaccine_name) || [],
                        getGraphImmunizationAge?.data?.[0]?.vaccine_list || []
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
                      opts={{
                        height: 550
                      }}
                      layout="vertical"
                      title={
                        <div className="font-bold md:text-2xl">
                          <b className="text-primary-2">
                            Grafik Distribusi Imunisasi pada Bayi Berdasarkan
                            Jenis Kelamin
                          </b>
                        </div>
                      }
                      subTitle="Grafik menampilkan cakupan imunisasi pada bayi berdasarkan jenis kelamin."
                      addOn={
                        <div className="flex gap-4 text-sm">
                          <div className="relative flex flex-1 justify-center items-center">
                            {isLoadingAverageGender && <Spin />}
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
                      filterComp={
                        <Filter5
                          filterState={filterState}
                          data={
                            getGraphImmunizationGender?.data?.[0]?.vaccine_list
                          }
                          showFilter={false}
                        />
                      }
                      isLoading={isLoadingGraphImmunizationGender}
                      graphOptions={graphOptions5(
                        [
                          {
                            name: "Laki-laki",
                            data:
                              (
                                getGraphImmunizationGender?.data?.[0]
                                  ?.vaccine_list || []
                              )?.map((r: any) => r?.pct_male) || [],
                            type: "bar",
                            label: {
                              precision: 1,
                            },
                          },
                          {
                            name: "Perempuan",
                            data:
                              (
                                getGraphImmunizationGender?.data?.[0]
                                  ?.vaccine_list || []
                              )?.map((r: any) => r?.pct_female) || [],
                            type: "bar",
                            label: {
                              precision: 1,
                            },
                          },
                        ],
                        (
                          getGraphImmunizationGender?.data?.[0]?.vaccine_list ||
                          []
                        )?.map((r: any) => r?.vaccine_name) || [],
                        getGraphImmunizationGender?.data?.[0]?.vaccine_list || []
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

export default RoutineBabyImmunization;
