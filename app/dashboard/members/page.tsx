"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MOCK_MEMBERS } from "@/lib/mock-data"
import { Search, Plus, MoreHorizontal, FileDown, Shield, Users, Activity } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export default function MembersPage() {
    return (
        <div className="relative space-y-8 p-8 min-h-screen">
            {/* Page Specific Background */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'url(/members-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Elite Roster <Users className="h-8 w-8 text-[#E11D48]" />
                        </h2>
                        <p className="text-neutral-400 font-medium">Manage active athletes and membership statuses.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-10 border-[#E11D48]/20 bg-black/40 hover:bg-[#E11D48]/10 text-white font-bold uppercase tracking-wide transition-all">
                            <FileDown className="mr-2 h-4 w-4 text-[#E11D48]" /> Export Data
                        </Button>
                        <Button className="h-10 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold uppercase tracking-wide skew-x-[-10deg] shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all">
                            <span className="skew-x-[10deg] flex items-center">
                                <Plus className="mr-2 h-4 w-4 font-bold" /> New Athlete
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Activity Pulse Section - New Feature */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 p-1"
                >
                    <div className="col-span-3 rounded-xl border border-white/5 bg-neutral-900/40 backdrop-blur-md p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <Activity className="h-32 w-32 text-[#E11D48]" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#E11D48] animate-pulse" /> Live Activity Density
                        </h3>
                        {/* Mock Heatmap Visual */}
                        <div className="flex items-end justify-between h-24 gap-1">
                            {Array.from({ length: 40 }).map((_, i) => {
                                const height = Math.random() * 100;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 1, delay: i * 0.02 }}
                                        className={`w-full rounded-t-sm ${height > 80 ? 'bg-[#E11D48] shadow-[0_0_10px_#E11D48]' : 'bg-white/10'}`}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-span-1 rounded-xl border border-white/5 bg-neutral-900/40 backdrop-blur-md p-6 flex flex-col justify-center items-center">
                        <div className="text-5xl font-black text-white" style={{ fontFamily: 'var(--font-outfit)' }}>84%</div>
                        <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider mt-2">Facility Capacity</div>
                        <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '84%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-[#E11D48] shadow-[0_0_10px_#E11D48]"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="flex items-center gap-4 mb-6 bg-neutral-900/50 p-1 rounded-lg border border-white/5 w-fit">
                    <div className="relative flex-1 min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                        <Input
                            placeholder="Search by name, email or ID..."
                            className="pl-10 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-neutral-600 h-10"
                        />
                    </div>
                </div>

                {/* Data Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl border border-white/5 bg-neutral-900/40 backdrop-blur-md overflow-hidden"
                >
                    <Table>
                        <TableHeader className="bg-black/40">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Athlete</TableHead>
                                <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Status</TableHead>
                                <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Membership</TableHead>
                                <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Last Check-in</TableHead>
                                <TableHead className="text-right text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_MEMBERS.map((member, i) => (
                                <motion.tr
                                    key={member.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                                >
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-[#E11D48]/50 transition-colors">
                                                    <AvatarImage src={member.avatar} />
                                                    <AvatarFallback className="bg-neutral-800 text-neutral-400 font-bold">{member.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                {member.status === 'Active' && (
                                                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-black" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white group-hover:text-[#E11D48] transition-colors">{member.name}</div>
                                                <div className="text-xs text-neutral-500 font-mono">{member.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={`
                                            uppercase tracking-widest text-[10px] font-bold border-0 px-2 py-1
                                            ${member.status === 'Active'
                                                    ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                                    : member.status === 'Expired'
                                                        ? 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20'
                                                        : 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20'}
                                        `}
                                        >
                                            {member.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-3 w-3 text-[#E11D48]" />
                                            <span className="text-neutral-300 font-medium">{member.plan}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-neutral-500 font-mono text-xs">
                                        {member.lastVisit}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-neutral-500 hover:text-white hover:bg-white/10">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-neutral-900 border-white/10 text-white">
                                                <DropdownMenuLabel className="text-neutral-500 text-xs uppercase tracking-wider">Options</DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem className="focus:bg-[#E11D48]/20 focus:text-white cursor-pointer">View Profile</DropdownMenuItem>
                                                <DropdownMenuItem className="focus:bg-[#E11D48]/20 focus:text-white cursor-pointer">Edit Details</DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer">Revoke Access</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </motion.div>
            </div>
        </div>
    )
}
