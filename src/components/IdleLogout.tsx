'use client'

import {useEffect} from 'react'
import {signOut} from '@/app/login/actions'

const IDLE_TIMEOUT = 15 * 60 * 1000; // Idle timeout - 15 mins

// Signs user out after no mouse clicking, taps, keyboard activity
export default function IdleLogout() {
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        // Any activity will restart the timer
        const reset = () => {
            clearTimeout(timer);
            timer = setTimeout(() => signOut(), IDLE_TIMEOUT);
        };

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