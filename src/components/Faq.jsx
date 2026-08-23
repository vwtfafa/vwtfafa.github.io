import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import Reveal from "./Reveal"

export default function Faq() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(null)
  const items = t("faq.items")

  return (
    <section className="faq" id="faq">
      <h2 className="section-title">{t("faq.title")}</h2>
      <p className="section-subtitle">{t("faq.subtitle")}</p>
      <div className="faq-list">
        {(Array.isArray(items) ? items : []).map((item, i) => (
          <Reveal key={item.q} delay={i * 50}>
            <div className={`faq-item${open === i ? " faq-open" : ""}`}>
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="faq-chevron">{open === i ? "▾" : "▸"}</span>
                {item.q}
              </button>
              {open === i && <p className="faq-answer">{item.a}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
