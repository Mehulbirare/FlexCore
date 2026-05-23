"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Loader2, Mail, Phone, Smartphone, Zap, Eye, EyeOff, Lock, ArrowRight, ShieldCheck, Fingerprint } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Email/Password State
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Phone State
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [activeTab, setActiveTab] = useState("email")

    // Handlers
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate backend delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        if (email === "admin@gmail.com" && password === "admin@123") {
            toast.success("Command Access Granted", { description: "Welcome back, Administrator." })
            router.push("/dashboard")
        } else if (email && password) {
            toast.success("Member Access Granted", { description: "Welcome to FlexCore." })
            router.push("/client-dashboard")
        } else {
            setIsLoading(false)
            toast.error("Access Denied", { description: "Invalid credentials." })
        }
    }

    const handleGuestLogin = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success("Guest Access Granted", { description: "Starting your free trial..." })
        router.push("/client-dashboard")
    }

    const handlePhoneLoginStart = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success("Signal Sent", { description: "Check your device for the code." })
        setIsOtpSent(true)
        setIsLoading(false)
    }

    const handlePhoneLoginVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (otp === "123456") {
            toast.success("Identity Verified", { description: "Initializing dashboard..." })
            router.push("/dashboard")
        } else {
            toast.error("Verification Failed", { description: "Invalid code." })
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success("Google Connected", { description: "Redirecting..." })
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center bg-neutral-950 text-white font-sans overflow-hidden selection:bg-rose-500 selection:text-white">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                    alt="Gym Background"
                    className="w-full h-full object-cover opacity-50 scale-105 transform origin-center animate-[pulse_10s_ease-in-out_infinite_alternate]"
                />
                {/* Glow effects */}
                <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-rose-600/30 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite_alternate] z-10" />
                <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-orange-600/20 rounded-full blur-[120px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_alternate] z-10" />
            </div>

            <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-all hover:gap-3 text-sm font-medium group bg-black/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                <ArrowLeft className="h-4 w-4" /> Back to Base
            </Link>

            {/* Main Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-full max-w-[1000px] flex flex-col md:flex-row mx-6 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(225,29,72,0.15)]"
            >
                {/* Left Branding Panel */}
                <div className="hidden md:flex flex-col justify-between w-5/12 p-10 relative bg-gradient-to-br from-neutral-900/80 to-black/90 border-r border-white/5">
                    {/* Abstract noise pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                    
                    <div className="relative z-10">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                                <Zap className="h-5 w-5 text-white fill-white" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>FLEXCORE</span>
                        </motion.div>
                    </div>

                    <div className="relative z-10 mt-20 mb-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-4xl font-semibold leading-tight tracking-tight mb-4"
                            style={{ fontFamily: 'var(--font-outfit)' }}
                        >
                            Elevate your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">fitness empire</span>.
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-neutral-400 text-sm leading-relaxed"
                        >
                            Join the elite network of high-performance facilities. Intelligent management, seamless experience.
                        </motion.p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 text-xs font-medium text-neutral-500 bg-white/5 p-4 rounded-2xl border border-white/5">
                        <ShieldCheck className="h-5 w-5 text-rose-400" />
                        <p>Enterprise-grade security. <br/> Your data is heavily encrypted.</p>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="w-full md:w-7/12 p-8 md:p-12 relative flex flex-col justify-center">
                    <div className="max-w-[400px] w-full mx-auto">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>Welcome back</h2>
                            <p className="text-neutral-400 text-sm">Enter your credentials to access your dashboard.</p>
                        </div>

                        <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/50 rounded-xl p-1 border border-white/10">
                                <TabsTrigger 
                                    value="email" 
                                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-neutral-800 data-[state=active]:to-neutral-900 data-[state=active]:text-white text-neutral-400 transition-all duration-300 shadow-sm"
                                >
                                    <Mail className="w-4 h-4 mr-2" /> Email
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="phone" 
                                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-neutral-800 data-[state=active]:to-neutral-900 data-[state=active]:text-white text-neutral-400 transition-all duration-300 shadow-sm"
                                >
                                    <Smartphone className="w-4 h-4 mr-2" /> Phone
                                </TabsTrigger>
                            </TabsList>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TabsContent value="email" className="mt-0 outline-none">
                                        <form onSubmit={handleEmailLogin} className="space-y-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="email" className="text-xs font-medium text-neutral-400 ml-1">Email Address</Label>
                                                <div className="relative group/input">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 group-focus-within/input:text-rose-400 transition-colors" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="admin@flexcore.com"
                                                        className="pl-11 h-12 bg-white/5 border-white/10 rounded-xl focus:border-rose-500/50 focus:ring-rose-500/20 transition-all font-medium placeholder:text-neutral-600 text-white"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between ml-1">
                                                    <Label htmlFor="password" className="text-xs font-medium text-neutral-400">Password</Label>
                                                    <Link href="#" className="text-xs text-rose-400 hover:text-rose-300 transition-colors font-medium">Forgot password?</Link>
                                                </div>
                                                <div className="relative group/input">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 group-focus-within/input:text-rose-400 transition-colors" />
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="pl-11 h-12 bg-white/5 border-white/10 rounded-xl focus:border-rose-500/50 focus:ring-rose-500/20 transition-all font-medium placeholder:text-neutral-600 text-white"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <Button
                                                disabled={isLoading}
                                                className="w-full h-12 mt-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-medium rounded-xl shadow-[0_8px_20px_-6px_rgba(244,63,94,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(244,63,94,0.6)] transition-all group"
                                            >
                                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                                    <span className="flex items-center justify-center gap-2">
                                                        Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                )}
                                            </Button>

                                            <div className="relative flex py-4 items-center">
                                                <div className="flex-grow border-t border-white/10"></div>
                                                <span className="flex-shrink-0 mx-4 text-xs text-neutral-500 font-medium">OR</span>
                                                <div className="flex-grow border-t border-white/10"></div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <Button
                                                    type="button"
                                                    onClick={handleGoogleLogin}
                                                    disabled={isLoading}
                                                    variant="outline"
                                                    className="h-11 border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-xl transition-all hover:text-white"
                                                >
                                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22-.19-.58z" fill="#FBBC05" />
                                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                    </svg>
                                                    Google
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={handleGuestLogin}
                                                    disabled={isLoading}
                                                    variant="outline"
                                                    className="h-11 border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-xl transition-all hover:text-white"
                                                >
                                                    <Fingerprint className="mr-2 h-4 w-4 text-neutral-400" />
                                                    Guest
                                                </Button>
                                            </div>
                                        </form>
                                    </TabsContent>

                                    <TabsContent value="phone" className="mt-0 outline-none">
                                        <AnimatePresence mode="wait">
                                            {!isOtpSent ? (
                                                <motion.form 
                                                    key="phone-start"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    onSubmit={handlePhoneLoginStart} 
                                                    className="space-y-4"
                                                >
                                                    <div className="space-y-1.5">
                                                        <Label htmlFor="phone" className="text-xs font-medium text-neutral-400 ml-1">Mobile Number</Label>
                                                        <div className="relative group/input">
                                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 group-focus-within/input:text-rose-400 transition-colors" />
                                                            <Input
                                                                id="phone"
                                                                type="tel"
                                                                placeholder="+1 (555) 000-0000"
                                                                className="pl-11 h-12 bg-white/5 border-white/10 rounded-xl focus:border-rose-500/50 focus:ring-rose-500/20 transition-all font-medium placeholder:text-neutral-600 text-white"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        disabled={isLoading}
                                                        className="w-full h-12 mt-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-medium rounded-xl shadow-[0_8px_20px_-6px_rgba(244,63,94,0.5)] transition-all"
                                                    >
                                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Code"}
                                                    </Button>
                                                </motion.form>
                                            ) : (
                                                <motion.form 
                                                    key="phone-verify"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    onSubmit={handlePhoneLoginVerify} 
                                                    className="space-y-4"
                                                >
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center justify-between ml-1">
                                                            <Label htmlFor="otp" className="text-xs font-medium text-neutral-400">Security Code</Label>
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setIsOtpSent(false)}
                                                                className="text-xs text-rose-400 hover:text-rose-300 transition-colors font-medium"
                                                            >
                                                                Change number
                                                            </button>
                                                        </div>
                                                        <div className="relative group/input">
                                                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 group-focus-within/input:text-rose-400 transition-colors" />
                                                            <Input
                                                                id="otp"
                                                                type="text"
                                                                placeholder="000000"
                                                                className="pl-11 h-12 bg-white/5 border-white/10 rounded-xl focus:border-rose-500/50 focus:ring-rose-500/20 transition-all font-medium placeholder:text-neutral-600 text-white tracking-[0.5em] text-center"
                                                                value={otp}
                                                                onChange={(e) => setOtp(e.target.value)}
                                                                required
                                                                maxLength={6}
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        disabled={isLoading}
                                                        className="w-full h-12 mt-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-medium rounded-xl shadow-[0_8px_20px_-6px_rgba(244,63,94,0.5)] transition-all group"
                                                    >
                                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                                            <span className="flex items-center justify-center gap-2">
                                                                Verify & Access <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                            </span>
                                                        )}
                                                    </Button>
                                                </motion.form>
                                            )}
                                        </AnimatePresence>
                                    </TabsContent>
                                </motion.div>
                            </AnimatePresence>
                        </Tabs>

                        <p className="mt-8 text-center text-sm text-neutral-500">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-white hover:text-rose-400 font-medium transition-colors">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
