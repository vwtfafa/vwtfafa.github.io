import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

export default function EasterEggs() {
  const { t, lang } = useLanguage()
  const [creeper, setCreeper] = useState(false)

  useEffect(() => {
    let progress = []

    const triggerCreeper = () => {
      setCreeper(true)
      setTimeout(() => setCreeper(false), 1800)
    }

    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === KONAMI[progress.length]) {
        progress.push(key)
        if (progress.length === KONAMI.length) {
          progress = []
          triggerCreeper()
        }
      } else {
        progress = key === KONAMI[0] ? [key] : []
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    console.log(
      "%c⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬛⬜⬛⬛⬜⬛⬛\n⬛⬛⬛⬜⬜⬛⬛⬛\n⬛⬛⬛⬜⬜⬛⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛\nPsst… hier schlummern Easter Eggs. 🧨\nTipp: ↑ ↑ ↓ ↓ ← → ← → B A",
      "color: #4ade5b; font-family: monospace; font-size: 12px",
    )
  }, [])

  useEffect(() => {
    const originalTitle = document.title
    const onVisibility = () => {
      document.title = document.hidden
        ? lang === "de"
          ? "👋 Komm zurück!"
          : "👋 Come back!"
        : originalTitle
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      document.removeEventListener("visibilitychange", onVisibility)
      document.title = originalTitle
    }
  }, [lang])

  if (!creeper) return null

  return (
    <div className="egg-overlay" aria-hidden="true">
      <div className="egg-flash" />
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="egg-boom"
          style={{
            left: `${8 + ((i * 37) % 84)}%`,
            top: `${10 + ((i * 53) % 70)}%`,
            animationDelay: `${(i % 8) * 60}ms`,
            fontSize: `${1 + (i % 4) * 0.6}rem`,
          }}
        >
          💥
        </span>
      ))}
      <div className="egg-toast">{t("eggs.creeper")}</div>
    </div>
  )
}
