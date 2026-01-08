"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check localStorage or system preference
    const stored = localStorage.getItem("theme")
    if (stored) {
      setIsDark(stored === "dark")
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
    setMounted(true)
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

  const toggleTheme = () => {
    console.log("[v0] Current isDark:", isDark)
    setIsDark((prev) => {
      const newValue = !prev
      console.log("[v0] Setting new isDark:", newValue)
      return newValue
    })
  }

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useThemeToggle() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeToggle must be used within ThemeProvider")
  }
  return context
}
