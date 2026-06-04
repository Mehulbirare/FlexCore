"use client"

import { asset } from "@/lib/asset"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Zap, Target, BarChart2, Check, Smartphone, Users, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  // Tracks which pricing card's feature dropdown is open (all collapsed by default)
  const [openPlan, setOpenPlan] = useState<number | null>(null)

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-sans selection:bg-[#E11D48] selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-1">
            <div className="h-6 w-3 bg-[#E11D48] skew-x-[-12deg]" />
            <div className="h-6 w-3 bg-white skew-x-[-12deg]" />
            <span className="text-xl font-bold tracking-tighter text-white ml-2" style={{ fontFamily: 'var(--font-outfit)' }}>FLEXCORE</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/70">
            {['Platform', 'Pricing', 'Manifesto'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase() === 'platform' ? 'features' : item.toLowerCase() === 'manifesto' ? 'about' : item.toLowerCase()}`} className="relative group overflow-hidden py-1">
                <span className="relative z-10 group-hover:text-[#E11D48] transition-colors duration-300">{item}</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E11D48] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-sm font-bold hover:text-[#E11D48] transition-colors uppercase tracking-widest">Login</Link>
            <Link href="/login">
              <Button className="bg-[#E11D48] text-white hover:bg-[#be123c] rounded-none px-6 font-bold tracking-wider uppercase skew-x-[-12deg] shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all hover:shadow-[0_0_40px_rgba(225,29,72,0.6)]">
                <span className="skew-x-[12deg]">Get Started</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Cinematic Video Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Full-screen Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            src={asset("/arena-video.mp4")}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Bottom gradient fade into the page */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 rounded-none uppercase tracking-[0.3em] py-2 px-6 text-xs font-bold hover:bg-white/20">
                Next-Gen Gym Management
              </Badge>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-black leading-[0.85] uppercase tracking-tighter mb-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'var(--font-outfit)' }}>
              Train <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-orange-500">Smarter</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto mb-12 font-light drop-shadow-lg px-4">
              The high-performance operating system for next-generation gyms. Optimize everything.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto sm:max-w-none px-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-16 px-12 bg-white text-black hover:bg-neutral-200 rounded-none text-lg font-bold uppercase tracking-wider skew-x-[-12deg] group shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  <span className="skew-x-[12deg] flex items-center justify-center gap-2">Start Free Trial <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto h-16 px-12 border-white/30 text-white hover:bg-white/10 rounded-none text-lg font-bold uppercase tracking-wider skew-x-[-12deg] backdrop-blur-sm">
                  <span className="skew-x-[12deg] flex items-center justify-center gap-2">Explore Platform</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Scrolling Banner */}
      {/* Scrolling Banner */}
      <div className="bg-[#E11D48] text-white py-4 overflow-hidden border-y-4 border-black transform -rotate-2 scale-110 z-20 origin-left flex">
        <div className="flex items-center gap-12 animate-infinite-scroll whitespace-nowrap font-black text-2xl uppercase tracking-tighter shrink-0 min-w-full pr-12">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              FLEXCORE <Zap className="fill-white w-6 h-6" />
            </span>
          ))}
        </div>
        <div className="flex items-center gap-12 animate-infinite-scroll whitespace-nowrap font-black text-2xl uppercase tracking-tighter shrink-0 min-w-full pr-12" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              FLEXCORE <Zap className="fill-white w-6 h-6" />
            </span>
          ))}
        </div>
      </div>

      {/* Features Staggered */}
      <section id="features" className="py-32 bg-neutral-950 relative z-10 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col gap-32">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase leading-none mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Total <br /> <span className="text-[#E11D48]">Control</span>
                </h2>
                <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                  Manage memberships, classes, and inventory from a single command center. Real-time updates mean you never miss a beat.
                </p>
                <ul className="space-y-4">
                  {['Automated Billing Cycles', 'Smart Access Control Integration', 'Inventory Tracking'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg">
                      <div className="w-6 h-6 rounded-none bg-[#E11D48] flex items-center justify-center text-white font-bold">
                        <Check className="w-4 h-4" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 relative">
                <div className="absolute top-0 right-0 w-3/4 h-full bg-[#E11D48] -skew-x-12 opacity-20 blur-3xl ml-auto" />
                <img
                  src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"
                  className="relative w-full aspect-square object-cover grayscale contrast-125 border-2 border-white/10"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute top-0 left-0 w-3/4 h-full bg-blue-600 -skew-x-12 opacity-20 blur-3xl mr-auto" />
                <img
                  src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg"
                  className="relative w-full aspect-square object-cover grayscale contrast-125 border-2 border-white/10"
                />
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase leading-none mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Engage <br /> <span className="text-blue-600">Instantly</span>
                </h2>
                <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                  Keep your community connected with push notifications, progress tracking, and leaderboards that drive competition.
                </p>
                <Button variant="outline" className="h-14 px-8 border-white text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest text-sm font-bold">
                  View Mobile App
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: The Arena (Lifestyle Grid) */}
      <section id="about" className="py-20 bg-neutral-900 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
              Inside The <span className="text-[#E11D48]">Arena</span>
            </h2>
            <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
              We are more than just software. We are a movement dedicated to pushing the boundaries of human performance.
              Our manifesto is simple: relentless improvement, zero compromises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
            {/* Card 1: Community Video Card */}
            <motion.div
              whileHover={{ scale: 0.99 }}
              className="h-[350px] md:h-full md:col-span-3 relative overflow-hidden group border border-white/5 rounded-none cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Video Component */}
              <video
                src={asset("/community-video.mp4")}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-100 grayscale group-hover:grayscale-0"
              />
              
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* HUD: Upper Right Corner (Live stats pill) */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 skew-x-[-12deg]">
                <span className="skew-x-[12deg] flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E11D48]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E11D48] animate-ping shrink-0" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E11D48] absolute shrink-0" />
                  Live Arena Feed
                </span>
              </div>

              {/* HUD: Upper Left Corner (Telemetry ID) */}
              <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-white/40 tracking-wider hidden sm:block">
                SYS_LOC: // ARENA_01 // SEC_C
              </div>

              {/* HUD: Lower Content Block */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-8 flex flex-col justify-end h-1/2">
                {/* Meta details hidden by default, slide up on hover */}
                <div className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out mb-4">
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#E11D48]" /> 1,842 Active Members</span>
                    <span className="text-white/20">|</span>
                    <span>Peak Energy: 98.7%</span>
                    <span className="text-white/20">|</span>
                    <span className="text-[#E11D48]">Class in Progress</span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-sm font-mono text-[#E11D48] mb-1 tracking-[0.3em] font-bold">[ COMMUNITY / 01 ]</div>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tighter" style={{ fontFamily: 'var(--font-outfit)' }}>
                      The Collective Force
                    </h3>
                  </div>
                  
                  {/* Subtle chevron indicator */}
                  <div className="h-10 w-10 bg-white/10 hover:bg-[#E11D48] transition-colors duration-300 flex items-center justify-center border border-white/10 group-hover:scale-110 transform duration-300">
                    <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Equipment Video Card */}
            <motion.div
              whileHover={{ scale: 0.99 }}
              className="h-[350px] md:h-full md:col-span-1 relative overflow-hidden group border border-white/5 rounded-none cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <video
                src={asset("/7986045-uhd_2160_3840_30fps.mp4")}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-100 grayscale group-hover:grayscale-0"
              />
              
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* HUD: Upper Right Corner (Live specs pill) */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 skew-x-[-12deg]">
                <span className="skew-x-[12deg] text-[10px] font-bold uppercase tracking-widest text-blue-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-blue-500 animate-pulse" />
                  Power Rig
                </span>
              </div>

              {/* HUD: Lower Content Block */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex flex-col justify-end h-1/2">
                {/* Meta details hidden by default, slide up on hover */}
                <div className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out mb-4">
                  <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                    Heavy-duty biomechanically optimized machinery built for zero compromise.
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs font-mono text-blue-500 mb-1 tracking-[0.3em] font-bold">[ EQUIPMENT / 02 ]</div>
                    <h3 className="text-2xl font-black uppercase text-white tracking-tighter" style={{ fontFamily: 'var(--font-outfit)' }}>
                      Rig Systems
                    </h3>
                  </div>
                  
                  {/* Subtle chevron indicator */}
                  <div className="h-8 w-8 bg-white/10 hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center border border-white/10 group-hover:scale-110 transform duration-300">
                    <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: System Architecture */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E11D48] to-transparent opacity-50" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
              System <span className="text-neutral-700">Architecture</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              Built on a hyper-scale infrastructure designed for zero-latency operations.
            </p>
          </motion.div>

          {/* Mobile: horizontal snap carousel Â· Desktop: 3-col grid */}
          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0 pb-6 md:pb-0 scrollbar-hide">
            {[
              { title: "Ingest", icon: Target, desc: "Capture leads from social, web, and walk-ins instantly.", img: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg" },
              { title: "Process", icon: Zap, desc: "AI algorithms categorize and assign engaging workflows.", img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg" },
              { title: "Convert", icon: BarChart2, desc: "Turn prospects into high-value members automatically.", img: "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="group relative shrink-0 w-[82%] sm:w-[60%] md:w-auto snap-center bg-neutral-900 border border-white/10 p-10 overflow-hidden hover:border-[#E11D48] transition-colors"
                whileHover={{ y: -10 }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black/80 group-hover:bg-black/70 transition-colors duration-500 z-10" />
                  <img src={item.img} className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>

                <div className="relative z-10">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#E11D48] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <item.icon className="w-12 h-12 text-[#E11D48] mb-8" />
                  <h3 className="text-2xl font-bold uppercase mb-4 tracking-wider text-white">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Swipe hint â€” mobile only */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-neutral-600">
            <ArrowRight className="w-4 h-4 -scale-x-100" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Swipe</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* NEW SECTION: Mobile Command */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.1),transparent_60%)]" />

        {/* Mobile: stacked. Desktop: side-by-side */}
        <div className="relative z-10 flex flex-col md:flex-row min-h-screen">

          {/* LEFT: Text */}
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-20 md:py-0 w-full md:w-1/2 md:min-h-screen">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#E11D48] opacity-10 blur-[80px] pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="h-[2px] w-10 bg-[#E11D48]" />
              <span className="font-mono text-[#E11D48] text-xs uppercase tracking-[0.4em] font-bold">Mobile Command // v3.1</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase leading-[0.85] tracking-tighter mb-6 md:mb-10"
              style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
            >
              Command<br />
              <span className="text-[#E11D48]">From</span><br />
              Anywhere
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-400 max-w-sm mb-6 md:mb-8 leading-relaxed"
            >
              The entire FlexCore operating system in your pocket. Manage staff, check revenue, and approve workflows â€” wherever you are on the planet.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10"
            >
              {[
                { label: "Active Sessions", value: "1,284", dot: "bg-green-500" },
                { label: "Revenue Today", value: "$9,420", dot: "bg-[#E11D48]" },
                { label: "Uptime", value: "99.9%", dot: "bg-blue-500" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 font-mono text-xs">
                  <span className={`w-2 h-2 rounded-full ${stat.dot} animate-pulse shrink-0`} />
                  <span className="text-neutral-400">{stat.label}:</span>
                  <span className="text-white font-bold">{stat.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Button className="bg-[#E11D48] text-white hover:bg-[#be123c] h-12 md:h-14 px-6 md:px-8 rounded-none uppercase font-bold tracking-wider skew-x-[-12deg] shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_50px_rgba(225,29,72,0.6)] transition-all w-full sm:w-auto">
                <span className="skew-x-[12deg] flex items-center gap-2"><Smartphone className="h-4 w-4 md:h-5 md:w-5" /> Download App</span>
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12 md:h-14 px-6 md:px-8 rounded-none uppercase font-bold tracking-wider w-full sm:w-auto">
                See Demo
              </Button>
            </motion.div>
          </div>

          {/* RIGHT: Phone */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center py-16 md:py-20 bg-neutral-950 md:min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.12),transparent_70%)]" />
            <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10 hidden md:block" />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 flex items-center justify-center"
            >
              {/* Glow */}
              <div className="absolute w-40 h-6 bg-[#E11D48] opacity-25 blur-2xl -bottom-4 left-1/2 -translate-x-1/2 rounded-full" />

              {/* Floating stat â€” left (hidden on very small screens) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -left-2 sm:-left-16 top-[22%] z-30 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 shadow-xl hidden sm:block"
              >
                <p className="text-[8px] text-neutral-500 uppercase tracking-wider font-mono">Active Members</p>
                <p className="text-base font-black text-white font-mono">1,284</p>
                <p className="text-[8px] text-green-400 font-mono">â–² 12% today</p>
              </motion.div>

              {/* Floating stat â€” right (hidden on very small screens) */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-2 sm:-right-16 top-[35%] z-30 bg-[#E11D48]/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-xl hidden sm:block"
              >
                <p className="text-[8px] text-white/70 uppercase tracking-wider font-mono">Classes Live</p>
                <p className="text-base font-black text-white font-mono">14</p>
                <p className="text-[8px] text-white/60 font-mono">right now</p>
              </motion.div>

              {/* Phone shell â€” scales with viewport */}
              <div
                className="relative shadow-[0_40px_120px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)]"
                style={{
                  width: 'clamp(200px, 38vw, 300px)',
                  height: 'clamp(420px, 78vw, 620px)',
                  borderRadius: 'clamp(36px, 7vw, 52px)',
                  background: 'linear-gradient(160deg,#3a3a3a 0%,#1a1a1a 40%,#0d0d0d 100%)',
                  padding: 'clamp(8px, 1.5vw, 12px)',
                  boxSizing: 'border-box',
                }}
              >
                {/* Buttons */}
                <div className="absolute -left-[4px] top-[80px] w-[4px] h-6 bg-[#E11D48] rounded-l-md shadow-[0_0_8px_rgba(225,29,72,0.5)]" />
                <div className="absolute -left-[4px] top-[120px] w-[4px] h-8 bg-neutral-600 rounded-l-md" />
                <div className="absolute -left-[4px] top-[140px] w-[4px] h-8 bg-neutral-600 rounded-l-md" />
                <div className="absolute -right-[4px] top-[130px] w-[4px] h-10 bg-neutral-600 rounded-r-md" />

                {/* USB-C */}
                <div className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-14 h-[5px] bg-neutral-800 rounded-full" />
                <div className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-9 h-[3px] bg-neutral-700 rounded-full" />

                {/* Screen */}
                <div
                  className="relative overflow-hidden bg-black w-full h-full"
                  style={{ borderRadius: 'clamp(28px, 6vw, 42px)' }}
                >
                  <video
                    src={asset("/equipment-video.mp4")}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                  {/* Dynamic Island */}
                  <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 bg-black z-30 flex items-center justify-center gap-1.5"
                    style={{ width: 'clamp(70px, 14vw, 95px)', height: 'clamp(20px, 4vw, 28px)', borderRadius: '20px' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 border border-neutral-700" />
                  </div>

                  {/* Status bar */}
                  <div className="absolute top-10 left-0 right-0 px-4 flex items-center justify-between z-20">
                    <span className="text-white text-[10px] font-bold">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-[2px] items-end">
                        {[3,5,7,9].map((h,i) => <div key={i} className="w-[2px] bg-white rounded-sm" style={{height:`${h}px`}} />)}
                      </div>
                      <div className="w-5 h-2.5 rounded-sm border border-white/60 p-[2px] ml-1">
                        <div className="h-full w-3/4 bg-white rounded-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Live pill */}
                  <div className="absolute top-[3.8rem] right-3 z-20 flex items-center gap-1 bg-[#E11D48] px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-white text-[8px] font-bold uppercase tracking-wider">Live</span>
                  </div>

                  {/* Bottom revenue card */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
                    <div className="bg-black/75 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-[8px] text-neutral-400 uppercase tracking-widest font-mono mb-0.5">Today's Revenue</p>
                          <p className="text-lg font-black text-white">$9,420</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#E11D48] flex items-center justify-center shadow-[0_0_12px_rgba(225,29,72,0.5)]">
                          <BarChart2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-[#E11D48] rounded-full" />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[8px] text-neutral-500 font-mono">72% of goal</span>
                        <span className="text-[8px] text-[#E11D48] font-mono font-bold">+8.4% â–²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* NEW SECTION: Pricing */}
      <section id="pricing" className="py-32 bg-neutral-950 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black uppercase mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
              Power <span className="text-[#E11D48]">Pricing</span>
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-lg">
              Scale your fitness empire with flexible plans designed for high-growth facilities.
            </p>
          </div>

          {/* Mobile: horizontal snap carousel Â· Desktop: 3-col grid */}
          <div className="flex items-start md:grid md:grid-cols-3 md:items-stretch gap-6 md:gap-8 max-w-6xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-auto md:px-0 pt-5 pb-6 md:py-0 scrollbar-hide">
            {[
              { name: 'Starter', price: '$199', desc: 'Essential tools for boutique studios.', features: ['Up to 500 members', 'Class scheduling', 'Automated billing', 'Email support'] },
              { name: 'Pro', price: '$399', desc: 'Advanced automation for growing gyms.', popular: true, features: ['Unlimited members', 'AI lead automation', 'Access control integration', 'Advanced analytics', 'Priority 24/7 support'] },
              { name: 'Elite', price: '$799', desc: 'Full custom stack for franchises.', features: ['Everything in Pro', 'Multi-location management', 'Custom GraphQL API', 'Dedicated success manager', 'White-label branding'] }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -20, scale: 1.02, boxShadow: "0 20px 40px -15px rgba(225, 29, 72, 0.2)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`relative shrink-0 w-[82%] sm:w-[60%] md:w-auto snap-center p-8 border ${plan.popular ? 'border-[#E11D48] bg-[#E11D48]/5' : 'border-white/10 bg-neutral-900'} flex flex-col group hover:border-[#E11D48] transition-colors`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E11D48] text-white text-xs font-bold uppercase px-3 py-1 tracking-widest shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold uppercase mb-2 text-white group-hover:text-[#E11D48] transition-colors">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-neutral-500">/mo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-6">{plan.desc}</p>

                {/* Collapsible feature list */}
                <div className="mb-6 md:mb-8">
                  <button
                    type="button"
                    onClick={() => setOpenPlan(openPlan === i ? null : i)}
                    aria-expanded={openPlan === i}
                    className="flex w-full items-center justify-between border-y border-white/10 py-3 text-left"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 group-hover:text-white transition-colors">
                      What's included
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E11D48] transition-transform duration-300 ${openPlan === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openPlan === i && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 pt-4">
                          {plan.features.map((feature, k) => (
                            <li key={k} className="flex items-center gap-3 text-sm text-neutral-300">
                              <div className="p-1 rounded-full bg-[#E11D48]/20 text-[#E11D48] shrink-0">
                                <Check className="w-3 h-3" />
                              </div>
                              <span className="group-hover:text-white transition-colors">{feature}</span>
                            </li>
                          ))}
                        </div>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                <Button className={`w-full h-12 md:mt-auto rounded-none font-bold uppercase tracking-wider transition-all duration-300 ${plan.popular ? 'bg-[#E11D48] text-white hover:bg-[#be123c] hover:shadow-[0_0_20px_rgba(225,29,72,0.6)]' : 'bg-white text-black hover:bg-[#E11D48] hover:text-white'}`}>
                  Choose {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Swipe hint â€” mobile only */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-neutral-600">
            <ArrowRight className="w-4 h-4 -scale-x-100" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Swipe</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>


      {/* NEW SECTION: Hyper-Performance Grid */}
      <section className="py-32 bg-neutral-950 relative z-10">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black uppercase text-center mb-20 leading-none tracking-tighter" style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Built For <br /> <span className="inline-block bg-[#E11D48] text-white px-4 py-2 mt-3 leading-none">Speed</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Card 1: Global Infrastructure (Large) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden p-8 flex flex-col justify-between group min-h-[300px] md:min-h-0"
            >
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10">
                <Badge className="bg-[#E11D48] text-white border-none rounded-full px-3 mb-4">Network</Badge>
                <h3 className="text-3xl sm:text-4xl font-bold uppercase mb-2">Global <br /> Infrastructure</h3>
              </div>
              <div className="relative z-10 flex gap-4 text-sm text-neutral-400 font-mono">
                <div>
                  <span className="block text-white font-bold">12</span>
                  Regions
                </div>
                <div>
                  <span className="block text-white font-bold">99.99%</span>
                  Uptime
                </div>
              </div>
            </motion.div>

            {/* Card 2: Lightning Speed */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:border-[#E11D48]/50 transition-colors min-h-[200px] md:min-h-0"
            >
              <Zap className="w-12 h-12 text-[#E11D48] mb-4 group-hover:scale-125 transition-transform duration-300" />
              <h3 className="text-xl font-bold uppercase">Flash Latency</h3>
              <p className="text-neutral-500 text-sm mt-2">Under 50ms response times globally.</p>
            </motion.div>

            {/* Card 3: Biometric */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 relative overflow-hidden group min-h-[200px] md:min-h-0"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Smartphone className="w-24 h-24" />
              </div>
              <Badge className="bg-neutral-800 text-white border-neutral-700 mb-26">Security</Badge>
              <div className="mt-8">
                <h3 className="text-xl font-bold uppercase">Biometric <br /> Ready</h3>
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /></div>
                  <div className="h-8 w-hero rounded bg-white/5" />
                </div>
              </div>
            </motion.div>

            {/* Card 4: Code / API (Wide) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 bg-[#E11D48] text-white rounded-3xl p-8 relative overflow-hidden flex items-center min-h-[250px] md:min-h-0"
            >
              <div className="flex-1 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black uppercase mb-2">Developer API</h3>
                <p className="font-medium opacity-80 max-w-xs text-sm sm:text-base">Build custom integrations with our robust GraphQL API.</p>
                <Button size="sm" className="mt-6 bg-black text-white hover:bg-neutral-800 border-none rounded-full px-6">Read Docs</Button>
              </div>
              {/* Code Snippet Visual */}
              <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 bg-black p-4 rounded-xl shadow-2xl w-[250px] opacity-90 transform rotate-6 border border-white/20">
                <div className="flex gap-1 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                </div>
                <div className="space-y-2 font-mono text-[10px] text-green-400">
                  <p><span className="text-purple-400">const</span> gym = <span className="text-blue-400">await</span> flex.init();</p>
                  <p>gym.<span className="text-yellow-400">optimize</span>();</p>
                  <p className="text-neutral-500">// Returns 200 OK</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Panel */}
      <section className="py-24 bg-neutral-950 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(225,29,72,0.07),transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-xs text-white/40 uppercase tracking-[0.4em]">Live Overview // SYS_CORE</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Dashboard Shell */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-neutral-900 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E11D48]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="font-mono text-[11px] text-white/30 tracking-widest uppercase">flexcore â€” command center v3.1</span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest">System Online</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">

              {/* LEFT: KPI column */}
              <div className="p-6 flex flex-col gap-4">
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-2">Key Metrics</p>
                {[
                  { label: "Gyms Powered", value: "500+", change: "+12% MoM", up: true },
                  { label: "Revenue Processed", value: "$2M+", change: "+8.4% MoM", up: true },
                  { label: "Uptime SLA", value: "99.9%", change: "0 incidents", up: true },
                  { label: "Support Response", value: "< 2 min", change: "24/7 live", up: true },
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{m.label}</p>
                      <p className="text-2xl font-black text-white font-mono">{m.value}</p>
                    </div>
                    <span className={`text-[11px] font-mono px-2 py-1 ${m.up ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                      {m.change}
                    </span>
                  </div>
                ))}
              </div>

              {/* CENTER: Activity feed */}
              <div className="p-6 flex flex-col gap-3">
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-2">Live Activity Feed</p>
                {[
                  { time: "just now", event: "New member signed up", gym: "Iron Temple NYC", color: "bg-green-500" },
                  { time: "2m ago", event: "Class booked â€” HIIT Extreme", gym: "FitZone LA", color: "bg-blue-500" },
                  { time: "5m ago", event: "Payment processed $299", gym: "PowerHouse ATL", color: "bg-[#E11D48]" },
                  { time: "9m ago", event: "Staff shift updated", gym: "Core Studios SF", color: "bg-yellow-500" },
                  { time: "14m ago", event: "Equipment check completed", gym: "Flex Arena MIA", color: "bg-purple-500" },
                  { time: "21m ago", event: "Revenue report generated", gym: "Urban Gym CHI", color: "bg-green-500" },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                    <div className={`w-1.5 h-1.5 rounded-full ${a.color} mt-1.5 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 truncate">{a.event}</p>
                      <p className="text-[11px] text-neutral-500 font-mono">{a.gym}</p>
                    </div>
                    <span className="text-[10px] text-neutral-600 font-mono shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>

              {/* RIGHT: Spark bars + big stat */}
              <div className="p-6 flex flex-col gap-6">
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-2">Revenue Trend</p>

                {/* Fake bar chart */}
                <div className="flex items-end gap-1.5 h-24">
                  {[40, 65, 50, 80, 70, 90, 60, 95, 75, 100, 85, 92].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex-1 rounded-sm origin-bottom"
                      style={{
                        height: `${h}%`,
                        background: i === 11 ? '#E11D48' : 'rgba(255,255,255,0.15)'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between font-mono text-[10px] text-neutral-600">
                  <span>Jan</span><span>Jun</span><span>Dec</span>
                </div>

                {/* Big number */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1 font-mono">Active Members â€” Global</p>
                  <p className="text-5xl font-black text-white font-mono">128<span className="text-[#E11D48]">K</span></p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '78%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-[#E11D48] rounded-full"
                      />
                    </div>
                    <span className="font-mono text-xs text-[#E11D48] font-bold">78%</span>
                  </div>
                  <p className="font-mono text-[10px] text-neutral-600 mt-1">of monthly target hit</p>
                </div>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center gap-6 px-6 py-2 bg-neutral-900/50 border-t border-white/5">
              <span className="font-mono text-[10px] text-white/20">SYS: NOMINAL</span>
              <span className="font-mono text-[10px] text-white/20">|</span>
              <span className="font-mono text-[10px] text-white/20">DB: CONNECTED</span>
              <span className="font-mono text-[10px] text-white/20">|</span>
              <span className="font-mono text-[10px] text-white/20">API: 12ms AVG</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[10px] text-green-500">All systems operational</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mega Footer */}
      <footer className="bg-[#E11D48] text-white pt-20 pb-10 px-6">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h2 className="text-[12vw] font-black leading-none tracking-tighter mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>
            FLEXCORE
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-2xl border-t-2 border-black/30 pt-8 mb-20 px-4">
            <p className="text-lg sm:text-xl font-bold max-w-xs text-center md:text-left text-white/90">
              Ready to revolutionize your fitness business?
            </p>
            <Button className="h-16 w-full md:w-auto px-10 bg-black text-white hover:bg-black/80 rounded-none text-lg font-bold uppercase tracking-wider skew-x-[-12deg] md:ml-auto">
              <span className="skew-x-[12deg]">Get Started Now</span>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between w-full text-xs font-bold uppercase tracking-widest border-t border-black/30 pt-8 text-white/80">
            <p>&copy; 2024 FlexCore Inc.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}
