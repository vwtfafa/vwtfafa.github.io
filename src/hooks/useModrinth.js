import { useEffect, useState } from "react"
import { projects } from "../data/projects"

const modrinthProjects = projects.filter((p) => p.modrinthId)

let cache = null

export function useModrinth() {
  const [data, setData] = useState(cache)

  useEffect(() => {
    if (cache) return
    let cancelled = false
    Promise.all(
      modrinthProjects.map(async (project) => {
        try {
          const res = await fetch(
            `https://api.modrinth.com/v2/project/${project.modrinthId}`,
          )
          if (!res.ok) throw new Error(project.modrinthId)
          const meta = await res.json()
          const versionsRes = await fetch(
            `https://api.modrinth.com/v2/project/${project.modrinthId}/version`,
          )
          const versions = versionsRes.ok ? await versionsRes.json() : []
          return [
            project.modrinthId,
            {
              downloads: meta.downloads ?? 0,
              iconUrl: meta.icon_url,
              latestVersion: versions[0]?.version_number ?? null,
              latestDate: versions[0]?.date_published ?? null,
            },
          ]
        } catch {
          return [project.modrinthId, null]
        }
      }),
    ).then(async (entries) => {
      let totalDownloads = 0
      for (const [, value] of entries) {
        totalDownloads += value?.downloads ?? 0
      }
      cache = { map: Object.fromEntries(entries), totalDownloads }
      if (!cancelled) setData(cache)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}

export function formatDownloads(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`
  return String(n)
}

export function timeAgo(dateString, lang) {
  const diff = Date.now() - new Date(dateString).getTime()
  const days = Math.floor(diff / 86400000)
  if (lang === "de") {
    if (days === 0) return "heute"
    if (days === 1) return "gestern"
    if (days < 30) return `vor ${days} Tagen`
    const months = Math.floor(days / 30)
    return months === 1 ? "vor 1 Monat" : `vor ${months} Monaten`
  }
  if (days === 0) return "today"
  if (days === 1) return "yesterday"
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? "1 month ago" : `${months} months ago`
}
