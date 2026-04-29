(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;

  // Persistence note: this module READS `evora.v1.lang` for initial detection
  // but never writes to localStorage. The store (lib/store.js) owns writes
  // to the `evora.v1` key. Do not add localStorage.setItem here.
  let currentLang = (function detect() {
    try {
      const stored = localStorage.getItem('evora.v1');
      if (stored) {
        const obj = JSON.parse(stored);
        if (obj && (obj.lang === 'cs' || obj.lang === 'en')) return obj.lang;
      }
    } catch (_) {}
    return (navigator.language || 'en').toLowerCase().startsWith('cs') ? 'cs' : 'en';
  })();

  const subscribers = new Set();

  E.getLang = () => currentLang;

  E.setLang = (lang) => {
    if (lang !== 'cs' && lang !== 'en') return;
    if (lang === currentLang) return;
    currentLang = lang;
    subscribers.forEach((fn) => fn(lang));
  };

  E.t = (key, vars) => {
    const dict = (E.I18N && E.I18N[currentLang]) || {};
    let raw = dict[key];
    if (raw == null) {
      const fallback = (E.I18N && E.I18N.en) || {};
      raw = fallback[key] != null ? fallback[key] : key;
    }
    if (vars) {
      raw = raw.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
    }
    return raw;
  };

  E.useLang = () => {
    const [, force] = React.useReducer((x) => x + 1, 0);
    React.useEffect(() => {
      const fn = () => force();
      subscribers.add(fn);
      return () => { subscribers.delete(fn); };
    }, []);
    return currentLang;
  };
})();
