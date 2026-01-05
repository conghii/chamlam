import { Sidebar } from "@/components/shared/sidebar"
import { Header } from "@/components/shared/header"
import { BottomNav } from "@/components/shared/bottom-nav"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-8 md:pb-8">
                    {children}
                </main>
            </div>
            <BottomNav />
        </div>
    )
}
