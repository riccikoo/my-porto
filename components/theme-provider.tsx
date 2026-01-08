"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext<{ isDark: boolean; setIsDark: (isDark: boolean) => void }>({
  isDark: false,
  setIsDark: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage or system preference
    const stored = localStorage.getItem("theme")
    if (stored) {
      setIsDark(stored === "dark")
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark, mounted])

  return <ThemeContext.Provider value={{ isDark, setIsDark }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

export function useThemeToggle() {
  const { isDark, setIsDark } = useTheme()

  const toggleTheme = () => {
    const newIsDark = !isDark
    console.log("[v0] Toggling theme to:", newIsDark)
    setIsDark(newIsDark)
  }

  return { isDark, toggleTheme }
}
