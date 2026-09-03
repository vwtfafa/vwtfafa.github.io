import { LanguageProvider } from "./context/LanguageContext"
import { ThemeProvider } from "./context/ThemeContext"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import About from "./components/About"
import Projects from "./components/Projects"
import Showcase from "./components/Showcase"
import Guides from "./components/Guides"
import Releases from "./components/Releases"
import Metrics from "./components/Metrics"
import Support from "./components/Support"
import Faq from "./components/Faq"
import Contact from "./components/Footer"
import BackToTop from "./components/BackToTop"
import EasterEggs from "./components/EasterEggs"

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="particles" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${(i * 83) % 100}%`,
                animationDelay: `${(i * 2.7) % 12}s`,
                animationDuration: `${9 + (i % 5) * 3}s`,
              }}
            />
          ))}
        </div>
        <Header />
        <main id="main">
          <Hero />
          <Stats />
          <About />
          <Projects />
          <Showcase />
          <Guides />
          <Releases />
          <Metrics />
          <Support />
          <Faq />
          <Contact />
        </main>
        <BackToTop />
        <EasterEggs />
      </LanguageProvider>
    </ThemeProvider>
  )
}
