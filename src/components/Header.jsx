import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"

export default function Header() {
  const { lang, toggleLang } = useLanguage()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <a href="#top" className="logo">
        <span className="logo-block"></span>
        vwtfafa
      </a>
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

import { translations } from "../data/translations"

function NavLinks() {
  const { lang } = useLanguage()
  return (
    <>
      {Object.keys(translations[lang].nav).map((key) => (
        <a key={key} href={`#${key}`} className="nav-link">
          {translations[lang].nav[key]}
        </a>
      ))}
    </>
  )
}
