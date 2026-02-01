"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ArrowUpRight, ArrowDownRight, Users, CreditCard, Activity, CalendarCheck, DollarSign, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const chartData = [
    { month: "Jan", revenue: 18600, members: 80 },
    { month: "Feb", revenue: 30500, members: 200 },
    { month: "Mar", revenue: 23700, members: 120 },
    { month: "Apr", revenue: 73000, members: 190 },
    { month: "May", revenue: 20900, members: 130 },
    { month: "Jun", revenue: 21400, members: 140 },
    { month: "Jul", revenue: 35000, members: 160 },
    { month: "Aug", revenue: 42000, members: 220 },
    { month: "Sep", revenue: 51000, members: 240 },
]

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#E11D48",
    },
    members: {
        label: "Members",
        color: "#E11D48",
    },
} satisfies ChartConfig

export default function DashboardPage() {
    return (
        <div className="space-y-8 p-8 bg-black/20 min-h-screen">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Command Center
                    </h2>
                    <p className="text-neutral-400">Real-time performance metrics.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#E11D48]/10 border border-[#E11D48]/20 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
                    <span className="text-xs font-bold text-[#E11D48] uppercase tracking-wider">Live Feed</span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Revenue", value: "$45,231.89", trend: "+20.1%", trendUp: true, icon: DollarSign },
                    { title: "Active Members", value: "2,350", trend: "+180.1%", trendUp: true, icon: Users },
                    { title: "Daily Check-ins", value: "1,234", trend: "+19%", trendUp: true, icon: Activity },
                    { title: "Churn Rate", value: "2.4%", trend: "-4%", trendUp: false, icon: TrendingUp }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="bg-neutral-900/50 backdrop-blur-md border-white/5 hover:border-[#E11D48]/50 transition-colors group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <item.icon className="w-16 h-16 text-[#E11D48]" />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                <CardTitle className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                                    {item.title}
                                </CardTitle>
                                <item.icon className="h-4 w-4 text-[#E11D48]" />
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>{item.value}</div>
                                <p className={`text-xs font-mono flex items-center ${item.trend.startsWith('+') || item.trend.startsWith('-') && item.title !== "Churn Rate" ? "text-emerald-500" : "text-[#E11D48]"}`}>
                                    {item.trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                    <span className="opacity-80">from last month</span>
                                </p>
                            </CardContent>
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Chart */}
                <motion.div
                    className="col-span-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="bg-neutral-900/50 backdrop-blur-md border-white/5 h-full">
                        <CardHeader>
                            <CardTitle className="text-white uppercase tracking-wider font-bold text-sm">Revenue Trajectory</CardTitle>
                            <CardDescription>Financial performance over time.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-0">
                            <ChartContainer config={chartConfig} className="h-[350px] w-full">
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E11D48" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#E11D48" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tickFormatter={(value) => value}
                                        stroke="#525252"
                                        fontSize={12}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                        stroke="#525252"
                                        fontSize={12}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent style={{ backgroundColor: '#171717', border: '1px solid #333' }} />} />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#E11D48"
                                        strokeWidth={2}
                                        fill="url(#fillRevenue)"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Recent Members */}
                <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="bg-neutral-900/50 backdrop-blur-md border-white/5 h-full">
                        <CardHeader>
                            <CardTitle className="text-white uppercase tracking-wider font-bold text-sm">Recent Transactions</CardTitle>
                            <CardDescription>Latest financial activity.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", status: "Pro Plan" },
                                    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", status: "Day Pass" },
                                    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", status: "Monthly" },
                                    { name: "William Kim", email: "will@email.com", amount: "+$99.00", status: "Starter" },
                                    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", status: "Day Pass" }
                                ].map((sale, i) => (
                                    <div key={i} className="flex items-center group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center text-white font-bold text-xs ring-2 ring-transparent group-hover:ring-[#E11D48]/50 transition-all">
                                            {sale.name.charAt(0)}{sale.name.split(" ")[1].charAt(0)}
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none text-white group-hover:text-[#E11D48] transition-colors">{sale.name}</p>
                                            <p className="text-xs text-neutral-500">{sale.email}</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <div className="font-medium text-white">{sale.amount}</div>
                                            <div className="text-[10px] uppercase font-bold text-neutral-600 bg-neutral-900 px-2 py-0.5 rounded-sm inline-block">{sale.status}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
