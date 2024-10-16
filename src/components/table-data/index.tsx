import React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { Spin } from "antd";

interface TableDataProps<T> {
  tableInstance: Table<T>;
  titleTable?: string;
}

const TableData = <T,>({ tableInstance, titleTable }: TableDataProps<T>) => {
  return (
    <div className="px-5 overflow-x-auto py-10 border border-[#D6D6D6] rounded-[40px]">
      {titleTable && (
        <h2
          className="text-2xl mb-4 leading-10 font-bold"
        >
          {titleTable}
        </h2>
      )}
      <table className="min-w-full bg-white">
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr className="bg-[#F5F5F5]" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3 px-6 text-[#737373] font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-700">
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="py-3 text-center items-center px-6 border-gray-200" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
