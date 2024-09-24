import { DownloadButton, InputSearch, Select, TableData } from "@/components";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";
import { FiArrowDownCircle } from "react-icons/fi";

type Data = {
  Provinsi: string;
  Kabkota: string;
  kecamatan: string;
  "Desa/Kelurahan": string;
  jumlah: number;
  persentase: number;
};

const defaultData: Data[] = [
  {
    Provinsi: "DKI Jakarta",
    Kabkota: "Jakarta Utara",
    kecamatan: "Tebet",
    "Desa/Kelurahan": "Desa Mawar Indah",
    jumlah: 511.0,
    persentase: 9.0,
  },
  {
    Provinsi: "DKI Jakarta",
    Kabkota: "Kota Jakarta Timur",
    kecamatan: "Kecamatan Cempaka",
    "Desa/Kelurahan": "Kelurahan Cempaka Timur",
    jumlah: 423.8,
    persentase: 9.0,
  },
];

const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor("Provinsi", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Kabkota", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("kecamatan", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Desa/Kelurahan", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jumlah", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("persentase", {
    cell: (info) => info.getValue(),
  }),
];

interface tableProps {
  title: string;
  filter: string;
}

const TableAnc: React.FC<tableProps> = ({ title, filter }) => {
  const [data, _setData] = useState(() => [...defaultData]);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-5 w-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl leading-10 font-medium">
            Tabel Jumlah Ibu Hamil {title}: {filter}
          </h1>
          <p className="text-[32px] leading-10 font-bold text-[#00B8AE]">
            Total 117.000 <span className=" text-xl">Ibu Hamil</span>
          </p>
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

export default TableAnc;
