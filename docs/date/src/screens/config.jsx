(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const { useState } = React;

  const PLACE_CATEGORY = { experience: 'activity', dinner: 'restaurant' };

  const SECTIONS = [
    { id: 'experience', required: true, fields: [
      { id: 'activity',     options: ['Jazz at U Malého Glena','Pottery, Holešovice studio','Rooftop cinema','Wine tasting, Karlín cellars','Late gallery walk'] },
      { id: 'neighborhood', options: ['Vinohrady','Karlín','Malá Strana','Holešovice','Žižkov'] },
      { id: 'time',         options: ['18:00','18:30','19:00','19:30','20:00','20:30'] },
    ]},
    { id: 'dinner', required: false, fields: [
      { id: 'cuisine',    options: ['Italian bistro','Modern Czech','French','Levantine','Japanese'] },
      { id: 'atmosphere', options: ['Quiet & candlelit','Lively & loud','Garden terrace','Counter seats'] },
    ]},
    { id: 'gift', required: false, fields: [
      { id: 'category', options: ['Single stem','Hand-bound book','Perfumery sample','Patisserie box','Vinyl, second-hand'] },
      { id: 'budget',   options: ['Up to 500 CZK','500–1 200 CZK','1 200–2 500 CZK','Open'] },
    ]},
    { id: 'transport', required: false, fields: [
      { id: 'mode', options: ['Taxi','Own car','Public transit','Walking'] },
    ]},
    { id: 'accommodation', required: false, fields: [
      { id: 'type',  options: ['Boutique hotel','Design apartment','Townhouse suite','Riverside room'] },
      { id: 'stars', options: ['3 stars','4 stars','5 stars'] },
    ]},
  ];

  function ConfigRow({ section, enabled, values, placeId, placeName, onToggle, onOpen }) {
    const t = E.t;
    const summaryParts = section.fields.map((f) => values[f.id]).filter(Boolean);
    if (placeName) summaryParts.unshift(placeName);
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 32px', borderBottom: `1px solid ${E.C.hair}`,
        opacity: enabled ? 1 : 0.55 }}>
        <button onClick={onOpen} disabled={!enabled} style={{ flex: 1, textAlign: 'left',
          background: 'none', border: 'none', cursor: enabled ? 'pointer' : 'default', padding: 0 }}>
          <div style={{ fontFamily: E.F.serif, fontSize: 22, fontWeight: 300, color: E.C.ink }}>
            {t('config.section.' + section.id)}
          </div>
          <div style={{ fontFamily: E.F.sans, fontSize: 12, color: E.C.inkSoft, marginTop: 4 }}>
            {summaryParts.join(' · ')}
          </div>
        </button>
        <E.UI.Toggle on={enabled} onClick={onToggle} />
      </div>
    );
  }

  function PlacePickerSheet({ category, currentId, onPick, onClose }) {
    const t = E.t;
    const lang = E.useLang();
    const store = E.useStore();
    const places = E.PLACES.filter((p) => p.category === category);
    const sorted = [...places].sort((a, b) => {
      const af = store.isFavorite(a.id) ? 0 : 1;
      const bf = store.isFavorite(b.id) ? 0 : 1;
      return af - bf;
    });
    return (
      <E.UI.BottomSheet title={t('config.field.place')} onClose={onClose}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => { onPick(null); onClose(); }} style={rowStyle(currentId == null)}>
            <span style={{ fontFamily: E.F.serif, fontSize: 18 }}>{t('config.place.none')}</span>
          </button>
          {sorted.map((p) => (
            <button key={p.id} onClick={() => { onPick(p.id); onClose(); }} style={rowStyle(p.id === currentId)}>
              <div>
                <div style={{ fontFamily: E.F.serif, fontSize: 18 }}>
                  {p.name[lang] || p.name.en} {store.isFavorite(p.id) && <span style={{ color: E.C.accent }}>♥</span>}
                </div>
                <div style={{ fontFamily: E.F.sans, fontSize: 12, color: E.C.inkSoft }}>
                  {p.tags.slice(0, 3).join(' · ')} · {p.price}
                </div>
              </div>
            </button>
          ))}
        </div>
      </E.UI.BottomSheet>
    );
  }

  function rowStyle(active) {
    return {
      textAlign: 'left', padding: '14px 4px', cursor: 'pointer',
      background: active ? window.Evora.C.paper : 'transparent',
      border: 'none', borderBottom: `1px solid ${window.Evora.C.hair}`,
      width: '100%',
    };
  }

  function SectionSheet({ section, values, placeId, onClose, onSave }) {
    const t = E.t;
    const lang = E.useLang();
    const [v, setV] = useState({ ...values });
    const [pid, setPid] = useState(placeId || null);
    const [showPicker, setShowPicker] = useState(false);
    const placeCategory = PLACE_CATEGORY[section.id] || null;
    const place = pid ? E.PLACES.find((p) => p.id === pid) : null;

    return (
      <>
        <E.UI.BottomSheet
          title={t('config.section.' + section.id)}
          onClose={onClose}
          footer={
            <div style={{ display: 'flex', gap: 12 }}>
              <E.UI.GhostButton onClick={onClose}>{t('config.sheet.cancel')}</E.UI.GhostButton>
              <E.UI.PrimaryButton onClick={() => { onSave(v, pid); onClose(); }}>{t('config.sheet.save')}</E.UI.PrimaryButton>
            </div>
          }>
          {section.fields.map((f) => (
            <div key={f.id} style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: E.F.sans, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: E.C.inkMute, marginBottom: 8 }}>
                {t('config.field.' + f.id)}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {f.options.map((o) => (
                  <button key={o} onClick={() => setV((s) => ({ ...s, [f.id]: o }))}
                    style={{
                      padding: '8px 12px', cursor: 'pointer',
                      background: v[f.id] === o ? E.C.ink : 'transparent',
                      color: v[f.id] === o ? E.C.cream : E.C.ink,
                      border: `1px solid ${v[f.id] === o ? E.C.ink : E.C.hair}`,
                      fontFamily: E.F.sans, fontSize: 12,
                    }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
          {placeCategory && (
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontFamily: E.F.sans, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: E.C.inkMute, marginBottom: 8 }}>
                {t('config.field.place')}
              </div>
              <button onClick={() => setShowPicker(true)} style={{
                width: '100%', textAlign: 'left', padding: '12px 14px',
                border: `1px solid ${E.C.hair}`, background: E.C.paper,
                fontFamily: E.F.serif, fontSize: 16, cursor: 'pointer',
              }}>
                {place ? (place.name[lang] || place.name.en) : t('config.place.choose')}
              </button>
            </div>
          )}
        </E.UI.BottomSheet>
        {showPicker && (
          <PlacePickerSheet
            category={placeCategory}
            currentId={pid}
            onPick={setPid}
            onClose={() => setShowPicker(false)}
          />
        )}
      </>
    );
  }

  function ConfigScreen() {
    E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, TopBar, PrimaryButton } = E.UI;
    const [openSheet, setOpenSheet] = useState(null);

    const placeName = (sectionId) => {
      const pid = store.draft.placeIds[sectionId];
      if (!pid) return null;
      const p = E.PLACES.find((x) => x.id === pid);
      return p ? (p.name[store.lang] || p.name.en) : null;
    };

    const sectionById = (id) => SECTIONS.find((s) => s.id === id);

    return (
      <Screen k="config">
        <TopBar onBack={store.back} label={t('config.step')} />
        <div style={{ padding: '12px 32px 16px' }}>
          <h2 style={{ fontFamily: E.F.serif, fontSize: 32, fontWeight: 300, letterSpacing: '-0.01em', color: E.C.ink, margin: 0, lineHeight: 1.1 }}
            dangerouslySetInnerHTML={{ __html: t('config.heading') }} />
          <p style={{ fontFamily: E.F.sans, fontSize: 13, color: E.C.inkSoft, marginTop: 12, lineHeight: 1.6 }}>{t('config.sub')}</p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', borderTop: `1px solid ${E.C.hair}` }}>
          {SECTIONS.map((s) => (
            <ConfigRow key={s.id} section={s}
              enabled={store.draft.enabled[s.id]}
              values={store.draft.values[s.id]}
              placeId={store.draft.placeIds[s.id]}
              placeName={placeName(s.id)}
              onToggle={() => !s.required && store.updateEnabled(s.id, !store.draft.enabled[s.id])}
              onOpen={() => setOpenSheet(s.id)} />
          ))}
        </div>
        <div style={{ padding: '16px 24px 24px', background: E.C.cream, borderTop: `1px solid ${E.C.hair}` }}>
          <PrimaryButton onClick={() => store.go('summary')}>{t('config.cta')}</PrimaryButton>
        </div>
        {openSheet && (
          <SectionSheet
            section={sectionById(openSheet)}
            values={store.draft.values[openSheet]}
            placeId={store.draft.placeIds[openSheet]}
            onClose={() => setOpenSheet(null)}
            onSave={(vals, pid) => {
              store.updateValues(openSheet, vals);
              store.setPlaceId(openSheet, pid);
            }} />
        )}
      </Screen>
    );
  }

  E.Screens = E.Screens || {};
  E.Screens.Config = ConfigScreen;
})();
