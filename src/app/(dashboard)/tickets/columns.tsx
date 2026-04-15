"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Ticket = {
    id: number
    client_name: string
    client_email: string
    website_url: string
    description: string
    internal_notes: string
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
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "priority",
        header: "Priority",
    },
    {
        accessorKey: "created_on",
        header: "Created on",
        cell: ({row}) => {
            const date = new Date(row.getValue('created_on'));
            return date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });
        }
    },
    {
        accessorKey: "updated_on",
        header: "Updated on",
        cell: ({row}) => {
            const date = new Date(row.getValue('updated_on'));
            return date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });
        }
    }
]