export const translations = {
  de: {
    nav: {
      projects: "Projekte",
      about: "Über mich",
      faq: "FAQ",
      contact: "Kontakt",
    },
    hero: {
      greeting: "Hey, ich bin",
      tagline: "Minecraft Developer",
      bio: "Ich entwickle Plugins und Modpacks mit Fokus auf sauberen, funktionalen und performanten Minecraft-Projekten.",
      viewProjects: "Projekte ansehen",
      modrinth: "Modrinth",
      github: "GitHub",
    },
    stats: {
      projects: "Projekte",
      downloads: "Downloads",
      years: "Jahre aktiv",
      servers: "Server online",
    },
    about: {
      title: "Über mich",
      subtitle:
        "Ich entwickle seit 3 Jahren Minecraft-Plugins und -Modpacks – von kleinen Utility-Tools bis zu kompletten Modpacks.",
      skillsTitle: "Tech-Stack & Skills",
      skills: [
        "Java",
        "Paper / Bukkit API",
        "Folia",
        "Fabric",
        "Gradle",
        "Maven",
        "Git",
        "REST APIs",
      ],
    },
    projects: {
      title: "Meine Projekte",
      subtitle: "Plugins, Modpacks & Tools – alles open source",
      discontinued: "Nicht mehr aktualisiert",
      new: "NEU",
      commandsToggle: "Commands & Features",
      filterAll: "Alle",
      links: {
        modrinth: "Modrinth",
        github: "GitHub",
      },
      items: {
        lockend: {
          name: "Lock End",
          desc: "End global sperren oder freigeben. Blockiert Portale, Teleports und Befehle. Leichtgewichtig, mehrsprachig, kompatibel mit Paper 26.2+.",
          commands: [
            "/lockend lock – sperrt das End serverweit",
            "/lockend unlock – gibt das End wieder frei",
            "/lockend status – zeigt den aktuellen Status",
            "/lockend reload – lädt die Config neu",
            "Permissions: lockend.admin, lockend.bypass",
          ],
        },
        backpack: {
          name: "Simple Backpack",
          desc: "Konfigurierbare Rucksäcke mit Team-Support, Admin-Tools und Live-Config-Reload für 26.2+.",
          commands: [
            "/backpack open – öffnet deinen Rucksack",
            "/backpack give <spieler> – gibt einen Rucksack",
            "/backpack reload – lädt die Config live neu",
            "Team-Rucksäcke & Admin-Tools inklusive",
          ],
        },
        compasstrack: {
          name: "CompassTrack",
          desc: "Spieler in Echtzeit mit dem Kompass tracken – ideal für PvP, Manhunts und Survival. Mit Cooldowns, Permissions und Live-Updates.",
          commands: [
            "/track <spieler> – Kompass zeigt zum Ziel",
            "/track off – Tracking beenden",
            "Konfigurierbare Cooldowns & Permissions",
            "Live-Updates der Zielposition",
          ],
        },
        hitborder: {
          name: "HitBorder",
          desc: "Die WorldBorder wächst, wenn Spieler Schaden nehmen. Mit Admin-Befehlen, Spawn-Schutz, Hardcore-Modus, Sounds und konfigurierbaren Einstellungen.",
          commands: [
            "/hitborder start – startet die Challenge",
            "/hitborder stop – stoppt die Challenge",
            "/hitborder set <blöcke> – Wachstum pro Schaden",
            "Hardcore-Modus, Sounds & Spawn-Schutz",
          ],
        },
        craftattack: {
          name: "Craft Attack 13",
          desc: "Craft Attack Modpack mit Fokus auf Performance, Optimierung und visuellem Vergnügen – mit Freecam frei erkunden und maximale Smoothness genießen.",
          commands: [
            "Performance- & Optimierungsmods vorkonfiguriert",
            "Freecam zum freien Erkunden",
            "Leichtgewichtig – auch für schwächere PCs",
            "Regelmäßige Updates (Nr. 14 kommt!)",
          ],
        },
        quicktrash: {
          name: "QuickTrash",
          desc: "Schnell und unkompliziert Items im Inventar entsorgen – perfekt für den Alltag auf jedem Server.",
          commands: [
            "/trash – öffnet ein Müll-Inventar",
            "/trash hand – entsorgt das Item in der Hand",
            "Schnell, leichtgewichtig, keine Abhängigkeiten",
          ],
        },
      },
    },
    metrics: {
      title: "Live-Metriken",
      subtitle:
        "Echte Nutzungsdaten direkt von bStats – alle 30 Minuten aktualisiert",
      servers: "Server",
      players: "Spieler",
      poweredBy: "Daten von bStats",
    },
    releases: {
      title: "Letzte Updates",
      subtitle: "Die neuesten Releases direkt von Modrinth",
      version: "Version",
    },
    footer: {
      madeWith: "Erstellt mit React",
      rights: "© 2026 vwtfafa",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Fragen, Feedback oder Lust auf Collaboration? Schreib mir!",
      discord: "Discord",
      discordCopied: "Discord-Name kopiert! ✓",
      copyHint: "Klicken zum Kopieren",
    },
    backToTop: {
      label: "Nach oben",
    },
    eggs: {
      creeper: "Ach nee… CREEPER! 💥 Easter Egg gefunden!",
    },
    faq: {
      title: "FAQ",
      subtitle: "Häufige Fragen – kurz beantwortet",
      items: [
        {
          q: "Wie kann ich dich erreichen?",
          a: "Am schnellsten per Discord (vwtfafa) – einfach den Namen in der Kontakt-Sektion kopieren. Oder über GitHub Issues in einem meiner Repos.",
        },
        {
          q: "Darf ich deine Plugins auf meinem Server nutzen?",
          a: "Ja! Alle Projekte sind open source. Die genauen Lizenzbedingungen findest du jeweils im GitHub-Repo bzw. auf Modrinth.",
        },
        {
          q: "Nimmst du Feature-Wünsche oder Bug-Reports an?",
          a: "Auf jeden Fall – Issues auf GitHub sind der beste Weg. Je konkreter die Beschreibung (Version, Schritte, Logs), desto schneller kann ich helfen.",
        },
        {
          q: "Welche Minecraft-Versionen werden unterstützt?",
          a: "Die aktiven Paper/Bukkit-Plugins unterstützen aktuelle Paper-Versionen inklusive Folia. Details stehen immer auf der Modrinth-Seite des jeweiligen Projekts.",
        },
        {
          q: "Kann ich bei deinen Projekten mitmachen?",
          a: "Pull Requests sind willkommen! Fork das Repo, ändere was und öffne einen PR – ich schaue mir alles an.",
        },
      ],
    },
  },
  en: {
    nav: {
      projects: "Projects",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      greeting: "Hey, I'm",
      tagline: "Minecraft Developer",
      bio: "I build plugins and modpacks focused on clean, functional, and high-performance Minecraft projects.",
      viewProjects: "View Projects",
      modrinth: "Modrinth",
      github: "GitHub",
    },
    stats: {
      projects: "Projects",
      downloads: "Downloads",
      years: "Years active",
      servers: "Servers online",
    },
    about: {
      title: "About Me",
      subtitle:
        "I've been building Minecraft plugins and modpacks for 3 years – from small utility tools to complete modpacks.",
      skillsTitle: "Tech Stack & Skills",
      skills: [
        "Java",
        "Paper / Bukkit API",
        "Folia",
        "Fabric",
        "Gradle",
        "Maven",
        "Git",
        "REST APIs",
      ],
    },
    projects: {
      title: "My Projects",
      subtitle: "Plugins, modpacks & tools – all open source",
      discontinued: "Discontinued",
      new: "NEW",
      commandsToggle: "Commands & Features",
      filterAll: "All",
      links: {
        modrinth: "Modrinth",
        github: "GitHub",
      },
      items: {
        lockend: {
          name: "Lock End",
          desc: "Lock or unlock the End globally. Blocks portals, teleports and commands. Lightweight, multilingual, Paper 26.2+ compatible.",
          commands: [
            "/lockend lock – locks the End server-wide",
            "/lockend unlock – unlocks the End again",
            "/lockend status – shows the current status",
            "/lockend reload – reloads the config",
            "Permissions: lockend.admin, lockend.bypass",
          ],
        },
        backpack: {
          name: "Simple Backpack",
          desc: "Configurable backpacks with team support, admin tools and live config reload for 26.2+.",
          commands: [
            "/backpack open – opens your backpack",
            "/backpack give <player> – gives a backpack",
            "/backpack reload – live config reload",
            "Team backpacks & admin tools included",
          ],
        },
        compasstrack: {
          name: "CompassTrack",
          desc: "Track players in real time with your compass — ideal for PvP, manhunts and survival. Includes cooldowns, permissions and live updates.",
          commands: [
            "/track <player> – compass points to target",
            "/track off – stop tracking",
            "Configurable cooldowns & permissions",
            "Live updates of target position",
          ],
        },
        hitborder: {
          name: "HitBorder",
          desc: "The WorldBorder grows whenever players take damage. Includes admin commands, spawn protection, hardcore mode, sounds and configurable settings.",
          commands: [
            "/hitborder start – starts the challenge",
            "/hitborder stop – stops the challenge",
            "/hitborder set <blocks> – growth per damage",
            "Hardcore mode, sounds & spawn protection",
          ],
        },
        craftattack: {
          name: "Craft Attack 13",
          desc: "A Craft Attack modpack focused on performance, optimization and visual satisfaction — explore freely with Freecam and enjoy ultimate smoothness.",
          commands: [
            "Performance & optimization mods preconfigured",
            "Freecam for free exploration",
            "Lightweight – runs on weaker PCs too",
            "Regular updates (No. 14 coming!)",
          ],
        },
        quicktrash: {
          name: "QuickTrash",
          desc: "Quickly and easily dispose of items in your inventory – perfect for everyday use on any server.",
          commands: [
            "/trash – opens a trash inventory",
            "/trash hand – disposes the item in your hand",
            "Fast, lightweight, no dependencies",
          ],
        },
      },
    },
    metrics: {
      title: "Live Metrics",
      subtitle:
        "Real usage data straight from bStats – updated every 30 minutes",
      servers: "Servers",
      players: "Players",
      poweredBy: "Data by bStats",
    },
    releases: {
      title: "Latest Updates",
      subtitle: "The newest releases straight from Modrinth",
      version: "Version",
    },
    footer: {
      madeWith: "Built with React",
      rights: "© 2026 vwtfafa",
    },
    contact: {
      title: "Contact",
      subtitle: "Questions, feedback or want to collaborate? Hit me up!",
      discord: "Discord",
      discordCopied: "Discord name copied! ✓",
      copyHint: "Click to copy",
    },
    backToTop: {
      label: "Back to top",
    },
    eggs: {
      creeper: "Aw man… CREEPER! 💥 Easter egg found!",
    },
    faq: {
      title: "FAQ",
      subtitle: "Frequently asked questions – short and sweet",
      items: [
        {
          q: "How can I reach you?",
          a: "Fastest way is Discord (vwtfafa) – copy the name from the contact section. Or open an issue on GitHub in one of my repos.",
        },
        {
          q: "Can I use your plugins on my server?",
          a: "Yes! All projects are open source. Check the exact license terms in the GitHub repo or on Modrinth.",
        },
        {
          q: "Do you take feature requests or bug reports?",
          a: "Absolutely – GitHub issues are the best way. The more concrete the report (version, steps, logs), the faster I can help.",
        },
        {
          q: "Which Minecraft versions are supported?",
          a: "The active Paper/Bukkit plugins support current Paper versions including Folia. Details are always on each project's Modrinth page.",
        },
        {
          q: "Can I contribute to your projects?",
          a: "Pull requests are welcome! Fork the repo, make your changes and open a PR – I'll review everything.",
        },
      ],
    },
  },
}
