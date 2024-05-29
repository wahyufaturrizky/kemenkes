"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Banner,
  BannerHighlightFooter,
  BannerText,
  Navbar,
  Sidebar,
  Tabs,
} from "@/components";
import {
  ChildSummaryImmunization,
  FilterSummaryImmunization,
  GraphAddOn,
  GraphRoutineImmunizationCoverageTrend,
  RoutineImmunizationCoverageTrendGraph,
  SummaryImmunization,
  TotalSummaryImmunization,
} from "@/view/home";
import FilterSummaryImmunizationWus from "@/view/home/components/FilterWus";
import {
  // dataGraphRegionalRoutineImmunizationCoverageTrend,
  dataMonth,
  dataTabBaduta,
  dataTotalSummaryImmunization,
  vaccineTypeOptions,
} from "@/utils/constants";
import {
  useGetTotalImmunizationQuery,
  useGetTotalImmunizationPregnantQuery,
  useGetTotalImmunizationFertileQuery,
  useGetTotalImmunizationTdWusQuery,
  useGetTotalImmunizationTdWusPregnantQuery,
  useGetTotalImmunizationTdWusFertileQuery,
  useGetTotalImmunizationTotalCoverageQuery,
  useGetTotalImmunizationTotalCoverageHighestQuery,
  useGetTotalImmunizationTotalCoverageLowestQuery,
  useGetTotalImmunizationTotalCumulativeCoverageQuery,
  useGetTotalImmunizationTotalCumulativeCoverageRecipientsQuery,
  useGetDistributionStatusChartQuery,
  useGetDistributionStatusPregnantChartQuery,
  useGetTotalCumulativeCoverageRecipientsQuery,
} from "@/lib/services/wus";
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png";
import styles from "@/assets/css/styles.module.css";

import {
  graphOptions1,
  graphOptions2,
  graphOptions5,
  graphOptions6,
  graphOptions7,
} from "../routine-baduta-immunization/graphOptions";

import { formatNumber } from "@/helpers";
import { openSans } from "@/assets/fonts";

import {
  Filter1,
  Filter2,
  Filter3,
  Filter4,
} from "@/view/dashboard/wus/FilterWus";
import TabsBias from "@/components/tabsBias";

const Wus = () => {
  const filterState = useState({
    tahun: 2024,
    bulan: dataMonth.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: "",
    kabkota: "",
    kecamatan: "",
    faskes: "",
    wilayah: "province",
    kewilayahan_type: 0,
    tren_type: "kumulatif",

    //
    status_type_daerah: "t1",
    status_type_kumulatif: "t1",
    women_category_daerah: "All",
    women_category_kumulatif: "All",
    women_category_status_T: "All",
    women_category_status_T_Pregnant: "All",
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
        ? "faskes"
        : filter.faskes && filter.kewilayahan_type == 1
        ? "subdistrict"
        : filter.kecamatan
        ? "district"
        : filter.kabkota
        ? "city"
        : filter.provinsi
        ? "province"
        : "All",
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

  const filterCoverage = {
    ...dateQuery,
    status_type: filter.status_type_daerah,
    women_category: filter.women_category_daerah,
    region_type: filter.wilayah,
    kewilayahan_type: filter.kewilayahan_type,
  };

  const filterCumulativeCoverageRecipients = {
    ...dateQuery,

    region_type:
      filter.faskes && filter.kewilayahan_type == 0
        ? "faskes"
        : filter.faskes && filter.kewilayahan_type == 1
        ? "subdistrict"
        : filter.kecamatan
        ? "district"
        : filter.kabkota
        ? "city"
        : filter.provinsi
        ? "province"
        : "All",
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
    status_type: filter.status_type_kumulatif,
    tren_type: filter.tren_type,
    women_category: filter.women_category_kumulatif,
  };

  const filterGetTotalCumulativeCoverageRecipients = {
    year: filter.tahun,
    status_type: filter.status_type_kumulatif,
    tren_type: filter.tren_type,
    women_category: filter.women_category_kumulatif,
    kewilayahan_type: filter.kewilayahan_type,
  };

  // const [filterCoverage] = filterStateCoverage;

  const filterDistributionStatus = {
    ...dateQuery,
    status_type: filter.status_type_daerah,
    women_category: filter.women_category_status_T,
    region_type:
      filter.faskes && filter.kewilayahan_type == 0
        ? "faskes"
        : filter.faskes && filter.kewilayahan_type == 1
        ? "subdistrict"
        : filter.kecamatan
        ? "district"
        : filter.kabkota
        ? "city"
        : filter.provinsi
        ? "province"
        : "All",
    kewilayahan_type: filter.kewilayahan_type,
  };

  const filterDistributionStatusPregnant = {
    ...dateQuery,
    status_type: filter.status_type_daerah,
    women_category: filter.women_category_status_T_Pregnant,
    region_type:
      filter.faskes && filter.kewilayahan_type == 0
        ? "faskes"
        : filter.faskes && filter.kewilayahan_type == 1
        ? "subdistrict"
        : filter.kecamatan
        ? "district"
        : filter.kabkota
        ? "city"
        : filter.provinsi
        ? "province"
        : "All",
    kewilayahan_type: filter.kewilayahan_type,
  };

  // const filterStateGetTotalCumulativeCoverageRecipients = useState({
  //   year: 2024,
  //   tren_type: "kumulatif",
  //   status_type: "t1",
  //   women_category: "All",
  // });
  // const [filterGetTotalCumulativeCoverageRecipients] =
  //   filterStateGetTotalCumulativeCoverageRecipients;

  // const filterQueryTotal = {
  //   ...dateQuery,
  //   region_type: filterQuery.region_type,
  //   faskes_parent_id: 11,
  //   faskes_id: 11,
  //   women_category: "All",
  // };

  // const filterCumulativeCoverageRecipients = useState({
  //   ...dateQuery,
  //   region_type: "province",
  //   faskes_parent_id: 11,
  //   faskes_id: 11,
  //   status_type: "t1",
  //   tren_type: "bulanan",
  //   women_category: "All",
  // });

  // const [filterCoverageRecipients] = filterCumulativeCoverageRecipients;

  const optionQuery = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };

  const { data: getTotalImmunizationQuery } = useGetTotalImmunizationQuery(
    filterQuery,
    optionQuery
  );
  const { data: getTotalImmunizationPregnantQuery } =
    useGetTotalImmunizationPregnantQuery(filterQuery, optionQuery);
  const { data: getTotalImmunizationFertileQuery } =
    useGetTotalImmunizationFertileQuery(filterQuery, optionQuery);
  const { data: getTotalImmunizationTdWusQuery } =
    useGetTotalImmunizationTdWusQuery(filterQuery, optionQuery);
  const { data: getTotalImmunizationTdWusPregnantQuery } =
    useGetTotalImmunizationTdWusPregnantQuery(filterQuery, optionQuery);
  const { data: getTotalImmunizationTdWusFertileQuery } =
    useGetTotalImmunizationTdWusFertileQuery(filterQuery, optionQuery);

  // grafik1
  const { data: getTotalImmunizationTotalCoverageQuery } =
    useGetTotalImmunizationTotalCoverageQuery(filterCoverage, optionQuery);

  const { data: getTotalImmunizationTotalCoverageHighestQuery } =
    useGetTotalImmunizationTotalCoverageHighestQuery(
      filterCoverage,
      optionQuery
    );
  const { data: getTotalImmunizationTotalCoverageLowestQuery } =
    useGetTotalImmunizationTotalCoverageLowestQuery(
      filterCoverage,
      optionQuery
    );
  const { data: getTotalImmunizationTotalCumulativeCoverageQuery } =
    useGetTotalImmunizationTotalCumulativeCoverageQuery(
      filterCoverage,
      optionQuery
    );

  // grafik1

  const { data: getTotalImmunizationTotalCumulativeCoverageRecipientsQuery } =
    useGetTotalImmunizationTotalCumulativeCoverageRecipientsQuery(
      filterCumulativeCoverageRecipients,
      optionQuery
    );
  const { data: getDistributionStatusChartQuery } =
    useGetDistributionStatusChartQuery(filterDistributionStatus, optionQuery);
  const { data: getDistributionStatusPregnantChartQuery } =
    useGetDistributionStatusPregnantChartQuery(
      filterDistributionStatusPregnant
    );
  const { data: getTotalCumulativeCoverageRecipientsQuery } =
    useGetTotalCumulativeCoverageRecipientsQuery(
      filterGetTotalCumulativeCoverageRecipients
    );

  // console.log(filterDistributionStatus, "isi data");

  const dataGraphRegionalRoutineImmunizationCoverageTrend = [
    {
      title: `Total Cakupan T2+  Nasioanl Tahun ${filter.tahun}`,
      value: (
        <div>
          {formatNumber(
            getTotalImmunizationTotalCoverageQuery?.data?.ytd_pct_total || 0
          )}
          %
        </div>
      ),
      regional: "",
    },
    {
      title: `Cakupan Tertinggi Tahun ${filter.tahun}`,
      value: (
        <div>
          {formatNumber(
            getTotalImmunizationTotalCoverageHighestQuery?.data
              ?.ytd_pct_total || 0
          )}
          %
        </div>
      ),

      regional:
        getTotalImmunizationTotalCoverageHighestQuery?.data?.faskes_desc,
    },
    {
      title: `Cakupan Terendah Tahun ${filter.tahun}`,
      value: (
        <div>
          {formatNumber(
            getTotalImmunizationTotalCoverageLowestQuery?.data?.ytd_pct_total ||
              0
          )}
          %
        </div>
      ),
      regional: getTotalImmunizationTotalCoverageLowestQuery?.data?.faskes_desc,
    },
  ];

  // console.log(getDistributionStatusChartQuery?.data?.ytd_total_t1, "isi data");

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
                Imunisasi Rutin WUS
              </div>
              <div className={`${openSans.className}`}>
                Menampilkan data cakupan imunisasi rutin wanita usia subur atau
                ibu hamil berdasarkan jenis imunisasi dan daerah cakupan
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunizationWus filterState={filterState} />
            </div>
            <div className="py-6"></div>
            <div className="pb-12">
              <div className="font-bold text-primary-2 text-xl md:text-3xl">
                Ringkasan Data Cakupan Imunisasi Rutin WUS
              </div>
              <div>
                Ringkasan berisi data total penerima imunisasi rutin WUS dan
                jenis imunisasi rutin WUS terhadap target cakupan yang sudah
                ditentukan.
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-4">
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
                  title={"Status T2+"}
                  value={
                    formatNumber(
                      getTotalImmunizationQuery?.data?.ytd_total_t2plus
                    ) || "0"
                  }
                  percent={getTotalImmunizationQuery?.data?.ytd_pct_t2plus || 0}
                  target={
                    formatNumber(
                      getTotalImmunizationQuery?.data?.immunization_target_cnt
                    ) || 0
                  }
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
                  title={"Status T2+ Ibu Hamil"}
                  value={
                    formatNumber(
                      getTotalImmunizationPregnantQuery?.data
                        ?.ytd_total_t2plus_pregnant
                    ) || "0"
                  }
                  percent={
                    getTotalImmunizationPregnantQuery?.data
                      ?.ytd_pct_t2plus_pregnant || "0"
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationPregnantQuery?.data
                        ?.immunization_target_cnt_pregnant
                    ) || "0"
                  }
                  subtitle={"  dari "}
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
                  title={"Status T2+ Ibu Tidak Hamil"}
                  value={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.ytd_total_t2plus_fertile
                    ) || "0"
                  }
                  percent={
                    getTotalImmunizationFertileQuery?.data
                      ?.ytd_pct_t2plus_fertile || 0
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.immunization_target_cnt_fertile
                    ) || 0
                  }
                  subtitle={"  dari "}
                />
                <ChildSummaryImmunization
                  className={`px-4 border rounded-lg ${styles.scoreCardPurple}`}
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi Td WUS"
                  contentTooltip={<>Total Penerima Imunisasi Td WUS</>}
                  value={
                    formatNumber(
                      getTotalImmunizationTdWusQuery?.data?.ytd_total_td_wus
                    ) || "0"
                  }
                />
                <ChildSummaryImmunization
                  className={`px-4 border rounded-lg ${styles.scoreCardPurple}`}
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi Td WUS Ibu Hamil"
                  contentTooltip={
                    <>Total Penerima Imunisasi Td WUS Ibu Hamil</>
                  }
                  value={
                    formatNumber(
                      getTotalImmunizationTdWusPregnantQuery?.data
                        ?.ytd_total_td_wus_pregnant
                    ) || "0"
                  }
                />
                <ChildSummaryImmunization
                  className={`px-4 border rounded-lg ${styles.scoreCardPurple}`}
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi Td WUS Ibu Tidak Hamil"
                  contentTooltip={
                    <>Total Penerima Imunisasi Td WUS Ibu Tidak Hamil</>
                  }
                  value={
                    formatNumber(
                      getTotalImmunizationTdWusFertileQuery?.data
                        ?.ytd_total_td_wus_fertile
                    ) || "0"
                  }
                />
              </div>
            </div>

            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Daerah Imunisasi WUS"
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      layout="vertical"
                      title={
                        <div className="font-bold md:text-2xl">
                          Data Cakupan Status{" "}
                          <b className="text-primary-2">T2+</b> pada Provinsi di{" "}
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
                      graphOptions={graphOptions1(
                        (
                          getTotalImmunizationTotalCumulativeCoverageQuery?.data ||
                          []
                        )?.map((r: any) => {
                          return {
                            name: r.faskes_desc,
                            data:
                              (
                                getTotalImmunizationTotalCumulativeCoverageQuery?.data ||
                                []
                              )?.map((r: any) => r?.ytd_pct_total) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              position: "right",
                              formatter: (params: any) =>
                                `${params.value}% (${r?.ytd_total})`,
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
                title="Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi WUS "
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={
                        <div className="font-bold md:text-2xl">
                          Data <b className="text-primary-2">Kumulatif</b>{" "}
                          Jumlah Penerima, Cakupan, dan Target Cakupan{" "}
                          <b className="text-primary-2">T2+</b> pada Wanita Usia
                          Subur atau Ibu Hamil Selama Tahun{" "}
                          <b className="text-primary-2">{filter.tahun}</b>
                        </div>
                      }
                      subTitle={`Grafik menampilkan tren cakupan kumulatif penerima imunisasi WUS`}
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
                              {formatNumber(
                                getTotalCumulativeCoverageRecipientsQuery?.data
                                  ?.pct_total || 0
                              )}
                              %
                            </div>
                            <div>
                              Jumlah Imunisasi Baduta Lengkap:{" "}
                              {formatNumber(
                                getTotalCumulativeCoverageRecipientsQuery?.data
                                  ?.total || 0
                              )}
                            </div>
                          </div>
                        </div>
                      }
                      graphOptions={graphOptions2([
                        {
                          name: "% Target Cakupan",
                          data:
                            (
                              getTotalImmunizationTotalCumulativeCoverageRecipientsQuery?.data ||
                              []
                            )?.map((r: any) => r?.pct_target_threshold) || [],
                          type: "line",
                        },
                        {
                          name: "Jumlah Penerima Imunisasi",
                          data:
                            (
                              getTotalImmunizationTotalCumulativeCoverageRecipientsQuery?.data ||
                              []
                            )?.map((r: any) => r?.total) || [],
                          type: "bar",
                        },
                        {
                          name: "% Cakupan",
                          data:
                            (
                              getTotalImmunizationTotalCumulativeCoverageRecipientsQuery?.data ||
                              []
                            )?.map((r: any) => r?.pct_total) || [],
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
                      title={
                        <div className="font-bold md:text-2xl">
                          {/* Data Kumulatif Jumlah Penerima, Cakupan, dan Target
                          Cakupan{" "} */}
                          <b className="text-primary-2">
                            Grafik Sebaran Status T
                          </b>
                          {/* Selama
                          Tahun <b className="text-primary-2">{"2024"}</b> */}
                        </div>
                      }
                      subTitle={``}
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter3 filterState={filterState} />}
                      graphOptions={graphOptions7([
                        {
                          name: "Total",
                          type: "bar",
                          barWidth: "60%",
                          label: {
                            show: true,
                            position: "inside",
                          },
                          data: [
                            getDistributionStatusChartQuery?.data?.ytd_total_t1,
                            getDistributionStatusChartQuery?.data?.ytd_total_t2,
                            getDistributionStatusChartQuery?.data?.ytd_total_t3,
                            getDistributionStatusChartQuery?.data?.ytd_total_t4,
                            getDistributionStatusChartQuery?.data?.ytd_total_t5,
                            getDistributionStatusChartQuery?.data
                              ?.ytd_total_t2plus,
                          ],
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
                      title={
                        <div className="font-bold md:text-2xl">
                          {/* Data Kumulatif Jumlah Penerima, Cakupan, dan Target
                          Cakupan{" "} */}
                          <b className="text-primary-2">
                            Grafik Sebaran Status Kehamilan Terhadap Status T
                          </b>
                          {/* Selama
                          Tahun <b className="text-primary-2">2023</b> */}
                        </div>
                      }
                      subTitle={``}
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter4 filterState={filterState} />}
                      graphOptions={graphOptions7([
                        {
                          name: "Total",
                          type: "bar",
                          barWidth: "60%",
                          label: {
                            show: true,
                            position: "inside",
                          },
                          data: [
                            getDistributionStatusPregnantChartQuery?.data
                              ?.ytd_total_t1,
                            getDistributionStatusPregnantChartQuery?.data
                              ?.ytd_total_t2,
                            getDistributionStatusPregnantChartQuery?.data
                              ?.ytd_total_t3,
                            getDistributionStatusPregnantChartQuery?.data
                              ?.ytd_total_t4,
                            getDistributionStatusPregnantChartQuery?.data
                              ?.ytd_total_t5,
                            getDistributionStatusPregnantChartQuery?.data
                              ?.ytd_total_t2plus,
                          ],
                          itemStyle: {
                            borderColor: "#FAC515",
                            color: "#FAC515",
                          },
                          emphasis: {
                            itemStyle: {
                              borderColor: "#FAC515",
                              color: "#FAC515",
                            },
                          },
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

export default Wus;
