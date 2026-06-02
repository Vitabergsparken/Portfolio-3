/* global React, ReactDOM, ArchiveTopNav, ArchiveLanding, toMain,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect */

const DEFAULTS_ARCHIVE = /*EDITMODE-BEGIN*/{
  "landing": "A",
  "mode": "visual"
}/*EDITMODE-END*/;

function ArchiveApp() {
  const [t, setTweak] = useTweaks(DEFAULTS_ARCHIVE);
  // Archive is read-only — clicking any cube link sends you to the main site
  const navigate = (page, id) => {
    if (page === "home") return;
    const hash = id ? `${page}/${id}` : page;
    window.location.href = toMain(hash);
  };
  const mode = t.mode || "visual";

  return (
    <div className="frame" data-mode={mode}>
      <div className="archive-banner">
        <span>Archive v1 · 4 landing variants · {new Date(2026, 4, 27).toLocaleDateString()}</span>
        <span><a href="../index.html">← Back to current site</a></span>
      </div>
      <ArchiveTopNav
        route={{ page: "home" }}
        onNavigate={navigate}
        mode={mode}
        onModeChange={(v) => setTweak("mode", v)}
      />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ArchiveLanding variant={t.landing || "A"} onNavigate={navigate} />
      </main>

      <TweaksPanel title="Archive — landing variants">
        <TweakSection label="Landing variant" />
        <TweakSelect
          label="Variant"
          value={t.landing || "A"}
          options={[
            { value: "A", label: "A — Faithful cube" },
            { value: "B", label: "B — Editorial split" },
            { value: "C", label: "C — Loud lime hero" },
            { value: "D", label: "D — Cube + projects rail" },
          ]}
          onChange={(v) => setTweak("landing", v)}
        />
        <TweakSection label="Site mode" />
        <TweakRadio
          label="Visual / Simple"
          value={mode}
          options={[
            { value: "visual", label: "Visual" },
            { value: "simple", label: "Simple" },
          ]}
          onChange={(v) => setTweak("mode", v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ArchiveApp />);
