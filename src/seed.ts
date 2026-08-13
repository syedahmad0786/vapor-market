export type Theme = "light" | "dark";
export type HeroAlign = "left" | "center" | "right" | "split" | "stack" | "left-huge";
export type Accent = "violet" | "cyan" | "coral" | "gold" | "teal" | "magenta";

export type Template = {
  index: number;
  name: string;
  theme: Theme;
  hero: HeroAlign;
  accent: Accent;
};

export const TEMPLATES: readonly Template[] = [
  { index: 0, name: "aether", theme: "light", hero: "left", accent: "violet" },
  { index: 1, name: "obsidian", theme: "dark", hero: "center", accent: "cyan" },
  { index: 2, name: "aurora", theme: "light", hero: "right", accent: "coral" },
  { index: 3, name: "gilded", theme: "dark", hero: "split", accent: "gold" },
  { index: 4, name: "mist", theme: "light", hero: "stack", accent: "teal" },
  { index: 5, name: "pulse", theme: "dark", hero: "left-huge", accent: "magenta" },
];

export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function rngFrom(input: string): () => number {
  let a = hashString(input) || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickIndex(rng: () => number, modulo: number): number {
  if (modulo <= 0) return 0;
  return Math.floor(rng() * modulo);
}

export function pickOne<T>(rng: () => number, items: readonly T[]): T {
  return items[pickIndex(rng, items.length)] as T;
}

export function pickN<T>(rng: () => number, items: readonly T[], n: number): T[] {
  const bag = items.slice();
  for (let i = bag.length - 1; i > 0; i -= 1) {
    const j = pickIndex(rng, i + 1);
    const tmp = bag[i] as T;
    bag[i] = bag[j] as T;
    bag[j] = tmp;
  }
  return bag.slice(0, Math.min(n, bag.length));
}

export function slugify(raw: string): string {
  return raw
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}

export function templateFor(slug: string): Template {
  const idx = hashString(slug) % TEMPLATES.length;
  return TEMPLATES[idx] as Template;
}

export function readProductParam(): string {
  const raw = new URLSearchParams(window.location.search).get("p");
  return raw ? slugify(raw) : "";
}
