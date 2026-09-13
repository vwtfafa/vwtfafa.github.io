import React from "react"
import { useEffect, useMemo, useState } from "react"
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

function parseFallbackDownloads(value) {
  if (value == null) return 0
  const match = String(value).trim().match(/^([\d.,]+)\s*K?$/i)
  if (!match) return 0
  const num = parseFloat(match[1].replace(",", "."))
  if (Number.isNaN(num)) return 0
  return String(value).toUpperCase().includes("K") ? Math.round(num * 1000) : Math.round(num)
}

function updatedTimestamp(project, live, ghStats) {
  const candidates = [live?.latestDate, ghStats?.pushedAt]
    .map((d) => (d ? new Date(d).getTime() : NaN))
    .filter((n) => !Number.isNaN(n))
  return candidates.length > 0 ? Math.max(...candidates) : 0
}

function getHashProjectId() {
  if (typeof window === "undefined") return null
  const match = window.location.hash.match(/^#projekt\/([\w-]+)/)
  return match ? match[1] : null
}

export function CompatBadges({ compat, compact = false }) {
  if (!compat) return null
  const mc = Array.isArray(compat.mc) && compat.mc.length > 0
    ? compat.mc.join(" · ")
    : null
  return (
    <div className={`project-compat${compact ? " project-compat-compact" : ""}`}>
      {mc && <span className="compat-badge">⛏ {mc}</span>}
      {compat.java && <span className="compat-badge">☕ Java {compat.java}</span>}
      {!compact && Array.isArray(compat.loaders) && compat.loaders.length > 0 && (
        <span className="compat-badge">🔌 {compat.loaders.join(" · ")}</span>
      )}
    </div>
  )
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
        id={`projekt-${project.id}`}
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
          {live?.iconUrl || project.iconSrc ? (
            <img
              src={live?.iconUrl || project.iconSrc}
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
        <CompatBadges compat={project.compat} compact />
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
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("updated")
  const [selectedId, setSelectedId] = useState(getHashProjectId)

  useEffect(() => {
    const onHashChange = () => setSelectedId(getHashProjectId())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const selectProject = (project) => {
    setSelectedId(project.id)
    window.history.replaceState(null, "", `#projekt/${project.id}`)
  }

  const closeModal = () => {
    setSelectedId(null)
    if (getHashProjectId()) {
      window.history.replaceState(null, "", "#projects")
    }
  }

  const selected = projects.find((p) => p.id === selectedId) ?? null

  const allTags = [...new Set(projects.flatMap((p) => p.tags))]

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = projects.filter((p) => {
      if (filter !== "all" && !p.tags.includes(filter)) return false
      if (!q) return true
      const name = String(t(`projects.items.${p.id}.name`) ?? "").toLowerCase()
      const desc = String(t(`projects.items.${p.id}.desc`) ?? "").toLowerCase()
      const commands = t(`projects.items.${p.id}.commands`)
      const cmdText = Array.isArray(commands) ? commands.join(" ").toLowerCase() : ""
      const haystack = `${p.id} ${name} ${desc} ${cmdText} ${p.tags.join(" ").toLowerCase()}`
      return q.split(/\s+/).every((token) => haystack.includes(token))
    })
    const withStats = filtered.map((p) => {
      const live = modrinth?.map[p.modrinthId]
      const ghStats = p.github ? gh?.[repoSlug(p.github)] : null
      return {
        project: p,
        downloads: live?.downloads ?? parseFallbackDownloads(p.downloads),
        updated: updatedTimestamp(p, live, ghStats),
        name: String(t(`projects.items.${p.id}.name`) ?? p.id),
      }
    })
    withStats.sort((a, b) => {
      if (sort === "downloads") return b.downloads - a.downloads
      if (sort === "name") return a.name.localeCompare(b.name, lang === "de" ? "de" : "en")
      return b.updated - a.updated
    })
    return withStats.map((entry) => entry.project)
  }, [filter, query, sort, modrinth, gh, t, lang])

  const resetSearch = () => {
    setQuery("")
    setFilter("all")
  }

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">{t("projects.title")}</h2>
      <p className="section-subtitle">{t("projects.subtitle")}</p>
      <div className="projects-toolbar" role="search">
        <input
          type="search"
          className="projects-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("projects.searchPlaceholder")}
          aria-label={t("projects.searchPlaceholder")}
        />
        <label className="projects-sort">
          <span className="projects-sort-label">{t("projects.sortLabel")}</span>
          <select
            className="projects-sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label={t("projects.sortLabel")}
          >
            <option value="updated">{t("projects.sortUpdated")}</option>
            <option value="downloads">{t("projects.sortDownloads")}</option>
            <option value="name">{t("projects.sortName")}</option>
          </select>
        </label>
      </div>
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
      <p className="projects-count" aria-live="polite">
        {visible.length} {t("projects.results")}
      </p>
      {visible.length === 0 ? (
        <div className="projects-empty">
          <p>{t("projects.noResults")}</p>
          <button className="filter-chip" onClick={resetSearch}>
            {t("projects.noResultsHint")}
          </button>
        </div>
      ) : (
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
              onSelect={() => selectProject(project)}
            />
          ))}
        </div>
      )}

      <ProjectModal
        key={selected?.id ?? "none"}
        project={selected}
        live={selected ? modrinth?.map[selected.modrinthId] : null}
        ghStats={
          selected?.github ? gh?.[repoSlug(selected.github)] : null
        }
        onClose={closeModal}
      />
    </section>
  )
}
