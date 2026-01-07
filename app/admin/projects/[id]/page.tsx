"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProject() {
      const supabase = createClient()
      const { data } = await supabase.from("portfolio_items").select("*").eq("id", projectId).single()
      setProject(data)
      setIsLoading(false)
    }
    loadProject()
  }, [projectId])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: dbError } = await supabase
        .from("portfolio_items")
        .update({
          title: project.title,
          description: project.description,
          image_url: project.image_url,
          project_url: project.project_url || null,
          github_url: project.github_url || null,
          technologies: project.technologies || [],
          is_published: project.is_published,
          updated_at: new Date().toISOString(),
        })
        .eq("id", projectId)

      if (dbError) throw dbError
      router.push("/admin/projects")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to save project")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
          <CardDescription>Update your project details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={project?.title || ""}
                  onChange={(e) => setProject({ ...project, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={project?.description || ""}
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  value={project?.image_url || ""}
                  onChange={(e) => setProject({ ...project, image_url: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-url">Project URL</Label>
                  <Input
                    id="project-url"
                    value={project?.project_url || ""}
                    onChange={(e) => setProject({ ...project, project_url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github-url">GitHub URL</Label>
                  <Input
                    id="github-url"
                    value={project?.github_url || ""}
                    onChange={(e) => setProject({ ...project, github_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={Array.isArray(project?.technologies) ? project.technologies.join(", ") : ""}
                  onChange={(e) =>
                    setProject({ ...project, technologies: e.target.value.split(",").map((t) => t.trim()) })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={project?.is_published || false}
                  onCheckedChange={(checked) => setProject({ ...project, is_published: checked === true })}
                />
                <Label htmlFor="published" className="font-normal cursor-pointer">
                  Publish this project
                </Label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Project"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
