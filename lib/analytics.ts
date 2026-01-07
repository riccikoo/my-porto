import { createClient } from "../app/server"

export async function trackPageVisit(pathname: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Only track if user is authenticated
    if (user) {
      await supabase.from("page_visits").insert({
        user_id: user.id,
        page_path: pathname,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        referrer: typeof document !== "undefined" ? document.referrer : null,
      })
    }
  } catch (error) {
    // Silently fail - don't break the app if analytics fails
    console.error("[v0] Analytics tracking failed:", error)
  }
}
