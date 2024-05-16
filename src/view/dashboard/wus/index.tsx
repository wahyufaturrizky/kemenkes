"use client";

import Image from "next/image";
import { useState } from "react";
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
  // dataGraphRegionalRoutineImmunizationCoverageTrend,
  dataMonth,
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
} from "@/lib/services/wus";
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png";
import { graphOptions1 } from "../routine-baduta-immunization/graphOptions";

import { formatNumber } from "@/helpers";

const Wus = () => {
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

  // console.log(getTotalImmunizationFertileQuery, "isi data");

  const dataGraphRegionalRoutineImmunizationCoverageTrend = [
    {
      title: "Total Cakupan Imunisasi Rutin Lengkap Nasional Tahun 2023",
      value: "80",
      regional: "",
    },
    {
      title: "Cakupan Tertinggi Tahun 2023",
      value: "70",
      regional: "Jawa Tengah",
    },
    {
      title: "Cakupan Terendah Tahun 2023",
      value: 0,
      regional: "Papua Pegunungan",
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
          <div>
            <div className="flex flex-col gap-4 text-sm">
              <div className="pt-8">UPDATE TERAKHIR: 23 SEPTEMBER 2023</div>
              <div className="font-bold text-primary-1 text-xl md:text-3xl">
                Imunisasi Rutin WUS
              </div>
              <div>
                Menampilkan data cakupan imunisasi rutin WUS berdasarkan
                ...............
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunization filterState={filterState} />
            </div>
            <div className="py-6"></div>
            <div>
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
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi Td WUS"
                  value={
                    formatNumber(
                      getTotalImmunizationTdWusQuery?.data?.ytd_total_td_wus
                    ) || "0"
                  }
                />
                <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi Td WUS Ibu Hamil"
                  value={
                    formatNumber(
                      getTotalImmunizationTdWusPregnantQuery?.data
                        ?.ytd_total_td_wus_pregnant
                    ) || "0"
                  }
                />
                <ChildSummaryImmunization
                  className="px-4 border rounded-lg"
                  background="#9F1AB1"
                  classNameTitle="text-white"
                  classNameValue="text-4xl text-white"
                  title="Total Penerima Imunisasi Td WUS Ibu Tidak Hamil"
                  value={
                    formatNumber(
                      getTotalImmunizationTdWusFertileQuery?.data
                        ?.ytd_total_td_wus_fertile
                    ) || "0"
                  }
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
                  title={"Status T2+"}
                  value={
                    formatNumber(
                      getTotalImmunizationQuery?.data?.ytd_total_t2plus
                    ) || "0"
                  }
                  percent={
                    getTotalImmunizationQuery?.data?.ytd_pct_t2plus || 0
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationQuery?.data?.immunization_target_cnt
                    ) || 0
                  }
                  subtitle={"%  dari "}
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
                      ?.ytd_pct_t2plus_pregnant || 0
                  }
                  target={
                    formatNumber(
                      getTotalImmunizationPregnantQuery?.data
                        ?.immunization_target_cnt_pregnant
                    ) || 0
                  }
                  subtitle={"%  dari "}
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
                  subtitle={"%  dari "}
                />
              </div>
            </div>
            <div className="py-4 pb-12">
              <div className="py-4 pb-12">
                <RoutineImmunizationCoverageTrendGraph
                  title="Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi Bayi "
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
                      // addOn={
                      //   <GraphAddOn
                      //     dataCard={
                      //       dataGraphRegionalRoutineImmunizationCoverageTrend
                      //     }
                      //   />
                      // }
                      />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wus;
