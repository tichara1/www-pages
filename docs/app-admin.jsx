// app-admin.jsx — Admin overview, heatmap, users, locations

function AdminApp({ ctx }) {
  const [tab, setTab] = React.useState('overview');
  return (
    <Device>
      <div className="screen" style={{ height: '100%' }}>
        {tab === 'overview'  && <AOverview/>}
        {tab === 'heat'      && <AHeatmap/>}
        {tab === 'users'     && <AUsers/>}
        {tab === 'locations' && <ALocations/>}
      </div>
      <ATabBar tab={tab} setTab={setTab}/>
    </Device>
  );
}

function ATabBar({ tab, setTab }) {
  const items = [
    { k: 'overview',  l: 'KPI',    i: Icon.bolt },
    { k: 'heat',      l: 'HEAT',   i: Icon.flame },
    { k: 'users',     l: 'USERS',  i: Icon.users },
    { k: 'locations', l: 'LOKACE', i: Icon.pin },
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

function AOverview() {
  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1.2 }}>ADMIN · 3 POBOČKY · LIVE</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Dnes</div>
      </div>

      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          ['OBSAZENOST','87','%', T.accent, '+6% vs minulý týden'],
          ['AKTIVNÍ','142','LEKCÍ', T.fg, 'zbývá 38 dnes'],
          ['TRŽBY','184','K KČ', T.cyan, '+12% MTD'],
          ['NOVÍ','23','UŽIV.', T.orange, 'tento týden'],
        ].map((x,i)=>(
          <div key={i} style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 14 }}>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.fgDim, letterSpacing: 0.8 }}>{x[0]}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 3 }}>
              <div style={{ fontFamily: T.mono, fontSize: 26, fontWeight: 700, color: x[3] }}>{x[1]}</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.fgDim }}>{x[2]}</div>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 9.5, color: T.fgMuted, marginTop: 6 }}>{x[4]}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 14, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1 }}>24 HODIN</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent }}>PEAK 18:30</div>
          </div>
          <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', gap: 2 }}>
            {Array.from({length: 24}).map((_, i) => {
              const v = [0.1,0.1,0.05,0.05,0.1,0.2,0.5,0.85,0.95,0.6,0.4,0.5,0.55,0.5,0.45,0.55,0.7,0.9,1,0.85,0.65,0.4,0.2,0.1][i];
              return <div key={i} style={{ flex: 1, height: `${v*100}%`, background: v > 0.7 ? T.accent : v > 0.4 ? T.cyan : 'rgba(255,255,255,0.15)', borderRadius: 1 }}/>;
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: T.mono, fontSize: 8.5, color: T.fgDim }}>
            <span>00</span><span>06</span><span>12</span><span>18</span><span>24</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1, marginBottom: 8 }}>TOP POBOČKY</div>
        {[['Letná',92,'+8'],['Smíchov',85,'+3'],['Vinohrady',78,'-2']].map((l,i)=>(
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.line}` }}>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, width: 16 }}>{i+1}</div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{l[0]}</div>
            <div style={{ width: 80 }}><Meter value={l[1]/100} color={T.accent}/></div>
            <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, width: 30, textAlign: 'right' }}>{l[1]}%</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: l[2].startsWith('+') ? T.accent : T.rose, width: 28, textAlign: 'right' }}>{l[2]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AHeatmap() {
  const days = ['PO','ÚT','ST','ČT','PÁ','SO','NE'];
  const hours = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1.2 }}>HEATMAPA · 4 TÝDNY</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>Kdy je plno</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '30px repeat(7, 1fr)', gap: 3 }}>
          <div/>
          {days.map(d => <div key={d} style={{ fontFamily: T.mono, fontSize: 9, color: T.fgDim, textAlign: 'center' }}>{d}</div>)}
          {hours.map((h, hi) => (
            <React.Fragment key={h}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.fgDim, textAlign: 'right' }}>{h}</div>
              {days.map((_, di) => {
                const v = (((hi*7 + di*31 + (h===7||h===8||h===18||h===19?40:0) + (di>=5?20:0)) % 100) + (h>=7 && h<=9 || h>=18 && h<=20 ? 50 : 0)) / 150;
                return (
                  <div key={di} style={{
                    aspectRatio: '1', borderRadius: 2,
                    background: `oklch(${0.2 + v * 0.55} ${v * 0.18} ${140 - v * 80} / ${0.15 + v})`,
                  }}/>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 12, padding: 12 }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1 }}>ANOMÁLIE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            {Icon.bolt(T.orange)}
            <div style={{ flex: 1, fontSize: 12 }}>
              <span style={{ color: T.fg, fontWeight: 600 }}>PÁ 18:00 Vinohrady</span>
              <span style={{ color: T.fgMuted }}> · 3 týdny plný · zvaž 2. trenéra</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AUsers() {
  const cohorts = [
    { n: 'Power users', v: 340, c: T.accent, p: 'Lekce/týden ≥ 3' },
    { n: 'Pravidelní',  v: 1240, c: T.cyan, p: 'Lekce/týden 1–2' },
    { n: 'Usínající',   v: 420, c: T.orange, p: 'Poslední > 14 dní' },
    { n: 'Churned',     v: 180, c: T.rose,   p: 'Poslední > 30 dní' },
  ];
  const total = cohorts.reduce((a,b)=>a+b.v,0);

  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1.2 }}>UŽIVATELÉ · {total.toLocaleString('cs-CZ')} CELKEM</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>Kohorty</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', height: 12, borderRadius: 3, overflow: 'hidden', marginBottom: 14 }}>
          {cohorts.map((c, i) => (
            <div key={i} style={{ width: `${(c.v/total)*100}%`, background: c.c }}/>
          ))}
        </div>

        {cohorts.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${T.line}` }}>
            <div style={{ width: 6, height: 36, borderRadius: 2, background: c.c }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{c.n}</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, marginTop: 2 }}>{c.p}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: T.mono, fontSize: 16, fontWeight: 700, color: c.c }}>{c.v}</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim }}>{Math.round(c.v/total*100)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ALocations() {
  return (
    <div className="screen" style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ padding: '8px 20px 14px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim, letterSpacing: 1.2 }}>POBOČKY · PRAHA</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>6 lokací</div>
      </div>

      <div style={{ margin: '0 20px 12px', height: 200, borderRadius: 14, overflow: 'hidden', border: `1px solid ${T.line}` }}>
        <StyledMap mode="car" minutes={60} showIso={false}/>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {LESSON_PINS.map(p => (
          <div key={p.id} style={{
            background: T.surface, border: `1px solid ${T.line}`, borderRadius: 10,
            padding: 12, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 8, height: 36, borderRadius: 2, background:
              p.tone === 'accent' ? T.accent : p.tone === 'cyan' ? T.cyan : p.tone === 'orange' ? T.orange : T.rose }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{p.studio}</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.fgDim }}>{p.taken}/{p.cap} OBSAZENO</div>
            </div>
            <div style={{ width: 70 }}><Meter value={p.taken/p.cap} color={p.taken/p.cap > 0.9 ? T.orange : T.accent}/></div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { AdminApp });
