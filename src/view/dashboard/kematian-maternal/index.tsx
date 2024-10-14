'use client';

import Header from "@/components/header";
import styles from "../anc/anc.module.css";
import FilterKematianMaternal from "@/view/home/components/FilterKematianMaternal";
import { IoMdArrowForward, IoMdInformationCircleOutline } from "react-icons/io";
import SectionHeader from "@/components/sectionHeader";
import { useState } from "react";
import { DownloadButton, GraphEcharts } from "@/components";
import { dataMonth } from "@/utils/constants";
import { downloadFile } from "@/helpers/downloadFile";
import DetailCard from "./DetailCard";
import { graphOptionKematianIbu, graphOptionKematianIbuMaster, graphOptionPenyebabDasarKematian, graphOptionTempatMeninggalFaskes } from "./graphOptionsKematianMaternal";
import TableKematianMaternal from "./TableKematianMaternal";
import { ChangeTabAndDownloadKematianMaternal, tabData } from "./ChangeTabAndDownloadKematianMaternal";
import { useRouter } from "next/navigation";

export default function KematianMaternal() {
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [tabActive, setTabActive] = useState({
        sectionChartJumlahKematian: "Chart View",
        sectionChartDistribusiKematian: "Chart View",
        sectionChartPenyebabDasarKematian: "Chart View",
        sectionChartTempatMeninggal: "Chart View",
    });

    const toggleDetailVisibility = () => {
        setIsDetailVisible(!isDetailVisible);
    };


    const router = useRouter();


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

    const handleDownload = () => {
        downloadFile(
            //   header,
            "tes",
            [1, 2, 3],
            //   [persentase, threshold, total],
            ["Persentasi", "Target Cakupan", "Total"],
            "Capaian Skrining Kesehatan Usia Sekolah dan Remaja"
        );
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
        [
            768, 1035, 1093, 1075, 1390, 762, 1177, 1176, 1003, 813, 1290, 1193, 1355,
            1257, 1112, 1338, 948, 746, 997, 1131, 1362, 1478, 1291, 1426, 1434, 819,
            1322, 1495, 924, 1447, 1226, 931, 1103, 1456, 827, 1023, 1350, 927,
        ]
    ];


    const totalData: any = [];
    for (let i = 0; i < dataNasional[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < dataNasional.length; ++j) {
            sum += dataNasional[j][i];
        }
        totalData.push(sum);
    }

    const graphOptionKematianIbuMasterSeries: any = [
        "Nifas",
        "Melahirkan",
        "Hamil",
        "Total",
    ].map((name, sid) => {
        dataNasional.push(dataNasional[sid].map((d, did) => totalData[did] - d));
        return {
            name,
            type: "line",
            label: {
                show: true,
                position: "top",
                formatter: (params: any) => {
                    return `${params.value}`;
                },
            },
            data: dataNasional[sid],
        };
    });

    const graphOptionKematianIbuSeries: any[] = [
        "Nifas",
        "Melahirkan",
        "Hamil",
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

    const graphOptionPenyebabDasarKematianSeries: any[] = [
        "Nifas",
        "Melahirkan",
        "Hamil",
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
                position: "insideRight",
                formatter: (params: any) => {
                    return `${params.value.toFixed(2)}%`;
                },
            },
        };
    });

    const graphOptionTempatMeninggalFaskesSeries: any[] = [
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

    graphOptionTempatMeninggalFaskesSeries.push({
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
                <FilterKematianMaternal />
            </div>

            {/* Section Button Analisis */}
            <div className="w-full flex justify-end mt-5">
                <div
                    className="bg-primary w-[181px] flex h-9 rounded-[50px] justify-center items-center px-2 whitespace-nowrap cursor-pointer"
                >
                    <IoMdArrowForward size={25} color="white" />
                    <p className="font-bold text-white pl-1" onClick={() => router.push('/dashboard/kematian-maternal/analisis-kematian-maternal')}>Analisis Lanjutan</p>
                </div>
            </div>

            {/* Section Chart Jumlah Kematian Maternal */}
            <SectionHeader
                title="Jumlah Kematian Maternal"
            />
            <div className="w-full grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-12 md:col-span-4 border w-full bg-[#9F1AB1] border-[#D6D6D6] rounded-2xl py-6 px-8 flex flex-col relative max-h-fit">
                    <div className="absolute top- right-8">
                        <IoMdInformationCircleOutline size={24} color="#fff" />
                    </div>
                    <p className="text-[16px] font-[500] text-white">Jumlah Kematian</p>
                    <p className="text-[36px] font-[600] text-white">12,000</p>
                    <p className="text-[20px] font-bold text-white">AKI 539 per 100.000 Kelahiran</p>
                    <button className="text-white font-[400] py-2 flex items-center" onClick={toggleDetailVisibility}>
                        Lihat Detail <IoMdArrowForward className={`ml-2 transform ${isDetailVisible ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                    {isDetailVisible && (
                        <div className="text-white mt-4 space-y-3">
                            <DetailCard label="Ibu Hamil" percentage={35} count={4200} color="bg-[#6AA84F]" />
                            <DetailCard label="Ibu Melahirkan" percentage={35} count={4200} color="bg-[#4A86E8]" />
                            <DetailCard label="Ibu Nifas" percentage={30} count={3600} color="bg-[#FF9900]" />
                        </div>
                    )}
                </div>
                <div className="col-span-12 md:col-span-8 border w-full border-[#D6D6D6] rounded-2xl ">
                    <div className="px-8 py-6" >
                        <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnDownloadPostion="bottom" sectionClicked="sectionChartJumlahKematian" />
                    </div>
                    {tabActive.sectionChartJumlahKematian === "Chart View" && (
                        <div className="flex flex-col items-end">
                            <GraphEcharts graphOptions={graphOptionKematianIbuMaster(graphOptionKematianIbuMasterSeries)} opts={{ height: 400 }} />
                            <div onClick={handleDownload} className="mb-4 mr-4">
                                <DownloadButton
                                    text=""
                                    isDropdown={true}
                                    options={[
                                        { label: 'Png', onClick: () => handleDownload() },
                                        { label: 'Jpeg', onClick: () => handleDownload() }
                                    ]}
                                />
                            </div>
                        </div>
                    )
                    }
                    {tabActive.sectionChartJumlahKematian === "Table View" && (
                        <div className="px-8 pb-3">
                            <div className="px-4 py-4 overflow-hidden">
                                <TableKematianMaternal
                                    showFilter={true}
                                    column={[
                                        "No",
                                        "Bulan",
                                        "Semua Jumlah",
                                        "Jumlah Kematian",
                                        "%"
                                    ]}
                                    dataTable={[
                                        {
                                            No: 1,
                                            Bulan: "Januari",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 2,
                                            Bulan: "Februari",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 3,
                                            Bulan: "Maret",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 4,
                                            Bulan: "April",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 5,
                                            Bulan: "Mei",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 6,
                                            Bulan: "Juni",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 7,
                                            Bulan: "Juli",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 8,
                                            Bulan: "Agustus",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 9,
                                            Bulan: "September",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 10,
                                            Bulan: "Oktober",
                                            "Semua Jumlah": 210,
                                            "Jumlah Kematian": 89,
                                            "%": 42.4,
                                        },
                                        {
                                            No: 11,
                                            Bulan: "November",
                                            "Semua Jumlah": 210,
                                            "Jumlah Keamtian": 89,
                                            "%": 42.4,
                                        },

                                    ]}
                                />
                            </div>
                        </div>

                    )}

                </div>
            </div>

            {/* Section Chart Distribusi Kematian Ibu di 38 Provinsi */}
            <SectionHeader
                title="Distribusi Kematian Ibu di 38 Provinsi"
            />
            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionChartDistribusiKematian" />
                </div>
                {tabActive.sectionChartDistribusiKematian === "Chart View" && (
                    <GraphEcharts
                        graphOptions={graphOptionKematianIbu(graphOptionKematianIbuSeries)}
                        opts={{
                            height: 500,
                        }}
                    />
                )
                }
                {tabActive.sectionChartDistribusiKematian === "Table View" && (
                    <div className="px-8 pb-3">
                        <div className="px-4 py-4 overflow-hidden">
                            <TableKematianMaternal
                                showFilter={true}
                                showSearch={true}
                                column={[
                                    "No",
                                    "Profinsi",
                                    "Kab/Kota",
                                    "Jumlah Kematian",
                                    "Jumlah Kematian (Hamil)",
                                    "%"
                                ]}
                                dataTable={[
                                    {
                                        No: 1,
                                        Provinsi: "DKI Jakarta",
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

                )}


            </div>

            {/* Section Chart Penyebab Dasar Kematian Ibu */}
            <SectionHeader
                title="Penyebab Dasar Kematian Ibu"
            />
            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionChartPenyebabDasarKematian" />
                </div>
                {tabActive.sectionChartPenyebabDasarKematian === "Chart View" && (
                    <GraphEcharts
                        graphOptions={graphOptionPenyebabDasarKematian(graphOptionPenyebabDasarKematianSeries)}
                        opts={{
                            height: 500,
                        }}
                    />
                )
                }
                {tabActive.sectionChartPenyebabDasarKematian === "Table View" && (
                    <div className="px-8 pb-3">
                        <div className="px-4 py-4 overflow-hidden">
                            <TableKematianMaternal
                                column={[
                                    "No",
                                    "Kematian Maternal",
                                    "Hamil",
                                    "Bersalin",
                                    "Nifas"
                                ]}
                                dataTable={[
                                    {
                                        No: 1,
                                        "Kematian Maternal": "Jumlah",
                                        Hamil: 210,
                                        Bersalin: 210,
                                        Nifas: 210,
                                    },
                                    {
                                        No: 2,
                                        "Kematian Maternal": "Persentase",
                                        Hamil: 210,
                                        Bersalin: 210,
                                        Nifas: 210,
                                    },
                                    {
                                        No: 3,
                                        "Kematian Maternal": "Ranking",
                                        Hamil: 210,
                                        Bersalin: 210,
                                        Nifas: 210,
                                    }
                                ]}
                            />
                        </div>
                    </div>

                )}

            </div>

            {/* Section Chart Tempat Meninggal Berdasarkan Faskes */}
            <SectionHeader
                title="Tempat Meninggal Berdasarkan Faskes"
            />
            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionChartTempatMeninggal" />
                </div>
                {tabActive.sectionChartTempatMeninggal === "Chart View" && (
                    <GraphEcharts
                        graphOptions={graphOptionTempatMeninggalFaskes(graphOptionTempatMeninggalFaskesSeries)}
                        opts={{
                            height: 500,
                        }}
                    />
                )
                }
                {tabActive.sectionChartTempatMeninggal === "Table View" && (
                    <div className="px-8 pb-3">
                        <div className="px-4 py-4 overflow-hidden">
                            <TableKematianMaternal
                                column={[
                                    "No",
                                    "Jenis",
                                    "Jumlah",
                                ]}
                                dataTable={[
                                    {
                                        No: 1,
                                        Jenis: "Faskes",
                                        Jumlah: 210,
                                    },
                                    {
                                        No: 2,
                                        Jenis: "Rumah",
                                        Jumlah: 210,
                                    },
                                    {
                                        No: 3,
                                        Jenis: "Lainnya",
                                        Jumlah: 210,
                                    },
                                ]}
                            />
                        </div>
                    </div>

                )}

            </div>

        </div>
    );
}