'use client'

import Image from "next/image"
import { Banner, BannerHighlightFooter, BannerText, Navbar, Sidebar } from "@/components"
import { ChildSummaryImmunization, FilterSummaryImmunization, GraphAddOn, GraphRoutineImmunizationCoverageTrend, RoutineImmunizationCoverageTrendGraph, SummaryImmunization, TotalSummaryImmunization } from "@/view/home";
import { dataGraphRegionalRoutineImmunizationCoverageTrend, dataTotalSummaryImmunization } from "@/utils/constants";
import VaccinateNudge from "@/assets/icons/vaccinate-nudge.png"

const dataTotalSummaryImmunizationTotal = [
  {
    title: "Total Penerima Imunisasi Bayi",
    value: "36.818.437"
  },
  {
    title: "Total Penerima Imunisasi Bayi",
    value: "36.818.437"
  },
  {
    title: "Total Penerima Imunisasi Bayi",
    value: "36.818.437"
  },
  {
    title: "Total Penerima Imunisasi Bayi",
    value: "36.818.437"
  },
]
const BabyChaseImmunizationBaduta = () => {
  return (
    <div className="flex flex-col items-center">
      {/* <div className="px-4 container">
        <Navbar />
      </div> */}
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
            <div className="flex flex-col gap-4 text-sm">
              <div className="pt-8">
                UPDATE TERAKHIR: 23 SEPTEMBER 2023
              </div>
              <div className="font-bold text-primary-1 text-xl md:text-3xl">
                Imunisasi Kejar Bayi dan Baduta
              </div>
              <div>
                Menampilkan data cakupan imunisasi kejar pada bayi dan baduta berdasarkan jenis imunisasi, cakupan daerah, usia, waktu, dan jenis kelamin.
              </div>
            </div>
            <div className="pt-6">
              <FilterSummaryImmunization />
            </div>
            <div className="py-6">
            </div>
            <div>
              <div className="font-bold text-primary-2 text-xl md:text-3xl">Ringkasan Data Cakupan Imunisasi Rutin Bayi</div>
              <div>Ringkasan berisi data total penerima imunisasi rutin bayi dan jenis imunisasi rutin bayi terhadap target cakupan yang sudah ditentukan.</div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 mt-4">
                {dataTotalSummaryImmunizationTotal.slice(0, 1)?.map((r, i) => (
                  <ChildSummaryImmunization key={i} {...r} className="px-4 border rounded-lg" background="#9F1AB1" classNameTitle="text-white" classNameValue="text-4xl text-white" />
                ))}
                {dataTotalSummaryImmunization.slice(0, 1)?.map((r, i) => (
                  <ChildSummaryImmunization key={i} {...r} className="px-4 border rounded-lg" contentTooltip={<div></div>} />
                ))}
                {dataTotalSummaryImmunization?.map((r, i) => (
                  <ChildSummaryImmunization key={i} {...r} className="px-4 border rounded-lg" titleIcon={<Image alt="satusehat" src={VaccinateNudge.src} width={24} height={24} />
                  } />
                ))}
              </div>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-4">
                {dataTotalSummaryImmunizationTotal?.map((r, i) => (
                  <ChildSummaryImmunization key={i} {...r} contentTooltip={<div></div>}
                    className="px-4 border rounded-lg h-32" background="#FAC515"
                    classNameTitle="text-third-3" classNameValue="text-4xl text-third-3" />
                ))}
              </div>
            </div>
            <div className="py-4 pb-12">
              <RoutineImmunizationCoverageTrendGraph
                title="Grafik Tren Cakupan Kumulatif atau Bulanan Penerima Imunisasi Bayi "
                subTitle=""
                graph={
                  <div className="my-4 p-4 md:p-8 border rounded-lg">
                    <GraphRoutineImmunizationCoverageTrend
                      layout="vertical"
                      title={<div className="font-bold md:text-2xl">Data Cakupan <b className="text-primary-2">Imunisasi Dasar Lengkap</b> pada Provinsi di <b className="text-primary-2">Indonesia</b> Selama Tahun <b className="text-primary-2">2023</b></div>}
                      subTitle="Grafik menampilkan hasil cakupan semua data imunisasi rutin lengkap dari 34 provinsi di Indonesia"
                      addOn={<GraphAddOn dataCard={dataGraphRegionalRoutineImmunizationCoverageTrend} />} variant="private" />
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
                      title={<div className="font-bold md:text-2xl">Data Kumulatif Jumlah Penerima, Cakupan, dan Target Cakupan <b className="text-primary-2">Imunisasi Dasar Lengkap</b> pada Bayi Selama Tahun <b className="text-primary-2">2023</b></div>}
                      subTitle="Grafik menampilkan tren cakupan kumulatif penerima antigen baru lengkap selama tahun 2023"
                      variant="private" />
                  </div>
                }
              />
            </div>
            <div className="py-4 pb-12">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BabyChaseImmunizationBaduta