import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { roadmap } from "../data/roadmap"
import { projects } from "../data/projects"
import Reveal from "./Reveal"

const STATUS_ORDER = ["inProgress", "planned", "done"]

const STATUS_ICON = {
  planned: "○",
  inProgress: "◐",
  done: "●",
}

function projectName(projectId, t) {
  if (!projectId) return null
  try {
    const name = t(`projects.items.${projectId}.name`)
    return name.startsWith("projects.items.") ? projectId : name
  } catch {
    return projectId
  }
}

export default function Roadmap() {
  const { t, lang } = useLanguage()
  const [statusFilter, setStatusFilter] = useState("all")

  const visible =
    statusFilter === "all"
      ? [...roadmap].sort(
          (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
        )
      : roadmap.filter((item) => item.status === statusFilter)

  return (
    <section className="roadmap" id="roadmap" aria-label={t("roadmap.title")}>
      <h2 className="section-title">{t("roadmap.title")}</h2>
      <p className="section-subtitle">{t("roadmap.subtitle")}</p>
      <div className="project-filters" role="group" aria-label={t("roadmap.title")}>
        <button
          className={`filter-chip${statusFilter === "all" ? " filter-chip-active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          {t("roadmap.filterAll")}
        </button>
        {STATUS_ORDER.map((status) => (
          <button
            key={status}
            className={`filter-chip${statusFilter === status ? " filter-chip-active" : ""}`}
            onClick={() => setStatusFilter(status)}
          >
            {STATUS_ICON[status]} {t(`roadmap.status.${status}`)}
          </button>
        ))}
      </div>
      <div className="roadmap-grid">
        {visible.map((item, i) => {
          const project = item.projectId
            ? projects.find((p) => p.id === item.projectId)
            : null
          return (
            <Reveal key={item.id} delay={i * 60}>
              <article className={`roadmap-card roadmap-${item.status}`}>
                <div className="roadmap-top">
                  <span className="roadmap-status">
                    {STATUS_ICON[item.status]} {t(`roadmap.status.${item.status}`)}
                  </span>
                  {item.target && (
                    <span className="roadmap-target">
                      {t("roadmap.target")}: {item.target}
                    </span>
                  )}
                </div>
                <h3 className="roadmap-title">{item.title[lang]}</h3>
                <p className="roadmap-desc">{item.desc[lang]}</p>
                {project && (
                  <a className="roadmap-project" href={`#projekt/${project.id}`}>
                    {project.icon} {projectName(project.id, t)}
                  </a>
                )}
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
