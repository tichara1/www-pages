(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;

  function ConfirmedScreen() {
    E.useLang();
    const store = E.useStore();
    const t = E.t;
    const { Screen, PrimaryButton, OliveBranch } = E.UI;

    const onHome = () => {
      store.resetDraft();
      store.reset();
    };

    return (
      <Screen k="confirmed">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', gap: 28 }}>
          <OliveBranch size={140} />
          <h2 style={{ fontFamily: E.F.serif, fontStyle: 'italic', fontWeight: 300, fontSize: 42, color: E.C.ink, margin: 0 }}>{t('confirmed.heading')}</h2>
          <p style={{ fontFamily: E.F.sans, fontSize: 14, color: E.C.inkSoft, margin: 0, textAlign: 'center' }}>{t('confirmed.sub')}</p>
        </div>
        <div style={{ padding: '12px 24px 24px', borderTop: `1px solid ${E.C.hair}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton onClick={onHome}>{t('confirmed.action.home')}</PrimaryButton>
        </div>
      </Screen>
    );
  }

  E.Screens = E.Screens || {};
  E.Screens.Confirmed = ConfirmedScreen;
})();
