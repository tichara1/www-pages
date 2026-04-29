(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;

  function HistoryScreen() {
    const lang = E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, TopBar } = E.UI;

    const onReplicate = (id) => {
      store.replicateHistory(id);
      store.go('summary');
    };

    return (
      <Screen k="history">
        <TopBar onBack={store.back} label={t('history.heading')} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {store.history.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', fontFamily: E.F.serif, fontStyle: 'italic', color: E.C.inkSoft }}>{t('history.empty')}</div>
          )}
          {store.history.map((h) => {
            const d = new Date(h.confirmedAt);
            const fmt = d.toLocaleDateString(lang === 'cs' ? 'cs-CZ' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
            const placeNames = Object.values(h.placeIds || {})
              .map((id) => E.PLACES.find((p) => p.id === id))
              .filter(Boolean)
              .map((p) => p.name[lang] || p.name.en)
              .join(' → ');
            return (
              <div key={h.id} style={{ padding: '16px 24px', borderBottom: `1px solid ${E.C.hair}`,
                display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: E.F.sans, fontSize: 11, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: E.C.inkMute, marginBottom: 6 }}>
                    {fmt} · {h.path === 'surprise' ? t('mode.opt.surprise.label') : t('mode.opt.config.label')}
                  </div>
                  <div style={{ fontFamily: E.F.serif, fontSize: 18, fontWeight: 300, color: E.C.ink }}>
                    {placeNames || '—'}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <button onClick={() => onReplicate(h.id)} style={smallBtnStyle()}>{t('history.replicate')}</button>
                  <button onClick={() => store.removeHistoryItem(h.id)} style={{ ...smallBtnStyle(), color: E.C.inkMute }}>{t('history.remove')}</button>
                </div>
              </div>
            );
          })}
        </div>
      </Screen>
    );
  }

  function smallBtnStyle() {
    return {
      background: 'none', border: `1px solid ${window.Evora.C.hair}`, cursor: 'pointer',
      padding: '6px 10px', fontFamily: window.Evora.F.sans, fontSize: 11,
      letterSpacing: '0.12em', textTransform: 'uppercase', color: window.Evora.C.ink,
    };
  }

  E.Screens = E.Screens || {};
  E.Screens.History = HistoryScreen;
})();
