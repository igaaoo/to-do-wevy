"use client";
import React, { useEffect } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  SortingState,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "../ui/input";
import { Pagination } from "./Pagination";
import { cn } from "@/lib/utils";




interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  [];

  const [sorting, setSorting] = React.useState<SortingState>([]);


  const [rowSelection, setRowSelection] = React.useState({});


  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    table.setPageSize(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  return (
    <div className="w-full rounded-lg border px-6 py-4 shadow" aria-label="tasksTable">
      <div className="flex items-center justify-between overflow-x-auto">
        <div className="flex gap-2  py-4">
          <Input
            placeholder="Filtrar..."
            type="text"

            onChange={(e) =>
              table.setGlobalFilter(e.target.value.toString())
            }

          />
        </div>

        <Pagination table={table} />
      </div>


      <div className="max-h-[500px] min-h-[300px] overflow-y-auto rounded-md border">
        <Table >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}

              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}

                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    cn("hover:bg-gray-100",
                      row.getValue("isOpen") == false && "bg-gray-200 text-muted-foreground line-through"
                    )
                  }
                  aria-label="taskRow"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id}
                      className="m-0 p-4"

                    >

                      {flexRender(cell.column.columnDef.cell, cell.getContext())}

                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum registro encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>

      <div className="overflow-x-auto">
        <Pagination table={table} />
      </div>
    </div>

  );
}
