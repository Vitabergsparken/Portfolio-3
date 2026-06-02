/* global React */
// Archive v1 nav — same nav with mode pill, no SIMPLE-hide behavior.

function ArchiveModePill({ mode, onChange }) {
  return (
    <button type="button" className="mode-pill" data-mode={mode}
      onClick={() => onChange(mode === "visual" ? "simple" : "visual")}>
      <span className="mode-pill__thumb" aria-hidden></span>
      <span className="mode-pill__opt" data-opt="visual">Visual</span>
      <span className="mode-pill__opt" data-opt="simple">Simple</span>
    </button>
  );
}

function ArchiveTopNav({ route, onNavigate, mode, onModeChange }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "resume", label: "Résumé" },
  ];
  const isActive = (id) => {
    if (id === "work") return route.page === "case" || route.page === "work";
    return route.page === id;
  };
  return (
    <nav className="topnav">
      <ArchiveModePill mode={mode} onChange={onModeChange} />
      <div className="topnav__links">
        {links.map(l => (
          <button key={l.id}
            className="topnav__link"
            data-active={isActive(l.id) ? "" : undefined}
            onClick={() => onNavigate(l.id === "work" ? "work" : l.id)}>
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

window.ArchiveTopNav = ArchiveTopNav;
