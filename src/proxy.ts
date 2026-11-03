import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { IDLE_TIMEOUT, LAST_ACTIVE_COOKIE } from '@/lib/idle';

// Runs before every matched request: refreshes the Supabase session cookie
// and keeps signed-out visitors away from the dashboard and API.
export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet, headers) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                    Object.entries(headers).forEach(([key, value]) =>
                        response.headers.set(key, value)
                    );
                },
            },
        }
    );

    const { data } = await supabase.auth.getClaims();
    let signedIn = !!data?.claims;
    const { pathname } = request.nextUrl;

    // Server-side half of the idle logout: catches tabs that were closed or asleep
    const lastActive = Number(request.cookies.get(LAST_ACTIVE_COOKIE)?.value ?? 0);
    if (signedIn && lastActive && Date.now() - lastActive > IDLE_TIMEOUT) {
        await supabase.auth.signOut({ scope: 'local' });
        response.cookies.delete(LAST_ACTIVE_COOKIE);
        signedIn = false;
    }

    if (!signedIn && pathname !== '/login') {
        const blocked = pathname.startsWith('/api')
            ? NextResponse.json({ error: 'Not signed in' }, { status: 401 })
            : NextResponse.redirect(new URL('/login', request.url));
        // Carry over the cleared session cookies so the browser actually forgets them
        response.cookies.getAll().forEach(cookie => blocked.cookies.set(cookie));
        return blocked;
    }

    if (signedIn && pathname === '/login') {
        return NextResponse.redirect(new URL('/tickets', request.url));
    }

    return response;
}

export const config = {
    // Everything except Next.js internals and static files
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
