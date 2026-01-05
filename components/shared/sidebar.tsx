"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CheckSquare, Target, BookOpen, PenTool, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
    { icon: Target, label: "Goals", href: "/dashboard/goals" },
    { icon: BookOpen, label: "Planner", href: "/planner" },
    { icon: PenTool, label: "Blog", href: "/blog" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="hidden h-screen w-64 flex-col border-r bg-background md:flex">
            <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-xl font-bold tracking-tight">Stitch.</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item, index) => (
                        <Link key={index} href={item.href}>
                            <Button
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={cn("w-full justify-start gap-3", pathname === item.href && "bg-secondary")}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="border-t p-4">
                <Button variant="ghost" className="w-full justify-start gap-3">
                    <Settings className="h-4 w-4" />
                    Settings
                </Button>
            </div>
        </aside>
    )
}
