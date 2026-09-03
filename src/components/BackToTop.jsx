import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"

const SHOW_AFTER = 400

export default function BackToTop() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight
        const pct =
          scrollHeight > 0
            ? Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100))
            : 0
        setProgress(pct)
        setVisible(window.scrollY > SHOW_AFTER)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const scrollTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <div
          className="scroll-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        className={`back-to-top${visible ? " back-to-top-visible" : ""}`}
        onClick={scrollTop}
        aria-label={t("backToTop.label")}
        title={t("backToTop.label")}
        tabIndex={visible ? 0 : -1}
      >
        ↑
      </button>
    </>
  )
}
