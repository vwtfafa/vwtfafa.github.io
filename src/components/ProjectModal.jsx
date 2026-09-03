import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"

export default function ProjectModal({
  project,
  live,
  ghStats,
  onClose,
}) {
  const { t, lang } = useLanguage()
  const [copiedCmd, setCopiedCmd] = useState(null)

  useEffect(() => {
    if (!project) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [project, onClose])

  if (!project) return null

  const commands = t(`projects.items.${project.id}.commands`)
  const name = t(`projects.items.${project.id}.name`)
  const desc = t(`projects.items.${project.id}.desc`)
  const gallery = live?.gallery ?? []

  const copyCommand = async (cmd) => {
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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-head">
          {(live?.iconUrl || gallery[0]?.url) && (
            <img
              src={live?.iconUrl || gallery[0].url}
              alt={name}
              className="modal-icon"
              loading="lazy"
            />
          )}
          <div className="modal-head-info">
            <h3 className="modal-title">{name}</h3>
            <div className="modal-tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="modal-desc">{desc}</p>

        <div className="modal-stats">
          {live?.downloads != null && (
            <span className="modal-stat">⬇ {live.downloads.toLocaleString(lang === "de" ? "de-DE" : "en-US")}</span>
          )}
          {live?.latestVersion && (
            <span className="modal-stat">v{live.latestVersion}</span>
          )}
          {ghStats && (
            <span className="modal-stat">⭐ {ghStats.stars}</span>
          )}
        </div>

        {Array.isArray(commands) && commands.length > 0 && (
          <div className="modal-section">
            <h4 className="modal-section-title">
              ⌨ {t("projects.commandsToggle")}
            </h4>
            <ul className="commands-list">
              {commands.map((cmd) => (
                <li key={cmd} className="cmd-row">
                  <span>{cmd}</span>
                  {cmd.startsWith("/") && (
                    <button
                      className="cmd-copy"
                      onClick={() => copyCommand(cmd)}
                      aria-label={`Copy ${cmd}`}
                      title="Copy command"
                    >
                      {copiedCmd === cmd ? "✓" : "⧉"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {live?.changelog && (
          <div className="modal-section">
            <h4 className="modal-section-title">
              {lang === "de"
                ? "Neuestes Release"
                : "Latest release"}
            </h4>
            <div
              className="modal-changelog"
              dangerouslySetInnerHTML={{ __html: live.changelog }}
            />
          </div>
        )}

        {gallery.length > 0 && (
          <div className="modal-section">
            <h4 className="modal-section-title">
              {lang === "de" ? "Screenshots" : "Screenshots"}
            </h4>
            <div className="modal-gallery">
              {gallery.map((img) => (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.title || name}
                  className="modal-gallery-img"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}

        <div className="modal-links">
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
      </div>
    </div>
  )
}
