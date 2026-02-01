"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_FINANCE } from "@/lib/mock-data"
import { ArrowDownLeft, ArrowUpRight, DollarSign, Download, Filter, Wallet, TrendingUp, CreditCard, Activity } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function FinancePage() {
    return (
        <div className="relative space-y-8 p-8 min-h-screen">
            {/* Page Specific Background */}
            <div
                className="absolute inset-0 z-0 opacity-15 pointer-events-none"
                style={{
                    backgroundImage: 'url(/finance-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative z-10 space-y-8">
                {/* Live Ticker */}
                <div className="w-full bg-[#E11D48]/10 border-y border-[#E11D48]/20 overflow-hidden py-2 mb-8">
                    <div className="flex animate-infinite-scroll whitespace-nowrap gap-12 text-xs font-mono font-bold text-[#E11D48] uppercase tracking-wider">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <Activity className="h-3 w-3" /> FLEXCOIN MARKET CAP: $4.2M <span className="text-emerald-500">▲ 2.4%</span>
                                <span className="text-white/20 mx-4">|</span>
                                <span>DAILY REVENUE VELOCITY: 118%</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Financial Intelligence <Wallet className="h-8 w-8 text-[#E11D48]" />
                        </h2>
                        <p className="text-neutral-400 font-medium">Real-time revenue tracking and expense management.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-10 border-[#E11D48]/20 bg-black/40 hover:bg-[#E11D48]/10 text-white font-bold uppercase tracking-wide transition-all">
                            <Filter className="mr-2 h-4 w-4 text-[#E11D48]" /> Filter
                        </Button>
                        <Button className="h-10 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold uppercase tracking-wide skew-x-[-10deg] shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all">
                            <span className="skew-x-[10deg] flex items-center">
                                <Download className="mr-2 h-4 w-4 font-bold" /> Export Report
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign, color: "text-emerald-500", trend: "up" },
                        { title: "Operating Expenses", value: "$12,340.00", change: "+4%", icon: CreditCard, color: "text-[#E11D48]", trend: "down" }, // Trend down visually for expense rise usually bad, but context varies
                        { title: "Net Profit", value: "$32,891.89", change: "+12%", icon: TrendingUp, color: "text-emerald-500", trend: "up" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md hover:border-[#E11D48]/30 transition-all group relative overflow-hidden">
                                {/* Glow Effect */}
                                <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity ${stat.trend === 'up' ? 'text-emerald-500' : 'text-[#E11D48]'}`}>
                                    <stat.icon className="w-24 h-24" />
                                </div>

                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-neutral-400">{stat.title}</CardTitle>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <div className="text-3xl font-black text-white font-mono tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>{stat.value}</div>
                                    <p className={`text-xs font-bold mt-2 flex items-center ${stat.color}`}>
                                        {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownLeft className="h-3 w-3 mr-1" />}
                                        <span className="opacity-90">{stat.change} vs last month</span>
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Transactions Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-white/5 bg-neutral-900/40 backdrop-blur-md overflow-hidden"
                >
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                        <h3 className="font-bold text-lg text-white uppercase tracking-wide">Recent Transactions</h3>
                        <Button variant="ghost" size="sm" className="text-xs font-bold uppercase text-[#E11D48] hover:text-white hover:bg-white/5">
                            View All Activity &rarr;
                        </Button>
                    </div>
                    <Table>
                        <TableHeader className="bg-black/40">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Description</TableHead>
                                <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Category</TableHead>
                                <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Date</TableHead>
                                <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Status</TableHead>
                                <TableHead className="text-right text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_FINANCE.map((item, i) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.05) }}
                                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                                >
                                    <TableCell className="font-medium text-white py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg border border-white/5 ${item.type === 'Income' ? 'bg-emerald-500/10 text-emerald-500 group-hover:border-emerald-500/30' : 'bg-red-500/10 text-red-500 group-hover:border-red-500/30'} transition-colors`}>
                                                {item.type === 'Income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                                            </div>
                                            <span className="font-bold tracking-tight">{item.description}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-neutral-400 text-sm">{item.category}</TableCell>
                                    <TableCell className="text-neutral-500 font-mono text-xs">{item.date}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`
                                        uppercase tracking-widest text-[10px] font-bold border-0 px-2 py-0.5
                                        ${item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20'}
                                    `}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={`text-right font-bold font-mono text-sm ${item.type === 'Income' ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {item.type === 'Income' ? '+' : '-'}${item.amount.toFixed(2)}
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
