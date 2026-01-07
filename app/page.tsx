"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">Welcome to Your Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Showcase your best work with a modern, professional portfolio built with Next.js and Supabase.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold mb-12 text-center">Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Modern Design</CardTitle>
              <CardDescription>Built with Next.js and Tailwind CSS</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A responsive, beautiful design that looks great on all devices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Manage your portfolio content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Easy-to-use CMS to update projects and portfolio items.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Track visitor engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor visitor stats and engagement metrics in real-time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
