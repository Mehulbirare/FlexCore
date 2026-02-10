import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction } from "lucide-react"

export default async function ClientPlaceholderPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <Card className="w-full max-w-md bg-neutral-900/50 border-white/10 text-center p-8">
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-[#E11D48]/10 flex items-center justify-center">
                        <Construction className="h-8 w-8 text-[#E11D48]" />
                    </div>
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold uppercase tracking-wider text-white">
                        {slug} Module
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-neutral-400">
                        This feature is currently under active development. <br />
                        Check back soon for updates.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
