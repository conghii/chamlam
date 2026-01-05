import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function BlogListPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
                <Link href="/blog/editor">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Entry
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder for blog posts */}
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="hover:bg-secondary/50 transition-colors cursor-pointer">
                        <CardHeader>
                            <div className="text-xs text-muted-foreground mb-2">Dec 31, 2024</div>
                            <CardTitle className="text-xl">Reflection on Year 2024</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground line-clamp-3">
                                This year has been transformational. I learned Next.js, built 3 SaaS apps, and improved my productivity...
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
