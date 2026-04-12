import pool from "@/lib/db";

import { Client } from "./columns"
import ClientsRenderer from "@/app/(dashboard)/clients/ClientsRenderer";

async function getData(): Promise<Client[]> {
    /* Primary query from Customers table and mapping to a usable variable */
    const dataResult = await pool.query('SELECT * FROM customers');

    return dataResult.rows;
}

export default async function Page() {

    const data = await getData();

    return <ClientsRenderer data={data} />
}