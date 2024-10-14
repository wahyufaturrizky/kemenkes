import { DownloadButton, InputSearch, Select, TableData } from "@/components";
import {
    getCoreRowModel,
    useReactTable,
    createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";
import { optionsTable } from "./dataValue";

interface propsTableAnc {
    column: any;
    dataTable: any;
    showSearch?: boolean;
    showFilter?: boolean;
}

const columnHelper = createColumnHelper();

const TableKematianMaternal: React.FC<propsTableAnc> = ({
    column,
    dataTable,
    showSearch = false,
    showFilter = false,
}) => {
    const [data, _setData] = useState(() => [...dataTable]);
    const [filterTable, setFilterTable] = useState("melahirkan");


    type ColumnName = (typeof column)[number];

    const columnNames: ColumnName[] = [...column];

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
            {showSearch && (
                <div className="mt-5 w-full flex justify-between items-center">
                    <div className="flex flex-col gap-4">
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
            )}

            {showFilter && (
                <div className="w-full flex justify-between items-center mt-2">
                    <p>Pilih Kategori</p>
                    <div className="flex justify-end items-center mb-4">
                        <div className="relative inline-block w-48">
                            <Select
                                placeholder="Melahirkan"
                                options={optionsTable}
                                onChange={
                                    (e: any) => {
                                        setFilterTable(e.value);
                                    }
                                }
                                value={optionsTable.find((r) => r.value === filterTable)}
                                isClearable={false}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>
                </div>
            )}


            <TableData tableInstance={tableInstance} />
        </div>
    );
};

export default TableKematianMaternal;
