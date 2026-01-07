import { createClient } from "@/app/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch user's profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user?.id).single()

  // Fetch user's portfolio items
  const { data: portfolioItems, count } = await supabase
    .from("portfolio_items")
    .select("*", { count: "exact" })
    .eq("user_id", user?.id)
    .order("order_index", { ascending: true })

  const publishedCount = portfolioItems?.filter((item) => item.is_published).length || 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, {profile?.first_name || user?.email}</h1>
        <p className="text-muted-foreground">Manage your portfolio and projects</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{count || 0}</div>
            <p className="text-xs text-muted-foreground mt-2">Portfolio items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{publishedCount}</div>
            <p className="text-xs text-muted-foreground mt-2">Visible to public</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{profile ? "Complete" : "Incomplete"}</div>
            <p className="text-xs text-muted-foreground mt-2">
              <Link href="/admin/profile" className="underline hover:no-underline">
                Update profile
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/admin/profile" asChild>
              <Button className="w-full">Edit Profile</Button>
            </Link>
            <Link href="/admin/projects" asChild>
              <Button className="w-full">Manage Projects</Button>
            </Link>
            <Link href="/admin/analytics" asChild>
              <Button className="w-full">View Analytics</Button>
            </Link>
            <Link href="/" asChild>
              <Button variant="outline" className="w-full bg-transparent">
                View Public Site
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      {portfolioItems && portfolioItems.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your 5 most recent portfolio items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioItems.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Link href={`/admin/projects/${item.id}`} asChild>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Projects Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Start building your portfolio by adding your first project.</p>
            <Link href="/admin/projects" asChild>
              <Button>Add Your First Project</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
