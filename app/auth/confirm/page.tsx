import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Email Confirmed | My Portfolio",
  description: "Your email has been confirmed successfully",
}

export default function ConfirmPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Email Confirmed!</CardTitle>
            <CardDescription>Your account is ready to use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your email has been confirmed successfully. You can now access your admin dashboard to start building
                your portfolio.
              </p>
              <Link href="/admin" asChild>
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
