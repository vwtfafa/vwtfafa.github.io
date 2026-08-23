import { useLanguage } from "../context/LanguageContext"
import Reveal from "./Reveal"

export default function About() {
  const { t } = useLanguage()
  const skills = t("about.skills")

  return (
    <section className="about" id="about">
      <Reveal>
        <h2 className="section-title">{t("about.title")}</h2>
        <p className="section-subtitle about-subtitle">
          {t("about.subtitle")}
        </p>
        <div className="skills-wrap">
          <h3 className="skills-heading">{t("about.skillsTitle")}</h3>
          <div className="skills-grid">
            {skills.map((skill) => (
              <span className="skill-badge" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
