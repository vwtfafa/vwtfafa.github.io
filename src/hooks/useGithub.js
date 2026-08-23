import { useEffect, useState } from "react"
import { projects } from "../data/projects"

const TTL = 60 * 60 * 1000
const STORAGE_KEY = "gh-stats-v1"

const repos = [
  ...new Set(
    projects
      .filter((p) => p.github)
      .map((p) => p.github.replace("https://github.com/", "").replace(/\/$/, "")),
  ),
]

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

let cache = null
let storage = readStorage()

export function useGithub() {
  const [data, setData] = useState(() => {
    if (!cache && storage && Date.now() - storage.fetchedAt < TTL) {
      cache = storage.data
    }
    return cache ?? storage?.data ?? null
  })

  useEffect(() => {
    if (cache) return
    let cancelled = false
    Promise.all(
      repos.map(async (repo) => {
        try {
          const res = await fetch(`https://api.github.com/repos/${repo}`)
          if (!res.ok) throw new Error(repo)
          const meta = await res.json()
          return [
            repo,
            {
              stars: meta.stargazers_count ?? 0,
              pushedAt: meta.pushed_at ?? null,
            },
          ]
        } catch {
          return [repo, null]
        }
      }),
    ).then((entries) => {
      const map = Object.fromEntries(entries)
      if (!cancelled) {
        cache = map
        setData(map)
        if (Object.values(map).some(Boolean)) {
          storage = { fetchedAt: Date.now(), data: map }
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
          } catch {
            /* storage full or unavailable */
          }
        }
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}
