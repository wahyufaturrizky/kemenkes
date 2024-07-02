"use client";

import { useState } from "react";
import Image from "next/image"
import styles from "@/assets/css/styles.module.css"
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png"
import { Banner, BannerHighlightFooter, BannerText, GraphEcharts, Navbar, Sidebar, Spin, Tabs } from "@/components"
import { ChildSummaryImmunization, FilterSummaryImmunization, GraphAddOn, GraphRoutineImmunizationCoverageTrend, RoutineImmunizationCoverageTrendGraph, SummaryImmunization, TotalSummaryImmunization } from "@/view/home";
import { Filter1, Filter2, Filter3, Filter4, Filter5 } from "@/view/dashboard/routine-baduta-immunization/Filter";
import { graphOptions1, graphOptions2, graphOptions3, graphOptions4, graphOptions5 } from "@/view/dashboard/routine-baduta-immunization/graphOptions";
import { useGetAverageImmunizationByGenderQuery, useGetDoPercentageCampakRubelaQuery, useGetDoPercentageDPHTHBHIBQuery, useGetHighestImmunizationByAgeQuery, useGetImmunizationWithHighetFemaleRecivientQuery, useGetImmunizationWithHighetMaleRecivientQuery, useGetMaxImmunizationByAgeQuery, useGetPercentageTotalImmunizationQuery, useGetScopePercentagePerMonthQuery, useGetSummaryImmunizationByAgeQuery, useGetSummaryImmunizationPerGenderQuery, useGetSummaryImmunizationPerVaccineQuery, useGetSummaryScopePercentageQuery, useGetSurpaseTargetPerVaccineQuery, useGetTotalHighestScopeByVaccineTypeQuery, useGetTotalHighestScopeQuery, useGetTotalImmunizationByVaccineTypeQuery, useGetTotalImmunizationQuery, useGetTotalLowestScopeByVaccineTypeQuery, useGetTotalLowestScopeQuery, useGetTotalScopeByVaccineTypeQuery, useGetTotalScopeQuery } from "@/lib/services/baduta-immunization";
import { dataMonths, dataTabBaduta, trendTypeOptions, vaccineTypeOptions } from "@/utils/constants";
import { formatNumber } from "@/helpers";
import { openSans } from "@/assets/fonts";

const RoutineBadutaImmunization = () => {
  const filterState = useState({
    // tahun: new Date().getFullYear(),
    tahun: 2023,
    bulan: dataMonths.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: '',
    kabkota: '',
    kecamatan: '',
    jenis_sarana: '',
    faskes: '',
    tipe_vaksin1: "1",
    tipe_vaksin2: "1",
    tipe_vaksin3: "1",
    tipe_vaksin4: "1",
    tipe_vaksin5: "1",
    jenis_tren: 'kumulatif',
    tipe_umur: 1,
    jenis_kelamin: 1,
    wilayah: "All",
    wilayah1: "All",
    kewilayahan_type: 0
  })
  const [filter] = filterState

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
      ? filter.faskes
      : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
          ? filter.kabkota
          : filter.provinsi
            ? filter.provinsi
            : "All",
    kewilayahan_type: filter.kewilayahan_type,
    faskes_id: 16
  };
  const regionIdQuery = filter.wilayah === "faskes"
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
    region_id: regionIdQuery,
    kewilayahan_type: filter.kewilayahan_type,
    faskes_id: 16
  };
  const filterQueryGraph = {
    ...dateQuery,
    region_type: filter.wilayah,
    region_id: regionIdQuery,
    kewilayahan_type: filter.kewilayahan_type,
    faskes_id: 16
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
    skip: (!filter.tahun || !filter.bulan || !filter.wilayah || (!filter.tipe_vaksin1 || !filter.tipe_vaksin2 || !filter.tipe_vaksin3)
      && (!filter.provinsi || !filter.kabkota || !filter.kecamatan))
  }
  const optionQueryTotal = {
    refetchOnMountOrArgChange: true,
    skip: !filter.wilayah || (!filter.tipe_vaksin1 || !filter.tipe_vaksin2 || !filter.tipe_vaksin3)
  }
  const { data: getTotalImmunizationQuery,
    isLoading: isLoadingTotalImmunizationQuery
  } = useGetTotalImmunizationQuery(filterQueryGraphPercentage, optionQuery)
  const { data: getDoPercentageDPHTHBHIBQuery,
    isLoading: isLoadingDoPercentageDPHTHBHIBQuery,
  } = useGetDoPercentageDPHTHBHIBQuery(filterQuery, optionQuery)
  const { data: getDoPercentageCampakRubelaQuery,
    isLoading: isLoadingDoPercentageCampakRubelaQuery,
  } = useGetDoPercentageCampakRubelaQuery(filterQuery, optionQuery)
  const { data: getTotalImmunizationByVaccineTypeQuery1,
    isLoading: isLoadingTotalImmunizationByVaccineTypeQuery1,
  } = useGetTotalImmunizationByVaccineTypeQuery({ ...filterQuery, vaccine_type: 1 }, optionQuery)
  const { data: getTotalImmunizationByVaccineTypeQuery2,
    isLoading: isLoadingTotalImmunizationByVaccineTypeQuery2,
  } = useGetTotalImmunizationByVaccineTypeQuery({ ...filterQuery, vaccine_type: 2 }, optionQuery)
  const { data: getTotalImmunizationByVaccineTypeQuery3,
    isLoading: isLoadingTotalImmunizationByVaccineTypeQuery3,
  } = useGetTotalImmunizationByVaccineTypeQuery({ ...filterQuery, vaccine_type: 3 }, optionQuery)
  const { data: getTotalImmunizationByVaccineTypeQuery4,
    isLoading: isLoadingTotalImmunizationByVaccineTypeQuery4,
  } = useGetTotalImmunizationByVaccineTypeQuery({ ...filterQuery, vaccine_type: 4 }, optionQuery)
  const { data: getTotalScopeQuery,
    isLoading: isLoadingTotalScopeQuery,
  } = useGetTotalScopeQuery({ ...filterQuery, vaccine_type: filter.tipe_vaksin1 }, optionQueryTotal)
  const { data: getTotalHighestScopeQuery,
    isLoading: isLoadingTotalHighestScopeQuery,
  } = useGetTotalHighestScopeQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin1 }, optionQueryTotal)
  const { data: getTotalLowestScopeQuery,
    isLoading: isLoadingTotalLowestScopeQuery,
  } = useGetTotalLowestScopeQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin1 }, optionQueryTotal)
  const { data: getPercentageTotalImmunizationQuery,
    isLoading: isLoadingPercentageTotalImmunizationQuery,
  } = useGetPercentageTotalImmunizationQuery({ ...filterQueryGraphPercentage, vaccine_type: filter.tipe_vaksin1 }, optionQuery)
  const { data: getSetScopePercentagePerMonthQuery,
    isLoading: isLoadingSetScopePercentagePerMonthQuery,
  } = useGetScopePercentagePerMonthQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin2, is_kumulatif: filter.jenis_tren === "kumulatif" ? true : false }, optionQuery)
  const { data: getSetSummaryScopePercentageQuery,
    isLoading: isLoadingSetSummaryScopePercentageQuery,
  } = useGetSummaryScopePercentageQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin2, is_kumulatif: filter.jenis_tren === "kumulatif" ? true : false }, optionQuery)
  const { data: getTotalScopeByVaccineTypeQuery,
    isLoading: isLoadingTotalScopeByVaccineTypeQuery,
  } = useGetTotalScopeByVaccineTypeQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin3 }, optionQuery)
  const { data: getTotalHighestScopeByVaccineTypeQuery,
    isLoading: isLoadingTotalHighestScopeByVaccineTypeQuery,
  } = useGetTotalHighestScopeByVaccineTypeQuery(filterQueryGraph, optionQuery)
  const { data: getTotalLowestScopeByVaccineTypeQuery,
    isLoading: isLoadingTotalLowestScopeByVaccineTypeQuery,
  } = useGetTotalLowestScopeByVaccineTypeQuery(filterQueryGraph, optionQuery)
  const { data: getSurpaseTargetPerVaccineQuery,
    isLoading: isLoadingSurpaseTargetPerVaccineQuery,
  } = useGetSurpaseTargetPerVaccineQuery(filterQueryGraph, optionQuery)
  const { data: getSummaryImmunizationPerVaccineQuery } = useGetSummaryImmunizationPerVaccineQuery(filterQueryGraph, optionQuery)
  const aliasSummaryImmunizationPerVaccineQuery = Object.entries(getSummaryImmunizationPerVaccineQuery?.data || []).map(([key, value]) => ({ label: key, value: value }));
  // const { data: getMaxImmunizationByAgeQuery1 } = useGetMaxImmunizationByAgeQuery({ ...filterQueryGraph, age_type: 1 }, optionQuery)
  const { data: getMaxImmunizationByAgeQuery2,
    isLoading: isLoadingMaxImmunizationByAgeQuery2,
  } = useGetMaxImmunizationByAgeQuery({ ...filterQueryGraph, age_type: filter.tipe_umur }, optionQuery)
  const { data: getHighestImmunizationByAgeQuery,
    isLoading: isLoadingHighestImmunizationByAgeQuery,
  } = useGetHighestImmunizationByAgeQuery({ ...filterQueryGraph, age_type: filter.tipe_umur }, optionQuery)
  const { data: getSummaryImmunizationByAgeQuery,
    isLoading: isLoadingSummaryImmunizationByAgeQuery,
  } = useGetSummaryImmunizationByAgeQuery(filterQueryGraph, optionQuery)
  const aliasSummaryImmunizationByAgeQuery = Object.entries(getSummaryImmunizationByAgeQuery?.data || []).map(([key, value]) => ({ label: key, value: value }));
  const { data: getAverageImmunizationByGenderQuery,
    isLoading: isLoadingAverageImmunizationByGenderQuery,
  } = useGetAverageImmunizationByGenderQuery(filterQueryGraph, optionQuery)
  const { data: getImmunizationWithHighetMaleRecivientQuery,
    isLoading: isLoadingImmunizationWithHighetMaleRecivientQuery,
  } = useGetImmunizationWithHighetMaleRecivientQuery(filterQueryGraph, optionQuery)
  const { data: getImmunizationWithHighetFemaleRecivientQuery,
    isLoading: isLoadingImmunizationWithHighetFemaleRecivientQuery,
  } = useGetImmunizationWithHighetFemaleRecivientQuery(filterQueryGraph, optionQuery)
  const { data: getSummaryImmunizationPerGenderQuery,
    isLoading: isLoadingSummaryImmunizationPerGenderQuery,
  } = useGetSummaryImmunizationPerGenderQuery(filterQueryGraph, optionQuery)
  const aliasSummaryImmunizationPerGenderQuery = Object.entries(getSummaryImmunizationPerGenderQuery?.data || []).map(([key, value]) => ({ label: key, value: value }));

  const dataGraphRegionalRoutineImmunizationCoverageTrend1 = [
    {
      title: `Total Cakupan Imunisasi Rutin Lengkap Nasional Tahun ${getTotalScopeQuery?.data?.year || filter.tahun}`,
      value: (<div>{formatNumber(getTotalScopeQuery?.data?.pct || 0)}%</div>),
      regional: <></>,
      isLoading: isLoadingTotalScopeQuery
    },
    {
      title: `Cakupan Tertinggi Tahun ${getTotalHighestScopeQuery?.data?.year || filter.tahun}`,
      value: (<div className="font-bold">{formatNumber(getTotalHighestScopeQuery?.data?.percentage || 0)}%</div>),
      regional: <div>{getTotalHighestScopeQuery?.data?.provinsi !== "All" ? getTotalHighestScopeQuery?.data?.provinsi : ''}</div>,
      isLoading: isLoadingTotalHighestScopeQuery
    },
    {
      title: `Cakupan Terendah Tahun ${getTotalHighestScopeQuery?.data?.year || filter.tahun}`,
      value: (<div className="font-bold">{formatNumber(getTotalLowestScopeQuery?.data?.percentage || 0)}%</div>),
      regional: <div>{getTotalLowestScopeQuery?.data?.provinsi !== "All" ? getTotalLowestScopeQuery?.data?.provinsi : ''}</div>,
      isLoading: isLoadingTotalLowestScopeQuery
    },
  ]
  const dataGraphRegionalRoutineImmunizationCoverageTrend2 = [
    {
      title: `Cakupan Imunisasi Baduta Lengkap`,
      value: (<div>{formatNumber(getTotalScopeByVaccineTypeQuery?.data?.pct || 0)}%</div>),
      regional: (<div>Jumlah Cakupan: {formatNumber(getTotalScopeByVaccineTypeQuery?.data?.total || 0)}</div>),
      isLoading: isLoadingTotalScopeByVaccineTypeQuery
    },
    {
      title: `Cakupan Imunisasi Tertinggi`,
      value: (<div>{getTotalHighestScopeByVaccineTypeQuery?.data?.vaksin || ""}</div>),
      regional: (<div>Jumlah Cakupan: {formatNumber(getTotalHighestScopeByVaccineTypeQuery?.data?.total || 0)}</div>),
      threshold: (<div>% Cakupan: {formatNumber(getTotalHighestScopeByVaccineTypeQuery?.data?.percentage || 0)}%</div>),
      isLoading: isLoadingTotalHighestScopeByVaccineTypeQuery
    },
    {
      title: `Cakupan Imunisasi Terendah`,
      value: (<div>{getTotalLowestScopeByVaccineTypeQuery?.data?.vaksin === "ALL" ? "Baduta Lengkap" : getTotalLowestScopeByVaccineTypeQuery?.data?.vaksin}</div>),
      regional: (<div>Jumlah Cakupan: {formatNumber(getTotalLowestScopeByVaccineTypeQuery?.data?.total || 0)}</div>),
      threshold: (<div>% Cakupan: {formatNumber(getTotalLowestScopeByVaccineTypeQuery?.data?.percentage || 0)}%</div>),
      isLoading: isLoadingTotalLowestScopeByVaccineTypeQuery
    },
  ]
  const dataGraphRegionalRoutineImmunizationCoverageTrend3 = [
    {
      title: <div className="font-bold text-xl">3 Imunisasi dengan Penerima <b style={{ color: "#00B1A9" }}>Usia Ideal</b> Terbanyak</div>,
      value: (getHighestImmunizationByAgeQuery?.data?.map((r: any, i: number) => <li key={i + 'max'}>{i + 1}. {r.vaksin}</li>)),
      isLoading: isLoadingHighestImmunizationByAgeQuery
    },
    {
      title: <div className="font-bold text-xl">3 Imunisasi dengan Penerima <b style={{ color: "#83E0DB" }}>Usia Non Ideal</b> Terbanyak</div>,
      value: (getMaxImmunizationByAgeQuery2?.data?.map((r: any, i: number) => <li key={i + 'max'}>{i + 1}. {r.vaksin}</li>)),
      isLoading: isLoadingMaxImmunizationByAgeQuery2
    },
  ]
  const dataGraphRegionalRoutineImmunizationCoverageTrend4 = [
    {
      title: `3 Imunisasi dengan Penerima Usia Perempuan Terbanyak`,
      value: (getImmunizationWithHighetMaleRecivientQuery?.data?.map((r: any, i: number) => <li key={i + 'max'}>{i + 1}. {r.vaksin}</li>)),
      isLoading: isLoadingImmunizationWithHighetMaleRecivientQuery
    },
    {
      title: `3 Imunisasi dengan Penerima Usia Susulan Terbanyak`,
      value: (getImmunizationWithHighetFemaleRecivientQuery?.data?.map((r: any, i: number) => <li key={i + 'max'}>{i + 1}. {r.vaksin}</li>)),
      isLoading: isLoadingImmunizationWithHighetFemaleRecivientQuery
    },
  ]

  const ageChartOptions: any = {
    color: ["#2E90FA", "#E478FA"],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      x: 'right'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        label: {
          show: true,
          position: 'inner',
          formatter: (params: any, i: number) => `${params.name === "Laki-laki" ? getAverageImmunizationByGenderQuery?.data?.pct_female
            : getAverageImmunizationByGenderQuery?.data?.pct_male}%`
        },
        labelLine: {
          show: false
        },
        data: [
          { value: getAverageImmunizationByGenderQuery?.data?.ytd_male_all, name: 'Laki-laki' },
          { value: getAverageImmunizationByGenderQuery?.data?.ytd_female_all, name: 'Perempuan' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return (
    <div className="flex flex-col items-center">
      {/* <div className="px-4 container">
        <Navbar />
      </div> */}
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
            <Tabs data={dataTabBaduta} variant="private" value={filter.kewilayahan_type} filterState={filterState} />
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
                    value={getTotalImmunizationQuery?.data ?
                      formatNumber(getTotalImmunizationQuery?.data[0]?.total || 0) : "0"}
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
                    value={getDoPercentageDPHTHBHIBQuery?.data ?
                      `${formatNumber(getDoPercentageDPHTHBHIBQuery?.data[0]?.percentage || 0)}%` : '0%'}
                    percent={getDoPercentageDPHTHBHIBQuery?.data ?
                      getDoPercentageDPHTHBHIBQuery?.data[0]?.percentage : 0}
                    target={getDoPercentageDPHTHBHIBQuery?.data ?
                      formatNumber(getDoPercentageDPHTHBHIBQuery?.data[0]?.target || 0) : 0}
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
                    value={getDoPercentageCampakRubelaQuery?.data ?
                      `${formatNumber(getDoPercentageCampakRubelaQuery?.data[0]?.percentage || 0)}%` : "0%"}
                    percent={getDoPercentageCampakRubelaQuery?.data ?
                      getDoPercentageCampakRubelaQuery?.data[0]?.percentage : 0}
                    target={getDoPercentageCampakRubelaQuery?.data ?
                      formatNumber(getDoPercentageCampakRubelaQuery?.data[0]?.target || 0) : 0}
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
                    value={getTotalImmunizationByVaccineTypeQuery1?.data ?
                      formatNumber(getTotalImmunizationByVaccineTypeQuery1?.data[0]?.total || 0) : '0'
                    }
                    percent={getTotalImmunizationByVaccineTypeQuery1?.data ?
                      getTotalImmunizationByVaccineTypeQuery1?.data[0]?.percentage : 0
                    }
                    target={getTotalImmunizationByVaccineTypeQuery1?.data ?
                      formatNumber(getTotalImmunizationByVaccineTypeQuery1?.data[0]?.target || 0) : 0
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
                    value={getTotalImmunizationByVaccineTypeQuery2?.data ?
                      formatNumber(getTotalImmunizationByVaccineTypeQuery2?.data[0]?.total || 0) : '0'
                    }
                    percent={getTotalImmunizationByVaccineTypeQuery2?.data ?
                      getTotalImmunizationByVaccineTypeQuery2?.data[0]?.percentage : 0
                    }
                    target={getTotalImmunizationByVaccineTypeQuery2?.data ?
                      formatNumber(getTotalImmunizationByVaccineTypeQuery2?.data[0]?.target || 0) : 0
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
                    value={getTotalImmunizationByVaccineTypeQuery3?.data ?
                      formatNumber(getTotalImmunizationByVaccineTypeQuery3?.data[0]?.total || 0) : '0'
                    }
                    percent={getTotalImmunizationByVaccineTypeQuery3?.data ?
                      getTotalImmunizationByVaccineTypeQuery3?.data[0]?.percentage : 0
                    }
                    target={getTotalImmunizationByVaccineTypeQuery3?.data ?
                      formatNumber(getTotalImmunizationByVaccineTypeQuery3?.data[0]?.target || 0) : 0
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
                    value={getTotalImmunizationByVaccineTypeQuery4?.data ?
                      formatNumber(getTotalImmunizationByVaccineTypeQuery4?.data[0]?.total || 0) : '0'
                    }
                    percent={getTotalImmunizationByVaccineTypeQuery4?.data ?
                      getTotalImmunizationByVaccineTypeQuery4?.data[0]?.percentage : 0
                    }
                    target={getTotalImmunizationByVaccineTypeQuery4?.data ?
                      formatNumber(getTotalImmunizationByVaccineTypeQuery4?.data[0]?.target || 0) : 0
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
                      subTitle={`Grafik menampilkan hasil cakupan ${vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin1)?.label} dari 34 provinsi di Indonesia`}
                      addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend1} />} variant="private"
                      filterState={filterState}
                      filterComp={<Filter1 filterState={filterState}
                        data={getPercentageTotalImmunizationQuery?.data || []} />}
                      isLoading={isLoadingPercentageTotalImmunizationQuery}
                      opts={{
                        height: getPercentageTotalImmunizationQuery?.data?.length > 1500 ? 65000 :
                          getPercentageTotalImmunizationQuery?.data?.length > 700 ? 35000 :
                            getPercentageTotalImmunizationQuery?.data?.length > 200 ? 15000 :
                              900
                      }}
                      graphOptions={graphOptions1([{
                        // @ts-ignore
                        name: "Target Cakupan per Daerah = 100%",
                        data:
                          (
                            getPercentageTotalImmunizationQuery?.data ||
                            []
                          )?.map((r: any) => r?.percentage) || [],
                        type: "bar",
                        label: {
                          show: true,
                          precision: 1,
                          position: "right",
                          formatter: (params: any) =>
                            `${params.value}%`,
                        },
                      },
                      {
                        name: "Target",
                        type: "line",
                        color: "#CD4243",
                        data: (
                          getPercentageTotalImmunizationQuery?.data ||
                          []
                        )?.map((r: any) => r?.threshold) || [],
                      }
                      ]
                        , (
                          getPercentageTotalImmunizationQuery?.data ||
                          []
                        )
                          ?.map((r: any) => {
                            if (r.faskes_desc === "All")
                              return "NASIONAL"
                            return r.faskes_desc
                          })
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
                      title={<div className="font-bold md:text-2xl">Data {trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} Jumlah Penerima, Cakupan, dan Target Cakupan <b className="text-primary-2">{vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin2)?.label}</b> pada Baduta Selama Tahun <b className="text-primary-2">{filter.tahun}</b></div>}
                      subTitle={`Grafik menampilkan tren cakupan ${trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} penerima ${vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin2)?.label} pada baduta selama tahun ${filter.tahun}`}
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter2 filterState={filterState}
                        data={getSetScopePercentagePerMonthQuery?.data || []} />}
                      threshold={
                        <div className="relative flex justify-center items-center">
                          {isLoadingSetSummaryScopePercentageQuery && <Spin />}
                          <div className="p-2 sm:w-32 md:w-64 h-fit">
                            <div className="text-sm">Total cakupan {trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} pada tahun {filter.tahun}</div>
                            <div className="py-2 font-bold text-3xl text-primary">{formatNumber(getSetSummaryScopePercentageQuery?.data?.percentage || 0)}%</div>
                            <div>Jumlah {vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin2)?.label}: {formatNumber(getSetSummaryScopePercentageQuery?.data?.total || 0)}</div>
                          </div>
                        </div>
                      }
                      isLoading={isLoadingSetScopePercentagePerMonthQuery}
                      graphOptions={graphOptions2([
                        {
                          name: "% Target Cakupan",
                          data: (getSetScopePercentagePerMonthQuery?.data || [])?.map((r: any) => (((r?.threshold || 0) / 100) * (r?.total || 0))) || [],
                          type: 'line',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(((params.value || 0) / (getSetScopePercentagePerMonthQuery?.data || [])[params.dataIndex]?.total) * 100)}%`
                          }
                        },
                        {
                          name: "Jumlah Penerima Imunisasi",
                          data:
                            (
                              getSetScopePercentagePerMonthQuery?.data || []
                            )?.map((r: any) => (r?.total || 0)) || [],
                          type: "bar",
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(params.value || 0)}`
                          }
                        },
                        {
                          name: "% Cakupan",
                          data: (getSetScopePercentagePerMonthQuery?.data || [])?.map((r: any) => (((r?.percentage || 0) / 100) * (r?.total || 0))) || [],
                          type: 'line',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(((params.value || 0) / (getSetScopePercentagePerMonthQuery?.data || [])[params.dataIndex]?.total) * 100)}%`
                          }
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
                      title={<div className="font-bold md:text-2xl"><b className="text-primary-2">Grafik Cakupan Imunisasi pada Baduta Berdasarkan Jenis Imunisasi</b></div>}
                      subTitle="Grafik menampilkan tren cakupan imunisasi berdasarkan jenis imunisasi pada baduta."
                      addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend2} />} variant="private"
                      filterState={filterState}
                      filterComp={<Filter3 filterState={filterState}
                        data={aliasSummaryImmunizationPerVaccineQuery || []} />}
                      // threshold={
                      //   <div className="sm:w-32 md:w-64 text-sm">
                      //     <div className="relative flex justify-center items-center">
                      //       {isLoadingExceedTargetPerVaccineQuery && <Spin />}
                      //       <div className='relative px-4 py-3 rounded-xl' style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
                      //         <div className="font-bold">Imunisasi yang Melampaui Target Cakupan</div>
                      //         <div>
                      //           <ul>
                      //             {getExceedTargetPerVaccineQuery?.data?.map((r: any, i: number) => <li key={i + 'exceed'}>{i + 1}. {r.vaccine}</li>)}
                      //           </ul>
                      //         </div>
                      //       </div>
                      //     </div>
                      //     <div className="relative flex justify-center items-center">
                      //       {isLoadingInExceedTargetPerVaccineQuery && <Spin />}
                      //       <div className='px-4 py-3 rounded-xl' style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
                      //         <div className="font-bold">Imunisasi yang Belum Melampaui Target Cakupan</div>
                      //         <div>
                      //           <ul>
                      //             {getInExceedTargetPerVaccineQuery?.data?.map((r: any, i: number) => <li key={i + 'inexceed'}>{i + 1}. {r.vaccine}</li>)}
                      //           </ul>
                      //         </div>
                      //       </div>
                      //     </div>
                      //   </div>
                      // }
                      graphOptions={graphOptions3([
                        {
                          name: "% Cakupan",
                          data: aliasSummaryImmunizationPerVaccineQuery?.filter((f) => f.label.includes("pct_")) || [],
                          // data: (getSummaryImmunizationPerVaccineQuery?.data || [])?.map((r: any) => (((r?.pct || 0) / 100) * (r?.total || 0))) || [],
                          type: 'line',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(((params.value || 0) / (getSummaryImmunizationPerVaccineQuery?.data || [])[params.dataIndex]?.total) * 100)}%`
                          }
                        },
                        {
                          name: "% Target Cakupan",
                          data: aliasSummaryImmunizationPerVaccineQuery?.filter((f) => f.label.includes("threshold_")) || [],
                          // data: (getSummaryImmunizationPerVaccineQuery?.data || [])?.map((r: any) => (((r?.pct_treshold || 0) / 100) * (r?.total || 0))) || [],
                          type: 'line',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(((params.value || 0) / (getSummaryImmunizationPerVaccineQuery?.data || [])[params.dataIndex]?.total) * 100)}%`
                          }
                        },
                        {
                          name: "Cakupan",
                          data: aliasSummaryImmunizationPerVaccineQuery?.filter((f) => f.label.includes("ytd_total_")) || [],
                          // data: (getSummaryImmunizationPerVaccineQuery?.data || [])?.map((r: any) => r?.total) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                            formatter: (params: any) => `${formatNumber(params.value || 0)}`
                          }
                        },
                      ], aliasSummaryImmunizationPerVaccineQuery?.filter((f) => f.label.includes("ytd_total_"))?.map((r: any) => r?.label)
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
                      title={<div className="font-bold md:text-2xl"><b className="text-primary-2">Grafik Cakupan Imunisasi pada Baduta Berdasarkan Usia Pemberian Imunisasi</b></div>}
                      subTitle="Grafik menampilkan tren cakupan imunisasi pada baduta berdasarkan usia pemberian imunisasi."
                      addOn={
                        <div className={`gap-4 grid grid-cols-2 text-sm ${openSans.className}`}>
                          {dataGraphRegionalRoutineImmunizationCoverageTrend3.map((r, i) => (
                            <div className='px-4 py-3 rounded-xl' style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
                              <div className="font-bold">
                                {r.title}
                              </div>
                              <div>
                                <ul>
                                  {r?.value}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      } variant="private"
                      filterState={filterState}
                      filterComp={<Filter4 filterState={filterState}
                        data={aliasSummaryImmunizationByAgeQuery || []} />}
                      isLoading={isLoadingSummaryImmunizationByAgeQuery}
                      graphOptions={graphOptions4([
                        {
                          name: "Usia Ideal",
                          data: aliasSummaryImmunizationByAgeQuery?.filter((f) => f.label.includes("ytd_ideal_")) || [],

                          // data: (getSummaryImmunizationByAgeQuery?.data || [])?.map((r: any) => r?.total_ideal) || [],
                          type: 'bar',
                        },
                        {
                          name: "Usia Non Ideal",
                          data: aliasSummaryImmunizationByAgeQuery?.filter((f) => f.label.includes("ytd_non_ideal_")) || [],

                          // data: (getSummaryImmunizationByAgeQuery?.data || [])?.map((r: any) => r?.total_non_ideal) || [],
                          type: 'bar',
                        },
                      ], aliasSummaryImmunizationByAgeQuery?.filter((f) => f.label.includes("ytd_non_ideal_"))?.map((r: any) => r?.label)
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
                      title={<div className="font-bold md:text-2xl"><b className="text-primary-2">Grafik Distribusi Imunisasi pada Baduta Berdasarkan Jenis Kelamin</b></div>}
                      subTitle="Grafik menampilkan cakupan imunisasi pada baduta berdasarkan jenis kelamin."
                      addOn={
                        <div className="flex gap-4 text-sm">
                          <div className="relative flex flex-1 justify-center items-center">
                            {isLoadingAverageImmunizationByGenderQuery && <Spin />}
                            <div className='px-4 py-3 rounded-xl w-full h-full' style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
                              <div className="font-bold text-lg">
                                Rata-Rata Penerima Imunisasi Berdasarkan Jenis Kelamin
                              </div>
                              <GraphEcharts graphOptions={ageChartOptions} />
                            </div>
                          </div>
                          {dataGraphRegionalRoutineImmunizationCoverageTrend4.map((r, i) => (
                            <div key={`gender-score-${i}`} className="relative flex flex-1 justify-center items-center">
                              {r?.isLoading && <Spin />}
                              <div className='flex-1 px-4 py-3 rounded-xl w-full h-full' style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
                                <div className="font-bold text-lg">
                                  {r.title}
                                </div>
                                <div>
                                  <ul>
                                    {r?.value}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      } variant="private"
                      filterState={filterState}
                      filterComp={<Filter5 filterState={filterState}
                        data={aliasSummaryImmunizationPerGenderQuery || []} />}
                      isLoading={isLoadingSummaryImmunizationPerGenderQuery}
                      graphOptions={graphOptions5([
                        {
                          name: "Laki-laki",
                          data: aliasSummaryImmunizationPerGenderQuery?.filter((f) => f.label.includes("ytd_male_")) || [],

                          // data: (getSummaryImmunizationPerGenderQuery?.data || [])?.map((r: any) => r?.total_male) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                            // formatter: (params: any) => `${formatNumber(((getSummaryImmunizationPerGenderQuery?.data || [])[params.dataIndex]?.pct_male))}%`
                          }
                        },
                        {
                          name: "Perempuan",
                          data: aliasSummaryImmunizationPerGenderQuery?.filter((f) => f.label.includes("ytd_female_")) || [],

                          // data: (getSummaryImmunizationPerGenderQuery?.data || [])?.map((r: any) => r?.total_female) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                            // formatter: (params: any) => `${formatNumber((getSummaryImmunizationPerGenderQuery?.data || [])[params.dataIndex]?.pct_female)}%`
                          }
                        },
                      ], aliasSummaryImmunizationPerGenderQuery?.filter((f) => f.label.includes("ytd_female_"))?.map((r: any) => r?.label)
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
