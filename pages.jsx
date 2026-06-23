/* global React, Cube */
// pages.jsx — all page bodies: landing variants, about, case studies, résumé.

const { useState: useStateP } = React;

// ============================================================
// LANDING — the draggable 3D cube is the menu.
// ============================================================

function Landing({ onNavigate, idleSpin = true, momentum = 0.94, aboutEmphasis = "accent", drift = 26 }) {
  return (
    <div className="landing-a">
      <div className="landing-a__status">
        <span>Stockholm · 2026</span>
        <span>Drag the cube to explore →</span>
        <span>Open to roles</span>
      </div>
      <div className="cube-stage">
        <Cube onNavigate={onNavigate} idleSpin={idleSpin} momentum={momentum} aboutEmphasis={aboutEmphasis} drift={drift} />
        <div className="cube-stage__hint">
          <span className="dot"></span> Drag to rotate · release to glide
        </div>
      </div>
    </div>);

}

// ============================================================
// ABOUT
// ============================================================

function About({ onNavigate }) {
  return (
    <div className="about">
      <div className="about__portrait">
        <img src="assets/portrait.png" alt="Leo Stider on the rocks, with a lime sky." />
      </div>
      <div className="about__text">
        <div className="eyebrow">About · 01</div>
        <h1>Hi, I'm Leo — a <em>UX-designer</em> based in Stockholm.</h1>
        <p>I've wanted to work with design all my life. I didn't realize it until I started my UX-design education at Chas Academy in 2023.</p>
        <p>I believe a great UX-designer is one who has a real understanding of their user, and the fundamentals and creativity to turn that understanding into a clear solution - FAST, thanks to AI-software.</p>
        <p>I also think a lot about people's time — including yours. That's why this site is short: a few clear points instead of a wall of text. If something here raises a question, ask — I'll happily go as deep as you want.</p>
        <p>I value empathy, openness, honesty and humor (obviously).</p>
        <div className="about__values">
          <span className="chip">Research</span>
          <span className="chip">Prototyping</span>
          <span className="chip">Service design</span>
          <span className="chip">Workshops</span>
          <span className="chip">Accessibility</span>
        </div>
      </div>
    </div>);

}

// ============================================================
// CASE STUDIES
// ============================================================

const CASES = {
  inamo: {
    eyebrow: "Research · 2025",
    title: "inamo — mapping a remote user-testing platform.",
    meta: [
    ["Role", "UX Researcher"],
    ["Team", "Solo + 2 PMs"],
    ["Year", "Feb — May 2025"],
    ["Output", "Roadmap"]],

    cover: "lav",
    sections: [
    {
      h: "Summary",
      body: [
      "inamo (formerly Feedbackfrog) recently launched a platform that combines video conferencing, screening, recording, and transcription for remote user-testing. The platform was powerful, but the experience didn't fully meet the needs of its primary users — UX designers.",
      "I spoke directly with designers about their workflows, the friction they felt, and what they expected from the tool. Their insights revealed clear pain points and concrete opportunities.",
      "I turned those findings into a prioritized roadmap of design and feature updates — focused on changes that were both practical and cost-efficient — to help inamo strengthen usability and better serve its users."]

    },
    {
      h: "Background",
      body: [
      "I started with a competitor analysis — comparing key features across rival platforms and examining how each positioned itself through its branding."],

      highlight: {
        title: "Features observed across competitors",
        items: [
        "Transcription, playlists, and video export, with data analysis, heat-mapping, and card sorting.",
        "Reporting and dashboards with visualizations — one metric shown is average time per task.",
        "Tagged responses for organizing and analyzing insights post-test.",
        "Concept-testing and quick (48-hour) surveys to gather feedback on iteration proposals.",
        "Diary studies for tracking unboxing experiences or mapping customer journeys.",
        "Build-your-own panels of test participants.",
        "Smart filtering on playlists — search keywords across video clips to find every mention."]

      }
    },
    {
      h: "Strategy",
      body: [
      "I intentionally kept the research scope broad rather than narrowly defined. With no prior UX research available, there was limited qualitative insight into what users actually valued. At this stage, the goal was to explore widely, uncover real user needs, and identify areas worth investigating deeper."]

    },
    {
      h: "Method",
      body: [
      "I conducted semi-structured interviews with UX designers — a method that gives both broad understanding of motivations and pain points while leaving room for deeper exploration when participants react emotionally to a topic.",
      "Across five interviews I gathered 58 findings. I analyzed and organized them into 15 recurring themes, tagging each finding with an ID for traceability.",
      "During discovery I used AI for transcribing interviews, generating interview-guide ideas, and managing large volumes of text."],

      quote: {
        text: "But it also requires clear instructions, and you can't ask follow-up questions. It's a tradeoff. For certain types of tests — first impressions, navigation — unmoderated works very well. But when you want to understand why someone thinks a certain way, moderated is better.",
        attr: "A2F4"
      }
    },
    {
      h: "Result",
      body: [
      "When categorizing insights I focused on the patterns the data revealed, rather than forcing them back through my original research questions. This kept the study open, and the resulting insights stayed close to what users actually felt. Each insight included a hypothesis suggesting how inamo could improve the product to match that need."],

      tags: ["Pain point", "Unmoderated", "In-/experience"]
    },
    {
      h: "Roadmap",
      body: [
      "These insights — paired with an understanding of the company's vision and financial capacity — were translated into a roadmap outlining how to prioritize further development of the product in a way that maximizes usability while balancing cost-efficiency and revenue potential.",
      "The final roadmap presented to the company included ten recommendations — eight of which were directly tied to the digital product. These highlighted which development initiatives should be prioritized moving forward.",
      "Thanks for reading.  — Leo"]

    }],

    next: "aiportfolio"
  },
  aiportfolio: {
    eyebrow: "Product · 2026",
    title: "AI portfolio redesign — rebuilding this site with Claude.",
    meta: [
    ["Role", "Designer + builder"],
    ["Tools", "Claude Code, Claude"],
    ["Year", "2026"],
    ["Output", "This site"]],

    cover: "ink",
    sections: [
    {
      h: "Summary",
      body: [
      "My previous portfolio lived in Framer. It worked, but I wanted to practice building with AI tools — so I rebuilt it from scratch.",
      "I used Claude to develop the design system and Claude Code to handle the front-end. The result is a tighter, more polished version of my old portfolio: same visual instincts, sharper execution, full ownership of the code."]

    },
    {
      h: "Why I rebuilt it",
      body: [
      "To keep my skills relevant. AI-assisted design and development is where the market is heading, and I'd rather learn by doing than watch from the side. Rebuilding something I already knew well meant I could focus entirely on the workflow, not the problem."]

    },
    {
      h: "Process",
      body: [
      "I treated Claude the way I'd treat a developer: describing intent, reviewing output, iterating fast. The design system came first — one accent, one typeface, straight lines — then I built against it.",
      "The process was largely frictionless. The few obstacles I hit were resolved quickly with Claude's help. That speed compounded: faster iteration meant more attempts, more attempts meant a better result. Claude Code handled React, hash routing, and cube physics. I stayed focused on hierarchy, motion, copy, and restraint."],

      tags: ["Claude Code", "Design system", "Prototype"]
    },
    {
      h: "The cube",
      body: [
      "Not strictly necessary — but a portfolio is often a recruiter's first interaction with how you think about interaction. A tactile, memorable navigation element is a deliberate choice: I care about feel, not just function, and I'm willing to commit to that even when the safe option exists."]

    },
    {
      h: "Result",
      body: [
      "A portfolio I actually own, and a clearer picture of what AI can do in a design workflow. Honestly — it can handle a lot. But that's not a threat to the role, it's an opportunity: when AI absorbs the execution, designers get more time for the thing that actually drives better products — talking to users."]

    }],

    next: "inamo"
  }
};

function CaseStudy({ id, onNavigate }) {
  const c = CASES[id] || CASES.inamo;
  return (
    <article className="case">
      <div className="case__eyebrow">{c.eyebrow}</div>
      <h1 className="case__title">{c.title}</h1>
      <div className="case__meta">
        {c.meta.map(([k, v], i) =>
        <div key={i}>
            <span className="case__meta-key">{k}</span>
            <span className="case__meta-val">{v}</span>
          </div>
        )}
      </div>

      <div className={`case__cover case__cover--${c.cover}`}>Cover placeholder · {c.eyebrow}</div>

      {c.sections.map((s, i) =>
      <section className="case__section" key={i}>
          <h2>{s.h}</h2>
          {s.body.map((p, j) => <p key={j}>{p}</p>)}
          {s.highlight &&
        <div className="case__highlight" style={{ marginTop: 24 }}>
              <h4>{s.highlight.title}</h4>
              <ul>{s.highlight.items.map((it, k) => <li key={k}>{it}</li>)}</ul>
            </div>
        }
          {s.quote &&
        <blockquote className="case__quote">
              "{s.quote.text}"
              <span className="case__quote-attr">— {s.quote.attr}</span>
            </blockquote>
        }
          {s.tags &&
        <div className="case__tags">
              {s.tags.map((t, k) =>
          <span key={k} className={`case__tag ${k === 0 ? 'case__tag--ink' : k === 2 ? 'case__tag--accent' : ''}`}>{t}</span>
          )}
            </div>
        }
        </section>
      )}

      <a className="case__next" onClick={() => onNavigate("case", c.next)}>
        <div>
          <span className="case__next-key">Next case</span>
          <span className="case__next-title">{CASES[c.next]?.title.split(" — ")[0]}</span>
        </div>
        <span style={{ fontSize: 28 }}>→</span>
      </a>
    </article>);

}

// ============================================================
// WORK INDEX
// ============================================================

function WorkIndex({ onNavigate }) {
  const cases = [
  { id: "inamo", year: "2025", kind: "Research", title: "Mapping inamo's user-testing platform" },
  { id: "aiportfolio", year: "2026", kind: "Product", title: "AI portfolio redesign — rebuilt with Claude" }];

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(40px, 6vw, 96px) var(--gutter)" }}>
      <div className="eyebrow" style={{ marginBottom: 16 }}>Selected work · 2025 — 2026</div>
      <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 48 }}>
        Things I designed, researched, and shipped.
      </h1>
      <div className="pds-rows">
        {cases.map((c) =>
        <a key={c.id} className="pds-row" onClick={() => onNavigate("case", c.id)} style={{ cursor: 'pointer' }}>
            <div className="pds-row__body">
              <div className="pds-row__meta">
                <span>{c.year}</span>
                <span className="pds-row__meta-sep">·</span>
                <span>{c.kind}</span>
              </div>
              <div className="pds-row__title">{c.title}</div>
            </div>
            <button className="pds-row__cue">View case →</button>
          </a>
        )}
      </div>
    </div>);

}

// ============================================================
// RÉSUMÉ — content matches the user's PDF résumé
// ============================================================

function Resume() {
  return (
    <div className="resume__stage">
<article className="resume">
        <div className="resume__head">
          <h1 className="resume__name">LEO STIDER</h1>
          <div className="resume__contact">
            <a href="mailto:lestider@gmail.com" target="_blank" rel="noopener noreferrer">lestider@gmail.com</a>{" | "}<a href="tel:+46720116696" target="_blank" rel="noopener noreferrer">(+46) 720 11 66 96</a>{" | "}<a href="https://www.linkedin.com/in/leo-stider-0b781028b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="resume__read">[READ: 45 SEC]</div>

        <h2>Experience</h2>

        <div className="resume__entry">
          <h3>inamo (Feedbackfrog) — Market and user-research</h3>
          <span className="when">Feb 2025 – May 2025</span>
          <p>Mapping out product and researching market with the purpose of creating a prioritized roadmap — considering ROI, usability and user input — to guide further development of the digital product.</p>
          <p>Project included: assessment of product, competitor analysis, researching features, desktop research on testing methods, user interviews, AI-analysis and affinity mapping.</p>
        </div>

        <div className="resume__entry">
          <h3>Arcledi OÜ — Developing product</h3>
          <span className="when">Oct 2024 – Feb 2025</span>
          <p>Managing project of developing concept design for two SaaS products.</p>
          <p>Project included: research, market analysis, persona creation, experimental AI-refinement, sketching and wireframes.</p>
        </div>

        <h2>Education</h2>

        <div className="resume__entry">
          <h3>Chas Academy — UX-design and agile project management</h3>
          <span className="when">Aug 2023 – June 2025</span>
          <ul>
            <li>User research</li>
            <li>Agile project management</li>
            <li>UI-design and prototyping</li>
            <li>Testing and validation</li>
            <li>Web development</li>
            <li>Business benefit (service design)</li>
            <li>Digital accessibility</li>
          </ul>
        </div>

        <div className="resume__entry">
          <h3>Stockholm University</h3>
          <span className="when">Oct 2024 – Feb 2025</span>
          <ul>
            <li>Psychology I</li>
            <li>Practical philosophy I</li>
          </ul>
        </div>

        <div className="resume__foot">
          <span>lestider@gmail.com</span>
          <span>|</span>
          <span>(+46) 720 11 66 96</span>
          <span>|</span>
          <a href="https://www.linkedin.com/in/leo-stider-0b781028b/" target="_blank" rel="noopener noreferrer" style={{border:0}}>LinkedIn</a>
        </div>
      </article>
    </div>);

}

Object.assign(window, { Landing, About, CaseStudy, WorkIndex, Resume });