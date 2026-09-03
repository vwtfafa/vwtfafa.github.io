import { useLanguage } from "../context/LanguageContext"
import { useGithubProfile } from "../hooks/useGithubProfile"
import Reveal from "./Reveal"

export default function About() {
  const { t } = useLanguage()
  const profile = useGithubProfile()
  const skills = t("about.skills")
  const timeline = t("about.timeline")

  const ghStats = [
    { value: profile?.publicRepos ?? "–", label: "Repos" },
    { value: profile?.stars ?? "–", label: t("about.stars") },
    { value: profile?.topLanguage ?? "–", label: t("about.language") },
  ]

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
        <div className="about-gh">
          {ghStats.map((stat) => (
            <div className="about-gh-stat" key={stat.label}>
              <span className="about-gh-value">{stat.value}</span>
              <span className="about-gh-label">{stat.label}</span>
            </div>
          ))}
        </div>
        {Array.isArray(timeline) && timeline.length > 0 && (
          <>
            <h3 className="skills-heading" style={{ marginTop: "2.5rem" }}>
              {t("about.timelineTitle")}
            </h3>
            <ol className="timeline">
              {timeline.map((entry) => (
                <li key={entry.year}>
                  <span className="timeline-year">{entry.year}</span>
                  <p className="timeline-text">{entry.text}</p>
                </li>
              ))}
            </ol>
          </>
        )}
      </Reveal>
    </section>
  )
}
