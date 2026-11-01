import {Pool} from "pg";
import {NextResponse} from "next/server";
import { isSignedIn } from "@/lib/supabase/server";

const pool = new Pool({connectionString: process.env.DATABASE_URL});

export async function PATCH(req: Request, {params}: { params: Promise<{ id: string }> }) {
    if (!(await isSignedIn())) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const {id} = await params;
    const body = await req.json();
    const {client_name, client_email, website_url, description, status, priority, title} = body;

    try {
        //console.log('PATCH body:', { client_name, client_email, website_url, description, status, priority, title, id });
        const result = await pool.query(
            'UPDATE tickets SET client_name = $1, client_email = $2, website_url = $3, description = $4, status = $5, priority = $6, title = $7, updated_on = NOW() WHERE id = $8 RETURNING *',
            [client_name, client_email, website_url ?? null, description, status, priority, title, id]
        );
        return NextResponse.json(result.rows[0], {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Unable to update ticket. Check DB connection."}, {status: 500});
    }
}

export async function DELETE(_req: Request, {params}: { params: Promise<{ id: string }> }) {
    if (!(await isSignedIn())) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const {id} = await params;

    try {
        await pool.query('DELETE FROM tickets WHERE id = $1', [id]);
        return NextResponse.json({success: true}, {status: 200});
    } catch
        (error) {
        console.error(error);
        return NextResponse.json({error: 'Failed to delete ticket. Check DB connection'}, {status: 500});
    }
}