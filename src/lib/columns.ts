import { ColumnDef } from "@tanstack/react-table"

/* Normally columns are defined for each individual table they'll access, however
*  since the tables will be different I wanted to ensure that this will capture all
*  the column headers without having to define them manually.
*  --- RECOMMENDED: Put a data check in the table layout in case the table is empty */

export function generateColumns(columnNames: string[]): ColumnDef<Record<string, unknown>>[] {
    return columnNames.map((key) => ({
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
    }))
}