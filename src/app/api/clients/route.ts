import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, website_url, type } = body;

    if (!name || !email ) {
        return NextResponse.json({ error: 'Name and email are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO customers (name, email, website_url, type)' +
            'VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, website_url, type ?? null]
        );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create customer'}, { status: 500 });
    }
}