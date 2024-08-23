'use client'

import Image from "next/image"
import { Banner, BannerText, Select } from "@/components"
import TopicGeneralImage1 from "@/assets/images/topic-general1.png"
import TopicGeneralImage2 from "@/assets/images/topic-general2.png"
import TopicGeneralImage3 from "@/assets/images/topic-general3.png"
import TopicGeneralImage4 from "@/assets/images/topic-general4.png"
import TopicGeneralImage5 from "@/assets/images/topic-general5.png"
import TopicGeneralImage6 from "@/assets/images/topic-general6.png"
import TopicGeneralImage7 from "@/assets/images/topic-general7.png"
import TopicGeneralImage8 from "@/assets/images/topic-general8.png"
import TopicGeneralImage9 from "@/assets/images/topic-general9.png"
import TopicGeneralImage10 from "@/assets/images/topic-general10.png"
import TopicGeneralImage11 from "@/assets/images/topic-general11.png"
import TopicGeneralImage12 from "@/assets/images/topic-general12.png"

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const dataCategory = [
  "SDM Kesehatan",
  "Layanan Kesehatan",
  "Layanan Rujukan",
  "Layanan Primer",
  "Ketahanan Nasional",
  "Pembiayaan Kesehatan",
  "Teknologi Kesehatan"
]

const dataTopicGeneral = [
  {
    title: "Kasus Implementasi Kebijakan Penghematan Dana Kesehatan",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage1.src,
    bgColor: "#F5EBFF",
    access: 1
  },
  {
    title: "Kasus Implementasi Kebijakan Penghematan Dana Kesehatan",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage2.src,
    bgColor: "#F5EBFF",
    access: 1
  },
  {
    title: "Kasus Implementasi Kebijakan Penghematan Dana Kesehatan",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage3.src,
    bgColor: "#F5FBEE",
    access: 1
  },
  {
    title: "Data Alat Kesehatan untuk Meningkatkan Ketahanan Kesehatan Nasional",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage4.src,
    bgColor: "#00B1A9",
    access: 0
  },
  {
    title: "Analisis Penggunaan Layanan Kesehatan Tingkat Lanjut di Rumah Sakit: Studi Kasus pada Pasien dengan Penyakit Kronis",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage5.src,
    bgColor: "#EF6820",
    access: 1
  },
  {
    title: "Data Penggunaan Teknologi dalam Manajemen Pasien dan Diagnostik Medis",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage6.src,
    bgColor: "#EFF8FF",
    access: 1
  },
  {
    title: "Analisis Data Farmasi untuk Meningkatkan Ketahanan Kesehatan Nasional",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage7.src,
    bgColor: "#D2DC00",
    access: 1
  },
  {
    title: "Evaluasi Jaringan Rujukan Kesehatan",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage8.src,
    bgColor: "#FEF3F2",
    access: 0
  },
  {
    title: "Evaluasi Program Pemeliharaan dan Pengembangan Karier Tenaga Kesehatan",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage9.src,
    bgColor: "#FEF6EE",
    access: 0
  },
  {
    title: "Pengoptimalan Rujukan Pasien untuk Layanan Kesehatan Tingkat Lanjut: Studi Kasus Integrasi Sistem Kesehatan",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage10.src,
    bgColor: "#EF6820",
    access: 1
  },
  {
    title: "Analisis Data Farmasi untuk Meningkatkan Ketahanan Kesehatan Nasional",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage11.src,
    bgColor: "#DAFFFD",
    access: 1
  },
  {
    title: "Tren Penggunaan Aplikasi Kesehatan dan Telemedicine dalam Era Digital",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage12.src,
    bgColor: "#2E90FA",
    access: 0
  }
]
const TopicGeneral = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center bg-image3 w-full">
        <div className="px-4 container">
          <Banner
            text={<BannerText
              highlightHeader="Menampilkan"
              highlight={`Semua Topik Data Umum`}
            />
            }
          />
        </div>
      </div>
      <div className="mt-8 container">
        <div className="py-4 font-bold text-primary-2 text-xl md:text-4xl">Pilih topik yang anda inginkan</div>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
          {dataCategory.map((r, i) => (
            <div key={`category-${i}`} className="flex justify-center py-4 border rounded-md">
              {r}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="py-4 font-bold text-primary-2 text-xl md:text-4xl">Pilihan Dataset</div>
        <div>
          <Select
            options={options}
            onChange={(e) => { }}
            placeholder="Urutkan"
          />
        </div>
      </div>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
        {dataTopicGeneral.map((r, i) => (
          <div key={`dataset-${i}`}>
            <div className="relative">
              <div className="absolute p-2 rounded-tl-lg font-bold text-xs"
                style={{
                  color: r.access === 1 ? "#FFFFFF" : "#3F4200",
                  backgroundColor: r.access === 1 ? "#00B1A9" : "#C3CC00"
                }}>
                {r.access === 1 ? "Publik" : "Privat"}
              </div>
              <div className="flex justify-center items-center rounded-lg" style={{ backgroundColor: r.bgColor, minHeight: 212 }}>
                <Image alt="satusehat" src={r.image} width={99} height={126} />
              </div>
            </div>
            <div className="py-2 font-bold text-xl">{r.title}</div>
            <div className="font-normal text-sm">{r.updatedDate}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopicGeneral