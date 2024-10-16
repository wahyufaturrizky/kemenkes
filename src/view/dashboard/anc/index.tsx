"use client";

import React from "react";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import AnalisisANC from "./analisisAnc";
import { ancGraphOptions1, dataMonth, dataTabBaduta } from "@/utils/constants";
import FilterSummaryImmunizationAnc from "@/view/home/components/FilterAnc";
import { formatNumber } from "@/helpers";
import Header from "@/components/header";
import styles from "./anc.module.css";
import SectionHeader from "@/components/sectionHeader";
import Scorecard1 from "@/components/scorecard1";
import Scorecard2 from "@/components/scorecard2";
import Scorecard3 from "@/components/scorecard3";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  useGetTotalImmunizationAncQuery,
  useGetTopDiseaseQuery,
} from "@/lib/services/anc";
import Card8Disease from "@/components/card8Disease";
import TabsBias from "@/components/tabsBias";
import FilterSummaryImmunizationWus from "@/view/home/components/FilterWus";
import TableAnc from "./tableAnc";
import { Select } from "@/components";
// import MapComponent from "@/components/map-component";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import MapAnc2 from "@/components/mapAnc2";
import { Filter1 } from "./FilterAnc";

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
});

export default function Anc() {
  const [active, setActive] = useState(false);
  const [analisis, setAnalisis] = useState(false);
  const [isTableData, setIsTableData] = useState(false);
  const handleDataFromChild = (data: boolean) => {
    setAnalisis(data);
  };
  const handleAnalisis = () => {
    setAnalisis(false);
  };

  const handleTable = () => {
    setIsTableData(!isTableData);
  };

  const filterState = useState({
    // tahun: 2023,
    tahun: new Date().getFullYear(),
    bulan: dataMonth.find((r, i) => i === new Date().getMonth())?.value,
    provinsi: "",
    kabkota: "",
    kecamatan: "",
    jenis_sarana: "",
    faskes: "",
    wilayah: "ALL",
    wilayah2: "PROVINSI",
    wilayah_name: "Provinsi",
    kewilayahan_type: 0,
    indikator: "Indikator Program",
    subIndikator: "Persentase Ibu Hamil K1",
    // tipe_vaksin: "bias",
    // nama_vaksin: "BIAS  Lengkap",
    // tipe_vaksin2: "bias",
    // tipe_vaksin3: "bias",
    // tipe_vaksin4: "bias",
    // tipe_vaksin5: "bias",
    // tren_type: "kumulatif",
  });
  const [filter] = filterState;
  const optionQuery = {
    refetchOnMountOrArgChange: true,
    skip:
      !filter.tahun ||
      (!filter.bulan &&
        (!filter.provinsi || !filter.kabkota || !filter.kecamatan)),
  };
  const dateQuery = {
    year: filter.tahun,
    month: filter.bulan,
  };
  const regionType = {
    region_type: filter.faskes
      ? "village"
      : filter.kecamatan
      ? "district"
      : filter.kabkota
      ? "city"
      : filter.provinsi
      ? "province"
      : "All",
  };

  const faksesParentId = {
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
  };

  const faskesId = {
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

  const filterTotal = {
    ...dateQuery,
    ...regionType,
    ...faskesId,
    ...faksesParentId,
    kewilayahan_type: filter.kewilayahan_type,
  };

  const createFilter = (
    // filterTotal: any,
    diagramType: string,
    withPct: boolean
  ) => ({
    ...filterTotal,
    diagram_type: diagramType,
    with_pct: withPct,
  });

  const filterSasaranIbuHamil = createFilter("preg_target", false);
  const filterIbuHamilTercatat = createFilter("preg_registered", true);
  const filterK1 = createFilter("k1", true);
  const filterK1Akses = createFilter("k1_akses", true);
  const filterK1Murni = createFilter("k1_murni", true);
  const filterK1Usg = createFilter("k1_usg", true);
  const filterK4 = createFilter("k4", true);
  const filterK5 = createFilter("k5", true);
  const filterK5Usg = createFilter("k5_usg", true);
  const filterK6 = createFilter("k6", true);
  const filterTenT = createFilter("10t", true);
  const filterFourT = createFilter("4t", true);
  const filterUsg = createFilter("usg", true);
  const filterKmk = createFilter("kmk", true);
  const filterKek = createFilter("kek", true);
  const filterKekRcv = createFilter("kek_rcv_nutri", true);
  const filterKekCns = createFilter("kek_cns_nutri", true);
  const filterKekPmt = createFilter("kek_pmt_lokal", true);
  const filterHb = createFilter("hb", true);
  const filterAnemiaRcv = createFilter("anemia_rcv_ttd_oral", true);
  const filterAnemiaInc = createFilter("anemia_inc_hb", true);
  const filterAnemiaRef = createFilter("anemia_ref_fkrtl", true);
  const filterTTdRcv = createFilter("ttd_rcv", true);
  const filterTTdCns = createFilter("ttd_cns", true);
  const filterClass = createFilter("class", true);
  const filterTd = createFilter("td", true);
  const filterKia = createFilter("kia", true);
  const filterDiukur = createFilter("measured", true);
  const filterTekananDarah = createFilter("blood_pressure", true);
  const filterLila = createFilter("lila", true);
  const filterTinggiFundus = createFilter("fundal_height", true);
  const filterDjj = createFilter("djj", true);
  const filterTt = createFilter("tt", true);
  const filterLab = createFilter("lab", true);
  const filterTatalaksana = createFilter("case_mng", true);
  const filterKonseling = createFilter("counseling", true);

  // SCORECARD
  const { data: SasaranIbuHamil, isFetching: isLoadingTotalImmunization } =
    useGetTotalImmunizationAncQuery(filterSasaranIbuHamil, optionQuery);
  const { data: IbuHamilTercatat, isFetching: isLoadingIbuHamilTercatat } =
    useGetTotalImmunizationAncQuery(filterIbuHamilTercatat, optionQuery);
  const { data: K1, isFetching: isLoadingK1 } = useGetTotalImmunizationAncQuery(
    filterK1,
    optionQuery
  );
  const { data: K1Akses, isFetching: isLoadingK1Akses } =
    useGetTotalImmunizationAncQuery(filterK1Akses, optionQuery);
  const { data: K1Murni, isFetching: isLoadingK1Murni } =
    useGetTotalImmunizationAncQuery(filterK1Murni, optionQuery);
  const { data: K1Usg, isFetching: isLoadingK1Usg } =
    useGetTotalImmunizationAncQuery(filterK1Usg, optionQuery);
  const { data: K4, isFetching: isLoadingK4 } = useGetTotalImmunizationAncQuery(
    filterK4,
    optionQuery
  );
  const { data: K5, isFetching: isLoadingK5 } = useGetTotalImmunizationAncQuery(
    filterK5,
    optionQuery
  );
  const { data: K5Usg, isFetching: isLoadingK5Usg } =
    useGetTotalImmunizationAncQuery(filterK5Usg, optionQuery);
  const { data: K6, isFetching: isLoadingK6 } = useGetTotalImmunizationAncQuery(
    filterK6,
    optionQuery
  );
  const { data: TenT, isFetching: isLoadingTenT } =
    useGetTotalImmunizationAncQuery(filterTenT, optionQuery);
  const { data: FourT, isFetching: isLoadingFourT } =
    useGetTotalImmunizationAncQuery(filterFourT, optionQuery);
  const { data: Usg, isFetching: isLoadingUsg } =
    useGetTotalImmunizationAncQuery(filterUsg, optionQuery);
  const { data: Kmk, isFetching: isLoadingKmk } =
    useGetTotalImmunizationAncQuery(filterKmk, optionQuery);
  const { data: Kek, isFetching: isLoadingKek } =
    useGetTotalImmunizationAncQuery(filterKek, optionQuery);
  const { data: KekRcv, isFetching: isLoadingKekRcv } =
    useGetTotalImmunizationAncQuery(filterKekRcv, optionQuery);
  const { data: KekCns, isFetching: isLoadingKekCns } =
    useGetTotalImmunizationAncQuery(filterKekCns, optionQuery);
  const { data: KekPmt, isFetching: isLoadingKekPmt } =
    useGetTotalImmunizationAncQuery(filterKekPmt, optionQuery);
  const { data: Hb, isFetching: isLoadingHb } = useGetTotalImmunizationAncQuery(
    filterHb,
    optionQuery
  );
  const { data: AnemiaRcv, isFetching: isLoadingAnemiaRcv } =
    useGetTotalImmunizationAncQuery(filterAnemiaRcv, optionQuery);
  const { data: AnemiaInc, isFetching: isLoadingAnemiaInc } =
    useGetTotalImmunizationAncQuery(filterAnemiaInc, optionQuery);
  const { data: AnemiaRef, isFetching: isLoadingAnemiaRef } =
    useGetTotalImmunizationAncQuery(filterAnemiaRef, optionQuery);
  const { data: TTdRcv, isFetching: isLoadingTTdRcv } =
    useGetTotalImmunizationAncQuery(filterTTdRcv, optionQuery);
  const { data: TTdCns, isFetching: isLoadingTTdCns } =
    useGetTotalImmunizationAncQuery(filterTTdCns, optionQuery);
  const { data: Class, isFetching: isLoadingClass } =
    useGetTotalImmunizationAncQuery(filterClass, optionQuery);
  const { data: Td, isFetching: isLoadingTd } = useGetTotalImmunizationAncQuery(
    filterTd,
    optionQuery
  );
  const { data: Kia, isFetching: isLoadingKia } =
    useGetTotalImmunizationAncQuery(filterKia, optionQuery);
  const { data: Diukur, isFetching: isLoadingDiukur } =
    useGetTotalImmunizationAncQuery(filterDiukur, optionQuery);
  const { data: TekananDarah, isFetching: isLoadingTekananDarah } =
    useGetTotalImmunizationAncQuery(filterTekananDarah, optionQuery);
  const { data: Lila, isFetching: isLoadingLila } =
    useGetTotalImmunizationAncQuery(filterLila, optionQuery);
  const { data: TinggiFundus, isFetching: isLoadingTinggiFundus } =
    useGetTotalImmunizationAncQuery(filterTinggiFundus, optionQuery);
  const { data: Djj, isFetching: isLoadingDjj } =
    useGetTotalImmunizationAncQuery(filterDjj, optionQuery);
  const { data: Tt, isFetching: isLoadingTt } = useGetTotalImmunizationAncQuery(
    filterTt,
    optionQuery
  );
  const { data: Lab, isFetching: isLoadingLab } =
    useGetTotalImmunizationAncQuery(filterLab, optionQuery);
  const { data: Tatalaksana, isFetching: isLoadingTatalaksana } =
    useGetTotalImmunizationAncQuery(filterTatalaksana, optionQuery);
  const { data: Konseling, isFetching: isLoadingKonseling } =
    useGetTotalImmunizationAncQuery(filterKonseling, optionQuery);

  // SCORECARD

  // Mordibilitas
  const { data: TopDisease, isFetching: loadingTopDisease } =
    useGetTopDiseaseQuery(filterTotal, optionQuery);
  // console.log(TopDisease, "isi data");
  // Mordibilitas

  const totalData = ancGraphOptions1.map((option) => option.ya + option.tidak);
  return (
    <div
      className={`flex flex-col items-center p-[30px]  ${styles.jakartaFont}`}
    >
      <Header
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Layanan Ibu Hamil"
        desc={`Dashboard ini menampilkan:\nmonitoring capaian Indikator ANC berdasarkan data yang dikirim oleh faskes ke SATUSEHAT`}
        space={true}
      />
      {analisis && (
        <div className="flex justify-between items-center w-full my-8">
          <div
            className="bg-primary flex h-9 rounded-[50px] justify-center items-center px-2 whitespace-nowrap  cursor-pointer"
            onClick={handleAnalisis}
          >
            <IoMdArrowBack size={25} color="white" />
            <p className="font-bold text-white pl-1">
              Kembali ke halaman utama
            </p>
          </div>
          <div>
            <div className="flex bg-gray-100 rounded-xl w-max">
              <button
                onClick={() => setActive(false)}
                className={`${
                  active === false ? "bg-white shadow" : ""
                } m-2 p-2 w-52 rounded-xl font-bold text-[#505581] transition`}
              >
                Layanan ANC
              </button>
              <button
                onClick={() => setActive(true)}
                className={`${
                  active === true ? "bg-white shadow" : ""
                } m-2 p-2 w-52 rounded-xl font-bold text-[#505581] transition`}
              >
                Intervensi & Morbiditas
              </button>
            </div>
          </div>
        </div>
      )}
      {isTableData && (
        <div className="flex justify-between items-center w-full my-8">
          <div
            className="bg-primary flex h-9 rounded-[50px] justify-center items-center px-2 whitespace-nowrap  cursor-pointer"
            onClick={handleTable}
          >
            <IoMdArrowBack size={25} color="white" />
            <p className="font-bold text-white pl-1">
              Kembali ke halaman utama
            </p>
          </div>
        </div>
      )}
      {!isTableData && (
        <TabsBias
          data={dataTabBaduta}
          variant="private"
          value={filter.kewilayahan_type}
          filterState={filterState}
        />
      )}
      <div className="w-full">
        <FilterSummaryImmunizationWus filterState={filterState} />
      </div>
      {analisis ? (
        <AnalisisANC btn={active} filterState={filterState} />
      ) : isTableData ? (
        <TableAnc />
      ) : (
        <div>
          <SectionHeader
            title="Jumlah Sasaran Ibu Hamil"
            subtitle="Ringkasan berisi jumlah sasaran ibu hamil dan cakupan ibu hamil yang
            sudah mendapatkan layanan pemeriksaan"
            btn="Halaman Analisis"
            onDataSubmit={handleDataFromChild}
          />
          <div className="w-full grid grid-cols-2 gap-2 mt-6">
            <Scorecard1
              title="Sasaran Ibu Hamil"
              total={formatNumber(SasaranIbuHamil?.data?.total || "0")}
              direction="l"
              isLoading={isLoadingTotalImmunization}
              onClick={handleTable}
            />
            <Scorecard1
              title="Ibu Hamil Tercatat"
              total={formatNumber(IbuHamilTercatat?.data?.total || "0")}
              pct={`${formatNumber(IbuHamilTercatat?.data?.pct) || 0}%`}
              direction="r"
              isLoading={isLoadingIbuHamilTercatat}
              onClick={handleTable}
            />
          </div>
          <SectionHeader
            title="Cakupan Kunjungan ANC"
            subtitle="Jumlah dan persentase ibu hamil yang sudah melakukan kunjungan ANC K1 - K6 di fasilitas kesehatan"
          />
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-7 mt-6">
            <Scorecard2
              title="K1"
              value={formatNumber(K1?.data?.total || "0")}
              pct={`${formatNumber(K1?.data?.pct) || 0}%`}
              isLoading={isLoadingK1}
              className="rounded-l-xl"
            />
            <Scorecard2
              title="K1"
              subtitle="Akses"
              value={formatNumber(K1Akses?.data?.total || "0")}
              pct={`${formatNumber(K1Akses?.data?.pct) || 0}%`}
              isLoading={isLoadingK1Akses}
              className="rounded-r-xl lg:rounded-none"
            />

            <Scorecard2
              title="K1"
              subtitle="Murni"
              value={formatNumber(K1Murni?.data?.total || "0")}
              pct={`${formatNumber(K1Murni?.data?.pct) || 0}%`}
              isLoading={isLoadingK1Murni}
              className="rounded-l-xl lg:rounded-none"
            />

            <Scorecard2
              title="K1"
              subtitle="USG"
              value={formatNumber(K1Usg?.data?.total || "0")}
              pct={`${formatNumber(K1Usg?.data?.pct) || 0}%`}
              isLoading={isLoadingK1Usg}
              className="rounded-r-xl"
            />

            <Scorecard2
              title="K4"
              value={formatNumber(K4?.data?.total || "0")}
              pct={`${formatNumber(K4?.data?.pct) || 0}%`}
              isLoading={isLoadingK4}
              className="rounded-l-xl"
            />

            <Scorecard2
              title="K5"
              value={formatNumber(K5?.data?.total || "0")}
              pct={`${formatNumber(K5?.data?.pct) || 0}%`}
              isLoading={isLoadingK5}
              className="rounded-r-xl lg:rounded-none"
            />

            <Scorecard2
              title="K5"
              subtitle="USG"
              value={formatNumber(K5Usg?.data?.total || "0")}
              pct={`${formatNumber(K5Usg?.data?.pct) || 0}%`}
              isLoading={isLoadingK5Usg}
              className="rounded-l-xl lg:rounded-none"
            />

            <Scorecard2
              title="K6"
              value={formatNumber(K6?.data?.total || "0")}
              pct={`${formatNumber(K6?.data?.pct) || 0}%`}
              isLoading={isLoadingK6}
              className="rounded-r-xl"
            />
          </div>
          <SectionHeader
            title="Cakupan Program Ibu Hamil"
            subtitle="Jumlah dan persentase capaian indikator program kesehatan ibu hamil"
          />
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            <Scorecard3
              title="10T"
              value={formatNumber(TenT?.data?.total || "0")}
              pct={`${formatNumber(TenT?.data?.pct) || 0}%`}
              isLoading={isLoadingTenT}
              color="#9CEE8C"
              tooltipContent={`
                <p className'font-bold mb-2'>10T</p>
                <p className='mb-4'>Jumlah ibu hamil yang mendapatkan layanan 10T seluruhnya yang mencakup:</p>
                <ol>
                <li>Ukur bb dan tb</li>
                <li>Diukur tekanan darah</li>
                <li>Ukur lila</li>
                <li>Diukur tinggi fundus</li>
                <li>Ditentukan presentase janin dan denyut jantung janin</li>
                <li>Pemberian imunisasi TT</li>
                <li>Pemberian TTD</li>
                <li>Pemeriksaan lab (pemeriksaan anemia & tripple eliminasi)</li>
                <li>Tatalaksana konseling</li>
                <li>Diberikan konseling</li>
                </ol>
                <p className='mt-2'>Dibagi sasaran ibu hamil</p>
                `}
            />
            <Scorecard3
              title="4T"
              subtitle="terlalu muda, terlalu tua, terlalu dekat, terlalu banyak"
              value={formatNumber(FourT?.data?.total || "0")}
              pct={`${formatNumber(FourT?.data?.pct) || 0}%`}
              isLoading={isLoadingFourT}
              color="#D9EF82"
              tooltipContent={`
                <p className'font-bold mb-2'>4T</p>
                <p className='mt-2'>Semua ibu hamil yang mengalami 4T (salah satu atau lebih dari satu) dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="USG"
              subtitle="KMK trimester 3"
              value={formatNumber(Usg?.data?.total || "0")}
              pct={`${formatNumber(Usg?.data?.pct) || 0}%`}
              isLoading={isLoadingUsg}
              color="#A8DFF1"
              tooltipContent={`
                <p className'font-bold mb-2'>USG (KMK Trimester 3)</p>
                <p className='mt-2'>Ibu hamil yang diperiksa USG di trimester 3 (usia kandungan > 180 hari) dengan hasil KMK dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="KMK"
              subtitle="dirujuk"
              value={formatNumber(Kmk?.data?.total || "0")}
              pct={`${formatNumber(Kmk?.data?.pct) || 0}%`}
              isLoading={isLoadingKmk}
              color="#FF9899"
              tooltipContent={`
                <p className'font-bold mb-2'>KMK (Dirujuk)</p>
                <p className='mt-2'>Ibu hamil yang diperiksa USG di trimester 3 (usia kandungan > 180 hari) dengan hasil KMK yang dirujuk dibagi dengan semua ibu hamil dengan KMK</p>
                `}
            />
            <Scorecard3
              title="KEK"
              value={formatNumber(Kek?.data?.total || "0")}
              pct={`${formatNumber(Kek?.data?.pct) || 0}%`}
              isLoading={isLoadingKek}
              color="#EE534F"
              tooltipContent={`
                <p className'font-bold mb-2'>KEK</p>
                <p className='mt-2'>Ibu hamil dengan resiko KEK dibagi dengan semua ibu hamil yang dikukur lila</p>
                `}
            />
            <Scorecard3
              title="KEK"
              subtitle="mendapat tambahan gizi"
              value={formatNumber(KekRcv?.data?.total || "0")}
              pct={`${formatNumber(KekRcv?.data?.pct) || 0}%`}
              isLoading={isLoadingKekRcv}
              color="#EE534F"
              tooltipContent={`
                <p className'font-bold mb-2'>KEK (Mendapatkan Tambahan Gizi)</p>
                <p className='mt-2'>Ibu hamil dengan risiko KEK mendapatkan PMT dibagi dengan semua ibu hamil KEK</p>
                `}
            />
            <Scorecard3
              title="KEK"
              subtitle="mengkonsumsi tambahan gizi"
              value={formatNumber(KekCns?.data?.total || "0")}
              pct={`${formatNumber(KekCns?.data?.pct) || 0}%`}
              isLoading={isLoadingKekCns}
              color="#EE534F"
              tooltipContent={`
                <p className'font-bold mb-2'>KEK (Mengkonsumsi Tambahan Gizi)</p>
                <p className='mt-2'>Ibu hamil dengan risiko KEK mengkonsumsi PMT dibagi dengan semua ibu hamil KEK</p>
                `}
            />
            <Scorecard3
              title="KEK"
              subtitle="mendapat PMT lokal dengan penambahan berat badan"
              value={formatNumber(KekPmt?.data?.total || "0")}
              pct={`${formatNumber(KekPmt?.data?.pct) || 0}%`}
              isLoading={isLoadingKekPmt}
              color="#EE534F"
              tooltipContent={`
                <p className'font-bold mb-2'>KEK (Mendapatkan PMT lokla dengan penambahan berat badan)</p>
                <p className='mt-2'>Ibu hamil dengan risiko KEK mengkonsumsi PMT dengan kenaikan BB dibagi dengan semua ibu hamil KEK</p>
                `}
            />
            <Scorecard3
              title="Hb"
              subtitle="diperiksa Hb"
              value={formatNumber(Hb?.data?.total || "0")}
              pct={`${formatNumber(Hb?.data?.pct) || 0}%`}
              isLoading={isLoadingHb}
              color="#C282FA"
              tooltipContent={`
                <p className'font-bold mb-2'>HB (Diberikan Hb)</p>
                <p className='mt-2'>Semua ibu hamil yang dilakukan pemerikaan hb dibagi semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Anemia"
              status="Ringan"
              subtitle="mendapat terapi TTD oral"
              value={formatNumber(AnemiaRcv?.data?.total || "0")}
              pct={`${formatNumber(AnemiaRcv?.data?.pct) || 0}%`}
              isLoading={isLoadingAnemiaRcv}
              color="#60D3AA"
              tooltipContent={`
                <p className'font-bold mb-2'>Anemia Ringan (Mendapat terapi TTD oral)</p>
                <p className='mt-2'>Semua ibu hamil anemia ringan yang mendapatkan TTD dibagi semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Anemia"
              status="Ringan"
              subtitle="mengalami kenaikan Hb"
              value={formatNumber(AnemiaInc?.data?.total || "0")}
              pct={`${formatNumber(AnemiaInc?.data?.pct) || 0}%`}
              isLoading={isLoadingAnemiaInc}
              color="#60D3AA"
              tooltipContent={`
                <p className'font-bold mb-2'>Anemia Ringan (Mengalami kenaikan Hb)</p>
                <p className='mt-2'>Semua ibu hamil anemia ringan yang mengalami kenaikan Hb dibagi dengan semua ibu hamil anemia ringan</p>
                `}
            />
            <Scorecard3
              title="Anemia"
              status="Sedang & Berat"
              subtitle="mendapat rujukan ke FKRTL"
              value={formatNumber(AnemiaRef?.data?.total || "0")}
              pct={`${formatNumber(AnemiaRef?.data?.pct) || 0}%`}
              isLoading={isLoadingAnemiaRef}
              color="#60D3AA"
              tooltipContent={`
                <p className'font-bold mb-2'>Anemia Sedang & Berat (mendapat rujukan ke FKRTL)</p>
                <p className='mt-2'>Persentase Ibu Hamil Anemia sedang dan berat yang dirujuk ke FKRTL dibagi dengan semua ibu hamil anemia sedang dan berat</p>
                `}
            />
            <Scorecard3
              title="TTD"
              subtitle="mendapat 90 tablet"
              value={formatNumber(TTdRcv?.data?.total || "0")}
              pct={`${formatNumber(TTdRcv?.data?.pct) || 0}%`}
              isLoading={isLoadingTTdRcv}
              color="#ABC337"
              tooltipContent={`
                <p className'font-bold mb-2'>TTD (Mendapat 90 tablet)</p>
                <p className='mt-2'>Bumil diberikan Tablet Tambah darah (TTD) dibagi dengan semua ibu hamil.</p>
                `}
            />
            <Scorecard3
              title="TTD"
              subtitle="mengkonsumsi 90 tablet"
              value={formatNumber(TTdCns?.data?.total || "0")}
              pct={`${formatNumber(TTdCns?.data?.pct) || 0}%`}
              isLoading={isLoadingTTdCns}
              color="#ABC337"
              tooltipContent={`
                <p className'font-bold mb-2'>TTD (Mengkonsumsi 90 tablet)</p>
                <p className='mt-2'>Semua ibu hamil anemia ringan yang mengkosumsi TTD selama masa kehamilan minimal 90 tablet dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Kelas"
              subtitle="mengikuti kelas ibu hamil min. 4x"
              value={formatNumber(Class?.data?.total || "0")}
              pct={`${formatNumber(Class?.data?.pct) || 0}%`}
              isLoading={isLoadingClass}
              color="#F6CADD"
              tooltipContent={`
                <p className'font-bold mb-2'>Kelas (Mengikuti kelas ibu hamil min. 4x)</p>
                <p className='mt-2'>Ibu hamil memiliki buku KIA dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Td"
              subtitle="mendapat imunisasi Td"
              value={formatNumber(Td?.data?.total || "0")}
              pct={`${formatNumber(Td?.data?.pct) || 0}%`}
              isLoading={isLoadingTd}
              color="#505581"
              tooltipContent={`
                <p className'font-bold mb-2'>TD (Mendapat imunisasi TD)</p>
                <p className='mt-2'>Ibu hamil mendapatkan imunisasi Td dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Buku KIA"
              subtitle="memiliki buku KIA"
              value={formatNumber(Kia?.data?.total || "0")}
              pct={`${formatNumber(Kia?.data?.pct) || 0}%`}
              isLoading={isLoadingKia}
              color="#8FA5B2"
              tooltipContent={`
                <p className'font-bold mb-2'>Buku KIA (Memiliki buku KIA)</p>
                <p className='mt-2'>Ibu hamil memiliki buku KIA dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Diukur"
              subtitle="berat badan dan tinggi badan"
              value={formatNumber(Diukur?.data?.total || "0")}
              pct={`${formatNumber(Diukur?.data?.pct) || 0}%`}
              isLoading={isLoadingDiukur}
              color="#5874D7"
              tooltipContent={`
                <p className'font-bold mb-2'>Dikukur Berat Badan dan Tinggi Badan</p>
                <p className='mt-2'>Bumil ditimbang BB dan diukur TB dibagi semua ibu hamil dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Tekanan Darah"
              value={formatNumber(TekananDarah?.data?.total || "0")}
              pct={`${formatNumber(TekananDarah?.data?.pct) || 0}%`}
              isLoading={isLoadingTekananDarah}
              color="#DB3A3A"
              tooltipContent={`
                <p className'font-bold mb-2'>Tekanan darah</p>
                <p className='mt-2'>Bumil diukur Tekanan Darah dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Diukur LiLA"
              subtitle="Lingkar Lengan Atas"
              value={formatNumber(Lila?.data?.total || "0")}
              pct={`${formatNumber(Lila?.data?.pct) || 0}%`}
              isLoading={isLoadingLila}
              color="#5874D7"
              tooltipContent={`
                <p className'font-bold mb-2'>Diukur LilA (Lingkar Lengan Atas)</p>
                <p className='mt-2'>Bumil diukur lingkar lengan atas (LiLA) dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Tinggi Fundus"
              subtitle="Penilaian usia/besar janin"
              value={formatNumber(TinggiFundus?.data?.total || "0")}
              pct={`${formatNumber(TinggiFundus?.data?.pct) || 0}%`}
              isLoading={isLoadingTinggiFundus}
              color="#5874D7"
              tooltipContent={`
                <p className'font-bold mb-2'>Tinggu Fundus (Penilaian usia/besar janin)</p>
                <p className='mt-2'>Bumil Diperiksa Tinggi Fundus (penilaian usia/besar janin) dibagi dengan semua ibu hamil.</p>
                `}
            />
            <Scorecard3
              title="DJJ"
              subtitle="Presentasi dan denyut jantung"
              value={formatNumber(Djj?.data?.total || "0")}
              pct={`${formatNumber(Djj?.data?.pct) || 0}%`}
              isLoading={isLoadingDjj}
              color="#FB5EA2"
              tooltipContent={`
                <p className'font-bold mb-2'>DJJ (Presentasi dan Denyut Jantung)</p>
                <p className='mt-2'>Bumil Ditentukan Presentasi dan Denyut Jantung Janin (DJJ) dibagi dengan semua ibu hamil.</p>
                `}
            />
            <Scorecard3
              title="Imunisasi TT"
              subtitle="Imunisasi Tetanus Taksoid"
              value={formatNumber(Tt?.data?.total || "0")}
              pct={`${formatNumber(Tt?.data?.pct) || 0}%`}
              isLoading={isLoadingTt}
              color="#D9EF82"
              tooltipContent={`
                <p className'font-bold mb-2'>Imunisasi TT (Imunisasi Tetanus Taksoid)</p>
                <p className='mt-2'>Bumil Diberikan Imunisasi Tetanus Taksoid (TT) dibagi dengan semua ibu hamil.</p>
                `}
            />
            <Scorecard3
              title="Laboratorium"
              subtitle="termasuk anemia & skrining triple eliminasi"
              value={formatNumber(Lab?.data?.total || "0")}
              pct={`${formatNumber(Lab?.data?.pct) || 0}%`}
              isLoading={isLoadingLab}
              color="#60D3AA"
              tooltipContent={`
                <p className'font-bold mb-2'>Laboratorium (Termasuk anemia & skrining triple eliminasi)</p>
                <p className='mt-2'>Bumil Dilakukan Pemeriksaan Laboratorium (termasuk status anemia dan skrining triple eliminasi) dibagi dengan semua ibu hamil.</p>
                `}
            />
            <Scorecard3
              title="Tatalaksana Kasus"
              value={formatNumber(Tatalaksana?.data?.total || "0")}
              pct={`${formatNumber(Tatalaksana?.data?.pct) || 0}%`}
              isLoading={isLoadingTatalaksana}
              color="#8FA5B2"
              tooltipContent={`
                <p className'font-bold mb-2'>Tatalaksana Kasus</p>
                <p className='mt-2'>Bumil Diberikan Imunisasi Tetanus Taksoid (TT) dibagi dengan semua ibu hamil</p>
                `}
            />
            <Scorecard3
              title="Konseling"
              subtitle="Temu Wicara"
              value={formatNumber(Konseling?.data?.total || "0")}
              pct={`${formatNumber(Konseling?.data?.pct) || 0}%`}
              isLoading={isLoadingKonseling}
              color="#F6CADD"
              tooltipContent={`
                <p className'font-bold mb-2'>Konseling (Temu Wicara)</p>
                <p className='mt-2'>Bumil Dilakukan Temu Wicara/Konseling dibagi dengan semua ibu hamil.</p>
                `}
            />
          </div>
          <SectionHeader
            title="Morbiditas pada Ibu Hamil"
            subtitle="Top 8 morbiditas yang dialami oleh Ibu Hamil"
          />
          {/* Morbiditas */}
          <div className="w-full mt-10">
            <div className="h-40 bg-primary flex items-center justify-center text-white relative">
              <div className="absolute right-2 top-2">
                <IoMdInformationCircleOutline size={24} />
              </div>
              <p className="font-bold text-8xl">8</p>
              <p className="font-bold text-4xl">
                Penyakit yang sering <br /> dialami ibu hamil
              </p>
            </div>
            <div className="grid grid-cols-3 h-full gap-4 mt-6">
              <div className=" col-span-3 lg:col-span-2 order-2 lg:order-1">
                <div>
                  <Card8Disease
                    title={TopDisease?.data?.[1]?.disease_desc || "Rank 2"}
                    value={
                      formatNumber(TopDisease?.data?.[1]?.total_preg_disease) ||
                      "0"
                    }
                    pct={`${
                      formatNumber(
                        TopDisease?.data?.[1]?.pct_total_preg_disease
                      ) || 0
                    }%`}
                    styles="h-[200px] bg-[#F3B239] mb-3"
                    size="l"
                    isLoading={loadingTopDisease}
                  />
                </div>
                <Card8Disease
                  title={TopDisease?.data?.[0]?.disease_desc || "Rank 1"}
                  value={
                    formatNumber(TopDisease?.data?.[0]?.total_preg_disease) ||
                    "0"
                  }
                  pct={`${
                    formatNumber(
                      TopDisease?.data?.[0]?.pct_total_preg_disease
                    ) || 0
                  }%`}
                  isLoading={loadingTopDisease}
                  styles="h-[400px] bg-[#CF3E53]"
                  size="l"
                />
              </div>
              <div className="col-span-3 lg:col-span-1 order-1 lg:order-2">
                <div className="grid grid-cols-12 gap-3">
                  <Card8Disease
                    title={TopDisease?.data?.[7]?.disease_desc || "Rank 8"}
                    value={
                      formatNumber(TopDisease?.data?.[7]?.total_preg_disease) ||
                      "0"
                    }
                    pct={`${
                      formatNumber(
                        TopDisease?.data?.[7]?.pct_total_preg_disease
                      ) || 0
                    }%`}
                    isLoading={loadingTopDisease}
                    styles="bg-[#00B8AE] h-[106px] col-span-5"
                    size="s"
                  />
                  <Card8Disease
                    title={TopDisease?.data?.[6]?.disease_desc || "Rank 7"}
                    value={
                      formatNumber(TopDisease?.data?.[6]?.total_preg_disease) ||
                      "0"
                    }
                    pct={`${
                      formatNumber(
                        TopDisease?.data?.[6]?.pct_total_preg_disease
                      ) || 0
                    }%`}
                    isLoading={loadingTopDisease}
                    styles="bg-[#008E87] h-[106px] col-span-7"
                    size="s"
                  />
                  <Card8Disease
                    title={TopDisease?.data?.[5]?.disease_desc || "Rank 6"}
                    value={
                      formatNumber(TopDisease?.data?.[5]?.total_preg_disease) ||
                      "0"
                    }
                    pct={`${
                      formatNumber(
                        TopDisease?.data?.[5]?.pct_total_preg_disease
                      ) || 0
                    }%`}
                    isLoading={loadingTopDisease}
                    styles="bg-[#00A2B3] h-[160px] col-span-7"
                    size="m"
                  />
                  <Card8Disease
                    title={TopDisease?.data?.[4]?.disease_desc || "Rank 5"}
                    value={
                      formatNumber(TopDisease?.data?.[4]?.total_preg_disease) ||
                      "0"
                    }
                    pct={`${
                      formatNumber(
                        TopDisease?.data?.[4]?.pct_total_preg_disease
                      ) || 0
                    }%`}
                    isLoading={loadingTopDisease}
                    styles="bg-[#EC407A] h-[160px] col-span-5"
                    size="m"
                  />
                  <Card8Disease
                    title={TopDisease?.data?.[3]?.disease_desc || "Rank 4"}
                    value={
                      formatNumber(TopDisease?.data?.[3]?.total_preg_disease) ||
                      "0"
                    }
                    pct={`${
                      formatNumber(
                        TopDisease?.data?.[3]?.pct_total_preg_disease
                      ) || 0
                    }%`}
                    isLoading={loadingTopDisease}
                    styles="bg-[#ADBB38] h-[130px] col-span-12"
                    size="l"
                  />
                  <Card8Disease
                    title={TopDisease?.data?.[2]?.disease_desc || "Rank 3"}
                    value={
                      formatNumber(TopDisease?.data?.[2]?.total_preg_disease) ||
                      "0"
                    }
                    pct={`${
                      formatNumber(
                        TopDisease?.data?.[2]?.pct_total_preg_disease
                      ) || 0
                    }%`}
                    isLoading={loadingTopDisease}
                    styles="bg-[#A72787] h-[180px] col-span-12"
                    size="l"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Morbiditas */}

          {/* Start peta sebaran */}
          <SectionHeader
            title="Peta Sebaran Prevalensi"
            subtitle="Peta sebaran prevalensi berdasarkan indikator ibu hamil"
          />
          <div className="w-full mt-5 p-4 border border-[#D6D6D6] rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <div className="flex gap-6 items-center">
                {/* <div className="w-[400px]">
                  <Select placeholder="Pilih Indikator" />
                </div>
                <div className="w-[400px]">
                  <Select placeholder="Pilih Indikator" />
                </div> */}
                <Filter1 filterState={filterState} />
              </div>
              <div>
                <button className="border border-[#00B1A9] text-[#00B1A9] px-2 py-1 rounded-md">
                  <span className="font-semibold text-sm">Unduh</span>
                </button>
              </div>
            </div>
            {/* <Map /> */}
            <div className="h-[470px]">
              {/* <MapComponent /> */}
              <MapAnc2 />
            </div>
          </div>
          {/* End of peta sebaran */}
        </div>
      )}
    </div>
  );
}
