import { useLanguage } from "../context/LanguageContext"
import { testimonials } from "../data/testimonials"
import Reveal from "./Reveal"

export default function Showcase() {
  const { t, lang } = useLanguage()

  return (
    <section className="showcase" id="showcase" aria-label={t("showcase.title")}>
      <h2 className="section-title">{t("showcase.title")}</h2>
      <p className="section-subtitle">{t("showcase.subtitle")}</p>
      <div className="showcase-grid">
        {testimonials.map((item, i) => (
          <Reveal key={item.id} delay={i * 60}>
            <article className="showcase-card">
              <p className="showcase-quote">“{item.quote[lang]}”</p>
              <p className="showcase-meta">
                <strong>{item.server}</strong>
                <br />
                {item.meta[lang]}
              </p>
              <div className="showcase-foot">
                <span className="showcase-badge">✓ {t("showcase.verified")}</span>
                {item.projectId && (
                  <a className="showcase-link" href={`#projekt/${item.projectId}`}>
                    → {t(`projects.items.${item.projectId}.name`)}
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
        <Reveal delay={testimonials.length * 60}>
          <article className="showcase-card showcase-cta">
            <h3 className="showcase-cta-title">{t("showcase.ctaTitle")}</h3>
            <p className="showcase-cta-text">{t("showcase.ctaText")}</p>
            <a className="project-link link-modrinth" href="#contact">
              {t("showcase.ctaButton")} →
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
