import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import {Dashsidebar} from '@/components/Dashsidebar';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (

        <div className="flex flex-1">
            <SidebarProvider className="min-h-full">
                <Dashsidebar/>
                <div className="flex-1 overflow-auto p-5 bg-linear-to-br from-gray-800 to-gray-900">
                    <div className="min-h-full rounded-xl p-6 bg-white/20 backdrop-blur-md shadow-2xs border-white/10">
                        {children}
                    </div>
                </div>

            </SidebarProvider>
        </div>

    );
}