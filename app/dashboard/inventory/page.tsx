"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MOCK_INVENTORY } from "@/lib/mock-data"
import { Plus, Search, Package, AlertTriangle, CheckCircle, XCircle, Box, ShoppingBag, Barcode, QrCode } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function InventoryPage() {
    const [hoveredItem, setHoveredItem] = useState<typeof MOCK_INVENTORY[0] | null>(null)

    return (
        <div className="relative space-y-8 p-8 min-h-screen">
            {/* Page Specific Background */}
            <div
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'url(/inventory-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-2 flex items-center gap-3" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Gear Arsenal <Box className="h-8 w-8 text-[#E11D48]" />
                        </h2>
                        <p className="text-neutral-400 font-medium">Track equipment availability and merchandise stock.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 min-w-[250px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                            <Input
                                placeholder="Search inventory..."
                                className="pl-10 h-10 bg-black/40 border-[#E11D48]/20 focus-visible:ring-[#E11D48]/50 text-white placeholder:text-neutral-600 rounded-lg"
                            />
                        </div>
                        <Button className="h-10 bg-[#E11D48] hover:bg-[#be123c] text-white font-bold uppercase tracking-wide skew-x-[-10deg] shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all">
                            <span className="skew-x-[10deg] flex items-center">
                                <Plus className="mr-2 h-4 w-4 font-bold" /> Add Item
                            </span>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Inventory List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 rounded-xl border border-white/5 bg-neutral-900/40 backdrop-blur-md overflow-hidden relative"
                    >
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E11D48] to-transparent opacity-50" />
                        <Table>
                            <TableHeader className="bg-black/40">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12 pl-6">Item Code</TableHead>
                                    <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12">Details</TableHead>
                                    <TableHead className="text-neutral-400 font-bold uppercase tracking-wider text-xs h-12 w-[150px]">Stock Status</TableHead>
                                    <TableHead className="text-right text-neutral-400 font-bold uppercase tracking-wider text-xs h-12 pr-6">Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {MOCK_INVENTORY.map((item, i) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.05) }}
                                        className="border-b border-white/5 last:border-0 hover:bg-[#E11D48]/5 transition-colors group cursor-pointer"
                                        onMouseEnter={() => setHoveredItem(item)}
                                    >
                                        <TableCell className="font-mono text-neutral-500 text-xs py-4 pl-6 uppercase group-hover:text-white transition-colors">
                                            #{item.id.substring(0, 6)}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 relative rounded-lg overflow-hidden border border-white/10 group-hover:border-[#E11D48]/50 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                                    {(item as any).image ? (
                                                        <img src={(item as any).image} alt={item.name} className="object-cover h-full w-full" />
                                                    ) : (
                                                        <div className="h-full w-full bg-neutral-800 flex items-center justify-center">
                                                            <Package className="h-5 w-5 text-neutral-600" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold tracking-tight text-white group-hover:text-[#E11D48] transition-colors">{item.name}</div>
                                                    <div className="text-xs text-neutral-500 font-medium">{item.category}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`
                                            uppercase tracking-widest text-[9px] font-bold border-0 px-2 py-0.5 w-fit
                                            ${item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20' :
                                                    item.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20' :
                                                        'bg-red-500/10 text-red-500 ring-1 ring-red-500/20'}
                                        `}>
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-mono font-bold text-white pr-6">
                                            ${item.price.toFixed(2)}
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    </motion.div>

                    {/* Holographic Preview Panel */}
                    <div className="lg:col-span-1 hidden lg:block sticky top-24 h-fit">
                        <AnimatePresence mode="wait">
                            {hoveredItem ? (
                                <motion.div
                                    key={hoveredItem.id}
                                    initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card className="bg-neutral-900/60 border border-white/10 backdrop-blur-xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#E11D48]/5 to-transparent pointer-events-none" />

                                        {/* Scanning Line Animation */}
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E11D48] shadow-[0_0_10px_#E11D48] opacity-50 animate-[scan_3s_linear_infinite]" />

                                        <CardContent className="p-0">
                                            <div className="h-56 bg-black/40 flex items-center justify-center relative border-b border-white/5 group overflow-hidden">
                                                <div className="absolute inset-0 bg-[#E11D48]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                                <AnimatePresence mode="wait">
                                                    <motion.img
                                                        key={(hoveredItem as any).image}
                                                        initial={{ opacity: 0, scale: 1.1 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        src={(hoveredItem as any).image}
                                                        alt={hoveredItem.name}
                                                        className="h-full w-full object-cover animate-holographic"
                                                    />
                                                </AnimatePresence>

                                                {/* Scanning Effect Overlay */}
                                                <div className="absolute inset-x-0 h-[2px] bg-[#E11D48] shadow-[0_0_15px_#E11D48] opacity-70 animate-scan z-20 pointer-events-none" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                                                <div className="absolute bottom-4 right-4 z-30 text-[10px] font-mono text-[#E11D48] font-bold uppercase tracking-widest border border-[#E11D48]/30 px-2 py-1 rounded bg-black/80 backdrop-blur-md">
                                                    SYSTEM_LINK_STABLE
                                                </div>
                                            </div>
                                            <div className="p-6 space-y-6">
                                                <div>
                                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                                                        {hoveredItem.name}
                                                    </h3>
                                                    <Badge variant="outline" className="mt-2 border-[#E11D48]/30 text-[#E11D48] bg-[#E11D48]/5 uppercase tracking-wider text-[10px]">
                                                        {hoveredItem.category}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center p-3 bg-black/20 rounded border border-white/5">
                                                        <span className="text-sm text-neutral-400">Unit Price</span>
                                                        <span className="font-mono text-xl text-white font-bold">${hoveredItem.price.toFixed(2)}</span>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-xs uppercase font-bold text-neutral-500">
                                                            <span>Stock Level</span>
                                                            <span>{hoveredItem.quantity} Units</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full ${hoveredItem.quantity < 20 ? 'bg-red-500' : 'bg-[#E11D48]'} transition-all duration-500 box-shadow-[0_0_10px_currentColor]`}
                                                                style={{ width: `${Math.min(hoveredItem.quantity, 100)}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 pt-4">
                                                        <Button className="bg-[#E11D48] hover:bg-[#be123c] text-white font-bold uppercase tracking-wide text-xs">
                                                            Restock
                                                        </Button>
                                                        <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-wide text-xs">
                                                            Report Issue
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] text-neutral-500 font-mono uppercase">
                                                <span>ID: {hoveredItem.id}</span>
                                                <QrCode className="h-4 w-4 text-neutral-600" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-8"
                                >
                                    <Package className="h-16 w-16 text-neutral-700 mb-4" />
                                    <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest text-center">
                                        Hover over an item to view<br />specifications
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
