"use client";

import { useState } from "react";
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
import {
  Filter1,
  Filter2,
  Filter3,
  Filter4,
  Filter5,
} from "@/view/dashboard/routine-baduta-immunization/Filter";
import {
  graphOptions1,
  graphOptions2,
  graphOptions3,
  graphOptions4,
  graphOptions5,
} from "@/view/dashboard/routine-baduta-immunization//graphOptions";
import {
  useGetAverageImmunizationByGenderQuery,
  useGetDoPercentageCampakRubelaQuery,
  useGetDoPercentageDPHTHBHIBQuery,
  useGetExceedTargetPerVaccineQuery,
  useGetHighestImmunizationByAgeQuery,
  useGetImmunizationWithHighetFemaleRecivientQuery,
  useGetImmunizationWithHighetMaleRecivientQuery,
  useGetInExceedTargetPerVaccineQuery,
  useGetMaxImmunizationByAgeQuery,
  useGetPercentageTotalImmunizationQuery,
  useGetScopePercentagePerMonthQuery,
  useGetSummaryImmunizationByAgeQuery,
  useGetSummaryImmunizationPerGenderQuery,
  useGetSummaryImmunizationPerVaccineQuery,
  useGetSummaryScopePercentageQuery,
  useGetTotalHighestScopeByVaccineTypeQuery,
  useGetTotalHighestScopeQuery,
  useGetTotalImmunizationByVaccineTypeQuery,
  useGetTotalImmunizationQuery,
  useGetTotalLowestScopeByVaccineTypeQuery,
  useGetTotalLowestScopeQuery,
  useGetTotalScopeByVaccineTypeQuery,
  useGetTotalScopeQuery,
} from "@/lib/services/baduta-immunization";
import { dataMonth, vaccineTypeOptions } from "@/utils/constants";
import { formatNumber } from "@/helpers";
import { openSans } from "@/assets/fonts";

const RoutineBadutaImmunization = () => {
  const filterState = useState({
    // tahun: new Date().getFullYear(),
    tahun: 2023,
    bulan: dataMonth.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: "",
    kabkota: "",
    kecamatan: "",
    jenis_sarana: "",
    faskes: "",
    tipe_vaksin1: "1",
    tipe_vaksin2: "1",
    tipe_vaksin3: "1",
    tipe_vaksin4: "1",
    tipe_vaksin5: "1",
    jenis_tren: "kumulatif",
    tipe_umur: 1,
    jenis_kelamin: 1,
    wilayah: "All",
    wilayah1: "province",
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
      ? filter.faskes
      : filter.kecamatan
      ? filter.kecamatan
      : filter.kabkota
      ? filter.kabkota
      : filter.provinsi
      ? filter.provinsi
      : "All",
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
    region_id: regionIdQuery,
  };
  const filterQueryGraph = {
    ...dateQuery,
    region_type: filter.wilayah,
    region_id: regionIdQuery,
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
  const { data: getTotalImmunizationQuery } = useGetTotalImmunizationQuery(
    filterQuery,
    optionQuery
  );
  const { data: getDoPercentageDPHTHBHIBQuery } =
    useGetDoPercentageDPHTHBHIBQuery(filterQuery, optionQuery);
  const { data: getDoPercentageCampakRubelaQuery } =
    useGetDoPercentageCampakRubelaQuery(filterQuery, optionQuery);
  const { data: getTotalImmunizationByVaccineTypeQuery1 } =
    useGetTotalImmunizationByVaccineTypeQuery(
      { ...filterQuery, vaccine_type: 1 },
      optionQuery
    );
  const { data: getTotalImmunizationByVaccineTypeQuery2 } =
    useGetTotalImmunizationByVaccineTypeQuery(
      { ...filterQuery, vaccine_type: 2 },
      optionQuery
    );
  const { data: getTotalImmunizationByVaccineTypeQuery3 } =
    useGetTotalImmunizationByVaccineTypeQuery(
      { ...filterQuery, vaccine_type: 3 },
      optionQuery
    );
  const { data: getTotalImmunizationByVaccineTypeQuery4 } =
    useGetTotalImmunizationByVaccineTypeQuery(
      { ...filterQuery, vaccine_type: 4 },
      optionQuery
    );
  const { data: getTotalScopeQuery } = useGetTotalScopeQuery(
    { ...filterQuery, vaccine_type: filter.tipe_vaksin1 },
    optionQueryTotal
  );
  const { data: getTotalHighestScopeQuery } = useGetTotalHighestScopeQuery(
    { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin1 },
    optionQueryTotal
  );
  const { data: getTotalLowestScopeQuery } = useGetTotalLowestScopeQuery(
    { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin1 },
    optionQueryTotal
  );
  const { data: getPercentageTotalImmunizationQuery } =
    useGetPercentageTotalImmunizationQuery(
      { ...filterQueryGraphPercentage, vaccine_type: filter.tipe_vaksin1 },
      optionQuery
    );
  const { data: getSetScopePercentagePerMonthQuery } =
    useGetScopePercentagePerMonthQuery(
      {
        ...filterQueryGraph,
        vaccine_type: filter.tipe_vaksin2,
        is_kumulatif: filter.jenis_tren === "kumulatif" ? true : false,
      },
      optionQuery
    );
  const { data: getSetSummaryScopePercentageQuery } =
    useGetSummaryScopePercentageQuery(
      {
        ...filterQueryGraph,
        vaccine_type: filter.tipe_vaksin2,
        is_kumulatif: filter.jenis_tren === "kumulatif" ? true : false,
      },
      optionQuery
    );
  const { data: getTotalScopeByVaccineTypeQuery } =
    useGetTotalScopeByVaccineTypeQuery(
      { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin3 },
      optionQuery
    );
  const { data: getTotalHighestScopeByVaccineTypeQuery } =
    useGetTotalHighestScopeByVaccineTypeQuery(filterQueryGraph, optionQuery);
  const { data: getTotalLowestScopeByVaccineTypeQuery } =
    useGetTotalLowestScopeByVaccineTypeQuery(filterQueryGraph, optionQuery);
  const { data: getExceedTargetPerVaccineQuery } =
    useGetExceedTargetPerVaccineQuery(filterQueryGraph, optionQuery);
  const { data: getInExceedTargetPerVaccineQuery } =
    useGetInExceedTargetPerVaccineQuery(filterQueryGraph, optionQuery);
  const { data: getSummaryImmunizationPerVaccineQuery } =
    useGetSummaryImmunizationPerVaccineQuery(filterQueryGraph, optionQuery);
  // const { data: getMaxImmunizationByAgeQuery1 } = useGetMaxImmunizationByAgeQuery({ ...filterQueryGraph, age_type: 1 }, optionQuery)
  const { data: getMaxImmunizationByAgeQuery2 } =
    useGetMaxImmunizationByAgeQuery(
      { ...filterQueryGraph, age_type: 2 },
      optionQuery
    );
  const { data: getMaxImmunizationByAgeQuery3 } =
    useGetMaxImmunizationByAgeQuery(
      { ...filterQueryGraph, age_type: 3 },
      optionQuery
    );
  // const { data: getHighestImmunizationByAgeQuery } = useGetHighestImmunizationByAgeQuery({ ...filterQueryGraph, age_type: filter.tipe_umur }, optionQuery)
  const { data: getSummaryImmunizationByAgeQuery } =
    useGetSummaryImmunizationByAgeQuery(filterQueryGraph, optionQuery);
  const { data: getAverageImmunizationByGenderQuery } =
    useGetAverageImmunizationByGenderQuery(filterQueryGraph, optionQuery);
  const { data: getImmunizationWithHighetMaleRecivientQuery } =
    useGetImmunizationWithHighetMaleRecivientQuery(
      filterQueryGraph,
      optionQuery
    );
  const { data: getImmunizationWithHighetFemaleRecivientQuery } =
    useGetImmunizationWithHighetFemaleRecivientQuery(
      filterQueryGraph,
      optionQuery
    );
  const { data: getSummaryImmunizationPerGenderQuery } =
    useGetSummaryImmunizationPerGenderQuery(filterQueryGraph, optionQuery);

  const dataGraphRegionalRoutineImmunizationCoverageTrend1 = [
    {
      title: `Total Cakupan Imunisasi Rutin Lengkap Nasional Tahun ${
        getTotalScopeQuery?.data?.year || filter.tahun
      }`,
      value: <div>{formatNumber(getTotalScopeQuery?.data?.pct || 0)}%</div>,
      regional: <></>,
    },
    {
      title: `Cakupan Tertinggi Tahun ${
        getTotalHighestScopeQuery?.data?.year || filter.tahun
      }`,
      value: (
        <div className="font-bold">
          {formatNumber(getTotalHighestScopeQuery?.data?.pct || 0)}%
        </div>
      ),
      regional: (
        <div>
          {getTotalHighestScopeQuery?.data?.provinsi !== "All"
            ? getTotalHighestScopeQuery?.data?.provinsi
            : ""}
        </div>
      ),
    },
    {
      title: `Cakupan Terendah Tahun ${
        getTotalHighestScopeQuery?.data?.year || filter.tahun
      }`,
      value: (
        <div className="font-bold">
          {formatNumber(getTotalLowestScopeQuery?.data?.pct || 0)}%
        </div>
      ),
      regional: (
        <div>
          {getTotalLowestScopeQuery?.data?.provinsi !== "All"
            ? getTotalLowestScopeQuery?.data?.provinsi
            : ""}
        </div>
      ),
    },
  ];
  const dataGraphRegionalRoutineImmunizationCoverageTrend2 = [
    {
      title: `Cakupan Imunisasi Baduta Lengkap`,
      value: (
        <div>
          {formatNumber(getTotalScopeByVaccineTypeQuery?.data?.pct || 0)}%
        </div>
      ),
      regional: (
        <div>
          Jumlah Cakupan:{" "}
          {formatNumber(getTotalScopeByVaccineTypeQuery?.data?.total || 0)}
        </div>
      ),
    },
    {
      title: `Cakupan Imunisasi Tertinggi`,
      value: (
        <div>{getTotalHighestScopeByVaccineTypeQuery?.data?.vaccine || ""}</div>
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
          {formatNumber(getTotalHighestScopeByVaccineTypeQuery?.data?.pct || 0)}
          %
        </div>
      ),
    },
    {
      title: `Cakupan Imunisasi Terendah`,
      value: (
        <div>
          {getTotalLowestScopeByVaccineTypeQuery?.data?.vaccine === "ALL"
            ? "Baduta Lengkap"
            : getTotalLowestScopeByVaccineTypeQuery?.data?.vaccine}
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
          {formatNumber(getTotalLowestScopeByVaccineTypeQuery?.data?.pct || 0)}%
        </div>
      ),
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

  console.log(
    getSummaryImmunizationPerVaccineQuery?.data?.map((r: any) => r?.vaccine),
    "sdsdsd"
  );
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
            <div className="flex flex-col gap-4 text-sm">
              <div className={`pt-8 ${openSans.className}`}>
                UPDATE TERAKHIR: 23 SEPTEMBER 2023
              </div>
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
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-4">
                <ChildSummaryImmunization
                  className={`px-4 border rounded-lg ${styles.scoreCardPurple}`}
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi Baduta"
                  value={formatNumber(
                    getTotalImmunizationQuery?.data?.total || 0
                  )}
                />
                <ChildSummaryImmunization
                  className={`px-4 border rounded-lg ${styles.scoreCardYellow}`}
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title={"Persentase Drop Out \nDPT-HB-Hib"}
                  value={`${formatNumber(
                    getDoPercentageDPHTHBHIBQuery?.data?.pct || 0
                  )}%`}
                  percent={getDoPercentageDPHTHBHIBQuery?.data?.pct || 0}
                  target={formatNumber(
                    getDoPercentageDPHTHBHIBQuery?.data?.target || 0
                  )}
                  subtitle={" dari "}
                  showLine={false}
                />
                <ChildSummaryImmunization
                  className={`px-4 border rounded-lg ${styles.scoreCardYellow}`}
                  background="#FAC515"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title={"Persentase Drop Out \nCampak Rubela"}
                  value={`${formatNumber(
                    getDoPercentageCampakRubelaQuery?.data?.pct || 0
                  )}%`}
                  percent={getDoPercentageCampakRubelaQuery?.data?.pct || 0}
                  target={formatNumber(
                    getDoPercentageCampakRubelaQuery?.data?.target || 0
                  )}
                  subtitle={" dari "}
                  showLine={false}
                />
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mt-4">
                <ChildSummaryImmunization
                  className={`px-4 border rounded-lg ${openSans.className}`}
                  contentTooltip={<div></div>}
                  title={vaccineTypeOptions[0].label}
                  value={formatNumber(
                    getTotalImmunizationByVaccineTypeQuery1?.data?.total || 0
                  )}
                  percent={
                    getTotalImmunizationByVaccineTypeQuery1?.data?.pct || 0
                  }
                  target={formatNumber(
                    getTotalImmunizationByVaccineTypeQuery1?.data?.target || 0
                  )}
                  subtitle={" dari "}
                />
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
                  value={formatNumber(
                    getTotalImmunizationByVaccineTypeQuery2?.data?.total || 0
                  )}
                  percent={
                    getTotalImmunizationByVaccineTypeQuery2?.data?.pct || 0
                  }
                  target={formatNumber(
                    getTotalImmunizationByVaccineTypeQuery2?.data?.target || 0
                  )}
                  subtitle={" dari "}
                />
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
                  value={formatNumber(
                    getTotalImmunizationByVaccineTypeQuery3?.data?.total || 0
                  )}
                  percent={
                    getTotalImmunizationByVaccineTypeQuery3?.data?.pct || 0
                  }
                  target={formatNumber(
                    getTotalImmunizationByVaccineTypeQuery3?.data?.target || 0
                  )}
                  subtitle={" dari "}
                />
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
                  value={formatNumber(
                    getTotalImmunizationByVaccineTypeQuery4?.data?.total || 0
                  )}
                  percent={
                    getTotalImmunizationByVaccineTypeQuery4?.data?.pct || 0
                  }
                  target={formatNumber(
                    getTotalImmunizationByVaccineTypeQuery4?.data?.target || 0
                  )}
                  subtitle={" dari "}
                />
              </div>
            </div>
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Daerah Imunisasi Baduta"
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={
                        <div className="font-bold md:text-2xl">
                          Grafik Cakupan{" "}
                          <b className="text-primary-2">
                            Imunisasi Baduta Lengkap
                          </b>{" "}
                          pada Provinsi di{" "}
                          <b className="text-primary-2">Indonesia</b> Selama
                          Tahun <b className="text-primary-2">2023</b>
                        </div>
                      }
                      subTitle="Grafik menampilkan hasil cakupan imunisasi baduta lengkap dari 34 provinsi di Indonesia"
                      addOn={
                        <GraphAddOn
                          dataCard={
                            dataGraphRegionalRoutineImmunizationCoverageTrend1
                          }
                        />
                      }
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter1 filterState={filterState} />}
                      graphOptions={graphOptions1(
                        (getPercentageTotalImmunizationQuery?.data || [])?.map(
                          (r: any) => {
                            return {
                              name: r.faskes,
                              data:
                                (
                                  getPercentageTotalImmunizationQuery?.data ||
                                  []
                                )?.map((r: any) =>
                                  formatNumber(r?.pct_immunization || 0)
                                ) || [],
                              type: "bar",
                              label: {
                                show: true,
                                precision: 1,
                                position: "right",
                                formatter: (params: any) =>
                                  `${params.value}% ${formatNumber(
                                    r?.total_immunization || 0
                                  )}`,
                              },
                            };
                          }
                        )
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
                      title={
                        <div className="font-bold md:text-2xl">
                          Data Kumulatif Jumlah Penerima, Cakupan, dan Target
                          Cakupan{" "}
                          <b className="text-primary-2">
                            Imunisasi Baduta Lengkap
                          </b>{" "}
                          pada Baduta Selama Tahun{" "}
                          <b className="text-primary-2">2023</b>
                        </div>
                      }
                      subTitle={`Grafik menampilkan tren cakupan kumulatif penerima imunisasi baduta lengkap pada baduta selama tahun ${filter.tahun}`}
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter2 filterState={filterState} />}
                      threshold={
                        <div className="p-2 sm:w-32 md:w-64 h-fit">
                          <div className="text-sm">
                            Total cakupan kumulatif pada tahun {filter.tahun}
                          </div>
                          <div className="py-2 font-bold text-3xl text-primary">
                            {formatNumber(
                              getSetSummaryScopePercentageQuery?.data?.pct || 0
                            )}
                            %
                          </div>
                          <div>
                            Jumlah Imunisasi Baduta Lengkap:{" "}
                            {formatNumber(
                              getSetSummaryScopePercentageQuery?.data?.total ||
                                0
                            )}
                          </div>
                        </div>
                      }
                      graphOptions={graphOptions2([
                        {
                          name: "% Target Cakupan",
                          data:
                            (
                              getSetScopePercentagePerMonthQuery?.data || []
                            )?.map(
                              (r: any) =>
                                ((r?.target || 0) / 100) * (r?.total || 0)
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
                          data:
                            (
                              getSetScopePercentagePerMonthQuery?.data || []
                            )?.map(
                              (r: any) =>
                                ((r?.pct || 0) / 100) * (r?.total || 0)
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
                        <div className="flex flex-col gap-4 sm:w-32 md:w-64 text-sm">
                          <div
                            className="px-4 py-3 rounded-xl"
                            style={{ boxShadow: "0px 2px 12px 0px #00000014" }}
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
                          <div
                            className="px-4 py-3 rounded-xl"
                            style={{ boxShadow: "0px 2px 12px 0px #00000014" }}
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
                      }
                      graphOptions={graphOptions3(
                        [
                          {
                            name: "% Cakupan",
                            data:
                              (
                                getSummaryImmunizationPerVaccineQuery?.data ||
                                []
                              )?.map(
                                (r: any) =>
                                  ((r?.pct || 0) / 100) * (r?.total || 0)
                              ) || [],
                            type: "line",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(
                                  ((params.value || 0) /
                                    (getSummaryImmunizationPerVaccineQuery?.data ||
                                      [])[params.dataIndex]?.total) *
                                    100
                                )}%`,
                            },
                          },
                          {
                            name: "% Target Cakupan",
                            data:
                              (
                                getSummaryImmunizationPerVaccineQuery?.data ||
                                []
                              )?.map(
                                (r: any) =>
                                  ((r?.pct_treshold || 0) / 100) *
                                  (r?.total || 0)
                              ) || [],
                            type: "line",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(
                                  ((params.value || 0) /
                                    (getSummaryImmunizationPerVaccineQuery?.data ||
                                      [])[params.dataIndex]?.total) *
                                    100
                                )}%`,
                            },
                          },
                          {
                            name: "Cakupan",
                            data:
                              (
                                getSummaryImmunizationPerVaccineQuery?.data ||
                                []
                              )?.map((r: any) => r?.total) || [],
                            type: "bar",
                            label: {
                              show: true,
                              precision: 1,
                              formatter: (params: any) =>
                                `${formatNumber(params.value || 0)}`,
                            },
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
                          <div
                            className="px-4 py-3 rounded-xl"
                            style={{ boxShadow: "0px 2px 12px 0px #00000014" }}
                          >
                            <div className="font-bold text-lg">
                              Rata-Rata Penerima Imunisasi Berdasarkan Jenis
                              Kelamin
                            </div>
                            <GraphEcharts graphOptions={ageChartOptions} />
                          </div>
                          {dataGraphRegionalRoutineImmunizationCoverageTrend4.map(
                            (r, i) => (
                              <div
                                className="px-4 py-3 rounded-xl"
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
                            )
                          )}
                        </div>
                      }
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter5 filterState={filterState} />}
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

export default RoutineBadutaImmunization;
