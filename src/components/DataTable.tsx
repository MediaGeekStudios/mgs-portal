"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import BevelButton from "@/components/Buttons/BevelButton";

interface DataTableProps<TData, TValue> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    onRowClick?: (row: Record<string, unknown>) => void
}

export function DataTable<TData, TValue>({data, columns, onRowClick}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="flex flex-col flex-1 mt-4">
            <Table className='border-1'>
                <TableHeader className='bg-cyan-50'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className='font-extrabold'>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className='text-cyan-400'>
                    {table.getRowModel().rows.map(row => (
                        <TableRow
                            key={row.id}
                            onClick={() => onRowClick?.(row.original as Record<string, unknown>)}
                            className="cursor-pointer hover:bg-gray-200 transition-colors even:bg-gray-100 font-bold"
                        >
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="items-center justify-end space-x-2 py-4 w-full">
                <BevelButton text={"Previous"} onClick={() => table.previousPage()}
                             disabled={(!table.getCanPreviousPage())}/>
                <BevelButton text={"Next"} onClick={() => table.nextPage()} disabled={(!table.getCanNextPage())}/>
            </div>
        </div>
    )
}