"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {label: "Dashboard", href: "/tickets", match: (p: string) => ['/tickets', '/clients'].some(r => p.startsWith(r))},
    {label: "Settings", href: "/settings", match: (p: string) => p.startsWith('/settings')},
    {label: "Profile", href: "/profile", match: (p: string) => p.startsWith('/profile')}
];

export default function Navbar() {

    const pathname = usePathname();

    return (
        <nav>
            <div className="flex items-center gap-0 md:gap-1">
                {navLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-2 md:px-3 py-1.5 text-sm md:text-base text-shadow-md transition-colors hover:bg-gray-100 hover:text-gray-900 ${
                        link.match(pathname) ? "font-bold text-white" : "font-bold text-cyan-500"
                    }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}