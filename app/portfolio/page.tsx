import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Portfolio | My Work",
  description: "View my portfolio projects and case studies",
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-80">
            Portfolio
          </Link>
          <div className="flex gap-4">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Portfolio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl text-muted-foreground">Check out some of my recent projects and work.</p>
          </div>

          {/* Empty State */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="w-full h-48 bg-muted rounded-lg mb-4" />
                  <CardTitle>Project Title</CardTitle>
                  <CardDescription>Project category</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Project description goes here. This will be populated with your portfolio items.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">
              No projects added yet.
              <Link href="/auth/login" className="font-semibold hover:underline ml-1">
                Login to add projects
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
