import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Heart,
  GitBranch,
  Award,
  ExternalLink,
  MapPin,
  Briefcase,
  BookOpen,
  MessageCircle,
  Mail,
  Github,
  Send,
  Globe,
  Twitch,
} from "lucide-react";
import type { SocialKind } from "@/lib/studio-data";

function SocialIcon({ kind, className = "" }: { kind: SocialKind; className?: string }) {
  if (kind === "telegram") return <Send className={className} />;
  if (kind === "github") return <Github className={className} />;
  if (kind === "site") return <Globe className={className} />;
  if (kind === "twitch") return <Twitch className={className} />;
  if (kind === "boosty") return <Heart className={className} />;
  return <DiscordIcon className={className} />;
}

function socialHover(kind: SocialKind) {
  switch (kind) {
    case "telegram": return "hover:border-[#229ED9] hover:text-[#7cc7ef]";
    case "github": return "hover:border-white/40";
    case "site": return "hover:border-[oklch(0.72_0.19_165)] hover:text-[oklch(0.85_0.15_165)]";
    case "twitch": return "hover:border-[#9146FF] hover:text-[#b58bff]";
    case "boosty": return "hover:border-[#F15F2C] hover:text-[#ff9066]";
    default: return "hover:border-[#5865F2] hover:text-[#8b93ff]";
  }
}
import { useEffect, useRef, useState } from "react";

import Navbar, { DiscordIcon } from "@/components/studio/Navbar";
import Footer from "@/components/studio/Footer";

import AnimatedCounter from "@/components/studio/AnimatedCounter";
import { projects, team, news, jobs, stats, socials } from "@/lib/studio-data";
import { useI18n, TitleAccent } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function SectionHeading({
  eyebrow,
  titleTemplate,
  titleAccent,
  subtitle,
}: {
  eyebrow: string;
  titleTemplate: string;
  titleAccent: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-2xl"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/70">
        <Sparkles className="h-3 w-3 text-[oklch(0.72_0.19_165)]" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
        <TitleAccent template={titleTemplate} accent={titleAccent} />
      </h2>
      {subtitle ? <p className="mt-4 text-white/60 text-lg leading-relaxed">{subtitle}</p> : null}
    </motion.div>
  );
}

function Hero() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPos({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100svh] overflow-hidden pt-32 pb-24">
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.19 165 / 0.7), transparent 60%)",
          x: pos.x * 20,
          y: pos.y * 20,
        }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.22 265 / 0.7), transparent 60%)",
          x: pos.x * -30,
          y: pos.y * -20,
        }}
      />

      <motion.div style={{ y, opacity }} className="container-fx relative z-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.19_165)] animate-pulse" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-6 font-display text-6xl sm:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight"
          >
            Flux <span className="text-gradient">Production</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn-primary">
              {t("hero.cta.projects")} <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#team" className="btn-ghost">{t("hero.cta.team")}</a>
            <a href={socials.discord} target="_blank" rel="noreferrer" className="btn-ghost">
              <DiscordIcon className="h-4 w-4" /> {t("hero.cta.discord")}
            </a>
            <a href={socials.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <Github className="h-4 w-4" /> {t("hero.cta.github")}
            </a>
          </motion.div>

          <div className="mt-14 grid grid-cols-3 max-w-md gap-8">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-white">
                  <AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{t(`stat.${s.label}`)}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ x: pos.x * -14, y: pos.y * -14 }}
          className="relative mx-auto w-full max-w-md aspect-[4/5]"
        >
          <div className="glow-ring absolute inset-0 rounded-3xl glass-strong overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.72_0.19_165)]/25 via-transparent to-[oklch(0.68_0.22_265)]/30" />
            <div className="absolute inset-6 rounded-2xl border border-white/10 bg-black/30 p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-white/50">{t("hero.card.log")}</span>
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.72_0.19_165)]" />
                </span>
              </div>
              <div className="mt-6 space-y-3 text-sm font-mono">
                <p className="text-white/50"><span className="text-[oklch(0.72_0.19_165)]">$</span> flux build nexus-rpg</p>
                <p className="text-white/70">→ Compiled 248 modules in 1.24s</p>
                <p className="text-white/50"><span className="text-[oklch(0.72_0.19_165)]">$</span> flux deploy --prod</p>
                <p className="text-white/70">→ Deployed to <span className="text-[oklch(0.72_0.19_165)]">nexus.flux</span></p>
                <p className="text-white/50"><span className="text-[oklch(0.72_0.19_165)]">$</span> flux status</p>
                <div className="mt-2 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60">{t("hero.card.servers")}</span>
                    <span className="text-white font-semibold">12 / 12</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[oklch(0.72_0.19_165)] to-[oklch(0.68_0.22_265)]"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-white/40">v26.4.1</span>
                <span className="font-mono text-xs text-[oklch(0.72_0.19_165)]">{t("hero.card.status")}</span>
              </div>
            </div>
          </div>
          <div className="float-slow absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-2xl">
            <div className="text-xs uppercase tracking-widest text-white/50">{t("hero.card.uptime")}</div>
            <div className="mt-1 font-display text-xl">99.98%</div>
          </div>
          <div className="float-slow absolute -top-6 -right-6 glass rounded-2xl p-4 shadow-2xl" style={{ animationDelay: "1.5s" }}>
            <div className="text-xs uppercase tracking-widest text-white/50">{t("hero.card.latency")}</div>
            <div className="mt-1 font-display text-xl">14ms</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

const pillarKeys = [
  { icon: Sparkles, key: "innovation" },
  { icon: Award, key: "quality" },
  { icon: Heart, key: "community" },
  { icon: GitBranch, key: "opensource" },
  { icon: ShieldCheck, key: "professionalism" },
] as const;

function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative py-28">
      <div className="container-fx">
        <SectionHeading
          eyebrow={t("about.eyebrow")}
          titleTemplate={t("about.title")}
          titleAccent={t("about.title.accent")}
          subtitle={t("about.subtitle")}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {pillarKeys.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glow-ring glass rounded-2xl p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.72_0.19_165)]/30 to-[oklch(0.68_0.22_265)]/30 border border-white/10">
                <p.icon className="h-5 w-5 text-[oklch(0.72_0.19_165)]" />
              </div>
              <h3 className="mt-4 font-display text-lg">{t(`pillar.${p.key}.title`)}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{t(`pillar.${p.key}.text`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { t } = useI18n();
  return (
    <section id="projects" className="relative py-28">
      <div className="container-fx">
        <SectionHeading
          eyebrow={t("projects.eyebrow")}
          titleTemplate={t("projects.title")}
          titleAccent={t("projects.title.accent")}
          subtitle={t("projects.subtitle")}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all hover:-translate-y-1 hover:border-white/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative p-6 flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 border border-white/10">
                    <p.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white/80">
                    {t(`status.${p.status}`)}
                  </span>
                </div>
                <div className="mt-6 flex-1">
                  <div className="text-xs uppercase tracking-widest text-white/50">{t(`project.${p.id}.tag`)}</div>
                  <h3 className="mt-1 font-display text-2xl">{p.name}</h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{t(`project.${p.id}.desc`)}</p>
                </div>
                <div className="mt-6 flex gap-2">
                  <a href={p.href} className="btn-primary text-xs !py-2 !px-3">
                    {t("projects.visit")} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a href={p.href} className="btn-ghost text-xs !py-2 !px-3">{t("projects.learn")}</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const { t } = useI18n();
  return (
    <section id="team" className="relative py-28">
      <div className="container-fx">
        <SectionHeading
          eyebrow={t("team.eyebrow")}
          titleTemplate={t("team.title")}
          titleAccent={t("team.title.accent")}
          subtitle={t("team.subtitle")}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/25 transition-all hover:-translate-y-1"
            >
              <div className={`absolute -inset-24 opacity-0 group-hover:opacity-50 transition-opacity bg-gradient-to-br ${m.color} blur-3xl`} />
              <div className="relative">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${m.color} p-[2px]`}>
                  <div className="h-full w-full rounded-[14px] bg-black/70 flex items-center justify-center">
                    <m.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="mt-5 font-display text-xl">{m.name}</h3>
                <div className="text-xs uppercase tracking-widest text-[oklch(0.72_0.19_165)]">{t(`role.${m.role}`)}</div>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{t(`bio.${m.name}`)}</p>
                <div className="mt-5 flex gap-2 flex-wrap">
                  {m.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${m.name} — ${l.label}`}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 transition ${socialHover(l.kind)}`}
                    >
                      <SocialIcon kind={l.kind} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  const { t } = useI18n();
  return (
    <section id="news" className="relative py-28">
      <div className="container-fx">
        <SectionHeading
          eyebrow={t("news.eyebrow")}
          titleTemplate={t("news.title")}
          titleAccent={t("news.title.accent")}
          subtitle={t("news.subtitle")}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <motion.article
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] hover:border-white/25 transition-all hover:-translate-y-1"
            >
              <div className={`aspect-[16/10] bg-gradient-to-br ${n.gradient} relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/80 border border-white/10">
                  {t(`news.cat.${n.category}`)}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-white/50">{n.date}</div>
                <h3 className="mt-2 font-display text-xl leading-snug">{t(`news.${n.id}.title`)}</h3>
                <p className="mt-3 text-sm text-white/60">{t(`news.${n.id}.excerpt`)}</p>
                <a href="#news" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[oklch(0.72_0.19_165)] hover:gap-2 transition-all">
                  {t("news.read")} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Careers() {
  const { t } = useI18n();
  return (
    <section id="careers" className="relative py-28">
      <div className="container-fx">
        <SectionHeading
          eyebrow={t("careers.eyebrow")}
          titleTemplate={t("careers.title")}
          titleAccent={t("careers.title.accent")}
          subtitle={t("careers.subtitle")}
        />

        <div className="mt-14 grid gap-4">
          {jobs.map((j, i) => (
            <motion.div
              key={j.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4 hover:border-white/25 transition-colors"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" /> {t(`jobteam.${j.team}`)}</span>
                  <span className="text-white/20">·</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {t(`joblocation.${j.location}`)}</span>
                  <span className="text-white/20">·</span>
                  <span>{t(`jobtype.${j.type}`)}</span>
                </div>
                <h3 className="mt-2 font-display text-xl">{t(`job.${i}.title`)}</h3>
                <p className="mt-1 text-sm text-white/60">{t(`job.${i}.desc`)}</p>
              </div>
              <a href={socials.email} className="btn-primary self-start md:self-auto">
                {t("careers.apply")} <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  const { t } = useI18n();
  return (
    <section id="community" className="relative py-28">
      <div className="container-fx">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-10 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.68_0.22_265)]/30 via-[oklch(0.72_0.19_165)]/15 to-black" />
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.72_0.19_165)]/25 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#5865F2]/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/70">
                <MessageCircle className="h-3 w-3 text-[oklch(0.72_0.19_165)]" /> {t("community.eyebrow")}
              </div>
              <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
                <TitleAccent template={t("community.title")} accent={t("community.title.accent")} />
              </h2>
              <p className="mt-4 text-white/70 text-lg max-w-lg">{t("community.subtitle")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={socials.discord} target="_blank" rel="noreferrer" className="btn-primary">
                  <DiscordIcon className="h-4 w-4" /> {t("community.cta.discord")}
                </a>
                <a href={socials.github} target="_blank" rel="noreferrer" className="btn-ghost">
                  <Github className="h-4 w-4" /> {t("community.cta.github")}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5">
                  <div className="font-display text-3xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{t(`stat.${s.label}`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Wiki() {
  const { t } = useI18n();
  const topics = [0, 1, 2, 3];
  return (
    <section id="wiki" className="relative py-28">
      <div className="container-fx">
        <SectionHeading
          eyebrow={t("wiki.eyebrow")}
          titleTemplate={t("wiki.title")}
          titleAccent={t("wiki.title.accent")}
          subtitle={t("wiki.subtitle")}
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {topics.map((i) => (
            <motion.a
              key={i}
              href="#wiki"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group glass rounded-2xl p-6 hover:-translate-y-1 hover:border-white/25 transition-all"
            >
              <BookOpen className="h-5 w-5 text-[oklch(0.72_0.19_165)]" />
              <h3 className="mt-4 font-display text-lg">{t(`wiki.topic.${i}.title`)}</h3>
              <p className="mt-2 text-sm text-white/60">{t(`wiki.topic.${i}.desc`)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white/70 group-hover:text-white group-hover:gap-2 transition-all">
                {t("wiki.open")} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useI18n();
  return (
    <section id="contact" className="relative py-28">
      <div className="container-fx">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <SectionHeading
            eyebrow={t("contact.eyebrow")}
            titleTemplate={t("contact.title")}
            titleAccent={t("contact.title.accent")}
            subtitle={t("contact.subtitle")}
          />
          <div className="glass rounded-3xl p-8">
            <div className="grid gap-4">
              <a href={socials.email} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition">
                <Mail className="h-5 w-5 text-[oklch(0.72_0.19_165)]" />
                <div>
                  <div className="text-sm font-semibold">{t("contact.email.title")}</div>
                  <div className="text-xs text-white/60">{t("contact.email.sub")}</div>
                </div>
              </a>
              <a href={socials.discord} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#5865F2]/60 transition">
                <DiscordIcon className="h-5 w-5 text-[#8b93ff]" />
                <div>
                  <div className="text-sm font-semibold">{t("contact.discord.title")}</div>
                  <div className="text-xs text-white/60">{t("contact.discord.sub")}</div>
                </div>
              </a>
              <a href={socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/40 transition">
                <Github className="h-5 w-5" />
                <div>
                  <div className="text-sm font-semibold">{t("contact.github.title")}</div>
                  <div className="text-xs text-white/60">{t("contact.github.sub")}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="relative">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Team />
        <News />
        <Careers />
        <Community />
        <Wiki />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
