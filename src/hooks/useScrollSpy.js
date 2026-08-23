import { useEffect, useState } from "react"

export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const probe = window.scrollY + window.innerHeight * 0.35
      let current = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = el.id
        }
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
