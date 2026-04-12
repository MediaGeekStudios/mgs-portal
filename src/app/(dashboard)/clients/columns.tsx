"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Client = {
    id: number
    name: string
    type: string
    email: string
    website_url: string
}

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "website_url",
        header: "Website",
    }
]