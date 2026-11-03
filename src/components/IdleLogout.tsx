'use client'

import {useEffect} from 'react'
import {signOut} from '@/app/login/actions'
import {IDLE_TIMEOUT, LAST_ACTIVE_COOKIE, COOKIE_MAX_AGE} from '@/lib/idle'

// Reads the last activity time that any tab saved to the cookie
function readLastActive() {
    const match = document.cookie.match(new RegExp(`(?:^|; )${LAST_ACTIVE_COOKIE}=(\\d+)`));
    return match ? Number(match[1]) : 0;
}

// Signs user out after no mouse clicking, taps, keyboard activity
export default function IdleLogout() {
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const schedule = (delay: number) => {
            clearTimeout(timer);
            timer = setTimeout(check, delay);
        }

        // When the countdown ends, make sure another tab wasn't active in the meantime
        const check = () => {
            const idleFor = Date.now() - readLastActive();
            if (idleFor >= IDLE_TIMEOUT) signOut();
            else schedule(IDLE_TIMEOUT - idleFor);
        };

        // Any activity saves the time to the cookie and restarts the countdown
        const reset = () => {
            document.cookie = `${LAST_ACTIVE_COOKIE}=${Date.now()}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
            schedule(IDLE_TIMEOUT);
        }

        const events = ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'];

        events.forEach(e => window.addEventListener(e, reset, {passive:true}));

        reset();

        // Clean up when user leaves dashboard
        return () => {
            clearTimeout(timer);
            events.forEach(e => window.removeEventListener(e, reset));
        }
    }, []);
    return null;
}