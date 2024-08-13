import BackButton from "@/components/back-button";
import DataItem from "@/components/data-item";
import Header from "@/components/header";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowUp, IoMdPerson } from "react-icons/io";
import { MdHistory } from "react-icons/md";

const IndividualData = () => {
  return (
    <div>
      <Header
        title={`Dashboard\nCapaian SatuSehat`}
        subtitle="Layanan Ibu Bersalin dan Ibu Nifas di Puskesmas"
        desc={`Dashboard ini menampilkan: monitoring capaian Indikator ANC berdasarkan data yang dikirim oleh faskes ke SatuSehat`}
        space={false}
      />
      <div className="p-5 border border-[#D6D6D6] rounded-[10px] mt-5">
        <div className="flex justify-between items-center">
          <BackButton label="Kembali" onClick={() => {}} />
          <h2 className="text-[#424242] text-2xl font-bold">
            Data Individu Ibu Melahirkan
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-5">
          <div className="w-full flex flex-col gap-5">
            <div className="bg-primary bg-opacity-10 rounded-[20px] overflow-hidden">
              <div className="h-[49px] w-full bg-primary flex flex-row justify-between items-center px-[20px] py-[12px]">
                <div className="flex items-center gap-2">
                  <FaRegUserCircle className="text-white" size={24} />
                  <span className="text-white text-xl font-semibold">
                    Identitas
                  </span>
                </div>
                <div>
                  <button>
                    <IoIosArrowUp className="text-white" size={24} />
                  </button>
                </div>
              </div>
              <div className="px-[20px] py-[12px]">
                <DataItem label="Nama" value="Bayi Ny. Puff" />
                <DataItem label="NIK" value="-" />
                <DataItem label="TTL" value="Banyuwangi, 4 Des 2024" />
                <DataItem label="Alamat" value="-" />
                <DataItem label="No. Telp Rumah" value="-" />
                <DataItem label="No. Telp Seluler" value="-" />
                <DataItem label="Status Pernikahan" value="Menikah" />
                <DataItem label="Memiliki Buku KIA" value="Ya" />
                <DataItem label="BB Sebelum Hamil" value="40 kg" />
                <DataItem label="TB" value="150 cm" />
                <DataItem label="IMT Sebelum Hamil" value="20 kg/m2-normal" />
              </div>
            </div>
            <div className="bg-primary bg-opacity-10 rounded-[20px] overflow-hidden">
              <div className="h-[49px] w-full bg-primary flex flex-row justify-between items-center px-[20px] py-[12px]">
                <div className="flex items-center gap-2">
                  <MdHistory className="text-white" size={24} />
                  <span className="text-white text-xl font-semibold">
                    Riwayat Kehamilan
                  </span>
                </div>
                <div>
                  <button>
                    <IoIosArrowUp className="text-white" size={24} />
                  </button>
                </div>
              </div>
              <div className="px-[20px] py-[12px]">
                <DataItem
                  label="Usia Kehamilan"
                  value="7 Bulan 5 Hari (Trimester III)"
                />
                <DataItem label="Tanggal HPHT" value="11-02-2023" />
                <DataItem label="Gravida" value="0" />
                <DataItem label="Partus" value="0" />
                <DataItem label="Abortus" value="1" />
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="mb-[32px]">
              <h2 className="text-2xl font-medium">Data Persalinan</h2>
              <div className="w-full p-5 rounded-[40px] border border-[#D6D6D6] mt-3">
                <table className="w-full">
                  <thead className="">
                    <tr className="h-[52px] bg-[#D2DC02] text-black">
                      <th className="text-left pl-[30px] rounded-l-[100px]">
                        Usia Kehamilan
                      </th>
                      <th className="text-left">Tanggal & Jam Persalinan</th>
                      <th className="text-left">Gravida</th>
                      <th className="text-left">Partus</th>
                      <th className="text-left pr-[30px] rounded-r-[100px]">
                        Abortus
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[52px]">
                      <td className="pl-[30px]">2 Bulan 2 Hari</td>
                      <td>11/03/2023, 23:38 WIB</td>
                      <td>2</td>
                      <td>2</td>
                      <td className="pr-[30px]">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-[32px]">
              <h2 className="text-2xl font-medium">Pelayanan Persalinan</h2>
              <div className="w-full p-5 rounded-[40px] border border-[#D6D6D6] mt-3">
                <table className="w-full">
                  <thead className="">
                    <tr className="h-[52px] bg-[#D2DC02] text-black">
                      <th className="text-left pl-[30px] rounded-l-[100px]">
                        Keadaan Ibu
                      </th>
                      <th className="text-left">Penolong Persalinan</th>
                      <th className="text-left">Cara Persalinan</th>
                      <th className="text-left">Kala I</th>
                      <th className="text-left pr-[30px] rounded-r-[100px]">
                        Kala II
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[52px]">
                      <td className="pl-[30px]">Compos Mentis</td>
                      <td>dr. X</td>
                      <td>Pervaginam</td>
                      <td>dd/mm/yyy: hh:mm</td>
                      <td className="pr-[30px]">dd/mm/yyy: hh:mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-[32px]">
              <h2 className="text-2xl font-medium">Data Bayi</h2>
              <div className="w-full p-5 rounded-[40px] border border-[#D6D6D6] mt-3">
                <table className="w-full">
                  <thead className="">
                    <tr className="h-[52px] bg-[#D2DC02] text-black">
                      <th className="text-left pl-[30px] rounded-l-[100px]">
                        Skor APGAR Menit 1
                      </th>
                      <th className="text-left">Skor APGAR Menit 5</th>
                      <th className="text-left">Akor APGAR Menit 10</th>
                      <th className="text-left">BB Bayi Saat Lahir</th>
                      <th className="text-left pr-[30px] rounded-r-[100px]">
                        Panjang Badan Bayi Saat Lahir
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[52px]">
                      <td className="pl-[30px]">10</td>
                      <td>10</td>
                      <td>
                        <span className="text-[#E62E05]">3</span>
                      </td>
                      <td>
                        <span className="text-[#E62E05]">2.300</span>
                      </td>
                      <td className="pr-[30px]">40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-[32px]">
              <h2 className="text-2xl font-medium">Diagnosis</h2>
              <div className="w-full p-5 rounded-[40px] border border-[#D6D6D6] mt-3">
                <table className="w-full">
                  <thead className="">
                    <tr className="h-[52px] bg-[#D2DC02] text-black">
                      <th className="text-left pl-[30px] rounded-l-[100px]">
                        Jenis Diagnosis Primer
                      </th>
                      <th className="text-left">Jenis Diagnosis Sekunder</th>
                      <th className="text-left pr-[30px] rounded-r-[100px]">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[52px]">
                      <td className="pl-[30px]">12/05/2023</td>
                      <td>46.5</td>
                      <td className="pr-[30px]">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-[32px]">
              <h2 className="text-2xl font-medium">Tindakan</h2>
              <div className="w-full p-5 rounded-[40px] border border-[#D6D6D6] mt-3">
                <table className="w-full">
                  <thead className="">
                    <tr className="h-[52px] bg-[#D2DC02] text-black">
                      <th className="text-center px-[30px] rounded-l-[100px] rounded-r-[100px]">
                        Jenis Tindakan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[52px]">
                      <td className="text-center">Loremipsum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-[32px]">
              <h2 className="text-2xl font-medium">Tindakan</h2>
              <div className="w-full p-5 rounded-[40px] border border-[#D6D6D6] mt-3">
                <table className="w-full">
                  <thead className="">
                    <tr className="h-[52px] bg-[#D2DC02] text-black">
                      <th className="text-center px-[30px] rounded-l-[100px] rounded-r-[100px]">
                        Jenis Tindakan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[52px]">
                      <td className="text-center">Loremipsum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualData;
