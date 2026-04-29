(function () {
  window.Evora = window.Evora || {};
  const E = window.Evora;

  function OliveBranch({ size = 120, color, style = {} }) {
    const stroke = color || E.C.accent;
    return (
      <svg width={size} height={size * 0.55} viewBox="0 0 240 130" style={style}
           fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 70 C 60 65, 110 60, 230 50" />
        <path d="M48 67 C 52 52, 68 46, 78 52 C 72 64, 56 70, 48 67 Z" />
        <path d="M82 64 C 86 49, 102 43, 112 49 C 106 61, 90 67, 82 64 Z" />
        <path d="M118 60 C 122 45, 138 39, 148 45 C 142 57, 126 63, 118 60 Z" />
        <path d="M154 56 C 158 41, 174 35, 184 41 C 178 53, 162 59, 154 56 Z" />
        <path d="M188 53 C 192 38, 208 32, 218 38 C 212 50, 196 56, 188 53 Z" />
        <path d="M62 72 C 58 88, 42 94, 32 88 C 38 76, 54 70, 62 72 Z" />
        <path d="M96 68 C 92 84, 76 90, 66 84 C 72 72, 88 66, 96 68 Z" />
        <path d="M132 64 C 128 80, 112 86, 102 80 C 108 68, 124 62, 132 64 Z" />
        <path d="M168 60 C 164 76, 148 82, 138 76 C 144 64, 160 58, 168 60 Z" />
        <ellipse cx="226" cy="48" rx="4" ry="6" transform="rotate(-20 226 48)" />
      </svg>
    );
  }

  E.UI = E.UI || {};
  E.UI.OliveBranch = OliveBranch;
})();
