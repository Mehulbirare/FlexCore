"use client"

import { useParams } from "next/navigation"
import { MOCK_TRAINERS, MOCK_MEMBERS } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, MapPin, Phone, Star, ShieldCheck, Dumbbell, Clock, Activity, Award, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function TrainerProfilePage() {
    const params = useParams()
    const id = params.id as string
    const trainer = MOCK_TRAINERS.find(t => t.id === id)

    if (!trainer) {
        return <div className="p-8 text-center text-neutral-500 font-mono uppercase tracking-widest">Target not found in database</div>
    }

    return (
        <div className="space-y-8 p-8 min-h-screen bg-black/50">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-900/60 backdrop-blur-md p-6 md:p-10 group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Dumbbell className="h-64 w-64 -rotate-12 text-[#E11D48]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#E11D48]/5 to-transparent opacity-50 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="relative">
                        <Avatar className="h-40 w-40 border-4 border-[#E11D48]/20 shadow-[0_0_40px_rgba(225,29,72,0.2)]">
                            <AvatarImage src={trainer.avatar} className="object-cover" />
                            <AvatarFallback className="text-4xl font-black bg-neutral-800 text-white">{trainer.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-2 right-2 h-6 w-6 bg-emerald-500 rounded-full border-4 border-neutral-900 shadow-[0_0_15px_#10b981]" />
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="space-y-1">
                            <h1 className="text-5xl font-black tracking-tighter uppercase text-white" style={{ fontFamily: 'var(--font-outfit)' }}>{trainer.name}</h1>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <Badge className="bg-[#E11D48] text-white hover:bg-[#E11D48] border-0 text-xs font-bold uppercase tracking-wide px-3 py-1">
                                    {trainer.specialty} Specialist
                                </Badge>
                                <span className="flex items-center gap-1 text-[#E11D48] font-bold text-sm uppercase tracking-wide">
                                    <Star className="h-4 w-4 fill-[#E11D48]" /> {trainer.rating} Rating
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-neutral-400 font-medium">
                            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#E11D48]" /> NASM • ACE • ISSA Certified</span>
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#E11D48]" /> Sector 7 • Main Floor</span>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <Button className="h-10 bg-white text-black hover:bg-neutral-200 font-bold uppercase tracking-wide skew-x-[-10deg]">
                                <span className="skew-x-[10deg] flex items-center">
                                    <Mail className="mr-2 h-4 w-4" /> Message
                                </span>
                            </Button>
                            <Button variant="outline" className="h-10 border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-wide skew-x-[-10deg]">
                                <span className="skew-x-[10deg] flex items-center">
                                    <Phone className="mr-2 h-4 w-4" /> Contact
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[180px]">
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden group/stat">
                            <div className="absolute inset-0 bg-[#E11D48] opacity-0 group-hover/stat:opacity-10 transition-opacity" />
                            <div className="text-3xl font-black text-white font-mono">{trainer.clients}</div>
                            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                <Activity className="h-3 w-3 text-[#E11D48]" /> Active Recruits
                            </div>
                        </div>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden group/stat">
                            <div className="absolute inset-0 bg-[#E11D48] opacity-0 group-hover/stat:opacity-10 transition-opacity" />
                            <div className="text-3xl font-black text-white font-mono">1.2k</div>
                            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1">
                                <Clock className="h-3 w-3 text-[#E11D48]" /> Training Hours
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-neutral-900/60 border border-white/5 p-1 h-12 w-full justify-start rounded-lg overflow-hidden">
                    {['Overview', 'Schedule', 'Clients'].map((tab) => (
                        <TabsTrigger
                            key={tab}
                            value={tab.toLowerCase()}
                            className="h-full px-8 text-neutral-400 font-bold uppercase tracking-wide text-xs data-[state=active]:bg-[#E11D48] data-[state=active]:text-white rounded-md transition-all"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="md:col-span-2 bg-neutral-900/60 border border-white/5 backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white uppercase tracking-wider font-bold">
                                    <Activity className="h-5 w-5 text-[#E11D48]" /> Mission Brief
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-neutral-300 leading-relaxed font-medium">
                                    {trainer.name} is a dedicated fitness professional specializing in <span className="text-white font-bold">{trainer.specialty}</span>.
                                    With over 5 years of field experience, they have led hundreds of recruits to achieve their physical peak.
                                    Known for a tactical approach and scientific programming, {trainer.name.split(' ')[0]} ensures every session maximizes output.
                                </p>
                                <div className="space-y-3">
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-500">Elite Certifications</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["NASM Certified Personal Trainer", "CPR/AED Certified", "Precision Nutrition Level 1"].map((cert, i) => (
                                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/5 text-xs text-neutral-300 font-medium">
                                                <Award className="h-3 w-3 text-[#E11D48]" /> {cert}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white uppercase tracking-wider font-bold">
                                    <Zap className="h-5 w-5 text-[#E11D48]" /> Combat Specs
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {["Weight Loss", "Muscle Gain", "Mobility", "HIIT", "Strength Training", "Nutrition Coaching"].map((tag) => (
                                        <Badge key={tag} variant="outline" className="border-white/10 bg-white/5 hover:bg-[#E11D48]/20 hover:text-white hover:border-[#E11D48]/50 transition-all cursor-default">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="schedule">
                    <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-white uppercase tracking-wider font-bold">Upcoming Operations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative border-l border-white/10 ml-4 space-y-8 pl-8 py-2">
                                {[
                                    { day: "Today", time: "09:00 AM", client: "Alice Johnson", type: "Personal Training", status: "In Progress" },
                                    { day: "Today", time: "11:30 AM", client: "Bob Smith", type: "Consultation", status: "upcoming" },
                                    { day: "Tomorrow", time: "08:00 AM", client: "Group Class", type: "HIIT Session", status: "upcoming" },
                                    { day: "Wed", time: "02:00 PM", client: "Diana Prince", type: "Strength Training", status: "upcoming" },
                                ].map((session, i) => (
                                    <div key={i} className="relative">
                                        <div className={`absolute -left-[37px] h-4 w-4 rounded-full border-2 ${i === 0 ? 'bg-[#E11D48] border-[#E11D48] shadow-[0_0_10px_#E11D48]' : 'bg-neutral-900 border-neutral-600'}`} />

                                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#E11D48]/30 transition-all group/item">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-black/40 flex flex-col items-center justify-center text-white border border-white/5 font-bold">
                                                    <span className="text-[10px] text-[#E11D48] uppercase">{session.day}</span>
                                                    <span className="text-sm">{session.time.split(' ')[0]}</span>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white group-hover/item:text-[#E11D48] transition-colors">{session.type}</div>
                                                    <div className="text-xs text-neutral-400 font-medium">Operative: {session.client}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                                                {session.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="clients">
                    <Card className="bg-neutral-900/60 border border-white/5 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-white uppercase tracking-wider font-bold">Assigned Recruits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {MOCK_MEMBERS.slice(0, 4).map((member) => (
                                    <div key={member.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group/client">
                                        <Avatar className="h-12 w-12 border border-white/10 group-hover/client:border-[#E11D48] transition-colors">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-bold text-white group-hover/client:text-[#E11D48] transition-colors">{member.name}</div>
                                            <div className="text-xs text-neutral-400 font-medium bg-black/40 px-2 py-0.5 rounded w-fit mt-1">{member.plan} Plan</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
