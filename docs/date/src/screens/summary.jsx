(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const { useState, useMemo } = React;

  const DEFAULT_DURATION = { experience: 120, dinner: 90, gift: 30, transport: 20, accommodation: 30 };

  function buildTimeline(draft, lang) {
    const start = draft.values.experience.time || '19:00';
    const [h, m] = start.split(':').map((x) => parseInt(x, 10));
    let cur = new Date(2000, 0, 1, h, m);
    const rows = [];
    const order = ['experience', 'dinner', 'gift', 'transport', 'accommodation'];
    for (const id of order) {
      if (!draft.enabled[id]) continue;
      const time = String(cur.getHours()).padStart(2,'0') + ':' + String(cur.getMinutes()).padStart(2,'0');
      const placeId = draft.placeIds[id];
      const place = placeId ? E.PLACES.find((p) => p.id === placeId) : null;
      const placeName = place ? (place.name[lang] || place.name.en) : null;
      const summaryDetail = Object.values(draft.values[id]).filter(Boolean).join(' · ');
      rows.push({
        id, time,
        title: E.t('config.section.' + id),
        detail: placeName ? `${placeName} — ${summaryDetail}` : summaryDetail,
      });
      const dur = (place && place.durationMin) || DEFAULT_DURATION[id] || 60;
      cur = new Date(cur.getTime() + dur * 60000);
    }
    return rows;
  }

  function combineDateAndStart(dateStr, timeStr) {
    const d = new Date(dateStr + 'T' + (timeStr || '19:00') + ':00');
    return isNaN(d.getTime()) ? null : d;
  }

  function DatePromptSheet({ initialDate, initialTime, onClose, onConfirm }) {
    const t = E.t;
    const [d, setD] = useState(initialDate || new Date().toISOString().slice(0,10));
    const [tm, setTm] = useState(initialTime || '19:00');
    return (
      <E.UI.BottomSheet title={t('summary.dateprompt.title')} onClose={onClose}
        footer={<E.UI.PrimaryButton onClick={() => { onConfirm(d, tm); onClose(); }}>{t('summary.dateprompt.cta')}</E.UI.PrimaryButton>}>
        <div style={{ display: 'flex', gap: 12 }}>
          <input type="date" value={d} onChange={(e) => setD(e.target.value)}
            style={{ flex: 1, padding: 12, fontFamily: E.F.sans, fontSize: 14, border: `1px solid ${E.C.hair}` }} />
          <input type="time" value={tm} onChange={(e) => setTm(e.target.value)}
            style={{ flex: 1, padding: 12, fontFamily: E.F.sans, fontSize: 14, border: `1px solid ${E.C.hair}` }} />
        </div>
      </E.UI.BottomSheet>
    );
  }

  function SummaryScreen() {
    E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, TopBar, PrimaryButton, GhostButton } = E.UI;
    const [datePrompt, setDatePrompt] = useState(null);
    const [toast, setToast] = useState('');

    const readOnly = !!store.sharedView;
    const source = readOnly ? store.sharedView : store.draft;

    const rows = useMemo(() => buildTimeline(source, store.lang), [source, store.lang]);
    const noActive = rows.length === 0;

    const dateMode = (() => {
      if (!source.date) return '';
      const d = new Date(source.date);
      const fmt = d.toLocaleDateString(store.lang === 'cs' ? 'cs-CZ' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
      const mode = source.path === 'surprise' ? t('mode.opt.surprise.label') : t('mode.opt.config.label');
      return `${fmt} · ${mode}`;
    })();

    const ensureDate = (next) => {
      if (source.date) return next(new Date(source.date));
      setDatePrompt({ run: next });
    };

    const onAddCalendar = () => ensureDate((when) => {
      store.updateDraft({ date: when.toISOString() });
      const start = combineStart(when, source.values.experience.time || '19:00');
      const minutes = rows.reduce((acc, r) => acc + (DEFAULT_DURATION[r.id] || 60), 0);
      const end = new Date(start.getTime() + minutes * 60000);
      const desc = rows.map((r) => `${r.time}  ${r.title} — ${r.detail}`).join('\n');
      const ics = E.buildICS({
        title: 'Évora · ' + (source.path === 'surprise' ? t('mode.opt.surprise.label') : t('mode.opt.config.label')),
        start, end, description: desc,
        location: rows[0] ? rows[0].detail : '',
      });
      E.downloadICS('evora-evening.ics', ics);
    });

    const onSaveImage = () => ensureDate(async (when) => {
      store.updateDraft({ date: when.toISOString() });
      const fmt = when.toLocaleDateString(store.lang === 'cs' ? 'cs-CZ' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
      const modeLabel = source.path === 'surprise' ? t('mode.opt.surprise.label') : t('mode.opt.config.label');
      const shareUrl = E.buildShareUrl({ ...source, date: when.toISOString(), lang: store.lang });
      const blob = await E.renderInvitePNG({
        dateMode: `${fmt} · ${modeLabel}`,
        rows,
        shareUrl,
      }, store.lang);
      E.downloadPNG('evora-invite.png', blob);
      try { await navigator.clipboard.writeText(shareUrl); setToast(t('summary.shared.copied')); setTimeout(() => setToast(''), 2200); } catch (_) {}
    });

    const onConfirm = () => { store.pushHistory(); store.go('confirmed'); };
    const onUseShared = () => {
      store.updateDraft({ ...store.sharedView });
      store.clearSharedView();
      history.replaceState(null, '', location.pathname);
    };
    const onDecline = () => {
      store.clearSharedView();
      history.replaceState(null, '', location.pathname);
      store.reset();
    };

    return (
      <Screen k="summary">
        <TopBar onBack={readOnly ? null : store.back} label={t('summary.heading')} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 32px 16px' }}>
          {noActive
            ? <div style={{ fontFamily: E.F.serif, fontStyle: 'italic', fontSize: 18, color: E.C.inkSoft, padding: '40px 0', textAlign: 'center' }}>{t('summary.empty')}</div>
            : rows.map((r, i) => (
                <div key={r.id} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${E.C.hair}` }}>
                  <div style={{ width: 56, fontFamily: E.F.sans, fontSize: 12, letterSpacing: '0.12em', color: E.C.accent, paddingTop: 4 }}>{r.time}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: E.F.serif, fontSize: 22, fontWeight: 300, color: E.C.ink }}>{r.title}</div>
                    <div style={{ fontFamily: E.F.sans, fontSize: 13, color: E.C.inkSoft, marginTop: 4 }}>{r.detail}</div>
                  </div>
                </div>
              ))}
          {dateMode && (
            <div style={{ fontFamily: E.F.sans, fontSize: 12, color: E.C.inkMute, marginTop: 16 }}>{dateMode}</div>
          )}
          {toast && (
            <div style={{ fontFamily: E.F.sans, fontSize: 12, color: E.C.accent, marginTop: 12 }}>{toast}</div>
          )}
        </div>
        <div style={{ padding: '12px 24px 24px', background: E.C.cream, borderTop: `1px solid ${E.C.hair}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {readOnly ? (
            <>
              <PrimaryButton onClick={onUseShared}>{t('summary.action.use')}</PrimaryButton>
              <GhostButton onClick={onDecline}>{t('summary.action.decline')}</GhostButton>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 8 }}>
                <GhostButton onClick={onAddCalendar} style={{ height: 44, fontSize: 11 }}>{t('summary.action.calendar')}</GhostButton>
                <GhostButton onClick={onSaveImage}    style={{ height: 44, fontSize: 11 }}>{t('summary.action.image')}</GhostButton>
              </div>
              <PrimaryButton onClick={onConfirm} disabled={noActive}>{t('summary.action.confirm')}</PrimaryButton>
            </>
          )}
        </div>
        {datePrompt && (
          <DatePromptSheet
            initialDate={source.date ? new Date(source.date).toISOString().slice(0,10) : null}
            initialTime={source.values.experience.time || '19:00'}
            onClose={() => setDatePrompt(null)}
            onConfirm={(d, tm) => {
              const when = combineDateAndStart(d, tm);
              if (when) datePrompt.run(when);
            }}
          />
        )}
      </Screen>
    );
  }

  function combineStart(when, hhmm) {
    const [h, m] = hhmm.split(':').map((x) => parseInt(x, 10));
    const d = new Date(when);
    d.setHours(h || 19, m || 0, 0, 0);
    return d;
  }

  E.Screens = E.Screens || {};
  E.Screens.Summary = SummaryScreen;
})();
