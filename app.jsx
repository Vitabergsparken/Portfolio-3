/* global React, ReactDOM, TopNav, Landing, About, CaseStudy, WorkIndex, Resume,
   TweaksPanel, useTweaks, TweakSection, TweakToggle, TweakSlider, TweakColor, TweakRadio */

const { useState: useS, useEffect: useE } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#D1FE1B",
  "idleSpin": true,
  "momentum": 0.925,
  "aboutEmphasis": "accent"
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  const [route, setRoute] = useS({ page: "home", id: null });
  const [menuOpen, setMenuOpen] = useS(false);

  // Hash routing — so refresh keeps the page and external links work.
  // The menu bar is closed on the landing (cube is the menu) and open
  // elsewhere (you navigate by the menu there).
  useE(() => {
    const apply = () => {
      const h = window.location.hash.replace(/^#/, "");
      if (!h) {setRoute({ page: "home", id: null });setMenuOpen(false);return;}
      const [page, id] = h.split("/");
      const p = page || "home";
      setRoute({ page: p, id: id || null });
      setMenuOpen(p !== "home");
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const navigate = (page, id) => {
    const hash = id ? `${page}/${id}` : page === "home" ? "" : page;
    window.location.hash = hash;
    setRoute({ page, id: id || null });
    setMenuOpen(page !== "home");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const showFooter = route.page !== "home";

  return (
    <div className="frame" style={{ "--accent": t.accent }}>
      <TopNav
        route={route}
        onNavigate={navigate}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)} />
      

      <main className="pds-page" style={{ display: 'flex', flexDirection: 'column' }}>
        {route.page === "home" &&
        <Landing
          onNavigate={navigate}
          idleSpin={t.idleSpin}
          momentum={t.momentum}
          aboutEmphasis={t.aboutEmphasis} />

        }
        {route.page === "about" && <About onNavigate={navigate} />}
        {route.page === "work" && <WorkIndex onNavigate={navigate} />}
        {route.page === "case" && <CaseStudy id={route.id || "inamo"} onNavigate={navigate} />}
        {route.page === "resume" && <Resume />}
      </main>

      {showFooter &&
      <footer className="foot" style={{ backgroundColor: "rgb(227, 224, 255)" }}>
          <div style={{ color: "rgb(0, 0, 0)" }}>Leo Stider · {new Date().getFullYear()}</div>
          <div className="foot__links">
            <a href="mailto:lestider@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgb(0, 0, 0)" }}>Email</a>
            <a href="tel:+46720116696" target="_blank" rel="noopener noreferrer" style={{ color: "rgb(0, 0, 0)" }}>Phone</a>
            <a href="https://www.linkedin.com/in/leo-stider-0b781028b/" target="_blank" rel="noopener noreferrer" style={{ color: "rgb(0, 0, 0)" }}>LinkedIn</a>
          </div>
        </footer>
      }

      <TweaksPanel title="Tweaks">
        <TweakSection label="Cube" />
        <TweakToggle
          label="Idle auto-spin"
          value={t.idleSpin}
          onChange={(v) => setTweak("idleSpin", v)} />
        
        <TweakSlider
          label="Drag momentum"
          value={t.momentum}
          min={0.85}
          max={0.985}
          step={0.005}
          onChange={(v) => setTweak("momentum", v)} />
        
        <TweakSection label="About face" />
        <TweakRadio
          label='"shipped" emphasis'
          value={t.aboutEmphasis}
          options={["accent", "scale", "flat"]}
          onChange={(v) => setTweak("aboutEmphasis", v)} />

        <TweakSection label="Accent" />
        <TweakColor
          label="Brand accent"
          value={t.accent}
          options={["#D1FE1B", "#07070D", "#E3E0FF"]}
          onChange={(v) => setTweak("accent", v)} />
        
      </TweaksPanel>
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);