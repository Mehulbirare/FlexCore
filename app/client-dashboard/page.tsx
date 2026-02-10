"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ArrowUpRight, ArrowDownRight, Activity, CalendarCheck, Flame, Timer, TrendingUp, Dumbbell } from "lucide-react"
import { motion } from "framer-motion"

const chartData = [
    { day: "Mon", calories: 450, duration: 45 },
    { day: "Tue", calories: 320, duration: 30 },
    { day: "Wed", calories: 550, duration: 60 },
    { day: "Thu", calories: 0, duration: 0 },
    { day: "Fri", calories: 480, duration: 50 },
    { day: "Sat", calories: 600, duration: 75 },
    { day: "Sun", calories: 200, duration: 20 },
]

const chartConfig = {
    calories: {
        label: "Calories",
        color: "#E11D48",
    },
    duration: {
        label: "Duration (min)",
        color: "#E11D48",
    },
} satisfies ChartConfig

export default function ClientDashboardPage() {
    return (
        <div className="space-y-8 p-8 bg-black/20 min-h-screen">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Member Overview
                    </h2>
                    <p className="text-neutral-400">Track your progress and schedule.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#E11D48]/10 border border-[#E11D48]/20 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
                    <span className="text-xs font-bold text-[#E11D48] uppercase tracking-wider">Status: Active</span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Weekly Workouts", value: "5", trend: "+1", trendUp: true, icon: Dumbbell },
                    { title: "Calories Burned", value: "2,450", trend: "+12%", trendUp: true, icon: Flame },
                    { title: "Active Minutes", value: "320", trend: "+5%", trendUp: true, icon: Timer },
                    { title: "Weight Goal", value: "78kg", trend: "-0.5kg", trendUp: true, icon: TrendingUp } // TrendUp can mean "good" even if negative for weight
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
                                <p className={`text-xs font-mono flex items-center ${item.trendUp ? "text-emerald-500" : "text-[#E11D48]"}`}>
                                    {item.trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                    <span className="opacity-80">from last week</span>
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
                            <CardTitle className="text-white uppercase tracking-wider font-bold text-sm">Activity Intensity</CardTitle>
                            <CardDescription>Calories burned over the last 7 days.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-0">
                            <ChartContainer config={chartConfig} className="h-[350px] w-full">
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="fillCalories" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E11D48" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#E11D48" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="day"
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
                                        tickFormatter={(value) => `${value}`}
                                        stroke="#525252"
                                        fontSize={12}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent style={{ backgroundColor: '#171717', border: '1px solid #333' }} />} />
                                    <Area
                                        type="monotone"
                                        dataKey="calories"
                                        stroke="#E11D48"
                                        strokeWidth={2}
                                        fill="url(#fillCalories)"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Upcoming Classes */}
                <motion.div
                    className="col-span-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="bg-neutral-900/50 backdrop-blur-md border-white/5 h-full">
                        <CardHeader>
                            <CardTitle className="text-white uppercase tracking-wider font-bold text-sm">Your Schedule</CardTitle>
                            <CardDescription>Upcoming classes and sessions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { name: "HIIT Blast", time: "Today, 5:00 PM", trainer: "Sarah J.", role: "High Intensity" },
                                    { name: "Yoga Flow", time: "Tomorrow, 7:00 AM", trainer: "Mike T.", role: "Mobility" },
                                    { name: "Strength Training", time: "Wed, 6:00 PM", trainer: "David L.", role: "Strength" },
                                    { name: "Spin Class", time: "Fri, 5:30 PM", trainer: "Emily R.", role: "Cardio" }
                                ].map((session, i) => (
                                    <div key={i} className="flex items-center group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center text-white font-bold text-xs ring-2 ring-transparent group-hover:ring-[#E11D48]/50 transition-all">
                                            <CalendarCheck className="h-4 w-4" />
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none text-white group-hover:text-[#E11D48] transition-colors">{session.name}</p>
                                            <p className="text-xs text-neutral-500">{session.time} with {session.trainer}</p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <div className="text-[10px] uppercase font-bold text-neutral-600 bg-neutral-900 px-2 py-0.5 rounded-sm inline-block">{session.role}</div>
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
