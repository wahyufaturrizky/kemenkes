import { DownloadButton, InputSearch, Select, TableData } from "@/components";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";
import { FiArrowDownCircle } from "react-icons/fi";

// type Data = {
//   Provinsi: string;
//   "Kab/Kota": string;
//   Kecamatan: string;
//   "Desa/Kelurahan": string;
//   "Jumlah Sasaran Bumil": number;
//   "Jumlah Bumil Tercatat": number;
//   Jumlah: number;
// };

interface propsTableAnc {
  title: string;
  column: any;
  dataTable: any;
}

// const defaultData: Data[] = [
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Ambon",
//     Kecamatan: "Sirimau",
//     "Desa/Kelurahan": "Desa Batu Merah",
//     "Jumlah Sasaran Bumil": 1200,
//     "Jumlah Bumil Tercatat": 600,
//     Jumlah: 600,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Ambon",
//     Kecamatan: "Baguala",
//     "Desa/Kelurahan": "Desa Lateri",
//     "Jumlah Sasaran Bumil": 900,
//     "Jumlah Bumil Tercatat": 450,
//     Jumlah: 450,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Maluku Tengah",
//     Kecamatan: "Salahutu",
//     "Desa/Kelurahan": "Desa Tulehu",
//     "Jumlah Sasaran Bumil": 800,
//     "Jumlah Bumil Tercatat": 400,
//     Jumlah: 400,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Maluku Tengah",
//     Kecamatan: "Leihitu",
//     "Desa/Kelurahan": "Desa Hitu",
//     "Jumlah Sasaran Bumil": 1000,
//     "Jumlah Bumil Tercatat": 500,
//     Jumlah: 500,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Buru",
//     Kecamatan: "Namlea",
//     "Desa/Kelurahan": "Desa Namlea",
//     "Jumlah Sasaran Bumil": 1100,
//     "Jumlah Bumil Tercatat": 550,
//     Jumlah: 550,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Buru",
//     Kecamatan: "Waelata",
//     "Desa/Kelurahan": "Desa Waelo",
//     "Jumlah Sasaran Bumil": 700,
//     "Jumlah Bumil Tercatat": 350,
//     Jumlah: 350,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Seram Bagian Barat",
//     Kecamatan: "Kairatu",
//     "Desa/Kelurahan": "Desa Kairatu",
//     "Jumlah Sasaran Bumil": 950,
//     "Jumlah Bumil Tercatat": 475,
//     Jumlah: 475,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Seram Bagian Barat",
//     Kecamatan: "Taniwel",
//     "Desa/Kelurahan": "Desa Taniwel",
//     "Jumlah Sasaran Bumil": 800,
//     "Jumlah Bumil Tercatat": 400,
//     Jumlah: 400,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Maluku Tenggara",
//     Kecamatan: "Kei Kecil",
//     "Desa/Kelurahan": "Desa Langgur",
//     "Jumlah Sasaran Bumil": 1000,
//     "Jumlah Bumil Tercatat": 500,
//     Jumlah: 500,
//   },
//   {
//     Provinsi: "Maluku",
//     "Kab/Kota": "Maluku Tenggara",
//     Kecamatan: "Kei Kecil Barat",
//     "Desa/Kelurahan": "Desa Ohoidertutu",
//     "Jumlah Sasaran Bumil": 850,
//     "Jumlah Bumil Tercatat": 425,
//     Jumlah: 425,
//   },
// ];

const columnHelper = createColumnHelper();

const TableAnalisis: React.FC<propsTableAnc> = ({
  title,
  column,
  dataTable,
}) => {
  const [data, _setData] = useState(() => [...dataTable]);

  //   const kolom = column;
  //   console.log(kolom, "isi kolom");
  //   const dataKolom = column;
  type ColumnName = (typeof column)[number];

  const columnNames: ColumnName[] = [...column];

  //   console.log(column, "isi kolom");
  const columns = columnNames.map((columnName) =>
    columnHelper.accessor(columnName, {
      cell: (info) => info.getValue(),
    })
  );
  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-5 w-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl leading-10 font-medium">{title}</h1>
          {/* <p className="text-[32px] leading-10 font-bold text-[#00B8AE]">
            Total 117.000 <span className=" text-xl">Ibu Hamil</span>
          </p> */}
        </div>
        <div>
          <p>Februari 2024</p>
        </div>
      </div>
      <div className="mt-5 w-full flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <DownloadButton text="Download" />
          <div className="flex items-center gap-[7px]">
            <p className="text-sm font-semibold">Show</p>
            <select
              name=""
              id=""
              className="border border-[#D6D6D6] py-[5px] px-[16px] rounded-xl"
            >
              <option value="">10</option>
              <option value="">20</option>
              <option value="">30</option>
            </select>
            <p className="text-sm font-semibold">Entries</p>
          </div>
        </div>
        <div className="flex items-center gap-[7px]">
          <p className="text-sm font-semibold">Search</p>
          <InputSearch />
        </div>
      </div>
      <TableData tableInstance={tableInstance} />
    </div>
  );
};

export default TableAnalisis;
