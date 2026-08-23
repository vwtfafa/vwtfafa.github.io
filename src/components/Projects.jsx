import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { projects } from "../data/projects"
import { useModrinth, formatDownloads, timeAgo } from "../hooks/useModrinth"
import { useGithub } from "../hooks/useGithub"
import Reveal from "./Reveal"

function repoSlug(githubUrl) {
  return githubUrl
    .replace("https://github.com/", "")
    .replace(/\/$/, "")
}

function ProjectCard({ project, index, modrinth, gh, t, lang }) {
  const [openCommands, setOpenCommands] = useState(false)
  const live = modrinth?.map[project.modrinthId]
  const downloads = live
    ? formatDownloads(live.downloads)
    : project.downloads

  const commands = t(`projects.items.${project.id}.commands`)
  const ghStats = project.github ? gh?.[repoSlug(project.github)] : null

  return (
    <Reveal delay={index * 60}>
      <article
        className={`project-card${project.discontinued ? " discontinued" : ""}`}
      >
        {project.discontinued && (
          <span className="discontinued-badge">
            ✕ {t("projects.discontinued")}
          </span>
        )}
        {project.isNew && (
          <span className="new-badge">★ {t("projects.new")}</span>
        )}
        <div className="project-head">
          {live?.iconUrl ? (
            <img
              src={live.iconUrl}
              alt=""
              className="project-icon-img"
              loading="lazy"
            />
          ) : (
            <span className="project-icon">{project.icon}</span>
          )}
          <div>
            <h3 className="project-name">
              {t(`projects.items.${project.id}.name`)}
            </h3>
            {downloads && (
              <span className="project-downloads">⬇ {downloads}</span>
            )}
          </div>
        </div>
        <p className="project-desc">{t(`projects.items.${project.id}.desc`)}</p>
        {Array.isArray(commands) && commands.length > 0 && (
          <div className="commands-wrap">
            <button
              className="commands-toggle"
              onClick={() => setOpenCommands((o) => !o)}
              aria-expanded={openCommands}
            >
              <span className="commands-chevron">
                {openCommands ? "▾" : "▸"}
              </span>
              ⌨ {t("projects.commandsToggle")}
            </button>
            {openCommands && (
              <ul className="commands-list">
                {commands.map((cmd) => (
                  <li key={cmd}>{cmd}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {ghStats && (
          <p className="project-meta">
            ⭐ {ghStats.stars}
            {ghStats.pushedAt && (
              <>
                {" · "}
                {timeAgo(ghStats.pushedAt, lang)}
              </>
            )}
          </p>
        )}
        <div className="project-links">
          {project.modrinth && (
            <a
              href={project.modrinth}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link link-modrinth"
            >
              {t("projects.links.modrinth")} ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link link-github"
            >
              {t("projects.links.github")} ↗
            </a>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  const { t, lang } = useLanguage()
  const modrinth = useModrinth()
  const gh = useGithub()
  const [filter, setFilter] = useState("all")

  const allTags = [...new Set(projects.flatMap((p) => p.tags))]
  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(filter))

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">{t("projects.title")}</h2>
      <p className="section-subtitle">{t("projects.subtitle")}</p>
      <div className="project-filters" role="group" aria-label={t("projects.title")}>
        <button
          className={`filter-chip${filter === "all" ? " filter-chip-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          {t("projects.filterAll")}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`filter-chip${filter === tag ? " filter-chip-active" : ""}`}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            modrinth={modrinth}
            gh={gh}
            t={t}
            lang={lang}
          />
        ))}
      </div>
    </section>
  )
}
