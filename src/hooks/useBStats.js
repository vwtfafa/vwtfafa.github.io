import { useEffect, useState } from "react"
import { projects } from "../data/projects"

const bstatsPlugins = projects.filter((p) => p.bstats)

const CACHE_KEY = 'bstatsCache'
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

function getCached() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp < CACHE_TTL) return data
  } catch (e) {}
  return null
}

function setCached(data) {
  const payload = { data, timestamp: Date.now() }
  localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
}

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
  const [data, setData] = useState(getCached())

  useEffect(() => {
    if (data) return // already cached and fresh
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
      const cache = Object.fromEntries(entries)
      setCached(cache)
      if (!cancelled) setData(cache)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
