import { createContext, useContext, useEffect, useState } from "react"
import { translations } from "../data/translations"

const LanguageContext = createContext(null)

function getInitialLang() {
  if (typeof window === "undefined") return "en"
  const stored = localStorage.getItem("lang")
  return stored === "de" ? "de" : "en"
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = (path) => {
    const keys = path.split(".")
    let value = translations[lang]
    for (const key of keys) {
      value = value?.[key]
    }
    return value ?? path
  }

  const toggleLang = () => setLang((l) => (l === "de" ? "en" : "de"))

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
