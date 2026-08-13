import { useState, type FormEvent } from "react";
import { slugify } from "./seed";

type LandingProps = {
  onInvent: (slug: string) => void;
};

const EXAMPLES = [
  "sentient toaster",
  "ethical fog",
  "tuesday as a service",
  "pocket cathedral",
  "a quieter ambition",
];

export function Landing({ onInvent }: LandingProps) {
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const slug = slugify(draft);
    if (!slug) {
      setHint("Give it a name. Even a bad one.");
      return;
    }
    onInvent(slug);
  };

  return (
    <div className="invent">
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <main className="invent-inner">
        <p className="kicker">FT–004 · fake commerce studio</p>
        <h1>Invent a product</h1>
        <p className="lede">
          Type any object, concept, or nonsense phrase. Receive a full polished
          landing page that could almost raise a round.
        </p>
        <form className="invent-form" onSubmit={submit}>
          <label className="sr-only" htmlFor="product">
            Product name
          </label>
          <input
            id="product"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (hint) setHint("");
            }}
            placeholder="sentient toaster, ethical fog, tuesday…"
            autoComplete="off"
            autoFocus
          />
          <button type="submit">Manifest</button>
        </form>
        {hint ? <p className="hint">{hint}</p> : null}
        <div className="examples">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              className="example"
              onClick={() => onInvent(slugify(example))}
            >
              {example}
            </button>
          ))}
        </div>
      </main>
      <footer className="webring">
        <a href="https://fun-toys-alpha.vercel.app">a Fun Toy</a>
        <span>·</span>
        <a href="https://plot-armor-livid.vercel.app">prev</a>
        <a href="https://grandiose-seven.vercel.app">next</a>
      </footer>
    </div>
  );
}
