import { useLanguage } from "../context/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer" id="contact">
      <div className="footer-links">
        <a
          href="https://modrinth.com/user/vwtfafa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Modrinth
        </a>
        <a
          href="https://github.com/vwtfafa"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
      <p className="footer-text">
        {t("footer.rights")} · {t("footer.madeWith")}
      </p>
    </footer>
  )
}
