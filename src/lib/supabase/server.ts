import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Supabase client for Server Components, Server Actions and Route Handlers.
// A new client is created per request so auth cookies never leak between users.
export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // Server Components can't set cookies; proxy.ts refreshes the session instead
                    }
                },
            },
        }
    );
}

// Returns true when the request comes from a signed-in user (JWT verified by Supabase)
export async function isSignedIn() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    return !!data?.claims;
}
