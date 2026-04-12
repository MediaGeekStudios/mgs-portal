"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Invoice = {
    id: string
    invoice_num: string
    client_id: string
    issue_date: Date,
    due_date: Date,
    subtotal: number,
    created_on: Date,
}

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "invoice_num",
        header: "Invoice Number",
    },
    {
        accessorKey: "client_id",
        header: "Client",
    },
    {
        accessorKey: "issue_date",
        header: "Issued",
    },
    {
        accessorKey: "due_date",
        header: "Due",
    },
    {
        accessorKey: "subtotal",
        header: "Subtotal",
    },
    {
        accessorKey: "created_on",
        header: "Created on",
    },
]