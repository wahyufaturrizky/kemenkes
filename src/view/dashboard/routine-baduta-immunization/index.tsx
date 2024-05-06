"use client";

import Image from "next/image";
import {
  Banner,
  BannerHighlightFooter,
  BannerText,
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
  dataGraphRegionalRoutineImmunizationCoverageTrend,
  dataMonth,
  dataTotalSummaryImmunization,
  vaccineTypeOptions,
} from "@/utils/constants";
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
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png";
import { useState } from "react";
import { graphOptions1, graphOptions2 } from "./graphOptions";

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
    tipe_vaksin: 1,
    tipe_umur: 1,
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
  const filterQueryGraph = {
    ...dateQuery,
    region_type: filter.wilayah,
    region_id:
      filter.wilayah === "faskes"
        ? filter.faskes
        : filter.wilayah === "district"
        ? filter.kecamatan
        : filter.wilayah === "city"
        ? filter.kabkota
        : filter.wilayah === "provinsi"
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
  const optionQueryGraph = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      !filter.bulan ||
      !filter.wilayah ||
      (!filter.tipe_vaksin &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };
  const optionQueryTotal = {
    refetchOnMountOrArgChange: true,
    skip: !filter.wilayah || !filter.tipe_vaksin,
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
    { ...filterQuery, vaccine_type: filter.tipe_vaksin },
    optionQueryTotal
  );
  const { data: getTotalHighestScopeQuery } = useGetTotalHighestScopeQuery(
    { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin },
    optionQueryTotal
  );
  const { data: getTotalLowestScopeQuery } = useGetTotalLowestScopeQuery(
    { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin },
    optionQueryTotal
  );
  const { data: getPercentageTotalImmunizationQuery } =
    useGetPercentageTotalImmunizationQuery(
      { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin },
      optionQuery
    );
  const { data: getSetScopePercentagePerMonthQuery } =
    useGetScopePercentagePerMonthQuery(
      { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin },
      optionQuery
    );
  const { data: getSetSummaryScopePercentageQuery } =
    useGetSummaryScopePercentageQuery(
      { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin },
      optionQuery
    );
  const { data: getTotalScopeByVaccineTypeQuery } =
    useGetTotalScopeByVaccineTypeQuery(
      { ...filterQueryGraph, vaccine_type: filter.tipe_vaksin },
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
  const { data: getMaxImmunizationByAgeQuery } =
    useGetMaxImmunizationByAgeQuery(
      { ...filterQueryGraph, age_type: filter.tipe_umur },
      optionQuery
    );
  const { data: getHighestImmunizationByAgeQuery } =
    useGetHighestImmunizationByAgeQuery(
      { ...filterQueryGraph, age_type: filter.tipe_umur },
      optionQuery
    );
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

  const dataGraphRegionalRoutineImmunizationCoverageTrend = [
    {
      title: `Total Cakupan Imunisasi Rutin Lengkap Nasional Tahun ${
        getTotalScopeQuery?.data?.year || filter.tahun
      }`,
      value: getTotalScopeQuery?.data?.pct || 0,
      regional: "",
    },
    {
      title: `Cakupan Tertinggi Tahun ${
        getTotalHighestScopeQuery?.data?.year || filter.tahun
      }`,
      value: getTotalHighestScopeQuery?.data?.pct || 0,
      regional: getTotalHighestScopeQuery?.data?.provinsi || "",
    },
    {
      title: `Cakupan Terendah Tahun ${
        getTotalHighestScopeQuery?.data?.year || filter.tahun
      }`,
      value: getTotalLowestScopeQuery?.data?.pct || 0,
      regional: getTotalLowestScopeQuery?.data?.provinsi || "",
    },
  ];
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
              <div className="pt-8">UPDATE TERAKHIR: 23 SEPTEMBER 2023</div>
              <div className="font-bold text-primary-1 text-xl md:text-3xl">
                Imunisasi Rutin Baduta
              </div>
              <div>
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
              <div>
                Ringkasan berisi data total penerima imunisasi rutin baduta dan
                jenis imunisasi rutin baduta terhadap target cakupan yang sudah
                ditentukan.
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-4">
                <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi Baduta"
                  value={getTotalImmunizationQuery?.data?.total || "0"}
                />
                <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  background="#FAC515"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title={"Persentase Drop Out \nDPT-HB-Hib"}
                  value={`${getDoPercentageDPHTHBHIBQuery?.data?.pct || 0}%`}
                  percent={getDoPercentageDPHTHBHIBQuery?.data?.pct || "0"}
                  target={getDoPercentageDPHTHBHIBQuery?.data?.target || "0"}
                  subtitle={" dari "}
                  showLine={false}
                />
                <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  background="#FAC515"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title={"Persentase Drop Out \nCampak Rubela"}
                  value={`${getDoPercentageCampakRubelaQuery?.data?.pct || 0}%`}
                  percent={getDoPercentageCampakRubelaQuery?.data?.pct || "0"}
                  target={getDoPercentageCampakRubelaQuery?.data?.target || "0"}
                  subtitle={" dari "}
                  showLine={false}
                />
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 mt-4">
                <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  contentTooltip={<div></div>}
                  title={vaccineTypeOptions[0].label}
                  value={
                    getTotalImmunizationByVaccineTypeQuery1?.data?.total || "0"
                  }
                  percent={
                    getTotalImmunizationByVaccineTypeQuery1?.data?.pct || "0"
                  }
                  target={
                    getTotalImmunizationByVaccineTypeQuery1?.data?.target || "0"
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
                  title={vaccineTypeOptions[1].label}
                  value={
                    getTotalImmunizationByVaccineTypeQuery2?.data?.total || "0"
                  }
                  percent={
                    getTotalImmunizationByVaccineTypeQuery2?.data?.pct || "0"
                  }
                  target={
                    getTotalImmunizationByVaccineTypeQuery2?.data?.target || "0"
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
                  title={vaccineTypeOptions[2].label}
                  value={
                    getTotalImmunizationByVaccineTypeQuery3?.data?.total || "0"
                  }
                  percent={
                    getTotalImmunizationByVaccineTypeQuery3?.data?.pct || "0"
                  }
                  target={
                    getTotalImmunizationByVaccineTypeQuery3?.data?.target || "0"
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
                  title={vaccineTypeOptions[3].label}
                  value={
                    getTotalImmunizationByVaccineTypeQuery4?.data?.total || "0"
                  }
                  percent={
                    getTotalImmunizationByVaccineTypeQuery4?.data?.pct || "0"
                  }
                  target={
                    getTotalImmunizationByVaccineTypeQuery4?.data?.target || "0"
                  }
                  subtitle={" dari "}
                />
              </div>
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
                          Data Cakupan{" "}
                          <b className="text-primary-2">
                            Imunisasi Dasar Lengkap
                          </b>{" "}
                          pada Provinsi di{" "}
                          <b className="text-primary-2">Indonesia</b> Selama
                          Tahun <b className="text-primary-2">2023</b>
                        </div>
                      }
                      subTitle="Grafik menampilkan hasil cakupan semua data imunisasi rutin lengkap dari 34 provinsi di Indonesia"
                      addOn={
                        <GraphAddOn
                          dataCard={
                            dataGraphRegionalRoutineImmunizationCoverageTrend
                          }
                        />
                      }
                      variant="private"
                      filterState={filterState}
                      graphOptions={graphOptions1(
                        (getPercentageTotalImmunizationQuery?.data || [])?.map(
                          (r: any) => {
                            return {
                              name: r.faskes,
                              data:
                                (
                                  getPercentageTotalImmunizationQuery?.data ||
                                  []
                                )?.map((r: any) => r?.total_immunization) || [],
                              type: "bar",
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
                title="Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi Bayi "
                subTitle="Grafik di bawah menampilkan cakupan program imunisasi rutin lengkap secara kumulatif atau bulanan. Pilih filter yang sesuai untuk menyesuaikan data yang diinginkan atau unduh grafik dengan memilih tombol Unduh."
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      title={
                        <div className="font-bold md:text-2xl">
                          Data Kumulatif Jumlah Penerima, Cakupan, dan Target
                          Cakupan{" "}
                          <b className="text-primary-2">
                            Imunisasi Dasar Lengkap
                          </b>{" "}
                          pada Bayi Selama Tahun{" "}
                          <b className="text-primary-2">2023</b>
                        </div>
                      }
                      subTitle="Grafik menampilkan tren cakupan kumulatif penerima antigen baru lengkap selama tahun 2023"
                      variant="private"
                      filterState={filterState}
                      threshold={
                        <div className="p-2 sm:w-32 md:w-64 h-fit">
                          <div className="text-sm">
                            Total cakupan kumulatif pada tahun 2023
                          </div>
                          <div className="py-2 font-bold text-3xl text-primary">
                            {getSetSummaryScopePercentageQuery?.data?.pct}%
                          </div>
                          <div>Jumlah antigen baru lengkap: 154.167</div>
                        </div>
                      }
                      graphOptions={graphOptions2([
                        {
                          name: "% Cakupan",
                          data:
                            (
                              getSetScopePercentagePerMonthQuery?.data || []
                            )?.map((r: any) => r?.total) || [],
                          type: "bar",
                        },
                        {
                          name: "% Target Cakupan",
                          data:
                            (
                              getSetScopePercentagePerMonthQuery?.data || []
                            )?.map((r: any) => r?.total) || [],
                          type: "bar",
                        },
                        {
                          name: "Jumlah Penerima Imunisasi",
                          data:
                            (
                              getSetScopePercentagePerMonthQuery?.data || []
                            )?.map((r: any) => r?.total) || [],
                          type: "bar",
                        },
                      ])}
                    />
                  </div>
                }
              />
            </div>
            {/* <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi Bayi "
                subTitle=""
                graph={
                  <>
                    <div className="my-4 p-4 md:p-8 border rounded-lg">
                      <GraphRoutineImmunizationCoverageTrend
                        title={<div className="font-bold md:text-2xl">Data Cakupan <b className="text-primary-2">Imunisasi Dasar Lengkap</b> pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">2023</b></div>}
                        subTitle="Grafik menampilkan hasil cakupan semua data imunisasi rutin lengkap dari 34 provinsi di Indonesia"
                        addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend} />} variant="private" />
                    </div>
                    <div className="my-4 p-4 md:p-8 border rounded-lg">
                      <GraphRoutineImmunizationCoverageTrend
                        title={<div className="font-bold md:text-2xl">Data Cakupan <b className="text-primary-2">Imunisasi Dasar Lengkap</b> pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">2023</b></div>}
                        subTitle="Grafik menampilkan hasil cakupan semua data imunisasi rutin lengkap dari 34 provinsi di Indonesia"
                        addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend} />} variant="private" />
                    </div>
                  </>
                }
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineBadutaImmunization;
