"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Get total visits
        const { count: totalVisits } = await supabase
          .from("page_visits")
          .select("*", { count: "exact" })
          .eq("user_id", user.id)

        // Get visits by page
        const { data: pageData } = await supabase
          .from("page_visits")
          .select("page_path")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(100)

        const pageStats: Record<string, number> = {}
        pageData?.forEach((visit) => {
          pageStats[visit.page_path] = (pageStats[visit.page_path] || 0) + 1
        })

        setStats({
          totalVisits: totalVisits || 0,
          pageStats,
          topPages: Object.entries(pageStats)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 5),
        })
      }
      setIsLoading(false)
    }
    loadAnalytics()
  }, [])

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your portfolio visitors and engagement</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats?.totalVisits || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">Page views across your portfolio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Unique Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{Object.keys(stats?.pageStats || {}).length}</div>
            <p className="text-xs text-muted-foreground mt-2">Pages visited</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Your most visited pages</CardDescription>
        </CardHeader>
        <CardContent>
          {stats?.topPages?.length ? (
            <div className="space-y-4">
              {stats.topPages.map(([page, count]: [string, number]) => (
                <div key={page} className="flex items-center justify-between p-3 border border-border rounded">
                  <span className="font-medium">{page || "/"}</span>
                  <span className="text-muted-foreground">{count} visits</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-6">
              No visits yet. Share your portfolio to get started!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
