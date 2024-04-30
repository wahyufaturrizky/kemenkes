'use client'

import Image from "next/image"
import { Banner, BannerHighlightFooter, BannerTextVariant, Button, Input, Select } from "@/components"
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
import TopicDataAccessImage1 from "@/assets/images/topic-data-access1.png"
import TopicDataAccessImage2 from "@/assets/images/topic-data-access2.png"
import TopicDataAccessImage3 from "@/assets/images/topic-data-access3.png"
import { CiSearch } from "react-icons/ci";
import { GoArrowRight } from "react-icons/go";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const dataAccessSatuData = [
  {
    label: 'Masyarakat Umum',
    image: TopicDataAccessImage1.src,
    value: 'Dashboard untuk kebutuhan umum seperti Media, Akademik, dan seluruh masayarakat Indonesia tanpa perlu login.'
  },
  {
    label: 'Dinas Kesehatan',
    image: TopicDataAccessImage2.src,
    value: 'Dashboard yang diperuntukan untuk Dinas Kesehatan guna menunjang kebutuhan lorem ipsum dolor sit amet.'
  },
  {
    label: 'Fasilitas Kesehatan',
    image: TopicDataAccessImage3.src,
    value: 'Dashboard yang diperuntukan untuk Fasilitas Kesehatan guna menunjang kebutuhan lorem ipsum dolor sit amet.'
  },
]

const dataTopicGeneral = [
  {
    title: "Analisis Kebutuhan SDM Kesehatan",
    updatedDate: "UPDATE TERAKHIR : 12 DES 2022",
    image: TopicGeneralImage1.src,
    bgColor: "#F5EBFF",
    access: 1
  },
  {
    title: "Efektivitas Pelatihan dan Pengembangan SDM Kesehatan",
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
      <div className="flex justify-center bg-image4 w-full">
        <div className="px-4 container">
          <Banner
            text={<BannerTextVariant
              highlight="Rumah Data untuk Satu Data Kesehatan Indonesia"
              highlightFooter={
                <div>
                  <div className="py-2 text-xl">Temukan Topik</div>
                  <div className="flex items-center gap-4 md:w-2/3">
                    <div className="flex-1">
                      <Input
                        prefix={<CiSearch color="#9E9E9E" fontSize={30} />}
                        attributeInput={{
                          placeholder: "Cari judul data, metadata, kategori"
                        }} />
                    </div>
                    <div><Button text="Cari Data" variant="contained" className="border-secondary bg-secondary" style={{ color: "#004744" }} /></div>
                  </div>
                </div>
              }
            />
            }
          />
        </div>
      </div>

      <div className="my-8 container">
        <div className="flex justify-between items-center gap-4">
          <div className="my-2">
            <div className="py-4 font-bold text-primary-2 text-xl md:text-4xl">Dasbor Kesehatan Indonesia Paling Banyak Dikunjungi</div>
            <div>Berisi dasbor interaktif dengan berbagai macam topik data kesehatan yang paling banyak dikunjungi</div>
          </div>
          <div className="flex gap-2">
            <Button text={<FiArrowLeft fontSize={20} />} variant="contained" />
            <Button text={<FiArrowRight fontSize={20} />} variant="contained" />
          </div>
        </div>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
          {dataTopicGeneral.slice(0, 4).map((r, i) => (
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

      <div className="my-8 container">
        <div className="flex justify-between items-center gap-4">
          <div className="my-2">
            <div className="py-4 font-bold text-primary-2 text-xl md:text-4xl">Dasbor Interaktif untuk Visualisasi Data Kesehatan</div>
            <div>Anda dapat mengakses dasbor kesehatan secara interaktif menggunakan tombol-tombol yang tersedia pada dasbor untuk melihat data dengan visual yang dibutuhkan</div>
          </div>
          <div className="flex gap-2">
            <Button text={<FiArrowLeft fontSize={20} />} variant="contained" />
            <Button text={<FiArrowRight fontSize={20} />} variant="contained" />
          </div>
        </div>

        <div>

        </div>
      </div>

      <div className="flex justify-center bg-image5 w-full">
        <div className="flex flex-col gap-4 my-8 container">
          <div className="py-4 font-bold text-center text-primary-2 text-xl md:text-4xl">Akses Satu Data Kesehatan untuk Indonesia</div>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
            {dataAccessSatuData.map((r, i) => (
              <div key={`accesssatudata-${i}`} className="bg-white p-4 border rounded-lg">
                <div><Image alt="satusehat" src={r.image} width={99} height={126} /></div>
                <div className="font-bold text-primary text-xl">{r.label}</div>
                <div>{r.value}</div>
                <div className="flex items-center gap-4 font-bold text-primary">
                  <div>Telusuri</div>
                  <div><GoArrowRight /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-8 container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="font-bold text-primary text-xl md:text-3xl">Mengapa SATUSEHAT Data?</div>
            <div>
              <div className="font-bold text-xl" style={{ color: "#E04F16" }}>Sumber Data Kesehatan Terpusat</div>
              <div>Satu sumber data kesehatan yang reliabel dan tepercaya untuk Kementerian/Lembaga, Dinas Provinsi/Kabupaten/Kota, fasyankes, hingga masyarakat umum.</div>
            </div>
            <div>
              <div className="font-bold text-xl" style={{ color: "#E04F16" }}>Alat Pendukung Pengambilan Kebijakan</div>
              <div>Mendukung pengawasan, perumusan kebijakan, dan pengambilan keputusan yang terukur dan tepat sasaran.</div>
            </div>
            <div>
              <div className="font-bold text-xl" style={{ color: "#E04F16" }}>Sumber Data Kesehatan Terpusat</div>
              <div>Satu sumber data kesehatan yang reliabel dan tepercaya untuk Kementerian/Lembaga, Dinas Provinsi/Kabupaten/Kota, fasyankes, hingga masyarakat umum.</div>
            </div>
            <div>
              <div className="font-bold text-xl" style={{ color: "#E04F16" }}>Sumber Data Tepercaya</div>
              <div>Data yang ditampilkan bersumber dari SATUSEHAT dan hasil survei ketersediaan RME Fasyankes oleh Dirjen Yankes.</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default TopicGeneral