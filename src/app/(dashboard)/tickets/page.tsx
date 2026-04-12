import pool from "@/lib/db"
import { DataTable } from "../../../components/DataTable"
import { columns, Ticket } from "./columns"

async function getTickets(): Promise<Ticket[]> {
    const dataResult = await pool.query('SELECT * FROM tickets');
    const tickets = dataResult.rows;

    return tickets;
}

export default async function Page() {

    const data = await getTickets();

    return (
        <div className="flex">
            <DataTable data={data} columns={columns} />
        </div>
    );

}