import pool from "@/lib/db"
import {Ticket} from "./columns"
import TicketsRenderer from "./TicketsRenderer"

async function getTickets(): Promise<Ticket[]> {
    const dataResult = await pool.query('SELECT * FROM tickets');
    const tickets = dataResult.rows;

    return tickets;
}

export default async function Page() {

    const data = await getTickets();

    return (

        <TicketsRenderer data={data}/>

    );

}