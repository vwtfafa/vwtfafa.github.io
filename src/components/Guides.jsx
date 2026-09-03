import { useLanguage } from "../context/LanguageContext"
import Reveal from "./Reveal"

export default function Guides() {
  const { t } = useLanguage()
  const steps = t("guides.steps")

  return (
    <section className="guides" id="guides" aria-label={t("guides.title")}>
      <h2 className="section-title">{t("guides.title")}</h2>
      <p className="section-subtitle">{t("guides.subtitle")}</p>
      <div className="guide-grid">
        {(Array.isArray(steps) ? steps : []).map((step, i) => (
          <Reveal key={step.title} delay={i * 60}>
            <article className="guide-card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {step.code && <code>{step.code}</code>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
