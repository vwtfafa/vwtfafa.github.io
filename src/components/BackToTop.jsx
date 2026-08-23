import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"

const SHOW_AFTER = 400

export default function BackToTop() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        setVisible(window.scrollY > SHOW_AFTER)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <button
      className={`back-to-top${visible ? " back-to-top-visible" : ""}`}
      onClick={scrollTop}
      aria-label={t("backToTop.label")}
      title={t("backToTop.label")}
      tabIndex={visible ? 0 : -1}
    >
      ↑
    </button>
  )
}
