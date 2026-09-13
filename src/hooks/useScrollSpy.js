import { useEffect, useState } from "react"

export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const probe = window.scrollY + window.innerHeight * 0.35
      const found = []
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        found.push({ id: el.id, top: el.getBoundingClientRect().top + window.scrollY })
      }
      found.sort((a, b) => a.top - b.top)
      let current = null
      for (const entry of found) {
        if (entry.top <= probe) current = entry.id
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [ids])

  return activeId
}
