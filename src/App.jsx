import { LanguageProvider } from "./context/LanguageContext"
import { ThemeProvider } from "./context/ThemeContext"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import About from "./components/About"
import Projects from "./components/Projects"
import Releases from "./components/Releases"
import Metrics from "./components/Metrics"
import Footer from "./components/Footer"

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="particles" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
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
        <main>
          <Hero />
          <Stats />
          <About />
          <Projects />
          <Releases />
          <Metrics />
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  )
}
