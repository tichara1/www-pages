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

  const MAX_ENCODED_LEN = 8192;
  const COUPLE_VALUES = { new: 1, long: 1 };
  const PATH_VALUES = { config: 1, surprise: 1 };
  const LANG_VALUES = { cs: 1, en: 1 };
  const PLACE_ID_RE = /^p_\d{2}$/;

  function isPlainObject(v) {
    return v && typeof v === 'object' && !Array.isArray(v);
  }

  function validateAndCoerce(obj) {
    const out = {};
    if (obj.couple === null || COUPLE_VALUES[obj.couple]) out.couple = obj.couple == null ? null : obj.couple;
    if (obj.path === null || PATH_VALUES[obj.path]) out.path = obj.path == null ? null : obj.path;
    if (obj.lang && LANG_VALUES[obj.lang]) out.lang = obj.lang;
    if (typeof obj.date === 'string' && obj.date.length <= 40) out.date = obj.date;
    if (obj.date === null) out.date = null;
    if (isPlainObject(obj.enabled)) {
      out.enabled = {};
      for (const k of Object.keys(obj.enabled)) {
        if (typeof obj.enabled[k] === 'boolean') out.enabled[k] = obj.enabled[k];
      }
    }
    if (isPlainObject(obj.values)) {
      out.values = {};
      for (const k of Object.keys(obj.values)) {
        if (isPlainObject(obj.values[k])) {
          const inner = {};
          for (const f of Object.keys(obj.values[k])) {
            const v = obj.values[k][f];
            if (typeof v === 'string' && v.length <= 200) inner[f] = v;
          }
          out.values[k] = inner;
        }
      }
    }
    if (isPlainObject(obj.placeIds)) {
      out.placeIds = {};
      for (const k of Object.keys(obj.placeIds)) {
        const v = obj.placeIds[k];
        if (typeof v === 'string' && PLACE_ID_RE.test(v)) out.placeIds[k] = v;
      }
    }
    return out;
  }

  E.decodeShared = function (s) {
    if (typeof s !== 'string' || s.length === 0 || s.length > MAX_ENCODED_LEN) return null;
    try {
      const obj = JSON.parse(b64urlDecode(s));
      if (!isPlainObject(obj)) return null;
      return validateAndCoerce(pick(obj));
    } catch (_) {
      return null;
    }
  };

  E.buildShareUrl = function (draft) {
    const base = location.origin + location.pathname;
    return base + '#s=' + E.encodeShared(draft);
  };
})();
