"use client";

import { useState } from "react";
import Image from "next/image"
import * as _ from 'lodash';
import styles from "@/assets/css/styles.module.css"
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png"
import { Banner, BannerHighlightFooter, BannerText, GraphEcharts, Navbar, Sidebar, Spin, Tabs } from "@/components"
import { ChildSummaryImmunization, FilterSummaryImmunization, GraphAddOn, GraphRoutineImmunizationCoverageTrend, RoutineImmunizationCoverageTrendGraph, SummaryImmunization, TotalSummaryImmunization } from "@/view/home";
import { Filter1, Filter2, Filter3, Filter4, Filter5 } from "@/view/dashboard/routine-baduta-immunization/Filter";
import { graphOptions1, graphOptions2, graphOptions3, graphOptions4, graphOptions5 } from "@/view/dashboard/routine-baduta-immunization/graphOptions";
import { useGetAverageImmunizationByGenderQuery, useGetDropoutDPTPercentageQuery, useGetDropoutRubelaPercentageQuery, useGetHighestImmunizationByAgeQuery, useGetImmunizationWithHighetFemaleRecivientQuery, useGetImmunizationWithHighetMaleRecivientQuery, useGetMaxImmunizationByAgeQuery, useGetPercentageTotalImmunizationQuery, useGetScopeBadutaImmunizationQuery, useGetScopeDPTImmunizationQuery, useGetScopePCVImmunizationQuery, useGetScopePercentagePerMonthQuery, useGetScopeRubelaImmunizationQuery, useGetSummaryImmunizationByAgeQuery, useGetSummaryImmunizationPerGenderQuery, useGetSummaryImmunizationPerVaccineQuery, useGetSummaryScopePercentageQuery, useGetSurpaseTargetPerVaccineQuery, useGetTotalBadutaImmunizationRecipientsQuery, useGetTotalHighestScopeByVaccineTypeQuery, useGetTotalHighestScopeQuery, useGetTotalLowestScopeByVaccineTypeQuery, useGetTotalLowestScopeQuery, useGetTotalScopeByVaccineTypeQuery, useGetTotalScopeQuery } from "@/lib/services/baduta-immunization";
import { dataMonths, dataTabBaduta, trendTypeOptions, vaccineTypeOptions } from "@/utils/constants";
import { formatNumber } from "@/helpers";
import { openSans } from "@/assets/fonts";

const RoutineBadutaImmunization = () => {
  const filterState = useState({
    tahun: new Date().getFullYear(),
    bulan: dataMonths.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: "",
    kabkota: "",
    kecamatan: "",
    jenis_sarana: "",
    faskes: "",
    tipe_vaksin1: vaccineTypeOptions[0].label,
    tipe_vaksin2: vaccineTypeOptions[0].label,
    tipe_vaksin3: vaccineTypeOptions[0].label,
    tipe_vaksin4: vaccineTypeOptions[0].label,
    tipe_vaksin5: vaccineTypeOptions[0].label,
    jenis_tren: "kumulatif",
    tipe_umur: 1,
    jenis_kelamin: 1,
    wilayah: "All",
    wilayah1: "province",
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
    region_id: filter.faskes
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
          : filter.provinsi
            ? filter.provinsi
            : "All",
    kewilayahan_type: filter.kewilayahan_type,
  };
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
  const filterQueryGraphPercentage = {
    ...dateQuery,
    region_type: filter.wilayah1,
    faskes_id: regionIdQuery,
    kewilayahan_type: filter.kewilayahan_type,
  };
  const filterQueryGraph = {
    ...dateQuery,
    region_type: filter.wilayah,
    faskes_id: regionIdQuery,
    kewilayahan_type: filter.kewilayahan_type,
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
  const {
    data: getTotalImmunizationQuery,
    isFetching: isLoadingTotalImmunizationQuery,
  } = useGetTotalBadutaImmunizationRecipientsQuery(filterQuery, optionQuery);
  const {
    data: getDoPercentageDPHTHBHIBQuery,
    isFetching: isLoadingDoPercentageDPHTHBHIBQuery,
  } = useGetDropoutDPTPercentageQuery(filterQuery, optionQuery);
  const {
    data: getDoPercentageCampakRubelaQuery,
    isFetching: isLoadingDoPercentageCampakRubelaQuery,
  } = useGetDropoutRubelaPercentageQuery(filterQuery, optionQuery);
  const {
    data: getTotalImmunizationByVaccineTypeQuery1,
    isFetching: isLoadingTotalImmunizationByVaccineTypeQuery1,
  } = useGetScopeBadutaImmunizationQuery(
    { ...filterQuery, vaccine_type: vaccineTypeOptions[0].label },
    optionQuery
  );
  const {
    data: getTotalImmunizationByVaccineTypeQuery2,
    isFetching: isLoadingTotalImmunizationByVaccineTypeQuery2,
  } = useGetScopeDPTImmunizationQuery(
    { ...filterQuery, vaccine_type: vaccineTypeOptions[1].label },
    optionQuery
  );
  const {
    data: getTotalImmunizationByVaccineTypeQuery3,
    isFetching: isLoadingTotalImmunizationByVaccineTypeQuery3,
  } = useGetScopeRubelaImmunizationQuery(
    { ...filterQuery, vaccine_type: vaccineTypeOptions[2].label },
    optionQuery
  );
  const {
    data: getTotalImmunizationByVaccineTypeQuery4,
    isFetching: isLoadingTotalImmunizationByVaccineTypeQuery4,
  } = useGetScopePCVImmunizationQuery(
    { ...filterQuery, vaccine_type: vaccineTypeOptions[3].label },
    optionQuery
  );
  const { data: getTotalScopeQuery, isFetching: isLoadingTotalScopeQuery } =
    useGetTotalScopeQuery(
      { ...filterQueryGraphPercentage, vaccine_type: filter.tipe_vaksin1 },
      optionQueryTotal
    );
  const {
    data: getTotalHighestScopeQuery,
    isFetching: isLoadingTotalHighestScopeQuery,
  } = useGetTotalHighestScopeQuery(
    { ...filterQueryGraphPercentage, vaccine_type: filter.tipe_vaksin1 },
    optionQueryTotal
  );
  const {
    data: getTotalLowestScopeQuery,
    isFetching: isLoadingTotalLowestScopeQuery,
  } = useGetTotalLowestScopeQuery(
    { ...filterQueryGraphPercentage, vaccine_type: filter.tipe_vaksin1 },
    optionQueryTotal
  );
  const {
    data: getPercentageTotalImmunizationQuery,
    isFetching: isLoadingPercentageTotalImmunizationQuery,
  } = useGetPercentageTotalImmunizationQuery(
    { ...filterQueryGraphPercentage, vaccine_type: filter.tipe_vaksin1, faskes_id: regionIdQuery === 'All' ? undefined : regionIdQuery },
    optionQuery
  );
  const {
    data: getSetScopePercentagePerMonthQuery,
    isFetching: isLoadingSetScopePercentagePerMonthQuery,
  } = useGetScopePercentagePerMonthQuery(
    {
      ...filterQueryGraph,
      vaccine_type: filter.tipe_vaksin2,
      trend_type: _.upperFirst(filter.jenis_tren),
    },
    optionQuery
  );
  const {
    data: getSetSummaryScopePercentageQuery,
    isFetching: isLoadingSetSummaryScopePercentageQuery,
  } = useGetSummaryScopePercentageQuery(
    {
      ...filterQueryGraph,
      vaccine_type: filter.tipe_vaksin2,
      trend_type: _.upperFirst(filter.jenis_tren),
    },
    optionQuery
  );
  const {
    data: getTotalScopeByVaccineTypeQuery,
    isFetching: isLoadingTotalScopeByVaccineTypeQuery,
  } = useGetTotalScopeByVaccineTypeQuery(
    { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin3 },
    optionQuery
  );
  const {
    data: getTotalHighestScopeByVaccineTypeQuery,
    isFetching: isLoadingTotalHighestScopeByVaccineTypeQuery,
  } = useGetTotalHighestScopeByVaccineTypeQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin3 }, optionQuery);
  const {
    data: getTotalLowestScopeByVaccineTypeQuery,
    isFetching: isLoadingTotalLowestScopeByVaccineTypeQuery,
  } = useGetTotalLowestScopeByVaccineTypeQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin3 }, optionQuery);
  const { data: getSummaryImmunizationPerVaccineQuery } = useGetSummaryImmunizationPerVaccineQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin3 }, optionQuery)
  const aliasSummaryImmunizationPerVaccineQuery = getSummaryImmunizationPerVaccineQuery?.data ? getSummaryImmunizationPerVaccineQuery?.data[0]?.vaccine_list : []
  const {
    data: getMaxImmunizationByAgeQuery2,
    isFetching: isLoadingMaxImmunizationByAgeQuery2,
  } = useGetMaxImmunizationByAgeQuery(
    { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin4, age_type: filter.tipe_umur },
    optionQuery
  );
  const {
    data: getHighestImmunizationByAgeQuery,
    isFetching: isLoadingHighestImmunizationByAgeQuery,
  } = useGetHighestImmunizationByAgeQuery(
    { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin4, age_type: filter.tipe_umur },
    optionQuery
  );
  const {
    data: getSummaryImmunizationByAgeQuery,
    isFetching: isLoadingSummaryImmunizationByAgeQuery,
  } = useGetSummaryImmunizationByAgeQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin4, age_type: filter.tipe_umur }, optionQuery)
  const aliasSummaryImmunizationByAgeQuery = getSummaryImmunizationByAgeQuery?.data ? getSummaryImmunizationByAgeQuery?.data[0]?.vaccine_list : []
  const { data: getAverageImmunizationByGenderQuery,
    isFetching: isLoadingAverageImmunizationByGenderQuery,
  } = useGetAverageImmunizationByGenderQuery(filterQueryGraph, optionQuery);
  const {
    data: getImmunizationWithHighetMaleRecivientQuery,
    isFetching: isLoadingImmunizationWithHighetMaleRecivientQuery,
  } = useGetImmunizationWithHighetMaleRecivientQuery(
    filterQueryGraph,
    optionQuery
  );
  const {
    data: getImmunizationWithHighetFemaleRecivientQuery,
    isFetching: isLoadingImmunizationWithHighetFemaleRecivientQuery,
  } = useGetImmunizationWithHighetFemaleRecivientQuery(
    filterQueryGraph,
    optionQuery
  );
  const {
    data: getSummaryImmunizationPerGenderQuery,
    isFetching: isLoadingSummaryImmunizationPerGenderQuery,
  } = useGetSummaryImmunizationPerGenderQuery(filterQueryGraph, optionQuery)
  const aliasSummaryImmunizationPerGenderQuery = getSummaryImmunizationPerGenderQuery?.data ? getSummaryImmunizationPerGenderQuery?.data[0]?.vaccine_list : []

  const dataGraphRegionalRoutineImmunizationCoverageTrend1 = [
    {
      title: `Total Cakupan ${vaccineTypeOptions.find((f) => f.label === filter.tipe_vaksin1)?.label} Nasional Tahun ${getTotalScopeQuery?.data?.year || filter.tahun
        }`,
      value: <div>{getTotalScopeQuery?.data ? formatNumber(getTotalScopeQuery?.data[0]?.percentage || 0) : 0}%</div>,
      regional: <></>,
      isFetching: isLoadingTotalScopeQuery,
    },
    {
      title: `Cakupan Tertinggi Tahun ${getTotalHighestScopeQuery?.data?.year || filter.tahun
        }`,
      value: (
        <div className="font-bold">
          {formatNumber(getTotalHighestScopeQuery?.data?.percentage || 0)}%
        </div>
      ),
      regional: (
        <div>
          {getTotalHighestScopeQuery?.data?.wilayah_desc !== "All"
            ? getTotalHighestScopeQuery?.data?.wilayah_desc
            : ""}
        </div>
      ),
      isFetching: isLoadingTotalHighestScopeQuery,
    },
    {
      title: `Cakupan Terendah Tahun ${getTotalHighestScopeQuery?.data?.year || filter.tahun
        }`,
      value: (
        <div className="font-bold">
          {formatNumber(getTotalLowestScopeQuery?.data?.percentage || 0)}%
        </div>
      ),
      regional: (
        <div>
          {getTotalLowestScopeQuery?.data?.wilayah_desc !== "All"
            ? getTotalLowestScopeQuery?.data?.wilayah_desc
            : ""}
        </div>
      ),
      isFetching: isLoadingTotalLowestScopeQuery,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend2 = [
    {
      title: `Cakupan ${vaccineTypeOptions.find((f) => f.label === filter.tipe_vaksin3)?.label}`,
      value: (
        <div>
          {getTotalScopeByVaccineTypeQuery?.data ? formatNumber(getTotalScopeByVaccineTypeQuery?.data[0]?.percentage || 0) : 0}%
        </div>
      ),
      regional: (
        <div>
          Jumlah Cakupan:{" "}
          {getTotalScopeByVaccineTypeQuery?.data ? formatNumber(getTotalScopeByVaccineTypeQuery?.data[0]?.total || 0) : 0}
        </div>
      ),
      isFetching: isLoadingTotalScopeByVaccineTypeQuery,
    },
    {
      title: `Cakupan Imunisasi Tertinggi`,
      value: (
        <div>{getTotalHighestScopeByVaccineTypeQuery?.data?.vaksin || ""}</div>
      ),
      regional: (
        <div>
          Jumlah Cakupan:{" "}
          {formatNumber(
            getTotalHighestScopeByVaccineTypeQuery?.data?.total || 0
          )}
        </div>
      ),
      threshold: (
        <div>
          % Cakupan:{" "}
          {formatNumber(
            getTotalHighestScopeByVaccineTypeQuery?.data?.percentage || 0
          )}
          %
        </div>
      ),
      isFetching: isLoadingTotalHighestScopeByVaccineTypeQuery,
    },
    {
      title: `Cakupan Imunisasi Terendah`,
      value: (
        <div>
          {getTotalLowestScopeByVaccineTypeQuery?.data?.vaksin === "ALL"
            ? "Baduta Lengkap"
            : getTotalLowestScopeByVaccineTypeQuery?.data?.vaksin}
        </div>
      ),
      regional: (
        <div>
          Jumlah Cakupan:{" "}
          {formatNumber(
            getTotalLowestScopeByVaccineTypeQuery?.data?.total || 0
          )}
        </div>
      ),
      threshold: (
        <div>
          % Cakupan:{" "}
          {formatNumber(
            getTotalLowestScopeByVaccineTypeQuery?.data?.percentage || 0
          )}
          %
        </div>
      ),
      isFetching: isLoadingTotalLowestScopeByVaccineTypeQuery,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend3 = [
    {
      title: (
        <div className="font-bold text-xl">
          3 Imunisasi dengan Penerima{" "}
          <b style={{ color: "#00B1A9" }}>Usia Ideal</b> Terbanyak
        </div>
      ),
      value: getHighestImmunizationByAgeQuery?.data?.map(
        (r: any, i: number) => (
          <li key={i + "max"}>
            {i + 1}. {r.vaksin}
          </li>
        )
      ),
      isFetching: isLoadingHighestImmunizationByAgeQuery,
    },
    {
      title: (
        <div className="font-bold text-xl">
          3 Imunisasi dengan Penerima{" "}
          <b style={{ color: "#83E0DB" }}>Usia Non Ideal</b> Terbanyak
        </div>
      ),
      value: getMaxImmunizationByAgeQuery2?.data?.map((r: any, i: number) => (
        <li key={i + "max"}>
          {i + 1}. {r.vaksin}
        </li>
      )),
      isFetching: isLoadingMaxImmunizationByAgeQuery2,
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend4 = [
    {
      title: `3 Imunisasi dengan Penerima Usia Perempuan Terbanyak`,
      value: getImmunizationWithHighetMaleRecivientQuery?.data?.map(
        (r: any, i: number) => (
          <li key={i + "max"}>
            {i + 1}. {r.vaksin}
          </li>
        )
      ),
      isFetching: isLoadingImmunizationWithHighetMaleRecivientQuery,
    },
    {
      title: `3 Imunisasi dengan Penerima Usia Susulan Terbanyak`,
      value: getImmunizationWithHighetFemaleRecivientQuery?.data?.map(
        (r: any, i: number) => (
          <li key={i + "max"}>
            {i + 1}. {r.vaksin}
          </li>
        )
      ),
      isFetching: isLoadingImmunizationWithHighetFemaleRecivientQuery,
    },
  ];

  const ageChartOptions: any = {
    color: ["#2E90FA", "#E478FA"],
    tooltip: {
      trigger: "item",
      formatter: (params: any) => {
        const value = params.data.value;
        const formattedValue = value?.toFixed(2).replace(".", ",");
        return `${params.marker} ${params.name}: <span style="float: right; margin-left: 8px;"><strong>${formattedValue}%</strong></span><br/>`;
      },
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
          formatter: (params: any) => {
            const value =
              params.name === "Laki-laki"
                ? getAverageImmunizationByGenderQuery?.data?.pct_male
                : getAverageImmunizationByGenderQuery?.data?.pct_female;
            return `${value?.toFixed(2).replace(".", ",")}%`;
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: getAverageImmunizationByGenderQuery?.data?.pct_male,
            name: "Laki-laki",
          },
          {
            value: getAverageImmunizationByGenderQuery?.data?.pct_female,
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
          <div>
            <Tabs
              data={dataTabBaduta}
              variant="private"
              value={filter.kewilayahan_type}
              filterState={filterState}
            />
            <div className="flex flex-col gap-4 text-sm">
              <div className="font-bold text-primary-1 text-xl md:text-3xl">
                Imunisasi Rutin Baduta
              </div>
              <div className={`${openSans.className}`}>
                Menampilkan data cakupan imunisasi rutin baduta berdasarkan
                jenis imunisasi, cakupan daerah, usia pemberian, dan jenis
                kelamin baduta.
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunization filterState={filterState} />
            </div>
            <div className="py-6"></div>
            <div>
              <div className="font-bold text-primary-2 text-xl md:text-3xl">
                Ringkasan Data Cakupan Imunisasi Rutin Baduta
              </div>
              <div className={`${openSans.className}`}>
                Ringkasan berisi data total penerima imunisasi rutin baduta dan
                jenis imunisasi rutin baduta terhadap target cakupan yang sudah
                ditentukan.
              </div>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mt-4">
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalImmunizationQuery && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-8 ${styles.scoreCardPurple}`}
                    background="white"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title="Total Penerima Imunisasi Baduta"
                    contentTooltip={<>Total Penerima Imunisasi Baduta</>}
                    value={
                      getTotalImmunizationQuery?.data
                        ? formatNumber(
                          getTotalImmunizationQuery?.data[0]?.total || 0
                        )
                        : "0"
                    }
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingDoPercentageDPHTHBHIBQuery && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-8 ${styles.scoreCardYellow}`}
                    background="white"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title={"Persentase Drop Out \nDPT-HB-Hib"}
                    value={
                      getDoPercentageDPHTHBHIBQuery?.data
                        ? `${formatNumber(
                          getDoPercentageDPHTHBHIBQuery?.data[0]
                            ?.total || 0
                        )}`
                        : "0"
                    }
                    percent={
                      getDoPercentageDPHTHBHIBQuery?.data
                        ? getDoPercentageDPHTHBHIBQuery?.data[0]?.drop_out_percentage
                        : 0
                    }
                    target={
                      getDoPercentageDPHTHBHIBQuery?.data
                        ? formatNumber(
                          getDoPercentageDPHTHBHIBQuery?.data[0]?.target || 0
                        )
                        : 0
                    }
                    subtitle={" dari "}
                    contentTooltip={<>Persentase Drop Out DPT-HB-Hib</>}
                    showLine={false}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingDoPercentageCampakRubelaQuery && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-8 ${styles.scoreCardYellow}`}
                    background="white"
                    classNameTitle="text-white"
                    classNameValue="text-4xl text-white"
                    title={"Persentase Drop Out \nCampak Rubela"}
                    value={
                      getDoPercentageCampakRubelaQuery?.data
                        ? `${formatNumber(
                          getDoPercentageCampakRubelaQuery?.data[0]
                            ?.total || 0
                        )}`
                        : "0"
                    }
                    percent={
                      getDoPercentageCampakRubelaQuery?.data
                        ? getDoPercentageCampakRubelaQuery?.data[0]?.drop_out_percentage
                        : 0
                    }
                    target={
                      getDoPercentageCampakRubelaQuery?.data
                        ? formatNumber(
                          getDoPercentageCampakRubelaQuery?.data[0]?.target ||
                          0
                        )
                        : 0
                    }
                    subtitle={" dari "}
                    contentTooltip={<>Persentase Drop Out Campak Rubela</>}
                    showLine={false}
                  />
                </div>
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mt-4">
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalImmunizationByVaccineTypeQuery1 && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-4 border rounded-lg ${openSans.className}`}
                    contentTooltip={<div>{vaccineTypeOptions[0].label}</div>}
                    title={vaccineTypeOptions[0].label}
                    value={
                      getTotalImmunizationByVaccineTypeQuery1?.data
                        ? formatNumber(
                          getTotalImmunizationByVaccineTypeQuery1?.data[0]
                            ?.total || 0
                        )
                        : "0"
                    }
                    percent={
                      getTotalImmunizationByVaccineTypeQuery1?.data
                        ? getTotalImmunizationByVaccineTypeQuery1?.data[0]
                          ?.percentage
                        : 0
                    }
                    target={
                      getTotalImmunizationByVaccineTypeQuery1?.data
                        ? formatNumber(
                          getTotalImmunizationByVaccineTypeQuery1?.data[0]
                            ?.target || 0
                        )
                        : 0
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalImmunizationByVaccineTypeQuery2 && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-4 border rounded-lg ${openSans.className}`}
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={vaccineTypeOptions[1].label}
                    value={
                      getTotalImmunizationByVaccineTypeQuery2?.data
                        ? formatNumber(
                          getTotalImmunizationByVaccineTypeQuery2?.data[0]
                            ?.total || 0
                        )
                        : "0"
                    }
                    percent={
                      getTotalImmunizationByVaccineTypeQuery2?.data
                        ? getTotalImmunizationByVaccineTypeQuery2?.data[0]
                          ?.percentage
                        : 0
                    }
                    target={
                      getTotalImmunizationByVaccineTypeQuery2?.data
                        ? formatNumber(
                          getTotalImmunizationByVaccineTypeQuery2?.data[0]
                            ?.target || 0
                        )
                        : 0
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalImmunizationByVaccineTypeQuery3 && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-4 border rounded-lg ${openSans.className}`}
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={vaccineTypeOptions[2].label}
                    value={
                      getTotalImmunizationByVaccineTypeQuery3?.data
                        ? formatNumber(
                          getTotalImmunizationByVaccineTypeQuery3?.data[0]
                            ?.total || 0
                        )
                        : "0"
                    }
                    percent={
                      getTotalImmunizationByVaccineTypeQuery3?.data
                        ? getTotalImmunizationByVaccineTypeQuery3?.data[0]
                          ?.percentage
                        : 0
                    }
                    target={
                      getTotalImmunizationByVaccineTypeQuery3?.data
                        ? formatNumber(
                          getTotalImmunizationByVaccineTypeQuery3?.data[0]
                            ?.target || 0
                        )
                        : 0
                    }
                    subtitle={" dari "}
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  {isLoadingTotalImmunizationByVaccineTypeQuery4 && <Spin />}
                  <ChildSummaryImmunization
                    className={`px-4 border rounded-lg ${openSans.className}`}
                    titleIcon={
                      <Image
                        alt="satusehat"
                        src={VaccinateNudge.src}
                        width={24}
                        height={24}
                      />
                    }
                    title={vaccineTypeOptions[3].label}
                    value={
                      getTotalImmunizationByVaccineTypeQuery4?.data
                        ? formatNumber(
                          getTotalImmunizationByVaccineTypeQuery4?.data[0]
                            ?.total || 0
                        )
                        : "0"
                    }
                    percent={
                      getTotalImmunizationByVaccineTypeQuery4?.data
                        ? getTotalImmunizationByVaccineTypeQuery4?.data[0]
                          ?.percentage
                        : 0
                    }
                    target={
                      getTotalImmunizationByVaccineTypeQuery4?.data
                        ? formatNumber(
                          getTotalImmunizationByVaccineTypeQuery4?.data[0]
                            ?.target || 0
                        )
                        : 0
                    }
                    subtitle={" dari "}
                  />
                </div>
              </div>
            </div>
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Daerah Imunisasi Baduta"
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={<div className="font-bold md:text-2xl">Grafik Cakupan <b className="text-primary-2">{vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin1)?.label}</b> pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">{filter.tahun}</b></div>}
                      subTitle={`Grafik menampilkan hasil cakupan ${vaccineTypeOptions.find((r) => r.label === filter.tipe_vaksin1)?.label} dari 34 provinsi di Indonesia`}
                      addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend1} />} variant="private"
                      filterState={filterState}
                      filterComp={
                        <Filter1
                          filterState={filterState}
                          data={getPercentageTotalImmunizationQuery?.data || []}
                        />
                      }
                      isLoading={isLoadingPercentageTotalImmunizationQuery}
                      opts={{
                        height:
                          getPercentageTotalImmunizationQuery?.data?.length >
                            1500
                            ? 65000
                            : getPercentageTotalImmunizationQuery?.data
                              ?.length > 700
                              ? 35000
                              : getPercentageTotalImmunizationQuery?.data
                                ?.length > 200
                                ? 15000
                                : 900,
                      }}
                      graphOptions={graphOptions1([{
                        // @ts-ignore
                        name: "Target Cakupan per Daerah = 100%",
                        data:
                          (
                            getPercentageTotalImmunizationQuery?.data ||
                            []
                          )?.map((r: any) => ({
                            value: r?.percentage,
                            itemStyle: {
                              color:
                                r.faskes_desc === "All"
                                  ? "#2D9CED"
                                  : undefined,
                            },
                          })) || [],
                        type: "bar",
                        label: {
                          show: true,
                          precision: 1,
                          position: "right",
                          formatter: (params: any) =>
                            `${formatNumber(params.value)}% (${formatNumber(((getPercentageTotalImmunizationQuery?.data)?.map((r: any) => r?.total)?.reverse())[params?.dataIndex])})`,
                        },
                      },
                      {
                        name: "Target",
                        type: "line",
                        color: "#CD4243",
                        data: (
                          _.uniqBy(getPercentageTotalImmunizationQuery?.data, "faskes_desc") ||
                          []
                        )?.map((r: any) => r?.threshold) || [],
                        label: {
                          show: true,
                          precision: 1,
                          position: "right",
                          formatter: (params: any) =>
                            `${formatNumber(params.value)}%`,
                        },
                      }
                      ]
                        , (
                          _.uniqBy(getPercentageTotalImmunizationQuery?.data, "faskes_desc") ||
                          []
                        )?.map((r: any) => r?.faskes_desc === "All" ? "Nasional" : r?.faskes_desc)
                      )}
                    />
                  </div>
                }
              />
            </div>
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi Baduta"
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={<div className="font-bold md:text-2xl">Data {trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} Jumlah Penerima, Cakupan, dan Target Cakupan <b className="text-primary-2">{vaccineTypeOptions.find((r) => r.label === filter.tipe_vaksin2)?.label}</b> pada Baduta Selama Tahun <b className="text-primary-2">{filter.tahun}</b></div>}
                      subTitle={`Grafik menampilkan tren cakupan ${trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} penerima ${vaccineTypeOptions.find((r) => r.label === filter.tipe_vaksin2)?.label} pada baduta selama tahun ${filter.tahun}`}
                      variant="private"
                      filterState={filterState}
                      filterComp={
                        <Filter2
                          filterState={filterState}
                          data={getSetScopePercentagePerMonthQuery?.data || []}
                        />
                      }
                      threshold={
                        <div className="relative flex justify-center items-center">
                          {isLoadingSetSummaryScopePercentageQuery && <Spin />}
                          <div className="p-2 sm:w-32 md:w-64 h-fit">
                            <div className="text-sm">
                              Total cakupan{" "}
                              {
                                trendTypeOptions.find(
                                  (r) => r.value === filter.jenis_tren
                                )?.label
                              }{" "}
                              pada bulan {(dataMonths)?.find((f) => f.value === filter.bulan)?.label || ''} tahun {filter.tahun}
                            </div>
                            <div className="py-2 font-bold text-3xl text-primary">
                              {formatNumber(
                                getSetSummaryScopePercentageQuery?.data
                                  ?.percentage || 0
                              )}
                              %
                            </div>
                            <div>
                              Jumlah{" "}
                              {
                                vaccineTypeOptions.find(
                                  (r) => r.value === filter.tipe_vaksin2
                                )?.label
                              }
                              :{" "}
                              {formatNumber(
                                getSetSummaryScopePercentageQuery?.data
                                  ?.total || 0
                              )}
                            </div>
                          </div>
                        </div>
                      }
                      isLoading={isLoadingSetScopePercentagePerMonthQuery}
                      opts={{
                        height: 500
                      }}
                      graphOptions={graphOptions2([
                        {
                          name: "% Target Cakupan",
                          data:
                            (
                              getSetScopePercentagePerMonthQuery?.data || []
                            )?.map(
                              (r: any) =>
                                ((r?.threshold || 0) / 100) * (r?.total || 0)
                            ) || [],
                          type: "line",
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) =>
                              `${formatNumber(
                                ((params.value || 0) /
                                  (getSetScopePercentagePerMonthQuery?.data ||
                                    [])[params.dataIndex]?.total) *
                                100
                              )}%`,
                          },
                        },
                        {
                          name: "Jumlah Penerima Imunisasi",
                          data:
                            (
                              getSetScopePercentagePerMonthQuery?.data || []
                            )?.map((r: any) => r?.total || 0) || [],
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
                          data: (getSetScopePercentagePerMonthQuery?.data || [])?.map((r: any) => (((r?.percentage || 0) / 100) * (r?.total || 0)).toFixed(2)) || [],
                          type: 'line',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) =>
                              `${formatNumber(
                                ((params.value || 0) /
                                  (getSetScopePercentagePerMonthQuery?.data ||
                                    [])[params.dataIndex]?.total) *
                                100
                              )}%`,
                          },
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
                      filterComp={
                        <Filter3
                          filterState={filterState}
                          data={aliasSummaryImmunizationPerVaccineQuery || []}
                          showFilter={false}
                        />
                      }
                      opts={{
                        height: 500
                      }}
                      graphOptions={graphOptions3([
                        {
                          name: "% Cakupan",
                          data: aliasSummaryImmunizationPerVaccineQuery?.map((r: any) => (((r?.pct || 0) / 100) * (r?.ytd_total || 0)).toFixed(2)) || [],
                          type: 'line',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(((params.value || 0) / (aliasSummaryImmunizationPerVaccineQuery || [])[params.dataIndex]?.ytd_total) * 100)}%`
                          }
                        },
                        {
                          name: "% Target Cakupan",
                          data: aliasSummaryImmunizationPerVaccineQuery?.map((r: any) => (((r?.threshold || 0) / 100) * (r?.ytd_total || 0)).toFixed(2)) || [],
                          type: 'line',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(((params.value || 0) / (aliasSummaryImmunizationPerVaccineQuery || [])[params.dataIndex]?.ytd_total) * 100)}%`
                          }
                        },
                        {
                          name: "Cakupan",
                          data: aliasSummaryImmunizationPerVaccineQuery?.map((r: any) => r?.ytd_total) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(params.value || 0)}`
                          }
                        },
                      ], aliasSummaryImmunizationPerVaccineQuery?.map((r: any) => r?.vaccine_name)
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
                      filterComp={
                        <Filter4
                          filterState={filterState}
                          data={aliasSummaryImmunizationByAgeQuery || []}
                        />
                      }
                      isLoading={isLoadingSummaryImmunizationByAgeQuery}
                      opts={{
                        height: 500
                      }}
                      graphOptions={graphOptions4([
                        {
                          name: "Usia Ideal",
                          data: aliasSummaryImmunizationByAgeQuery?.map((r: any) => r?.ytd_ideal) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(params.value || 0)}`
                          }
                        },
                        {
                          name: "Usia Non Ideal",
                          data: aliasSummaryImmunizationByAgeQuery?.map((r: any) => r?.ytd_non_ideal) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(params.value || 0)}`
                          }
                        },
                      ], aliasSummaryImmunizationByAgeQuery?.map((r: any) => r?.vaccine_name)
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
                                {r?.isFetching && <Spin />}
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
                          data={aliasSummaryImmunizationPerGenderQuery || []}
                        />
                      }
                      isLoading={isLoadingSummaryImmunizationPerGenderQuery}
                      opts={{
                        height: 500
                      }}
                      graphOptions={graphOptions5([
                        {
                          name: "Laki-laki",
                          data: aliasSummaryImmunizationPerGenderQuery?.map((r: any) => r?.pct_male) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(params.value || 0)}%`
                          }
                        },
                        {
                          name: "Perempuan",
                          data: aliasSummaryImmunizationPerGenderQuery?.map((r: any) => r?.pct_female) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(params.value || 0)}%`
                          }
                        },
                      ], aliasSummaryImmunizationPerGenderQuery?.map((r: any) => r?.vaccine_name)
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

export default RoutineBadutaImmunization;
