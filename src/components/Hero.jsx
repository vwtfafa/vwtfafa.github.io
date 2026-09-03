import { useRef, useState } from "react"
import { useLanguage } from "../context/LanguageContext"

const CLICKS_NEEDED = 10

export default function Hero() {
  const { t } = useLanguage()
  const [clicks, setClicks] = useState(0)
  const [party, setParty] = useState(false)
  const resetTimer = useRef(null)

  const handleSkinClick = () => {
    clearTimeout(resetTimer.current)
    const next = clicks + 1
    if (next >= CLICKS_NEEDED) {
      setClicks(0)
      setParty(true)
      console.log(
        "%c🎉 GG! Du hast das Easter Egg gefunden, " +
          document.title.split(" ")[0] +
          "-Fan!",
        "color: #4ade5b; font-size: 16px; font-weight: bold",
      )
      setTimeout(() => setParty(false), 3000)
      return
    }
    setClicks(next)
    resetTimer.current = setTimeout(() => setClicks(0), 2000)
  }

  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="hero-greeting">{t("hero.greeting")}</p>
        <h1 className="hero-name">
          vwtfafa
          <span className="hero-cursor">_</span>
        </h1>
        <p className="hero-tagline">
          <span className="tagline-badge">⚡</span> {t("hero.tagline")}
        </p>
        <p className="hero-bio">{t("hero.bio")}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            {t("hero.viewProjects")}
          </a>
          <a
            href="https://modrinth.com/user/vwtfafa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            {t("hero.modrinth")}
          </a>
          <a
            href="https://github.com/vwtfafa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            {t("hero.github")}
          </a>
        </div>
      </div>
      <div className="hero-skin" onClick={handleSkinClick}>
        <div
          className={`skin-frame${clicks > 3 ? " skin-wiggle" : ""}${party ? " skin-party" : ""}`}
        >
          <img
            src="https://mc-heads.net/body/vwtfafa/256"
            alt="vwtfafa Minecraft Skin"
            className="skin-render"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              if (!e.currentTarget.src.endsWith("/icons/icon-192.png")) {
                e.currentTarget.src = "/icons/icon-192.png"
              }
            }}
          />
          {party && (
            <div className="pixel-burst" aria-hidden="true">
              {[...Array(24)].map((_, i) => (
                <span
                  key={i}
                  className="burst-pixel"
                  style={{
                    "--angle": `${i * 15}deg`,
                    animationDelay: `${(i % 6) * 40}ms`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="skin-shadow"></div>
      </div>
    </section>
  )
}
