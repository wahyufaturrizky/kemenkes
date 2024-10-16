import { DownloadButton, InputSearch, Select, TableData } from "@/components";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";
import { FiArrowDownCircle } from "react-icons/fi";

type Data = {
  province: string;
  city: string;
  kecamatan: string;
  kelurahan_desa: string;
  jumlah_hamil: number;
  percentase_hamil: number;
};

const defaultData: Data[] = [
  {
    province: "DKI Jakarta",
    city: "Jakarta Utara",
    kecamatan: "Tebet",
    kelurahan_desa: "Desa Mawar Indah",
    jumlah_hamil: 511.0,
    percentase_hamil: 9.0,
  },
  {
    province: "DKI Jakarta",
    city: "Kota Jakarta Timur",
    kecamatan: "Kecamatan Cempaka",
    kelurahan_desa: "Kelurahan Cempaka Timur",
    jumlah_hamil: 423.8,
    percentase_hamil: 9.0,
  },
];

const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor("province", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("city", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("kecamatan", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("kelurahan_desa", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("jumlah_hamil", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("percentase_hamil", {
    cell: (info) => info.getValue(),
  }),
];

const TableEarlyDetectionMonitoring = ({ titleTable = "" }) => {
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
          <h1 className="text-xl leading-10 font-medium">{titleTable}</h1>
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
        {/* <p>sdfsdfsdfs</p> */}
      </div>
      <TableData tableInstance={tableInstance} />
    </div>
  );
};

export default TableEarlyDetectionMonitoring;
