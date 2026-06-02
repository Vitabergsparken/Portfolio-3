/* global React */
// nav.jsx — top nav as a collapsible menu bar.
// On landing only the SIMPLIFY toggle shows; the cube is the menu. Clicking
// SIMPLIFY drops the nav links down (and toggles them back closed).

function TopNav({ route, onNavigate, menuOpen, onToggleMenu }) {
  const links = [
    { id: "home",   label: "Home" },
    { id: "about",  label: "About" },
    { id: "work",   label: "Work" },
    { id: "resume", label: "Résumé" },
  ];
  const isActive = (id) => {
    if (id === "work") return route.page === "case" || route.page === "work";
    return route.page === id;
  };
  return (
    <nav className="topnav" data-open={menuOpen ? "" : undefined}>
      <div className="topnav__bar">
        <button type="button" className="topnav__brand" onClick={() => onNavigate("home")}>
          Leo Stider
        </button>
        <button
          type="button"
          className="topnav__toggle"
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          {menuOpen ? "Close menu" : "Simplify"}
          <span className="chev" aria-hidden>▾</span>
        </button>
      </div>
      <div className="topnav__menu" aria-hidden={!menuOpen}>
        {links.map(l => (
          <button
            key={l.id}
            className="topnav__link"
            data-active={isActive(l.id) ? "" : undefined}
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => onNavigate(l.id === "work" ? "work" : l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

window.TopNav = TopNav;
