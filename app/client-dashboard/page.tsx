"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ArrowUpRight, ArrowDownRight, CalendarCheck, Flame, Timer, TrendingUp, Dumbbell, Zap } from "lucide-react"
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
        color: "#f43f5e", // rose-500
    },
    duration: {
        label: "Duration (min)",
        color: "#f97316", // orange-500
    },
} satisfies ChartConfig

export default function ClientDashboardPage() {
    return (
        <div className="space-y-8 relative z-10 pb-10">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-black/20 p-6 rounded-3xl border border-white/5 backdrop-blur-md"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-rose-500 fill-rose-500" />
                        <span className="text-rose-500 font-bold tracking-widest uppercase text-xs">Welcome Back</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Member <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Overview</span>
                    </h2>
                    <p className="text-neutral-400 text-sm">Here is your progress and schedule for the week.</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </div>
                    <span className="text-sm font-bold text-white uppercase tracking-wider">Status: <span className="text-rose-400">Elite</span></span>
                </div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Weekly Workouts", value: "5", trend: "+1", trendUp: true, icon: Dumbbell },
                    { title: "Calories Burned", value: "2,450", trend: "+12%", trendUp: true, icon: Flame },
                    { title: "Active Minutes", value: "320", trend: "+5%", trendUp: true, icon: Timer },
                    { title: "Weight Goal", value: "78kg", trend: "-0.5kg", trendUp: true, icon: TrendingUp }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-rose-500/30 hover:bg-white/10 transition-all duration-300 group overflow-hidden relative rounded-3xl shadow-lg">
                            <div className="absolute -right-6 -top-6 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                                <item.icon className="w-32 h-32 text-white" />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                <CardTitle className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    {item.title}
                                </CardTitle>
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center border border-white/5 group-hover:border-rose-500/30 transition-colors">
                                    <item.icon className="h-4 w-4 text-rose-400" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10 pt-2">
                                <div className="text-3xl font-semibold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>{item.value}</div>
                                <p className={`text-xs font-medium flex items-center gap-1.5 w-fit px-2 py-1 rounded-full ${item.trendUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                                    {item.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                    {item.trend} <span className="opacity-70 text-neutral-400 ml-1">vs last week</span>
                                </p>
                            </CardContent>
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                {/* Main Chart */}
                <motion.div
                    className="col-span-full lg:col-span-4"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl overflow-hidden h-full">
                        <CardHeader className="border-b border-white/5 pb-6">
                            <CardTitle className="text-white text-lg font-semibold tracking-tight">Activity Intensity</CardTitle>
                            <CardDescription className="text-neutral-400">Calories burned over the last 7 days.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ChartContainer config={chartConfig} className="h-[250px] md:h-[300px] w-full">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="fillCalories" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" strokeDasharray="4 4" />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={12}
                                        tickFormatter={(value) => value}
                                        stroke="#737373"
                                        fontSize={12}
                                        fontWeight={500}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                        stroke="#737373"
                                        fontSize={12}
                                        fontWeight={500}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent className="bg-neutral-900 border-white/10 text-white rounded-xl shadow-xl" />} />
                                    <Area
                                        type="monotone"
                                        dataKey="calories"
                                        stroke="url(#fillCalories)"
                                        strokeWidth={3}
                                        fill="url(#fillCalories)"
                                        activeDot={{ r: 6, fill: "#f43f5e", stroke: "#fff", strokeWidth: 2 }}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Upcoming Classes */}
                <motion.div
                    className="col-span-full lg:col-span-3"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl overflow-hidden h-full flex flex-col">
                        <CardHeader className="border-b border-white/5 pb-6">
                            <CardTitle className="text-white text-lg font-semibold tracking-tight">Your Schedule</CardTitle>
                            <CardDescription className="text-neutral-400">Upcoming classes and sessions.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 flex-1">
                            <div className="space-y-4">
                                {[
                                    { name: "HIIT Blast", time: "Today, 5:00 PM", trainer: "Sarah J.", role: "High Intensity" },
                                    { name: "Yoga Flow", time: "Tomorrow, 7:00 AM", trainer: "Mike T.", role: "Mobility" },
                                    { name: "Strength Training", time: "Wed, 6:00 PM", trainer: "David L.", role: "Strength" },
                                    { name: "Spin Class", time: "Fri, 5:30 PM", trainer: "Emily R.", role: "Cardio" }
                                ].map((session, i) => (
                                    <div key={i} className="flex items-center group cursor-pointer p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/5 flex items-center justify-center text-white ring-2 ring-transparent group-hover:ring-rose-500/30 transition-all">
                                            <CalendarCheck className="h-5 w-5 text-rose-400" />
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">{session.name}</p>
                                            <p className="text-xs text-neutral-400">{session.time} • <span className="text-neutral-500">{session.trainer}</span></p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <div className="text-[10px] uppercase font-bold tracking-wider text-rose-300 bg-rose-500/10 px-3 py-1 rounded-full inline-block border border-rose-500/20">{session.role}</div>
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
