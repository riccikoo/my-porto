export async function trackPageVisit(pathname: string) {
  try {
    await fetch('/api/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pathname }),
    })
  } catch (error) {
    console.error('Analytics tracking failed:', error)
  }
}
