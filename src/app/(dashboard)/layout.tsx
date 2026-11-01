import {SidebarProvider} from '@/components/ui/sidebar';
import {Dashsidebar, DashMobileNav} from '@/components/Dashsidebar';
import {redirect} from 'next/navigation';
import {isSignedIn} from '@/lib/supabase/server';

export default async function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    // Second line of defense behind proxy.ts
    if (!(await isSignedIn())) redirect('/login');

    return (

        <div className="flex flex-1 min-w-0">
            <SidebarProvider className="min-h-full flex-col md:flex-row">
                <Dashsidebar/>
                <DashMobileNav/>
                <div className="flex-1 min-w-0 overflow-auto p-2 md:p-5 bg-linear-to-br from-gray-700 to-gray-200">
                    <div className="min-h-full rounded-xl p-3 md:p-6 bg-white/10 backdrop-blur-lg shadow-2xl border-white/10">
                        {children}
                    </div>
                </div>
            </SidebarProvider>
        </div>

    );
}