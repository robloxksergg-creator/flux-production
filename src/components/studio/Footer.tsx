import { Github } from "lucide-react";
import { DiscordIcon } from "./Navbar";
import { socials } from "@/lib/studio-data";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-black/30 backdrop-blur-xl">
      <div className="container-fx py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <a href="#home" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.72_0.19_165)] to-[oklch(0.68_0.22_265)]">
              <span className="font-display font-bold text-[#06231b]">F</span>
            </span>
            <span className="font-display text-lg">
              Flux <span className="text-gradient">Production</span>
            </span>
          </a>
          <p className="mt-4 text-sm text-white/60 max-w-md">{t("footer.tagline")}</p>
          <div className="mt-5 flex gap-2">
            <a href={socials.discord} target="_blank" rel="noreferrer" aria-label="Discord" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#5865F2] hover:text-[#8b93ff] transition">
              <DiscordIcon className="h-4 w-4" />
            </a>
            <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-white/40 transition">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-wider text-white/50 uppercase">{t("footer.studio")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="text-white/70 hover:text-white transition" href="#projects">{t("nav.projects")}</a></li>
            <li><a className="text-white/70 hover:text-white transition" href="#team">{t("nav.team")}</a></li>
            <li><a className="text-white/70 hover:text-white transition" href="#news">{t("nav.news")}</a></li>
            <li><a className="text-white/70 hover:text-white transition" href="#careers">{t("nav.careers")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-wider text-white/50 uppercase">{t("footer.resources")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="text-white/70 hover:text-white transition" href="#wiki">{t("nav.wiki")}</a></li>
            <li><a className="text-white/70 hover:text-white transition" href="#contact">{t("nav.contact")}</a></li>
            <li><a className="text-white/70 hover:text-white transition" href="#">{t("footer.privacy")}</a></li>
            <li><a className="text-white/70 hover:text-white transition" href="#">{t("footer.terms")}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-fx py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Flux Production. {t("footer.rights")}</span>
          <span className="font-mono">{t("footer.disclaimer")}</span>
        </div>
      </div>
    </footer>
  );
}
