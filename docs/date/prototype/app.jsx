// Évora — date planning prototype
// Single-file app component. Uses globals: React, IOSDevice, IOSStatusBar, lucide.

const { useState, useEffect, useRef, useMemo } = React;

// ──────────────────────────────────────────────────────────
// Tokens
// ──────────────────────────────────────────────────────────
const C = {
  cream: '#F5F1EA',
  paper: '#FBF8F2',
  ink: '#1F1B16',
  inkSoft: '#5A534A',
  inkMute: '#8C857B',
  hair: '#E4DDD0',
  hairSoft: '#EFE9DD',
  accent: '#B8553A',     // terracotta
  accentSoft: '#C9694E',
};
const F = {
  serif: '"Fraunces", "DM Serif Display", Georgia, serif',
  sans: '"Inter", -apple-system, system-ui, sans-serif',
};

// ──────────────────────────────────────────────────────────
// Olive branch — single delicate line illustration
// Used in EXACTLY 2 places: entry screen + surprise reveal
// ──────────────────────────────────────────────────────────
function OliveBranch({ size = 120, color = C.accent, style = {} }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 240 130" style={style} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {/* main stem */}
      <path d="M10 70 C 60 65, 110 60, 230 50" />
      {/* leaves top side */}
      <path d="M48 67 C 52 52, 68 46, 78 52 C 72 64, 56 70, 48 67 Z" />
      <path d="M82 64 C 86 49, 102 43, 112 49 C 106 61, 90 67, 82 64 Z" />
      <path d="M118 60 C 122 45, 138 39, 148 45 C 142 57, 126 63, 118 60 Z" />
      <path d="M154 56 C 158 41, 174 35, 184 41 C 178 53, 162 59, 154 56 Z" />
      <path d="M188 53 C 192 38, 208 32, 218 38 C 212 50, 196 56, 188 53 Z" />
      {/* leaves bottom side */}
      <path d="M62 72 C 58 88, 42 94, 32 88 C 38 76, 54 70, 62 72 Z" />
      <path d="M96 68 C 92 84, 76 90, 66 84 C 72 72, 88 66, 96 68 Z" />
      <path d="M132 64 C 128 80, 112 86, 102 80 C 108 68, 124 62, 132 64 Z" />
      <path d="M168 60 C 164 76, 148 82, 138 76 C 144 64, 160 58, 168 60 Z" />
      {/* tiny olive */}
      <ellipse cx="226" cy="48" rx="4" ry="6" transform="rotate(-20 226 48)" />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────
// Base button
// ──────────────────────────────────────────────────────────
function PrimaryButton({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 56, border: 'none', cursor: 'pointer',
      background: C.ink, color: C.cream,
      fontFamily: F.sans, fontSize: 14, fontWeight: 500,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      borderRadius: 0, transition: 'background 200ms',
      ...style,
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
      fontFamily: F.sans, fontSize: 14, fontWeight: 500,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      borderRadius: 0, transition: 'all 200ms',
      ...style,
    }}>
      {children}
    </button>
  );
}

// ──────────────────────────────────────────────────────────
// Screen wrapper with fade transition
// ──────────────────────────────────────────────────────────
function Screen({ children, k }) {
  return (
    <div key={k} style={{
      position: 'absolute', inset: 0,
      animation: 'screenIn 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
      background: C.cream,
      display: 'flex', flexDirection: 'column',
    }}>
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Top bar (back chevron)
// ──────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────
// 1. ENTRY
// ──────────────────────────────────────────────────────────
function EntryScreen({ go }) {
  return (
    <Screen k="entry">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '60px 32px 40px' }}>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div style={{
            fontFamily: F.sans, fontSize: 10, letterSpacing: '0.36em',
            textTransform: 'uppercase', color: C.inkMute, marginBottom: 16,
          }}>Est. Prague</div>
          <h1 style={{
            fontFamily: F.serif, fontSize: 56, fontWeight: 300,
            letterSpacing: '-0.02em', color: C.ink, margin: 0,
            lineHeight: 1,
          }}>Évora</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <OliveBranch size={140} color={C.accent} />
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontWeight: 300,
            fontSize: 22, lineHeight: 1.4, color: C.ink,
            textAlign: 'center', maxWidth: 280,
          }}>
            An evening,<br />composed.
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <PrimaryButton onClick={() => go('couple')}>Plan a date</PrimaryButton>
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontSize: 13,
            color: C.inkSoft, textAlign: 'center', lineHeight: 1.5,
          }}>
            For evenings worth remembering.
          </div>
        </div>
      </div>
    </Screen>
  );
}

// ──────────────────────────────────────────────────────────
// 2. COUPLE TYPE
// ──────────────────────────────────────────────────────────
function CoupleScreen({ go, back, setCouple }) {
  const choose = (c) => { setCouple(c); go('mode'); };
  return (
    <Screen k="couple">
      <TopBar onBack={back} label="Step 1 of 3" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 40px' }}>
        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontFamily: F.serif, fontSize: 36, fontWeight: 300,
            letterSpacing: '-0.01em', color: C.ink, margin: 0,
            lineHeight: 1.1,
          }}>
            Tell us about <em style={{ fontWeight: 300 }}>you two</em>.
          </h2>
          <p style={{
            fontFamily: F.sans, fontSize: 14, color: C.inkSoft,
            marginTop: 16, lineHeight: 1.6,
          }}>
            It shapes the tone of what we suggest.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: `1px solid ${C.hair}` }}>
          <ChoiceRow
            title="We're just getting started"
            sub="Curious, a little nervous, eager to impress."
            onClick={() => choose('new')}
          />
          <ChoiceRow
            title="We've been together a while"
            sub="Familiar, comfortable, looking for something fresh."
            onClick={() => choose('long')}
          />
        </div>
      </div>
    </Screen>
  );
}

function ChoiceRow({ title, sub, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        textAlign: 'left', padding: '28px 4px', cursor: 'pointer',
        background: 'transparent', border: 'none',
        borderBottom: `1px solid ${C.hair}`,
        width: '100%', transition: 'all 200ms',
      }}>
      <div style={{ paddingRight: 16 }}>
        <div style={{
          fontFamily: F.serif, fontSize: 22, fontWeight: 300,
          color: C.ink, marginBottom: 6, lineHeight: 1.2,
        }}>{title}</div>
        <div style={{
          fontFamily: F.sans, fontSize: 13, color: C.inkSoft,
          lineHeight: 1.5,
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

// ──────────────────────────────────────────────────────────
// 3. MODE
// ──────────────────────────────────────────────────────────
function ModeScreen({ go, back, couple }) {
  const heading = couple === 'new'
    ? <>How would you like to <em style={{ fontWeight: 300 }}>begin</em>?</>
    : <>How shall we <em style={{ fontWeight: 300 }}>compose it</em>?</>;
  return (
    <Screen k="mode">
      <TopBar onBack={back} label="Step 2 of 3" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px 40px' }}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{
            fontFamily: F.serif, fontSize: 36, fontWeight: 300,
            letterSpacing: '-0.01em', color: C.ink, margin: 0,
            lineHeight: 1.1,
          }}>{heading}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
          <ModeCard
            label="Build it myself"
            desc="Choose each element. Dinner, transport, the lot."
            num="i"
            onClick={() => go('config')}
          />
          <ModeCard
            label="Surprise me"
            desc="A whole evening, composed for you."
            num="ii"
            italic
            onClick={() => go('surprise')}
          />
        </div>
      </div>
    </Screen>
  );
}

function ModeCard({ label, desc, num, italic, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: 1, padding: '32px 28px', cursor: 'pointer',
        background: hover ? C.paper : 'transparent',
        border: `1px solid ${hover ? C.ink : C.hair}`,
        textAlign: 'left', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', alignItems: 'flex-start',
        transition: 'all 250ms', minHeight: 160,
      }}>
      <div style={{
        fontFamily: F.serif, fontStyle: 'italic', fontSize: 14,
        color: C.accent, fontWeight: 400,
      }}>{num}.</div>
      <div>
        <div style={{
          fontFamily: F.serif, fontSize: 28, fontWeight: 300,
          fontStyle: italic ? 'italic' : 'normal',
          color: C.ink, marginBottom: 8, lineHeight: 1.1,
        }}>{label}</div>
        <div style={{
          fontFamily: F.sans, fontSize: 13, color: C.inkSoft,
          lineHeight: 1.5,
        }}>{desc}</div>
      </div>
    </button>
  );
}

// ──────────────────────────────────────────────────────────
// 4. CONFIGURATOR
// ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'experience', label: 'Experience', required: true,
    fields: [
      { id: 'activity', label: 'Activity', options: ['Jazz at U Malého Glena', 'Pottery, Holešovice studio', 'Rooftop cinema', 'Wine tasting, Karlín cellars', 'Late gallery walk'] },
      { id: 'neighborhood', label: 'Neighborhood', options: ['Vinohrady', 'Karlín', 'Malá Strana', 'Holešovice', 'Žižkov'] },
      { id: 'time', label: 'Time', options: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'] },
    ],
    defaults: { activity: 'Jazz at U Malého Glena', neighborhood: 'Malá Strana', time: '19:30' },
    summary: (v) => `${v.activity} · ${v.neighborhood} · ${v.time}`,
    price: 980,
  },
  {
    id: 'dinner', label: 'Dinner', required: false,
    fields: [
      { id: 'cuisine', label: 'Cuisine', options: ['Italian bistro', 'Modern Czech', 'French', 'Levantine', 'Japanese'] },
      { id: 'atmosphere', label: 'Atmosphere', options: ['Quiet & candlelit', 'Lively & loud', 'Garden terrace', 'Counter seats'] },
    ],
    defaults: { cuisine: 'Italian bistro', atmosphere: 'Quiet & candlelit' },
    summary: (v) => `${v.cuisine} · ${v.atmosphere}`,
    price: 1850,
  },
  {
    id: 'gift', label: 'Gift', required: false,
    fields: [
      { id: 'category', label: 'Category', options: ['Single stem', 'Hand-bound book', 'Perfumery sample', 'Patisserie box', 'Vinyl, second-hand'] },
      { id: 'budget', label: 'Budget', options: ['Up to 500 CZK', '500–1 200 CZK', '1 200–2 500 CZK', 'Open'] },
    ],
    defaults: { category: 'Single stem', budget: '500–1 200 CZK' },
    summary: (v) => `${v.category} · ${v.budget}`,
    price: 720,
  },
  {
    id: 'transport', label: 'Transport', required: false,
    fields: [
      { id: 'mode', label: 'Mode', options: ['Taxi', 'Own car', 'Public transit', 'Walking'] },
    ],
    defaults: { mode: 'Taxi' },
    summary: (v) => v.mode,
    price: 320,
  },
  {
    id: 'accommodation', label: 'Accommodation', required: false,
    fields: [
      { id: 'type', label: 'Type', options: ['Boutique hotel', 'Design apartment', 'Townhouse suite', 'Riverside room'] },
      { id: 'stars', label: 'Standard', options: ['3 stars', '4 stars', '5 stars'] },
    ],
    defaults: { type: 'Boutique hotel', stars: '4 stars' },
    summary: (v) => `${v.type} · ${v.stars}`,
    price: 4200,
  },
];

function ConfigScreen({ go, back, state, setState }) {
  const [openSheet, setOpenSheet] = useState(null);

  const toggle = (id) => {
    setState((s) => ({ ...s, enabled: { ...s.enabled, [id]: !s.enabled[id] } }));
  };
  const updateValues = (id, values) => {
    setState((s) => ({ ...s, values: { ...s.values, [id]: values } }));
  };

  return (
    <Screen k="config">
      <TopBar onBack={back} label="Step 3 of 3" />
      <div style={{ padding: '12px 32px 16px' }}>
        <h2 style={{
          fontFamily: F.serif, fontSize: 32, fontWeight: 300,
          letterSpacing: '-0.01em', color: C.ink, margin: 0, lineHeight: 1.1,
        }}>
          Compose <em style={{ fontWeight: 300 }}>the evening</em>.
        </h2>
        <p style={{
          fontFamily: F.sans, fontSize: 13, color: C.inkSoft,
          marginTop: 12, lineHeight: 1.6,
        }}>
          Toggle what you'd like. Tap any line to refine.
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', borderTop: `1px solid ${C.hair}` }}>
        {SECTIONS.map((s) => (
          <ConfigRow
            key={s.id}
            section={s}
            enabled={state.enabled[s.id]}
            values={state.values[s.id]}
            onToggle={() => !s.required && toggle(s.id)}
            onOpen={() => setOpenSheet(s.id)}
          />
        ))}
      </div>

      <div style={{ padding: '16px 24px 24px', background: C.cream, borderTop: `1px solid ${C.hair}` }}>
        <PrimaryButton onClick={() => go('summary')}>Build the evening</PrimaryButton>
      </div>

      {openSheet && (
        <BottomSheet
          section={SECTIONS.find((x) => x.id === openSheet)}
          values={state.values[openSheet]}
          onClose={() => setOpenSheet(null)}
          onChange={(v) => updateValues(openSheet, v)}
        />
      )}
    </Screen>
  );
}

function ConfigRow({ section, enabled, values, onToggle, onOpen }) {
  const dimmed = !enabled;
  return (
    <div style={{
      borderBottom: `1px solid ${C.hair}`,
      padding: '20px 32px',
      transition: 'opacity 200ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <button onClick={onOpen} style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          textAlign: 'left', flex: 1, opacity: dimmed ? 0.4 : 1, transition: 'opacity 200ms',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{
              fontFamily: F.serif, fontSize: 20, fontWeight: 300,
              color: C.ink, lineHeight: 1.2,
            }}>{section.label}</div>
            {section.required && (
              <div style={{
                fontFamily: F.serif, fontStyle: 'italic', fontSize: 11,
                color: C.accent,
              }}>required</div>
            )}
          </div>
          {enabled && (
            <div style={{
              fontFamily: F.sans, fontSize: 12, color: C.inkSoft,
              marginTop: 6, lineHeight: 1.5,
            }}>{section.summary(values)}</div>
          )}
          {!enabled && (
            <div style={{
              fontFamily: F.serif, fontStyle: 'italic', fontSize: 13,
              color: C.inkMute, marginTop: 6,
            }}>not included</div>
          )}
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
      cursor: 'pointer', padding: 0, transition: 'all 250ms',
      flexShrink: 0,
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

// ──────────────────────────────────────────────────────────
// Bottom Sheet
// ──────────────────────────────────────────────────────────
function BottomSheet({ section, values, onClose, onChange }) {
  const [local, setLocal] = useState(values);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(onClose, 240);
  };
  const save = () => {
    onChange(local);
    close();
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div onClick={close} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(31, 27, 22, 0.35)',
        animation: closing ? 'fadeOut 220ms forwards' : 'fadeIn 220ms forwards',
      }} />
      <div style={{
        position: 'relative', background: C.cream,
        borderTopLeftRadius: 0, borderTopRightRadius: 0,
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
            }}>Refine</div>
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
          <PrimaryButton onClick={save}>Save</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 5. PLAN SUMMARY
// ──────────────────────────────────────────────────────────
function timeFor(idx, baseTime) {
  // Distribute around the experience time
  const [h, m] = baseTime.split(':').map(Number);
  const base = h * 60 + m;
  // experience anchor
  const offsets = [-90, -45, 0, 90, 180]; // gift, transport, experience(?), dinner, accomm
  // We'll compute per id when used.
  return base;
}

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

function SummaryScreen({ go, back, state, setOpenSheet }) {
  const items = useMemo(() => buildTimeline(state), [state]);
  const total = useMemo(() => {
    let t = SECTIONS.find((s) => s.id === 'experience').price;
    SECTIONS.filter((s) => !s.required).forEach((s) => {
      if (state.enabled[s.id]) t += s.price;
    });
    return t;
  }, [state]);

  return (
    <Screen k="summary">
      <TopBar onBack={back} label="Your evening" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h2 style={{
            fontFamily: F.serif, fontSize: 34, fontWeight: 300,
            letterSpacing: '-0.01em', color: C.ink, margin: 0, lineHeight: 1.1,
            maxWidth: 220,
          }}>
            <em style={{ fontWeight: 300 }}>Tuesday</em>, the 12th
          </h2>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: F.sans, fontSize: 9, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: C.inkMute, marginBottom: 4,
            }}>Total</div>
            <div style={{
              fontFamily: F.serif, fontSize: 18, color: C.ink, fontWeight: 300,
            }}>{total.toLocaleString('cs-CZ')} CZK</div>
          </div>
        </div>

        <div style={{
          fontFamily: F.serif, fontStyle: 'italic', fontSize: 16,
          color: C.accent, marginTop: 24, marginBottom: 32,
          paddingLeft: 16, borderLeft: `1px solid ${C.accent}`,
          lineHeight: 1.5, fontWeight: 300,
        }}>
          An evening unlike any other.
        </div>

        <div style={{ position: 'relative', paddingLeft: 28 }}>
          <div style={{
            position: 'absolute', left: 4, top: 8, bottom: 8,
            width: 1, background: C.hair,
          }} />
          {items.map((it, i) => {
            const sec = SECTIONS.find((s) => s.id === it.id);
            return (
              <TimelineNode
                key={it.id}
                time={it.time}
                title={sec.label}
                desc={sec.summary(state.values[it.id])}
                last={i === items.length - 1}
                onEdit={() => setOpenSheet(it.id)}
              />
            );
          })}
        </div>
      </div>

      <div style={{ padding: '16px 24px 24px', background: C.cream, borderTop: `1px solid ${C.hair}` }}>
        <PrimaryButton onClick={() => go('confirmed')}>That's the one</PrimaryButton>
      </div>
    </Screen>
  );
}

function TimelineNode({ time, title, desc, last, onEdit }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ position: 'relative', paddingBottom: last ? 8 : 28 }}>
      <div style={{
        position: 'absolute', left: -28, top: 6,
        width: 9, height: 9, borderRadius: '50%',
        background: C.cream, border: `1px solid ${C.accent}`,
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
            fontFamily: F.sans, fontSize: 11, letterSpacing: '0.18em',
            color: C.inkMute, marginBottom: 4,
          }}>{time}</div>
          <div style={{
            fontFamily: F.serif, fontSize: 20, fontWeight: 300,
            color: C.ink, lineHeight: 1.2, marginBottom: 4,
          }}>{title}</div>
          <div style={{
            fontFamily: F.sans, fontSize: 13, color: C.inkSoft,
            lineHeight: 1.5,
          }}>{desc}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={hover ? C.accent : C.inkMute} strokeWidth="1.2"
          style={{ marginTop: 22, transition: 'all 200ms', transform: hover ? 'translateX(2px)' : 'none' }}>
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 6. SURPRISE — letter style
// ──────────────────────────────────────────────────────────
const SURPRISE = [
  { id: 'experience', label: 'The experience', body: 'A late jazz set at U Malého Glena. Two seats reserved at the front. Doors at twenty-thirty.', time: '20:30' },
  { id: 'dinner', label: 'Dinner before', body: 'A small Italian counter in Vinohrady — six tables, candle-lit, a Barolo opened on arrival.', time: '18:30' },
  { id: 'gift', label: 'A small token', body: 'A single white peony, wrapped in brown paper, waiting at the door.', time: '18:15' },
  { id: 'transport', label: 'The way there', body: 'A car arrives at twenty past six. Quiet, unhurried, no questions.', time: '18:20' },
];

function SurpriseScreen({ go, back }) {
  const [opened, setOpened] = useState({});

  return (
    <Screen k="surprise">
      <TopBar onBack={back} label="Composed for you" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 32px 24px' }}>
        <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 28 }}>
          <div style={{
            fontFamily: F.sans, fontSize: 10, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: C.inkMute, marginBottom: 16,
          }}>For — you</div>
          <h2 style={{
            fontFamily: F.serif, fontSize: 40, fontWeight: 300,
            letterSpacing: '-0.01em', color: C.ink, margin: 0,
            lineHeight: 1.05,
          }}>
            Your <em style={{ fontWeight: 300 }}>evening</em><br />awaits.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <OliveBranch size={120} color={C.accent} />
          </div>
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontSize: 14,
            color: C.inkSoft, marginTop: 16, lineHeight: 1.6,
          }}>
            Four envelopes.<br />Open them in any order.
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
        <PrimaryButton onClick={() => go('confirmed')}>That's the one</PrimaryButton>
      </div>
    </Screen>
  );
}

function Letter({ item, opened, onOpen }) {
  return (
    <div style={{
      border: `1px solid ${C.hair}`,
      background: C.paper,
      padding: opened ? '24px 24px 24px' : '0',
      transition: 'padding 320ms',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* corner motif */}
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
          padding: '28px 24px 28px', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: F.sans, fontSize: 10, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: C.inkMute, marginBottom: 6,
            }}>Sealed</div>
            <div style={{
              fontFamily: F.serif, fontSize: 22, fontWeight: 300,
              color: C.ink, lineHeight: 1.2,
            }}>{item.label}</div>
          </div>
          <div style={{
            fontFamily: F.serif, fontStyle: 'italic', fontSize: 13,
            color: C.accent, whiteSpace: 'nowrap',
          }}>break the seal</div>
        </button>
      ) : (
        <div style={{ animation: 'letterOpen 480ms cubic-bezier(0.22, 1, 0.36, 1) both' }}>
          <div style={{
            fontFamily: F.sans, fontSize: 10, letterSpacing: '0.24em',
            textTransform: 'uppercase', color: C.accent, marginBottom: 8,
          }}>{item.time}</div>
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

// ──────────────────────────────────────────────────────────
// Confirmed — graceful end state
// ──────────────────────────────────────────────────────────
function ConfirmedScreen({ go }) {
  return (
    <Screen k="confirmed">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{
          fontFamily: F.sans, fontSize: 10, letterSpacing: '0.32em',
          textTransform: 'uppercase', color: C.inkMute, marginBottom: 20,
        }}>It's settled</div>
        <h2 style={{
          fontFamily: F.serif, fontSize: 38, fontWeight: 300,
          color: C.ink, margin: 0, lineHeight: 1.1,
        }}>
          Until <em style={{ fontWeight: 300 }}>Tuesday</em>.
        </h2>
        <div style={{
          fontFamily: F.serif, fontStyle: 'italic', fontSize: 14,
          color: C.inkSoft, marginTop: 20, lineHeight: 1.6, maxWidth: 240,
        }}>
          We'll send a quiet reminder<br />the morning of.
        </div>
      </div>
      <div style={{ padding: '16px 24px 24px' }}>
        <GhostButton onClick={() => go('entry')}>Plan another</GhostButton>
      </div>
    </Screen>
  );
}

// ──────────────────────────────────────────────────────────
// App
// ──────────────────────────────────────────────────────────
function App() {
  const [screen, setScreen] = useState('entry');
  const [history, setHistory] = useState([]);
  const [couple, setCouple] = useState('new');
  const [openSheetId, setOpenSheetId] = useState(null);

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
      {screen === 'mode' && <ModeScreen go={go} back={back} couple={couple} />}
      {screen === 'config' && <ConfigScreen go={go} back={back} state={state} setState={setState} />}
      {screen === 'summary' && <SummaryScreen go={go} back={back} state={state} setOpenSheet={setOpenSheetId} />}
      {screen === 'surprise' && <SurpriseScreen go={go} back={back} />}
      {screen === 'confirmed' && <ConfirmedScreen go={(s) => { setHistory([]); setScreen(s); setState(initialState); }} />}

      {openSheetId && screen === 'summary' && (
        <BottomSheet
          section={SECTIONS.find((x) => x.id === openSheetId)}
          values={state.values[openSheetId]}
          onClose={() => setOpenSheetId(null)}
          onChange={(v) => updateValues(openSheetId, v)}
        />
      )}
    </>
  );
}

window.App = App;
