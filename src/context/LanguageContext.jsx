import { createContext, useContext, useState } from "react"
import { translations } from "../data/translations"

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("de")

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
