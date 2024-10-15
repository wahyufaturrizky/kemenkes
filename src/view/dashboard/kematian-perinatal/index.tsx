'use client';

import Header from "@/components/header";
import styles from "../anc/anc.module.css";
import FilterKematianMaternal from "@/view/home/components/FilterKematianMaternal";
import { IoMdInformationCircleOutline } from "react-icons/io";
import SectionHeader from "@/components/sectionHeader";
import { useState } from "react";
import { DownloadButton, GraphEcharts } from "@/components";
import { dataMonth } from "@/utils/constants";
import { downloadFile } from "@/helpers/downloadFile";
import { ChangeTabAndDownloadKematianMaternal, tabData } from "../kematian-maternal/ChangeTabAndDownloadKematianMaternal";
import TableKematianMaternal from "../kematian-maternal/TableKematianMaternal";
import { graphOptionDataSurvivalBayiBerdasarkanUsiaGestasi, graphOptionDataSurvivalNeonatusBerdasarkanBeratLahir, graphOptionDataSurvivalNeonatusBerdasarkanLahirDalamLuar, graphOptionKematianBayi, graphOptionKematianBayiAntepartum, graphOptionKematianBayiIntarpartum, graphOptionKematianNeonatus, graphOptionPenyebabKematianBayiBerdasarkanUsiaGestasi, graphOptionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGestasi, graphOptionTempatMeninggalBerdasarkanFaskes } from "./graphOptionsKematianPaternal";

export default function KematianPerinatal() {
    const [tabActive, setTabActive] = useState({
        sectionChartDistribusiKematian: "Chart View",
        sectionDataSurvivalNeonatusBerdasarkanBeratLahir: "Chart View",
        sectionDataSurvivalNeonatusBerdasarkanLahirDalamdanLuar: "Chart View",
        sectionTempatMeninggalBerdasarkanFaskes: "Chart View",
        sectionDataSurvivalBayiBerdasarkanUsiaGestasi: "Chart View",
        sectionPenyebabKematianBayiBerdasarkanUsiaGestasi: "Chart View",
        sectionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGesttasi: "Chart View",
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

    const dummyData2 = [
        [
            10, 20, 30, 40, 50, 60, 70
        ],
    ];

    const dummyData3 = [
        [
            10, 20, 30, 40, 50, 60
        ],
    ];

    const dummyData4 = [
        [
            10, 20, 30, 40, 50, 60, 70, 80, 90
        ],
    ];

    const dummyData5 = [
        [
            10, 20, 30, 40, 50, 60, 70, 80, 90, 10, 12, 13, 14, 15, 16, 17
        ],
    ];


    const totalData: any = [];
    for (let i = 0; i < dataNasional[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < dataNasional.length; ++j) {
            sum += dataNasional[j][i];
        }
        totalData.push(sum);
    }

    const graphOptionKematianBayiSeries: any = [
        "Semua Kematian",
        "Meninggal Lahir Hidup",
        "Meninggal Lahir Mati",
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

    const graphOptionKematianBayiIntarpartumSeries: any[] = [
        "Total",
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "80%",
            data: dummyData2[sid],
            label: {
                show: true,
                position: "right",
                formatter: (params: any) => {
                    return `${params.value.toFixed(2)}%`;
                },
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(199, 237, 235, 0.5)',  // Warna background bar
                borderColor: 'rgba(180, 180, 180, 1)', // Warna border background bar
                borderWidth: 1, // Lebar border background bar
                borderType: 'solid', // Tipe border background bar
            },
        };
    });

    const graphOptionKematianBayiAntepartumSeries: any[] = [
        "Total",
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "80%",
            data: dummyData3[sid],
            label: {
                show: true,
                position: "right",
                formatter: (params: any) => {
                    return `${params.value.toFixed(2)}%`;
                },
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(199, 237, 235, 0.5)',  // Warna background bar
                borderColor: 'rgba(180, 180, 180, 1)', // Warna border background bar
                borderWidth: 1, // Lebar border background bar
                borderType: 'solid', // Tipe border background bar
            },
        };
    });

    const graphOptionKematianNeonatusSeries: any[] = [
        "Total",
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "80%",
            data: dummyData4[sid],
            label: {
                show: true,
                position: "right",
                formatter: (params: any) => {
                    return `${params.value.toFixed(2)}%`;
                },
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(199, 237, 235, 0.5)',  // Warna background bar
                borderColor: 'rgba(180, 180, 180, 1)', // Warna border background bar
                borderWidth: 1, // Lebar border background bar
                borderType: 'solid', // Tipe border background bar
            },
        };
    });

    const graphOptionTempatMeninggalBerdasarkanFaskesSeries: any[] = [
        "Total",
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "80%",
            data: dummyData5[sid],
            label: {
                show: true,
                position: "right",
                formatter: (params: any) => {
                    return `${params.value.toFixed(2)}%`;
                },
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(199, 237, 235, 0.5)',  // Warna background bar
                borderColor: 'rgba(180, 180, 180, 1)', // Warna border background bar
                borderWidth: 1, // Lebar border background bar
                borderType: 'solid', // Tipe border background bar
            },
        };
    });

    const graphOptionDataSurvivalNeonatusBerdasarkanBeratLahirSeries: any[] = [
        "N",
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "80%",
            data: dataNasional[sid],
            label: {
                show: true,
                position: "insideTop",
            },
        };
    });

    graphOptionDataSurvivalNeonatusBerdasarkanBeratLahirSeries.push({
        name: "%",
        type: "line",
        data: dataNasional[1],
        label: {
            show: true,
            position: "top",
            formatter: (params: any) => {
                return `${params.value.toFixed(2)}%`;
            },
            color: 'red',
        },
    });

    const graphOptionDataSurvivalBayiBerdasarkanUsiaGestasiSeries: any[] = [
        "Total",
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "80%",
            data: dataNasional[sid],
            label: {
                show: true,
                position: "insideTop",
                color: 'red'
            },
        };
    });

    const graphOptionDataSurvivalNeonatusBerdasarkanLahirDalamLuarSeries: any[] = [
        "Dalam RS",
        "Luar RS",
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            data: dataNasional[sid],
            itemStyle: {
                color: sid === 0 ? '#0087F4' : '#CF3E53',
            },
            label: {
                show: true,
                position: "insideTop",
            },
        };
    });

    const seriesData = [
        {

            data: [5, 10, 15, 20, 25, 30, 35, 40],
        },
        {

            data: [4, 8, 12, 16, 20, 24, 28, 32],
        },
        {

            data: [3, 6, 9, 12, 15, 18, 21, 24],
        },
        {

            data: [2, 4, 6, 8, 10, 12, 14, 16],
        },
        {

            data: [1, 2, 3, 4, 5, 6, 7, 8],
        },
        {

            data: [0, 2, 4, 6, 8, 10, 12, 14],
        },
        {

            data: [0, 1, 2, 3, 4, 5, 6, 7],
        },
        {

            data: [0, 0, 2, 4, 6, 8, 10, 12],
        },
        {

            data: [0, 0, 1, 3, 5, 7, 9, 11],
        },
        {

            data: [0, 0, 0, 0, 0, 0, 0, 0],
        },
        {

            data: [0, 0, 0, 0, 0, 0, 0, 0],
        }
    ];

    const graphOptionPenyebabKematianBayiBerdasarkanUsiaGestasiSeries: any[] = [
        "N9. BBLR dan prematur",
        "N8. Kondisi neonatus lainnya",
        "N7. Kelainan sistem respirasi dan kardiovaskular",
        "N6. Infeksi",
        "N5. Konvulsi dan kelainan status serebral",
        "N4. Komplikasi kejadian intrapartum",
        "N3. Trauma lahir",
        "N2. Kelainan yang berkaitan dengan usia gestasi dan pertumbuhan janin",
        "N1. Malformasi kongenital, deformasi, dan abnormailtas kromosom",
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "80%",
            data: seriesData[sid].data,
        };
    });

    const graphOptionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGestasiSeries: any[] = [
        "(Q90-Q99) Kelainan kromosom lainnya",
        "(Q80-Q89) Kelainan Bawaan Lainnya",
        "(Q65-Q79) Kelainan Bawaan Sistem Muskuloskeletal",
        "(Q60-Q64) Kelainan Bawaan Saluran Kemih",
        "(Q50-Q56) Kelainan Bawaan Organ Genital",
        "(Q38-Q45) Kelainan Bawaan Sistem Pencernaan",
        "(Q35-Q37) Kelainan Bawaan Celah Bibir dan Palatum",
        "(Q30-Q34) Kelainan Bawaan Sistem Pernapasan",
        "(Q20-Q28) Kellainan Bawaan Peredaran Darah",
        "(Q10-Q18) Kelainan Bawaan Wajah Dan Leher",
        "(Q00-Q07) Kelainan Bawaan SSP"
    ].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "80%",
            data: seriesData[sid].data,
        };
    });

    return (
        <div className={`flex flex-col items-center p-[30px]  ${styles.jakartaFont}`}>
            {/* Section Header */}
            <Header
                title={`Dashboard\nCapaian SATUSEHAT`}
                subtitle="Kematian Perinatal"
                desc={`Dashboard ini menampilkan analisis hasil skrining/deteksi dini Penyakit Tidak Menular (PTM) berdasarkan data yang dikirim oleh Fasyankes ke SATUSEHAT`}
                space={true}
                dateUpdate="10 Agustus 2021"
                contentSpace={`Dashboard ini menampilkan data berdasarkan pemeriksaan pertama dari setiap jenis\nskrining PTM yang dilakukan peserta dalam 1 tahun`}
            />

            {/* Section Filter */}
            <div className="w-full mt-10">
                <FilterKematianMaternal showPeriode={false} />
            </div>

            {/* Section Chart Jumlah Kematian Maternal */}
            <SectionHeader
                title="Jumlah Kematian Perinatal"
            />
            <div className="w-full grid grid-cols-12 gap-4 mt-4">
                <div className="flex col-span-12 md:col-span-4 flex-col gap-2">
                    <div className=" border w-full bg-[#006A65] border-[#D6D6D6] rounded-2xl py-8 px-8 flex flex-col relative max-h-fit">
                        <div className="absolute top- right-8">
                            <IoMdInformationCircleOutline size={24} color="#fff" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-[16px] font-[500] text-white">Jumlah Kematian Bayi</p>
                            <p className="text-[36px] font-[600] text-white">12,000</p>
                            <p className="text-[20px] font-bold text-white">AKI 539 / <span className="font-[600]">100.000 Kelahiran</span></p>
                        </div>
                    </div>
                    <div className=" border w-full bg-[#E5F0EF] border-[#D6D6D6] rounded-2xl py-4 px-8 flex flex-col relative max-h-fit">
                        <div className="absolute top- right-8">
                            <IoMdInformationCircleOutline size={24} color="#006A65" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-[16px] font-[600] text-[#006A65]">Bayi Lahir Hidup</p>
                            <p className="text-[36px] font-[600] text-[#006A65]">12,000</p>
                        </div>
                    </div>
                    <div className=" border w-full bg-[#E5F0EF] border-[#D6D6D6] rounded-2xl py-4 px-8 flex flex-col relative max-h-fit">
                        <div className="absolute top- right-8">
                            <IoMdInformationCircleOutline size={24} color="#006A65" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-[16px] font-[600] text-[#006A65]">Jumlah Meninggal Lahir Hidup</p>
                            <div className="flex justify-between items-center">
                                <p className="text-[36px] font-[600] text-[#006A65]">12,000 <span className="text-[10px]">Kematian</span></p>
                                <p className="text-[10px] text-[#006A65]">n (%) dari total kematian bayi</p>
                            </div>
                        </div>
                    </div>
                    <div className=" border w-full bg-[#E5F0EF] border-[#D6D6D6] rounded-2xl py-4 px-8 flex flex-col relative max-h-fit">
                        <div className="absolute top- right-8">
                            <IoMdInformationCircleOutline size={24} color="#006A65" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-[16px] font-[600] text-[#006A65]">Jumlah Meninggal Lahir Hati</p>
                            <div className="flex justify-between items-center">
                                <p className="text-[36px] font-[600] text-[#006A65]">3,000 <span className="text-[10px]">Kematian</span></p>
                                <p className="text-[10px] text-[#006A65]">n (%) dari total kematian bayi</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-8 border w-full border-[#D6D6D6] rounded-2xl ">
                    <div className="px-8 py-6" >
                        <div className="mb-3 flex flex-row justify-between gap-4">
                            <h3 className="text-[20px] font-[500]">Tren Kematian Bayi</h3>
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
                    <GraphEcharts graphOptions={graphOptionKematianBayi(graphOptionKematianBayiSeries)} opts={{ height: 400 }} />

                </div>
            </div>

            {/* Section Chart Penyebab Dasar Kematian Bayi */}
            <SectionHeader
                title="Penyebab Dasar Kematian Bayi"
            />
            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionChartDistribusiKematian" />
                </div>
                {tabActive.sectionChartDistribusiKematian === "Chart View" && (
                    <div className="mt-4 w-full">
                        <div>
                            <h3 className="text-[24px] font-[600]">Penyebab Kematian <span className="text-[#006A65]">Lahir Hidup</span></h3>
                            <div className="grid mt-4 grid-cols-6 gap-4">
                                <div className="col-span-6 md:col-span-3">
                                    <h4 className="text-[20px] font-[500]">A. Kematian Bayi Intrapartum</h4>
                                    <div className="mt-2 border  border-[#D6D6D6] w-full rounded-2xl">
                                        <GraphEcharts
                                            graphOptions={graphOptionKematianBayiIntarpartum(graphOptionKematianBayiIntarpartumSeries)}
                                            opts={{
                                                height: 500,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <h4 className="text-[20px] font-[500]">B. Kematian Bayi Antepartum</h4>
                                    <div className="mt-2 border border-[#D6D6D6] w-full rounded-2xl">
                                        <GraphEcharts
                                            graphOptions={graphOptionKematianBayiAntepartum(graphOptionKematianBayiAntepartumSeries)}
                                            opts={{
                                                height: 500,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-[24px] font-[600]">Penyebab Kematian <span className="text-[#006A65]">Lahir Mati</span></h3>
                            <div className="mt-4">
                                <h4 className="text-[20px] font-[500]">C. Kematian Neonatus</h4>
                                <div className=" mt-2 border col-span-6 md:col-span-3 w-full md:w-[50%] border-[#D6D6D6] rounded-2xl">
                                    <GraphEcharts
                                        graphOptions={graphOptionKematianNeonatus(graphOptionKematianNeonatusSeries)}
                                        opts={{
                                            height: 500,
                                        }}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                )
                }
                {tabActive.sectionChartDistribusiKematian === "Table View" && (
                    <div className="px-8 pb-3">
                        <div className="px-4 py-4 overflow-hidden">
                            <TableKematianMaternal
                                showFilter={true}
                                showSearch={false}
                                column={[
                                    "No",
                                    "Kematian Perinatal",
                                    "Hamil",
                                    "Bersalin",
                                    "Nifas"
                                ]}
                                dataTable={[
                                    {
                                        No: 1,
                                        "Kematian Perinatal": "Jumlah",
                                        Hamil: 210,
                                        Bersalin: 210,
                                        Nifas: 210,
                                    },
                                    {
                                        No: 2,
                                        "Kematian Perinatal": "Persentase",
                                        Hamil: 210,
                                        Bersalin: 210,
                                        Nifas: 210,
                                    },
                                    {
                                        No: 3,
                                        "Kematian Perinatal": "Ranking",
                                        Hamil: 210,
                                        Bersalin: 210,
                                        Nifas: 210,
                                    },
                                ]}
                            />
                        </div>
                    </div>

                )}


            </div>


            {/* Section Chart Data Survival Neonatus Berdasarkan Berat Lahir */}
            <SectionHeader
                title="Data Survival Neonatus Berdasarkan Berat Lahir"
            />
            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionDataSurvivalNeonatusBerdasarkanBeratLahir" />
                </div>
                {tabActive.sectionDataSurvivalNeonatusBerdasarkanBeratLahir === "Chart View" && (
                    <GraphEcharts
                        graphOptions={graphOptionDataSurvivalNeonatusBerdasarkanBeratLahir(graphOptionDataSurvivalNeonatusBerdasarkanBeratLahirSeries)}
                        opts={{
                            height: 500,
                        }}
                    />
                )
                }
                {tabActive.sectionDataSurvivalNeonatusBerdasarkanBeratLahir === "Table View" && (
                    <div className="px-8 pb-3">
                        <div className="px-4 py-4 overflow-hidden">
                            <TableKematianMaternal
                                column={[
                                    "No",
                                    "Berat Badan Bayi",
                                    "N",
                                    "%"
                                ]}
                                dataTable={[
                                    {
                                        No: 1,
                                        "Berat Badan Bayi": "< 1000 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 2,
                                        "Berat Badan Bayi": "1000 - 1499 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 3,
                                        "Berat Badan Bayi": "1500 - 1999 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 4,
                                        "Berat Badan Bayi": "2000 - 2499 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 5,
                                        "Berat Badan Bayi": "2500 - 2999 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 6,
                                        "Berat Badan Bayi": "3000 - 3499 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 7,
                                        "Berat Badan Bayi": "3500 - 3999 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 8,
                                        "Berat Badan Bayi": "4000 - 4499 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 9,
                                        "Berat Badan Bayi": "4500 - 4999 gr",
                                        N: 210,
                                        "%": 210,
                                    },
                                    {
                                        No: 10,
                                        "Berat Badan Bayi": ">= 5000 gr",
                                        N: 210,
                                        "%": 210,
                                    }
                                ]}
                            />
                        </div>
                    </div>

                )}

            </div>



            {/* Section chart Data Survival Neonatus Berdasarkan Lahir Dalam dan Luar */}
            <SectionHeader
                title="Data Survival Neonatus Berdasarkan Lahir Dalam dan Luar"
            />

            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionDataSurvivalNeonatusBerdasarkanLahirDalamdanLuar" />
                </div>
                {tabActive.sectionDataSurvivalNeonatusBerdasarkanLahirDalamdanLuar === "Chart View" && (
                    <GraphEcharts
                        graphOptions={graphOptionDataSurvivalNeonatusBerdasarkanLahirDalamLuar(graphOptionDataSurvivalNeonatusBerdasarkanLahirDalamLuarSeries)}
                        opts={{
                            height: 500,
                        }}
                    />
                )
                }
                {tabActive.sectionDataSurvivalNeonatusBerdasarkanLahirDalamdanLuar === "Table View" && (
                    <div className="px-8 pb-3">
                        <div className="px-4 py-4 overflow-hidden">
                            <TableKematianMaternal
                                column={[
                                    "No",
                                    "Berat Badan Bayi",
                                    "Dalam RS",
                                    "Luar RS",
                                    "% Dalam",
                                    "% Luar"
                                ]}
                                dataTable={[
                                    {
                                        No: 1,
                                        "Berat Badan Bayi": "< 1000 gr",
                                        "Dalam RS": 210,
                                        "Luar RS": 210,
                                        "% Dalam": 210,
                                        "% Luar": 210,
                                    },
                                    {
                                        No: 2,
                                        "Berat Badan Bayi": "1000 - 1499 gr",
                                        "Dalam RS": 210,
                                        "Luar RS": 210,
                                        "% Dalam": 210,
                                        "% Luar": 210,
                                    },
                                    {
                                        No: 3,
                                        "Berat Badan Bayi": "1500 - 1999 gr",
                                        "Dalam RS": 210,
                                        "Luar RS": 210,
                                        "% Dalam": 210,
                                        "% Luar": 210,
                                    },
                                    {
                                        No: 4,
                                        "Berat Badan Bayi": "2000 - 2499 gr",
                                        "Dalam RS": 210,
                                        "Luar RS": 210,
                                        "% Dalam": 210,
                                        "% Luar": 210,
                                    },
                                    {
                                        No: 5,
                                        "Berat Badan Bayi": "2500 - 2999 gr",
                                        "Dalam RS": 210,
                                        "Luar RS": 210,
                                        "% Dalam": 210,
                                        "% Luar": 210,
                                    },
                                    {
                                        No: 6,
                                        "Berat Badan Bayi": "3000 - 3499 gr",
                                        "Dalam RS": 210,
                                        "Luar RS": 210,
                                        "% Dalam": 210,
                                        "% Luar": 210,
                                    },
                                    {
                                        No: 7,
                                        "Berat Badan Bayi": "3500 - 3999 gr",
                                        "Dalam RS": 210,
                                        "Luar RS": 210,
                                        "% Dalam": 210,
                                        "% Luar": 210,
                                    },
                                    {
                                        No: 8,
                                        "Berat Badan Bayi": "4000 - 4499 gr",
                                        "Dalam RS": 210,
                                        "Luar RS": 210,
                                        "% Dalam": 210,
                                        "% Luar": 210,
                                    },
                                ]}
                            />
                        </div>
                    </div>

                )}

            </div>



            {/* Section chart Tempat Meninggal Berdasarkan Faskes */}
            <SectionHeader
                title="Tempat Meninggal Berdasarkan Faskes"
            />
            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionTempatMeninggalBerdasarkanFaskes" />
                </div>
                {tabActive.sectionTempatMeninggalBerdasarkanFaskes === "Chart View" && (
                    <div className="border mt-2 border-[#D6D6D6] w-full rounded-2xl">
                        <GraphEcharts
                            graphOptions={graphOptionTempatMeninggalBerdasarkanFaskes(graphOptionTempatMeninggalBerdasarkanFaskesSeries)}
                            opts={{
                                height: 700,
                            }}
                        />
                    </div>
                )
                }
                {tabActive.sectionTempatMeninggalBerdasarkanFaskes === "Table View" && (
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
                                    }
                                ]}
                            />
                        </div>
                    </div>

                )}

            </div>

            {/* Section Chart Data Survival Bayi Berdasarkan Usia Gestasi */}
            <SectionHeader
                title="Data Survival Bayi Berdasarkan Usia Gestasi"
                subtitle="Data Survival Berdasarkan Usia Gestasi Periode Januari-Desember 2023"
            />
            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionDataSurvivalBayiBerdasarkanUsiaGestasi" />
                </div>
                {tabActive.sectionDataSurvivalBayiBerdasarkanUsiaGestasi === "Chart View" && (
                    <GraphEcharts
                        graphOptions={graphOptionDataSurvivalBayiBerdasarkanUsiaGestasi(graphOptionDataSurvivalBayiBerdasarkanUsiaGestasiSeries)}
                        opts={{
                            height: 500,
                        }}
                    />
                )
                }
                {tabActive.sectionDataSurvivalBayiBerdasarkanUsiaGestasi === "Table View" && (
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

            {/* Section Chart Penyebab Kematian Bayi Berdasarkan Usia Gestasi */}
            <SectionHeader
                title="Penyebab Kematian Bayi Berdasarkan Usia Gestasi"
            />

            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionPenyebabKematianBayiBerdasarkanUsiaGestasi" />
                </div>
                {tabActive.sectionPenyebabKematianBayiBerdasarkanUsiaGestasi === "Chart View" && (
                    <GraphEcharts
                        graphOptions={graphOptionPenyebabKematianBayiBerdasarkanUsiaGestasi(graphOptionPenyebabKematianBayiBerdasarkanUsiaGestasiSeries)}
                        opts={{
                            height: 700,
                        }}
                    />
                )
                }
                {tabActive.sectionPenyebabKematianBayiBerdasarkanUsiaGestasi === "Table View" && (
                    <div className="px-8 pb-3">
                        <div className="px-4 py-4 overflow-hidden">
                            <TableKematianMaternal
                                column={[
                                    "No",
                                    "GESTASI (Minggu)",
                                    "N9. BBLR dan prematur",
                                    "N8. Kondisi neonatus lainnya",
                                    "N7. Kelainan sistem respirasi dan kardiovaskular",
                                    "N6. Infeksi",
                                    "N5. Konvulsi dan kelainan status serebral",
                                    "N4. Komplikasi kejadian intrapartum",
                                    "N3. Trauma lahir",
                                    "N2. Kelainan yang berkaitan dengan usia gestasi dan pertumbuhan janin",
                                    "N1. Malformasi kongenital, deformasi, dan abnormailtas kromosom",

                                ]}
                                dataTable={[
                                    {
                                        No: 1,
                                        "GESTASI (Minggu)": "< 28",
                                        "N9. BBLR dan prematur": "210",
                                        "N8. Kondisi neonatus lainnya": "210",
                                        "N7. Kelainan sistem respirasi dan kardiovaskular": "210",
                                        "N6. Infeksi": "210",
                                        "N5. Konvulsi dan kelainan status serebral": "210",
                                        "N4. Komplikasi kejadian intrapartum": "210",
                                        "N3. Trauma lahir": "210",
                                        "N2. Kelainan yang berkaitan dengan usia gestasi dan pertumbuhan janin": "210",
                                        "N1. Malformasi kongenital, deformasi, dan abnormailtas kromosom": "210",
                                    },
                                    {
                                        No: 2,
                                        "GESTASI (Minggu)": "28-31",
                                        "N9. BBLR dan prematur": "210",
                                        "N8. Kondisi neonatus lainnya": "210",
                                        "N7. Kelainan sistem respirasi dan kardiovaskular": "210",
                                        "N6. Infeksi": "210",
                                        "N5. Konvulsi dan kelainan status serebral": "210",
                                        "N4. Komplikasi kejadian intrapartum": "210",
                                        "N3. Trauma lahir": "210",
                                        "N2. Kelainan yang berkaitan dengan usia gestasi dan pertumbuhan janin": "210",
                                        "N1. Malformasi kongenital, deformasi, dan abnormailtas kromosom": "210",
                                    },
                                    {
                                        No: 3,
                                        "GESTASI (Minggu)": "32-36",
                                        "N9. BBLR dan prematur": "210",
                                        "N8. Kondisi neonatus lainnya": "210",
                                        "N7. Kelainan sistem respirasi dan kardiovaskular": "210",
                                        "N6. Infeksi": "210",
                                        "N5. Konvulsi dan kelainan status serebral": "210",
                                        "N4. Komplikasi kejadian intrapartum": "210",
                                        "N3. Trauma lahir": "210",
                                        "N2. Kelainan yang berkaitan dengan usia gestasi dan pertumbuhan janin": "210",
                                        "N1. Malformasi kongenital, deformasi, dan abnormailtas kromosom": "210",
                                    }
                                ]}
                            />
                        </div>
                    </div>

                )}

            </div>

            {/* Section chart Penyebab Kematian Bayi Dengan Kelainan Bawaan Berdasarkan Usia Gesttasi */}
            <SectionHeader
                title="Penyebab Kematian Bayi Dengan Kelainan Bawaan Berdasarkan Usia Gestasi"
            />
            <div className="w-full mt-4">
                <div className="px-8" >
                    <ChangeTabAndDownloadKematianMaternal filterState={filterState} data={[]} tabActive={handleCallback} btnWithTitle={false} sectionClicked="sectionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGesttasi" />
                </div>
                {tabActive.sectionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGesttasi === "Chart View" && (
                    <GraphEcharts
                        graphOptions={graphOptionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGestasi(graphOptionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGestasiSeries)}
                        opts={{
                            height: 700,
                        }}
                    />
                )
                }
                {tabActive.sectionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGesttasi === "Table View" && (
                    <div className="px-8 pb-3">
                        <div className="px-4 py-4 overflow-hidden">
                            <TableKematianMaternal
                                column={[
                                    "No",
                                    "GESTASI (Minggu)",
                                    "(Q90-Q99) Kelainan kromosom lainnya",
                                    "(Q80-Q89) Kelainan Bawaan Lainnya",
                                    "(Q65-Q79) Kelainan Bawaan Sistem Muskuloskeletal",
                                    "(Q60-Q64) Kelainan Bawaan Saluran Kemih",
                                    "(Q50-Q56) Kelainan Bawaan Organ Genital",
                                    "(Q38-Q45) Kelainan Bawaan Sistem Pencernaan",
                                    "(Q35-Q37) Kelainan Bawaan Celah Bibir dan Palatum",
                                    "(Q30-Q34) Kelainan Bawaan Sistem Pernapasan",
                                    "(Q20-Q28) Kellainan Bawaan Peredaran Darah",
                                    "(Q10-Q18) Kelainan Bawaan Wajah Dan Leher",
                                    "(Q00-Q07) Kelainan Bawaan SSP"
                                ]}
                                dataTable={[
                                    {
                                        No: 1,
                                        GESTASI: "< 28",
                                        "(Q90-Q99) Kelainan kromosom lainnya": "210",
                                        "(Q80-Q89) Kelainan Bawaan Lainnya": 210,
                                        "(Q65-Q79) Kelainan Bawaan Sistem Muskuloskeletal": 210,
                                        "(Q60-Q64) Kelainan Bawaan Saluran Kemih": 210,
                                        "(Q50-Q56) Kelainan Bawaan Organ Genital": 210,
                                        "(Q38-Q45) Kelainan Bawaan Sistem Pencernaan": 210,
                                        "(Q35-Q37) Kelainan Bawaan Celah Bibir dan Palatum": 210,
                                        "(Q30-Q34) Kelainan Bawaan Sistem Pernapasan": 210,
                                        "(Q20-Q28) Kellainan Bawaan Peredaran Darah": 210,
                                        "(Q10-Q18) Kelainan Bawaan Wajah Dan Leher": 210,
                                        "(Q00-Q07) Kelainan Bawaan SSP": 210,
                                    },
                                    {
                                        No: 2,
                                        GESTASI: "28-31",
                                        "(Q90-Q99) Kelainan kromosom lainnya": 210,
                                        "(Q80-Q89) Kelainan Bawaan Lainnya": 210,
                                        "(Q65-Q79) Kelainan Bawaan Sistem Muskuloskeletal": 210,
                                        "(Q60-Q64) Kelainan Bawaan Saluran Kemih": 210,
                                        "(Q50-Q56) Kelainan Bawaan Organ Genital": 210,
                                        "(Q38-Q45) Kelainan Bawaan Sistem Pencernaan": 210,
                                        "(Q35-Q37) Kelainan Bawaan Celah Bibir dan Palatum": 210,
                                        "(Q30-Q34) Kelainan Bawaan Sistem Pernapasan": 210,
                                        "(Q20-Q28) Kellainan Bawaan Peredaran Darah": 210,
                                        "(Q10-Q18) Kelainan Bawaan Wajah Dan Leher": 210,
                                        "(Q00-Q07) Kelainan Bawaan SSP": 210,
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