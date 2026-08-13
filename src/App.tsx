import { useEffect, useMemo, useState } from "react";
import { Landing } from "./Landing";
import { generateCopy, type PageCopy, type Plan } from "./copy";
import { hashString, readProductParam, slugify } from "./seed";

function setQuery(slug: string) {
  const url = new URL(window.location.href);
  if (!slug) url.searchParams.delete("p");
  else url.searchParams.set("p", slug);
  window.history.pushState({ p: slug }, "", url);
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [slug, setSlug] = useState(readProductParam);
  const [buying, setBuying] = useState(false);
  const page = useMemo(() => (slug ? generateCopy(slug) : null), [slug]);

  useEffect(() => {
    const onPop = () => setSlug(readProductParam());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => syncDocument(page), [page]);

  const invent = (raw: string) => {
    const next = slugify(raw);
    if (!next) return;
    setBuying(false);
    setQuery(next);
    setSlug(next);
    window.scrollTo(0, 0);
  };

  if (!page) return <Landing onInvent={invent} />;

  return (
    <ProductSite
      page={page}
      buying={buying}
      onBuy={() => setBuying(true)}
      onClose={() => setBuying(false)}
      onReset={() => {
        setBuying(false);
        setQuery("");
        setSlug("");
      }}
    />
  );
}

function syncDocument(page: PageCopy | null) {
  if (!page) {
    document.title = "Vapor Market";
    document.body.className = "is-invent";
    return;
  }
  document.title = page.name;
  document.body.className = `is-site theme-${page.template.theme}`;
  const url = new URL(window.location.href);
  if (url.searchParams.get("p") !== page.slug) {
    url.searchParams.set("p", page.slug);
    window.history.replaceState({ p: page.slug }, "", url);
  }
}

type SiteProps = {
  page: PageCopy;
  buying: boolean;
  onBuy: () => void;
  onClose: () => void;
  onReset: () => void;
};

function ProductSite({ page, buying, onBuy, onClose, onReset }: SiteProps) {
  const t = page.template;
  return (
    <div
      className="site"
      data-theme={t.theme}
      data-hero={t.hero}
      data-accent={t.accent}
      data-layout={t.name}
    >
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="site-content">
        <SiteNav page={page} onBuy={onBuy} />
        <Hero page={page} onBuy={onBuy} />
        <LogoMarquee logos={page.logos} />
        <Metrics metrics={page.metrics} />
        <Features page={page} />
        <Testimonials page={page} />
        <Pricing page={page} onBuy={onBuy} />
        <CtaBand page={page} onBuy={onBuy} />
        <SiteFooter name={page.name} />
      </div>
      <button type="button" className="invent-chip" onClick={onReset}>
        invent another
      </button>
      <BuyModal open={buying} onClose={onClose} />
    </div>
  );
}

function ProductMark({ slug, size = 28 }: { slug: string; size?: number }) {
  const h = hashString(slug);
  const cx = 8 + (h % 8);
  const cy = 8 + ((h >> 4) % 10);
  const x = 14 + ((h >> 8) % 8);
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="currentColor" opacity="0.14" />
      <circle cx={cx} cy={cy} r="5.5" fill="currentColor" />
      <rect x={x} y={16 - (h % 6)} width="11" height="11" rx="3" fill="currentColor" opacity="0.88" />
    </svg>
  );
}

function SiteNav({ page, onBuy }: { page: PageCopy; onBuy: () => void }) {
  return (
    <header className="nav">
      <div className="brand">
        <ProductMark slug={page.slug} />
        <span>{page.name}</span>
      </div>
      <nav>
        <button type="button" onClick={() => scrollToId("features")}>
          Product
        </button>
        <button type="button" onClick={() => scrollToId("customers")}>
          Customers
        </button>
        <button type="button" onClick={() => scrollToId("pricing")}>
          Pricing
        </button>
      </nav>
      <button type="button" className="btn-nav" onClick={onBuy}>
        {page.navCta}
      </button>
    </header>
  );
}

function Hero({ page, onBuy }: { page: PageCopy; onBuy: () => void }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="badge">{page.badge}</p>
        <p className="kicker">{page.kicker}</p>
        <h1 className="headline">{page.headline}</h1>
        <p className="subhead">{page.subhead}</p>
        <div className="hero-actions">
          <button type="button" className="btn-primary" onClick={onBuy}>
            {page.cta}
          </button>
          <button type="button" className="btn-ghost" onClick={() => scrollToId("pricing")}>
            {page.ghostCta}
          </button>
        </div>
      </div>
      <HeroVisual page={page} />
    </section>
  );
}

function HeroVisual({ page }: { page: PageCopy }) {
  return (
    <div className="hero-visual">
      <div className="orb" aria-hidden="true" />
      <div className="device glass">
        <div className="device-top">
          <span className="dots" aria-hidden="true" />
          <span>{page.dashTitle}</span>
        </div>
        <div className="spark" aria-hidden="true">
          {page.spark.map((n, i) => (
            <span key={i} style={{ height: `${Math.round(n * 100)}%` }} />
          ))}
        </div>
        <p className="device-note">All systems ornamental</p>
      </div>
    </div>
  );
}

function LogoMarquee({ logos }: { logos: string[] }) {
  const row = [...logos, ...logos];
  return (
    <section className="marquee" aria-label="Alleged customers">
      <p className="marquee-label">Observed in the wild at</p>
      <div className="marquee-mask">
        <div className="marquee-track">
          {row.map((logo, i) => (
            <span key={`${logo}-${i}`} className="logo-item">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metrics({ metrics }: { metrics: PageCopy["metrics"] }) {
  return (
    <section className="metrics">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric">
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </section>
  );
}

function Features({ page }: { page: PageCopy }) {
  return (
    <section className="section" id="features">
      <p className="kicker">{page.featuresLabel}</p>
      <h2>Everything {page.name} pretends to be.</h2>
      <div className="feature-grid">
        {page.features.map((feature, i) => (
          <article key={feature.title} className="glass feature">
            <span className="feat-mark" data-i={i} aria-hidden="true" />
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ page }: { page: PageCopy }) {
  return (
    <section className="section" id="customers">
      <p className="kicker">{page.socialLabel}</p>
      <h2>They would buy it, if they could.</h2>
      <div className="quote-grid">
        {page.testimonials.map((item) => (
          <blockquote key={item.who} className="glass quote">
            <p>“{item.quote}”</p>
            <footer>
              <span className="avatar" aria-hidden="true">
                {item.who.slice(0, 1)}
              </span>
              <span>
                <strong>{item.who}</strong>
                {item.role}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function Pricing({ page, onBuy }: { page: PageCopy; onBuy: () => void }) {
  return (
    <section className="section" id="pricing">
      <p className="kicker">{page.pricingLabel}</p>
      <h2>A price for every self-mythology.</h2>
      <div className="price-grid">
        {page.pricing.map((plan) => (
          <PlanCard key={plan.name} plan={plan} onBuy={onBuy} />
        ))}
      </div>
      <p className="fineprint">Prices are decorative. So is the product.</p>
    </section>
  );
}

function PlanCard({ plan, onBuy }: { plan: Plan; onBuy: () => void }) {
  return (
    <article className={`glass plan${plan.featured ? " featured" : ""}`}>
      {plan.featured ? <p className="plan-flag">Most believed</p> : null}
      <h3>{plan.name}</h3>
      <p className="plan-price">
        {plan.price}
        {plan.period ? <small> {plan.period}</small> : null}
      </p>
      <p className="plan-blurb">{plan.blurb}</p>
      <ul>
        {plan.perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>
      <button type="button" className={plan.featured ? "btn-primary" : "btn-ghost"} onClick={onBuy}>
        Buy Now
      </button>
    </article>
  );
}

function CtaBand({ page, onBuy }: { page: PageCopy; onBuy: () => void }) {
  return (
    <section className="cta-band glass">
      <h2>Ready to deploy {page.name}?</h2>
      <p>You are not. That is fine. The button still works.</p>
      <button type="button" className="btn-primary" onClick={onBuy}>
        Buy Now
      </button>
    </section>
  );
}

function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="site-foot">
      <span>
        © 2026 {name} Labs · not a company ·{" "}
        <a href="https://fun-toys.vercel.app">a Fun Toy</a>
      </span>
      <span className="tiny-ring">
        <a href="https://plot-armor.vercel.app">prev</a>
        <a href="https://grandiose.vercel.app">next</a>
      </span>
    </footer>
  );
}

function BuyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-back" onClick={onClose} role="presentation">
      <div
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="buy-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="kicker">Checkout</p>
        <h2 id="buy-title">This product does not exist.</h2>
        <p>You cannot buy it.</p>
        <p>The feeling was the product.</p>
        <button type="button" className="btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
