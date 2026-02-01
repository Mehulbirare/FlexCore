"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2, Mail, Phone, Smartphone, Zap, Eye, EyeOff, Lock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

    // Handlers
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate backend delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        if (email && password) {
            toast.success("Access Granted", { description: "Welcome to the Arena." })
            router.push("/dashboard")
        } else {
            setIsLoading(false)
            toast.error("Access Denied", { description: "Invalid credentials." })
        }
    }

    const handlePhoneLoginStart = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate sending OTP
        await new Promise(resolve => setTimeout(resolve, 1000))

        toast.success("Signal Sent", { description: "Check your device for the code." })
        setIsOtpSent(true)
        setIsLoading(false)
    }

    const handlePhoneLoginVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate verifying
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
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 relative bg-neutral-950 text-white font-sans selection:bg-[#E11D48] selection:text-white">
            <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/50 hover:text-[#E11D48] transition-colors uppercase tracking-widest text-xs font-bold group">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Base
            </Link>

            {/* Visual Side (Left) */}
            <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-black border-r border-[#E11D48]/20">
                {/* Background Image & Effects */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <img
                        src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg"
                        alt="Gym Background"
                        className="w-full h-full object-cover opacity-60 grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-[#E11D48]/10 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)]" />
                </div>

                {/* Top Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 flex items-center gap-2"
                >
                    <div className="flex h-8 w-8 items-center justify-center bg-[#E11D48] skew-x-[-12deg]">
                        <Zap className="h-5 w-5 text-white skew-x-[12deg] fill-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tighter uppercase" style={{ fontFamily: 'var(--font-outfit)' }}>FLEXCORE</span>
                </motion.div>

                {/* Bottom Text */}
                <div className="relative z-10 max-w-lg">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl font-black uppercase leading-[0.9] tracking-tighter mb-6"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                        Dominate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-orange-600">Your Market</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-white/60 font-medium max-w-md border-l-2 border-[#E11D48] pl-6"
                    >
                        The operating system for high-performance fitness facilities. Join the elite.
                    </motion.p>
                </div>
            </div>

            {/* Form Side (Right) */}
            <div className="flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, type: "spring", damping: 20 }}
                    className="w-full max-w-[420px] relative z-10"
                >
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black uppercase tracking-tight mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>Enter The Arena</h2>
                        <p className="text-neutral-500">Secure access for authorized personnel only.</p>
                    </div>

                    <Card className="border-[#E11D48]/20 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(225,29,72,0.05)] rounded-none relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E11D48] to-transparent opacity-50" />

                        <CardHeader className="pt-8 px-8 pb-4">
                            <Tabs defaultValue="email" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6 bg-neutral-900 rounded-none p-1 border border-white/5">
                                    <TabsTrigger
                                        value="email"
                                        className="rounded-none data-[state=active]:bg-[#E11D48] data-[state=active]:text-white uppercase tracking-wider text-xs font-bold transition-all duration-300"
                                    >
                                        <Mail className="w-3 h-3 mr-2" /> Email
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="phone"
                                        className="rounded-none data-[state=active]:bg-[#E11D48] data-[state=active]:text-white uppercase tracking-wider text-xs font-bold transition-all duration-300"
                                    >
                                        <Smartphone className="w-3 h-3 mr-2" /> Phone
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="email" className="mt-0">
                                    <form onSubmit={handleEmailLogin} className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs uppercase font-bold tracking-widest text-neutral-500">Email Address</Label>
                                            <div className="relative group/input">
                                                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500 group-focus-within/input:text-[#E11D48] transition-colors" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="admin@flexcore.com"
                                                    className="pl-11 h-12 bg-neutral-900/50 border-white/10 rounded-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/50 transition-all font-medium placeholder:text-neutral-700"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password" className="text-xs uppercase font-bold tracking-widest text-neutral-500">Password</Label>
                                                <Link href="#" className="text-xs text-[#E11D48] hover:text-[#be123c] transition-colors font-bold uppercase tracking-wide">Forgot?</Link>
                                            </div>
                                            <div className="relative group/input">
                                                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500 group-focus-within/input:text-[#E11D48] transition-colors" />
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="pl-11 h-12 bg-neutral-900/50 border-white/10 rounded-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/50 transition-all font-medium placeholder:text-neutral-700"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-3.5 text-neutral-500 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <Button
                                            disabled={isLoading}
                                            className="w-full h-12 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold uppercase tracking-widest rounded-none shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all skew-x-[-3deg]"
                                        >
                                            <span className="skew-x-[3deg] flex items-center justify-center gap-2">
                                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign In <Zap className="h-4 w-4 fill-white" /></>}
                                            </span>
                                        </Button>
                                    </form>
                                </TabsContent>

                                <TabsContent value="phone" className="mt-0">
                                    {!isOtpSent ? (
                                        <form onSubmit={handlePhoneLoginStart} className="space-y-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-xs uppercase font-bold tracking-widest text-neutral-500">Mobile Number</Label>
                                                <div className="relative group/input">
                                                    <Phone className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500 group-focus-within/input:text-[#E11D48] transition-colors" />
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="+1 555 000 0000"
                                                        className="pl-11 h-12 bg-neutral-900/50 border-white/10 rounded-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/50 transition-all font-medium placeholder:text-neutral-700"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                disabled={isLoading}
                                                className="w-full h-12 bg-white text-black hover:bg-neutral-200 font-bold uppercase tracking-widest rounded-none skew-x-[-3deg]"
                                            >
                                                <span className="skew-x-[3deg] flex items-center justify-center gap-2">
                                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Code"}
                                                </span>
                                            </Button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handlePhoneLoginVerify} className="space-y-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="otp" className="text-xs uppercase font-bold tracking-widest text-neutral-500">Security Code</Label>
                                                <div className="relative group/input">
                                                    <Smartphone className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500 group-focus-within/input:text-[#E11D48] transition-colors" />
                                                    <Input
                                                        id="otp"
                                                        type="text"
                                                        placeholder="000 000"
                                                        className="pl-11 h-12 bg-neutral-900/50 border-white/10 rounded-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48]/50 transition-all font-medium placeholder:text-neutral-700 tracking-[0.5em] text-center font-mono"
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        required
                                                        maxLength={6}
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                disabled={isLoading}
                                                className="w-full h-12 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold uppercase tracking-widest rounded-none shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all skew-x-[-3deg]"
                                            >
                                                <span className="skew-x-[3deg] flex items-center justify-center gap-2">
                                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm & Access"}
                                                </span>
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="w-full text-xs text-neutral-500 hover:text-white uppercase tracking-wider"
                                                onClick={() => setIsOtpSent(false)}
                                            >
                                                Change Number
                                            </Button>
                                        </form>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </CardHeader>
                        <CardFooter className="flex flex-col gap-6 px-8 pb-8">
                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                                    <span className="bg-[#0A0A0A] px-2 text-neutral-500">Or Authenticate With</span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full h-11 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white text-neutral-300 rounded-none uppercase tracking-wide text-xs font-bold transition-all"
                            >
                                <svg className="mr-2 h-4 w-4 grayscale group-hover:grayscale-0 transition-all" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26+-.19-.58z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google Account
                            </Button>
                            <p className="text-center text-xs text-neutral-500">
                                New to FlexCore?{" "}
                                <Link href="/signup" className="text-[#E11D48] hover:text-[#be123c] font-bold uppercase tracking-wider ml-1">
                                    Initiate Account
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>

                    <div className="mt-8 flex justify-center gap-6 opacity-30">
                        <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse delay-75" />
                        <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse delay-150" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
