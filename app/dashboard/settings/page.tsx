"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { MOCK_USER } from "@/lib/mock-data"
import { Bell, Moon, Sun, User, Shield, CreditCard, Cog, Monitor, Wifi, Lock, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

export default function SettingsPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("profile")

    const handleLogout = () => {
        toast.info("Terminating Session", { description: "Safely logging you out..." })
        setTimeout(() => {
            router.push("/login")
        }, 1000)
    }

    // State for Avatar
    const [avatar, setAvatar] = useState(MOCK_USER.avatar)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setAvatar(imageUrl)
        }
    }

    // Sub-components for tab content
    const ProfileContent = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-[#E11D48]">
                    <User className="w-32 h-32" />
                </div>
                <CardHeader>
                    <CardTitle className="text-white uppercase tracking-wider font-bold">Identity Profile</CardTitle>
                    <CardDescription>Public facing credentials and avatar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <Avatar className="h-24 w-24 border-2 border-[#E11D48]/50 group-hover:border-[#E11D48] transition-colors shadow-[0_0_20px_rgba(225,29,72,0.2)]">
                                <AvatarImage src={avatar} className="object-cover" />
                                <AvatarFallback className="bg-neutral-800 text-white font-bold text-2xl">AD</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                                <Cog className="text-white w-8 h-8 animate-spin-slow" />
                            </div>
                        </div>
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <Button
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Upload New Visual
                            </Button>
                            <p className="text-[10px] text-neutral-500 mt-2 uppercase tracking-wide">Max Size: 2MB • Format: PEG, PNG</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-neutral-400">Codename / Display Name</Label>
                            <Input defaultValue={MOCK_USER.name} className="bg-black/40 border-[#E11D48]/20 focus-visible:ring-[#E11D48]/50 h-10 text-white font-medium" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs uppercase font-bold text-neutral-400">Communication Uplink (Email)</Label>
                            <Input defaultValue={MOCK_USER.email} disabled className="bg-black/20 border-white/5 opacity-50 cursor-not-allowed text-neutral-400" />
                        </div>
                        <div className="pt-4 flex justify-end">
                            <Button className="bg-[#E11D48] hover:bg-[#be123c] text-white font-bold uppercase tracking-wide shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] transition-all">
                                Save Configuration
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )

    const AccountContent = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-white uppercase tracking-wider font-bold">Security & Access</CardTitle>
                    <CardDescription>Authentication protocols and zone management.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border border-[#E11D48]/20 bg-[#E11D48]/5 p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white font-bold flex items-center gap-2"><Lock className="w-4 h-4 text-[#E11D48]" /> Multi-Factor Auth</Label>
                                <p className="text-xs text-neutral-400">Require secondary verification for system entry.</p>
                            </div>
                            <Switch className="data-[state=checked]:bg-[#E11D48]" />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 p-4 hover:bg-neutral-800/50 transition-colors">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white font-bold flex items-center gap-2">Protocol Termination</Label>
                                <p className="text-xs text-neutral-400">Securely sign out of the current station.</p>
                            </div>
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                size="sm"
                                className="border-[#E11D48]/30 text-[#E11D48] hover:bg-[#E11D48] hover:text-white font-bold uppercase tracking-wider text-[10px]"
                            >
                                <LogOut className="mr-2 h-3 w-3" /> Log Out
                            </Button>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base text-red-500 font-bold">Terminate Access</Label>
                                <p className="text-xs text-red-500/60">Permanently erase all user data and credentials.</p>
                            </div>
                            <Button variant="destructive" size="sm" className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/50">Execute Delete</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )

    const AppearanceContent = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-white uppercase tracking-wider font-bold">Interface Theme</CardTitle>
                    <CardDescription>Visual output configuration.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="cursor-pointer space-y-2 group">
                            <div className="h-24 rounded-lg bg-neutral-950 border-2 border-[#E11D48] ring-2 ring-[#E11D48]/20 p-2 relative overflow-hidden">
                                <div className="h-full w-full bg-neutral-900 rounded-md relative z-10" />
                                <div className="absolute inset-0 bg-[#E11D48]/10 blur-xl" />
                            </div>
                            <div className="text-center text-sm font-bold text-[#E11D48] uppercase tracking-wide">Cyber Dark</div>
                        </div>
                        <div className="cursor-pointer space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="h-24 rounded-lg bg-white border border-zinc-200 p-2">
                                <div className="h-full w-full bg-zinc-100 rounded-md shadow-sm" />
                            </div>
                            <div className="text-center text-sm font-medium text-neutral-400">Light Mode</div>
                        </div>
                        <div className="cursor-pointer space-y-2 opacity-50 hover:opacity-100 transition-opacity">
                            <div className="h-24 rounded-lg bg-zinc-900 border border-zinc-800 p-2 flex items-center justify-center">
                                <Monitor className="text-neutral-500" />
                            </div>
                            <div className="text-center text-sm font-medium text-neutral-400">System Sync</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )

    const NotificationsContent = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-white uppercase tracking-wider font-bold">Alert Protocols</CardTitle>
                    <CardDescription>Configure system notification triggers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {[
                            { label: "New Operative Signups", icon: User },
                            { label: "Critical Payment Alerts", icon: CreditCard },
                            { label: "Inventory Thresholds", icon: Wifi },
                            { label: "Weekly Intelligence Reports", icon: Cog }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg bg-black/20 hover:bg-black/40 transition-colors border border-transparent hover:border-white/5">
                                <Label className="flex items-center gap-3 cursor-pointer text-neutral-300 font-medium">
                                    <item.icon className="w-4 h-4 text-[#E11D48]" />
                                    <span>{item.label}</span>
                                </Label>
                                <Switch defaultChecked className="data-[state=checked]:bg-[#E11D48]" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )

    return (
        <div className="relative space-y-8 p-8 min-h-screen">
            {/* Page Specific Background */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'url(/settings-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-outfit)' }}>
                            System Protocols <Cog className="h-8 w-8 text-[#E11D48] animate-spin-slow" />
                        </h2>
                        <p className="text-neutral-400 font-medium">Configure global parameters and user preferences.</p>
                    </div>
                    <Separator className="bg-[#E11D48]/20" />
                </div>

                <div className="flex flex-col gap-8 md:flex-row h-full">
                    <aside className="md:w-1/5">
                        <nav className="flex flex-col space-y-1">
                            {[
                                { id: 'profile', icon: User, label: 'Identity' },
                                { id: 'account', icon: Shield, label: 'Security' },
                                { id: 'appearance', icon: Monitor, label: 'Interface' },
                                { id: 'notifications', icon: Bell, label: 'Alerts' }
                            ].map((item) => (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    className={`justify-start h-12 uppercase tracking-wider font-bold text-xs transition-all ${activeTab === item.id
                                        ? 'bg-[#E11D48]/10 text-[#E11D48] border-l-2 border-[#E11D48]'
                                        : 'hover:bg-white/5 text-neutral-500 hover:text-white border-l-2 border-transparent'
                                        }`}
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    <item.icon className={`mr-3 h-4 w-4 ${activeTab === item.id ? 'text-[#E11D48]' : 'text-neutral-500 group-hover:text-white'}`} />
                                    {item.label}
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <div className="flex-1 lg:max-w-3xl">
                        <AnimatePresence mode="wait">
                            {activeTab === 'profile' && <ProfileContent key="profile" />}
                            {activeTab === 'account' && <AccountContent key="account" />}
                            {activeTab === 'appearance' && <AppearanceContent key="appearance" />}
                            {activeTab === 'notifications' && <NotificationsContent key="notifications" />}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
