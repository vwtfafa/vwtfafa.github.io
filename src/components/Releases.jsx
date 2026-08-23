import { useLanguage } from "../context/LanguageContext"
import { projects } from "../data/projects"
import { useModrinth, timeAgo } from "../hooks/useModrinth"
import Reveal from "./Reveal"

export default function Releases() {
  const { t, lang } = useLanguage()
  const modrinth = useModrinth()

  const releases = projects
    .filter((p) => p.modrinthId && modrinth?.map[p.modrinthId]?.latestVersion)
    .map((p) => ({
      id: p.id,
      name: t(`projects.items.${p.id}.name`),
      icon: modrinth.map[p.modrinthId].iconUrl,
      version: modrinth.map[p.modrinthId].latestVersion,
      date: modrinth.map[p.modrinthId].latestDate,
      url: p.modrinth,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)

  return (
    <section className="releases" id="releases">
      <h2 className="section-title">{t("releases.title")}</h2>
      <p className="section-subtitle">{t("releases.subtitle")}</p>
      <div className="release-list">
        {releases.map((release, i) => (
          <Reveal key={`${release.id}-${release.version}`} delay={i * 50}>
            <a
              href={release.url}
              target="_blank"
              rel="noopener noreferrer"
              className="release-item"
            >
              {release.icon ? (
                <img
                  src={release.icon}
                  alt=""
                  className="release-icon"
                  loading="lazy"
                />
              ) : (
                <span className="release-icon release-icon-fallback">📦</span>
              )}
              <div className="release-info">
                <span className="release-name">{release.name}</span>
                <span className="release-version">
                  v{release.version} · {timeAgo(release.date, lang)}
                </span>
              </div>
              <span className="release-arrow">↗</span>
            </a>
          </Reveal>
        ))}
        {!modrinth && (
          <div className="metric-loading">…</div>
        )}
      </div>
    </section>
  )
}
