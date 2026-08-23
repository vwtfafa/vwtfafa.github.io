import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { DiscordIcon, GitHubIcon, ModrinthIcon } from "./icons"

const DISCORD_NAME = "vwtfafa"

export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_NAME)
    } catch {
      const el = document.createElement("textarea")
      el.value = DISCORD_NAME
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">{t("contact.title")}</h2>
      <p className="section-subtitle">{t("contact.subtitle")}</p>
      <div className="contact-cards">
        <button
          className="contact-card"
          onClick={copyDiscord}
          title={t("contact.copyHint")}
        >
          <DiscordIcon className="contact-logo" />
          <span className="contact-label">{t("contact.discord")}</span>
          <span className="contact-value">
            {copied ? t("contact.discordCopied") : DISCORD_NAME}
          </span>
        </button>
        <a
          href="https://modrinth.com/user/vwtfafa"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <ModrinthIcon />
          <span className="contact-label">Modrinth</span>
          <span className="contact-value">vwtfafa ↗</span>
        </a>
        <a
          href="https://github.com/vwtfafa"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <GitHubIcon className="contact-logo" />
          <span className="contact-label">GitHub</span>
          <span className="contact-value">vwtfafa ↗</span>
        </a>
      </div>
      <VisitorCounter />
      <footer className="footer">
        <p className="footer-text">
          {t("footer.rights")} · {t("footer.madeWith")}
        </p>
      </footer>
    </section>
  )
}

function VisitorCounter() {
  const { t, lang } = useLanguage()
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(
      "https://abacus.jasoncameron.dev/hit/vwtfafa.github.io/visits",
    )
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && typeof data.value === "number") {
          setVisits(data.value)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  if (visits === null) return null

  return (
    <p className="visitor-counter">
      👀{" "}
      {lang === "de"
        ? `${visits.toLocaleString("de-DE")} Besucher`
        : `${visits.toLocaleString("en-US")} visitors`}
    </p>
  )
}
