(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const { useState } = React;

  const SURPRISE = [
    { id: 'experience', labelKey: 'surprise.letter.experience', body: 'A late jazz set at U Malého Glena. Two seats reserved at the front. Doors at twenty-thirty.', time: '20:30' },
    { id: 'dinner',     labelKey: 'surprise.letter.dinner',     body: 'A small Italian counter in Vinohrady — six tables, candle-lit, a Barolo opened on arrival.', time: '18:30' },
    { id: 'gift',       labelKey: 'surprise.letter.gift',       body: 'A single white peony, wrapped in brown paper, waiting at the door.', time: '18:15' },
    { id: 'transport',  labelKey: 'surprise.letter.transport',  body: 'A car arrives at twenty past six. Quiet, unhurried, no questions.', time: '18:20' },
  ];

  function Letter({ item, opened, onOpen }) {
    const t = E.t;
    return (
      <div style={{
        border: `1px solid ${E.C.hair}`,
        background: E.C.paper,
        padding: opened ? '24px 24px 24px' : '0',
        transition: 'padding 320ms',
        position: 'relative', overflow: 'hidden',
      }}>
        <svg width="44" height="44" viewBox="0 0 60 60" style={{
          position: 'absolute', top: 8, right: 8, opacity: 0.5,
        }} fill="none" stroke={E.C.accent} strokeWidth="0.7" strokeLinecap="round">
          <path d="M10 30 C 24 28, 36 22, 50 14" />
          <path d="M22 28 C 24 22, 30 20, 34 22 C 32 28, 26 30, 22 28 Z" />
          <path d="M34 22 C 36 16, 42 14, 46 16 C 44 22, 38 24, 34 22 Z" />
        </svg>

        {!opened ? (
          <button onClick={onOpen} style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            padding: '28px 24px 28px', textAlign: 'left',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: E.F.sans, fontSize: 10, letterSpacing: '0.24em',
                textTransform: 'uppercase', color: E.C.inkMute, marginBottom: 6,
              }}>Sealed</div>
              <div style={{
                fontFamily: E.F.serif, fontSize: 22, fontWeight: 300,
                color: E.C.ink, lineHeight: 1.2,
              }}>{t(item.labelKey)}</div>
            </div>
            <div style={{
              fontFamily: E.F.serif, fontStyle: 'italic', fontSize: 13,
              color: E.C.accent, whiteSpace: 'nowrap',
            }}>break the seal</div>
          </button>
        ) : (
          <div style={{ animation: 'letterOpen 480ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
            <div style={{
              fontFamily: E.F.sans, fontSize: 10, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: E.C.accent, marginBottom: 8,
            }}>{item.time}</div>
            <div style={{
              fontFamily: E.F.serif, fontSize: 22, fontWeight: 300,
              color: E.C.ink, lineHeight: 1.2, marginBottom: 12,
            }}>{t(item.labelKey)}</div>
            <div style={{
              fontFamily: E.F.serif, fontStyle: 'italic', fontSize: 16,
              color: E.C.inkSoft, lineHeight: 1.55, fontWeight: 300,
            }}>{item.body}</div>
          </div>
        )}
      </div>
    );
  }

  function SurpriseScreen() {
    E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, TopBar, PrimaryButton, OliveBranch } = E.UI;
    const [opened, setOpened] = useState({});

    return (
      <Screen k="surprise">
        <TopBar onBack={store.back} label={t('surprise.heading')} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 32px 24px' }}>
          <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 28 }}>
            <div style={{
              fontFamily: E.F.sans, fontSize: 10, letterSpacing: '0.32em',
              textTransform: 'uppercase', color: E.C.inkMute, marginBottom: 16,
            }}>For — you</div>
            <h2 style={{
              fontFamily: E.F.serif, fontSize: 40, fontWeight: 300,
              letterSpacing: '-0.01em', color: E.C.ink, margin: 0,
              lineHeight: 1.05,
            }}>
              Your <em style={{ fontWeight: 300 }}>evening</em><br />awaits.
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
              <OliveBranch size={120} color={E.C.accent} />
            </div>
            <div style={{
              fontFamily: E.F.serif, fontStyle: 'italic', fontSize: 14,
              color: E.C.inkSoft, marginTop: 16, lineHeight: 1.6,
            }}>
              {t('surprise.sub')}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
            {SURPRISE.map((s) => (
              <Letter key={s.id} item={s}
                opened={!!opened[s.id]}
                onOpen={() => setOpened((o) => ({ ...o, [s.id]: true }))}
              />
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 24px 24px', background: E.C.cream, borderTop: `1px solid ${E.C.hair}` }}>
          <PrimaryButton onClick={() => store.go('confirmed')}>{t('surprise.cta.continue')}</PrimaryButton>
        </div>
      </Screen>
    );
  }

  E.Screens = E.Screens || {};
  E.Screens.Surprise = SurpriseScreen;
})();
