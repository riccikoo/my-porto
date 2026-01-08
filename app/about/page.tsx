import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About Me | My Portfolio",
  description: "Learn more about me and my background",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-80">
            Portfolio
          </Link>
          {/* <div className="flex gap-4">
            <Link href="/portfolio">
              <Button variant="ghost">Portfolio</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </div> */}
        </div>
      </nav>

      {/* About Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <div className="w-32 h-32 bg-muted rounded-full" />

            <p className="text-lg text-muted-foreground">
              Welcome to my portfolio. This is your space to share your story, background, and professional journey.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Background</h2>
              <p className="text-muted-foreground">
                Edit your profile in the admin dashboard to add your bio, skills, and experience.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Skills & Expertise</h2>
              <p className="text-muted-foreground">
                Add your technical skills and areas of expertise through the admin panel.
              </p>
            </div>

            <div className="pt-8">
              <Link href="/auth/login">
                <Button size="lg">Login to Update Your Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
