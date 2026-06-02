/* global React, ArchiveCube */
// Archive v1 — pages, focused on the 4 LANDING VARIANTS (the thing being archived).
// Non-landing routes (about/case/resume) link back to the current site.

// All cases/about/resume route through ../index.html to keep the archive small.
const toMain = (path) => `../index.html#${path}`;

function LandingA({ onNavigate }) {
  return (
    <div className="landing-a">
      <div className="landing-a__status">
        <span>Stockholm · 2026</span>
        <span>Drag the cube ↓</span>
        <span>Open to roles</span>
      </div>
      <div className="cube-stage">
        <ArchiveCube onNavigate={onNavigate} />
        <div className="cube-stage__hint">
          <span className="dot"></span> Drag, scroll or use arrow keys
        </div>
      </div>
    </div>
  );
}

function LandingB({ onNavigate }) {
  return (
    <div className="landing-b">
      <div>
        <h1 className="landing-b__lede">
          Leo Stider — UX-design, <em>Stockholm</em>.
        </h1>
        <div className="landing-b__meta">
          <div className="landing-b__row"><span className="pip"></span> Currently designing at inamo</div>
          <div className="landing-b__row"><span className="pip"></span> Selected work 2023 — 2025</div>
          <div className="landing-b__row"><span className="pip"></span> Available for senior roles</div>
        </div>
      </div>
      <div className="landing-b__cubebox">
        <ArchiveCube onNavigate={onNavigate} size={320} />
      </div>
    </div>
  );
}

function LandingC({ onNavigate }) {
  return (
    <div className="landing-c">
      <div className="landing-c__head">
        <span>Leo Stider · Stockholm</span>
        <span>2026 — open to roles</span>
      </div>
      <h2 className="landing-c__giant">UX-design that listens first, ships second.</h2>
      <div className="landing-c__stage">
        <ArchiveCube onNavigate={onNavigate} />
      </div>
      <div className="landing-c__foot">
        <span>Drag the cube to explore →</span>
        <span>06 sides · 06 ways in</span>
      </div>
    </div>
  );
}

function LandingD({ onNavigate }) {
  const cases = [
    { id: "inamo",   year: "2025", kind: "Research", title: "Mapping inamo's user-testing platform" },
    { id: "arcledi", year: "2024", kind: "Product",  title: "Concept design for two SaaS products" },
    { id: "chas",    year: "2023", kind: "Concept",  title: "Service design for Chas Academy" },
  ];
  return (
    <div className="landing-d">
      <div className="landing-d__left">
        <ArchiveCube onNavigate={onNavigate} size={300} />
      </div>
      <aside className="landing-d__right">
        <div className="landing-d__rhead">
          <span>Selected work</span>
          <span>2023 — 2025</span>
        </div>
        <div className="landing-d__list">
          {cases.map(c => (
            <a key={c.id} className="landing-d__item" href={toMain(`case/${c.id}`)}>
              <span className="landing-d__item__meta">{c.year} · {c.kind}</span>
              <span className="landing-d__item__title">{c.title}</span>
              <span className="landing-d__item__arrow">→</span>
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}

function ArchiveLanding({ variant, onNavigate }) {
  if (variant === "B") return <LandingB onNavigate={onNavigate} />;
  if (variant === "C") return <LandingC onNavigate={onNavigate} />;
  if (variant === "D") return <LandingD onNavigate={onNavigate} />;
  return <LandingA onNavigate={onNavigate} />;
}

window.ArchiveLanding = ArchiveLanding;
window.toMain = toMain;
