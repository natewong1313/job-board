"use client";
import { getPaginatedJobsQuery } from "@/data/jobs.hook";
import { Job } from "@/data/models";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

const columnHelper = createColumnHelper<Job>();

const TWELVE_HRS = 60 * 60 * 12 * 1000;
const within12hrs = (updatedAt: Date) =>
  new Date().getTime() - updatedAt.getTime() < TWELVE_HRS;

const columns = [
  columnHelper.accessor("title", {
    header: "Position",
    cell: (info) => (
      <a href={info.row.original.url} target="_blank" className="group">
        {within12hrs(info.row.original.updated_at) && (
          <span className="rounded-full bg-sunshade-200 text-sm ring ring-sunshade-400 text-sunshade-800 px-2 ml-0.5 mr-2">
            new!
          </span>
        )}
        <span className="group-hover:underline">{info.getValue()} </span>{" "}
      </a>
    )
  }),
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor("locations", {
    header: "Locations",
    cell: (info) => {
      const locations = info.getValue();
      if (locations.length == 0) {
        return "N/A";
      } else if (locations.length == 1) {
        return locations[0];
      } else {
        return (
          <p>
            {locations[0]}{" "}
            <span className="bg-sunshade-200 text-sunshade-800 p-0.5 ml-1 ring ring-sunshade-400">
              +{locations.length - 1}
            </span>
          </p>
        );
      }
    }
  })
];
export default function JobsTable() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const dataQuery = useQuery(getPaginatedJobsQuery(pagination.pageIndex));
  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data ?? defaultData,
    columns,
    debugTable: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    rowCount: 10000,
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  });

  return (
    <div>
      <table className="divide-y divide-gray-300 border-separate border-spacing-2 w-full table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`text-left font-medium pb-1 text-gray-900 ${header.index == 0 ? "w-1/2" : "w-1/4"}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {!dataQuery.data && dataQuery.isLoading
            ? [...Array(10).keys()].map((i) => (
                <tr key={i}>
                  <td className="py-4 bg-gray-200 animate-pulse rounded-l-md"></td>
                  <td className="bg-gray-200 animate-pulse"></td>
                  <td className="bg-gray-200 animate-pulse rounded-r-md"></td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <div className="flex items-center space-x-2 font-medium">
          <button
            className="rounded w-8 h-8 ring ring-gray-300 text-gray-600 shadow bg-gray-50 hover:bg-gray-100 disabled:hover:bg-gray-50 active:ring-gray-400 disabled:active:ring-gray-200 disabled:opacity-50"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="rounded w-8 h-8 ring ring-gray-300 text-gray-600 shadow bg-gray-50 hover:bg-gray-100 disabled:hover:bg-gray-50 active:ring-gray-400 disabled:active:ring-gray-200 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="rounded w-8 h-8 ring ring-gray-300 text-gray-600 shadow bg-gray-50 hover:bg-gray-100 disabled:hover:bg-gray-50 active:ring-gray-400 disabled:active:ring-gray-200 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="rounded w-8 h-8 ring ring-gray-300 text-gray-600 shadow bg-gray-50 hover:bg-gray-100 disabled:hover:bg-gray-50 active:ring-gray-400 disabled:active:ring-gray-200 disabled:opacity-50"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          {dataQuery.isFetching && (
            <div
              className="animate-spin inline-block size-6 border-2 border-current border-t-transparent ml-2 text-sunshade-300 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <span className="flex items-center gap-1 pl-2">
          <div>Page</div>
          <input
            className="ring ring-gray-300 bg-gray-50 rounded h-8 w-8 p-0 text-center shadow mx-1 font-semibold"
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
          <span>of</span>
          <strong>{table.getPageCount().toLocaleString()}</strong>
        </span>
      </div>
    </div>
  );
}
