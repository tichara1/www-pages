(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;
  const { useEffect } = React;

  function Router() {
    const store = E.useStore();
    const screen = store.screen;

    useEffect(() => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#s=')) {
        const decoded = E.decodeShared(hash.slice(3));
        if (decoded) {
          store.setSharedView({ ...E.emptyDraft(), ...decoded });
          store.go('summary');
          if (decoded.lang === 'cs' || decoded.lang === 'en') store.setLang(decoded.lang);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    switch (screen) {
      case 'entry':     return <E.Screens.Entry />;
      case 'couple':    return <E.Screens.Couple />;
      case 'mode':      return <E.Screens.Mode />;
      case 'config':    return <E.Screens.Config />;
      case 'summary':   return <E.Screens.Summary />;
      case 'surprise':  return <E.Screens.Surprise />;
      case 'confirmed': return <E.Screens.Confirmed />;
      case 'places':    return <E.Screens.Places favsOnly={false} />;
      case 'places-favs':return <E.Screens.Places favsOnly={true} />;
      case 'history':   return <E.Screens.History />;
      default:          return <E.Screens.Entry />;
    }
  }

  function App() {
    return (
      <E.StoreProvider>
        <Router />
      </E.StoreProvider>
    );
  }

  window.App = App;
})();
