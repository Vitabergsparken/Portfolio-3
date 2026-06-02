/* global React */
// Archive v1 cube — colored faces with borders, corner labels, sentence-case text.

const { useState: useS1, useRef: useR1, useEffect: useE1, useCallback: useCb1 } = React;

const CUBE_SIZE = 340;
const HALF = CUBE_SIZE / 2;

const FACES = [
{ id: "front", rx: 0, ry: 0 },
{ id: "right", rx: 0, ry: 90 },
{ id: "back", rx: 0, ry: 180 },
{ id: "left", rx: 0, ry: 270 },
{ id: "top", rx: 90, ry: 0 },
{ id: "bottom", rx: -90, ry: 0 }];


const faceTransform = (rx, ry) =>
`rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${HALF}px)`;

function CubeFace({ id, rx, ry, children, variant }) {
  return (
    <div
      className="cube__face"
      data-face={id}
      data-loud={variant === "loud" ? "" : undefined}
      data-ink={variant === "ink" ? "" : undefined}
      data-lav={variant === "lav" ? "" : undefined}
      style={{ transform: faceTransform(rx, ry), backgroundColor: "rgb(241, 240, 255)" }}>
      
      {children}
    </div>);

}

function FrontFace() {
  return <>
    <div className="cube__corner">Leo Stider · 01 / 06</div>
    <h2 className="cube__title" style={{ fontSize: "44px" }}>LEO STIDER<br />UX-DESIGN<br /><em style={{ color: 'var(--fg-muted)', fontSize: "44px" }}>STOCKHOLM</em></h2>
    <div className="cube__sub">Drag to explore →</div>
  </>;
}

function ProjectsFace({ onNavigate }) {
  const items = [
  { id: "inamo", label: "Research — inamo" },
  { id: "arcledi", label: "Product — Arcledi OÜ" },
  { id: "chas", label: "Concept — Chas Academy" }];

  return <>
    <div className="cube__corner">Selected work · 02 / 06</div>
    <ul className="cube__list">
      {items.map((i) =>
      <li key={i.id}>
          <a onClick={(e) => {e.stopPropagation();onNavigate("case", i.id);}}>{i.label}</a>
        </li>
      )}
    </ul>
    <div className="cube__sub">2024— 2026</div>
  </>;
}

function AboutFace({ onNavigate }) {
  return <>
    <div className="cube__corner">About · 03 / 06</div>
    <p className="cube__big" style={{ lineHeight: "0.95" }}>A UX-designer<br />focused on<br />adapting.</p>
    <a onClick={(e) => {e.stopPropagation();onNavigate("about");}}
    style={{ borderBottom: '1.5px solid currentColor', alignSelf: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', paddingBottom: 2 }}>
      Read about me →
    </a>
  </>;
}

function ContactFace() {
  return <>
    <div className="cube__corner">Contact · 04 / 06</div>
    <div className="cube__contact">
      <div className="cube__sub" style={{ opacity: 0.7 }}>Mail</div>
      <a href="mailto:lestider@gmail.com">lestider@gmail.com</a>
      <div className="cube__sub" style={{ opacity: 0.7, marginTop: 16 }}>Phone</div>
      <a href="tel:+46720116696">+46 720 11 66 96</a>
    </div>
    <div className="cube__sub">Tap to reach me ↗</div>
  </>;
}

function ResumeFace({ onNavigate }) {
  return <>
    <div className="cube__corner">Résumé · 05 / 06</div>
    <p className="cube__big" style={{ lineHeight: "0.95" }}>RESUMÉ<br /><span style={{ background: 'var(--accent)', padding: '0 10px', marginLeft: -2, lineHeight: "0.95", letterSpacing: "-1.9px" }}>45 SEC READ </span></p>
    <a onClick={(e) => {e.stopPropagation();onNavigate("resume");}}
    style={{ borderBottom: '1.5px solid currentColor', alignSelf: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', paddingBottom: 2 }}>
      Open résumé →
    </a>
  </>;
}

function StatusFace() {
  return <>
    <div className="cube__corner">Status · 06 / 06</div>
    <div>
      <p className="cube__big" style={{ fontSize: 40 }}>Currently<br />open to<br />positions.</p>
      <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.4 }}>Including various design roles<br />from May 2026.</p>
    </div>
    <div className="cube__sub">Available</div>
  </>;
}

function renderFaceContent(id, ctx) {
  if (id === "front") return <FrontFace />;
  if (id === "right") return <ProjectsFace onNavigate={ctx.onNavigate} />;
  if (id === "back") return <StatusFace />;
  if (id === "left") return <AboutFace onNavigate={ctx.onNavigate} />;
  if (id === "top") return <ContactFace />;
  if (id === "bottom") return <ResumeFace onNavigate={ctx.onNavigate} />;
  return null;
}

const FACE_VARIANT = {
  front: "paper", right: "lav", back: "loud",
  left: "paper", top: "paper", bottom: "paper"
};

function Cube({ size = CUBE_SIZE, onNavigate, idleSpin = true, momentum = 0.94 }) {
  const [rotX, setRotX] = useS1(-18);
  const [rotY, setRotY] = useS1(-28);
  const [dragging, setDragging] = useS1(false);
  const [hasInteracted, setHasInteracted] = useS1(false);
  const stateRef = useR1({
    rotX: -18, rotY: -28, startX: 0, startY: 0, baseX: 0, baseY: 0,
    dragging: false, vX: 0, vY: 0, lastX: 0, lastY: 0, lastT: 0
  });
  const inertiaRaf = useR1(null);
  const momentumRef = useR1(momentum);
  momentumRef.current = momentum;

  // Idle auto-spin until the first interaction (optional).
  useE1(() => {
    if (hasInteracted || !idleSpin) return;
    let raf,last = performance.now();
    const tick = (t) => {
      const dt = t - last;last = t;
      stateRef.current.rotY += dt * 0.012;
      setRotY(stateRef.current.rotY);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasInteracted, idleSpin]);

  const stopInertia = useCb1(() => {
    if (inertiaRaf.current) {
      cancelAnimationFrame(inertiaRaf.current);
      inertiaRaf.current = null;
    }
  }, []);

  const onPointerDown = useCb1((e) => {
    stopInertia();
    setHasInteracted(true);setDragging(true);
    const s = stateRef.current;
    s.dragging = true;
    s.startX = e.clientX;s.startY = e.clientY;
    s.baseX = s.rotX;s.baseY = s.rotY;
    s.vX = 0;s.vY = 0;
    s.lastX = e.clientX;s.lastY = e.clientY;s.lastT = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [stopInertia]);

  const onPointerMove = useCb1((e) => {
    const s = stateRef.current;if (!s.dragging) return;
    const dx = e.clientX - s.startX,dy = e.clientY - s.startY;
    s.rotX = s.baseX - dy * 0.5;
    s.rotY = s.baseY + dx * 0.5;
    // Track velocity (deg per frame) from the most recent pointer movement.
    const now = performance.now();
    const dt = Math.max(1, now - s.lastT);
    s.vX = -(e.clientY - s.lastY) * 0.5 / dt * 16;
    s.vY = (e.clientX - s.lastX) * 0.5 / dt * 16;
    s.lastX = e.clientX;s.lastY = e.clientY;s.lastT = now;
    setRotX(s.rotX);setRotY(s.rotY);
  }, []);

  // On release the cube keeps spinning and glides to a gentle stop on its own
  // momentum — it never snaps a face square to the viewer, so it settles
  // wherever it runs out of speed.
  const onPointerUp = useCb1(() => {
    const s = stateRef.current;
    s.dragging = false;
    setDragging(false);
    const step = () => {
      const fr = momentumRef.current;
      s.vX *= fr;s.vY *= fr;
      s.rotX += s.vX;s.rotY += s.vY;
      setRotX(s.rotX);setRotY(s.rotY);
      if (Math.abs(s.vX) > 0.02 || Math.abs(s.vY) > 0.02) {
        inertiaRaf.current = requestAnimationFrame(step);
      } else {
        inertiaRaf.current = null;
      }
    };
    if (Math.abs(s.vX) > 0.04 || Math.abs(s.vY) > 0.04) {
      inertiaRaf.current = requestAnimationFrame(step);
    }
  }, []);

  return (
    <div className="cube-wrap" style={{ width: size, height: size }}
    data-dragging={dragging ? "" : undefined}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    onPointerCancel={onPointerUp}>
      
      <div className="cube" style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
      data-dragging={dragging ? "" : undefined}>
        {FACES.map((f) =>
        <CubeFace key={f.id} id={f.id} rx={f.rx} ry={f.ry} variant={FACE_VARIANT[f.id]}>
            {renderFaceContent(f.id, { onNavigate })}
          </CubeFace>
        )}
      </div>
    </div>);

}

window.ArchiveCube = Cube;