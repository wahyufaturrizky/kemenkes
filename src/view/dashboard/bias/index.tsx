"use client";

import Image from "next/image";
import {
  Banner,
  BannerHighlightFooter,
  BannerText,
  Navbar,
  Sidebar,
} from "@/components";
import FilterSummaryImmunizationWus from "@/view/home/components/FilterWus";
import { useState } from "react";
import { dataMonth } from "@/utils/constants";
import {
  ChildSummaryImmunization,
  GraphRoutineImmunizationCoverageTrend,
  RoutineImmunizationCoverageTrendGraph,
  GraphAddOn,
} from "@/view/home";
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png";
import { formatNumber } from "@/helpers";

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
} from "@/lib/services/wus";
import {
  useGetTotalCampakRubelaQuery,
  useGetTotalDt1Query,
  useGetTotalFullBiasQuery,
  useGetTotalRecipientsQuery,
} from "@/lib/services/bias";
import { Filter1, Filter2 } from "../routine-baduta-immunization/Filter";
import {
  graphOptions1,
  graphOptions2,
} from "../routine-baduta-immunization/graphOptions";

const Bias = () => {
  const filterState = useState({
    tahun: 2024,
    bulan: dataMonth.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: "",
    kabkota: "",
    kecamatan: "",
    faskes: "",
    wilayah: "All",
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
    faskes_parent_id:
      filter.provinsi !== "" &&
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
    region_type: "province",
    faskes_parent_id: 11,
    faskes_id: 11,
    women_category: "All",
  };
  const filterQueryTotalCoverage = {
    ...filterQueryTotal,
    faskes_desc: "NASIONAL",
  };
  const filterQueryTotalCoverageHighest = {
    ...filterQueryTotalCoverage,
    faskes_desc: "JAWA TIMUR",
  };
  const filterQueryTotalCoverageLowest = {
    ...filterQueryTotalCoverage,
    faskes_desc: "PAPUA PEGUNUNGAN",
  };
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
  const filterFullBias = {
    ...dateQuery,
    region_type: "PROVINSI",
    faskes_id: 11,
  };

  const { data: getTotalRecipients } = useGetTotalRecipientsQuery(
    filterFullBias,
    optionQuery
  );

  const { data: getTotalFullBias } = useGetTotalFullBiasQuery(
    filterFullBias,
    optionQuery
  );
  const { data: getTotalCampakRubela } = useGetTotalCampakRubelaQuery(
    filterFullBias,
    optionQuery
  );
  const { data: getTotalDt1 } = useGetTotalDt1Query(
    filterFullBias,
    optionQuery
  );

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
  const { data: getTotalImmunizationTotalCoverageQuery } =
    useGetTotalImmunizationTotalCoverageQuery(filterQueryTotalCoverage);
  const { data: getTotalImmunizationTotalCoverageHighestQuery } =
    useGetTotalImmunizationTotalCoverageHighestQuery(
      filterQueryTotalCoverageHighest
    );
  const { data: getTotalImmunizationTotalCoverageLowestQuery } =
    useGetTotalImmunizationTotalCoverageLowestQuery(
      filterQueryTotalCoverageLowest
    );
  const { data: getTotalImmunizationTotalCumulativeCoverageQuery } =
    useGetTotalImmunizationTotalCumulativeCoverageQuery(
      filterCumulativeCoverage
    );
  const { data: getTotalImmunizationTotalCumulativeCoverageRecipientsQuery } =
    useGetTotalImmunizationTotalCumulativeCoverageRecipientsQuery(
      filterCumulativeCoverageRecipients
    );
  const { data: getDistributionStatusChartQuery } =
    useGetDistributionStatusChartQuery(filterQueryTotal);
  const { data: getDistributionStatusPregnantChartQuery } =
    useGetDistributionStatusPregnantChartQuery(filterQueryTotal);

  const dataGraphRegionalRoutineImmunizationCoverageTrend = [
    {
      title: "Total Cakupan T2+  Nasioanl Tahun 2024",
      value:
        getTotalImmunizationTotalCoverageQuery?.data.ytd_pct_total_t1 + "%",
      regional: "",
    },
    {
      title: "Cakupan Tertinggi Tahun 2024",
      value:
        getTotalImmunizationTotalCoverageHighestQuery?.data?.ytd_pct_total_t1 +
        "%",

      regional:
        getTotalImmunizationTotalCoverageHighestQuery?.data?.faskes_desc,
    },
    {
      title: "Cakupan Terendah Tahun 2024",
      value:
        getTotalImmunizationTotalCoverageLowestQuery?.data?.ytd_pct_total_t1,

      regional: getTotalImmunizationTotalCoverageLowestQuery?.data?.faskes_desc,
    },
  ];
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
            <div className="flex flex-col gap-4 text-sm">
              <div className="pt-8">UPDATE TERAKHIR: 23 SEPTEMBER 2023</div>
              <div className="font-bold text-primary-1 text-xl md:text-3xl">
                Imunisasi Rutin BIAS
              </div>
              <div>
                Menampilkan data cakupan imunisasi rutin anak usia sekolah
                berdasarkan jenis imunisasi, daerah cakupan, usia pemberian, dan
                jenis kelammin bayi.
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunizationWus filterState={filterState} />
            </div>
            <div className="py-6"></div>

            <div>
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
                  className="px-4 border rounded-lg"
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi BIAS"
                  value={formatNumber(getTotalRecipients?.data?.total) || "0"}
                />
                <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  contentTooltip={<div></div>}
                  title="Bias Lengkap"
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
                  title={"DT1 - Kelas 1"}
                  value={formatNumber(getTotalDt1?.data?.total) || "0"}
                  percent={getTotalDt1?.data?.pct || "0"}
                  target={formatNumber(getTotalDt1?.data?.target) || "0"}
                  subtitle={"%  dari "}
                />
                {/* <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  titleIcon={
                    <Image
                      alt="satusehat"
                      src={VaccinateNudge.src}
                      width={24}
                      height={24}
                    />
                  }
                  title={"Td1 - Kelas 2"}
                  value={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.ytd_total_t2plus_fertile
                    ) || "0"
                  }
                  percent={
                    getTotalImmunizationFertileQuery?.data
                      ?.ytd_pct_t2plus_fertile || "0"
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.immunization_target_cnt_fertile
                    ) || "0"
                  }
                  subtitle={"%  dari "}
                /> */}
                {/* <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  titleIcon={
                    <Image
                      alt="satusehat"
                      src={VaccinateNudge.src}
                      width={24}
                      height={24}
                    />
                  }
                  title={"Td2 - Kelas 5"}
                  value={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.ytd_total_t2plus_fertile
                    ) || "0"
                  }
                  percent={
                    getTotalImmunizationFertileQuery?.data
                      ?.ytd_pct_t2plus_fertile || "0"
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.immunization_target_cnt_fertile
                    ) || "0"
                  }
                  subtitle={"%  dari "}
                /> */}
                {/* <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  titleIcon={
                    <Image
                      alt="satusehat"
                      src={VaccinateNudge.src}
                      width={24}
                      height={24}
                    />
                  }
                  title={"Td3"}
                  value={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.ytd_total_t2plus_fertile
                    ) || "0"
                  }
                  percent={
                    getTotalImmunizationFertileQuery?.data
                      ?.ytd_pct_t2plus_fertile || "0"
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.immunization_target_cnt_fertile
                    ) || "0"
                  }
                  subtitle={"%  dari "}
                /> */}
                {/* <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  titleIcon={
                    <Image
                      alt="satusehat"
                      src={VaccinateNudge.src}
                      width={24}
                      height={24}
                    />
                  }
                  title={"HPV1 - Kelas 5"}
                  value={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.ytd_total_t2plus_fertile
                    ) || "0"
                  }
                  percent={
                    getTotalImmunizationFertileQuery?.data
                      ?.ytd_pct_t2plus_fertile || "0"
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.immunization_target_cnt_fertile
                    ) || "0"
                  }
                  subtitle={"%  dari "}
                /> */}
                {/* <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  titleIcon={
                    <Image
                      alt="satusehat"
                      src={VaccinateNudge.src}
                      width={24}
                      height={24}
                    />
                  }
                  title={"HPV2 - Kelas 6"}
                  value={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.ytd_total_t2plus_fertile
                    ) || "0"
                  }
                  percent={
                    getTotalImmunizationFertileQuery?.data
                      ?.ytd_pct_t2plus_fertile || "0"
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationFertileQuery?.data
                        ?.immunization_target_cnt_fertile
                    ) || "0"
                  }
                  subtitle={"%  dari "}
                /> */}
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
                      opts={{
                        height: 900
                      }}
                      graphOptions={graphOptions1({
                        // @ts-ignore
                        name: "Target Cakupan per Daerah = 100%",
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
                            `${params.value}%`,
                        },
                      }
                        , (
                          getTotalImmunizationTotalCumulativeCoverageQuery?.data ||
                          []
                        )
                          ?.sort((a: any, b: any) => a.faskes_desc - b.faskes_desc)
                          ?.map((r: any) => r.faskes_desc)
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
                          <b className="text-primary-2">T2+</b> pada Wanita Uaia
                          Subur atau Ibu Hamil Selama Tahun{" "}
                          <b className="text-primary-2">{filter.tahun}</b>
                        </div>
                      }
                      subTitle={`Grafik menampilkan tren cakupan kumulatif penerima imunisasi WUS`}
                      variant="private"
                      filterState={filterState}
                      filterComp={<Filter2 filterState={filterState} />}
                      // threshold={
                      //   <div className="p-2 sm:w-32 md:w-64 h-fit">
                      //     <div className="text-sm">
                      //       Total cakupan kumulatif pada tahun {filter.tahun}
                      //     </div>
                      //     <div className="py-2 font-bold text-3xl text-primary">
                      //       {getSetSummaryScopePercentageQuery?.data?.pct}%
                      //     </div>
                      //     <div>
                      //       Jumlah Imunisasi Baduta Lengkap:{" "}
                      //       {formatNumber(
                      //         getSetSummaryScopePercentageQuery?.data?.total ||
                      //           0
                      //       )}
                      //     </div>
                      //   </div>
                      // }
                      graphOptions={graphOptions2([
                        {
                          name: "% Cakupan",
                          data:
                            (
                              getTotalImmunizationTotalCumulativeCoverageRecipientsQuery?.data ||
                              []
                            )?.map((r: any) => r?.ytd_pct_total_t1) || [],
                          type: "line",
                        },
                        {
                          name: "% Target Cakupan",
                          data:
                            (
                              getTotalImmunizationTotalCumulativeCoverageRecipientsQuery?.data ||
                              []
                            )?.map((r: any) => r?.pct_target_threshold_t1) ||
                            [],
                          type: "line",
                        },
                        {
                          name: "Jumlah Penerima Imunisasi",
                          data:
                            (
                              getTotalImmunizationTotalCumulativeCoverageRecipientsQuery?.data ||
                              []
                            )?.map((r: any) => r?.ytd_total_t1) || [],
                          type: "bar",
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

export default Bias;
