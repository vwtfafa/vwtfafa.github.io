import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"

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
          <span className="contact-icon">💬</span>
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
          <span className="contact-icon">📦</span>
          <span className="contact-label">Modrinth</span>
          <span className="contact-value">vwtfafa ↗</span>
        </a>
        <a
          href="https://github.com/vwtfafa"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card"
        >
          <span className="contact-icon">🐙</span>
          <span className="contact-label">GitHub</span>
          <span className="contact-value">vwtfafa ↗</span>
        </a>
      </div>
      <footer className="footer">
        <p className="footer-text">
          {t("footer.rights")} · {t("footer.madeWith")}
        </p>
      </footer>
    </section>
  )
}
