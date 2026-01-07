// Script to create admin account for the portfolio
// Usage: node scripts/create-admin.js <email> <password>

import { createClient } from "@supabase/supabase-js"
import * as readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer)
    })
  })
}

async function createAdmin() {
  console.log("\n📝 Create Admin Account for Portfolio\n")

  const email = await question("Enter admin email: ")
  const password = await question("Enter admin password: ")
  const confirmPassword = await question("Confirm password: ")

  if (password !== confirmPassword) {
    console.error("\n❌ Passwords do not match")
    rl.close()
    return
  }

  if (!email || !password) {
    console.error("\n❌ Email and password are required")
    rl.close()
    return
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("\n❌ Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY\n")
    rl.close()
    return
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log("\n⏳ Creating admin account...\n")

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    })

    if (error) {
      console.error(`\n❌ Error creating admin account: ${error.message}\n`)
      rl.close()
      return
    }

    console.log("\n✅ Admin account created successfully!\n")
    console.log(`📧 Email: ${email}`)
    console.log(`🔑 Password: ${password}\n`)
    console.log("You can now log in at: /auth/login\n")
  } catch (err) {
    console.error(`\n❌ Error: ${err instanceof Error ? err.message : String(err)}\n`)
  } finally {
    rl.close()
  }
}

createAdmin()
