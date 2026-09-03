import { useLanguage } from "../context/LanguageContext"
import Reveal from "./Reveal"

export default function Showcase() {
  const { t } = useLanguage()
  const items = t("showcase.items")

  return (
    <section className="showcase" id="showcase" aria-label={t("showcase.title")}>
      <h2 className="section-title">{t("showcase.title")}</h2>
      <p className="section-subtitle">{t("showcase.subtitle")}</p>
      <div className="showcase-grid">
        {(Array.isArray(items) ? items : []).map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <article className="showcase-card">
              <p className="showcase-quote">“{item.text}”</p>
              <p className="showcase-meta">
                <strong>{item.title}</strong>
                <br />
                {item.meta}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
