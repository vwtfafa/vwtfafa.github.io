import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

function getInitialTheme() {
  if (typeof window === "undefined") return "dark"
  const stored = localStorage.getItem("theme")
  return stored === "light" ? "light" : "dark"
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
