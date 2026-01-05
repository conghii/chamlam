"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThreeWins() {
    const [wins, setWins] = useState(["", "", ""])

    const handleWinChange = (index: number, value: string) => {
        const newWins = [...wins]
        newWins[index] = value
        setWins(newWins)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium text-foreground/80">
                    3 Wins for Today
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {wins.map((win, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className={cn("flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold",
                            win ? "border-green-500 bg-green-500/10 text-green-500" : "border-muted text-muted-foreground"
                        )}>
                            {index + 1}
                        </div>
                        <Input
                            value={win}
                            onChange={(e) => handleWinChange(index, e.target.value)}
                            placeholder={`Win #${index + 1}`}
                            className="flex-1 border-none bg-secondary/50 shadow-none focus-visible:ring-1"
                        />
                        {win && <CheckCircle2 className="h-5 w-5 text-green-500 opacity-50" />}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
