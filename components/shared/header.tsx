"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import { ModeToggle } from "@/components/theme-toggle"

import { auth, logOut } from "@/lib/firebase/auth"
import { subscribeToUserProfile } from "@/lib/firebase/firestore"

export function Header() {
    const [greeting, setGreeting] = useState("Good Morning")
    const [user, setUser] = useState(auth.currentUser)
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting("Good Morning")
        else if (hour < 18) setGreeting("Good Afternoon")
        else setGreeting("Good Evening")

        const unsubAuth = auth.onAuthStateChanged((u) => {
            setUser(u)
            if (u) {
                const unsubProfile = subscribeToUserProfile(u.uid, (data) => {
                    setUserData(data)
                })
                return () => unsubProfile()
            } else {
                setUserData(null)
            }
        })

        return () => unsubAuth()
    }, [])

    const handleLogout = async () => {
        try {
            await logOut()
            window.location.href = "/login"
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    const displayName = userData?.displayName || user?.displayName || "User"
    const displayEmail = user?.email || ""
    const photoURL = userData?.photoURL || user?.photoURL || "/avatars/01.png"
    const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || "U"

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
            <div className="flex flex-1 items-center gap-2">
                <h1 className="text-lg font-semibold">{greeting}, {displayName}</h1>
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src={photoURL} alt={displayName} />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{displayName}</p>
                                <p className="text-xs leading-none text-muted-foreground">{displayEmail}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/dashboard/profile">
                            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-rose-600 focus:text-rose-600 cursor-pointer">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
