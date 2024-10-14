'use client';

import React, { useState } from 'react'
import styles from "../../anc/anc.module.css";
import Header from '@/components/header';
import FilterKematianMaternal from '@/view/home/components/FilterKematianMaternal';
import { IoMdArrowBack } from 'react-icons/io';
import { useRouter } from "next/navigation";
import SectionHeader from '@/components/sectionHeader';
import { ChangeTabAndDownloadKematianMaternal, tabData } from '../ChangeTabAndDownloadKematianMaternal';
import { GraphEcharts } from '@/components';
import TableKematianMaternal from '../TableKematianMaternal';
import { dataMonth } from '@/utils/constants';
import { graphOptionKondisiIbuSebelumnya, graphOptionPerbandinganJumlahAdmisiObstetri, graphOptionPeriodeKematian, graphOptionRiwayatFrekuensiANC, graphOptionRiwayatLokasiANC, graphOptionTop10CFR } from '../graphOptionsKematianMaternal';



export default function KematianMaternalAnalisis() {
  const [tabActive, setTabActive] = useState({
    sectionPerbandinganJumlahAdmisiObstetri: "Chart View",
    sectionTop10CFRPenyebabKematian: "Chart View",
    sectionKematianIbuRiwayatFrekuensiANC: "Chart View",
    sectionKematianIbuRiwayatLokasiANC: "Chart View",
    sectionDistribusiKondisiIbuSebelumnya: "Chart View",
    sectionPeriodeKetikaMeninggal: "Chart View",
    sectionStatusRujukanKematianIbu: "Chart View",
});

  const filterState = useState({
    tahun: 2023,
    // tahun: new Date().getFullYear(),
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
    tipe_vaksin: "bias",
    nama_vaksin: "BIAS  Lengkap",
    tipe_vaksin2: "bias",
    tipe_vaksin3: "bias",
    tipe_vaksin4: "bias",
    tipe_vaksin5: "bias",
    tren_type: "kumulatif",
  });

  const handleCallback = (childData: tabData) => {
    setTabActive((prevState) => ({
        ...prevState,
        [childData?.tabClicked]: childData.tab,
    }));
};

  const dataNasional = [
    [
      1386, 976, 1473, 805, 1201, 1039, 1465, 1106, 923, 702, 1172, 731, 833,
      1254, 1471, 1043, 1347, 994, 1305, 1387, 1259, 1230, 986, 1462, 679, 1390,
      931, 854, 1091, 1358, 824, 1365, 1176, 1008, 1395, 1332, 1102, 1297,
    ], // Data pertama
    [
      1086, 1099, 1380, 1460, 1301, 896, 762, 1189, 1083, 900, 1258, 1080, 1267,
      1092, 1132, 1059, 1260, 1200, 1382, 1199, 1389, 1407, 1223, 1006, 1284,
      871, 1031, 1192, 1444, 1261, 1396, 1306, 987, 808, 1303, 799, 1299, 1004,
    ], // Data kedua
  ];

  const totalData: any = [];
  for (let i = 0; i < dataNasional[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < dataNasional.length; ++j) {
      sum += dataNasional[j][i];
    }
    totalData.push(sum);
  }

  const graphOptionPerbandinganJumlahAdmisiObstetriSeries: any[] = [
    "Jumlah Kematian",
    "Jumlah Admisi Obstetri",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "80%",
      data: dataNasional[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
      ),
    };
  });

  const graphOptionTop10CFRSeries: any[] = [
    "Kematian",
    "Diagnosa",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "80%",
      data: dataNasional[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
      ),
      label: {
        show: true,
        position: "insideTop",
        formatter: (params: any) => {
          return params.value;
        },
      },
    };
  });

  const graphOptionRiwayatFrekuensiANCSeries: any[] = [
    "Jumlah",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "80%",
      data: dataNasional[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
      ),
    };
  });

  graphOptionRiwayatFrekuensiANCSeries.push({
    name: "Persentase",
    type: "line",
    data: dataNasional[0].map((d, did) =>
      totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
    ),
    label: {
      show: true,
      position: "top",
      formatter: (params: any) => {
        return `${params.value.toFixed(2)}%`;
      },
    },
  });

  const graphOptionRiwayatLokasiANCSeries: any[] = [
    "Jumlah",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "80%",
      data: dataNasional[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
      ),
    };
  });

  graphOptionRiwayatLokasiANCSeries.push({
    name: "Persentase",
    type: "line",
    data: dataNasional[0].map((d, did) =>
      totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
    ),
    label: {
      show: true,
      position: "top",
      formatter: (params: any) => {
        return `${params.value.toFixed(2)}%`;
      },
    },
  });

  // graphOptionKondisiIbuSebelumnya
  const graphOptionKondisiIbuSebelumnyaSeries: any[] = [
    "Jumlah",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "80%",
      data: dataNasional[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
      ),
    };
  });

  graphOptionKondisiIbuSebelumnyaSeries.push({
    name: "Persentase",
    type: "line",
    data: dataNasional[0].map((d, did) =>
      totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
    ),
    label: {
      show: true,
      position: "top",
      formatter: (params: any) => {
        return `${params.value.toFixed(2)}%`;
      },
    },
  });

  // graphOptionPeriodeKematian
  const graphOptionPeriodeKematianSeries: any[] = [
    "Jumlah",
  ].map((name, sid) => {
    return {
      name,
      type: "bar",
      stack: "total",
      barWidth: "80%",
      data: dataNasional[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
      ),
    };
  });

  graphOptionPeriodeKematianSeries.push({
    name: "Persentase",
    type: "line",
    data: dataNasional[0].map((d, did) =>
      totalData[did] <= 0 ? 0 : (d / totalData[did]) * 100
    ),
    label: {
      show: true,
      position: "top",
      formatter: (params: any) => {
        return `${params.value.toFixed(2)}%`;
      },
    },
  });

  const graphOptionRujukanKematianIbu: any = {
    color: ["#30B0C7", "#007AFF", "#FF9500"],
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: 'vertical',
      right: '25%',
      top: 'center',
      show: true,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 20,
      itemGap: 10,
      textStyle: {
        color: '#000',
      },
    },
    series: [
      {
        name: "Total",
        type: "pie",
        radius: ["30%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "inside",
          formatter: (params: any) => {
            return `{value|${params.value}%}\n{label|${params.name}}`;
          },
          rich: {
            value: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 20,
            },
            label: {
              color: '#fff',
            },
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 30, name: "Datang Sendiri" },
          { value: 30, name: "Rujukan Dari Puskesmas" },
          { value: 40, name: "Rujukan Dari RS" },
        ],
      },
    ],
  };

  const router = useRouter();

  return (
    <div className={`flex flex-col items-center p-[30px]  ${styles.jakartaFont}`}>
      {/* Section Header */}
      <Header
        title={`Dashboard\nCapaian SATUSEHAT`}
        subtitle="Kematian Maternal"
        desc={`Dashboard ini menampilkan analisis hasil skrining/deteksi dini Penyakit Tidak Menular (PTM) berdasarkan data yang dikirim oleh Fasyankes ke SATUSEHAT`}
        space={true}
        dateUpdate="10 Agustus 2021"
        contentSpace={`Dashboard ini menampilkan data berdasarkan pemeriksaan pertama dari setiap jenis\nskrining PTM yang dilakukan peserta dalam 1 tahun`}
      />


      {/* Section Filter */}
      <div className="w-full mt-10">
        {/* TODO : Change UI For Filter */}
        <FilterKematianMaternal showPeriode={false} />
      </div>

      {/* Section Button Analisis */}
      <div className="w-full flex justify-start mt-10 mb-2">
        <div
          className="bg-primary w-fit flex h-9 rounded-[50px] justify-center items-center px-2 whitespace-nowrap cursor-pointer"
        >
          <IoMdArrowBack size={25} color="white" />
          <p className="font-bold text-white pl-1" onClick={() => router.push('/dashboard/kematian-maternal/')}>Kembali Kehalaman Utama</p>
        </div>
      </div>

      {/* Section Perbandingan Jumlah Admisi Obstetri di Faskes dan Kematian Ibu, Per Kelompok Usia Ibu  */}
      <SectionHeader
        title="Perbandingan Jumlah Admisi Obstetri di Faskes dan Kematian Ibu, Per Kelompok Usia Ibu"
      />
      <div className="w-full mt-4">
        <div className="px-8">
          <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked='sectionPerbandinganJumlahAdmisiObstetri' />
        </div>
        {tabActive.sectionPerbandinganJumlahAdmisiObstetri === "Chart View" && (
          <GraphEcharts
            graphOptions={graphOptionPerbandinganJumlahAdmisiObstetri(graphOptionPerbandinganJumlahAdmisiObstetriSeries)}
            opts={{
              height: 500,
            }}
          />
        )
        }
        {tabActive.sectionPerbandinganJumlahAdmisiObstetri === "Table View" && (
          <div className="px-8 pb-3">
            <div className="px-4 py-4 overflow-hidden">
              <TableKematianMaternal
                showFilter={false}
                showSearch={false}
                column={[
                  "No",
                  "Kelompok Usia",
                  "Jumlah Admisi Obstetri",
                  "Jumlah Kematian",
                  "%"
                ]}
                dataTable={[
                  {
                    No: 1,
                    "Kelompok Usia": "<12 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                  {
                    No: 2,
                    "Kelompok Usia": "12-15 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                  {
                    No: 3,
                    "Kelompok Usia": "16-19 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                  {
                    No: 4,
                    "Kelompok Usia": "20-35 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                  {
                    No: 5,
                    "Kelompok Usia": ">35 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                ]}
              />
            </div>
          </div>

        )}


      </div>


      {/* Section Top 10 CFR Penyebab Kematian Maternal */}
      <SectionHeader
        title="Top 10 CFR Penyebab Kematian Maternal"
      />
      <div className="w-full mt-4">
        <div className="px-8">
          <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked='sectionTop10CFRPenyebabKematian' />
        </div>
        {tabActive.sectionTop10CFRPenyebabKematian === "Chart View" && (
          <GraphEcharts
            graphOptions={graphOptionTop10CFR(graphOptionTop10CFRSeries)}
            opts={{
              height: 500,
            }}
          />
        )
        }
        {tabActive.sectionTop10CFRPenyebabKematian === "Table View" && (
          <div className="px-8 pb-3">
            <div className="px-4 py-4 overflow-hidden">
              <TableKematianMaternal
                showFilter={false}
                showSearch={false}
                column={[
                  "No",
                  "Kelompok Usia",
                  "Jumlah Admisi Obstetri",
                  "Jumlah Kematian",
                  "%"
                ]}
                dataTable={[
                  {
                    No: 1,
                    "Kelompok Usia": "<12 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                  {
                    No: 2,
                    "Kelompok Usia": "12-15 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                  {
                    No: 3,
                    "Kelompok Usia": "16-19 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                  {
                    No: 4,
                    "Kelompok Usia": "20-35 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                  {
                    No: 5,
                    "Kelompok Usia": ">35 tahun",
                    "Jumlah Admisi Obstetri": 210,
                    "Jumlah Kematian": 210,
                    "%": 210,
                  },
                ]}
              />
            </div>
          </div>

        )}


      </div>

      {/* Section Penyebab Kematian Ibu Berdasarkan Lama Perawatan */}
      <SectionHeader
        title="Penyebab Kematian Ibu Berdasarkan Lama Perawatan"
      />
      <div className='w-full mt-4'>
        <div className="px-8 pb-3">
          <div className="px-4 py-4 overflow-hidden">
            <TableKematianMaternal
              showFilter={true}
              showSearch={true}
              column={[
                "No",
                "Provinsi",
                "Kab/Kota",
                "Jumlah Kematian",
                "Jumlah Kematian (Hamil)",
                "%"
              ]}
              dataTable={[
                {
                  No: 1,
                  "Provinsi": "DKI Jakarta",
                  "Kab/Kota": "Jakarta Utara",
                  "Jumlah Kematian": 210,
                  "Jumlah Kematian (Hamil)": 210,
                  "%": 210,
                },
                {
                  No: 2,
                  Provinsi: "DKI Jakarta",
                  "Kab/Kota": "Jakarta Barat",
                  "Jumlah Kematian": 210,
                  "Jumlah Kematian (Hamil)": 210,
                  "%": 210,
                },
                {
                  No: 3,
                  Provinsi: "DKI Jakarta",
                  "Kab/Kota": "Jakarta Timur",
                  "Jumlah Kematian": 210,
                  "Jumlah Kematian (Hamil)": 210,
                  "%": 210,
                },
                {
                  No: 4,
                  Provinsi: "DKI Jakarta",
                  "Kab/Kota": "Jakarta Selatan",
                  "Jumlah Kematian": 210,
                  "Jumlah Kematian (Hamil)": 210,
                  "%": 210,
                },
                {
                  No: 5,
                  Provinsi: "DKI Jakarta",
                  "Kab/Kota": "Jakarta Pusat",
                  "Jumlah Kematian": 210,
                  "Jumlah Kematian (Hamil)": 210,
                  "%": 210,
                },
              ]}
            />
          </div>
        </div>
      </div>


      {/* Section Distribusi Kasus Kematian Ibu Berdasarkan Riwayat Frekuensi ANC */}
      <SectionHeader
        title="Distribusi Kasus Kematian Ibu Berdasarkan Riwayat Frekuensi ANC"
      />
      <div className='w-full mt-4'>
        <div className="px-8">
          <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked='sectionKematianIbuRiwayatFrekuensiANC' />
        </div>
        {tabActive.sectionKematianIbuRiwayatFrekuensiANC === "Chart View" && (
          <GraphEcharts
            graphOptions={graphOptionRiwayatFrekuensiANC(graphOptionRiwayatFrekuensiANCSeries)}
            opts={{
              height: 500,
            }}
          />
        )
        }
        {tabActive.sectionKematianIbuRiwayatFrekuensiANC === "Table View" && (
          <div className="px-8 pb-3">
            <div className="px-4 py-4 overflow-hidden">
              <TableKematianMaternal
                column={[
                  "No",
                  "ANC",
                  "Jumlah",
                ]}
                dataTable={[
                  {
                    No: 1,
                    ANC: "Faskes",
                    Jumlah: 210,
                  },
                  {
                    No: 2,
                    ANC: "Rumah",
                    Jumlah: 210,
                  },
                  {
                    No: 3,
                    ANC: "Lainnya",
                    Jumlah: 210,
                  },
                ]}
              />
            </div>
          </div>

        )}
      </div>


      {/* Section Distribusi Kasus Kematian Ibu Berdasarkan Riwayat Lokasi ANC */}
      <SectionHeader
        title="Distribusi Kasus Kematian Ibu Berdasarkan Riwayat Lokasi ANC"
      />
      <div className='w-full mt-4'>
        <div className="px-8">
          <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked='sectionKematianIbuRiwayatLokasiANC' />
        </div>
        {tabActive.sectionKematianIbuRiwayatLokasiANC === "Chart View" && (
          <GraphEcharts
            graphOptions={graphOptionRiwayatLokasiANC(graphOptionRiwayatLokasiANCSeries)}
            opts={{
              height: 500,
            }}
          />
        )
        }
        {tabActive.sectionKematianIbuRiwayatLokasiANC === "Table View" && (
          <div className="px-8 pb-3">
            <div className="px-4 py-4 overflow-hidden">
              <TableKematianMaternal
                column={[
                  "No",
                  "Tempat ANC",
                  "Jumlah",
                ]}
                dataTable={[
                  {
                    No: 1,
                    "Tempat ANC": "Faskes",
                    Jumlah: 210,
                  },
                  {
                    No: 2,
                    "Tempat ANC": "Rumah",
                    Jumlah: 210,
                  },
                  {
                    No: 3,
                    "Tempat ANC": "Lainnya",
                    Jumlah: 210,
                  },
                ]}
              />
            </div>
          </div>

        )}
      </div>

      {/* Section Distribusi Kasus Kematian Ibu Berdasarkan Tindakan ANC */}
      <SectionHeader
        title="Distribusi Kasus Kematian Ibu Berdasarkan Tindakan ANC"
      />
      <div className='w-full mt-4'>
        <div className="px-8 pb-3">
          <div className="px-4 py-4 overflow-hidden">
            <TableKematianMaternal
              showFilter={false}
              showSearch={false}
              column={[
                "No",
                "Trisemester Kehamilan",
                "Dilakukan Oleh Dokter",
                "Dilakukan Oleh Nakes",
                "Tidak ANC",
                "Tidak Ada Data"
              ]}
              dataTable={[
                {
                  No: 1,
                  "Trisemester Kehamilan": "Trisemester 1",
                  "Dilakukan Oleh Dokter": 210,
                  "Dilakukan Oleh Nakes": 210,
                  "Tidak ANC": 210,
                  "Tidak Ada Data": 210,
                },
                {
                  No: 2,
                  "Trisemester Kehamilan": "Trisemester 2",
                  "Dilakukan Oleh Dokter": 210,
                  "Dilakukan Oleh Nakes": 210,
                  "Tidak ANC": 210,
                  "Tidak Ada Data": 210,
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Section Distribusi Kondisi Ibu Sebelumnya */}
      <SectionHeader
        title="Distribusi Kondisi Ibu Sebelumnya"
      />
      <div className='w-full mt-4'>
        <div className="px-8">
          <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked='sectionDistribusiKondisiIbuSebelumnya' />
        </div>
        {tabActive.sectionDistribusiKondisiIbuSebelumnya === "Chart View" && (
          <GraphEcharts
            graphOptions={graphOptionKondisiIbuSebelumnya(graphOptionKondisiIbuSebelumnyaSeries)}
            opts={{
              height: 500,
            }}
          />
        )
        }
        {tabActive.sectionDistribusiKondisiIbuSebelumnya === "Table View" && (
          <div className="px-8 pb-3">
            <div className="px-4 py-4 overflow-hidden">
              <TableKematianMaternal
                showFilter={false}
                showSearch={false}
                column={[
                  "No",
                  "Provinsi",
                  "Kab/Kota",
                  "Kondisi Kesehatan Mental Yang Mempengaruhi",
                  "Jumlah Kematian (Hamil)"
                ]}
                dataTable={[
                  {
                    No: 1,
                    "Provinsi": "DKI Jakarta",
                    "Kab/Kota": "Jakarta Utara",
                    "Kondisi Kesehatan Mental Yang Mempengaruhi": 210,
                    "Jumlah Kematian (Hamil)": 210,
                  },
                  {
                    No: 2,
                    Provinsi: "DKI Jakarta",
                    "Kab/Kota": "Jakarta Barat",
                    "Kondisi Kesehatan Mental Yang Mempengaruhi": 210,
                    "Jumlah Kematian (Hamil)": 210,
                  },
                  {
                    No: 3,
                    Provinsi: "DKI Jakarta",
                    "Kab/Kota": "Jakarta Timur",
                    "Kondisi Kesehatan Mental Yang Mempengaruhi": 210,
                    "Jumlah Kematian (Hamil)": 210,
                  },
                  {
                    No: 4,
                    Provinsi: "DKI Jakarta",
                    "Kab/Kota": "Jakarta Selatan",
                    "Kondisi Kesehatan Mental Yang Mempengaruhi": 210,
                    "Jumlah Kematian (Hamil)": 210,
                  },
                  {
                    No: 5,
                    Provinsi: "DKI Jakarta",
                    "Kab/Kota": "Jakarta Pusat",
                    "Kondisi Kesehatan Mental Yang Mempengaruhi": 210,
                    "Jumlah Kematian (Hamil)": 210,
                  },
                ]}
              />
            </div>
          </div>

        )}
      </div>

      {/* Section Periode Ketika Meninggal */}
      <SectionHeader
        title="Periode Ketika Meninggal"
      />
      <div className='w-full mt-4'>
        <div className="px-8">
          <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked='sectionPeriodeKetikaMeninggal' />
        </div>
        {tabActive.sectionPeriodeKetikaMeninggal === "Chart View" && (
          <GraphEcharts
            graphOptions={graphOptionPeriodeKematian(graphOptionPeriodeKematianSeries)}
            opts={{
              height: 500,
            }}
          />
        )
        }
        {tabActive.sectionPeriodeKetikaMeninggal === "Table View" && (
          <div className="px-8 pb-3">
            <div className="px-4 py-4 overflow-hidden">
              <TableKematianMaternal
                column={[
                  "No",
                  "Periode",
                  "Jumlah Kematian Ibu",
                ]}
                dataTable={[
                  {
                    No: 1,
                    Periode: "Trisemester 1",
                    "Jumlah Kematian Ibu": 210,
                  },
                  {
                    No: 2,
                    Periode: "Trisemester 2",
                    "Jumlah Kematian Ibu": 210,
                  },
                  {
                    No: 3,
                    Periode: "Trisemester 3",
                    "Jumlah Kematian Ibu": 210,
                  },
                ]}
              />
            </div>
          </div>

        )}
      </div>

      {/* Section Status Rujukan Kematian Ibu */}
      <SectionHeader
        title="Status Rujukan Kematian Ibu"
      />
      <div className='w-full mt-4'>
        <div className="px-8">
          <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked='sectionStatusRujukanKematianIbu' />
        </div>
        {tabActive.sectionStatusRujukanKematianIbu === "Chart View" && (

          <GraphEcharts
            graphOptions={graphOptionRujukanKematianIbu}
            opts={{
              height: 500,
            }}
          />

        )
        }
        {tabActive.sectionStatusRujukanKematianIbu === "Table View" && (
          <div className="px-8 pb-3">
            <div className="px-4 py-4 overflow-hidden">
              <TableKematianMaternal
                column={[
                  "No",
                  "Periode Ketika Meninggal",
                  "Jumlah",
                  "%"
                ]}
                dataTable={[
                  {
                    No: 1,
                    "Periode Ketika Meninggal": "Trisemester 1",
                    Jumlah: 210,
                    "%": 210,
                  },
                  {
                    No: 2,
                    "Periode Ketika Meninggal": "Trisemester 2",
                    Jumlah: 210,
                    "%": 210,
                  },
                  {
                    No: 3,
                    "Periode Ketika Meninggal": "Trisemester 3",
                    Jumlah: 210,
                    "%": 210,
                  }
                ]}
              />
            </div>
          </div>

        )}
      </div>

    </div>
  )
}
