"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageVisit } from "@/lib/analytics"

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname && pathname.startsWith("/admin")) {
      trackPageVisit(pathname)
    }
  }, [pathname])

  return null
}
