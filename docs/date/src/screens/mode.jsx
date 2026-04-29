(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const { useState } = React;

  function ModeCard({ label, desc, num, italic, onClick }) {
    const [hover, setHover] = useState(false);
    return (
      <button onClick={onClick}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          flex: 1, padding: '32px 28px', cursor: 'pointer',
          background: hover ? E.C.paper : 'transparent',
          border: `1px solid ${hover ? E.C.ink : E.C.hair}`,
          textAlign: 'left', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', alignItems: 'flex-start',
          transition: 'all 250ms', minHeight: 160,
        }}>
        <div style={{ fontFamily: E.F.serif, fontStyle: 'italic', fontSize: 14, color: E.C.accent, fontWeight: 400 }}>{num}.</div>
        <div>
          <div style={{ fontFamily: E.F.serif, fontSize: 28, fontWeight: 300, fontStyle: italic ? 'italic' : 'normal', color: E.C.ink, marginBottom: 8, lineHeight: 1.1 }}>{label}</div>
          <div style={{ fontFamily: E.F.sans, fontSize: 13, color: E.C.inkSoft, lineHeight: 1.5 }}>{desc}</div>
        </div>
      </button>
    );
  }

  function ModeScreen() {
    E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, TopBar } = E.UI;

    const headingKey = store.draft.couple === 'new' ? 'mode.heading.new' : 'mode.heading.long';
    const choose = (path) => { store.updateDraft({ path }); store.go(path); };

    return (
      <Screen k="mode">
        <TopBar onBack={store.back} label={t('mode.step')} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 40px' }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: E.F.serif, fontSize: 36, fontWeight: 300, letterSpacing: '-0.01em', color: E.C.ink, margin: 0, lineHeight: 1.1 }}
              dangerouslySetInnerHTML={{ __html: t(headingKey) }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
            <ModeCard label={t('mode.opt.config.label')}   desc={t('mode.opt.config.desc')}   num="i"  onClick={() => choose('config')} />
            <ModeCard label={t('mode.opt.surprise.label')} desc={t('mode.opt.surprise.desc')} num="ii" italic onClick={() => choose('surprise')} />
          </div>
        </div>
      </Screen>
    );
  }

  E.Screens = E.Screens || {};
  E.Screens.Mode = ModeScreen;
})();
