import { DownloadButton, InputSearch, TableData } from "@/components";
import {
  RowAggregateTableType,
  TableMonitoringFaktorRisikoType,
} from "@/view/dashboard/monitoring-faktor-risiko/type";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";

const columnHelper = createColumnHelper<RowAggregateTableType>();

const columns = [
  columnHelper.accessor("province", {
    cell: (info) => info.getValue(),
    header: "Province",
  }),
  columnHelper.accessor("faskes", {
    cell: (info) => info.getValue(),
    header: "Faskes",
  }),
  columnHelper.accessor("total_participant", {
    cell: (info) => info.getValue(),
    header: "Total Participant",
  }),
  columnHelper.accessor("total_involved_participant", {
    cell: (info) => info.getValue(),
    header: "Total Involved Participant",
  }),
  columnHelper.accessor("grouper", {
    cell: (info) => info.getValue(),
    header: "Grouper",
  }),
  columnHelper.accessor("total_grouper_participant", {
    cell: (info) => info.getValue(),
    header: "Total Grouper Participant",
  }),
];

const TableRemaja = ({ titleTable = "", tableAggregateData }: TableMonitoringFaktorRisikoType) => {
  const tableInstance = useReactTable({
    columns,
    data: tableAggregateData,
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
            <select name="" id="" className="border border-[#D6D6D6] py-[5px] px-[16px] rounded-xl">
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

export default TableRemaja;
