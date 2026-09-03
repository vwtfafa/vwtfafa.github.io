import { useEffect, useState } from "react"

const USERNAME = "vwtfafa"
const TTL = 60 * 60 * 1000
const STORAGE_KEY = "gh-profile-v1"

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

let cache = null
const storage = readStorage()

export function useGithubProfile() {
  const [data, setData] = useState(() => {
    if (!cache && storage && Date.now() - storage.fetchedAt < TTL) {
      cache = storage.data
    }
    return cache ?? storage?.data ?? null
  })

  useEffect(() => {
    if (cache) return
    let cancelled = false

    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
    ])
      .then(async ([userRes, reposRes]) => {
        if (!userRes.ok) throw new Error()
        const user = await userRes.json()
        const repos = reposRes.ok ? await reposRes.json() : []

        const stars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)
        const languageCount = {}
        for (const r of repos) {
          if (r.language) languageCount[r.language] = (languageCount[r.language] ?? 0) + 1
        }
        const topLanguage = Object.entries(languageCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

        const result = {
          publicRepos: user.public_repos ?? repos.length,
          followers: user.followers ?? 0,
          stars,
          topLanguage,
        }
        if (!cancelled) {
          cache = result
          setData(result)
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ fetchedAt: Date.now(), data: result }))
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  return data
}
