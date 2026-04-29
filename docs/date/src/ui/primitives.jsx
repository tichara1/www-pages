(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const { useState } = React;

  function PrimaryButton({ children, onClick, style = {}, disabled }) {
    return (
      <button onClick={onClick} disabled={disabled} style={{
        width: '100%', height: 56, border: 'none', cursor: disabled ? 'default' : 'pointer',
        background: disabled ? E.C.inkMute : E.C.ink, color: E.C.cream,
        fontFamily: E.F.sans, fontSize: 14, fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        borderRadius: 0, transition: 'background 200ms', opacity: disabled ? 0.6 : 1,
        ...style,
      }}
        onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = E.C.accent; }}
        onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = E.C.ink; }}>
        {children}
      </button>
    );
  }

  function GhostButton({ children, onClick, style = {} }) {
    return (
      <button onClick={onClick} style={{
        width: '100%', height: 56, cursor: 'pointer',
        background: 'transparent', color: E.C.ink,
        border: `1px solid ${E.C.ink}`,
        fontFamily: E.F.sans, fontSize: 14, fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        borderRadius: 0, transition: 'all 200ms',
        ...style,
      }}>
        {children}
      </button>
    );
  }

  function Screen({ children, k }) {
    return (
      <div key={k} style={{
        position: 'absolute', inset: 0,
        animation: 'screenIn 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
        background: E.C.cream,
        display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    );
  }

  function TopBar({ onBack, label, right }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 24px', minHeight: 44,
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: onBack ? 'pointer' : 'default',
          padding: 4, color: E.C.ink, opacity: onBack ? 1 : 0,
          display: 'flex', alignItems: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div style={{
          fontFamily: E.F.sans, fontSize: 11, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: E.C.inkMute,
        }}>{label}</div>
        <div style={{ width: 26, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
      </div>
    );
  }

  function Toggle({ on, onClick }) {
    return (
      <button onClick={onClick} style={{
        width: 40, height: 22, padding: 2,
        background: on ? E.C.ink : E.C.hair,
        border: 'none', borderRadius: 999, cursor: 'pointer',
        transition: 'background 200ms', flexShrink: 0,
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          background: E.C.cream, transition: 'transform 200ms',
          transform: on ? 'translateX(18px)' : 'translateX(0)',
        }}/>
      </button>
    );
  }

  function BottomSheet({ title, onClose, children, footer }) {
    const [closing, setClosing] = useState(false);
    const close = () => { setClosing(true); setTimeout(onClose, 280); };
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        animation: closing ? 'fadeOut 280ms ease both' : 'fadeIn 280ms ease both',
      }}>
        <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(31,27,22,0.45)' }}/>
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          background: E.C.cream, padding: '20px 24px 28px',
          animation: closing ? 'sheetOut 320ms cubic-bezier(0.22, 1, 0.36, 1) both' : 'sheetIn 360ms cubic-bezier(0.22, 1, 0.36, 1) both',
          maxHeight: '85%', overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <div style={{ fontFamily: E.F.serif, fontSize: 24, fontWeight: 300, color: E.C.ink }}>{title}</div>
            <button onClick={close} style={{ background: 'none', border: 'none', cursor: 'pointer', color: E.C.inkMute, fontSize: 20 }}>×</button>
          </div>
          {children}
          {footer && <div style={{ marginTop: 20 }}>{footer}</div>}
        </div>
      </div>
    );
  }

  E.UI = { PrimaryButton, GhostButton, Screen, TopBar, Toggle, BottomSheet };
})();
