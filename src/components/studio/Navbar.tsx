import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, Globe, Check } from "lucide-react";
import { socials } from "@/lib/studio-data";
import { useI18n, LANGS, type Lang } from "@/lib/i18n";

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 127.14 96.36" fill="currentColor" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69c-6.28 0-11.45-5.71-11.45-12.74s5-12.78 11.43-12.78 11.55 5.75 11.45 12.78-5.05 12.74-11.43 12.74Zm42.24 0c-6.28 0-11.43-5.71-11.43-12.74s5-12.78 11.43-12.78 11.55 5.75 11.44 12.78-5.04 12.74-11.44 12.74Z"/>
    </svg>
  );
}

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("nav.lang")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-white/80 bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all"
      >
        <Globe className="h-3.5 w-3.5" />
        {current.flag}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-1 shadow-2xl z-50"
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l.code === lang}
                  onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm text-left hover:bg-white/10 transition ${l.code === lang ? "text-white" : "text-white/70"}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-white/50 w-6">{l.flag}</span>
                    {l.label}
                  </span>
                  {l.code === lang && <Check className="h-4 w-4 text-[oklch(0.72_0.19_165)]" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: t("nav.home") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#team", label: t("nav.team") },
    { href: "#news", label: t("nav.news") },
    { href: "#careers", label: t("nav.careers") },
    { href: "#wiki", label: t("nav.wiki") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-xl bg-black/40 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="container-fx flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.72_0.19_165)] to-[oklch(0.68_0.22_265)] shadow-[0_0_24px_-4px_oklch(0.72_0.19_165)] transition-transform group-hover:scale-110">
            <span className="font-display font-bold text-[#06231b]">F</span>
          </span>
          <span className="font-display text-lg tracking-tight">
            Flux <span className="text-gradient">Production</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-3 py-2 text-sm text-white/70 hover:text-white transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[color-mix(in_oklab,var(--color-brand)_80%,transparent)] after:to-transparent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={socials.discord}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium text-white/90 bg-[#5865F2]/15 border border-[#5865F2]/40 hover:bg-[#5865F2]/30 hover:border-[#5865F2] transition-all hover:-translate-y-0.5"
          >
            <DiscordIcon className="h-4 w-4" />
            {t("nav.discord")}
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-0.5"
          >
            <Github className="h-4 w-4" />
            {t("nav.github")}
          </a>
          <button
            aria-label={open ? t("nav.menu.close") : t("nav.menu.open")}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden container-fx pb-4"
          >
            <ul className="glass rounded-2xl p-2 grid grid-cols-2 gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm rounded-xl hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export { DiscordIcon };
