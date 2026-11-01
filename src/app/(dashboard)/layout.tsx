import {SidebarProvider} from '@/components/ui/sidebar';
import {Dashsidebar} from '@/components/Dashsidebar';
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

        <div className="flex flex-1">
            <SidebarProvider className="min-h-full">
                <Dashsidebar/>
                <div className="flex-1 overflow-auto p-5 bg-linear-to-br from-gray-700 to-gray-200">
                    <div className="min-h-full rounded-xl p-6 bg-white/10 backdrop-blur-lg shadow-2xl border-white/10">
                        {children}
                    </div>
                </div>
            </SidebarProvider>
        </div>

    );
}