(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const { useState } = React;

  const CATEGORIES = ['all', 'restaurant', 'bar', 'cafe', 'activity'];

  function Chip({ active, onClick, children }) {
    return (
      <button onClick={onClick} style={{
        padding: '6px 14px', cursor: 'pointer',
        background: active ? E.C.ink : 'transparent',
        color: active ? E.C.cream : E.C.ink,
        border: `1px solid ${active ? E.C.ink : E.C.hair}`,
        fontFamily: E.F.sans, fontSize: 11, letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>{children}</button>
    );
  }

  function PlacesScreen({ favsOnly: initialFavsOnly }) {
    const lang = E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, TopBar } = E.UI;
    const [cat, setCat] = useState('all');
    const [favsOnly, setFavsOnly] = useState(!!initialFavsOnly);
    const [detail, setDetail] = useState(null);

    const list = E.PLACES.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false;
      if (favsOnly && !store.isFavorite(p.id)) return false;
      return true;
    });

    return (
      <Screen k="places">
        <TopBar onBack={store.back} label={t('places.heading')} />
        <div style={{ padding: '0 24px 12px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {CATEGORIES.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(c)}>{t('places.cat.' + c)}</Chip>
          ))}
        </div>
        <div style={{ padding: '0 24px 8px' }}>
          <Chip active={favsOnly} onClick={() => setFavsOnly((v) => !v)}>{t('places.fav.only')}</Chip>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {list.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center', fontFamily: E.F.serif, fontStyle: 'italic', color: E.C.inkSoft }}>{t('places.empty')}</div>
          )}
          {list.map((p) => {
            const fav = store.isFavorite(p.id);
            return (
              <div key={p.id} style={{ borderBottom: `1px solid ${E.C.hair}`, padding: '16px 24px',
                display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <button onClick={() => setDetail(p)} style={{ flex: 1, textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontFamily: E.F.serif, fontSize: 20, fontWeight: 300, color: E.C.ink }}>
                      {p.name[lang] || p.name.en}
                    </div>
                    <div style={{ fontFamily: E.F.sans, fontSize: 12, color: E.C.inkMute }}>{p.price}</div>
                  </div>
                  <div style={{ fontFamily: E.F.sans, fontSize: 12, color: E.C.inkSoft, marginTop: 4 }}>
                    {p.tags.slice(0, 3).join(' · ')} · {p.durationMin} min
                  </div>
                  <div style={{ fontFamily: E.F.sans, fontSize: 13, color: E.C.inkSoft, marginTop: 6, lineHeight: 1.5 }}>
                    {p.desc[lang] || p.desc.en}
                  </div>
                </button>
                <button onClick={() => store.toggleFavorite(p.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer',
                    color: fav ? E.C.accent : E.C.inkMute, fontSize: 22, padding: 4 }}>
                  {fav ? '♥' : '♡'}
                </button>
              </div>
            );
          })}
        </div>
        {detail && (
          <E.UI.BottomSheet title={detail.name[lang] || detail.name.en} onClose={() => setDetail(null)}>
            <div style={{ fontFamily: E.F.sans, fontSize: 13, color: E.C.inkSoft, lineHeight: 1.6, marginBottom: 12 }}>
              {detail.desc[lang] || detail.desc.en}
            </div>
            <div style={{ fontFamily: E.F.sans, fontSize: 12, color: E.C.inkMute }}>
              {detail.tags.join(' · ')} · {detail.price} · {detail.durationMin} min
            </div>
          </E.UI.BottomSheet>
        )}
      </Screen>
    );
  }

  E.Screens = E.Screens || {};
  E.Screens.Places = PlacesScreen;
})();
