"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { ProofOfWorkDialog } from "@/components/dashboard/proof-of-work-dialog"

const tasks = [
    { id: 1, title: "Refactor Auth Logic", tag: "coding", completed: false },
    { id: 2, title: "Read Chapter 4 of Clean Code", tag: "learning", completed: false },
    { id: 3, title: "Write Blog Post: Next.js Patterns", tag: "writing", completed: true },
]

const tagColors: Record<string, string> = {
    coding: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    learning: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    writing: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
    general: "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20",
}

export function TaskList() {
    const [localTasks, setLocalTasks] = useState(tasks)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<(typeof tasks)[0] | null>(null)

    const handleCheck = (taskId: number, checked: boolean) => {
        const task = localTasks.find(t => t.id === taskId)
        if (!task) return

        if (checked && (task.tag === 'learning' || task.tag === 'reading')) {
            // Trigger Proof of Work
            setSelectedTask(task)
            setDialogOpen(true)
            // Don't toggle yet
        } else {
            // Toggle immediately
            setLocalTasks(localTasks.map(t => t.id === taskId ? { ...t, completed: checked } : t))
        }
    }

    const handleProofComplete = (note: string) => {
        console.log("Proof of work saved:", note)
        if (selectedTask) {
            setLocalTasks(localTasks.map(t => t.id === selectedTask.id ? { ...t, completed: true } : t))
        }
    }

    return (
        <>
            <Card className="col-span-1 md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Today&apos;s Tasks</CardTitle>
                    <Button size="sm" variant="outline">View All</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {localTasks.map((task) => (
                        <div key={task.id} className="group flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-secondary/50">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onCheckedChange={(checked) => handleCheck(task.id, checked as boolean)}
                                />
                                <div className="space-y-1">
                                    <label
                                        htmlFor={`task-${task.id}`}
                                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? "text-muted-foreground line-through opacity-50" : ""}`}
                                    >
                                        {task.title}
                                    </label>
                                    <div className="flex gap-2">
                                        <Badge variant="secondary" className={tagColors[task.tag]}>
                                            {task.tag}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            {!task.completed && (
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 hover:bg-primary/10 hover:text-primary">
                                    <Play className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            <ProofOfWorkDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                taskTitle={selectedTask?.title || ""}
                onComplete={handleProofComplete}
            />
        </>
    )
}
