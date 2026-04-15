import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });


// POST action - create ticket on database
export async function POST(req: Request) {
    const body = await req.json();

    // Column names of table in db
    // Update this list with columns expected in form
    const { client_name, client_email, website_url, description, internal_notes, title } = body;
    const status = body.status || 'Open';
    const priority = body.priority || 'Normal';

    if (!title ) { // Every ticket should have at LEAST a title
        return NextResponse.json({ error: 'Title required' });
    }

    try {
        const result = await pool.query( // The actual query to pass the data to the attributes of the new record
            'INSERT INTO tickets (client_name, client_email, website_url, description, status, priority, internal_notes, title)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [client_name, client_email, website_url, description, status, priority, internal_notes, title ?? null]
        );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create ticket. Check DB connection.'}, { status: 500 });
    }
}