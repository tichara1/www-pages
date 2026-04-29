(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;

  // Pick only the fields that are part of a shareable evening.
  const PICK = ['couple', 'path', 'enabled', 'values', 'placeIds', 'date', 'lang'];

  function pick(obj) {
    const out = {};
    for (const k of PICK) if (obj && obj[k] !== undefined) out[k] = obj[k];
    return out;
  }

  function b64urlEncode(str) {
    const utf8 = unescape(encodeURIComponent(str));
    return btoa(utf8).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64urlDecode(str) {
    const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/') + pad;
    return decodeURIComponent(escape(atob(b64)));
  }

  E.encodeShared = function (draft) {
    return b64urlEncode(JSON.stringify(pick(draft)));
  };

  E.decodeShared = function (s) {
    try {
      const obj = JSON.parse(b64urlDecode(s));
      if (!obj || typeof obj !== 'object') return null;
      return pick(obj);
    } catch (_) {
      return null;
    }
  };

  E.buildShareUrl = function (draft) {
    const base = location.origin + location.pathname;
    return base + '#s=' + E.encodeShared(draft);
  };
})();
