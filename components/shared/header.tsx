"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { ModeToggle } from "@/components/theme-toggle"

export function Header() {
    const [greeting, setGreeting] = useState("Good Morning")

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting("Good Morning")
        else if (hour < 18) setGreeting("Good Afternoon")
        else setGreeting("Good Evening")
    }, [])

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center gap-2">
                <h1 className="text-lg font-semibold">{greeting}, User</h1>
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/01.png" alt="@user" />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">User</p>
                                <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
