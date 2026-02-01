"use client"

import { usePathname, useRouter } from "next/navigation"
import { Calendar, Home, Inbox, Search, Settings, Users, Dumbbell, BarChart3, Wallet, Box, Zap, LogOut } from "lucide-react"
import { toast } from "sonner"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarSeparator
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items.
const items = [
    {
        title: "Command Center",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Members",
        url: "/dashboard/members",
        icon: Users,
    },
    {
        title: "Trainers",
        url: "/dashboard/trainers",
        icon: Dumbbell,
    },
    {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Wallet,
    },
    {
        title: "Inventory",
        url: "/dashboard/inventory",
        icon: Box,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        toast.info("Terminating Session", { description: "Safely logging you out..." })
        setTimeout(() => {
            router.push("/login")
        }, 1000)
    }

    return (
        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-[#E11D48]/20 bg-black">
            <SidebarHeader className="h-20 flex items-center justify-center border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="flex items-center gap-3 px-2 w-full group-data-[collapsible=icon]:justify-center">
                    <div className="h-9 w-9 flex items-center justify-center bg-[#E11D48] skew-x-[-10deg] shadow-[0_0_15px_rgba(225,29,72,0.5)] flex-shrink-0">
                        <Zap className="h-5 w-5 text-white skew-x-[10deg] fill-white" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-white uppercase group-data-[collapsible=icon]:hidden" style={{ fontFamily: 'var(--font-outfit)' }}>
                        FlexCore
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-black/90 pt-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#E11D48] uppercase tracking-widest text-[10px] font-bold mb-2 px-4 group-data-[collapsible=icon]:hidden">
                        Main Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`
                                                h-11 transition-all duration-300 group/btn relative overflow-hidden
                                                hover:bg-white/5 data-[active=true]:bg-[#E11D48]/10 
                                                data-[active=true]:text-[#E11D48] text-neutral-400 hover:text-white
                                            `}
                                        >
                                            <a href={item.url} className="flex items-center gap-3 px-3">
                                                {/* Active Indicator Line */}
                                                {isActive && (
                                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#E11D48] shadow-[0_0_10px_#E11D48]" />
                                                )}

                                                <item.icon className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
                                                <span className="font-medium tracking-wide text-sm group-data-[collapsible=icon]:hidden">
                                                    {item.title}
                                                </span>

                                                {/* Hover Glow Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#E11D48]/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none" />
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-white/5 bg-black p-0">
                <div className="p-4">
                    <div
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#E11D48]/10 hover:border-[#E11D48]/30 border border-transparent transition-all cursor-pointer group"
                        onClick={handleLogout}
                    >
                        <div className="relative">
                            <Avatar className="h-10 w-10 border-2 border-[#E11D48]/20 group-hover:border-[#E11D48]/50 transition-colors">
                                <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                                <AvatarFallback className="bg-neutral-800 text-white">AD</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-black" />
                        </div>
                        <div className="flex flex-col group-data-[collapsible=icon]:hidden transition-all">
                            <span className="text-sm font-bold text-white group-hover:text-[#E11D48] transition-colors">Admin User</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">Super Admin</span>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity group-data-[collapsible=icon]:hidden">
                            <LogOut className="h-4 w-4 text-[#E11D48]" />
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
