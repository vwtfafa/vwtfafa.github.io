import React from "react"
import { useLanguage } from "../context/LanguageContext"
import { projects } from "../data/projects"
import { useBStats } from "../hooks/useBStats"
import { useModrinth } from "../hooks/useModrinth"
import Reveal from "./Reveal"


const metricPlugins = projects.filter((p) => p.bstats)

export const MetricCard = React.memo(function MetricCard({ plugin, live, stats, t }) {

  return (
    <div
      className={`metric-card${plugin.discontinued ? " discontinued" : ""}`}
    >
      <div className="metric-head">
        {live?.map[plugin.modrinthId]?.iconUrl ? (
          <img
            src={live.map[plugin.modrinthId].iconUrl}
            alt={t(`projects.items.${plugin.id}.name`)}
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
      {stats?.[plugin.id] ? (
        <div className="metric-values">
          <div className="metric-value">
            <span className="metric-number">{stats[plugin.id].servers}</span>
            <span className="metric-label">
              {t("metrics.servers")}
            </span>
          </div>
          <div className="metric-value">
            <span className="metric-number">{stats[plugin.id].players}</span>
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
  )
})

export default function Metrics() {
  const { t } = useLanguage()
  const modrinth = useModrinth()
  const stats = useBStats()

  return (
    <section className="metrics" id="metrics">
      <h2 className="section-title">{t("metrics.title")}</h2>
      <p className="section-subtitle">{t("metrics.subtitle")}</p>
      <div className="metrics-grid">
        {metricPlugins.map((plugin, i) => (
          <Reveal key={plugin.id} delay={i * 50}>
            <MetricCard plugin={plugin} live={modrinth} stats={stats} t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
