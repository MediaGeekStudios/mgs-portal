'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupAction,
    SidebarMenuItem, SidebarMenuButton,
} from "@/components/ui/sidebar";
import {usePathname} from 'next/navigation';
import Link from "next/link";

const links = [
    {href: '/tickets', label: 'Tickets'},
    {href: '/clients', label: 'Clients'},
    {href: '/invoices', label: 'Invoices'},
];

export function Dashsidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="none">
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
                <span className="text-lg-center font-bold text-cyan-400">&copy; Media Geek Studios</span>
            </SidebarFooter>
        </Sidebar>
    )
}