import { ThreeWins } from "@/components/dashboard/three-wins"
import { GoalOverview } from "@/components/dashboard/goal-overview"
import { TaskList } from "@/components/dashboard/task-list"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <ThreeWins />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-2 lg:col-span-4">
                    <GoalOverview />
                </div>
                <div className="col-span-2 lg:col-span-3">
                    <TaskList />
                </div>
            </div>
        </div>
    )
}
