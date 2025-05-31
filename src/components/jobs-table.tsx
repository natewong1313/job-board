"use client";
import { getJobsQuery } from "@/data/jobs.hook";
import { Job } from "@/data/models";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Job>();

const TWELVE_HRS = 60 * 60 * 12 * 1000;
const within12hrs = (updatedAt: Date) =>
  new Date().getTime() - updatedAt.getTime() < TWELVE_HRS;

const columns = [
  columnHelper.accessor("title", {
    header: "Position",
    cell: (info) => (
      <p>
        {info.getValue()}{" "}
        {within12hrs(info.row.original.updatedAt) && (
          <span className="rounded-full bg-sunshade-200 text-sm ring ring-sunshade-400 text-sunshade-800 px-2 ml-2">
            new!
          </span>
        )}
      </p>
    )
  }),
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor("locations", {
    header: "Locations",
    cell: (info) => info.getValue().join(", ")
  })
];
export default function JobsTable() {
  const { data } = useSuspenseQuery(getJobsQuery);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="p-2">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left text-sm font-semibold text-gray-900"
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
                <td key={cell.id} className="py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
