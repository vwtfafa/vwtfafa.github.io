import { useRef, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"
import { useScrollSpy } from "../hooks/useScrollSpy"
import { translations } from "../data/translations"

const NAV_IDS = Object.keys(translations.de.nav)
const LOGO_CLICKS_NEEDED = 5

export default function Header() {
  const { lang, toggleLang } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <Logo />
      <nav className="nav">
        <NavLinks />
        <button
          className="lang-toggle theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === "dark" ? "Light Mode" : "Dark Mode"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button
          className="lang-toggle"
          onClick={toggleLang}
          aria-label="Toggle language"
          title={lang === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
        >
          {lang === "de" ? "🇩🇪 DE" : "🇬🇧 EN"}
        </button>
      </nav>
    </header>
  )
}

function Logo() {
  const [spinning, setSpinning] = useState(false)
  const clicks = useRef(0)
  const resetTimer = useRef(null)

  const handleClick = () => {
    if (spinning) return
    clearTimeout(resetTimer.current)
    clicks.current += 1
    if (clicks.current >= LOGO_CLICKS_NEEDED) {
      clicks.current = 0
      setSpinning(true)
      setTimeout(() => setSpinning(false), 1200)
      return
    }
    resetTimer.current = setTimeout(() => {
      clicks.current = 0
    }, 1500)
  }

  return (
    <a href="#top" className="logo" onClick={handleClick}>
      <span
        className={`logo-block${spinning ? " logo-spin" : ""}`}
        aria-hidden="true"
      />
      vwtfafa
    </a>
  )
}

function NavLinks() {
  const { lang } = useLanguage()
  const activeId = useScrollSpy(NAV_IDS)
  return (
    <>
      {NAV_IDS.map((key) => (
        <a
          key={key}
          href={`#${key}`}
          className={`nav-link${activeId === key ? " nav-link-active" : ""}`}
          aria-current={activeId === key ? "true" : undefined}
        >
          {translations[lang].nav[key]}
        </a>
      ))}
    </>
  )
}
