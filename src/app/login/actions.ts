'use server'

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import {LAST_ACTIVE_COOKIE, COOKIE_MAX_AGE} from "@/lib/idle";

export async function signIn(_prevState: { error: string } | null, formData: FormData) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
    });

    if (error) {
        return { error: 'Incorrect email or password' };
    }

    (await cookies()).set(LAST_ACTIVE_COOKIE, String(Date.now()), {
        path: '/',
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
    });

    redirect('/tickets');
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    (await cookies()).delete(LAST_ACTIVE_COOKIE);

    redirect('/login');
}
