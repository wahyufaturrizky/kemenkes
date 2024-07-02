"use client";

import { useState } from "react";
import Image from "next/image"
import styles from "@/assets/css/styles.module.css"
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png"
import { Banner, BannerHighlightFooter, BannerText, GraphEcharts, Navbar, Sidebar, Spin, Tabs } from "@/components"
import { ChildSummaryImmunization, FilterSummaryImmunizationKejar as FilterSummaryImmunization, GraphAddOn, GraphRoutineImmunizationCoverageTrend, RoutineImmunizationCoverageTrendGraph, SummaryImmunization, TotalSummaryImmunization } from "@/view/home";
import { Filter1, Filter2, Filter3, Filter4, Filter5 } from "@/view/dashboard/baby-chase-immunization-baduta/Filter";
import { graphOptions1, graphOptions2, graphOptions3, graphOptions4, graphOptions5 } from "@/view/dashboard/baby-chase-immunization-baduta/graphOptions";
import { useGetAverageImmunizationByGenderQuery, useGetDistributionGraphTimeQuery, useGetImmunizationWithHighetFemaleRecivientQuery, useGetImmunizationWithHighetMaleRecivientQuery, useGetMaxImmunizationByAgeQuery, useGetGraphTotalQuery, useGetLowestScopeKejarQuery, useGetSummaryImmunizationByAgeQuery, useGetSummaryImmunizationPerGenderQuery, useGetHighestImmunizationByAgeQuery, useGetHighestScopeKejarImmunizationQuery, useGetImmunizationGraphKejarStatusQuery, useGetTotalImmunizationScopeQuery, useGetLowestScopeKejarImmunizationQuery, useGetHighestScopeKejarQuery, useGetImmunizationScopeKejarQuery, useGetGraphScopeKejarImmunizationQuery } from "@/lib/services/babyxbaduta-immunization";
import { dataMonth, dataTabBaduta, vaccineTypeKejarOptions, vaccineTypeOptions } from "@/utils/constants";
import { ageResponseConvert, formatNumber } from "@/helpers";
import { openSans } from "@/assets/fonts";

const BabyChaseImmunizationBaduta = () => {
  const filterState = useState({
    // tahun: new Date().getFullYear(),
    tahun: 2023,
    bulan: dataMonth.find((r, i) => i === new Date().getMonth())?.value,
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
  };
  const filterQueryGraph = {
    ...dateQuery,
    region_type: filter.wilayah,
    region_id: regionIdQuery,
    kewilayahan_type: filter.kewilayahan_type,
  };
  const optionQuery = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };
  const optionQueryMustFaskes = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)) || !filter.faskes,
  };
  const optionQueryGraph = {
    refetchOnMountOrArgChange: true,
    skip: (!filter.tahun || !filter.bulan || !filter.wilayah || (!filter.tipe_vaksin1 || !filter.tipe_vaksin2 || !filter.tipe_vaksin3)
      && (!filter.provinsi || !filter.kabkota || !filter.kecamatan)) || !filter.faskes
  }
  const optionQueryTotal = {
    refetchOnMountOrArgChange: true,
    skip: !filter.wilayah || (!filter.tipe_vaksin1 || !filter.tipe_vaksin2 || !filter.tipe_vaksin3)
  }

  const optionQueryTotalMustFaskes = {
    refetchOnMountOrArgChange: true,
    skip: !filter.wilayah || (!filter.tipe_vaksin1 || !filter.tipe_vaksin2 || !filter.tipe_vaksin3) || !filter.faskes
  }

  const { data: getImmunizationScopeKejarQuery,
    isLoading: isLoadingImmunizationScopeKejarQuery,
  } = useGetImmunizationScopeKejarQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin1 }, optionQueryTotalMustFaskes)
  const { data: getHighestScopeKejarQuery,
    isLoading: isLoadingHighestScopeKejarQuery,
  } = useGetHighestScopeKejarQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin1 }, optionQueryTotal)
  const { data: getLowestScopeKejarQuery,
    isLoading: isLoadingLowestScopeKejarQuery,
  } = useGetLowestScopeKejarQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin1 }, optionQueryTotal)
  const { data: getGraphTotalQuery,
    isLoading: isLoadingGraphTotalQuery,
  } = useGetGraphTotalQuery({ ...filterQueryGraphPercentage, vaccine_type: filter.tipe_vaksin1 }, optionQuery)
  const { data: getGraphScopeKejarImmunizationQuery,
    isLoading: isLoadingGraphScopeKejarImmunizationQuery,
  } = useGetGraphScopeKejarImmunizationQuery({ ...filterQueryGraphPercentage, vaccine_type: filter.tipe_vaksin1 }, optionQueryMustFaskes)
  const aliasGraphScopeKejarImmunizationQuery = Object.entries(getGraphScopeKejarImmunizationQuery?.data || []).map(([key, value]) => ({ label: key, value: value }));

  const { data: getImmunizationGraphKejarStatusQuery,
    isLoading: isLoadingImmunizationGraphKejarStatusQuery,
  } = useGetImmunizationGraphKejarStatusQuery(filterQueryGraph, optionQueryMustFaskes)
  const aliasImmunizationGraphKejarStatusQuery = Object.entries(getImmunizationGraphKejarStatusQuery?.data || []).map(([key, value]) => ({ label: key, value: value }));
  // const { data: getSetScopePercentagePerMonthQuery,
  //   isLoading: isLoadingSetScopePercentagePerMonthQuery,
  // } = useGetScopePercentagePerMonthQuery({ ...filterQueryGraph, vaccine_type: filter.tipe_vaksin2, is_kumulatif: filter.jenis_tren === "kumulatif" ? true : false }, optionQuery)

  const { data: getHighestScopeKejarImmunizationQuery,
    isLoading: isLoadingHighestScopeKejarImmunizationQuery,
  } = useGetHighestScopeKejarImmunizationQuery(filterQueryGraph, optionQueryMustFaskes)
  const { data: getLowestScopeKejarImmunizationQuery,
    isLoading: isLoadingLowestScopeKejarImmunizationQuery,
  } = useGetLowestScopeKejarImmunizationQuery(filterQueryGraph, optionQueryMustFaskes)

  const { data: getSummaryImmunizationByAgeQuery,
    isLoading: isLoadingSummaryImmunizationByAgeQuery,
  } = useGetSummaryImmunizationByAgeQuery(filterQueryGraph, optionQueryMustFaskes)
  const aliasSummaryImmunizationByAgeQuery = Object.entries(getSummaryImmunizationByAgeQuery?.data || []).map(([key, value]) => ({ label: key, value: value }));

  const { data: getAverageImmunizationByGenderQuery,
    isLoading: isLoadingAverageImmunizationByGenderQuery,
  } = useGetAverageImmunizationByGenderQuery(filterQueryGraph, optionQueryMustFaskes)
  const { data: getImmunizationWithHighetMaleRecivientQuery,
    isLoading: isLoadingImmunizationWithHighetMaleRecivientQuery,
  } = useGetImmunizationWithHighetMaleRecivientQuery(filterQueryGraph, optionQueryMustFaskes)
  const { data: getImmunizationWithHighetFemaleRecivientQuery,
    isLoading: isLoadingImmunizationWithHighetFemaleRecivientQuery,
  } = useGetImmunizationWithHighetFemaleRecivientQuery(filterQueryGraph, optionQueryMustFaskes)
  const { data: getSummaryImmunizationPerGenderQuery,
    isLoading: isLoadingSummaryImmunizationPerGenderQuery,
  } = useGetSummaryImmunizationPerGenderQuery(filterQueryGraph, optionQueryMustFaskes)
  const aliasSummaryImmunizationPerGenderQuery = Object.entries(getSummaryImmunizationPerGenderQuery?.data || []).map(([key, value]) => ({ label: key, value: value }));

  const { data: getDistributionGraphTimeQuery,
    isLoading: isLoadingGetDistributionGraphTimeQuery,
  } = useGetDistributionGraphTimeQuery({ ...filterQueryGraph }, optionQueryMustFaskes)
  const aliasDistributionGraphTimeQuery = Object.entries(getDistributionGraphTimeQuery?.data || []).map(([key, value]) => ({ label: key, value: value }));

  const { data: getGetTotalImmunizationScopeQuery,
    isLoading: isLoadingGetTotalImmunizationScopeQuery,
  } = useGetTotalImmunizationScopeQuery({ ...filterQueryGraph }, optionQueryMustFaskes)

  const dataGraphRegionalRoutineImmunizationCoverageTrend1 = [
    {
      title: `Cakupan Imunisasi Kejar ${getImmunizationScopeKejarQuery?.data?.year || filter.tahun}`,
      value: (<div>{formatNumber(getImmunizationScopeKejarQuery?.data?.total || 0)}</div>),
      regional: <></>,
      isLoading: isLoadingImmunizationScopeKejarQuery
    },
    {
      title: `Cakupan Kejar Tertinggi Tahun ${getHighestScopeKejarQuery?.data?.year || filter.tahun}`,
      value: (<div className="font-bold">{formatNumber(getHighestScopeKejarQuery?.data?.total || 0)}</div>),
      regional: <div>{getHighestScopeKejarQuery?.data?.wilayah_desc !== "All" ? getHighestScopeKejarQuery?.data?.wilayah_desc : ''}</div>,
      isLoading: isLoadingHighestScopeKejarQuery
    },
    {
      title: `Cakupan Kejar Terendah Tahun ${getLowestScopeKejarQuery?.data?.year || filter.tahun}`,
      value: (<div className="font-bold">{formatNumber(getLowestScopeKejarQuery?.data?.total || 0)}</div>),
      regional: <div>{getLowestScopeKejarQuery?.data?.wilayah_desc !== "All" ? getLowestScopeKejarQuery?.data?.provinsi : ''}</div>,
      isLoading: isLoadingLowestScopeKejarQuery
    },
  ]
  const dataGraphRegionalRoutineImmunizationCoverageTrend2 = [
    {
      title: `Cakupan Imunisasi Kejar Tertinggi`,
      value: (<div>{getHighestScopeKejarImmunizationQuery?.data?.vaksin || ""}</div>),
      regional: (<div>Jumlah Kejar: {formatNumber(getHighestScopeKejarImmunizationQuery?.data?.total || 0)}</div>),
      isLoading: isLoadingHighestScopeKejarImmunizationQuery
    },
    {
      title: `Cakupan Imunisasi Kejar Terendah`,
      value: (<div>{getLowestScopeKejarImmunizationQuery?.data?.vaksin || ""}</div>),
      regional: (<div>Jumlah kejar: {formatNumber(getLowestScopeKejarImmunizationQuery?.data?.total || 0)}</div>),
      isLoading: isLoadingLowestScopeKejarImmunizationQuery
    },
  ]
  const dataGraphRegionalRoutineImmunizationCoverageTrend3 = [
    {
      title: <div className="font-bold">Total Cakupan Imunisasi Tahun {filter.tahun}</div>,
      value: getGetTotalImmunizationScopeQuery?.data?.total || 0,
      isLoading: isLoadingGetTotalImmunizationScopeQuery
    },
  ]
  const dataGraphRegionalRoutineImmunizationCoverageTrend4 = [
    {
      title: `3 Imunisasi dengan Penerima Usia Perempuan Terbanyak`,
      value: (getImmunizationWithHighetMaleRecivientQuery?.data?.map((r: any, i: number) => <li key={i + 'max' + r.vaksin}>{i + 1}. {r.vaksin}</li>)),
      isLoading: isLoadingImmunizationWithHighetMaleRecivientQuery
    },
    {
      title: `3 Imunisasi dengan Penerima Usia Susulan Terbanyak`,
      value: (getImmunizationWithHighetFemaleRecivientQuery?.data?.map((r: any, i: number) => <li key={i + 'min' + r.vaksin}>{i + 1}. {r.vaksin}</li>)),
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
          { value: getAverageImmunizationByGenderQuery?.data?.pct_male, name: 'Laki-laki' },
          { value: getAverageImmunizationByGenderQuery?.data?.pct_female, name: 'Perempuan' },
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
                Imunisasi Kejar Bayi dan Baduta
              </div>
              <div className={`${openSans.className}`}>
                Menampilkan data cakupan imunisasi kejar pada bayi dan baduta berdasarkan jenis imunisasi, cakupan daerah, usia, waktu, dan jenis kelamin.
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunization filterState={filterState} />
            </div>
            <div className="py-6"></div>
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Daerah Imunisasi Kejar"
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={<div className="font-bold md:text-2xl">Data Cakupan Kejar <b className="text-primary-2">{vaccineTypeKejarOptions.find((r) => r.value === filter.tipe_vaksin1)?.label}</b> pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">{filter.tahun}</b></div>}
                      subTitle=""
                      addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend1} />} variant="private"
                      filterState={filterState}
                      filterComp={<Filter1 filterState={filterState}
                        data={getGraphTotalQuery?.data || []} />}
                      isLoading={isLoadingGraphTotalQuery}
                      opts={{
                        height: getGraphTotalQuery?.data?.length > 1500 ? 65000 :
                          getGraphTotalQuery?.data?.length > 700 ? 35000 :
                            getGraphTotalQuery?.data?.length > 200 ? 15000 :
                              900
                      }}
                      graphOptions={graphOptions1([{
                        // @ts-ignore
                        name: "Total",
                        data:
                          (
                            getGraphTotalQuery?.data ||
                            []
                          )?.map((r: any) => r?.total) || [],
                        type: "bar",
                        label: {
                          show: true,
                          precision: 1,
                          position: "right",
                          formatter: (params: any) =>
                            `${params.value}`,
                        },
                      },
                        // {
                        //   name: "Target",
                        //   type: "line",
                        //   color: "#CD4243",
                        //   data: (
                        //     getGraphTotalQuery?.data ||
                        //     []
                        //   )?.map((r: any) => r?.pct_target_threshold) || [],
                        // }
                      ]
                        , (
                          getGraphTotalQuery?.data ||
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
                title=""
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={<div className="font-bold md:text-2xl"><b className="text-primary-2">Grafik Cakupan Imunisasi Kejar pada Bayi dan Baduta Berdasarkan Jenis Imunisasi</b></div>}
                      subTitle="Grafik menampilkan tren cakupan imunisasi kejar berdasarkan jenis imunisasi pada bayi dan baduta."
                      variant="private"
                      addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend2} />}
                      filterState={filterState}
                      filterComp={<Filter2 filterState={filterState}
                        data={aliasGraphScopeKejarImmunizationQuery || []} />}
                      isLoading={isLoadingGraphScopeKejarImmunizationQuery}
                      graphOptions={graphOptions3([
                        {
                          name: "Target",
                          data: aliasGraphScopeKejarImmunizationQuery || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                      ], getGraphScopeKejarImmunizationQuery?.data ?
                        Object.keys(getGraphScopeKejarImmunizationQuery?.data) : [],
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
                      title={<div className="font-bold md:text-2xl"><b className="text-primary-2">Grafik Perbandingan Imunisasi Kejar Terhadap Imunisasi Ideal </b></div>}
                      subTitle="Grafik menampilkan tren perbandingan imunisasi kejar terhadap imunisasi ideal"
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter3 filterState={filterState}
                        data={aliasImmunizationGraphKejarStatusQuery || []} />}
                      isLoading={isLoadingImmunizationGraphKejarStatusQuery}
                      graphOptions={graphOptions3([
                        {
                          name: "Kejar",
                          data: aliasImmunizationGraphKejarStatusQuery?.filter((f) => !f?.label?.includes("non")) || [],
                          type: 'bar',
                          stack: 'a',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                        {
                          name: "Non Kejar",
                          data: aliasImmunizationGraphKejarStatusQuery?.filter((f) => f?.label?.includes("non")) || [],
                          type: 'bar',
                          stack: 'a',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                      ], getImmunizationGraphKejarStatusQuery?.data ?
                        aliasImmunizationGraphKejarStatusQuery?.filter((f) => !f?.label?.includes("non"))
                          ?.map((r) => {
                            return r?.label?.split("_")[2];
                          })
                        : [],
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
                      title={<div className="font-bold md:text-2xl"><b className="text-primary-2">Grafik Persebaran Imunisasi pada Bayi dan Baduta Berdasarkan Usia</b></div>}
                      subTitle="Grafik menampilkan tren persebaran imunisasi pada bayi dan baduta berdasarkan persebaran usia."
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter4 filterState={filterState}
                        data={aliasSummaryImmunizationByAgeQuery || []} />}
                      isLoading={isLoadingSummaryImmunizationByAgeQuery}
                      graphOptions={graphOptions4([
                        {
                          name: "Usia 4-5 Tahun",
                          data: aliasSummaryImmunizationByAgeQuery?.filter((f) => f?.label?.includes("4_5")) || [],
                          type: 'bar',
                          stack: 'a',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                        {
                          name: "Usia 3-4 Tahun",
                          data: aliasSummaryImmunizationByAgeQuery?.filter((f) => f?.label?.includes("3_4")) || [],
                          type: 'bar',
                          stack: 'a',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                        {
                          name: "Usia 2-3 Tahun",
                          data: aliasSummaryImmunizationByAgeQuery?.filter((f) => f?.label?.includes("2_3")) || [],
                          type: 'bar',
                          stack: 'a',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                        {
                          name: "Usia 1-2 Tahun",
                          data: aliasSummaryImmunizationByAgeQuery?.filter((f) => f?.label?.includes("1_2")) || [],
                          type: 'bar',
                          stack: 'a',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                      ], getSummaryImmunizationByAgeQuery?.data ?
                        aliasSummaryImmunizationByAgeQuery?.filter((f) => !f?.label?.includes("1_2"))
                          ?.map((r) => {
                            return r?.label?.split("_")[3];
                          })
                        : [],
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
                      title={<div className="font-bold md:text-2xl"><b className="text-primary-2">Grafik Distribusi Imunisasi pada Bayi dan Baduta Berdasarkan Jenis Kelamin</b></div>}
                      subTitle="Grafik menampilkan cakupan imunisasi pada bayi dan baduta berdasarkan jenis kelamin."
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
                          data: aliasSummaryImmunizationPerGenderQuery?.filter((f) => f?.label?.includes("male")) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                        {
                          name: "Perempuan",
                          data: aliasSummaryImmunizationPerGenderQuery?.filter((f) => f?.label?.includes("female")) || [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                      ], getSummaryImmunizationPerGenderQuery?.data ?
                        aliasSummaryImmunizationPerGenderQuery?.filter((f) => f?.label?.includes("female"))
                          ?.map((r) => {
                            return r?.label?.split("_")[2];
                          })
                        : [],
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
                      title={<div className="font-bold md:text-2xl"><b className="text-primary-2">Grafik Distribusi Imunisasi pada Bayi dan Baduta Berdasarkan Waktu</b></div>}
                      subTitle="Grafik menampilkan distribusi imunisasi pada bayi dan baduta berdasarkan waktu."
                      variant="private"
                      addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend3} />}
                      filterState={filterState}
                      filterComp={<Filter2 filterState={filterState}
                        data={getDistributionGraphTimeQuery?.data || []} />}
                      isLoading={isLoadingGetDistributionGraphTimeQuery}
                      graphOptions={graphOptions2([
                        {
                          name: "Target",
                          data: getDistributionGraphTimeQuery?.data ?
                            getDistributionGraphTimeQuery?.data
                              ?.map((r: any) => r?.total || 0)
                            : [],
                          type: 'bar',
                          label: {
                            show: true,
                            precision: 1,
                          }
                        },
                      ])}
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

export default BabyChaseImmunizationBaduta;
