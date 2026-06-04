"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, LogOut, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

// Key under which we remember that the user has accepted the privacy policy.
const STORAGE_KEY = "flexcore:privacy-accepted"

/**
 * Blocks the dashboard behind a mandatory privacy-policy notice on first login.
 * The user must either Accept (which is remembered) or Logout (back to /login).
 * Mounted inside the dashboard layouts so it covers every authenticated page.
 */
export function PrivacyPolicyGate() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    // Only show the gate if the user hasn't accepted yet. Runs on the client
    // so we can safely read localStorage.
    useEffect(() => {
        try {
            if (localStorage.getItem(STORAGE_KEY) !== "true") {
                setOpen(true)
            }
        } catch {
            // If storage is unavailable, fail safe by showing the notice.
            setOpen(true)
        }
    }, [])

    const handleAccept = () => {
        try {
            localStorage.setItem(STORAGE_KEY, "true")
        } catch {
            // Ignore storage errors — worst case the notice shows again later.
        }
        setOpen(false)
    }

    const handleLogout = () => {
        setIsLoggingOut(true)
        try {
            localStorage.removeItem(STORAGE_KEY)
        } catch {
            // Ignore storage errors.
        }
        router.push("/login")
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="privacy-title"
                        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-800 bg-[#0A0A0A] text-white shadow-2xl"
                    >
                        {/* Accent bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-[#E11D48] to-orange-500" />

                        <div className="p-8">
                            {/* Header */}
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/20">
                                    <ShieldCheck className="h-6 w-6 text-[#E11D48]" />
                                </div>
                                <div>
                                    <h2
                                        id="privacy-title"
                                        className="text-xl font-semibold tracking-tight"
                                        style={{ fontFamily: "var(--font-outfit)" }}
                                    >
                                        Privacy Policy
                                    </h2>
                                    <p className="text-xs uppercase tracking-widest text-neutral-500">
                                        Please review to continue
                                    </p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-4 text-sm leading-relaxed text-neutral-400">
                                <p>
                                    Welcome to <span className="text-white font-medium">FlexCore</span>. Before you continue,
                                    please review how we handle your information.
                                </p>
                                <p>
                                    We collect and process your account details, activity data, and usage
                                    metrics solely to operate and improve the platform. Your data is encrypted
                                    in transit and at rest, and is never sold to third parties.
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        "We store only the data required to provide our services.",
                                        "You can request export or deletion of your data at any time.",
                                        "We use cookies to keep you signed in and remember preferences.",
                                        "Third-party processors are bound by strict data agreements.",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E11D48]/15 text-[#E11D48]">
                                                <Check className="h-3 w-3" />
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p>
                                    By selecting <span className="text-white font-medium">Accept</span>, you confirm that you
                                    have read and agree to our privacy practices and terms of service.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <Button
                                    variant="outline"
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="h-11 border-neutral-800 bg-[#111] text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-xl font-medium"
                                >
                                    {isLoggingOut ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <LogOut className="h-4 w-4" /> Logout
                                        </span>
                                    )}
                                </Button>
                                <Button
                                    onClick={handleAccept}
                                    disabled={isLoggingOut}
                                    className="h-11 bg-[#E11D48] text-white hover:bg-[#be123c] rounded-xl font-semibold shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Check className="h-4 w-4" /> Accept
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
