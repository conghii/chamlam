"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const goals = [
    {
        id: 1,
        title: "Launch Stitch SaaS",
        deadline: "2024-03-01",
        progress: 65,
        color: "bg-blue-500"
    },
    {
        id: 2,
        title: "Read 12 Books",
        deadline: "2024-12-31",
        progress: 25,
        color: "bg-purple-500"
    },
    {
        id: 3,
        title: "Morning Run 5km",
        deadline: "Daily",
        progress: 80,
        color: "bg-green-500"
    }
]

export function GoalOverview() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
                <Card key={goal.id} className="relative overflow-hidden">
                    <div className={`absolute top-0 h-1 w-full ${goal.color}`} />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {goal.deadline}
                        </CardTitle>
                        <h3 className="text-xl font-bold">{goal.title}</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2 space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Progress</span>
                                <span>{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" indicatorClassName={goal.color} />
                            {/* Note: Custom color support for Progress requires modifying the component or using CSS vars. 
                  For now, we stick to default primary color or we can add a custom 'indicatorClassName' if we modify UI component. 
                  The prompt asked for Multi-colored Progress Bar. I will modify Progress component next if needed. 
                  For now, let's just use default to fix lint. */ }
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
