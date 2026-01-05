"use client"

import { useState } from "react"
import { PlannerForm } from "@/components/planner/planner-form"
import { PlannerTimeline, Phase } from "@/components/planner/planner-timeline"
import { useRouter } from "next/navigation"

export default function PlannerPage() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [plan, setPlan] = useState<Phase[] | null>(null)
    const router = useRouter()

    const handleGenerate = async (data: any) => {
        setIsGenerating(true)
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Mock Result
        const mockPlan: Phase[] = [
            {
                id: 1,
                title: "Phase 1: Foundation (Weeks 1-2)",
                duration: "2 Weeks",
                tasks: ["Learn JavaScript Basics (ES6+)", "Understand Event Loop", "Build a simple To-Do CLI"]
            },
            {
                id: 2,
                title: "Phase 2: React Fundamentals (Weeks 3-5)",
                duration: "3 Weeks",
                tasks: ["Component Lifecycle", "Hooks (useState, useEffect)", "Context API"]
            },
            {
                id: 3,
                title: "Phase 3: React Native (Weeks 6-8)",
                duration: "3 Weeks",
                tasks: ["Setup Environment (Expo)", "Flexbox Layout", "Navigation", "Build Final App"]
            }
        ]

        setPlan(mockPlan)
        setIsGenerating(false)
    }

    const handleCommit = () => {
        // In real app: Save to Supabase
        alert("Plan saved to your Dashboard!")
        router.push("/dashboard")
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">AI Planner</h2>
            </div>

            {!plan ? (
                <PlannerForm onPlanGenerate={handleGenerate} isGenerating={isGenerating} />
            ) : (
                <PlannerTimeline plan={plan} onCommit={handleCommit} />
            )}
        </div>
    )
}
