import { useLanguage } from "../context/LanguageContext"
import Reveal from "./Reveal"

export default function Support() {
  const { t } = useLanguage()
  const items = t("support.items")

  return (
    <section className="support" id="support" aria-label={t("support.title")}>
      <h2 className="section-title">{t("support.title")}</h2>
      <p className="section-subtitle">{t("support.subtitle")}</p>
      <div className="support-cards">
        {(Array.isArray(items) ? items : []).map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="support-card"
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
