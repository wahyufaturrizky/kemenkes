'use client'
import { Banner, BannerText, Footer, Navbar, Select, Tabs } from "@/components"
import { useAppSelector } from "@/lib/hook";
import { RootState, reducers } from "@/lib/store";
import { memoizedSelector } from "@/lib/utils";
import { dataGraphRegionalRoutineImmunizationCoverageTrend, dataTabs, dataTotalSummaryImmunization } from "@/utils/constants";
import { sidebarNavigation } from "@/utils/navigation";
import {
  RoutineImmunizationCoverageTrendGraph,
  SummaryImmunization,
  TotalSummaryImmunization,
  FilterSummaryImmunization,
  GraphAddOn,
  GraphRoutineImmunizationCoverageTrend
} from "@/view/home"
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";

const HomeView = () => {
  const { push } = useRouter();

  return (
    <div className="flex flex-col items-center">
      {/* <div className="px-4 container">
        <Navbar />
      </div> */}
      <div className="flex justify-center bg-image1 bg-support-b2 w-full">
        <div className="px-4 container">
          <Banner
            text={<BannerText
              topic="Topik Data: Kesehatan Keluarga"
              highlight={`Dashboard SATUSEHAT \nImunisasi Rutin Lengkap`}
              updatedDate="TERAKHIR DIPERBARUI: 6 AGUSTUS 2023, 19:20"
              source="Sumber: SATUSEHAT"
            />
            }
          />
        </div>
      </div>
      <div className="px-4 container">
        <Tabs data={dataTabs} />
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
        <div className="px-4 py-6">
          <FilterSummaryImmunization />
        </div>
        <div className="px-4 py-6">
          <div>
            <div className="font-bold text-primary-2 text-xl md:text-3xl">Ringkasan Data Cakupan Imunisasi Rutin Lengkap pada Penerima Imunisasi Bayi, Baduta, BIAS, dan WUS </div>
            <div>Ringkasan berisi data total penerima imunisasi rutin bayi, baduta (bayi dua tahun), BIAS (Bulan Imunisasi Anak Sekolah), dan WUS (Wanita Usia Subur) terhadap target cakupan yang sudah ditentukan</div>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 pt-4">
              <TotalSummaryImmunization title="Total Penerima Imunisasi Bayi" value="36.818.437"
                child={dataTotalSummaryImmunization.slice(0, 2)} />
              <TotalSummaryImmunization title="Total Penerima Imunisasi Baduta" value="36.818.437"
                child={dataTotalSummaryImmunization.slice(0, 1)} />
              <TotalSummaryImmunization title="Total Penerima Imunisasi BIAS " value="36.818.437"
                child={dataTotalSummaryImmunization.slice(0, 1)} />
              <TotalSummaryImmunization title="Total Status T WUS" value="36.818.437"
                child={dataTotalSummaryImmunization.slice(0, 3)} />
              <div></div>
            </div>
          </div>
          <div className="pb-6">
            <SummaryImmunization
              title="Ringkasan Data Cakupan Imunisasi Rutin Lengkap pada Provinsi dan Kabupaten/Kota di Indonesia"
              child={dataTotalSummaryImmunization}
            />
          </div>
          <div className="px-4 pb-12">
            <RoutineImmunizationCoverageTrendGraph
              title="Grafik Tren Cakupan Imunisasi Rutin Lengkap"
              subTitle="Grafik di bawah menampilkan cakupan program imunisasi rutin lengkap secara kumulatif atau bulanan. Pilih filter yang sesuai untuk menyesuaikan data yang diinginkan atau unduh grafik dengan memilih tombol Unduh."
              graph={
                <div className="my-4 p-4 md:p-8 border rounded-lg">
                  <GraphRoutineImmunizationCoverageTrend
                    title={<div className="font-bold md:text-2xl">Data Kumulatif Jumlah Penerima, Cakupan, dan Target Cakupan <b className="text-primary-2">Antigen Baru Lengkap</b> pada Bayi Usia di Bawah 1 Tahun Selama Tahun <b className="text-primary-2">2023</b></div>}
                    subTitle="Grafik menampilkan tren cakupan kumulatif penerima antigen baru lengkap selama tahun 2023"
                    echarts
                  />
                </div>
              }
            />
          </div>
          {/* <div className="px-4 pb-12">
            <RoutineImmunizationCoverageTrendGraph
              title="Grafik Tren Cakupan Imunisasi Rutin Lengkap"
              subTitle="Grafik di bawah menampilkan cakupan program imunisasi rutin lengkap secara kumulatif atau bulanan. Pilih filter yang sesuai untuk menyesuaikan data yang diinginkan atau unduh grafik dengan memilih tombol Unduh."
              graph={
                <div className="my-4 p-4 md:p-8 border rounded-lg">
                  <GraphRoutineImmunizationCoverageTrend
                    title={<div className="font-bold md:text-2xl">Data Kumulatif Jumlah Penerima, Cakupan, dan Target Cakupan <b className="text-primary-2">Antigen Baru Lengkap</b> pada Bayi Usia di Bawah 1 Tahun Selama Tahun <b className="text-primary-2">2023</b></div>}
                    subTitle="Grafik menampilkan tren cakupan kumulatif penerima antigen baru lengkap selama tahun 2023"
                  />
                </div>
              }
            />
          </div>
          <div className="px-4 pb-12">
            <RoutineImmunizationCoverageTrendGraph
              title="Grafik Tren Cakupan Daerah Imunisasi Rutin Lengkap"
              subTitle="Grafik di bawah menampilkan cakupan program imunisasi rutin lengkap per provinsi, kabupaten/kota, kecamatan, atau kelurahan/desa. Pilih filter yang sesuai untuk menyesuaikan data yang diinginkan atau unduh grafik dengan memilih tombol Unduh."
              graph={
                <div className="my-4 p-4 md:p-8 border rounded-lg">
                  <GraphRoutineImmunizationCoverageTrend
                    layout='vertical'
                    title={<div className="font-bold md:text-2xl">Data Cakupan <b className="text-primary-2">Imunisasi Total</b> Lengkap pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">2023</b></div>}
                    subTitle="Grafik menampilkan hasil cakupan semua data imunisasi rutin lengkap dari 34 provinsi di Indonesia"
                    addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend} />} />
                </div>
              }
            />
          </div> */}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default HomeView