import { useLanguage } from "../context/LanguageContext"
import { projects } from "../data/projects"
import { useBStats } from "../hooks/useBStats"
import { useModrinth } from "../hooks/useModrinth"
import Reveal from "./Reveal"

export default function Metrics() {
  const { t } = useLanguage()
  const stats = useBStats()
  const modrinth = useModrinth()
  const plugins = projects.filter((p) => p.bstats)

  return (
    <section className="metrics" id="metrics">
      <h2 className="section-title">{t("metrics.title")}</h2>
      <p className="section-subtitle">{t("metrics.subtitle")}</p>
      <div className="metrics-grid">
        {plugins.map((plugin, i) => {
          const s = stats?.[plugin.id]
          const live = modrinth?.map[plugin.modrinthId]
          return (
            <Reveal key={plugin.id} delay={i * 60}>
              <div
                className={`metric-card${plugin.discontinued ? " discontinued" : ""}`}
              >
                <div className="metric-head">
                  {live?.iconUrl ? (
                    <img
                      src={live.iconUrl}
                      alt=""
                      className="project-icon-img"
                      loading="lazy"
                    />
                  ) : (
                    <span className="project-icon">{plugin.icon}</span>
                  )}
                  <h3 className="metric-name">
                    {t(`projects.items.${plugin.id}.name`)}
                  </h3>
                </div>
                {s ? (
                  <div className="metric-values">
                    <div className="metric-value">
                      <span className="metric-number">{s.servers}</span>
                      <span className="metric-label">
                        {t("metrics.servers")}
                      </span>
                    </div>
                    <div className="metric-value">
                      <span className="metric-number">{s.players}</span>
                      <span className="metric-label">
                        {t("metrics.players")}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="metric-loading">…</div>
                )}
                <a
                  href={plugin.bstats.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="metric-link"
                >
                  {t("metrics.poweredBy")} ↗
                </a>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
