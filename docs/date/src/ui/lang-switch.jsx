(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;

  function LangSwitch({ style = {} }) {
    const store = E.useStore();
    const lang = store ? store.lang : E.getLang();
    const setLang = store ? store.setLang : E.setLang;

    const item = (code, label) => (
      <button onClick={() => setLang(code)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '6px 10px', fontFamily: E.F.sans, fontSize: 11,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: lang === code ? E.C.ink : E.C.inkMute,
        fontWeight: lang === code ? 500 : 400,
      }}>{label}</button>
    );

    return (
      <div style={{ display: 'inline-flex', alignItems: 'center',
        border: `1px solid ${E.C.hair}`, borderRadius: 999,
        padding: '2px 4px', background: E.C.paper, ...style }}>
        {item('cs', 'CZ')}
        <div style={{ width: 1, height: 14, background: E.C.hair }}/>
        {item('en', 'EN')}
      </div>
    );
  }

  E.UI = E.UI || {};
  E.UI.LangSwitch = LangSwitch;
})();
