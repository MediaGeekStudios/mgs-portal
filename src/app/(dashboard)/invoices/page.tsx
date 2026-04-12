import pool from "@/lib/db"
import { DataTable } from "../../../components/DataTable"
import { columns, Invoice } from "./columns"

async function getData(): Promise<Invoice[]> {
    /* Primary query from Invoice table and mapping to a usable variable */
    const dataResult = await pool.query('SELECT * FROM invoices');
    const invoices = dataResult.rows;

    return invoices;
}

export default async function Page() {
    const data = await getData();

    return (
        <div className="flex">
            <DataTable data={data} columns={columns} />
        </div>
    );
}