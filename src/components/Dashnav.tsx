'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/tickets', label: 'Tickets' },
    { href: '/clients', label: 'Clients' },
];

export default function DashNav() {
    const pathname = usePathname();

    return (
        <nav className="flex w-52 flex-col border-r border-gray-200 bg-gray-600">
            {links.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={`px-4 py-2 text-sm transition-colors ${
                        pathname === href
                            ? 'bg-gray-200 font-bold text-gray-900'
                            : 'text-cyan-300 hover:bg-gray-950 font-bold'
                    }`}
                >
                    {label}
                </Link>
            ))}
        </nav>
    );
}