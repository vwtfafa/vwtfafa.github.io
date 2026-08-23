import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { projects } from "../data/projects"
import { useModrinth, formatDownloads } from "../hooks/useModrinth"
import Reveal from "./Reveal"

function ProjectCard({ project, index, modrinth, t }) {
  const [openCommands, setOpenCommands] = useState(false)
  const live = modrinth?.map[project.modrinthId]
  const downloads = live
    ? formatDownloads(live.downloads)
    : project.downloads

  const commands = t(`projects.items.${project.id}.commands`)

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
  const { t } = useLanguage()
  const modrinth = useModrinth()

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">{t("projects.title")}</h2>
      <p className="section-subtitle">{t("projects.subtitle")}</p>
      <div className="project-grid">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            modrinth={modrinth}
            t={t}
          />
        ))}
      </div>
    </section>
  )
}
