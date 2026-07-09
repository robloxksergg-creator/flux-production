import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ru" | "de" | "ky";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "ru", label: "Русский", flag: "RU" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "ky", label: "Кыргызча", flag: "KY" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.team": "Team",
  "nav.news": "News",
  "nav.careers": "Careers",
  "nav.wiki": "Wiki",
  "nav.contact": "Contact",
  "nav.discord": "Discord",
  "nav.github": "GitHub",
  "nav.menu.open": "Open menu",
  "nav.menu.close": "Close menu",
  "nav.lang": "Language",

  "hero.badge": "Now shipping · Season 26",
  "hero.subtitle":
    "Creating premium Minecraft experiences through innovation, creativity and technology. A studio of engineers, artists and builders shipping ambitious worlds and world-class tools.",
  "hero.cta.projects": "Explore Projects",
  "hero.cta.team": "Meet the Team",
  "hero.cta.discord": "Join Discord",
  "hero.cta.github": "View GitHub",
  "hero.card.log": "Studio.log",
  "hero.card.servers": "Servers online",
  "hero.card.status": "● all systems nominal",
  "hero.card.uptime": "Uptime",
  "hero.card.latency": "Latency",

  "about.eyebrow": "About the studio",
  "about.title": "An independent studio building the {accent} of Minecraft.",
  "about.title.accent": "next generation",
  "about.subtitle":
    "Flux Production is a fully-remote team of developers, artists and designers dedicated to shipping premium Minecraft experiences and the tools that power them.",
  "pillar.innovation.title": "Innovation",
  "pillar.innovation.text": "Pushing the technical ceiling of what Minecraft can be.",
  "pillar.quality.title": "Quality",
  "pillar.quality.text": "Ship-quality bar set on day one and defended every release.",
  "pillar.community.title": "Community",
  "pillar.community.text": "Everything we build orbits the people who play it.",
  "pillar.opensource.title": "Open Source",
  "pillar.opensource.text": "We give back tooling, libraries and knowledge to the ecosystem.",
  "pillar.professionalism.title": "Professionalism",
  "pillar.professionalism.text": "A real studio: contracts, SLAs, roadmaps and accountability.",

  "projects.eyebrow": "Projects",
  "projects.title": "What we're {accent}.",
  "projects.title.accent": "shipping",
  "projects.subtitle":
    "Servers, tools, launchers and open source projects — everything we make is production-grade.",
  "projects.visit": "Visit",
  "projects.learn": "Learn more",
  "status.Live": "Live",
  "status.Beta": "Beta",
  "status.In Development": "In Development",
  "status.Open Source": "Open Source",
  "project.nexus-sky.tag": "Flagship Server",
  "project.nexus-sky.desc":
    "A next-generation Minecraft RPG universe with custom classes, sprawling open worlds, and a hand-crafted narrative engine.",
  "project.flux-api.tag": "Developer Platform",
  "project.flux-api.desc":
    "A modern high-performance API framework for Minecraft plugins. Type-safe, async-first, built for scale.",
  "project.flux-academy.tag": "Education & Content",
  "project.flux-academy.desc":
    "New training tracks, tutorials and content drops for players and builders. Weekly updates, guides and hands-on lessons.",
  "project.resource-packs.tag": "Art & Assets",
  "project.resource-packs.desc":
    "Curated resource and shader packs designed in-house by our art team. Free for the community.",
  "project.internal-tools.tag": "Studio Suite",
  "project.internal-tools.desc":
    "Custom tooling powering our studio — build pipelines, telemetry, dashboards, and deployment automation.",

  "team.eyebrow": "The team",
  "team.title": "Meet the {accent} behind Flux.",
  "team.title.accent": "people",
  "team.subtitle":
    "A tight-knit crew of specialists, distributed across time zones and united by a single quality bar.",
  "role.Founder": "Founder",
  "role.Lead Developer": "Lead Developer",
  "role.Backend Developer": "Backend Developer",
  "role.Frontend Developer": "Frontend Developer",
  "role.3D Artist": "3D Artist",
  "role.UI / UX Designer": "UI / UX Designer",
  "role.Builder": "Builder",
  "role.Community Manager": "Community Manager",
  "bio.Aetheris": "Sets the direction. Obsessed with world-building and clean architecture.",
  "bio.Nyxus": "Architects the core systems that everything else runs on top of.",
  "bio.Kaiden": "Distributed systems, low-latency networking and database wizardry.",
  "bio.Luma": "Crafts every pixel of the launcher and web experiences.",
  "bio.Orion": "Sculpts models, animations and cinematic scenes for our worlds.",
  "bio.Vera": "Turns complex tooling into intuitive, delightful interfaces.",
  "bio.Rook": "Master builder behind every landmark, dungeon and city we ship.",
  "bio.Sable": "Keeps the Discord alive and the feedback loop tight.",

  "news.eyebrow": "News",
  "news.title": "Latest from the {accent}.",
  "news.title.accent": "studio",
  "news.subtitle": "Release notes, engineering deep-dives and studio announcements.",
  "news.read": "Read more",
  "news.cat.Announcement": "Announcement",
  "news.cat.Engineering": "Engineering",
  "news.cat.Product": "Product",
  "news.nexus-alpha.title": "NexusSky enters closed alpha",
  "news.nexus-alpha.excerpt":
    "After two years of internal iteration, our flagship RPG is opening its doors to the first wave of testers.",
  "news.flux-api-v2.title": "Flux API 2.0 — a full rewrite",
  "news.flux-api-v2.excerpt":
    "Async-first, strictly typed, and 8× faster on hot paths. Here is what changed and why we rebuilt from scratch.",
  "news.academy-launch.title": "Flux Academy — training & new content",
  "news.academy-launch.excerpt":
    "We are shipping training tracks, tutorials and a steady stream of new content for players and builders.",

  "careers.eyebrow": "Careers",
  "careers.title": "Build the future of Minecraft {accent}.",
  "careers.title.accent": "with us",
  "careers.subtitle":
    "We are always looking for exceptional talent. Fully remote, competitive pay, deep ownership.",
  "careers.apply": "Apply",
  "jobteam.Engineering": "Engineering",
  "jobteam.Art": "Art",
  "jobteam.Platform": "Platform",
  "jobteam.Community": "Community",
  "jobtype.Full-time": "Full-time",
  "jobtype.Contract": "Contract",
  "jobtype.Part-time": "Part-time",
  "joblocation.Remote": "Remote",
  "job.0.title": "Senior Minecraft Plugin Developer",
  "job.0.desc":
    "Own core gameplay systems for NexusSky. Deep Paper / Folia expertise and strong Kotlin or Java required.",
  "job.1.title": "3D Environment Artist",
  "job.1.desc":
    "Design and model landmark biomes, dungeons and props at AAA fidelity within the Minecraft aesthetic.",
  "job.2.title": "DevOps Engineer",
  "job.2.desc":
    "Own our CI/CD, telemetry and server orchestration. Kubernetes, Terraform and observability at scale.",
  "job.3.title": "Community Moderator",
  "job.3.desc":
    "Support our Discord, run community events, and keep our space welcoming and safe.",

  "community.eyebrow": "Community",
  "community.title": "A growing crew of {accent} players, builders and devs.",
  "community.title.accent": "50+",
  "community.subtitle":
    "Small, tight and shipping. Get early access to releases, join playtests, hang out with the team and shape what we build next.",
  "community.cta.discord": "Join our Discord",
  "community.cta.github": "Star on GitHub",
  "stat.Active Projects": "Active Projects",
  "stat.Developers": "Developers",
  "stat.Community Members": "Community Members",
  "stat.Commits Shipped": "Commits Shipped",
  "stat.Downloads": "Downloads",

  "wiki.eyebrow": "Wiki",
  "wiki.title": "Docs, guides and {accent}.",
  "wiki.title.accent": "references",
  "wiki.subtitle":
    "Everything you need to build with Flux — from onboarding to advanced integrations.",
  "wiki.open": "Open",
  "wiki.topic.0.title": "Getting Started",
  "wiki.topic.0.desc": "Install the launcher, connect to a server, join the community.",
  "wiki.topic.1.title": "Flux API Docs",
  "wiki.topic.1.desc": "Reference documentation for developers building on Flux API.",
  "wiki.topic.2.title": "NexusSky Guide",
  "wiki.topic.2.desc": "Classes, quests, professions and everything in-between.",
  "wiki.topic.3.title": "Server Hosting",
  "wiki.topic.3.desc": "Deploy your own instance with our official server images.",

  "contact.eyebrow": "Contact",
  "contact.title": "Let's {accent}.",
  "contact.title.accent": "talk",
  "contact.subtitle":
    "Partnerships, press, hiring or something else — drop us a line and we'll get back within 48 hours.",
  "contact.email.title": "Email us",
  "contact.email.sub": "hello@fluxproduction.dev",
  "contact.discord.title": "Chat on Discord",
  "contact.discord.sub": "Fastest way to reach the team",
  "contact.github.title": "Open an issue",
  "contact.github.sub": "Bug reports and feature requests",

  "footer.tagline":
    "An independent Minecraft development studio building premium experiences, developer tools and open source software.",
  "footer.studio": "Studio",
  "footer.resources": "Resources",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.rights": "All rights reserved.",
  "footer.disclaimer": "Not affiliated with Mojang or Microsoft.",
};

const ru: Dict = {
  "nav.home": "Главная",
  "nav.projects": "Проекты",
  "nav.team": "Команда",
  "nav.news": "Новости",
  "nav.careers": "Вакансии",
  "nav.wiki": "Вики",
  "nav.contact": "Контакты",
  "nav.discord": "Discord",
  "nav.github": "GitHub",
  "nav.menu.open": "Открыть меню",
  "nav.menu.close": "Закрыть меню",
  "nav.lang": "Язык",

  "hero.badge": "Сейчас выходит · Сезон 26",
  "hero.subtitle":
    "Создаём премиальные Minecraft-проекты через инновации, творчество и технологии. Студия инженеров, художников и билдеров, выпускающая амбициозные миры и первоклассные инструменты.",
  "hero.cta.projects": "Наши проекты",
  "hero.cta.team": "Команда",
  "hero.cta.discord": "Вступить в Discord",
  "hero.cta.github": "Смотреть GitHub",
  "hero.card.log": "Studio.log",
  "hero.card.servers": "Серверов онлайн",
  "hero.card.status": "● все системы в норме",
  "hero.card.uptime": "Аптайм",
  "hero.card.latency": "Задержка",

  "about.eyebrow": "О студии",
  "about.title": "Независимая студия, создающая {accent} Minecraft.",
  "about.title.accent": "новое поколение",
  "about.subtitle":
    "Flux Production — полностью удалённая команда разработчиков, художников и дизайнеров, посвящённая созданию премиальных Minecraft-проектов и инструментов для них.",
  "pillar.innovation.title": "Инновации",
  "pillar.innovation.text": "Раздвигаем технический потолок того, чем может быть Minecraft.",
  "pillar.quality.title": "Качество",
  "pillar.quality.text": "Высокая планка качества задана с первого дня и держится каждый релиз.",
  "pillar.community.title": "Сообщество",
  "pillar.community.text": "Всё, что мы делаем, вращается вокруг игроков.",
  "pillar.opensource.title": "Open Source",
  "pillar.opensource.text":
    "Мы отдаём сообществу инструменты, библиотеки и знания.",
  "pillar.professionalism.title": "Профессионализм",
  "pillar.professionalism.text":
    "Настоящая студия: контракты, SLA, дорожные карты и ответственность.",

  "projects.eyebrow": "Проекты",
  "projects.title": "Что мы {accent}.",
  "projects.title.accent": "выпускаем",
  "projects.subtitle":
    "Серверы, инструменты, лаунчеры и open-source проекты — всё, что мы делаем, промышленного уровня.",
  "projects.visit": "Открыть",
  "projects.learn": "Подробнее",
  "status.Live": "В продакшене",
  "status.Beta": "Бета",
  "status.In Development": "В разработке",
  "status.Open Source": "Open Source",
  "project.nexus-sky.tag": "Флагманский сервер",
  "project.nexus-sky.desc":
    "RPG-вселенная Minecraft нового поколения: авторские классы, огромные открытые миры и вручную сделанный сюжетный движок.",
  "project.flux-api.tag": "Платформа для разработчиков",
  "project.flux-api.desc":
    "Современный высокопроизводительный API-фреймворк для плагинов Minecraft. Типобезопасный, async-first, готов к масштабу.",
  "project.flux-academy.tag": "Обучение и контент",
  "project.flux-academy.desc":
    "Новые обучающие треки, туториалы и регулярный новый контент для игроков и билдеров. Еженедельные апдейты и практические уроки.",
  "project.resource-packs.tag": "Арт и ассеты",
  "project.resource-packs.desc":
    "Кураторские ресурс- и шейдер-паки от нашей арт-команды. Бесплатно для сообщества.",
  "project.internal-tools.tag": "Студийный набор",
  "project.internal-tools.desc":
    "Внутренние инструменты студии — билд-пайплайны, телеметрия, дашборды и деплой-автоматизация.",

  "team.eyebrow": "Команда",
  "team.title": "Знакомьтесь с {accent}, что стоят за Flux.",
  "team.title.accent": "людьми",
  "team.subtitle":
    "Сплочённая команда специалистов, распределённая по часовым поясам и объединённая единой планкой качества.",
  "role.Founder": "Основатель",
  "role.Lead Developer": "Ведущий разработчик",
  "role.Backend Developer": "Backend-разработчик",
  "role.Frontend Developer": "Frontend-разработчик",
  "role.3D Artist": "3D-художник",
  "role.UI / UX Designer": "UI / UX дизайнер",
  "role.Builder": "Билдер",
  "role.Community Manager": "Community-менеджер",
  "bio.Aetheris": "Задаёт направление. Одержим ворлд-билдингом и чистой архитектурой.",
  "bio.Nyxus": "Проектирует ядро систем, на которых работает всё остальное.",
  "bio.Kaiden": "Распределённые системы, низколатентные сети и магия баз данных.",
  "bio.Luma": "Прорабатывает каждый пиксель лаунчера и веба.",
  "bio.Orion": "Лепит модели, анимации и кинематографические сцены наших миров.",
  "bio.Vera": "Превращает сложные инструменты в удобные и приятные интерфейсы.",
  "bio.Rook": "Мастер-билдер каждого ландмарка, данжа и города, что мы выпускаем.",
  "bio.Sable": "Держит Discord живым и обратную связь — чёткой.",

  "news.eyebrow": "Новости",
  "news.title": "Свежее от {accent}.",
  "news.title.accent": "студии",
  "news.subtitle": "Заметки о релизах, инженерные глубокие погружения и анонсы студии.",
  "news.read": "Читать далее",
  "news.cat.Announcement": "Анонс",
  "news.cat.Engineering": "Инженерия",
  "news.cat.Product": "Продукт",
  "news.nexus-alpha.title": "NexusSky выходит в закрытую альфу",
  "news.nexus-alpha.excerpt":
    "После двух лет внутренней итерации наш флагманский RPG открывает двери первой волне тестеров.",
  "news.flux-api-v2.title": "Flux API 2.0 — полная переработка",
  "news.flux-api-v2.excerpt":
    "Async-first, строгая типизация и в 8× быстрее на горячих путях. Что изменилось и почему мы переписали всё с нуля.",
  "news.academy-launch.title": "Flux Academy — обучение и новый контент",
  "news.academy-launch.excerpt":
    "Запускаем обучающие треки, туториалы и постоянный поток нового контента для игроков и билдеров.",

  "careers.eyebrow": "Вакансии",
  "careers.title": "Стройте будущее Minecraft {accent}.",
  "careers.title.accent": "вместе с нами",
  "careers.subtitle":
    "Мы всегда ищем исключительных специалистов. Полная удалёнка, конкурентная оплата, глубокая ответственность.",
  "careers.apply": "Откликнуться",
  "jobteam.Engineering": "Инженерия",
  "jobteam.Art": "Арт",
  "jobteam.Platform": "Платформа",
  "jobteam.Community": "Сообщество",
  "jobtype.Full-time": "Полная занятость",
  "jobtype.Contract": "Контракт",
  "jobtype.Part-time": "Частичная занятость",
  "joblocation.Remote": "Удалённо",
  "job.0.title": "Senior Minecraft Plugin Developer",
  "job.0.desc":
    "Отвечать за геймплейные системы NexusSky. Глубокая экспертиза Paper / Folia и сильный Kotlin или Java.",
  "job.1.title": "3D Environment Artist",
  "job.1.desc":
    "Проектировать и моделить знаковые биомы, данжи и объекты на уровне AAA в эстетике Minecraft.",
  "job.2.title": "DevOps Engineer",
  "job.2.desc":
    "Отвечать за CI/CD, телеметрию и оркестрацию серверов. Kubernetes, Terraform и observability на масштабе.",
  "job.3.title": "Модератор сообщества",
  "job.3.desc":
    "Поддерживать Discord, проводить события и держать пространство дружелюбным и безопасным.",

  "community.eyebrow": "Сообщество",
  "community.title": "Растущая команда — {accent} игроков, билдеров и разработчиков.",
  "community.title.accent": "50+",
  "community.subtitle":
    "Небольшая, сплочённая, шиппим часто. Ранний доступ к релизам, участие в плейтестах, общение с командой и влияние на то, что мы делаем дальше.",
  "community.cta.discord": "Вступить в Discord",
  "community.cta.github": "Поставить звезду на GitHub",
  "stat.Active Projects": "Активные проекты",
  "stat.Developers": "Разработчики",
  "stat.Community Members": "Участники сообщества",
  "stat.Commits Shipped": "Коммитов",
  "stat.Downloads": "Загрузки",

  "wiki.eyebrow": "Вики",
  "wiki.title": "Документация, гайды и {accent}.",
  "wiki.title.accent": "справочники",
  "wiki.subtitle":
    "Всё, что нужно для работы с Flux — от онбординга до продвинутых интеграций.",
  "wiki.open": "Открыть",
  "wiki.topic.0.title": "Начало работы",
  "wiki.topic.0.desc": "Установите лаунчер, подключитесь к серверу, вступите в сообщество.",
  "wiki.topic.1.title": "Документация Flux API",
  "wiki.topic.1.desc": "Справочник для разработчиков на Flux API.",
  "wiki.topic.2.title": "Гайд по NexusSky",
  "wiki.topic.2.desc": "Классы, квесты, профессии и всё, что между ними.",
  "wiki.topic.3.title": "Хостинг сервера",
  "wiki.topic.3.desc": "Разверните свой инстанс на наших официальных образах.",

  "contact.eyebrow": "Контакты",
  "contact.title": "Давайте {accent}.",
  "contact.title.accent": "поговорим",
  "contact.subtitle":
    "Партнёрства, пресса, найм или что-то ещё — напишите, и мы ответим в течение 48 часов.",
  "contact.email.title": "Написать на почту",
  "contact.email.sub": "studiofluxproductions2@gmail.com",
  "contact.discord.title": "Чат в Discord",
  "contact.discord.sub": "Самый быстрый способ связаться",
  "contact.github.title": "Открыть issue",
  "contact.github.sub": "Баг-репорты и запросы фич",

  "footer.tagline":
    "Независимая студия разработки для Minecraft, создающая премиальные проекты, инструменты и open source.",
  "footer.studio": "Студия",
  "footer.resources": "Ресурсы",
  "footer.privacy": "Политика конфиденциальности",
  "footer.terms": "Условия использования",
  "footer.rights": "Все права защищены.",
  "footer.disclaimer": "Не аффилировано с Mojang или Microsoft.",
};

const de: Dict = {
  "nav.home": "Start",
  "nav.projects": "Projekte",
  "nav.team": "Team",
  "nav.news": "News",
  "nav.careers": "Karriere",
  "nav.wiki": "Wiki",
  "nav.contact": "Kontakt",
  "nav.discord": "Discord",
  "nav.github": "GitHub",
  "nav.menu.open": "Menü öffnen",
  "nav.menu.close": "Menü schließen",
  "nav.lang": "Sprache",

  "hero.badge": "Jetzt live · Saison 26",
  "hero.subtitle":
    "Wir schaffen erstklassige Minecraft-Erlebnisse durch Innovation, Kreativität und Technologie. Ein Studio aus Entwicklern, Künstlern und Buildern, das ambitionierte Welten und Weltklasse-Tools veröffentlicht.",
  "hero.cta.projects": "Projekte ansehen",
  "hero.cta.team": "Team kennenlernen",
  "hero.cta.discord": "Discord beitreten",
  "hero.cta.github": "GitHub ansehen",
  "hero.card.log": "Studio.log",
  "hero.card.servers": "Server online",
  "hero.card.status": "● alle Systeme normal",
  "hero.card.uptime": "Uptime",
  "hero.card.latency": "Latenz",

  "about.eyebrow": "Über das Studio",
  "about.title": "Ein unabhängiges Studio, das die {accent} von Minecraft baut.",
  "about.title.accent": "nächste Generation",
  "about.subtitle":
    "Flux Production ist ein vollständig remote arbeitendes Team aus Entwicklern, Künstlern und Designern, das sich premium Minecraft-Erlebnissen und den Tools dahinter widmet.",
  "pillar.innovation.title": "Innovation",
  "pillar.innovation.text": "Wir verschieben die technische Grenze dessen, was Minecraft sein kann.",
  "pillar.quality.title": "Qualität",
  "pillar.quality.text": "Hohe Qualität ab Tag eins — und in jedem Release verteidigt.",
  "pillar.community.title": "Community",
  "pillar.community.text": "Alles, was wir bauen, dreht sich um die Spieler.",
  "pillar.opensource.title": "Open Source",
  "pillar.opensource.text":
    "Wir geben Tools, Libraries und Wissen an das Ökosystem zurück.",
  "pillar.professionalism.title": "Professionalität",
  "pillar.professionalism.text":
    "Ein echtes Studio: Verträge, SLAs, Roadmaps und Verantwortung.",

  "projects.eyebrow": "Projekte",
  "projects.title": "Was wir gerade {accent}.",
  "projects.title.accent": "veröffentlichen",
  "projects.subtitle":
    "Server, Tools, Launcher und Open-Source-Projekte — alles produktionsreif.",
  "projects.visit": "Öffnen",
  "projects.learn": "Mehr erfahren",
  "status.Live": "Live",
  "status.Beta": "Beta",
  "status.In Development": "In Entwicklung",
  "status.Open Source": "Open Source",
  "project.nexus-sky.tag": "Flaggschiff-Server",
  "project.nexus-sky.desc":
    "Ein Minecraft-RPG-Universum der nächsten Generation mit eigenen Klassen, weitläufigen offenen Welten und einer handgemachten Narrativ-Engine.",
  "project.flux-api.tag": "Entwicklerplattform",
  "project.flux-api.desc":
    "Ein modernes, hochperformantes API-Framework für Minecraft-Plugins. Typsicher, async-first, für Skalierung gebaut.",
  "project.flux-academy.tag": "Bildung & Inhalte",
  "project.flux-academy.desc":
    "Neue Lern-Tracks, Tutorials und regelmäßige Inhalte für Spieler und Builder. Wöchentliche Updates und praktische Lektionen.",
  "project.resource-packs.tag": "Art & Assets",
  "project.resource-packs.desc":
    "Kuratierte Resource- und Shader-Packs vom hauseigenen Art-Team. Kostenlos für die Community.",
  "project.internal-tools.tag": "Studio-Suite",
  "project.internal-tools.desc":
    "Eigene Tools für unser Studio — Build-Pipelines, Telemetrie, Dashboards und Deployment-Automatisierung.",

  "team.eyebrow": "Das Team",
  "team.title": "Lerne die {accent} hinter Flux kennen.",
  "team.title.accent": "Menschen",
  "team.subtitle":
    "Eine eingeschworene Crew aus Spezialisten, verteilt über Zeitzonen, vereint durch einen einzigen Qualitätsstandard.",
  "role.Founder": "Gründer",
  "role.Lead Developer": "Lead Entwickler",
  "role.Backend Developer": "Backend-Entwickler",
  "role.Frontend Developer": "Frontend-Entwickler",
  "role.3D Artist": "3D-Artist",
  "role.UI / UX Designer": "UI / UX Designer",
  "role.Builder": "Builder",
  "role.Community Manager": "Community Manager",
  "bio.Aetheris": "Gibt die Richtung vor. Besessen von Worldbuilding und sauberer Architektur.",
  "bio.Nyxus": "Konstruiert die Kernsysteme, auf denen alles andere läuft.",
  "bio.Kaiden": "Verteilte Systeme, latenzarmes Networking und Datenbankmagie.",
  "bio.Luma": "Bearbeitet jeden Pixel im Launcher und im Web.",
  "bio.Orion": "Modelliert, animiert und inszeniert unsere Welten filmreif.",
  "bio.Vera": "Verwandelt komplexe Tools in intuitive, angenehme Interfaces.",
  "bio.Rook": "Master-Builder hinter jedem Wahrzeichen, Dungeon und jeder Stadt.",
  "bio.Sable": "Hält den Discord lebendig und die Feedback-Schleife eng.",

  "news.eyebrow": "News",
  "news.title": "Neues aus dem {accent}.",
  "news.title.accent": "Studio",
  "news.subtitle": "Release-Notes, Engineering-Deep-Dives und Studio-Ankündigungen.",
  "news.read": "Mehr lesen",
  "news.cat.Announcement": "Ankündigung",
  "news.cat.Engineering": "Engineering",
  "news.cat.Product": "Produkt",
  "news.nexus-alpha.title": "NexusSky startet in die Closed Alpha",
  "news.nexus-alpha.excerpt":
    "Nach zwei Jahren interner Iteration öffnet unser Flaggschiff-RPG die Türen für die erste Tester-Welle.",
  "news.flux-api-v2.title": "Flux API 2.0 — komplett neu geschrieben",
  "news.flux-api-v2.excerpt":
    "Async-first, streng typisiert und 8× schneller auf Hot Paths. Was sich geändert hat und warum wir bei null angefangen haben.",
  "news.academy-launch.title": "Flux Academy — Training & neue Inhalte",
  "news.academy-launch.excerpt":
    "Wir starten Lern-Tracks, Tutorials und einen stetigen Strom neuer Inhalte für Spieler und Builder.",

  "careers.eyebrow": "Karriere",
  "careers.title": "Baue die Zukunft von Minecraft {accent}.",
  "careers.title.accent": "mit uns",
  "careers.subtitle":
    "Wir suchen ständig außergewöhnliche Talente. Voll remote, faire Vergütung, echte Ownership.",
  "careers.apply": "Bewerben",
  "jobteam.Engineering": "Engineering",
  "jobteam.Art": "Art",
  "jobteam.Platform": "Plattform",
  "jobteam.Community": "Community",
  "jobtype.Full-time": "Vollzeit",
  "jobtype.Contract": "Vertrag",
  "jobtype.Part-time": "Teilzeit",
  "joblocation.Remote": "Remote",
  "job.0.title": "Senior Minecraft Plugin Entwickler",
  "job.0.desc":
    "Verantworte die Gameplay-Kernsysteme von NexusSky. Tiefe Paper/Folia-Expertise und starkes Kotlin oder Java erforderlich.",
  "job.1.title": "3D-Environment-Artist",
  "job.1.desc":
    "Entwirf und modelliere ikonische Biome, Dungeons und Props auf AAA-Niveau in der Minecraft-Ästhetik.",
  "job.2.title": "DevOps Engineer",
  "job.2.desc":
    "Verantworte CI/CD, Telemetrie und Server-Orchestrierung. Kubernetes, Terraform und Observability at Scale.",
  "job.3.title": "Community-Moderator",
  "job.3.desc":
    "Unterstütze unseren Discord, organisiere Events und halte den Raum einladend und sicher.",

  "community.eyebrow": "Community",
  "community.title": "Ein wachsendes Team aus {accent} Spielern, Buildern und Devs.",
  "community.title.accent": "50+",
  "community.subtitle":
    "Klein, eng, immer am Ausliefern. Früher Zugang zu Releases, Playtests, Austausch mit dem Team und Mitgestaltung dessen, was als Nächstes kommt.",
  "community.cta.discord": "Discord beitreten",
  "community.cta.github": "Auf GitHub sternen",
  "stat.Active Projects": "Aktive Projekte",
  "stat.Developers": "Entwickler",
  "stat.Community Members": "Community-Mitglieder",
  "stat.Commits Shipped": "Ausgelieferte Commits",
  "stat.Downloads": "Downloads",

  "wiki.eyebrow": "Wiki",
  "wiki.title": "Docs, Guides und {accent}.",
  "wiki.title.accent": "Referenzen",
  "wiki.subtitle":
    "Alles, was du für die Arbeit mit Flux brauchst — vom Onboarding bis zu fortgeschrittenen Integrationen.",
  "wiki.open": "Öffnen",
  "wiki.topic.0.title": "Erste Schritte",
  "wiki.topic.0.desc": "Launcher installieren, mit einem Server verbinden, der Community beitreten.",
  "wiki.topic.1.title": "Flux API Docs",
  "wiki.topic.1.desc": "Referenz-Doku für Entwickler auf Basis der Flux API.",
  "wiki.topic.2.title": "NexusSky Guide",
  "wiki.topic.2.desc": "Klassen, Quests, Berufe und alles dazwischen.",
  "wiki.topic.3.title": "Server-Hosting",
  "wiki.topic.3.desc": "Betreibe deine eigene Instanz mit unseren offiziellen Server-Images.",

  "contact.eyebrow": "Kontakt",
  "contact.title": "Lass uns {accent}.",
  "contact.title.accent": "reden",
  "contact.subtitle":
    "Partnerschaften, Presse, Hiring oder etwas anderes — schreib uns, wir melden uns innerhalb von 48 Stunden.",
  "contact.email.title": "Per E-Mail",
  "contact.email.sub": "hello@fluxproduction.dev",
  "contact.discord.title": "Chat auf Discord",
  "contact.discord.sub": "Schnellster Weg zum Team",
  "contact.github.title": "Issue eröffnen",
  "contact.github.sub": "Bug-Reports und Feature-Wünsche",

  "footer.tagline":
    "Ein unabhängiges Minecraft-Entwicklungsstudio, das Premium-Erlebnisse, Entwickler-Tools und Open-Source-Software baut.",
  "footer.studio": "Studio",
  "footer.resources": "Ressourcen",
  "footer.privacy": "Datenschutz",
  "footer.terms": "Nutzungsbedingungen",
  "footer.rights": "Alle Rechte vorbehalten.",
  "footer.disclaimer": "Nicht mit Mojang oder Microsoft verbunden.",
};

const ky: Dict = {
  "nav.home": "Башкы",
  "nav.projects": "Долбоорлор",
  "nav.team": "Команда",
  "nav.news": "Жаңылыктар",
  "nav.careers": "Вакансиялар",
  "nav.wiki": "Вики",
  "nav.contact": "Байланыш",
  "nav.discord": "Discord",
  "nav.github": "GitHub",
  "nav.menu.open": "Менюну ачуу",
  "nav.menu.close": "Менюну жабуу",
  "nav.lang": "Тил",

  "hero.badge": "Азыр чыгууда · 26-сезон",
  "hero.subtitle":
    "Инновация, чыгармачылык жана технология аркылуу премиум Minecraft тажрыйбаларын жаратабыз. Амбициялуу дүйнөлөрдү жана мыкты куралдарды чыгарган инженерлер, сүрөтчүлөр жана билдерлер студиясы.",
  "hero.cta.projects": "Долбоорлорду көрүү",
  "hero.cta.team": "Команда менен таанышуу",
  "hero.cta.discord": "Discord'га кошулуу",
  "hero.cta.github": "GitHub'ту көрүү",
  "hero.card.log": "Studio.log",
  "hero.card.servers": "Серверлер онлайн",
  "hero.card.status": "● бардык система нормалдуу",
  "hero.card.uptime": "Иштөө убактысы",
  "hero.card.latency": "Кечигүү",

  "about.eyebrow": "Студия жөнүндө",
  "about.title": "Minecraft'тын {accent} курган көз карандысыз студия.",
  "about.title.accent": "жаңы муунун",
  "about.subtitle":
    "Flux Production — премиум Minecraft тажрыйбаларын жана алар үчүн куралдарды чыгарууга багытталган толугу менен алыстан иштеген иштеп чыгуучулар, сүрөтчүлөр жана дизайнерлер командасы.",
  "pillar.innovation.title": "Инновация",
  "pillar.innovation.text": "Minecraft эмне боло аларынын техникалык чегин жогорулатабыз.",
  "pillar.quality.title": "Сапат",
  "pillar.quality.text": "Биринчи күндөн сапат планкасы коюлган жана ар бир релизде корголот.",
  "pillar.community.title": "Коомчулук",
  "pillar.community.text": "Биз жасаган нерсенин баары ойногон адамдардын айланасында.",
  "pillar.opensource.title": "Open Source",
  "pillar.opensource.text":
    "Биз коомго куралдарды, китепканаларды жана билимди кайтарабыз.",
  "pillar.professionalism.title": "Профессионализм",
  "pillar.professionalism.text":
    "Чыныгы студия: келишимдер, SLA, жол карталары жана жоопкерчилик.",

  "projects.eyebrow": "Долбоорлор",
  "projects.title": "Биз {accent} нерселер.",
  "projects.title.accent": "чыгарып жаткан",
  "projects.subtitle":
    "Серверлер, куралдар, лаунчерлер жана open source долбоорлор — баары продакшн деңгээлинде.",
  "projects.visit": "Ачуу",
  "projects.learn": "Толугураак",
  "status.Live": "Иштеп жатат",
  "status.Beta": "Бета",
  "status.In Development": "Иштелип жатат",
  "status.Open Source": "Open Source",
  "project.nexus-sky.tag": "Флагман сервер",
  "project.nexus-sky.desc":
    "Өз класстары, чоң ачык дүйнөлөрү жана кол менен жасалган баяндоо кыймылдаткычы бар жаңы муундагы Minecraft RPG аалам.",
  "project.flux-api.tag": "Иштеп чыгуучулар платформасы",
  "project.flux-api.desc":
    "Minecraft плагиндери үчүн заманбап, жогорку өндүрүмдүү API-фреймворк. Типсафе, async-first, масштабга ылайыкталган.",
  "project.flux-academy.tag": "Билим жана контент",
  "project.flux-academy.desc":
    "Ойноочулар жана билдерлер үчүн жаңы окуу треги, окуу куралдары жана дайыма жаңы контент. Жумалык жаңылоолор жана практикалык сабактар.",
  "project.resource-packs.tag": "Арт жана ассеттер",
  "project.resource-packs.desc":
    "Арт-командабыз тарабынан жасалган ресурс- жана шейдер-пактар. Коомчулук үчүн бекер.",
  "project.internal-tools.tag": "Студия топтому",
  "project.internal-tools.desc":
    "Студиябызды кубаттаган өзүбүздүн куралдар — билд-пайплайндер, телеметрия, дашборддор жана деплой автоматизациясы.",

  "team.eyebrow": "Команда",
  "team.title": "Flux'тун артындагы {accent} менен таанышыңыз.",
  "team.title.accent": "адамдар",
  "team.subtitle":
    "Убакыт алкактары боюнча бөлүнгөн, бирок бир сапат стандартында бирдиктүү иштеген адистер тобу.",
  "role.Founder": "Негиздөөчү",
  "role.Lead Developer": "Жетектөөчү иштеп чыгуучу",
  "role.Backend Developer": "Backend-иштеп чыгуучу",
  "role.Frontend Developer": "Frontend-иштеп чыгуучу",
  "role.3D Artist": "3D-сүрөтчү",
  "role.UI / UX Designer": "UI / UX дизайнер",
  "role.Builder": "Билдер",
  "role.Community Manager": "Коомчулук менеджери",
  "bio.Aetheris": "Багытты берет. Ворлд-билдинг жана таза архитектурага берилген.",
  "bio.Nyxus": "Баары иштеген негизги системаларды долбоорлойт.",
  "bio.Kaiden": "Бөлүштүрүлгөн системалар, аз кечигүүлүү тармак жана маалымат базасынын устачылыгы.",
  "bio.Luma": "Лаунчер менен веб-тажрыйбанын ар бир пикселин иштеп чыгат.",
  "bio.Orion": "Биздин дүйнөлөр үчүн моделдерди, анимацияларды жана кино көрүнүштөрүн жаратат.",
  "bio.Vera": "Татаал куралдарды жөнөкөй жана ыңгайлуу интерфейстерге айландырат.",
  "bio.Rook": "Ар бир белги, зиндан жана шаардын артындагы башкы билдер.",
  "bio.Sable": "Discord'ту тирүү жана пикир алмашууну тыгыз кармайт.",

  "news.eyebrow": "Жаңылыктар",
  "news.title": "{accent} жаңылыктары.",
  "news.title.accent": "Студиянын",
  "news.subtitle": "Релиз ноталары, инженердик тереңдиктер жана студиянын жарыялары.",
  "news.read": "Толугураак",
  "news.cat.Announcement": "Жарыя",
  "news.cat.Engineering": "Инженерия",
  "news.cat.Product": "Продукт",
  "news.nexus-alpha.title": "NexusSky жабык альфага чыкты",
  "news.nexus-alpha.excerpt":
    "Эки жылдык ички иштен кийин флагман RPG биринчи тестерлер тобу үчүн эшигин ачат.",
  "news.flux-api-v2.title": "Flux API 2.0 — толук кайра жазуу",
  "news.flux-api-v2.excerpt":
    "Async-first, катуу типтелген жана ысык жолдордо 8× тезирээк. Эмне өзгөрдү жана эмне үчүн нөлдөн баштадык.",
  "news.academy-launch.title": "Flux Academy — окуу жана жаңы контент",
  "news.academy-launch.excerpt":
    "Ойноочулар жана билдерлер үчүн окуу треги, туториалдар жана дайыма жаңы контент чыгарып жатабыз.",

  "careers.eyebrow": "Вакансиялар",
  "careers.title": "Minecraft'тын келечегин {accent} куруңуз.",
  "careers.title.accent": "биз менен",
  "careers.subtitle":
    "Биз ар дайым өзгөчө таланттарды издейбиз. Толук алыстан, атаандаштыкка жөндөмдүү төлөм, чоң жоопкерчилик.",
  "careers.apply": "Билдирме калтыруу",
  "jobteam.Engineering": "Инженерия",
  "jobteam.Art": "Арт",
  "jobteam.Platform": "Платформа",
  "jobteam.Community": "Коомчулук",
  "jobtype.Full-time": "Толук ставка",
  "jobtype.Contract": "Келишим",
  "jobtype.Part-time": "Жарым ставка",
  "joblocation.Remote": "Алыстан",
  "job.0.title": "Senior Minecraft Plugin Developer",
  "job.0.desc":
    "NexusSky'дин негизги геймплей системаларына жооптуу болуу. Тереңдетилген Paper/Folia тажрыйбасы жана күчтүү Kotlin же Java талап кылынат.",
  "job.1.title": "3D Environment Artist",
  "job.1.desc":
    "Minecraft эстетикасында AAA сапатта белгилүү биомдорду, зиндандарды жана объекттерди долбоорлоо жана моделдөө.",
  "job.2.title": "DevOps Engineer",
  "job.2.desc":
    "CI/CD, телеметрия жана сервер оркестровкасына жооптуу болуу. Kubernetes, Terraform жана масштабдагы observability.",
  "job.3.title": "Коомчулук модератору",
  "job.3.desc":
    "Discord'ту колдоо, коомчулук иш-чараларын өткөрүү жана мейкиндикти достук жана коопсуз кармоо.",

  "community.eyebrow": "Коомчулук",
  "community.title": "{accent} ойноочу, билдер жана иштеп чыгуучулардан турган өсүп жаткан команда.",
  "community.title.accent": "50+",
  "community.subtitle":
    "Кичинекей, тыгыз жана үзгүлтүксүз чыгарып жатабыз. Релиздерге эрте кирүү, плейтест, команда менен баарлашуу жана кийинки эмнени куруу керектигине таасир этүү.",
  "community.cta.discord": "Discord'га кошулуу",
  "community.cta.github": "GitHub'та жылдыз коюу",
  "stat.Active Projects": "Активдүү долбоорлор",
  "stat.Developers": "Иштеп чыгуучулар",
  "stat.Community Members": "Коомчулук мүчөлөрү",
  "stat.Commits Shipped": "Жиберилген коммиттер",
  "stat.Downloads": "Жүктөөлөр",

  "wiki.eyebrow": "Вики",
  "wiki.title": "Документтер, гайддар жана {accent}.",
  "wiki.title.accent": "маалымдамалар",
  "wiki.subtitle":
    "Flux менен иштөө үчүн бардык керектүү нерсе — онбординден баштап татаал интеграцияларга чейин.",
  "wiki.open": "Ачуу",
  "wiki.topic.0.title": "Баштоо",
  "wiki.topic.0.desc": "Лаунчерди орнотуп, серверге туташып, коомчулукка кошулуңуз.",
  "wiki.topic.1.title": "Flux API документтери",
  "wiki.topic.1.desc": "Flux API'нин негизинде куруучу иштеп чыгуучулар үчүн маалымдама.",
  "wiki.topic.2.title": "NexusSky гид",
  "wiki.topic.2.desc": "Класстар, квесттер, кесиптер жана алардын арасындагылар.",
  "wiki.topic.3.title": "Серверди хостинг",
  "wiki.topic.3.desc": "Расмий образдарыбыз менен өз инстанциянызды жайгаштырыңыз.",

  "contact.eyebrow": "Байланыш",
  "contact.title": "Кел, {accent}.",
  "contact.title.accent": "сүйлөшөлү",
  "contact.subtitle":
    "Өнөктөштүк, басма сөз, жумуш же башка нерсе — бизге жазыңыз, 48 сааттын ичинде жооп беребиз.",
  "contact.email.title": "Электрондук почта",
  "contact.email.sub": "hello@fluxproduction.dev",
  "contact.discord.title": "Discord'до чат",
  "contact.discord.sub": "Команда менен байланышуунун эң тез жолу",
  "contact.github.title": "Issue ачуу",
  "contact.github.sub": "Ката отчёттору жана функция суроолору",

  "footer.tagline":
    "Премиум тажрыйбалар, иштеп чыгуучу куралдары жана open source программаларды жараткан көз карандысыз Minecraft студиясы.",
  "footer.studio": "Студия",
  "footer.resources": "Ресурстар",
  "footer.privacy": "Купуялык саясаты",
  "footer.terms": "Кызмат шарттары",
  "footer.rights": "Бардык укуктар корголгон.",
  "footer.disclaimer": "Mojang же Microsoft менен байланышы жок.",
};

const DICTS: Record<Lang, Dict> = { en, ru, de, ky };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string>) => string;
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "flux:lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && DICTS[saved]) {
        setLangState(saved);
        return;
      }
      const nav = navigator.language.slice(0, 2).toLowerCase();
      if (nav === "ru") setLangState("ru");
      else if (nav === "de") setLangState("de");
      else if (nav === "ky") setLangState("ky");
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* noop */
    }
  };

  const t = (key: string, vars?: Record<string, string>) => {
    let str = DICTS[lang][key] ?? DICTS.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.split(`{${k}}`).join(v);
      }
    }
    return str;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

/** Renders "prefix {accent} suffix" with the accent word gradient-styled. */
export function TitleAccent({ template, accent }: { template: string; accent: string }) {
  const parts = template.split("{accent}");
  return (
    <>
      {parts[0]}
      <span className="text-gradient">{accent}</span>
      {parts[1] ?? ""}
    </>
  );
}
