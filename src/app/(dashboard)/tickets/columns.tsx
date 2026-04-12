"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Ticket = {
    id: number
    client_name: string
    title: string
    status: string,
    priority: string,
    created_on: Date,
    updated_on: Date,
}

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "client_name",
        header: "Client Name",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "created_on",
        header: "Created on",
    },
    {
        accessorKey: "updated_on",
        header: "Updated on",
    }
]