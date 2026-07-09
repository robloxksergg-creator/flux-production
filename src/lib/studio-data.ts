import {
  Code2,
  Boxes,
  GraduationCap,
  Package,
  Wrench,
  Crown,
  Cpu,
  Server,
  Palette,
  Brush,
  PenTool,
  Hammer,
  Users,
  Terminal,
} from "lucide-react";

export type Project = {
  id: string;
  name: string;
  tag: string;
  status: "Live" | "Beta" | "In Development" | "Open Source";
  description: string;
  icon: typeof Code2;
  accent: string;
  href: string;
};

export const projects: Project[] = [
  {
    id: "nexus-sky",
    name: "NexusSky",
    tag: "Flagship Server",
    status: "In Development",
    description:
      "A next-generation Minecraft RPG universe with custom classes, sprawling open worlds, and a hand-crafted narrative engine.",
    icon: Boxes,
    accent: "from-violet-500/40 to-fuchsia-500/10",
    href: "#projects",
  },
  {
    id: "flux-api",
    name: "Flux API",
    tag: "Developer Platform",
    status: "Open Source",
    description:
      "A modern high-performance API framework for Minecraft plugins. Type-safe, async-first, built for scale.",
    icon: Code2,
    accent: "from-sky-500/40 to-cyan-500/10",
    href: "#projects",
  },
  {
    id: "flux-academy",
    name: "Flux Academy",
    tag: "Education & Content",
    status: "Live",
    description:
      "New training tracks, tutorials and content drops for players and builders. Weekly updates, guides and hands-on lessons.",
    icon: GraduationCap,
    accent: "from-emerald-500/40 to-teal-500/10",
    href: "#projects",
  },
  {
    id: "resource-packs",
    name: "Resource Packs",
    tag: "Art & Assets",
    status: "Live",
    description:
      "Curated resource and shader packs designed in-house by our art team. Free for the community.",
    icon: Package,
    accent: "from-amber-500/40 to-orange-500/10",
    href: "#projects",
  },
  {
    id: "internal-tools",
    name: "Internal Tools",
    tag: "Studio Suite",
    status: "In Development",
    description:
      "Custom tooling powering our studio — build pipelines, telemetry, dashboards, and deployment automation.",
    icon: Wrench,
    accent: "from-rose-500/40 to-pink-500/10",
    href: "#projects",
  },
];

export type SocialKind = "telegram" | "discord" | "github" | "site" | "twitch" | "boosty";
export type MemberLink = { kind: SocialKind; url: string; label: string };

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  icon: typeof Crown;
  color: string;
  links: MemberLink[];
};

const DISCORD = "https://discord.gg/sTK4KPU249";

export const team: TeamMember[] = [
  {
    name: "Aetheris",
    role: "Founder",
    bio: "Sets the direction. Obsessed with world-building and clean architecture.",
    icon: Crown,
    color: "from-amber-400 to-orange-500",
    links: [
      { kind: "telegram", url: "https://t.me/+1m1quNF_yqBkZjky", label: "Telegram" },
      { kind: "discord", url: "https://discord.com/users/778573795501408256", label: "Discord" },
    ],
  },
  {
    name: "Nyxus",
    role: "Lead Developer",
    bio: "Architects the core systems that everything else runs on top of.",
    icon: Cpu,
    color: "from-violet-400 to-fuchsia-500",
    links: [
      { kind: "discord", url: "https://discord.com/users/1139992120007086140", label: "Discord" },
    ],
  },
  {
    name: "Kaiden",
    role: "Backend Developer",
    bio: "Distributed systems, low-latency networking and database wizardry.",
    icon: Server,
    color: "from-sky-400 to-cyan-500",
    links: [
      { kind: "discord", url: DISCORD, label: "Discord" },
    ],
  },
  {
    name: "Luma",
    role: "Frontend Developer",
    bio: "Crafts every pixel of the launcher and web experiences.",
    icon: Terminal,
    color: "from-emerald-400 to-teal-500",
    links: [
      { kind: "discord", url: DISCORD, label: "Discord" },
    ],
  },
  {
    name: "Orion",
    role: "3D Artist",
    bio: "Sculpts models, animations and cinematic scenes for our worlds.",
    icon: Palette,
    color: "from-rose-400 to-pink-500",
    links: [
      { kind: "site", url: "https://al-cva.pages.dev/portfolio", label: "Portfolio" },
      { kind: "discord", url: "https://discord.com/users/490492268063490058", label: "Discord" },
    ],
  },
  {
    name: "Vera",
    role: "UI / UX Designer",
    bio: "Turns complex tooling into intuitive, delightful interfaces.",
    icon: PenTool,
    color: "from-indigo-400 to-blue-500",
    links: [
      { kind: "discord", url: DISCORD, label: "Discord" },
    ],
  },
  {
    name: "Rook",
    role: "Builder",
    bio: "Master builder behind every landmark, dungeon and city we ship.",
    icon: Hammer,
    color: "from-lime-400 to-green-500",
    links: [
      { kind: "discord", url: DISCORD, label: "Discord" },
    ],
  },
  {
    name: "Sable",
    role: "Community Manager",
    bio: "Keeps the Discord alive and the feedback loop tight.",
    icon: Users,
    color: "from-fuchsia-400 to-purple-500",
    links: [
      { kind: "discord", url: DISCORD, label: "Discord" },
    ],
  },
];

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  gradient: string;
};

export const news: NewsItem[] = [
  {
    id: "nexus-alpha",
    title: "NexusSky enters closed alpha",
    category: "Announcement",
    date: "Mar 12, 2026",
    excerpt:
      "After two years of internal iteration, our flagship RPG is opening its doors to the first wave of testers.",
    gradient: "from-violet-600/60 via-fuchsia-500/30 to-transparent",
  },
  {
    id: "flux-api-v2",
    title: "Flux API 2.0 — a full rewrite",
    category: "Engineering",
    date: "Feb 24, 2026",
    excerpt:
      "Async-first, strictly typed, and 8× faster on hot paths. Here is what changed and why we rebuilt from scratch.",
    gradient: "from-sky-600/60 via-cyan-500/30 to-transparent",
  },
  {
    id: "academy-launch",
    title: "Flux Academy — training & new content",
    category: "Product",
    date: "Feb 03, 2026",
    excerpt:
      "We are shipping training tracks, tutorials and a steady stream of new content for players and builders.",
    gradient: "from-emerald-600/60 via-teal-500/30 to-transparent",
  },
];

export type JobOpening = {
  title: string;
  team: string;
  location: string;
  type: string;
  description: string;
};

export const jobs: JobOpening[] = [
  {
    title: "Senior Minecraft Plugin Developer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Own core gameplay systems for NexusSky. Deep Paper / Folia expertise and strong Kotlin or Java required.",
  },
  {
    title: "3D Environment Artist",
    team: "Art",
    location: "Remote",
    type: "Contract",
    description:
      "Design and model landmark biomes, dungeons and props at AAA fidelity within the Minecraft aesthetic.",
  },
  {
    title: "DevOps Engineer",
    team: "Platform",
    location: "Remote",
    type: "Full-time",
    description:
      "Own our CI/CD, telemetry and server orchestration. Kubernetes, Terraform and observability at scale.",
  },
  {
    title: "Community Moderator",
    team: "Community",
    location: "Remote",
    type: "Part-time",
    description:
      "Support our Discord, run community events, and keep our space welcoming and safe.",
  },
];

export const stats = [
  { label: "Active Projects", value: 1 },
  { label: "Developers", value: 5 },
  { label: "Community Members", value: 50, suffix: "+" as const },
  { label: "Commits Shipped", value: 98, suffix: "+" as const },
];

export const socials = {
  discord: DISCORD,
  github: "https://github.com/fluxproduction",
  twitter: "https://twitter.com/fluxproduction",
  email: "mailto:hello@fluxproduction.dev",
};
