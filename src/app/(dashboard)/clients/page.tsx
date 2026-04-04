import pool from "@/lib/db";
import {Table} from "../../../components/Table";

export default async function Page() {
    const columnsResult = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'Customers' ORDER BY ordinal_position`);
    const columns = columnsResult.rows.map((column) => column.column_name);

    const dataResult = await pool.query('SELECT * FROM "Customers"');
    const customers = dataResult.rows;

    return (
        <div className="flex">
            <Table dataResult={customers} columns={columns} />
        </div>
        );


}