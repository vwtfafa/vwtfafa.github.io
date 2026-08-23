import { useEffect, useState } from "react"
import { projects } from "../data/projects"

const bstatsPlugins = projects.filter((p) => p.bstats)

let cache = null

async function fetchLatest(id) {
  const res = await fetch(
    `https://bstats.org/api/v1/plugins/${id}/charts/servers/data?global=true`,
  )
  if (!res.ok) throw new Error(`servers ${id}`)
  const servers = await res.json()
  const playersRes = await fetch(
    `https://bstats.org/api/v1/plugins/${id}/charts/players/data?global=true`,
  )
  const players = playersRes.ok ? await playersRes.json() : []
  return {
    servers: servers.at(-1)?.[1] ?? null,
    serversRecord: Math.max(...servers.map(([, v]) => v)),
    players: players.at(-1)?.[1] ?? null,
  }
}

export function useBStats() {
  const [data, setData] = useState(cache)

  useEffect(() => {
    if (cache) return
    let cancelled = false
    Promise.all(
      bstatsPlugins.map(async (project) => {
        try {
          return [project.id, await fetchLatest(project.bstats.id)]
        } catch {
          return [project.id, null]
        }
      }),
    ).then((entries) => {
      cache = Object.fromEntries(entries)
      if (!cancelled) setData(cache)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
