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
        color: "#ffffff", // Pure white
    },
    duration: {
        label: "Duration (min)",
        color: "#525252", // neutral-600
    },
} satisfies ChartConfig

export default function ClientDashboardPage() {
    return (
        <div className="space-y-8 relative z-10 pb-10">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#0A0A0A] p-6 rounded-[2rem] border border-neutral-800 shadow-xl"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-white fill-white" />
                        <span className="text-white font-bold tracking-widest uppercase text-xs">Welcome Back</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Member Overview
                    </h2>
                    <p className="text-neutral-400 text-sm">Here is your progress and schedule for the week.</p>
                </div>
                <div className="flex items-center gap-3 bg-[#111] border border-neutral-800 px-4 py-2.5 rounded-2xl">
                    <div className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-25"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </div>
                    <span className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Status: <span className="text-white">Elite</span></span>
                </div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
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
                        <Card className="h-full bg-[#0A0A0A] border-neutral-800 hover:border-neutral-600 transition-all duration-300 group overflow-hidden relative rounded-2xl sm:rounded-[2rem] shadow-lg">
                            <div className="absolute -right-6 -top-6 p-4 opacity-[0.03] group-hover:opacity-5 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                                <item.icon className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2 pb-2 relative z-10">
                                <CardTitle className="text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-wider leading-tight">
                                    {item.title}
                                </CardTitle>
                                <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full bg-[#111] flex items-center justify-center border border-neutral-800 group-hover:bg-white group-hover:text-black transition-colors">
                                    <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neutral-400 group-hover:text-black transition-colors" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10 pt-2">
                                <div className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>{item.value}</div>
                                <p className={`text-[10px] sm:text-xs font-medium flex items-center gap-1 w-fit px-2 py-1 rounded-full ${item.trendUp ? "bg-white/10 text-white" : "bg-neutral-800 text-neutral-400"}`}>
                                    {item.trendUp ? <ArrowUpRight className="h-3 w-3 shrink-0" /> : <ArrowDownRight className="h-3 w-3 shrink-0" />}
                                    {item.trend} <span className="opacity-70 text-neutral-400 ml-1 hidden sm:inline">vs last week</span>
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                {/* Main Chart */}
                <motion.div
                    className="col-span-full lg:col-span-4"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Card className="bg-[#0A0A0A] border-neutral-800 rounded-[2rem] overflow-hidden h-full shadow-lg">
                        <CardHeader className="border-b border-neutral-800 pb-6">
                            <CardTitle className="text-white text-lg font-semibold tracking-tight">Activity Intensity</CardTitle>
                            <CardDescription className="text-neutral-400">Calories burned over the last 7 days.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ChartContainer config={chartConfig} className="h-[250px] md:h-[300px] w-full">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="fillCalories" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
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
                                    <ChartTooltip content={<ChartTooltipContent className="bg-[#111] border-neutral-800 text-white rounded-xl shadow-xl" />} />
                                    <Area
                                        type="monotone"
                                        dataKey="calories"
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                        fill="url(#fillCalories)"
                                        activeDot={{ r: 6, fill: "#fff", stroke: "#000", strokeWidth: 2 }}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Upcoming Classes */}
                <motion.div
                    className="col-span-full lg:col-span-3"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Card className="bg-[#0A0A0A] border-neutral-800 rounded-[2rem] overflow-hidden h-full flex flex-col shadow-lg">
                        <CardHeader className="border-b border-neutral-800 pb-6">
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
                                    <div key={i} className="flex items-center group cursor-pointer p-4 rounded-2xl bg-[#111] border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-300">
                                        <div className="h-12 w-12 rounded-xl bg-black border border-neutral-800 flex items-center justify-center text-white ring-2 ring-transparent group-hover:bg-white group-hover:text-black transition-all">
                                            <CalendarCheck className="h-5 w-5" />
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-semibold text-white group-hover:text-white transition-colors">{session.name}</p>
                                            <p className="text-xs text-neutral-400">{session.time} • <span className="text-neutral-500">{session.trainer}</span></p>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <div className="text-[10px] uppercase font-bold tracking-wider text-black bg-white px-3 py-1 rounded-full inline-block">{session.role}</div>
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
