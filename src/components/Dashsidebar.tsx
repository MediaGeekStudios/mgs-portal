'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarMenuItem, SidebarMenuButton,
} from "@/components/ui/sidebar";
import {usePathname} from 'next/navigation';
import Link from "next/link";
import {signOut} from "@/app/login/actions";

const links = [
    {href: '/tickets', label: 'Tickets'},
    {href: '/clients', label: 'Clients'},
    {href: '/invoices', label: 'Invoices'},
];

export function Dashsidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarHeader className="w-auto bg-gray-800 text-center">
                <span className="text-lg-center font-bold text-cyan-400">Media Geek Studios Dashboard</span>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='font-heading font-bold text-bg-dark underline'>Pages</SidebarGroupLabel>

                    {links.map(({href, label}) => (
                        <SidebarMenuItem key={href}>
                            {/* The color changes take effect on ONLY active pathname objects */}
                            <SidebarMenuButton asChild isActive={pathname === href}
                                               className={`px-4 py-2 text-sm transition-colors shadow-md shadow-gray-700`}
                            >
                                <Link href={href} className={`inset-shadow-sm m-1`}>{label}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>


                    ))}
                </SidebarGroup>
            </SidebarContent>


            <SidebarFooter className='w-auto bg-gray-700 text-center'>
                <form action={signOut}>
                    <button type="submit" className="w-full rounded-md px-4 py-2 text-sm font-bold text-white hover:bg-gray-600">
                        Sign out
                    </button>
                </form>
                <span className="text-lg-center font-bold text-cyan-400">&copy; Media Geek Studios</span>
            </SidebarFooter>
        </Sidebar>
    )
}
// Phones don't have room for the sidebar, so the same links sit in a row above the page
export function DashMobileNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-1 overflow-x-auto bg-gray-800 px-2 py-2 md:hidden">
            {links.map(({href, label}) => (
                <Link
                    key={href}
                    href={href}
                    className={`rounded-md px-3 py-1.5 text-sm font-bold whitespace-nowrap ${
                        pathname === href ? 'bg-cyan-400 text-gray-900' : 'text-cyan-400'
                    }`}
                >
                    {label}
                </Link>
            ))}
            <form action={signOut} className="ml-auto">
                <button type="submit" className="rounded-md px-3 py-1.5 text-sm font-bold text-white whitespace-nowrap">
                    Sign out
                </button>
            </form>
        </nav>
    )
}
