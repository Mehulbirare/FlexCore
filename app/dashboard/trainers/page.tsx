"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MOCK_TRAINERS } from "@/lib/mock-data"
import { Plus, Star, Users, Dumbbell, ShieldCheck, Trophy } from "lucide-react"
import { motion } from "framer-motion"

export default function TrainersPage() {
    return (
        <div className="relative space-y-8 p-8 min-h-screen">
            {/* Page Specific Background */}
            <div
                className="absolute inset-0 z-0 opacity-15 pointer-events-none"
                style={{
                    backgroundImage: 'url(/trainers-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Coaching Staff <Trophy className="h-8 w-8 text-[#E11D48]" />
                        </h2>
                        <p className="text-neutral-400 font-medium">Manage expert trainers and performance specialists.</p>
                    </div>
                    <Button className="h-10 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold uppercase tracking-wide skew-x-[-10deg] shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all">
                        <span className="skew-x-[10deg] flex items-center">
                            <Plus className="mr-2 h-4 w-4 font-bold" /> Recuit Trainer
                        </span>
                    </Button>
                </div>

                {/* Trainers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {MOCK_TRAINERS.map((trainer, i) => (
                        <motion.div
                            key={trainer.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md overflow-hidden hover:border-[#E11D48]/50 transition-all duration-300 group relative">
                                {/* Decorative Top Line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E11D48] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <CardHeader className="flex flex-row items-center gap-4 p-6 pb-2 relative z-10">
                                    <div className="relative">
                                        <Avatar className="h-16 w-16 border-2 border-white/10 group-hover:border-[#E11D48] transition-colors">
                                            <AvatarImage src={trainer.avatar} className="object-cover" />
                                            <AvatarFallback className="bg-neutral-800 text-white font-bold">{trainer.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-black ${trainer.status === 'Available' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' :
                                            trainer.status === 'Class in Session' ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' :
                                                'bg-yellow-500'
                                            }`}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg leading-none text-white tracking-wide uppercase" style={{ fontFamily: 'var(--font-outfit)' }}>
                                            {trainer.name}
                                        </h3>
                                        <div className="flex items-center text-xs font-bold text-[#E11D48] bg-[#E11D48]/10 px-2 py-0.5 rounded w-fit">
                                            <Dumbbell className="mr-1 h-3 w-3" />
                                            {trainer.specialty}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 pt-4 space-y-4 relative z-10">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1 p-3 rounded bg-black/40 border border-white/5 text-center group-hover:bg-[#E11D48]/5 transition-colors">
                                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Active Clients</span>
                                            <span className="font-mono font-bold text-xl text-white">{trainer.clients}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 p-3 rounded bg-black/40 border border-white/5 text-center group-hover:bg-[#E11D48]/5 transition-colors">
                                            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Rating</span>
                                            <span className="font-mono font-bold text-xl text-white flex items-center justify-center gap-1">
                                                {trainer.rating} <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className={`
                                        uppercase tracking-widest text-[9px] font-bold border-0 px-2 py-0.5 h-6
                                        ${trainer.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500' :
                                                trainer.status === 'Class in Session' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-yellow-500/10 text-yellow-500'}
                                    `}>
                                            {trainer.status}
                                        </Badge>
                                    </div>
                                    <Link href={`/dashboard/trainers/${trainer.id}`}>
                                        <Button variant="ghost" size="sm" className="h-8 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/10 group-hover:translate-x-1 transition-all">
                                            Profile <span className="ml-1 text-[#E11D48]">&rarr;</span>
                                        </Button>
                                    </Link>
                                </CardFooter>

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
