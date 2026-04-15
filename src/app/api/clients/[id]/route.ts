import { Pool } from 'pg';
import { NextResponse } from "next/server";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const body = await req.json();
    const { name, email, website_url, type } = body;

    try {
        const result = await pool.query(
            'UPDATE customers SET name = $1, email = $2, website_url = $3, type = $4 WHERE id = $5 RETURNING *',
            [name, email, website_url ?? null, type ?? null, id]
        );
        return NextResponse.json(result.rows[0], {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update customer'}, {status: 500});
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await pool.query('DELETE FROM customers WHERE id = $1', [id]);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete customer'}, { status: 500 });
    }
}