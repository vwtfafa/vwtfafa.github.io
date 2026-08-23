import { useLanguage } from "../context/LanguageContext"
import { useModrinth, formatDownloads } from "../hooks/useModrinth"

export default function Stats() {
  const { t } = useLanguage()
  const modrinth = useModrinth()

  const stats = [
    {
      value: modrinth ? `${Object.keys(modrinth.map).length}` : "5+",
      label: t("stats.projects"),
    },
    {
      value: modrinth
        ? `${formatDownloads(modrinth.totalDownloads)}+`
        : "13.9K+",
      label: t("stats.downloads"),
    },
    { value: "3", label: t("stats.years") },
  ]

  return (
    <section className="stats">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </section>
  )
}
