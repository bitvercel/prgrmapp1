"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/projects"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/projects"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Projects
      </Link>
      <Link
        href="/reports"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/reports"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        <FileText className="mr-2 h-4 w-4" />
        Reports
      </Link>
    </nav>
  )
}