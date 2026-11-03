// Shared by the browser timer (IdleLogout) and the server check (proxy.ts)
export const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 mins, in milliseconds
export const LAST_ACTIVE_COOKIE = 'last_active';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, in seconds