'use client'

import { Banner, BannerHighlightFooter, BannerText, Navbar, Sidebar, Tabs } from "@/components"
import { FilterSummaryImmunization, GraphAddOn, GraphRoutineImmunizationCoverageTrend, RoutineImmunizationCoverageTrendGraph, SummaryImmunization, TotalSummaryImmunization } from "@/view/home";
import { dataGraphRegionalRoutineImmunizationCoverageTrend, dataTabs, dataTotalSummaryImmunization } from "@/utils/constants";

const CompleteRoutineImmunization = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center bg-image2 bg-success w-full">
        <div className="px-4 container">
          <Banner
            text={<BannerText
              highlight={`Dasbor Program Imunisasi Rutin`}
              highlightFooter={
                <BannerHighlightFooter look="567" comment="145" share="24" />
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
            <Tabs data={dataTabs} variant="private" />
            <div className="flex flex-col gap-4 text-sm">
              <div className="font-bold text-primary-1 text-xl md:text-3xl">
                Imunisasi Rutin Lengkap
              </div>
              <div>
                Menampilkan data cakupan imunisasi rutin lengkap bayi, baduta (bayi dua tahun), BIAS (Bulan Imunisasi Anak Sekolah), dan WUS (Wanita Usia Subur) berdasarkan target cakupan dan cakupan daerah.
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunization />
            </div>
            <div className="py-6">
            </div>
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
                      layout="vertical"
                      title={<div className="font-bold md:text-2xl">Data Cakupan <b className="text-primary-2">Imunisasi Total</b> Lengkap pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">2023</b></div>}
                      subTitle="Grafik menampilkan hasil cakupan semua data imunisasi rutin lengkap dari 34 provinsi di Indonesia"
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompleteRoutineImmunization