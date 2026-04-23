// app-trainer.jsx — Trainer dashboard, schedule, attendees, template

function TrainerApp({ ctx }) {
  const [tab, setTab] = React.useState('dash');
  const [attOf, setAttOf] = React.useState(null);

  return (
    <Device>
      {attOf
        ? <TAttendees id={attOf} onBack={() => setAttOf(null)} ctx={ctx}/>
        : (
          <div className="screen" style={{ height: '100%' }}>
            {tab === 'dash'     && <TDash ctx={ctx} openAtt={setAttOf} setTab={setTab}/>}
            {tab === 'schedule' && <TSchedule ctx={ctx} openAtt={setAttOf}/>}
            {tab === 'template' && <TTemplate ctx={ctx}/>}
            {tab === 'money'    && <TMoney ctx={ctx}/>}
          </div>
        )}
      {!attOf && <TTabBar tab={tab} setTab={setTab}/>}
    </Device>
  );
}

function TTabBar({ tab, setTab }) {
  const items = [
    { k: 'dash', l: 'DNES', i: Icon.bolt },
    { k: 'schedule', l: 'ROZVRH', i: Icon.clock },
    { k: 'template', l: 'ŠABLONA', i: Icon.plus },
    { k: 'money', l: 'KASA', i: Icon.spark },
  ];
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 10, zIndex: 40,
      background: 'rgba(20,20,23,0.82)', backdropFilter: 'blur(24px) saturate(160%)',
      border: `1px solid ${T.line}`, borderRadius: 20, padding: '10px 4px',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {items.map(it => {
        const act = tab === it.k;
        return (
          <button key={it.k} onClick={() => setTab(it.k)} style={{
            background: act ? T.accentSoft : 'transparent',
            border: 'none', borderRadius: 12, padding: '4px 14px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: act ? T.accent : T.fgMuted, cursor: 'pointer',
          }}>
            {it.i(act ? T.accent : T.fgMuted)}
            <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 600, letterSpacing: 0.5 }}>{it.l}</span>
          </button>
        );
      })}
    </div>
  );
}

function TDash({ ctx, openAtt, setTab }) {
  const today = LESSON_PINS.slice(0, 3);
  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1.2 }}>TRENÉR · MARTIN K.</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Dnes 3 lekce</div>
      </div>

      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
        {[['38','OBSAZENO', T.accent],['12 160','KČ DNES', T.fg],['94','% SHODA', T.cyan]].map((x,i)=>(
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: 11 }}>
            <div style={{ fontFamily: T.mono, fontSize: 9, color: T.fgDim, letterSpacing: 0.6 }}>{x[1]}</div>
            <div style={{ fontFamily: T.mono, fontSize: 19, fontWeight: 700, color: x[2], marginTop: 3 }}>{x[0]}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {today.map(p => (
          <div key={p.id} onClick={() => openAtt(p.id)} style={{
            background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 14,
            cursor: 'pointer', display: 'flex', gap: 12,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 10, background: T.accentSoft, border: `1px solid ${T.accentBorder}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 700, color: T.accent }}>{p.time}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.title}</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.fgDim, marginTop: 2 }}>{p.studio.toUpperCase()} · {p.taken}/{p.cap}</div>
              <div style={{ marginTop: 6 }}>
                <Meter value={p.taken/p.cap} color={p.taken/p.cap > 0.9 ? T.orange : T.accent}/>
              </div>
            </div>
            {Icon.chev(T.fgMuted)}
          </div>
        ))}
        <button onClick={() => setTab('template')} style={{
          padding: '12px', background: 'transparent', border: `1px dashed ${T.lineStrong}`, borderRadius: 12,
          color: T.fgMuted, fontFamily: T.sans, fontSize: 13, fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>{Icon.plus(T.fgMuted)} NOVÁ LEKCE ZE ŠABLONY</button>
      </div>
    </div>
  );
}

function TAttendees({ id, onBack, ctx }) {
  const p = LESSON_PINS.find(x => x.id === id);
  const names = ['Tereza N.', 'Petr S.', 'Anna K.', 'Jakub H.', 'Lenka M.', 'David V.', 'Marek P.', 'Klára B.', 'Tomáš R.', 'Eva L.', 'Michal D.'];
  const list = names.slice(0, Math.min(p.taken, names.length));

  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0 12px' }}>
          <button onClick={onBack} style={{
            width: 32, height: 32, borderRadius: 10, background: T.surface, border: `1px solid ${T.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke={T.fg} strokeWidth="1.8"><path d="M8 1L2 7l6 6"/></svg>
          </button>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim }}>#{p.id.toUpperCase()} · {p.time}</div>
        </div>

        <div style={{ fontSize: 22, fontWeight: 700 }}>{p.title}</div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.fgMuted, marginBottom: 14 }}>{p.studio.toUpperCase()} · {p.taken}/{p.cap} OBSAZENO</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map((n, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: 10,
              background: T.surface, border: `1px solid ${T.line}`, borderRadius: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: `linear-gradient(135deg, oklch(0.${4 + i}0 0.${i%2?1:2} ${60 + i*30}), oklch(0.30 0.06 220))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: T.mono, fontWeight: 700, fontSize: 12,
              }}>{n.split(' ').map(x => x[0]).join('')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{n}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.fgDim, letterSpacing: 0.4 }}>{i % 3 === 0 ? 'NOVÁČEK · 1. LEKCE' : `LEVEL ${(i%5)+1} · ${10+i*3} LEKCÍ`}</div>
              </div>
              {i < 3 ? <Tag tone="accent">✓ CHECKED</Tag> : <Tag>PENDING</Tag>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TSchedule({ ctx, openAtt }) {
  const days = ['PO','ÚT','ST','ČT','PÁ','SO','NE'];
  const hours = [7,8,9,18,19,20];
  // Generated slots
  const slots = [
    { d: 0, h: 7, id: 'l1', tone: T.accent },
    { d: 0, h: 18, id: 'l4', tone: T.rose },
    { d: 1, h: 8, id: 'l2', tone: T.cyan },
    { d: 2, h: 9, id: 'l3', tone: T.orange },
    { d: 3, h: 19, id: 'l6', tone: T.cyan },
    { d: 4, h: 18, id: 'l5', tone: T.accent },
    { d: 5, h: 8, id: 'l2', tone: T.cyan },
  ];

  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1.2 }}>TÝDEN 47 · 18.–24. 11.</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Rozvrh</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '30px repeat(7, 1fr)', gap: 4, alignItems: 'center' }}>
          <div/>
          {days.map(d => (
            <div key={d} style={{ textAlign: 'center', fontFamily: T.mono, fontSize: 10, color: T.fgDim, padding: '4px 0' }}>{d}</div>
          ))}
          {hours.map(h => (
            <React.Fragment key={h}>
              <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.fgDim, textAlign: 'right', paddingRight: 4 }}>{h}:00</div>
              {days.map((_, di) => {
                const slot = slots.find(s => s.d === di && s.h === h);
                const p = slot ? LESSON_PINS.find(x => x.id === slot.id) : null;
                return (
                  <div key={di} onClick={() => slot && openAtt(slot.id)} style={{
                    aspectRatio: '1', borderRadius: 6,
                    background: slot ? `${slot.tone}` : 'rgba(255,255,255,0.04)',
                    border: slot ? 'none' : `1px solid ${T.line}`,
                    color: slot ? T.bg : 'transparent',
                    fontFamily: T.mono, fontSize: 9, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: slot ? 'pointer' : 'default',
                    opacity: slot ? 0.92 : 1,
                  }}>{p ? p.taken : ''}</div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag tone="accent">■ HIIT</Tag>
          <Tag tone="cyan">■ JÓGA / MOBILITY</Tag>
          <Tag tone="orange">■ 1:1</Tag>
          <Tag tone="rose">■ SPINNING</Tag>
        </div>
      </div>
    </div>
  );
}

function TTemplate({ ctx }) {
  const [blocks, setBlocks] = React.useState([
    { n: 'Warm-up', m: 8, i: 2 },
    { n: 'HIIT · 4×4', m: 20, i: 4 },
    { n: 'Strength · push', m: 12, i: 3 },
    { n: 'Cool-down', m: 5, i: 1 },
  ]);
  const total = blocks.reduce((a, b) => a + b.m, 0);

  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1.2 }}>ŠABLONA · HIIT 45</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Blok editor</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim }}>TOTAL</div>
            <div style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 700, color: T.accent }}>{total} MIN</div>
          </div>
          <div style={{ display: 'flex', height: 10, borderRadius: 3, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
            {blocks.map((b, i) => (
              <div key={i} style={{
                width: `${(b.m / total) * 100}%`,
                background: `oklch(${0.55 + b.i * 0.08} 0.15 ${130 - b.i * 25})`,
              }}/>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {blocks.map((b, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: T.surface, border: `1px solid ${T.line}`, borderRadius: 10, padding: 12,
            }}>
              <div style={{ cursor: 'grab', color: T.fgDim, fontFamily: T.mono, fontSize: 14 }}>⋮⋮</div>
              <div style={{
                width: 8, height: 32, borderRadius: 2,
                background: `oklch(${0.55 + b.i * 0.08} 0.15 ${130 - b.i * 25})`,
              }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{b.n}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim }}>{b.m} MIN · INTENZITA {b.i}/5</div>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({length: 5}).map((_, k) => (
                  <div key={k} style={{ width: 4, height: 12, borderRadius: 1, background: k < b.i ? T.accent : 'rgba(255,255,255,0.1)' }}/>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => ctx.toast('Šablona uložena')} style={{
          width: '100%', marginTop: 12, padding: '12px 0', borderRadius: 12,
          background: T.accent, color: T.accentInk, border: 'none',
          fontFamily: T.sans, fontSize: 14, fontWeight: 700, cursor: 'pointer',
        }}>ULOŽIT ŠABLONU</button>
      </div>
    </div>
  );
}

function TMoney({ ctx }) {
  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1.2 }}>KASA · LISTOPAD</div>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.6, color: T.accent, fontFamily: T.mono }}>142 880 <span style={{ fontSize: 14, color: T.fgDim }}>KČ</span></div>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.fgMuted, marginTop: 2 }}>+18% OPROTI ŘÍJNU</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: 14, height: 140, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
          {Array.from({length: 22}).map((_, i) => {
            const v = [0.3,0.5,0.8,0.6,0.4,0.9,1,0.7,0.5,0.8,0.9,1,0.8,0.6,0.4,0.7,0.85,0.95,0.6,0.4,0.2,0.1][i];
            return <div key={i} style={{ flex: 1, height: `${v*100}%`, background: v > 0.7 ? T.accent : 'rgba(255,255,255,0.2)', borderRadius: 2 }}/>;
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TrainerApp });
