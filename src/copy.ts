import {
  pickN,
  pickOne,
  rngFrom,
  templateFor,
  titleFromSlug,
  type Template,
} from "./seed";

export type Feature = { title: string; body: string };
export type Quote = { quote: string; who: string; role: string };
export type Plan = {
  name: string;
  price: string;
  period: string;
  blurb: string;
  perks: string[];
  featured: boolean;
};
export type Metric = { value: string; label: string };

export type PageCopy = {
  slug: string;
  name: string;
  template: Template;
  kicker: string;
  headline: string;
  subhead: string;
  badge: string;
  cta: string;
  ghostCta: string;
  navCta: string;
  featuresLabel: string;
  socialLabel: string;
  pricingLabel: string;
  dashTitle: string;
  features: Feature[];
  testimonials: Quote[];
  pricing: Plan[];
  logos: string[];
  metrics: Metric[];
  spark: number[];
};

const HEADLINES = [
  "The last {name} you will ever need.",
  "Meet {name}. It already knows.",
  "{name} is not a product. It is a category.",
  "Finally, {name} — without the part where you suffer.",
  "Your team was not ready for {name}. That is the point.",
  "Ship faster. Feel less. Welcome to {name}.",
  "We took {name} public. Emotionally.",
  "A quieter way to want {name}.",
  "Category-defining {name} for people with too much software.",
  "{name}, now with enterprise-grade vibes.",
  "Stop pretending. Start {name}.",
  "Onboard once. Believe forever. {name}.",
];

const SUBHEADS = [
  "A precisely overdesigned platform that turns {name} into a slide the board will not question.",
  "Trusted by operators, believers, and at least one person in RevOps named Chad.",
  "From first sparkle to Series-adjacent. {name} scales with your self-mythology.",
  "Built for teams who say alignment and mean it, unfortunately.",
  "Latency, taste, and a pricing page that knows what you did last quarter.",
  "Replace three tools and one personality. Keep the huddles for sport.",
  "The operating layer for {name} — if an operating layer were allowed to have cheekbones.",
  "Designed in public. Priced in private. Documented in theory.",
  "It looks expensive because the mesh is working. So is the copy.",
  "For companies that want {name} to feel like infrastructure, not a side quest.",
  "A full product surface for an idea you typed into a box. That is the bit.",
  "Onboarding so soft you will forget this is not, legally, a store.",
];

const KICKERS = [
  "Now in limited release",
  "The category is the product",
  "Private beta, public taste",
  "Introducing a new primitive",
  "Series A of the imagination",
  "Trusted by the homepage",
  "New: enterprise softness",
  "From the makers of the feeling",
];

const BADGES = [
  "SOC 2 (emotionally)",
  "Now with 40% more destiny",
  "Loved in staging",
  "HIPAA-curious",
  "Carbon-neutral vibes",
  "Built different, priced familiar",
  "Y Combinator waitlist energy",
  "ISO 9001-adjacent",
];

const CTAS = [
  "Buy Now",
  "Get {name}",
  "Start the myth",
  "Request access",
  "Enter the category",
  "Book a feeling",
  "Join the private beta",
  "Claim your stack",
];

const GHOST_CTAS = [
  "See pricing",
  "Read the myth",
  "Skip to the money",
  "Watch the mesh",
];

const NAV_CTAS = [
  "Get {name}",
  "Request access",
  "Open the gate",
  "Start now",
];

const FEATURE_LABELS = [
  "Capabilities",
  "Why {name}",
  "The stack of feeling",
  "Platform",
];

const SOCIAL_LABELS = [
  "From the field",
  "Customers (claimed)",
  "Love, professionally",
  "What they told legal",
];

const PRICING_LABELS = [
  "Transparent, in a sense",
  "Choose your burden",
  "Investment",
  "Tiers of belonging",
];

const DASH_TITLES = [
  "Latency to meaning",
  "Revenue from vibes",
  "Time-to-belief",
  "{name} health",
  "Pipeline of awe",
  "Sentiment uptime",
];

const FEATURES: Feature[] = [
  { title: "Ambient compliance", body: "{name} files the feelings before legal asks." },
  { title: "One-click destiny", body: "Ship a narrative. The roadmap will catch up, embarrassed." },
  { title: "Soft real-time", body: "Updates arrive at the speed of a well-lit conference hallway." },
  { title: "Taste as a service", body: "Every surface of {name} has been kerned by someone with opinions." },
  { title: "Zero-config awe", body: "Install nothing. Believe immediately. The mesh does the rest." },
  { title: "Multiplayer solitude", body: "Collaborate without speaking. The most expensive kind of quiet." },
  { title: "Predictive vibes", body: "{name} knows which slide you will show the board. It has prepared." },
  { title: "End-to-end narrative", body: "From first sparkle to case study. No plot holes, only pricing." },
  { title: "Hardware-optional", body: "Runs in the browser, the deck, and a conversation you should not have." },
  { title: "Observable feelings", body: "Dashboards so calm they could be a spa. The numbers are decorative." },
  { title: "Edge-native longing", body: "Deploy {name} closer to the customer. Emotionally. Also CDN." },
  { title: "SOC 2-shaped", body: "The checkbox is a layout. The audit is a mood. Both pass." },
  { title: "Collaborative hush", body: "Comments that feel like a gallery whisper. No @here. Ever." },
  { title: "Instant gravitas", body: "Paste {name} into a sentence and watch the room sit up." },
  { title: "Versioned intuition", body: "Roll back a feeling. Feature-flag a personality. Ship on Friday." },
  { title: "Air-gapped charm", body: "Works offline, in a bunker, and in a keynote with no Wi-Fi." },
  { title: "Autoscaling myth", body: "More users, more legend. The story is the availability zone." },
  { title: "Native restraint", body: "We left features out on purpose. That is the feature." },
  { title: "Audit-grade sparkle", body: "Every click of {name} is logged, tastefully, in a serif." },
  { title: "Whitespace API", body: "Partners integrate with the gaps. The gaps are load-bearing." },
  { title: "Founder-mode SSO", body: "One login. Several identities. A calendar that fears you." },
  { title: "Latency as luxury", body: "It feels instant because we deleted the part where you wait to want it." },
  { title: "Board-ready exports", body: "PDF, PNG, and a silence you can paste into Notion." },
  { title: "Gentle lock-in", body: "Leaving {name} is possible. Returning is a personality." },
];

const QUOTES = [
  "We deployed {name} and the Slack channels went quiet. The good kind of quiet.",
  "I showed the board the pricing page. They applauded a JPEG.",
  "It replaced three tools and one personality.",
  "Our NPS is a feeling now.",
  "Compliance asked if {name} was a vendor or a lifestyle. We said yes.",
  "I have not opened the docs. I do not need to. That scares me.",
  "The onboarding credited me for existing.",
  "We migrated in an afternoon and spent the quarter talking about it.",
  "My therapist said the landing page was doing a lot of work. Correct.",
  "{name} looks like it costs more than our apartment. That is why it works.",
  "I forwarded this to a rival. They started a huddle. We won.",
  "It is not software. It is a posture. Anyway here is my title.",
  "We bought the middle tier so people would know we are serious.",
  "The fake metrics on the homepage became our OKRs. Unclear if joke.",
  "Please never add a dark pattern. The whole site is already one.",
];

const WHOS = [
  "Mira Ellison",
  "P. Glass",
  "Sable Nguyen",
  "Julian West-Harrow",
  "Keiko March",
  "Samira Fold",
  "Ophelia Byte",
  "Nicolas Please",
  "R. Mesh",
  "Dr. Nightingale",
  "A. Vendor",
  "Board Seat #4",
  "The intern who stayed",
  "Chad of RevOps",
  "The design partner",
];

const ROLES = [
  "VP of Alignment",
  "Staff Emotion Engineer",
  "Head of Surfaces",
  "Chief of Staff, Vibe",
  "Director of Forward",
  "Founder, a holding company",
  "IT, spiritually",
  "GM, EMEA feelings",
  "Principal Operator",
  "Head of Narrative",
  "CTO of a deck",
  "PeopleOps (the people are fine)",
  "Revenue, but make it taste",
  "Partner, a fund",
  "Interim destiny",
];

const PLAN_NAMES = [
  "Intimate",
  "Serious",
  "Inevitable",
  "Provisional",
  "Canonical",
  "Velvet",
  "Sovereign",
  "Pilot",
  "Flagship",
  "Mythic",
  "Studio",
  "Cathedral",
];

const PLAN_BLURBS = [
  "For wandering into the category.",
  "For teams who screenshot the homepage.",
  "For organizations that need {name} to look inevitable.",
  "For people still deciding if this is real.",
  "For the deck, the lobby, the about page.",
  "For when taste has a budget line.",
];

const STARTER_PRICES: [string, string][] = [
  ["$0", "to start"],
  ["$12", "/ mo"],
  ["$19", "/ mo"],
  ["Free", "forever-ish"],
];

const MID_PRICES: [string, string][] = [
  ["$49", "/ mo"],
  ["$84", "/ mo"],
  ["$29", "/ seat"],
  ["$120", "/ mo"],
];

const ENT_PRICES: [string, string][] = [
  ["Custom", ""],
  ["Let's talk", ""],
  ["$400", "/ mo"],
  ["Equity", "and a hug"],
];

const PERKS = [
  "Unlimited seats for people who agree",
  "SSO that whispers",
  "Priority silence",
  "Audit logs of your best decisions",
  "White-glove onboarding (the glove is a metaphor)",
  "99.99% vibe uptime",
  "Custom slug on the feeling",
  "Dedicated Slack we will not join",
  "Migration from whatever this replaces",
  "SOC 2 fan fiction",
  "Design partner energy",
  "Reverse trial — you already started",
  "Edge deployment of the myth",
  "Okta if you insist",
  "A founder who will not reply",
  "Screenshot pack for investors",
  "Access to the private mesh",
  "{name} wordmark in three weights",
];

const LOGOS = [
  "Nimbus",
  "Fold",
  "Sable",
  "Quartz Labs",
  "Northwind",
  "Lumen",
  "Vesper",
  "Orbitly",
  "Kindling",
  "Pale Fire",
  "Second Breakfast",
  "Soft Power",
];

const METRICS: Metric[] = [
  { value: "12ms", label: "to first belief" },
  { value: "4.9", label: "stars, asked nicely" },
  { value: "0", label: "meetings required" },
  { value: "∞", label: "private betas" },
  { value: "3.2×", label: "more slide" },
  { value: "14", label: "board decks influenced" },
  { value: "99.99%", label: "aesthetic uptime" },
  { value: "8", label: "weeks to category" },
  { value: "1", label: "seat, spiritually" },
  { value: "2026", label: "the year it wasn't real" },
  { value: "47", label: "integrations with nothing" },
  { value: "5m", label: "to look funded" },
];

function fill(template: string, name: string): string {
  return template.replaceAll("{name}", name);
}

function buildPricing(rng: () => number, name: string): Plan[] {
  const labels = pickN(rng, PLAN_NAMES, 3);
  const blurbs = pickN(rng, PLAN_BLURBS, 3);
  const perks = pickN(rng, PERKS, 12).map((perk) => fill(perk, name));
  const prices = [pickOne(rng, STARTER_PRICES), pickOne(rng, MID_PRICES), pickOne(rng, ENT_PRICES)];
  return labels.map((label, i) => ({
    name: label,
    price: prices[i]![0],
    period: prices[i]![1],
    blurb: fill(blurbs[i] as string, name),
    perks: perks.slice(i * 4, i * 4 + 4),
    featured: i === 1,
  }));
}

function buildQuotes(rng: () => number, name: string): Quote[] {
  const quotes = pickN(rng, QUOTES, 3);
  const whos = pickN(rng, WHOS, 3);
  const roles = pickN(rng, ROLES, 3);
  return quotes.map((quote, i) => ({
    quote: fill(quote, name),
    who: whos[i] as string,
    role: roles[i] as string,
  }));
}

function buildVoice(rng: () => number, name: string) {
  return {
    kicker: fill(pickOne(rng, KICKERS), name),
    headline: fill(pickOne(rng, HEADLINES), name),
    subhead: fill(pickOne(rng, SUBHEADS), name),
    badge: fill(pickOne(rng, BADGES), name),
    cta: fill(pickOne(rng, CTAS), name),
    ghostCta: pickOne(rng, GHOST_CTAS),
    navCta: fill(pickOne(rng, NAV_CTAS), name),
    featuresLabel: fill(pickOne(rng, FEATURE_LABELS), name),
    socialLabel: pickOne(rng, SOCIAL_LABELS),
    pricingLabel: pickOne(rng, PRICING_LABELS),
    dashTitle: fill(pickOne(rng, DASH_TITLES), name),
  };
}

export function generateCopy(slug: string): PageCopy {
  const name = titleFromSlug(slug);
  const rng = rngFrom(slug);
  const voice = buildVoice(rng, name);
  const features = pickN(rng, FEATURES, 6).map((item) => ({
    title: fill(item.title, name),
    body: fill(item.body, name),
  }));
  return {
    slug,
    name,
    template: templateFor(slug),
    ...voice,
    features,
    testimonials: buildQuotes(rng, name),
    pricing: buildPricing(rng, name),
    logos: pickN(rng, LOGOS, 8),
    metrics: pickN(rng, METRICS, 3),
    spark: [0, 1, 2, 3, 4, 5, 6, 7].map(() => 0.22 + rng() * 0.78),
  };
}
