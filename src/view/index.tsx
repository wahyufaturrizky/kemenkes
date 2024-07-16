"use client";

import { useState } from "react";
import Image from "next/image"
import styles from "@/assets/css/styles.module.css"
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png"
import { Banner, BannerHighlightFooter, BannerText, GraphEcharts, Navbar, Sidebar, Spin, Tabs } from "@/components"
import { ChildSummaryImmunization, FilterSummaryImmunization, GraphAddOn, GraphRoutineImmunizationCoverageTrend, RoutineImmunizationCoverageTrendGraph, SummaryImmunization, TotalSummaryImmunization } from "@/view/home";
import { Filter1, Filter2 } from "@/view/Filter";
import { graphOptions1, graphOptions2 } from "@/view/graphOptions";
import { dataMonths, dataTabBaduta, trendTypeOptions } from "@/utils/constants";
import { formatNumber, standardOptions } from "@/helpers";
import { openSans } from "@/assets/fonts";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { sidebarNavigation } from "@/utils/navigation";
import { useGetTotalBaseCumulativeQuery, useGetTotalBaseHighestScopeQuery, useGetTotalBaseLowestScopeQuery, useGetTotalChartProvinceQuery, useGetTotalCityExceedTargetQuery, useGetTotalCityNotExceedTargetQuery, useGetTotalCumulativeChartScopeQuery, useGetTotalCumulativeScopeQuery, useGetTotalHighestScopeQuery, useGetTotalLowestScopeQuery, useGetTotalProvinceExceedTargetQuery, useGetTotalProvinceNotExceedTargetQuery, useGetTotalUniqueAntigenCompleteQuery, useGetTotalUniqueBabyQuery, useGetTotalUniqueBadutaCompleteQuery, useGetTotalUniqueBadutaQuery, useGetTotalUniqueBaseCompleteQuery, useGetTotalUniqueBiasCompleteQuery, useGetTotalUniqueBiasQuery, useGetTotalUniqueT2CompleteQuery, useGetTotalUniqueWusQuery, useGetListVaccineQuery } from "@/lib/services/public-immunization";

const HomeView = () => {
  const { push } = useRouter();

  const filterState = useState({
    tahun: new Date().getFullYear(),
    bulan: dataMonths.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: '',
    kabkota: '',
    kecamatan: '',
    jenis_sarana: '',
    faskes: '',
    tipe_vaksin1: "idl1",
    tipe_vaksin2: "idl1",
    jenis_tren: 'kumulatif',
    tipe_umur: 1,
    jenis_kelamin: 1,
    wilayah: "All",
    wilayah1: "All",
    kewilayahan_type: 0
  })
  const [filter] = filterState

  const dataQuery = {
    year: filter.tahun,
    month: filter.bulan,
    domicile_id: filter.faskes
      ? filter.faskes
      : filter.kecamatan
        ? filter.kecamatan
        : filter.kabkota
          ? filter.kabkota
          : filter.provinsi
            ? filter.provinsi
            : "All",
    // kewilayahan_type: filter.kewilayahan_type
  };

  const filterTotalUniqueQuery = {
    ...dataQuery,
    region_type: filter.wilayah
  }

  const optionTotalUniqueQuery = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };
  const filterChart1Query = {
    ...dataQuery,
    jenis_tren: filter.jenis_tren,
    region_type: filter.wilayah,
    vaccine_type: filter.tipe_vaksin2
  }
  const filterChart2Query = {
    ...dataQuery,
    region_type: filter.wilayah1 !== 'All' ? filter.wilayah1 : filter.wilayah,
    vaccine_type: filter.tipe_vaksin1
  }

  const { data: getListVaccine } = useGetListVaccineQuery({})
  const optionsVaccineType = standardOptions(getListVaccine?.data, 'vaccine_name', 'vaccine_id')

  const { data: getTotalUniqueBabyQuery,
    isLoading: isLoadingTotalUniqueBabyQuery
  } = useGetTotalUniqueBabyQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalUniqueBadutaQuery,
    isLoading: isLoadingTotalUniqueBadutaQuery
  } = useGetTotalUniqueBadutaQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalUniqueBiasQuery,
    isLoading: isLoadingTotalUniqueBiasQuery
  } = useGetTotalUniqueBiasQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalUniqueWusQuery,
    isLoading: isLoadingTotalUniqueWusQuery
  } = useGetTotalUniqueWusQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalUniqueBaseCompleteQuery,
    isLoading: isLoadingTotalUniqueBaseCompleteQuery
  } = useGetTotalUniqueBaseCompleteQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalUniqueAntigenCompleteQuery,
    isLoading: isLoadingTotalUniqueAntigenCompleteQuery
  } = useGetTotalUniqueAntigenCompleteQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalUniqueBadutaCompleteQuery,
    isLoading: isLoadingTotalUniqueBadutaCompleteQuery
  } = useGetTotalUniqueBadutaCompleteQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalUniqueBiasCompleteQuery,
    isLoading: isLoadingTotalUniqueBiasCompleteQuery
  } = useGetTotalUniqueBiasCompleteQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalUniqueT2CompleteQuery,
    isLoading: isLoadingTotalUniqueT2CompleteQuery
  } = useGetTotalUniqueT2CompleteQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  // ---
  const { data: getTotalProvinceExceedTargetQuery,
    isLoading: isLoadingTotalProvinceExceedTargetQuery
  } = useGetTotalProvinceExceedTargetQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalProvinceNotExceedTargetQuery,
    isLoading: isLoadingTotalProvinceNotExceedTargetQuery
  } = useGetTotalProvinceNotExceedTargetQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalCityExceedTargetQuery,
    isLoading: isLoadingTotalCityExceedTargetQuery
  } = useGetTotalCityExceedTargetQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalCityNotExceedTargetQuery,
    isLoading: isLoadingTotalCityNotExceedTargetQuery
  } = useGetTotalCityNotExceedTargetQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalHighestScopeQuery,
    isLoading: isLoadingTotalHighestScopeQuery
  } = useGetTotalHighestScopeQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  const { data: getTotalLowestScopeQuery,
    isLoading: isLoadingTotalLowestScopeQuery
  } = useGetTotalLowestScopeQuery(filterTotalUniqueQuery, optionTotalUniqueQuery)
  // ---  
  const { data: getTotalCumulativeChartScopeQuery,
    isLoading: isLoadingTotalCumulativeChartScopeQuery
  } = useGetTotalCumulativeChartScopeQuery(filterChart1Query, optionTotalUniqueQuery)
  const { data: getTotalCumulativeScopeQuery,
    isLoading: isLoadingTotalCumulativeScopeQuery
  } = useGetTotalCumulativeScopeQuery(filterChart1Query, optionTotalUniqueQuery)
  // ---
  const { data: getTotalBaseCumulativeQuery,
    isLoading: isLoadingTotalBaseCumulativeQuery
  } = useGetTotalBaseCumulativeQuery({ ...filterChart2Query }, optionTotalUniqueQuery)
  const { data: getTotalBaseHighestScopeQuery,
    isLoading: isLoadingTotalBaseHighestScopeQuery
  } = useGetTotalBaseHighestScopeQuery({ ...filterChart2Query }, optionTotalUniqueQuery)
  const { data: getTotalBaseLowestScopeQuery,
    isLoading: isLoadingTotalBaseLowestScopeQuery
  } = useGetTotalBaseLowestScopeQuery({ ...filterChart2Query }, optionTotalUniqueQuery)
  const { data: getTotalChartProvinceQuery,
    isLoading: isLoadingTotalChartProvinceQuery
  } = useGetTotalChartProvinceQuery({ ...filterChart2Query }, optionTotalUniqueQuery)

  const dataTotalBase = [
    {
      title: `Total Cakupan Imunisasi Rutin Lengkap Nasional Tahun ${getTotalBaseCumulativeQuery?.data?.year || filter.tahun}`,
      value: (<div>{formatNumber(getTotalBaseCumulativeQuery?.data || 0)}%</div>),
      regional: <></>,
      isLoading: isLoadingTotalBaseCumulativeQuery
    },
    {
      title: `Cakupan Tertinggi Tahun ${getTotalBaseHighestScopeQuery?.data?.year || filter.tahun}`,
      value: (<div className="font-bold">{formatNumber(getTotalBaseHighestScopeQuery?.data?.presentase || 0)}%</div>),
      regional: <div>{getTotalBaseHighestScopeQuery?.data?.provinsi !== "All" ? getTotalBaseHighestScopeQuery?.data?.provinsi : ''}</div>,
      isLoading: isLoadingTotalBaseHighestScopeQuery
    },
    {
      title: `Cakupan Terendah Tahun ${getTotalBaseLowestScopeQuery?.data?.year || filter.tahun}`,
      value: (<div className="font-bold">{formatNumber(getTotalBaseLowestScopeQuery?.data?.presentase || 0)}%</div>),
      regional: <div>{getTotalBaseLowestScopeQuery?.data?.provinsi !== "All" ? getTotalBaseLowestScopeQuery?.data?.provinsi : ''}</div>,
      isLoading: isLoadingTotalBaseLowestScopeQuery
    },
  ]

  const dataTotalSummaryImmunizationBaby: any = [
    {
      className: `${openSans.className} public`,
      title: "Imunisasi Dasar Lengkap",
      value: formatNumber(getTotalUniqueBaseCompleteQuery?.data?.total || 0),
      percent: getTotalUniqueBaseCompleteQuery?.data?.presentase || 0,
      target: formatNumber(getTotalUniqueBaseCompleteQuery?.data?.sasaran || 0),
      subtitle: " dari ",
    },
    {
      className: `${openSans.className} public`,
      title: "Antigen Baru Lengkap (PCV2)",
      value: formatNumber(getTotalUniqueAntigenCompleteQuery?.data?.total || 0),
      percent: getTotalUniqueAntigenCompleteQuery?.data?.presentase || 0,
      target: formatNumber(getTotalUniqueAntigenCompleteQuery?.data?.sasaran || 0),
      subtitle: " dari ",
    },
  ]
  const dataTotalSummaryImmunizationBaduta: any = [
    {
      className: `${openSans.className} public`,
      title: "Imunisasi Baduta Lengkap",
      value: formatNumber(getTotalUniqueBadutaCompleteQuery?.data?.total || 0),
      percent: getTotalUniqueBadutaCompleteQuery?.data?.presentase || 0,
      target: formatNumber(getTotalUniqueBadutaCompleteQuery?.data?.sasaran || 0),
      subtitle: " dari ",
    },
  ]
  const dataTotalSummaryImmunizationBias: any = [
    {
      className: `${openSans.className} public`,
      title: "Imunisasi BIAS Lengkap",
      value: formatNumber(getTotalUniqueBiasCompleteQuery?.data?.total || 0),
      percent: getTotalUniqueBiasCompleteQuery?.data?.presentase || 0,
      target: formatNumber(getTotalUniqueBiasCompleteQuery?.data?.sasaran || 0),
      subtitle: " dari ",
    },
  ]
  const dataTotalSummaryImmunizationWus: any = [
    {
      className: `${openSans.className} public`,
      title: "Status T2+",
      value: formatNumber(getTotalUniqueT2CompleteQuery?.data?.total || 0),
      percent: getTotalUniqueT2CompleteQuery?.data?.presentase || 0,
      target: formatNumber(getTotalUniqueT2CompleteQuery?.data?.sasaran || 0),
      subtitle: " dari ",
    },
  ]
  const dataTotalSummaryImmunization: any = [
    {
      className: `${openSans.className}`,
      title: "Jumlah Provinsi yang Memenuhi Target",
      value: formatNumber(getTotalProvinceExceedTargetQuery?.data?.total || 0),
      percent: getTotalProvinceExceedTargetQuery?.data?.presentase || 0,
      target: "total provinsi",
      subtitle: " dari ",
    },
    {
      className: `${openSans.className}`,
      title: "Jumlah Provinsi yang Belum Memenuhi Target",
      value: formatNumber(getTotalProvinceNotExceedTargetQuery?.data?.total || 0),
      percent: getTotalProvinceNotExceedTargetQuery?.data?.presentase || 0,
      target: "total provinsi",
      subtitle: " dari ",
    },
    {
      className: `${openSans.className}`,
      title: "Jumlah Provinsi yang Memenuhi Target",
      value: getTotalHighestScopeQuery?.data?.wilayah_desc || '',
      percent: getTotalHighestScopeQuery?.data?.presentase || 0,
      target: "target imunisasi rutin",
      subtitle: " dari ",
    },
    {
      className: `${openSans.className}`,
      title: "Jumlah Provinsi yang Belum Memenuhi Target",
      value: getTotalLowestScopeQuery?.data?.wilayah_desc || '',
      percent: getTotalLowestScopeQuery?.data?.presentase || 0,
      target: "target imunisasi rutin",
      subtitle: " dari ",
    },
    {
      className: `${openSans.className}`,
      title: "Jumlah Provinsi yang Memenuhi Target",
      value: `${formatNumber(getTotalCityExceedTargetQuery?.data?.total || 0)} Kab/Kota`,
      percent: getTotalCityExceedTargetQuery?.data?.presentase || 0,
      target: "total kabupaten/kota",
      subtitle: " dari ",
    },
    {
      className: `${openSans.className}`,
      title: "Jumlah Provinsi yang Belum Memenuhi Target",
      value: `${formatNumber(getTotalCityNotExceedTargetQuery?.data?.total || 0)} Kab/Kota`,
      percent: getTotalCityNotExceedTargetQuery?.data?.presentase || 0,
      target: "total kabupaten/kota",
      subtitle: " dari ",
    },
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
                {isLoadingTotalUniqueBabyQuery && <Spin />}
                <TotalSummaryImmunization
                  title="Total Penerima Imunisasi Bayi"
                  value={getTotalUniqueBabyQuery?.data?.ytd_unique_baby_all || "0"}
                  child={dataTotalSummaryImmunizationBaby}
                />
              </div>
              <div className="relative flex justify-center items-center">
                {isLoadingTotalUniqueBadutaQuery && <Spin />}
                <TotalSummaryImmunization
                  title="Total Penerima Imunisasi Baduta"
                  value={getTotalUniqueBadutaQuery?.data?.ytd_unique_baduta_all || "0"}
                  child={dataTotalSummaryImmunizationBaduta}
                />
              </div>
              <div className="relative flex justify-center items-center">
                {isLoadingTotalUniqueBiasQuery && <Spin />}
                <TotalSummaryImmunization
                  title="Total Penerima Imunisasi BIAS"
                  value={getTotalUniqueBiasQuery?.data?.ytd_unique_bias_all || "0"}
                  child={dataTotalSummaryImmunizationBias}
                />
              </div>
              <div className="relative flex justify-center items-center">
                {isLoadingTotalUniqueWusQuery && <Spin />}
                <TotalSummaryImmunization
                  title="Total Penerima Imunisasi T WUS"
                  value={getTotalUniqueWusQuery?.data?.ytd_unique_wus_all || "0"}
                  child={dataTotalSummaryImmunizationWus}
                />
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
                    title={<div className="font-bold md:text-2xl">Data {trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} Jumlah Penerima, Cakupan, dan Target Cakupan <b className="text-primary-2">{optionsVaccineType.find((r) => r.value === filter.tipe_vaksin2)?.label}</b> pada Bayi Usia di Bawah 1 Tahun Selama Tahun <b className="text-primary-2">{filter.tahun}</b></div>}
                    subTitle={`Grafik menampilkan tren cakupan ${trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} penerima ${optionsVaccineType.find((r) => r.value === filter.tipe_vaksin2)?.label} selama tahun ${filter.tahun}`}
                    variant="private"
                    filterState={filterState}
                    filterComp={<Filter2 filterState={filterState} data={getTotalCumulativeChartScopeQuery?.data || []} />}
                    threshold={
                      <div className="relative flex justify-center items-center">
                        {isLoadingTotalCumulativeScopeQuery && <Spin />}
                        <div className="p-2 sm:w-32 md:w-64 h-fit">
                          <div className="text-sm">Total cakupan {trendTypeOptions.find((r) => r.value === filter.jenis_tren)?.label} pada tahun {filter.tahun}</div>
                          <div className="py-2 font-bold text-3xl text-primary">{formatNumber(getTotalCumulativeScopeQuery?.data?.presentase || 0)}%</div>
                          <div>Jumlah {optionsVaccineType.find((r) => r.value === filter.tipe_vaksin2)?.label}: {formatNumber(getTotalCumulativeScopeQuery?.data?.total || 0)}</div>
                        </div>
                      </div>
                    }
                    isLoading={isLoadingTotalCumulativeChartScopeQuery}
                    graphOptions={graphOptions2([
                      {
                        name: "% Target Cakupan",
                        data: (getTotalCumulativeChartScopeQuery?.data || [])?.map((r: any) => (((r?.target_cakupan || 0) / 100) * (r?.jumlah_penerima || 0))) || [],
                        type: 'line',
                        label: {
                          show: true,
                          precision: 1,
                          formatter: (params: any) => `${formatNumber(((params.value || 0) / (getTotalCumulativeChartScopeQuery?.data || [])[params.dataIndex]?.jumlah_penerima) * 100)}%`
                        }
                      },
                      {
                        name: "Jumlah Penerima Imunisasi",
                        data:
                          (
                            getTotalCumulativeChartScopeQuery?.data || []
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
                        data: (getTotalCumulativeChartScopeQuery?.data || [])?.map((r: any) => (((r?.pct_cakupan || 0) / 100) * (r?.jumlah_penerima || 0))) || [],
                        type: 'line',
                        label: {
                          show: true,
                          precision: 1,
                          formatter: (params: any) => `${formatNumber(((params.value || 0) / (getTotalCumulativeChartScopeQuery?.data || [])[params.dataIndex]?.jumlah_penerima) * 100)}%`
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
                    title={<div className="font-bold md:text-2xl">Data Cakupan <b className="text-primary-2">{optionsVaccineType.find((r) => r.value === filter.tipe_vaksin1)?.label}</b> pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">{filter.tahun}</b></div>}
                    subTitle={`Grafik menampilkan hasil cakupan semua data rutin ${optionsVaccineType.find((r) => r.value === filter.tipe_vaksin1)?.label} dari 34 provinsi di Indonesia`}
                    addOn={<GraphAddOn dataCard={dataTotalBase} />} variant="private"
                    filterState={filterState}
                    filterComp={<Filter1 filterState={filterState} data={getTotalChartProvinceQuery?.data || []} />}
                    isLoading={isLoadingTotalChartProvinceQuery}
                    opts={{
                      height: getTotalChartProvinceQuery?.data?.length > 1500 ? 65000 :
                        getTotalChartProvinceQuery?.data?.length > 700 ? 35000 :
                          getTotalChartProvinceQuery?.data?.length > 200 ? 15000 :
                            900
                    }}
                    graphOptions={graphOptions1([{
                      // @ts-ignore
                      name: "Target Cakupan per Daerah = 100%",
                      data:
                        (
                          getTotalChartProvinceQuery?.data ||
                          []
                        )?.map((r: any) => r?.pct) || [],
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
                        getTotalChartProvinceQuery?.data ||
                        []
                      )?.map((r: any) => r?.threshold) || [],
                    }
                    ]
                      , (
                        getTotalChartProvinceQuery?.data ||
                        []
                      )
                        ?.map((r: any) => r.domicile === "All" ? "Nasional" : r.domicile)
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
