import DashNav from '@/components/Dashnav';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-1">
            <DashNav />
            <div className="flex-1 overflow-auto p-5 bg-linear-to-br from-gray-800 to-gray-900">
                <div className="min-h-full rounded-xl p-6 bg-white/20 backdrop-blur-md border border-white/10">
                    {children}
                </div>
            </div>
        </div>
    );
}