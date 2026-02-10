"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Zap, Target, BarChart2, Check, Smartphone, Users } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col bg-black text-white font-sans selection:bg-[#E11D48] selection:text-white overflow-x-hidden">
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

      {/* Kinetic Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="outline" className="mb-8 border-[#E11D48] text-[#E11D48] bg-[#E11D48]/10 px-4 py-1.5 text-xs rounded-none uppercase tracking-[0.2em]">
              Future of Fitness Management
            </Badge>
            <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] uppercase tracking-tighter mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>
              Train <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-orange-500">Smarter</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-12 font-light">
              The high-performance operating system for next-generation gyms. Optimize everything.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/login">
                <Button className="h-16 px-12 bg-white text-black hover:bg-neutral-200 rounded-none text-lg font-bold uppercase tracking-wider skew-x-[-12deg] group">
                  <span className="skew-x-[12deg] flex items-center gap-2">Start Free Trial <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div >

        {/* Floating UI Mocks */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] perspective-1000"
        >
          <div className="relative bg-neutral-900 border border-white/10 rounded-t-xl p-4 shadow-2xl shadow-[#E11D48]/20">
            {/* Mock Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="h-2 w-32 bg-white/10 rounded-full" />
            </div>
            {/* Mock Content */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/50 p-6 rounded-lg border border-white/5">
                <p className="text-neutral-500 text-xs uppercase mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-white">$124,500</p>
                <p className="text-[#E11D48] text-sm mt-2 flex items-center gap-1"><Zap className="h-3 w-3" /> +14% vs last month</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-white/5">
                <p className="text-neutral-500 text-xs uppercase mb-2">Active Members</p>
                <p className="text-3xl font-bold text-white">2,845</p>
                <div className="flex -space-x-2 mt-3">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-neutral-700 border border-black" />)}
                </div>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-white/5 flex items-center justify-center">
                <img src="https://images.pexels.com/photos/7911758/pexels-photo-7911758.jpeg" className="w-full h-full object-cover rounded opacity-50 grayscale" />
              </div>
            </div>
          </div>
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
                <h2 className="text-5xl md:text-7xl font-bold uppercase leading-none mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
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
                <h2 className="text-5xl md:text-7xl font-bold uppercase leading-none mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
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

          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="col-span-2 row-span-2 relative overflow-hidden group"
            >
              <img src="https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
                <h3 className="text-2xl font-bold uppercase text-white">Community</h3>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 0.98 }} className="col-span-1 row-span-1 relative overflow-hidden group">
              <img src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
            </motion.div>
            <motion.div whileHover={{ scale: 0.98 }} className="col-span-1 row-span-2 relative overflow-hidden group">
              <img src="https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
                <h3 className="text-xl font-bold uppercase text-white">Equipment</h3>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 0.98 }} className="col-span-1 row-span-1 relative overflow-hidden group">
              <img src="https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="group relative bg-neutral-900 border border-white/10 p-10 overflow-hidden hover:border-[#E11D48] transition-colors"
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
        </div>
      </section>

      {/* NEW SECTION: Mobile Command */}
      <section className="py-32 bg-[#E11D48] text-white relative overflow-hidden">
        {/* Decorative patterned background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-black text-white hover:bg-black/80 border-none rounded-none uppercase tracking-widest py-2 px-4 mb-6">Mobile First</Badge>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>
                Command <br /> From <br /> Anywhere
              </h2>
              <p className="text-xl font-medium mb-10 max-w-md leading-relaxed text-white/90">
                The entire FlexCore operating system in your pocket. Manage staff, check revenue, and approve workflows on the go.
              </p>
              <div className="flex gap-4">
                <Button className="bg-white text-black hover:bg-neutral-200 h-14 px-8 rounded-none uppercase font-bold tracking-wider">
                  <Smartphone className="mr-2 h-5 w-5" /> iOS App
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black h-14 px-8 rounded-none uppercase font-bold tracking-wider">
                  Android
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 100, rotate: 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-black shadow-2xl overflow-hidden"
            >
              {/* Phone Screen Content */}
              <div className="absolute inset-0 bg-neutral-900 flex flex-col">
                <div className="h-8 bg-black w-full flex justify-center items-center">
                  <div className="w-20 h-4 bg-black rounded-b-xl" />
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold">FlexCore</span>
                    <div className="w-8 h-8 rounded-full bg-[#E11D48]" />
                  </div>
                  <div className="h-40 bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-neutral-500 text-xs uppercase mb-1">Today's Revenue</div>
                    <div className="text-3xl font-bold text-white">$4,250</div>
                    <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-[#E11D48]" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-t-xl mt-4 p-4 space-y-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-12 bg-neutral-100 rounded-lg w-full" />
                    ))}
                  </div>
                </div>
              </div>
              {/* Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            </motion.div>
            {/* Floating Elements behind phone */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-20 -right-10 w-24 h-24 bg-black text-[#E11D48] rounded-full flex items-center justify-center font-black text-xl shadow-xl z-20 border-4 border-[#E11D48]"
            >
              100%
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Starter', price: '$199', desc: 'Essential tools for boutique studios.' },
              { name: 'Pro', price: '$399', desc: 'Advanced automation for growing gyms.', popular: true },
              { name: 'Elite', price: '$799', desc: 'Full custom stack for franchises.' }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -20, scale: 1.02, boxShadow: "0 20px 40px -15px rgba(225, 29, 72, 0.2)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`relative p-8 border ${plan.popular ? 'border-[#E11D48] bg-[#E11D48]/5' : 'border-white/10 bg-neutral-900'} flex flex-col group hover:border-[#E11D48] transition-colors`}
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
                <p className="text-neutral-400 text-sm mb-8">{plan.desc}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {[1, 2, 3, 4].map(k => (
                    <li key={k} className="flex items-center gap-3 text-sm text-neutral-300">
                      <div className="p-1 rounded-full bg-[#E11D48]/20 text-[#E11D48]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="group-hover:text-white transition-colors">Advanced Feature Access</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full h-12 rounded-none font-bold uppercase tracking-wider transition-all duration-300 ${plan.popular ? 'bg-[#E11D48] text-white hover:bg-[#be123c] hover:shadow-[0_0_20px_rgba(225,29,72,0.6)]' : 'bg-white text-black hover:bg-[#E11D48] hover:text-white'}`}>
                  Choose {plan.name}
                </Button>
              </motion.div>
            ))}
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
            Built For <br /> <span className="text-white box-decoration-clone bg-[#E11D48] text-white px-4">Speed</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Card 1: Global Infrastructure (Large) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden p-8 flex flex-col justify-between group"
            >
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10">
                <Badge className="bg-[#E11D48] text-white border-none rounded-full px-3 mb-4">Network</Badge>
                <h3 className="text-4xl font-bold uppercase mb-2">Global <br /> Infrastructure</h3>
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
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:border-[#E11D48]/50 transition-colors"
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
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Smartphone className="w-24 h-24" />
              </div>
              <Badge className="bg-neutral-800 text-white border-neutral-700 mb-26">Security</Badge>
              <div className="mt-12">
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
              className="md:col-span-2 bg-[#E11D48] text-white rounded-3xl p-8 relative overflow-hidden flex items-center"
            >
              <div className="flex-1 relative z-10">
                <h3 className="text-3xl font-black uppercase mb-2">Developer API</h3>
                <p className="font-medium opacity-80 max-w-xs">Build custom integrations with our robust GraphQL API.</p>
                <Button size="sm" className="mt-6 bg-black text-white hover:bg-neutral-800 border-none rounded-full px-6">Read Docs</Button>
              </div>
              {/* Code Snippet Visual */}
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 bg-black p-4 rounded-xl shadow-2xl w-[250px] opacity-90 transform rotate-6 border border-white/20">
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

      {/* Stats / Numbers */}
      <section className="py-20 border-y border-white/10 bg-black">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { num: "500+", label: "Gyms Powered" },
            { num: "$2M+", label: "Revenue Processed" },
            { num: "99.9%", label: "Uptime" },
            { num: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-2 font-mono">{stat.num}</h3>
              <p className="text-[#E11D48] uppercase tracking-widest text-sm font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mega Footer */}
      <footer className="bg-[#E11D48] text-white pt-20 pb-10 px-6">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h2 className="text-[12vw] font-black leading-none tracking-tighter mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>
            FLEXCORE
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-2xl border-t-2 border-black/30 pt-8 mb-20">
            <p className="text-xl font-bold max-w-xs text-left text-white/90">
              Ready to revolutionize your fitness business?
            </p>
            <Button className="h-16 px-10 bg-black text-white hover:bg-black/80 rounded-none text-lg font-bold uppercase tracking-wider skew-x-[-12deg] ml-auto">
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
