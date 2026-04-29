(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const KEY = 'evora.v1';

  const SECTIONS = ['experience', 'dinner', 'gift', 'transport', 'accommodation'];

  const DEFAULT_VALUES = {
    experience:    { activity: 'Jazz at U Malého Glena', neighborhood: 'Malá Strana', time: '19:30' },
    dinner:        { cuisine: 'Italian bistro', atmosphere: 'Quiet & candlelit' },
    gift:          { category: 'Single stem', budget: '500–1 200 CZK' },
    transport:     { mode: 'Taxi' },
    accommodation: { type: 'Boutique hotel', stars: '4 stars' },
  };

  const DEFAULT_ENABLED = {
    experience: true, dinner: false, gift: false, transport: false, accommodation: false,
  };

  function emptyDraft() {
    return {
      couple: null,
      path: null,
      enabled: { ...DEFAULT_ENABLED },
      values: JSON.parse(JSON.stringify(DEFAULT_VALUES)),
      placeIds: {},
      date: null,
    };
  }

  function isDraftDirty(d) {
    if (!d) return false;
    if (d.couple || d.path || d.date) return true;
    if (d.placeIds && Object.keys(d.placeIds).length > 0) return true;
    for (const s of SECTIONS) if (d.enabled[s] !== DEFAULT_ENABLED[s]) return true;
    return false;
  }

  function loadPersisted() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (!obj || typeof obj !== 'object') return null;
      return obj;
    } catch (_) { return null; }
  }

  E.SECTIONS = SECTIONS;
  E.DEFAULT_VALUES = DEFAULT_VALUES;
  E.DEFAULT_ENABLED = DEFAULT_ENABLED;
  E.emptyDraft = emptyDraft;
  E.isDraftDirty = isDraftDirty;

  const StoreCtx = React.createContext(null);
  E.useStore = () => React.useContext(StoreCtx);

  E.StoreProvider = function StoreProvider({ children }) {
    const persisted = React.useMemo(loadPersisted, []);
    const [lang, setLangState] = React.useState(() =>
      (persisted && (persisted.lang === 'cs' || persisted.lang === 'en')) ? persisted.lang : E.getLang()
    );
    const [stack, setStack] = React.useState(['entry']);
    const [draft, setDraft] = React.useState(() =>
      (persisted && persisted.draft) ? { ...emptyDraft(), ...persisted.draft } : emptyDraft()
    );
    const [history, setHistory] = React.useState(() =>
      (persisted && Array.isArray(persisted.history)) ? persisted.history : []
    );
    const [favorites, setFavorites] = React.useState(() =>
      (persisted && Array.isArray(persisted.favorites)) ? persisted.favorites : []
    );
    const [sharedView, setSharedView] = React.useState(null);

    React.useEffect(() => { E.setLang(lang); }, [lang]);

    React.useEffect(() => {
      const t = setTimeout(() => {
        try {
          localStorage.setItem(KEY, JSON.stringify({ lang, draft, history, favorites }));
        } catch (_) {}
      }, 200);
      return () => clearTimeout(t);
    }, [lang, draft, history, favorites]);

    const api = React.useMemo(() => ({
      lang, setLang: setLangState,
      screen: stack[stack.length - 1],
      stack,
      go: (name) => setStack((s) => [...s, name]),
      back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
      reset: () => setStack(['entry']),

      draft,
      updateDraft: (patch) => setDraft((d) => ({ ...d, ...patch })),
      updateEnabled: (id, on) => setDraft((d) => ({ ...d, enabled: { ...d.enabled, [id]: on } })),
      updateValues:  (id, vals) => setDraft((d) => ({ ...d, values: { ...d.values, [id]: vals } })),
      setPlaceId:    (sectionId, placeId) => setDraft((d) => {
        const next = { ...d.placeIds };
        if (placeId == null) delete next[sectionId]; else next[sectionId] = placeId;
        return { ...d, placeIds: next };
      }),
      resetDraft: () => setDraft(emptyDraft()),
      isDraftDirty: () => isDraftDirty(draft),

      history,
      pushHistory: () => {
        const id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
        const entry = { id, confirmedAt: new Date().toISOString(), ...JSON.parse(JSON.stringify(draft)) };
        setHistory((h) => [entry, ...h].slice(0, 50));
      },
      removeHistoryItem: (id) => setHistory((h) => h.filter((e) => e.id !== id)),
      replicateHistory: (id) => {
        const e = history.find((x) => x.id === id);
        if (!e) return;
        const { id: _i, confirmedAt: _c, ...rest } = e;
        setDraft({ ...emptyDraft(), ...rest });
      },

      favorites,
      isFavorite: (id) => favorites.indexOf(id) >= 0,
      toggleFavorite: (id) => setFavorites((f) =>
        f.indexOf(id) >= 0 ? f.filter((x) => x !== id) : [...f, id]
      ),

      sharedView,
      setSharedView,
      clearSharedView: () => setSharedView(null),
    }), [lang, stack, draft, history, favorites, sharedView]);

    return React.createElement(StoreCtx.Provider, { value: api }, children);
  };
})();
