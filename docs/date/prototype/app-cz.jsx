// Évora — CZ verze s mapou
const { useState, useEffect, useRef, useMemo } = React;

const C = {
  cream: '#F5F1EA', paper: '#FBF8F2', ink: '#1F1B16',
  inkSoft: '#5A534A', inkMute: '#8C857B',
  hair: '#E4DDD0', hairSoft: '#EFE9DD',
  accent: '#B8553A', accentSoft: '#C9694E',
};
const F = {
  serif: '"Fraunces", "DM Serif Display", Georgia, serif',
  sans: '"Inter", -apple-system, system-ui, sans-serif',
};

function OliveBranch({ size = 120, color = C.accent, style = {} }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 240 130" style={style} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
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

// ──────────────────────────────────────────────────────────
// Romantic line iconography — coherent set, all hairline strokes
// ──────────────────────────────────────────────────────────
const ico = (path, vb = '0 0 32 32') => ({ size = 28, color = C.ink, sw = 1.1, style = {} } = {}) => (
  <svg width={size} height={size} viewBox={vb} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {path}
  </svg>
);

// Two wine glasses, gently clinking
const IcoCheers = ico(<g>
  <path d="M7 5 L11 5 L10.5 11 C 10.5 13, 9 14, 9 14 C 9 14, 7.5 13, 7.5 11 Z" />
  <line x1="9" y1="14" x2="9" y2="22" />
  <line x1="6" y1="22" x2="12" y2="22" />
  <path d="M21 5 L25 5 L24.5 11 C 24.5 13, 23 14, 23 14 C 23 14, 21.5 13, 21.5 11 Z" />
  <line x1="23" y1="14" x2="23" y2="22" />
  <line x1="20" y1="22" x2="26" y2="22" />
  <path d="M11 7 L21 7" strokeDasharray="0.5 1.5" opacity="0.6" />
</g>);

// Plate with cutlery (dinner)
const IcoPlate = ico(<g>
  <circle cx="16" cy="17" r="9" />
  <circle cx="16" cy="17" r="6" opacity="0.5" />
  <line x1="6" y1="6" x2="6" y2="13" />
  <line x1="26" y1="6" x2="26" y2="13" />
</g>);

// Heart (couple)
const IcoHeart = ico(<g>
  <path d="M16 25 C 16 25, 6 19, 6 12 C 6 8, 9 6, 11.5 6 C 13.5 6, 15 7, 16 9 C 17 7, 18.5 6, 20.5 6 C 23 6, 26 8, 26 12 C 26 19, 16 25, 16 25 Z" />
</g>);

// Music note (jazz)
const IcoMusic = ico(<g>
  <path d="M12 22 L12 8 L22 6 L22 20" />
  <ellipse cx="9" cy="22" rx="3" ry="2.5" />
  <ellipse cx="19" cy="20" rx="3" ry="2.5" />
</g>);

// Single bloom (gift / flower)
const IcoBloom = ico(<g>
  <path d="M16 14 C 16 10, 19 8, 21 10 C 23 12, 21 15, 16 14 Z" />
  <path d="M16 14 C 12 14, 10 11, 12 9 C 14 7, 17 9, 16 14 Z" />
  <path d="M16 14 C 13 17, 10 17, 10 14 C 10 12, 13 11, 16 14 Z" />
  <path d="M16 14 C 19 17, 22 17, 22 14 C 22 12, 19 11, 16 14 Z" />
  <circle cx="16" cy="14" r="1.5" fill={C.accent} stroke="none" />
  <path d="M16 15 C 16 18, 16 24, 14 28" />
</g>);

// Crescent moon + star (evening)
const IcoMoon = ico(<g>
  <path d="M22 18 C 18 19, 13 17, 13 12 C 13 9, 14.5 7, 16 6 C 11 6, 7 10, 7 16 C 7 21, 11 25, 17 25 C 20 25, 22 22, 22 18 Z" />
  <path d="M24 8 L25 10 L27 11 L25 12 L24 14 L23 12 L21 11 L23 10 Z" />
</g>);

// Car (transport)
const IcoCar = ico(<g>
  <path d="M5 18 L7 12 C 7.5 11, 8.5 10, 10 10 L 22 10 C 23.5 10, 24.5 11, 25 12 L 27 18 L 27 23 L 24 23 L 24 21 L 8 21 L 8 23 L 5 23 Z" />
  <circle cx="10" cy="22" r="2" />
  <circle cx="22" cy="22" r="2" />
  <line x1="9" y1="14" x2="23" y2="14" opacity="0.4" />
</g>);

// Bed (accommodation)
const IcoBed = ico(<g>
  <path d="M5 22 L5 12 M27 22 L27 16 L13 16 L13 13 L20 13" />
  <line x1="5" y1="22" x2="27" y2="22" />
  <ellipse cx="9" cy="14.5" rx="2" ry="1.5" />
  <line x1="5" y1="19" x2="27" y2="19" opacity="0.4" />
</g>);

// Camera on tripod (gallery / cinema)
const IcoCinema = ico(<g>
  <rect x="6" y="10" width="14" height="9" rx="1" />
  <circle cx="13" cy="14.5" r="2.5" />
  <path d="M20 13 L25 11 L25 18 L20 16 Z" />
  <line x1="10" y1="19" x2="6" y2="25" />
  <line x1="16" y1="19" x2="20" y2="25" />
  <line x1="13" y1="19" x2="13" y2="25" />
</g>);

// Pottery wheel
const IcoPottery = ico(<g>
  <ellipse cx="16" cy="22" rx="9" ry="2" />
  <path d="M10 22 L 11 16 C 11 13, 13 12, 16 12 C 19 12, 21 13, 21 16 L 22 22" />
  <path d="M13 12 C 13 9, 14 7, 16 7 C 18 7, 19 9, 19 12" />
</g>);

// Wine bottle (tasting)
const IcoBottle = ico(<g>
  <path d="M14 5 L18 5 L18 10 C 18 11, 20 12, 20 16 L 20 25 C 20 26, 19 27, 18 27 L 14 27 C 13 27, 12 26, 12 25 L 12 16 C 12 12, 14 11, 14 10 Z" />
  <line x1="13" y1="20" x2="19" y2="20" opacity="0.4" />
</g>);

// Walking figure
const IcoWalk = ico(<g>
  <circle cx="17" cy="6" r="2" />
  <path d="M17 8 L 16 14 L 13 19 M 16 14 L 19 18 L 19 24 M 13 19 L 11 24" />
  <path d="M19 11 L 22 13" />
</g>);

// Compass (entry hero)
function Compass({ size = 64, color = C.accent }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="26" />
      <circle cx="32" cy="32" r="20" opacity="0.4" />
      <path d="M32 18 L36 32 L32 46 L28 32 Z" fill={color} fillOpacity="0.08" />
      <line x1="32" y1="6" x2="32" y2="12" />
      <line x1="32" y1="52" x2="32" y2="58" />
      <line x1="6" y1="32" x2="12" y2="32" />
      <line x1="52" y1="32" x2="58" y2="32" />
      <text x="32" y="14" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="6" fill={color} stroke="none">N</text>
    </svg>
  );
}

// Constellation: arrangement of romantic glyphs around the wordmark
function HeroConstellation({ color = C.accent }) {
  return (
    <svg width="280" height="160" viewBox="0 0 280 160" fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
      {/* connecting threads */}
      <g opacity="0.35" strokeDasharray="1 3">
        <path d="M40 40 Q 90 70, 140 50 T 240 60" />
        <path d="M50 110 Q 100 90, 150 110 T 250 100" />
        <path d="M40 40 L 50 110" />
        <path d="M240 60 L 250 100" />
        <path d="M140 50 L 150 110" />
      </g>

      {/* tiny stars sprinkled */}
      <g opacity="0.6">
        <path d="M75 30 L76 32 L78 33 L76 34 L75 36 L74 34 L72 33 L74 32 Z" fill={color} stroke="none"/>
        <path d="M195 35 L196 37 L198 38 L196 39 L195 41 L194 39 L192 38 L194 37 Z" fill={color} stroke="none"/>
        <path d="M115 130 L116 132 L118 133 L116 134 L115 136 L114 134 L112 133 L114 132 Z" fill={color} stroke="none"/>
        <path d="M210 130 L211 132 L213 133 L211 134 L210 136 L209 134 L207 133 L209 132 Z" fill={color} stroke="none"/>
        <circle cx="100" cy="20" r="0.8" fill={color} stroke="none" />
        <circle cx="170" cy="140" r="0.8" fill={color} stroke="none" />
        <circle cx="40" cy="80" r="0.8" fill={color} stroke="none" />
        <circle cx="260" cy="80" r="0.8" fill={color} stroke="none" />
      </g>

      {/* glyph 1: cheers — top left */}
      <g transform="translate(28 28)">
        <path d="M0 0 L6 0 L5 9 C 5 12, 3 13, 3 13 L 3 20 M0 20 L6 20" />
        <path d="M14 0 L20 0 L19 9 C 19 12, 17 13, 17 13 L 17 20 M14 20 L20 20" />
      </g>

      {/* glyph 2: heart — top right */}
      <g transform="translate(228 44)">
        <path d="M12 18 C 12 18, 4 13, 4 7 C 4 4, 6 3, 8 3 C 9.5 3, 11 4, 12 6 C 13 4, 14.5 3, 16 3 C 18 3, 20 4, 20 7 C 20 13, 12 18, 12 18 Z" />
      </g>

      {/* glyph 3: music note — bottom left */}
      <g transform="translate(38 100)">
        <path d="M8 18 L 8 4 L 18 2 L 18 16" />
        <ellipse cx="6" cy="18" rx="2.4" ry="2" />
        <ellipse cx="16" cy="16" rx="2.4" ry="2" />
      </g>

      {/* glyph 4: bloom — bottom right */}
      <g transform="translate(228 96)">
        <path d="M12 12 C 12 9, 14 7, 16 9 C 18 11, 16 14, 12 12 Z" />
        <path d="M12 12 C 9 12, 7 9, 9 7 C 11 5, 14 7, 12 12 Z" />
        <path d="M12 12 C 9 15, 6 15, 6 12 C 6 10, 9 10, 12 12 Z" />
        <path d="M12 12 C 15 15, 18 15, 18 12 C 18 10, 15 10, 12 12 Z" />
        <path d="M12 13 C 12 17, 12 22, 10 26" />
      </g>

      {/* glyph 5: crescent moon — center */}
      <g transform="translate(128 60)">
        <path d="M22 14 C 18 15, 14 13, 14 10 C 14 8, 15 6, 16 5 C 12 5, 9 8, 9 12 C 9 16, 12 19, 16 19 C 19 19, 22 16, 22 14 Z" />
      </g>
    </svg>
  );
}

function PrimaryButton({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 56, border: 'none', cursor: 'pointer',
      background: C.ink, color: C.cream,
      fontFamily: F.sans, fontSize: 13, fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      borderRadius: 0, transition: 'background 200ms', ...style,
    }}
      onMouseEnter={(e) => e.currentTarget.style.background = C.accent}
      onMouseLeave={(e) => e.currentTarget.style.background = C.ink}>
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 56, cursor: 'pointer',
      background: 'transparent', color: C.ink,
      border: `1px solid ${C.ink}`,
      fontFamily: F.sans, fontSize: 13, fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      borderRadius: 0, transition: 'all 200ms', ...style,
    }}>{children}</button>
  );
}

function Screen({ children, k }) {
  return (
    <div key={k} style={{
      position: 'absolute', inset: 0,
      animation: 'screenIn 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
      background: C.cream, display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

function TopBar({ onBack, label, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 24px', minHeight: 44,
    }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', cursor: onBack ? 'pointer' : 'default',
        padding: 4, color: C.ink, opacity: onBack ? 1 : 0,
        display: 'flex', alignItems: 'center',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <div style={{
        fontFamily: F.sans, fontSize: 11, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: C.inkMute,
      }}>{label}</div>
      <div style={{ width: 26, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

// 1. ENTRY
function EntryScreen({ go }) {
  return (
    <Screen k="entry">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '40px 32px 32px' }}>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <div style={{
            fontFamily: F.sans, fontSize: 10, letterSpacing: '0.36em',
            textTransform: 'uppercase', color: C.inkMute, marginBottom: 14,
          }}>Zal. v Praze · Rande</div>
          <h1 style={{
            fontFamily: F.serif, fontSize: 56, fontWeight: 300,
            letterSpacing: '-0.02em', color: C.ink, margin: 0, lineHeight: 1,
          }}>Évora</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: -8 }}>
          <HeroConstellation color={C.accent} />
          <OliveBranch size={120} color={C.accent} />
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontWeight: 300,
            fontSize: 21, lineHeight: 1.4, color: C.ink,
            textAlign: 'center', maxWidth: 280, marginTop: 4,
          }}>
            Večeře, hudba, květina — <br />večer pro vás dva.
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PrimaryButton onClick={() => go('couple')}>Naplánovat rande</PrimaryButton>
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontSize: 13,
            color: C.inkSoft, textAlign: 'center', lineHeight: 1.5,
          }}>Pro večery, které stojí za vzpomínku.</div>
        </div>
      </div>
    </Screen>
  );
}

// 2. COUPLE
function CoupleScreen({ go, back, setCouple }) {
  const choose = (c) => { setCouple(c); go('date'); };
  return (
    <Screen k="couple">
      <TopBar onBack={back} label="Krok 1 ze 4" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 40px' }}>
        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontFamily: F.serif, fontSize: 36, fontWeight: 300,
            letterSpacing: '-0.01em', color: C.ink, margin: 0, lineHeight: 1.1,
          }}>
            Povězte nám něco <em style={{ fontWeight: 300 }}>o vás dvou</em>.
          </h2>
          <p style={{
            fontFamily: F.sans, fontSize: 14, color: C.inkSoft,
            marginTop: 16, lineHeight: 1.6,
          }}>Podle toho zvolíme tón našich návrhů.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: `1px solid ${C.hair}` }}>
          <ChoiceRow
            title="Teprve začínáme"
            sub="Zvědaví, trochu nervózní, chcete zapůsobit."
            Icon={IcoCheers}
            onClick={() => choose('new')}
          />
          <ChoiceRow
            title="Jsme spolu už dlouho"
            sub="Jistí, ve své kůži, hledáte něco svěžího."
            Icon={IcoHeart}
            onClick={() => choose('long')}
          />
        </div>
      </div>
    </Screen>
  );
}

function ChoiceRow({ title, sub, onClick, Icon }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        textAlign: 'left', padding: '24px 4px', cursor: 'pointer',
        background: 'transparent', border: 'none',
        borderBottom: `1px solid ${C.hair}`, width: '100%', transition: 'all 200ms',
        gap: 16,
      }}>
      {Icon && (
        <div style={{
          width: 48, height: 48, flexShrink: 0,
          border: `1px solid ${hover ? C.accent : C.hair}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 200ms',
        }}>
          <Icon size={26} color={hover ? C.accent : C.ink} sw={1} />
        </div>
      )}
      <div style={{ paddingRight: 8, flex: 1 }}>
        <div style={{
          fontFamily: F.serif, fontSize: 22, fontWeight: 300,
          color: C.ink, marginBottom: 6, lineHeight: 1.2,
        }}>{title}</div>
        <div style={{
          fontFamily: F.sans, fontSize: 13, color: C.inkSoft, lineHeight: 1.5,
        }}>{sub}</div>
      </div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={hover ? C.accent : C.inkMute} strokeWidth="1.2"
        style={{ flexShrink: 0, transition: 'all 200ms', transform: hover ? 'translateX(4px)' : 'none' }}>
        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// 3. MODE
function ModeScreen({ go, back, couple }) {
  const heading = couple === 'new'
    ? <>Jak chcete <em style={{ fontWeight: 300 }}>začít</em>?</>
    : <>Jak to <em style={{ fontWeight: 300 }}>složíme</em>?</>;
  return (
    <Screen k="mode">
      <TopBar onBack={back} label="Krok 3 ze 4" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 40px' }}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontFamily: F.serif, fontSize: 36, fontWeight: 300,
            letterSpacing: '-0.01em', color: C.ink, margin: 0, lineHeight: 1.1,
          }}>{heading}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
          <ModeCard label="Sestavím sám" desc="Vyberete každý prvek. Večeři, dopravu, vše ostatní." num="i" Icon={IcoBottle} onClick={() => go('config')} />
          <ModeCard label="Překvapte mě" desc="Celý večer, složený za vás." num="ii" italic Icon={IcoMoon} onClick={() => go('surprise')} />
        </div>
      </div>
    </Screen>
  );
}

function ModeCard({ label, desc, num, italic, onClick, Icon }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, padding: '28px 28px', cursor: 'pointer',
        background: hover ? C.paper : 'transparent',
        border: `1px solid ${hover ? C.ink : C.hair}`,
        textAlign: 'left', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', alignItems: 'flex-start',
        transition: 'all 250ms', minHeight: 160,
      }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{
          fontFamily: F.serif, fontStyle: 'italic', fontSize: 14,
          color: C.accent, fontWeight: 400,
        }}>{num}.</div>
        {Icon && <Icon size={32} color={hover ? C.accent : C.ink} sw={1} />}
      </div>
      <div>
        <div style={{
          fontFamily: F.serif, fontSize: 28, fontWeight: 300,
          fontStyle: italic ? 'italic' : 'normal',
          color: C.ink, marginBottom: 8, lineHeight: 1.1,
        }}>{label}</div>
        <div style={{
          fontFamily: F.sans, fontSize: 13, color: C.inkSoft, lineHeight: 1.5,
        }}>{desc}</div>
      </div>
    </button>
  );
}

// 4. CONFIG sections — with map coordinates (Prague)
// Coordinates are in lat/lng for actual Prague locations
const SECTIONS = [
  {
    id: 'experience', label: 'Zážitek', required: true, Icon: IcoMusic,
    fields: [
      { id: 'activity', label: 'Aktivita', options: ['Jazz v U Malého Glena', 'Keramická dílna, Holešovice', 'Letní kino na střeše', 'Degustace vín, sklepy v Karlíně', 'Večerní procházka galerií'] },
      { id: 'neighborhood', label: 'Čtvrť', options: ['Vinohrady', 'Karlín', 'Malá Strana', 'Holešovice', 'Žižkov'] },
      { id: 'time', label: 'Čas', options: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'] },
    ],
    defaults: { activity: 'Jazz v U Malého Glena', neighborhood: 'Malá Strana', time: '19:30' },
    summary: (v) => `${v.activity} · ${v.neighborhood} · ${v.time}`,
    price: 980,
    coord: { x: 0.42, y: 0.55, name: 'Malá Strana' }, // normalized within map viewBox
  },
  {
    id: 'dinner', label: 'Večeře', required: false, Icon: IcoPlate,
    fields: [
      { id: 'cuisine', label: 'Kuchyně', options: ['Italské bistro', 'Moderní česká', 'Francouzská', 'Levantská', 'Japonská'] },
      { id: 'atmosphere', label: 'Atmosféra', options: ['Tichá, při svíčkách', 'Živá a hlučná', 'Zahradní terasa', 'Místa u baru'] },
    ],
    defaults: { cuisine: 'Italské bistro', atmosphere: 'Tichá, při svíčkách' },
    summary: (v) => `${v.cuisine} · ${v.atmosphere}`,
    price: 1850,
    coord: { x: 0.62, y: 0.48, name: 'Vinohrady' },
  },
  {
    id: 'gift', label: 'Dárek', required: false, Icon: IcoBloom,
    fields: [
      { id: 'category', label: 'Kategorie', options: ['Jediná květina', 'Ručně vázaná kniha', 'Vzorek z parfumerie', 'Cukrářský box', 'Vinyl, z druhé ruky'] },
      { id: 'budget', label: 'Rozpočet', options: ['Do 500 Kč', '500–1 200 Kč', '1 200–2 500 Kč', 'Otevřený'] },
    ],
    defaults: { category: 'Jediná květina', budget: '500–1 200 Kč' },
    summary: (v) => `${v.category} · ${v.budget}`,
    price: 720,
    coord: { x: 0.55, y: 0.42, name: 'Staré Město' },
  },
  {
    id: 'transport', label: 'Doprava', required: false, Icon: IcoCar,
    fields: [
      { id: 'mode', label: 'Způsob', options: ['Taxi', 'Vlastní auto', 'MHD', 'Pěšky'] },
    ],
    defaults: { mode: 'Taxi' },
    summary: (v) => v.mode,
    price: 320,
    coord: null, // route, not point
  },
  {
    id: 'accommodation', label: 'Ubytování', required: false, Icon: IcoBed,
    fields: [
      { id: 'type', label: 'Typ', options: ['Butikový hotel', 'Designový apartmán', 'Suite v měšťanském domě', 'Pokoj u řeky'] },
      { id: 'stars', label: 'Standard', options: ['3 hvězdy', '4 hvězdy', '5 hvězd'] },
    ],
    defaults: { type: 'Butikový hotel', stars: '4 hvězdy' },
    summary: (v) => `${v.type} · ${v.stars}`,
    price: 4200,
    coord: { x: 0.48, y: 0.62, name: 'Malá Strana' },
  },
];

function ConfigScreen({ go, back, state, setState }) {
  const [openSheet, setOpenSheet] = useState(null);
  const toggle = (id) => setState((s) => ({ ...s, enabled: { ...s.enabled, [id]: !s.enabled[id] } }));
  const updateValues = (id, values) => setState((s) => ({ ...s, values: { ...s.values, [id]: values } }));

  return (
    <Screen k="config">
      <TopBar onBack={back} label="Krok 4 ze 4" />
      <div style={{ padding: '12px 32px 16px' }}>
        <h2 style={{
          fontFamily: F.serif, fontSize: 32, fontWeight: 300,
          letterSpacing: '-0.01em', color: C.ink, margin: 0, lineHeight: 1.1,
        }}>
          Složte <em style={{ fontWeight: 300 }}>večer</em>.
        </h2>
        <p style={{
          fontFamily: F.sans, fontSize: 13, color: C.inkSoft,
          marginTop: 12, lineHeight: 1.6,
        }}>Zapněte, co chcete zařadit. Klepnutím na řádek upravíte detaily.</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', borderTop: `1px solid ${C.hair}` }}>
        {SECTIONS.map((s) => (
          <ConfigRow key={s.id} section={s}
            enabled={state.enabled[s.id]} values={state.values[s.id]}
            onToggle={() => !s.required && toggle(s.id)}
            onOpen={() => setOpenSheet(s.id)} />
        ))}
      </div>

      <div style={{ padding: '16px 24px 24px', background: C.cream, borderTop: `1px solid ${C.hair}` }}>
        <PrimaryButton onClick={() => go('summary')}>Sestavit večer</PrimaryButton>
      </div>

      {openSheet && (
        <BottomSheet section={SECTIONS.find((x) => x.id === openSheet)}
          values={state.values[openSheet]}
          onClose={() => setOpenSheet(null)}
          onChange={(v) => updateValues(openSheet, v)} />
      )}
    </Screen>
  );
}

function ConfigRow({ section, enabled, values, onToggle, onOpen }) {
  const dimmed = !enabled;
  return (
    <div style={{ borderBottom: `1px solid ${C.hair}`, padding: '20px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <button onClick={onOpen} style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          textAlign: 'left', flex: 1, opacity: dimmed ? 0.4 : 1, transition: 'opacity 200ms',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          {section.Icon && (
            <div style={{
              width: 40, height: 40, flexShrink: 0,
              border: `1px solid ${C.hair}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <section.Icon size={22} color={enabled ? C.ink : C.inkMute} sw={1} />
            </div>
          )}
          <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{
              fontFamily: F.serif, fontSize: 20, fontWeight: 300, color: C.ink, lineHeight: 1.2,
            }}>{section.label}</div>
            {section.required && (
              <div style={{
                fontFamily: F.serif, fontStyle: 'italic', fontSize: 11, color: C.accent,
              }}>povinné</div>
            )}
          </div>
          {enabled && (
            <div style={{
              fontFamily: F.sans, fontSize: 12, color: C.inkSoft, marginTop: 6, lineHeight: 1.5,
            }}>{section.summary(values)}</div>
          )}
          {!enabled && (
            <div style={{
              fontFamily: F.serif, fontStyle: 'italic', fontSize: 13, color: C.inkMute, marginTop: 6,
            }}>nezahrnuto</div>
          )}
          </div>
        </button>

        {section.required ? (
          <div style={{ width: 36, display: 'flex', justifyContent: 'flex-end' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.inkMute} strokeWidth="1.2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ) : (
          <Toggle on={enabled} onClick={onToggle} />
        )}
      </div>
    </div>
  );
}

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 22, borderRadius: 11, position: 'relative',
      background: on ? C.ink : 'transparent',
      border: `1px solid ${on ? C.ink : C.inkMute}`,
      cursor: 'pointer', padding: 0, transition: 'all 250ms', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 20 : 2,
        width: 16, height: 16, borderRadius: 8,
        background: on ? C.cream : C.inkMute,
        transition: 'left 220ms cubic-bezier(0.22, 1, 0.36, 1)',
      }} />
    </button>
  );
}

function BottomSheet({ section, values, onClose, onChange }) {
  const [local, setLocal] = useState(values);
  const [closing, setClosing] = useState(false);

  const close = () => { setClosing(true); setTimeout(onClose, 240); };
  const save = () => { onChange(local); close(); };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div onClick={close} style={{
        position: 'absolute', inset: 0, background: 'rgba(31, 27, 22, 0.35)',
        animation: closing ? 'fadeOut 220ms forwards' : 'fadeIn 220ms forwards',
      }} />
      <div style={{
        position: 'relative', background: C.cream,
        borderTop: `1px solid ${C.hair}`,
        animation: closing ? 'sheetOut 240ms cubic-bezier(0.4, 0, 1, 1) forwards'
                           : 'sheetIn 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        maxHeight: '78%', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 16px', borderBottom: `1px solid ${C.hair}`,
        }}>
          <div>
            <div style={{
              fontFamily: F.sans, fontSize: 10, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: C.inkMute, marginBottom: 4,
            }}>Upřesnit</div>
            <div style={{
              fontFamily: F.serif, fontSize: 22, fontWeight: 300, color: C.ink,
            }}>{section.label}</div>
          </div>
          <button onClick={close} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: C.ink, padding: 4,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18"/>
            </svg>
          </button>
        </div>
        <div style={{ overflowY: 'auto', padding: '8px 24px 16px' }}>
          {section.fields.map((f) => (
            <div key={f.id} style={{ marginTop: 24 }}>
              <div style={{
                fontFamily: F.sans, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: C.inkMute, marginBottom: 12,
              }}>{f.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {f.options.map((opt) => {
                  const sel = local[f.id] === opt;
                  return (
                    <button key={opt}
                      onClick={() => setLocal((l) => ({ ...l, [f.id]: opt }))}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 0', background: 'none', border: 'none',
                        borderBottom: `1px solid ${C.hairSoft}`,
                        cursor: 'pointer', textAlign: 'left',
                        fontFamily: F.serif, fontSize: 17, fontWeight: 300,
                        color: sel ? C.ink : C.inkSoft,
                        fontStyle: sel ? 'italic' : 'normal',
                      }}>
                      <span>{opt}</span>
                      {sel && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 24px 24px', borderTop: `1px solid ${C.hair}` }}>
          <PrimaryButton onClick={save}>Uložit</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// PRAGUE MAP — minimalist line drawing
// Hand-traced abstraction of the Vltava + key bridges & roads
// ──────────────────────────────────────────────────────────
function PragueMap({ items, state, hovered, onHover }) {
  // Enabled items with coords
  const points = items
    .map((it) => ({ ...it, coord: SECTIONS.find((s) => s.id === it.id)?.coord }))
    .filter((p) => p.coord);

  const W = 340, H = 240;
  const px = (p) => p.coord.x * W;
  const py = (p) => p.coord.y * H;

  // Compute pseudo-distance (just euclidean × scale) for total
  let totalKm = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = (points[i].coord.x - points[i-1].coord.x) * W;
    const dy = (points[i].coord.y - points[i-1].coord.y) * H;
    totalKm += Math.sqrt(dx*dx + dy*dy) / 35; // scale → ~km feel
  }
  totalKm = Math.max(0.4, totalKm);

  return (
    <div style={{
      position: 'relative', background: C.paper,
      border: `1px solid ${C.hair}`, padding: 0, overflow: 'hidden',
    }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        {/* faint grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C.hairSoft} strokeWidth="0.4"/>
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />

        {/* Vltava river — flows roughly N-S, curves through center */}
        <path d="M 110 -10 C 130 30, 100 60, 130 95 C 145 115, 125 140, 145 170 C 160 195, 140 220, 155 240"
          fill="none" stroke={C.accent} strokeOpacity="0.15" strokeWidth="14" strokeLinecap="round" />
        <path d="M 110 -10 C 130 30, 100 60, 130 95 C 145 115, 125 140, 145 170 C 160 195, 140 220, 155 240"
          fill="none" stroke={C.accent} strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" />

        {/* abstract roads */}
        <g stroke={C.hair} strokeWidth="0.8" fill="none">
          <path d="M 0 80 C 60 78, 100 90, 160 88 C 220 86, 280 95, 340 92" />
          <path d="M 0 130 C 50 128, 110 138, 180 136 C 240 134, 300 142, 340 140" />
          <path d="M 80 0 C 82 50, 95 95, 110 140 C 122 175, 130 210, 132 220" />
          <path d="M 220 0 C 222 50, 215 95, 218 140 C 220 175, 226 210, 228 220" />
          <path d="M 280 0 C 282 50, 278 95, 285 140 C 290 175, 295 210, 296 220" />
        </g>

        {/* bridges (hairline marks across the river) */}
        <g stroke={C.inkMute} strokeWidth="0.6" opacity="0.5">
          <line x1="115" y1="50" x2="135" y2="52" />
          <line x1="120" y1="105" x2="140" y2="108" />
          <line x1="135" y1="155" x2="155" y2="158" />
        </g>

        {/* Neighborhood labels — minuscule */}
        <g fontFamily="Inter, sans-serif" fontSize="6" fill={C.inkMute} letterSpacing="0.15em" style={{ textTransform: 'uppercase' }}>
          <text x="50" y="60" fontStyle="italic" fontFamily="Fraunces, serif" fontSize="8">Holešovice</text>
          <text x="180" y="55" fontStyle="italic" fontFamily="Fraunces, serif" fontSize="8">Karlín</text>
          <text x="60" y="155" fontStyle="italic" fontFamily="Fraunces, serif" fontSize="8">Malá Strana</text>
          <text x="200" y="115" fontStyle="italic" fontFamily="Fraunces, serif" fontSize="8">Vinohrady</text>
          <text x="240" y="170" fontStyle="italic" fontFamily="Fraunces, serif" fontSize="8">Žižkov</text>
          <text x="155" y="100" fontStyle="italic" fontFamily="Fraunces, serif" fontSize="7" fill={C.accent}>Vltava</text>
        </g>

        {/* connecting walking path between points — curved bezier with direction */}
        <defs>
          <marker id="routeArrow" viewBox="0 0 10 10" refX="5" refY="5"
            markerWidth="4" markerHeight="4" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={C.accent} opacity="0.7" />
          </marker>
        </defs>
        {points.length > 1 && points.slice(1).map((p, i) => {
          const a = points[i];
          const b = p;
          const ax = px(a), ay = py(a), bx = px(b), by = py(b);
          // perpendicular control point for soft curve
          const mx = (ax + bx) / 2;
          const my = (ay + by) / 2;
          const dx = bx - ax, dy = by - ay;
          const nx = -dy, ny = dx;
          const len = Math.sqrt(nx*nx + ny*ny) || 1;
          const cx = mx + (nx / len) * 14;
          const cy = my + (ny / len) * 14;
          // shorten endpoints so arrow doesn't overlap pin
          const ux = bx - ax, uy = by - ay;
          const ulen = Math.sqrt(ux*ux + uy*uy) || 1;
          const sx = ax + (ux/ulen) * 11;
          const sy = ay + (uy/ulen) * 11;
          const ex = bx - (ux/ulen) * 13;
          const ey = by - (uy/ulen) * 13;
          return (
            <path key={`r-${i}`}
              d={`M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`}
              fill="none" stroke={C.accent} strokeWidth="0.9"
              strokeDasharray="2 3" opacity="0.7"
              markerEnd="url(#routeArrow)"
            />
          );
        })}

        {/* Points */}
        {points.map((p, i) => {
          const isHover = hovered === p.id;
          const sec = SECTIONS.find((s) => s.id === p.id);
          return (
            <g key={p.id}
              onMouseEnter={() => onHover(p.id)}
              onMouseLeave={() => onHover(null)}
              style={{ cursor: 'pointer' }}>
              {/* halo on hover */}
              <circle cx={px(p)} cy={py(p)} r={isHover ? 14 : 0}
                fill={C.accent} opacity="0.12"
                style={{ transition: 'r 220ms' }} />
              {/* white pad behind icon */}
              <circle cx={px(p)} cy={py(p)} r="9"
                fill={C.cream} stroke={C.accent} strokeWidth="0.9" />
              {/* icon as foreignObject */}
              {sec?.Icon && (
                <foreignObject x={px(p) - 7} y={py(p) - 7} width="14" height="14">
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{
                    width: 14, height: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <sec.Icon size={14} color={C.accent} sw={1.2} />
                  </div>
                </foreignObject>
              )}
              {/* index above pin */}
              <text x={px(p)} y={py(p) - 13}
                textAnchor="middle"
                fontFamily="Fraunces, serif" fontStyle="italic"
                fontSize="8" fill={C.ink}>
                {i + 1}
              </text>
              {/* time label below */}
              <text x={px(p)} y={py(p) + 19}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="6.5" letterSpacing="0.12em"
                fill={C.inkSoft}>
                {p.time}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Caption strip */}
      <div style={{
        padding: '10px 14px', borderTop: `1px solid ${C.hair}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: C.cream,
      }}>
        <div style={{
          fontFamily: F.sans, fontSize: 9, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: C.inkMute,
        }}>Praha · trasa večera</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          fontFamily: F.serif, fontStyle: 'italic', fontSize: 11, color: C.inkSoft,
        }}>
          <span>{points.length} {points.length === 1 ? 'zastávka' : points.length < 5 ? 'zastávky' : 'zastávek'}</span>
          {points.length > 1 && (
            <>
              <span style={{ color: C.hair }}>·</span>
              <span>{totalKm.toFixed(1)} km</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 5. SUMMARY with map
function buildTimeline(state) {
  const expTime = state.values.experience.time;
  const [h, m] = expTime.split(':').map(Number);
  const expMin = h * 60 + m;
  const items = [];

  if (state.enabled.gift) items.push({ id: 'gift', min: expMin - 90 });
  if (state.enabled.transport) items.push({ id: 'transport', min: expMin - 30 });
  items.push({ id: 'experience', min: expMin });
  if (state.enabled.dinner) items.push({ id: 'dinner', min: expMin + 105 });
  if (state.enabled.accommodation) items.push({ id: 'accommodation', min: expMin + 240 });

  return items.sort((a, b) => a.min - b.min).map((it) => ({
    ...it,
    time: `${String(Math.floor(it.min / 60) % 24).padStart(2, '0')}:${String(it.min % 60).padStart(2, '0')}`,
  }));
}

function SummaryScreen({ go, back, state, setOpenSheet, selectedDate, onShare }) {
  const items = useMemo(() => buildTimeline(state), [state]);
  const [hovered, setHovered] = useState(null);
  const total = useMemo(() => {
    let t = SECTIONS.find((s) => s.id === 'experience').price;
    SECTIONS.filter((s) => !s.required).forEach((s) => {
      if (state.enabled[s.id]) t += s.price;
    });
    return t;
  }, [state]);

  return (
    <Screen k="summary">
      <TopBar onBack={back} label="Váš večer" right={(
        <button onClick={onShare} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.ink, padding: 4, display: 'flex', alignItems: 'center',
        }} aria-label="Sdílet">
          <IcoShareGlyph size={18} color={C.ink} sw={1.2} />
        </button>
      )} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h2 style={{
            fontFamily: F.serif, fontSize: 32, fontWeight: 300,
            letterSpacing: '-0.01em', color: C.ink, margin: 0, lineHeight: 1.1,
            maxWidth: 220,
          }}>
            <em style={{ fontWeight: 300 }}>{selectedDate ? CZ_WEEKDAYS_LONG[(selectedDate.getDay() + 6) % 7] : 'Úterý'}</em>,{' '}
            {selectedDate ? `${selectedDate.getDate()}.` : '12.'}
          </h2>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: F.sans, fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.inkMute, marginBottom: 4,
            }}>Celkem</div>
            <div style={{
              fontFamily: F.serif, fontSize: 18, color: C.ink, fontWeight: 300,
            }}>{total.toLocaleString('cs-CZ')} Kč</div>
          </div>
        </div>

        <div style={{
          fontFamily: F.serif, fontStyle: 'italic', fontSize: 15,
          color: C.accent, marginTop: 22, marginBottom: 22,
          paddingLeft: 16, borderLeft: `1px solid ${C.accent}`,
          lineHeight: 1.5, fontWeight: 300,
        }}>
          Večer, jakého ještě nebylo.
        </div>

        {/* MAP */}
        <PragueMap items={items} state={state} hovered={hovered} onHover={setHovered} />

        {/* TIMELINE */}
        <div style={{
          fontFamily: F.sans, fontSize: 10, letterSpacing: '0.24em',
          textTransform: 'uppercase', color: C.inkMute,
          marginTop: 28, marginBottom: 18,
        }}>Časový plán</div>

        <div style={{ position: 'relative', paddingLeft: 28 }}>
          <div style={{
            position: 'absolute', left: 4, top: 8, bottom: 8,
            width: 1, background: C.hair,
          }} />
          {(() => {
            // Map-index counter — only items with coord get a number,
            // matching the pins drawn on the map.
            let mapIdx = 0;
            return items.map((it, i) => {
              const sec = SECTIONS.find((s) => s.id === it.id);
              const hasCoord = !!sec.coord;
              if (hasCoord) mapIdx += 1;
              return (
                <TimelineNode key={it.id}
                  idx={hasCoord ? mapIdx : null}
                  time={it.time} title={sec.label}
                desc={sec.summary(state.values[it.id])}
                  last={i === items.length - 1}
                  hovered={hovered === it.id}
                  onHover={() => setHovered(it.id)}
                  onLeave={() => setHovered(null)}
                  onEdit={() => setOpenSheet(it.id)}
                  hasCoord={hasCoord}
                />
              );
            });
          })()}
        </div>
      </div>

      <div style={{ padding: '16px 24px 24px', background: C.cream, borderTop: `1px solid ${C.hair}` }}>
        <PrimaryButton onClick={() => go('confirmed')}>To je ono</PrimaryButton>
      </div>
    </Screen>
  );
}

function TimelineNode({ idx, time, title, desc, last, onEdit, hovered, onHover, onLeave, hasCoord }) {
  const [hover, setHover] = useState(false);
  const active = hover || hovered;
  return (
    <div style={{ position: 'relative', paddingBottom: last ? 8 : 24 }}
      onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div style={{
        position: 'absolute', left: -28, top: 6,
        width: 9, height: 9, borderRadius: '50%',
        background: active ? C.accent : C.cream,
        border: `1px solid ${C.accent}`,
        transition: 'background 200ms',
      }} />
      <button onClick={onEdit}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          background: 'none', border: 'none', padding: 0, width: '100%',
          textAlign: 'left', cursor: 'pointer', display: 'flex',
          alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
        }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: F.sans, fontSize: 11, letterSpacing: '0.18em',
            color: C.inkMute, marginBottom: 4,
          }}>
            <span>{time}</span>
            {hasCoord && (
              <span style={{
                fontFamily: F.serif, fontStyle: 'italic', fontSize: 10,
                color: C.accent, letterSpacing: 0,
              }}>· {idx}</span>
            )}
          </div>
          <div style={{
            fontFamily: F.serif, fontSize: 19, fontWeight: 300,
            color: C.ink, lineHeight: 1.2, marginBottom: 4,
          }}>{title}</div>
          <div style={{
            fontFamily: F.sans, fontSize: 12, color: C.inkSoft, lineHeight: 1.5,
          }}>{desc}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={active ? C.accent : C.inkMute} strokeWidth="1.2"
          style={{ marginTop: 22, transition: 'all 200ms', transform: active ? 'translateX(2px)' : 'none' }}>
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// 6. SURPRISE
const SURPRISE = [
  { id: 'experience', label: 'Zážitek', Icon: IcoMusic, body: 'Pozdní jazzový set v U Malého Glena. Dvě místa rezervovaná vepředu. Dveře otevřené v půl deváté.', time: '20:30' },
  { id: 'dinner', label: 'Večeře předtím', Icon: IcoPlate, body: 'Malý italský pult na Vinohradech — šest stolů, svíčky, Barolo otevřené při příchodu.', time: '18:30' },
  { id: 'gift', label: 'Drobný dárek', Icon: IcoBloom, body: 'Jediná bílá pivoňka, zabalená v hnědém papíru, čeká u dveří.', time: '18:15' },
  { id: 'transport', label: 'Cesta tam', Icon: IcoCar, body: 'Auto přijede ve dvacet minut po šesté. Tiché, bez spěchu, bez otázek.', time: '18:20' },
];

function SurpriseScreen({ go, back, selectedDate, onShare }) {
  const [opened, setOpened] = useState({});

  return (
    <Screen k="surprise">
      <TopBar onBack={back} label="Složeno pro vás" right={(
        <button onClick={onShare} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.ink, padding: 4, display: 'flex', alignItems: 'center',
        }} aria-label="Sdílet">
          <IcoShareGlyph size={18} color={C.ink} sw={1.2} />
        </button>
      )} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 32px 24px' }}>
        <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 28 }}>
          <div style={{
            fontFamily: F.sans, fontSize: 10, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: C.inkMute, marginBottom: 16,
          }}>Pro — vás</div>
          <h2 style={{
            fontFamily: F.serif, fontSize: 40, fontWeight: 300,
            letterSpacing: '-0.01em', color: C.ink, margin: 0, lineHeight: 1.05,
          }}>
            Váš <em style={{ fontWeight: 300 }}>večer</em><br />čeká.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <OliveBranch size={120} color={C.accent} />
          </div>
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontSize: 14,
            color: C.inkSoft, marginTop: 16, lineHeight: 1.6,
          }}>
            Čtyři obálky.<br />Otevřete je v jakémkoliv pořadí.
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

      <div style={{ padding: '16px 24px 24px', background: C.cream, borderTop: `1px solid ${C.hair}` }}>
        <PrimaryButton onClick={() => go('confirmed')}>To je ono</PrimaryButton>
      </div>
    </Screen>
  );
}

function Letter({ item, opened, onOpen }) {
  return (
    <div style={{
      border: `1px solid ${C.hair}`, background: C.paper,
      padding: opened ? '24px 24px 24px' : '0',
      transition: 'padding 320ms', position: 'relative', overflow: 'hidden',
    }}>
      <svg width="44" height="44" viewBox="0 0 60 60" style={{
        position: 'absolute', top: 8, right: 8, opacity: 0.5,
      }} fill="none" stroke={C.accent} strokeWidth="0.7" strokeLinecap="round">
        <path d="M10 30 C 24 28, 36 22, 50 14" />
        <path d="M22 28 C 24 22, 30 20, 34 22 C 32 28, 26 30, 22 28 Z" />
        <path d="M34 22 C 36 16, 42 14, 46 16 C 44 22, 38 24, 34 22 Z" />
      </svg>

      {!opened ? (
        <button onClick={onOpen} style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '24px 24px 24px', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
            {item.Icon && (
              <div style={{
                width: 44, height: 44, flexShrink: 0,
                border: `1px solid ${C.hair}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <item.Icon size={24} color={C.ink} sw={1} />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: F.sans, fontSize: 10, letterSpacing: '0.24em',
                textTransform: 'uppercase', color: C.inkMute, marginBottom: 6,
              }}>Zapečetěno</div>
              <div style={{
                fontFamily: F.serif, fontSize: 22, fontWeight: 300, color: C.ink, lineHeight: 1.2,
              }}>{item.label}</div>
            </div>
          </div>
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontSize: 13,
            color: C.accent, whiteSpace: 'nowrap',
          }}>otevřít pečeť</div>
        </button>
      ) : (
        <div style={{ animation: 'letterOpen 480ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{
              fontFamily: F.sans, fontSize: 10, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: C.accent,
            }}>{item.time}</div>
            {item.Icon && <item.Icon size={22} color={C.accent} sw={1} />}
          </div>
          <div style={{
            fontFamily: F.serif, fontSize: 22, fontWeight: 300,
            color: C.ink, lineHeight: 1.2, marginBottom: 12,
          }}>{item.label}</div>
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontSize: 16,
            color: C.inkSoft, lineHeight: 1.55, fontWeight: 300,
          }}>{item.body}</div>
        </div>
      )}
    </div>
  );
}

// CONFIRMED
function ConfirmedScreen({ go }) {
  return (
    <Screen k="confirmed">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{
          fontFamily: F.sans, fontSize: 10, letterSpacing: '0.32em',
          textTransform: 'uppercase', color: C.inkMute, marginBottom: 20,
        }}>Potvrzeno</div>
        <h2 style={{
          fontFamily: F.serif, fontSize: 38, fontWeight: 300,
          color: C.ink, margin: 0, lineHeight: 1.1,
        }}>
          Vidíme se v <em style={{ fontWeight: 300 }}>úterý</em>.
        </h2>
        <div style={{
          fontFamily: F.serif, fontStyle: 'italic', fontSize: 14,
          color: C.inkSoft, marginTop: 20, lineHeight: 1.6, maxWidth: 240,
        }}>
          Pošleme tichou připomínku<br />ráno před setkáním.
        </div>
      </div>
      <div style={{ padding: '16px 24px 24px' }}>
        <GhostButton onClick={() => go('entry')}>Naplánovat další</GhostButton>
      </div>
    </Screen>
  );
}

// ──────────────────────────────────────────────────────────
// DATE PICKER — minimalist month grid
// ──────────────────────────────────────────────────────────
const CZ_MONTHS = ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'];
const CZ_WEEKDAYS_SHORT = ['po', 'út', 'st', 'čt', 'pá', 'so', 'ne'];
const CZ_WEEKDAYS_LONG = ['pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota', 'neděle'];

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d, n) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function isPast(d) { const t = new Date(); t.setHours(0,0,0,0); return d < t; }

function buildMonthGrid(monthDate) {
  const first = startOfMonth(monthDate);
  // Czech week starts Monday — JS getDay: 0=Sun, 1=Mon, ...
  const firstWeekday = (first.getDay() + 6) % 7; // 0 = Mon
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function DateScreen({ go, back, selectedDate, setSelectedDate }) {
  const today = useMemo(() => { const t = new Date(); t.setHours(0,0,0,0); return t; }, []);
  const [view, setView] = useState(() => startOfMonth(selectedDate || today));
  const cells = useMemo(() => buildMonthGrid(view), [view]);

  const cont = () => { if (selectedDate) go('mode'); };
  const monthLabel = `${CZ_MONTHS[view.getMonth()]} ${view.getFullYear()}`;

  const dayLabel = selectedDate
    ? `${CZ_WEEKDAYS_LONG[(selectedDate.getDay() + 6) % 7]}, ${selectedDate.getDate()}. ${CZ_MONTHS[selectedDate.getMonth()]}`
    : null;

  return (
    <Screen k="date">
      <TopBar onBack={back} label="Krok 2 ze 4" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 32px 24px', overflowY: 'auto' }}>
        <h2 style={{
          fontFamily: F.serif, fontSize: 32, fontWeight: 300,
          letterSpacing: '-0.01em', color: C.ink, margin: 0, lineHeight: 1.1,
        }}>
          Kdy to <em style={{ fontWeight: 300 }}>bude</em>?
        </h2>
        <p style={{
          fontFamily: F.sans, fontSize: 13, color: C.inkSoft,
          marginTop: 12, lineHeight: 1.6,
        }}>Vyberte večer. Datum lze později změnit.</p>

        {/* Month nav */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 28, paddingBottom: 16, borderBottom: `1px solid ${C.hair}`,
        }}>
          <button onClick={() => setView((v) => addMonths(v, -1))}
            disabled={view <= startOfMonth(today)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
              color: view <= startOfMonth(today) ? C.inkMute : C.ink,
              opacity: view <= startOfMonth(today) ? 0.3 : 1,
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div style={{
            fontFamily: F.serif, fontSize: 19, fontWeight: 300,
            color: C.ink, fontStyle: 'italic',
          }}>{monthLabel}</div>
          <button onClick={() => setView((v) => addMonths(v, 1))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: C.ink }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Weekday header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginTop: 18, marginBottom: 6 }}>
          {CZ_WEEKDAYS_SHORT.map((w) => (
            <div key={w} style={{
              textAlign: 'center',
              fontFamily: F.sans, fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: C.inkMute,
            }}>{w}</div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {cells.map((d, i) => {
            if (!d) return <div key={i} style={{ height: 42 }} />;
            const sel = sameDay(d, selectedDate);
            const past = isPast(d);
            const isToday = sameDay(d, today);
            return (
              <button key={i}
                disabled={past}
                onClick={() => setSelectedDate(new Date(d))}
                style={{
                  height: 42, position: 'relative', cursor: past ? 'not-allowed' : 'pointer',
                  background: sel ? C.ink : 'transparent',
                  color: sel ? C.cream : (past ? C.inkMute : C.ink),
                  opacity: past ? 0.3 : 1,
                  border: sel ? 'none' : (isToday ? `1px solid ${C.accent}` : `1px solid transparent`),
                  fontFamily: F.serif, fontSize: 16, fontWeight: 300,
                  transition: 'all 180ms', borderRadius: 0, padding: 0,
                }}>
                {d.getDate()}
                {isToday && !sel && (
                  <div style={{
                    position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
                    width: 3, height: 3, borderRadius: '50%', background: C.accent,
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected summary */}
        <div style={{
          marginTop: 28, padding: '20px 0', borderTop: `1px solid ${C.hair}`,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 44, height: 44, flexShrink: 0,
            border: `1px solid ${selectedDate ? C.accent : C.hair}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: F.sans, fontSize: 7, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: selectedDate ? C.accent : C.inkMute,
            }}>{selectedDate ? CZ_MONTHS[selectedDate.getMonth()].slice(0,3) : '—'}</div>
            <div style={{
              fontFamily: F.serif, fontSize: 18, fontWeight: 300,
              color: selectedDate ? C.ink : C.inkMute, lineHeight: 1,
            }}>{selectedDate ? selectedDate.getDate() : '·'}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: F.sans, fontSize: 9, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: C.inkMute, marginBottom: 4,
            }}>Vybráno</div>
            <div style={{
              fontFamily: F.serif, fontSize: 17, fontWeight: 300,
              color: selectedDate ? C.ink : C.inkMute,
              fontStyle: selectedDate ? 'italic' : 'normal',
            }}>{dayLabel || 'žádný den'}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 24px 24px', background: C.cream, borderTop: `1px solid ${C.hair}` }}>
        <PrimaryButton onClick={cont} style={{
          opacity: selectedDate ? 1 : 0.4,
          cursor: selectedDate ? 'pointer' : 'not-allowed',
        }}>Pokračovat</PrimaryButton>
      </div>
    </Screen>
  );
}

// ──────────────────────────────────────────────────────────
// ICS export + Share helpers
// ──────────────────────────────────────────────────────────
function formatICSDate(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

function buildICS({ date, items, state }) {
  // Each timeline item becomes a VEVENT
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Évora//Date//CZ',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  items.forEach((it, idx) => {
    const sec = SECTIONS.find((s) => s.id === it.id);
    const [h, m] = it.time.split(':').map(Number);
    const start = new Date(date);
    start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1h default
    const summary = `Évora — ${sec.label}`;
    const desc = sec.summary(state.values[it.id]).replace(/[,;]/g, ' ');
    const loc = sec.coord ? sec.coord.name + ', Praha' : 'Praha';
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:evora-${Date.now()}-${idx}@evora.cz`);
    lines.push(`DTSTAMP:${formatICSDate(new Date())}`);
    lines.push(`DTSTART:${formatICSDate(start)}`);
    lines.push(`DTEND:${formatICSDate(end)}`);
    lines.push(`SUMMARY:${summary}`);
    lines.push(`DESCRIPTION:${desc}`);
    lines.push(`LOCATION:${loc}`);
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

function downloadICS(filename, content) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ──────────────────────────────────────────────────────────
// SHARE SHEET
// ──────────────────────────────────────────────────────────
function ShareSheet({ onClose, date, items, state, total }) {
  const [closing, setClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const close = () => { setClosing(true); setTimeout(onClose, 240); };

  const dateStr = date
    ? `${CZ_WEEKDAYS_LONG[(date.getDay() + 6) % 7]}, ${date.getDate()}. ${CZ_MONTHS[date.getMonth()]}`
    : '';

  const shareText = items.map((it) => {
    const sec = SECTIONS.find((s) => s.id === it.id);
    return `${it.time} — ${sec.label}: ${sec.summary(state.values[it.id])}`;
  }).join('\n');

  const fullText = `Évora — ${dateStr}\n\n${shareText}\n\nCelkem ${total.toLocaleString('cs-CZ')} Kč`;

  const onCalendar = () => {
    const ics = buildICS({ date, items, state });
    downloadICS(`evora-${date.toISOString().slice(0,10)}.ics`, ics);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const onShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Évora — váš večer', text: fullText });
      } catch (e) { /* user cancelled */ }
    } else {
      onCopy();
    }
  };

  // Tiny QR-ish ornament (decorative — not a real QR)
  const QrOrnament = () => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 8 }).map((_, c) => {
          const seed = (r * 7 + c * 13 + r * c) % 7;
          const filled = seed > 2;
          return filled ? (
            <rect key={`${r}-${c}`} x={c * 9 + 4} y={r * 9 + 4} width="7" height="7" fill={C.ink} />
          ) : null;
        })
      )}
      {/* corner anchors */}
      <rect x="0" y="0" width="22" height="22" fill={C.cream} />
      <rect x="0" y="0" width="22" height="22" fill="none" stroke={C.ink} strokeWidth="2" />
      <rect x="6" y="6" width="10" height="10" fill={C.ink} />
      <rect x="58" y="0" width="22" height="22" fill={C.cream} />
      <rect x="58" y="0" width="22" height="22" fill="none" stroke={C.ink} strokeWidth="2" />
      <rect x="64" y="6" width="10" height="10" fill={C.ink} />
      <rect x="0" y="58" width="22" height="22" fill={C.cream} />
      <rect x="0" y="58" width="22" height="22" fill="none" stroke={C.ink} strokeWidth="2" />
      <rect x="6" y="64" width="10" height="10" fill={C.ink} />
    </svg>
  );

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 60,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div onClick={close} style={{
        position: 'absolute', inset: 0, background: 'rgba(31, 27, 22, 0.4)',
        animation: closing ? 'fadeOut 220ms forwards' : 'fadeIn 220ms forwards',
      }} />
      <div style={{
        position: 'relative', background: C.cream, borderTop: `1px solid ${C.hair}`,
        animation: closing ? 'sheetOut 240ms cubic-bezier(0.4, 0, 1, 1) forwards'
                           : 'sheetIn 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        maxHeight: '88%', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 16px', borderBottom: `1px solid ${C.hair}`,
        }}>
          <div>
            <div style={{
              fontFamily: F.sans, fontSize: 10, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: C.inkMute, marginBottom: 4,
            }}>Sdílet</div>
            <div style={{
              fontFamily: F.serif, fontSize: 22, fontWeight: 300, color: C.ink,
            }}>Váš večer</div>
          </div>
          <button onClick={close} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: C.ink, padding: 4,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18"/>
            </svg>
          </button>
        </div>

        <div style={{ overflowY: 'auto', padding: '24px 24px 8px' }}>
          {/* QR + summary card */}
          <div style={{
            border: `1px solid ${C.hair}`, padding: 20, background: C.paper,
            display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24,
          }}>
            <QrOrnament />
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: F.sans, fontSize: 9, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: C.inkMute, marginBottom: 4,
              }}>évora.cz/v</div>
              <div style={{
                fontFamily: F.serif, fontSize: 18, fontWeight: 300, color: C.ink,
                fontStyle: 'italic', lineHeight: 1.2,
              }}>{dateStr}</div>
              <div style={{
                fontFamily: F.sans, fontSize: 11, color: C.inkSoft, marginTop: 6,
              }}>{items.length} {items.length < 5 ? 'zastávky' : 'zastávek'} · {total.toLocaleString('cs-CZ')} Kč</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ShareRow Icon={IcoCalendar} label="Přidat do kalendáře" sub="Stáhnout .ics soubor" onClick={onCalendar} />
            <ShareRow Icon={IcoLink} label={copied ? 'Zkopírováno' : 'Kopírovat detaily'} sub={copied ? 'Vloženo do schránky' : 'Text plánu večera'} onClick={onCopy} accent={copied} />
            <ShareRow Icon={IcoShareGlyph} label="Sdílet odkaz" sub="Pošlete partnerovi" onClick={onShare} />
            <ShareRow Icon={IcoEnvelope} label="Poslat e-mailem" sub="Odkaz a shrnutí" onClick={() => {
              const url = `mailto:?subject=${encodeURIComponent('Évora — náš večer')}&body=${encodeURIComponent(fullText)}`;
              window.open(url);
            }} />
          </div>
        </div>

        <div style={{ padding: '16px 24px 24px', borderTop: `1px solid ${C.hair}` }}>
          <GhostButton onClick={close}>Hotovo</GhostButton>
        </div>
      </div>
    </div>
  );
}

const IcoCalendar = ico(<g>
  <rect x="5" y="7" width="22" height="20" />
  <line x1="5" y1="13" x2="27" y2="13" />
  <line x1="11" y1="4" x2="11" y2="9" />
  <line x1="21" y1="4" x2="21" y2="9" />
  <circle cx="11" cy="19" r="1" fill="currentColor" stroke="none" />
  <circle cx="16" cy="19" r="1" fill="currentColor" stroke="none" />
  <circle cx="21" cy="19" r="1" fill="currentColor" stroke="none" />
  <circle cx="11" cy="23" r="1" fill="currentColor" stroke="none" />
</g>);

const IcoLink = ico(<g>
  <path d="M14 18 L 18 14" />
  <path d="M11 21 L 8 24 C 6 26, 3 24, 5 22 L 8 19" />
  <path d="M21 11 L 24 8 C 26 6, 28 8, 26 10 L 23 13" />
  <path d="M11 21 C 13 22, 16 22, 18 20" />
  <path d="M21 11 C 19 10, 16 10, 14 12" />
</g>);

const IcoShareGlyph = ico(<g>
  <circle cx="22" cy="8" r="3" />
  <circle cx="10" cy="16" r="3" />
  <circle cx="22" cy="24" r="3" />
  <line x1="13" y1="14.5" x2="19" y2="9.5" />
  <line x1="13" y1="17.5" x2="19" y2="22.5" />
</g>);

const IcoEnvelope = ico(<g>
  <rect x="5" y="9" width="22" height="14" />
  <path d="M5 10 L 16 18 L 27 10" />
</g>);

function ShareRow({ Icon, label, sub, onClick, accent }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '18px 4px',
        background: 'none', border: 'none', borderBottom: `1px solid ${C.hairSoft}`,
        cursor: 'pointer', textAlign: 'left', width: '100%',
      }}>
      <div style={{
        width: 44, height: 44, flexShrink: 0,
        border: `1px solid ${hover || accent ? C.accent : C.hair}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 200ms',
      }}>
        <Icon size={22} color={hover || accent ? C.accent : C.ink} sw={1} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: F.serif, fontSize: 17, fontWeight: 300,
          color: accent ? C.accent : C.ink, lineHeight: 1.2,
        }}>{label}</div>
        <div style={{
          fontFamily: F.sans, fontSize: 12, color: C.inkSoft, marginTop: 4,
        }}>{sub}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke={hover ? C.accent : C.inkMute} strokeWidth="1.2"
        style={{ transition: 'all 200ms', transform: hover ? 'translateX(2px)' : 'none' }}>
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// APP
function App() {
  const [screen, setScreen] = useState('entry');
  const [history, setHistory] = useState([]);
  const [couple, setCouple] = useState('new');
  const [openSheetId, setOpenSheetId] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 7); d.setHours(0,0,0,0); return d;
  });

  const initialState = useMemo(() => ({
    enabled: { experience: true, dinner: true, gift: true, transport: true, accommodation: false },
    values: Object.fromEntries(SECTIONS.map((s) => [s.id, { ...s.defaults }])),
  }), []);
  const [state, setState] = useState(initialState);

  const go = (next) => {
    setHistory((h) => [...h, screen]);
    setScreen(next);
  };
  const back = () => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setScreen(prev);
      return h.slice(0, -1);
    });
  };
  const updateValues = (id, values) => {
    setState((s) => ({ ...s, values: { ...s.values, [id]: values } }));
  };

  return (
    <>
      {screen === 'entry' && <EntryScreen go={go} />}
      {screen === 'couple' && <CoupleScreen go={go} back={back} setCouple={setCouple} />}
      {screen === 'date' && <DateScreen go={go} back={back} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
      {screen === 'mode' && <ModeScreen go={go} back={back} couple={couple} />}
      {screen === 'config' && <ConfigScreen go={go} back={back} state={state} setState={setState} />}
      {screen === 'summary' && <SummaryScreen go={go} back={back} state={state} setOpenSheet={setOpenSheetId} selectedDate={selectedDate} onShare={() => setShareOpen(true)} />}
      {screen === 'surprise' && <SurpriseScreen go={go} back={back} selectedDate={selectedDate} onShare={() => setShareOpen(true)} />}
      {screen === 'confirmed' && <ConfirmedScreen go={(s) => { setHistory([]); setScreen(s); setState(initialState); }} />}

      {openSheetId && screen === 'summary' && (
        <BottomSheet
          section={SECTIONS.find((x) => x.id === openSheetId)}
          values={state.values[openSheetId]}
          onClose={() => setOpenSheetId(null)}
          onChange={(v) => updateValues(openSheetId, v)}
        />
      )}

      {shareOpen && (
        <ShareSheet
          onClose={() => setShareOpen(false)}
          date={selectedDate}
          items={buildTimeline(state)}
          state={state}
          total={(() => {
            let t = SECTIONS.find((s) => s.id === 'experience').price;
            SECTIONS.filter((s) => !s.required).forEach((s) => { if (state.enabled[s.id]) t += s.price; });
            return t;
          })()}
        />
      )}
    </>
  );
}

window.App = App;
