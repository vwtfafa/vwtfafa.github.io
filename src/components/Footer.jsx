import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { DiscordIcon, GitHubIcon, ModrinthIcon } from "./icons"

const DISCORD_NAME = "vwtfafa"
const CONTACT_REPO = "https://github.com/vwtfafa/vwtfafa.github.io/issues/new"
const NAV_IDS = Object.keys(translations.de.nav)

export default function Contact() {
  const { t, lang } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = encodeURIComponent(
      `Website-Kontakt von ${form.name} (${form.email})`,
    )
    const body = encodeURIComponent(
      `Name: ${form.name}\nKontakt: ${form.email}\n\n${form.message}`,
    )
    window.open(`${CONTACT_REPO}?title=${title}&body=${body}`, "_blank", "noopener,noreferrer")
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">{t("contact.title")}</h2>
      <p className="section-subtitle">{t("contact.subtitle")}</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-row">
          <input
            type="text"
            className="contact-input"
            placeholder={t("contact.form.name")}
            value={form.name}
            onChange={update("name")}
            required
          />
          <input
            type="email"
            className="contact-input"
            placeholder={t("contact.form.email")}
            value={form.email}
            onChange={update("email")}
            required
          />
        </div>
        <textarea
          className="contact-textarea"
          placeholder={t("contact.form.message")}
          rows="5"
          value={form.message}
          onChange={update("message")}
          required
        />
        <button className="refresh-btn contact-submit" type="submit">
          {t("contact.form.send")}
        </button>
        {sent && <p className="contact-form-note">{t("contact.form.sent")}</p>}
      </form>
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
      <footer className="footer">
        <nav className="footer-links" aria-label="Footer">
          {NAV_IDS.map((key) => (
            <a key={key} href={`#${key}`} className="footer-link">
              {translations[lang].nav[key]}
            </a>
          ))}
        </nav>
        <p className="footer-text">
          {t("footer.rights")} · {t("footer.madeWith")}
        </p>
        <p className="footer-text" style={{ marginTop: "0.5rem", fontSize: "0.78rem" }}>
          {t("footer.legal")}
        </p>
      </footer>
    </section>
  )
}
