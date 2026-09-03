import React from "react"
import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { projects } from "../data/projects"
import { useModrinth, formatDownloads, timeAgo } from "../hooks/useModrinth"
import { useGithub } from "../hooks/useGithub"
import Reveal from "./Reveal"
import ProjectModal from "./ProjectModal"

function repoSlug(githubUrl) {
  return githubUrl
    .replace("https://github.com/", "")
    .replace(/\/$/, "")
}


export const ProjectCard = React.memo(function ProjectCard({ project, index, modrinth, gh, t, lang, onSelect }) {
  const [openCommands, setOpenCommands] = useState(false)
  const [copiedCmd, setCopiedCmd] = useState(null)
  const live = modrinth?.map[project.modrinthId]
  const downloads = live
    ? formatDownloads(live.downloads)
    : project.downloads

  const commands = t(`projects.items.${project.id}.commands`)
  const ghStats = project.github ? gh?.[repoSlug(project.github)] : null

  const copyCommand = async (e, cmd) => {
    e.stopPropagation()
    const code = cmd.split(" – ")[0].split(" - ")[0].trim()
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const el = document.createElement("textarea")
      el.value = code
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
    setCopiedCmd(cmd)
    setTimeout(() => setCopiedCmd(null), 1500)
  }

  return (
    <Reveal delay={index * 60}>
      <article
        className={`project-card${project.discontinued ? " discontinued" : ""}`}
        onClick={onSelect}
        role="button"
        tabIndex={0}
        aria-label={t(`projects.items.${project.id}.name`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect?.()
          }
        }}
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
              alt={t(`projects.items.${project.id}.name`)}
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
              onClick={(e) => {
                e.stopPropagation()
                setOpenCommands((o) => !o)
              }}
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
                  <li key={cmd} className="cmd-row">
                    <span>{cmd}</span>
                    {cmd.startsWith("/") && (
                      <button
                        className="cmd-copy"
                        onClick={(e) => copyCommand(e, cmd)}
                        aria-label={`Copy ${cmd}`}
                        title="Copy command"
                      >
                        {copiedCmd === cmd ? "✓" : "⧉"}
                      </button>
                    )}
                  </li>
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
            >
              {t("projects.links.github")} ↗
            </a>
          )}
        </div>
      </article>
    </Reveal>
  )
})

export default function Projects() {
  const { t, lang } = useLanguage()
  const modrinth = useModrinth()
  const gh = useGithub()
  const [filter, setFilter] = useState("all")
  const [selected, setSelected] = useState(null)

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
            onSelect={() => setSelected(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selected}
        live={selected ? modrinth?.map[selected.modrinthId] : null}
        ghStats={
          selected?.github ? gh?.[repoSlug(selected.github)] : null
        }
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
