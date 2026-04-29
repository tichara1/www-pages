(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const { useState } = React;

  function ChoiceRow({ title, sub, onClick }) {
    const [hover, setHover] = useState(false);
    return (
      <button onClick={onClick}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          textAlign: 'left', padding: '28px 4px', cursor: 'pointer',
          background: 'transparent', border: 'none',
          borderBottom: `1px solid ${E.C.hair}`,
          width: '100%', transition: 'all 200ms',
        }}>
        <div style={{ paddingRight: 16 }}>
          <div style={{ fontFamily: E.F.serif, fontSize: 22, fontWeight: 300, color: E.C.ink, marginBottom: 6, lineHeight: 1.2 }}>{title}</div>
          <div style={{ fontFamily: E.F.sans, fontSize: 13, color: E.C.inkSoft, lineHeight: 1.5 }}>{sub}</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke={hover ? E.C.accent : E.C.inkMute} strokeWidth="1.2"
          style={{ flexShrink: 0, transition: 'all 200ms', transform: hover ? 'translateX(4px)' : 'none' }}>
          <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }

  function CoupleScreen() {
    E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, TopBar } = E.UI;
    const choose = (c) => { store.updateDraft({ couple: c }); store.go('mode'); };

    return (
      <Screen k="couple">
        <TopBar onBack={store.back} label={t('couple.step')} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 40px' }}>
          <div style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: E.F.serif, fontSize: 36, fontWeight: 300, letterSpacing: '-0.01em', color: E.C.ink, margin: 0, lineHeight: 1.1 }}
              dangerouslySetInnerHTML={{ __html: t('couple.heading') }} />
            <p style={{ fontFamily: E.F.sans, fontSize: 14, color: E.C.inkSoft, marginTop: 16, lineHeight: 1.6 }}>{t('couple.sub')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: `1px solid ${E.C.hair}` }}>
            <ChoiceRow title={t('couple.opt.new.title')}  sub={t('couple.opt.new.sub')}  onClick={() => choose('new')} />
            <ChoiceRow title={t('couple.opt.long.title')} sub={t('couple.opt.long.sub')} onClick={() => choose('long')} />
          </div>
        </div>
      </Screen>
    );
  }

  E.Screens = E.Screens || {};
  E.Screens.Couple = CoupleScreen;
})();
