import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

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
    const signedIn = !!data?.claims;
    const { pathname } = request.nextUrl;

    if (!signedIn && pathname !== '/login') {
        if (pathname.startsWith('/api')) {
            return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/login', request.url));
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
