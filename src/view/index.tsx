"use client";

import { useState } from "react";
import Image from "next/image"
import styles from "@/assets/css/styles.module.css"
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png"
import { Banner, BannerHighlightFooter, BannerText, GraphEcharts, Navbar, Sidebar, Spin, Tabs } from "@/components"
import { ChildSummaryImmunization, FilterSummaryImmunization, GraphAddOn, GraphRoutineImmunizationCoverageTrend, RoutineImmunizationCoverageTrendGraph, SummaryImmunization, TotalSummaryImmunization } from "@/view/home";
import { Filter1, Filter2, Filter3, Filter4, Filter5 } from "@/view/dashboard/routine-baduta-immunization/Filter";
import { graphOptions1, graphOptions2, graphOptions3, graphOptions4, graphOptions5 } from "@/view/dashboard/routine-baduta-immunization/graphOptions";
import { useGetAverageImmunizationByGenderQuery, useGetDoPercentageCampakRubelaQuery, useGetDoPercentageDPHTHBHIBQuery, useGetHighestImmunizationByAgeQuery, useGetImmunizationWithHighetFemaleRecivientQuery, useGetImmunizationWithHighetMaleRecivientQuery, useGetMaxImmunizationByAgeQuery, useGetPercentageTotalImmunizationQuery, useGetScopePercentagePerMonthQuery, useGetSummaryImmunizationByAgeQuery, useGetSummaryImmunizationPerGenderQuery, useGetSummaryImmunizationPerVaccineQuery, useGetSummaryScopePercentageQuery, useGetTotalHighestScopeByVaccineTypeQuery, useGetTotalHighestScopeQuery, useGetTotalImmunizationByVaccineTypeQuery, useGetTotalImmunizationQuery, useGetTotalLowestScopeByVaccineTypeQuery, useGetTotalLowestScopeQuery, useGetTotalScopeByVaccineTypeQuery, useGetTotalScopeQuery } from "@/lib/services/baduta-immunization";
import { dataMonth, dataTabBaduta, trendTypeOptions, vaccineTypeOptions } from "@/utils/constants";
import { formatNumber } from "@/helpers";
import { openSans } from "@/assets/fonts";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { sidebarNavigation } from "@/utils/navigation";

const HomeView = () => {
  const { push } = useRouter();

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
    wilayah1: "province",
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
    kewilayahan_type: filter.kewilayahan_type
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
    kewilayahan_type: filter.kewilayahan_type
  };
  const filterQueryGraph = {
    ...dateQuery,
    region_type: filter.wilayah,
    region_id: regionIdQuery,
    kewilayahan_type: filter.kewilayahan_type
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
  } = useGetTotalImmunizationQuery(filterQuery, optionQuery)
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
  const { data: getSummaryImmunizationPerVaccineQuery } = useGetSummaryImmunizationPerVaccineQuery(filterQueryGraph, optionQuery)
  // const { data: getMaxImmunizationByAgeQuery1 } = useGetMaxImmunizationByAgeQuery({ ...filterQueryGraph, age_type: 1 }, optionQuery)
  const { data: getMaxImmunizationByAgeQuery2,
    isLoading: isLoadingMaxImmunizationByAgeQuery2,
  } = useGetMaxImmunizationByAgeQuery({ ...filterQueryGraph, age_type: 2 }, optionQuery)
  const { data: getMaxImmunizationByAgeQuery3,
    isLoading: isLoadingMaxImmunizationByAgeQuery3,
  } = useGetMaxImmunizationByAgeQuery({ ...filterQueryGraph, age_type: 3 }, optionQuery)
  // const { data: getHighestImmunizationByAgeQuery } = useGetHighestImmunizationByAgeQuery({ ...filterQueryGraph, age_type: filter.tipe_umur }, optionQuery)
  const { data: getSummaryImmunizationByAgeQuery,
    isLoading: isLoadingSummaryImmunizationByAgeQuery,
  } = useGetSummaryImmunizationByAgeQuery(filterQueryGraph, optionQuery)
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

  const dataGraphRegionalRoutineImmunizationCoverageTrend1 = [
    {
      title: `Total Cakupan Imunisasi Rutin Lengkap Nasional Tahun ${getTotalScopeQuery?.data?.year || filter.tahun}`,
      value: (<div>{formatNumber(getTotalScopeQuery?.data?.pct || 0)}%</div>),
      regional: <></>,
      isLoading: isLoadingTotalScopeQuery
    },
    {
      title: `Cakupan Tertinggi Tahun ${getTotalHighestScopeQuery?.data?.year || filter.tahun}`,
      value: (<div className="font-bold">{formatNumber(getTotalHighestScopeQuery?.data?.pct || 0)}%</div>),
      regional: <div>{getTotalHighestScopeQuery?.data?.provinsi !== "All" ? getTotalHighestScopeQuery?.data?.provinsi : ''}</div>,
      isLoading: isLoadingTotalHighestScopeQuery
    },
    {
      title: `Cakupan Terendah Tahun ${getTotalHighestScopeQuery?.data?.year || filter.tahun}`,
      value: (<div className="font-bold">{formatNumber(getTotalLowestScopeQuery?.data?.pct || 0)}%</div>),
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
      value: (<div>{getTotalHighestScopeByVaccineTypeQuery?.data?.vaccine || ""}</div>),
      regional: (<div>Jumlah Cakupan: {formatNumber(getTotalHighestScopeByVaccineTypeQuery?.data?.total || 0)}</div>),
      threshold: (<div>% Cakupan: {formatNumber(getTotalHighestScopeByVaccineTypeQuery?.data?.pct || 0)}%</div>),
      isLoading: isLoadingTotalHighestScopeByVaccineTypeQuery
    },
    {
      title: `Cakupan Imunisasi Terendah`,
      value: (<div>{getTotalLowestScopeByVaccineTypeQuery?.data?.vaccine === "ALL" ? "Baduta Lengkap" : getTotalLowestScopeByVaccineTypeQuery?.data?.vaccine}</div>),
      regional: (<div>Jumlah Cakupan: {formatNumber(getTotalLowestScopeByVaccineTypeQuery?.data?.total || 0)}</div>),
      threshold: (<div>% Cakupan: {formatNumber(getTotalLowestScopeByVaccineTypeQuery?.data?.pct || 0)}%</div>),
      isLoading: isLoadingTotalLowestScopeByVaccineTypeQuery
    },
  ]
  const dataGraphRegionalRoutineImmunizationCoverageTrend3 = [
    {
      title: <div className="font-bold text-xl">3 Imunisasi dengan Penerima <b style={{ color: "#83E0DB" }}>Usia Ideal</b> Terbanyak</div>,
      value: (getMaxImmunizationByAgeQuery2?.data?.map((r: any, i: number) => <li key={i + 'max'}>{i + 1}. {r.vaccine}</li>)),
      isLoading: isLoadingMaxImmunizationByAgeQuery2
    },
    {
      title: <div className="font-bold text-xl">3 Imunisasi dengan Penerima <b style={{ color: "#00B1A9" }}>Usia Non Ideal</b> Terbanyak</div>,
      value: (getMaxImmunizationByAgeQuery3?.data?.map((r: any, i: number) => <li key={i + 'max'}>{i + 1}. {r.vaccine}</li>)),
      isLoading: isLoadingMaxImmunizationByAgeQuery3
    },
  ]
  const dataGraphRegionalRoutineImmunizationCoverageTrend4 = [
    {
      title: `3 Imunisasi dengan Penerima Usia Perempuan Terbanyak`,
      value: (getImmunizationWithHighetMaleRecivientQuery?.data?.map((r: any, i: number) => <li key={i + 'max'}>{i + 1}. {r.vaccine}</li>)),
      isLoading: isLoadingImmunizationWithHighetMaleRecivientQuery
    },
    {
      title: `3 Imunisasi dengan Penerima Usia Susulan Terbanyak`,
      value: (getImmunizationWithHighetFemaleRecivientQuery?.data?.map((r: any, i: number) => <li key={i + 'max'}>{i + 1}. {r.vaccine}</li>)),
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
          { value: getAverageImmunizationByGenderQuery?.data?.total_male, name: 'Laki-laki' },
          { value: getAverageImmunizationByGenderQuery?.data?.total_female, name: 'Perempuan' },
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

  const dataTotalSummaryImmunization: any = [
    {
      className: `${openSans.className}`,
      title: vaccineTypeOptions[0].label,
      value: formatNumber(getTotalImmunizationByVaccineTypeQuery1?.data?.total || 0),
      percent: getTotalImmunizationByVaccineTypeQuery1?.data?.pct || 0,
      target: formatNumber(getTotalImmunizationByVaccineTypeQuery1?.data?.target || 0),
      subtitle: " dari ",
    },
    {
      className: `${openSans.className}`,
      title: vaccineTypeOptions[1].label,
      value: formatNumber(getTotalImmunizationByVaccineTypeQuery2?.data?.total || 0),
      percent: getTotalImmunizationByVaccineTypeQuery2?.data?.pct || 0,
      target: formatNumber(getTotalImmunizationByVaccineTypeQuery2?.data?.target || 0),
      subtitle: " dari ",
    },
    {
      className: `${openSans.className}`,
      title: vaccineTypeOptions[2].label,
      value: formatNumber(getTotalImmunizationByVaccineTypeQuery3?.data?.total || 0),
      percent: getTotalImmunizationByVaccineTypeQuery3?.data?.pct || 0,
      target: formatNumber(getTotalImmunizationByVaccineTypeQuery3?.data?.target || 0),
      subtitle: " dari ",
    },
    {
      className: `${openSans.className}`,
      title: vaccineTypeOptions[3].label,
      value: formatNumber(getTotalImmunizationByVaccineTypeQuery4?.data?.total || 0),
      percent: getTotalImmunizationByVaccineTypeQuery4?.data?.pct || 0,
      target: formatNumber(getTotalImmunizationByVaccineTypeQuery4?.data?.target || 0),
      subtitle: " dari ",
    }
  ]

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
        <div>
          <Tabs data={dataTabBaduta} value={filter.kewilayahan_type} filterState={filterState} />
          <div className="pb-6">
            <div className="flex justify-between items-center pb-4 font-bold text-primary-2 text-xl" onClick={() => push(sidebarNavigation[0].path)}>
              Cara Membaca Data dan Informasi Pada Dashboard
              <FiPlus className="text-third-1" />
            </div>
            <hr />
            <div>
              <div>Kenali istilah-istilah berikut untuk mempermudah membaca data dan informasi pada dashboard:</div>
              <div>
                <ol>
                  <li>
                    <b className="text-primary">Cakupan</b>: Jumlah penerima imunisasi <b>yang sudah terpenuhi</b> pada periode atau daerah (provinsi, kabupaten/kota, kecamatan, atau kelurahan/desa) tertentu
                  </li>
                  <li>
                    <b className="text-primary">Target Cakupan</b>: Jumlah penerima imunisasi <b>yang sudah terpenuhi</b> pada periode atau daerah (provinsi, kabupaten/kota, kecamatan, atau kelurahan/desa) tertentu
                  </li>
                  <li>
                    <b className="text-primary">Kumulatif</b>: Data yang ditampilkan berupa <b>penjumlahan keseluruhan data selama periode 1 tahun</b>
                  </li>
                  <li>
                    <b className="text-primary">Bulanan</b>: Data yang ditampilkan merupakan data per bulan dan <b>bukan penjumlahan keseluruhan data selama periode tertentu</b>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <FilterSummaryImmunization filterState={filterState} />
          </div>
          <div className="py-6"></div>
          <div>
            <div className="font-bold text-primary-2 text-xl md:text-3xl">
              Ringkasan Data Cakupan Imunisasi Rutin Lengkap pada Penerima Imunisasi Bayi, Baduta, BIAS, dan WUS
            </div>
            <div className={`${openSans.className}`}>
              Ringkasan berisi data total penerima imunisasi rutin bayi, baduta (bayi dua tahun), BIAS (Bulan Imunisasi Anak Sekolah), dan WUS (Wanita Usia Subur) terhadap target cakupan yang sudah ditentukan
            </div>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
              <div className="relative flex justify-center items-center">
                {isLoadingTotalImmunizationQuery && <Spin />}
                <TotalSummaryImmunization
                  title="Total Penerima Imunisasi Bayi"
                  value="36.818.437"
                  child={dataTotalSummaryImmunization} />
              </div>
              <div className="relative flex justify-center items-center">
                {isLoadingDoPercentageDPHTHBHIBQuery && <Spin />}
                <TotalSummaryImmunization
                  title="Total Penerima Imunisasi Baduta"
                  value="36.818.437"
                  child={dataTotalSummaryImmunization} />
              </div>
              <div className="relative flex justify-center items-center">
                {isLoadingDoPercentageCampakRubelaQuery && <Spin />}
                <TotalSummaryImmunization
                  title="Total Penerima Imunisasi BIAS"
                  value="36.818.437"
                  child={dataTotalSummaryImmunization} />
              </div>
              <div className="relative flex justify-center items-center">
                {isLoadingDoPercentageCampakRubelaQuery && <Spin />}
                <TotalSummaryImmunization
                  title="Total Penerima Imunisasi T WUS"
                  value="36.818.437"
                  child={dataTotalSummaryImmunization} />
              </div>
            </div>
            <div className="py-6">
              <SummaryImmunization
                title="Ringkasan Data Cakupan Imunisasi Rutin Lengkap pada Provinsi dan Kabupaten/Kota di Indonesia"
                child={dataTotalSummaryImmunization}
              />
            </div>
          </div>
          <div className="py-4 pb-12">
            <RoutineImmunizationCoverageTrendGraph
              title="Grafik Tren Cakupan Imunisasi Rutin Lengkap"
              subTitle="Grafik di bawah menampilkan cakupan program imunisasi rutin lengkap secara kumulatif atau bulanan. Pilih filter yang sesuai untuk menyesuaikan data yang diinginkan atau unduh grafik dengan memilih tombol Unduh."
              graph={
                <div className="my-4 p-4 md:p-8 border rounded-lg">
                  <GraphRoutineImmunizationCoverageTrend
                    title={<div className="font-bold md:text-2xl">Data {trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} Jumlah Penerima, Cakupan, dan Target Cakupan <b className="text-primary-2">{vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin2)?.label}</b> pada Bayi Usia di Bawah 1 Tahun Selama Tahun <b className="text-primary-2">{filter.tahun}</b></div>}
                    subTitle={`Grafik menampilkan tren cakupan ${trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} penerima ${vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin2)?.label} selama tahun ${filter.tahun}`}
                    variant="private"
                    filterState={filterState}
                    filterComp={<Filter2 filterState={filterState} />}
                    threshold={
                      <div className="relative flex justify-center items-center">
                        {isLoadingSetSummaryScopePercentageQuery && <Spin />}
                        <div className="p-2 sm:w-32 md:w-64 h-fit">
                          <div className="text-sm">Total cakupan {trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} pada tahun {filter.tahun}</div>
                          <div className="py-2 font-bold text-3xl text-primary">{formatNumber(getSetSummaryScopePercentageQuery?.data?.pct || 0)}%</div>
                          <div>Jumlah {vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin2)?.label}: {formatNumber(getSetSummaryScopePercentageQuery?.data?.total || 0)}</div>
                        </div>
                      </div>
                    }
                    isLoading={isLoadingSetScopePercentagePerMonthQuery}
                    graphOptions={graphOptions2([
                      {
                        name: "% Target Cakupan",
                        data: (getSetScopePercentagePerMonthQuery?.data || [])?.map((r: any) => (((r?.target || 0) / 100) * (r?.total || 0))) || [],
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
                        data: (getSetScopePercentagePerMonthQuery?.data || [])?.map((r: any) => (((r?.pct || 0) / 100) * (r?.total || 0))) || [],
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
              title="Grafik Tren Cakupan Daerah Imunisasi Rutin Lengkap"
              subTitle="Grafik di bawah menampilkan cakupan program imunisasi rutin lengkap per provinsi, kabupaten/kota, kecamatan, atau kelurahan/desa. Pilih filter yang sesuai untuk menyesuaikan data yang diinginkan atau unduh grafik dengan memilih tombol Unduh."
              graph={
                <div className="my-4 p-4 md:p-8 border rounded-lg">
                  <GraphRoutineImmunizationCoverageTrend
                    title={<div className="font-bold md:text-2xl">Data Cakupan <b className="text-primary-2">{vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin1)?.label}</b> pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">{filter.tahun}</b></div>}
                    subTitle={`Grafik menampilkan hasil cakupan semua data rutin${vaccineTypeOptions.find((r) => r.value === filter.tipe_vaksin1)?.label} dari 34 provinsi di Indonesia`}
                    addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend1} />} variant="private"
                    filterState={filterState}
                    filterComp={<Filter1 filterState={filterState} />}
                    isLoading={isLoadingPercentageTotalImmunizationQuery}
                    opts={{
                      height: 900
                    }}
                    graphOptions={graphOptions1([{
                      // @ts-ignore
                      name: "Target Cakupan per Daerah = 100%",
                      data:
                        (
                          getPercentageTotalImmunizationQuery?.data ||
                          []
                        )?.map((r: any) => r?.pct_immunization) || [],
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
                      )?.map((r: any) => r?.pct_target_threshold) || [],
                    }
                    ]
                      , (
                        getPercentageTotalImmunizationQuery?.data ||
                        []
                      )
                        ?.map((r: any) => r.r.faskes)
                    )}
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
