(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;

  function EntryScreen() {
    E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, PrimaryButton, OliveBranch, LangSwitch } = E.UI;

    const showResume = E.isDraftDirty(store.draft);
    const showHistory = (store.history && store.history.length > 0);

    return (
      <Screen k="entry">
        <div style={{ position: 'absolute', top: 14, right: 16 }}>
          <LangSwitch />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '60px 32px 40px' }}>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <div style={{
              fontFamily: E.F.sans, fontSize: 10, letterSpacing: '0.36em',
              textTransform: 'uppercase', color: E.C.inkMute, marginBottom: 16,
            }}>{t('entry.tagline.kicker')}</div>
            <h1 style={{
              fontFamily: E.F.serif, fontSize: 56, fontWeight: 300,
              letterSpacing: '-0.02em', color: E.C.ink, margin: 0, lineHeight: 1,
            }}>Évora</h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <OliveBranch size={140} />
            <div style={{
              fontFamily: E.F.serif, fontStyle: 'italic', fontWeight: 300,
              fontSize: 22, lineHeight: 1.4, color: E.C.ink,
              textAlign: 'center', maxWidth: 280,
            }}>
              {t('entry.tagline.line1')}<br/>{t('entry.tagline.line2')}
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <PrimaryButton onClick={() => store.go(showResume ? 'mode' : 'couple')}>
              {showResume ? t('entry.link.resume') : t('entry.cta')}
            </PrimaryButton>
            <div style={{
              fontFamily: E.F.serif, fontStyle: 'italic', fontSize: 13,
              color: E.C.inkSoft, textAlign: 'center', lineHeight: 1.5,
            }}>
              {t('entry.subtitle')}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 6 }}>
              <button onClick={() => store.go('places')} style={linkStyle()}>{t('entry.link.places')}</button>
              {showHistory && <button onClick={() => store.go('history')} style={linkStyle()}>{t('entry.link.history')}</button>}
              <button onClick={() => store.go('places-favs')} style={linkStyle()}>{t('entry.link.favorites')}</button>
            </div>
          </div>
        </div>
      </Screen>
    );
  }

  function linkStyle() {
    return {
      background: 'none', border: 'none', cursor: 'pointer',
      fontFamily: window.Evora.F.sans, fontSize: 11, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: window.Evora.C.inkMute, padding: 4,
    };
  }

  E.Screens = E.Screens || {};
  E.Screens.Entry = EntryScreen;
})();
