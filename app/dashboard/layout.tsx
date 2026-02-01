import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-background flex flex-col transition-all duration-300 ease-in-out relative min-h-screen">
                {/* Global Background Image */}
                <div
                    className="fixed inset-0 z-0 pointer-events-none opacity-80"
                    style={{
                        backgroundImage: 'url(/dashboard-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                {/* Gradient Overlay for Readability */}
                <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

                <header className="flex h-16 items-center gap-2 border-b border-white/10 px-4 bg-black/20 backdrop-blur-md sticky top-0 z-10">
                    <SidebarTrigger className="-ml-1 hover:bg-white/10 text-white" />
                    <div className="w-[1px] h-6 bg-white/20 mx-2" />
                    <h1 className="text-sm font-medium text-white/70 uppercase tracking-wider" style={{ fontFamily: 'var(--font-outfit)' }}>Command Operations</h1>
                </header>
                <div className="flex-1 p-6 md:p-8 pt-6 relative z-10">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
