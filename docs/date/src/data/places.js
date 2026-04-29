(function () {
  window.Evora = window.Evora || {};
  const P = (id, nameCs, nameEn, category, descCs, descEn, price, tags, durationMin, timeOfDay) => ({
    id, name: { cs: nameCs, en: nameEn }, category,
    desc: { cs: descCs, en: descEn },
    price, tags, durationMin, timeOfDay,
  });

  window.Evora.PLACES = [
    // Restaurants (12)
    P('p_01','U Tří Oliv','Three Olives','restaurant','Středomořská kuchyně, tlumené světlo, krátký lístek.','Mediterranean kitchen, low light, short list.','$$',['romantic','indoor','wine'],90,['evening']),
    P('p_02','Folio','Folio','restaurant','Moderní česká, sezónní degustační menu.','Modern Czech, seasonal tasting menu.','$$$',['romantic','quiet','wine'],120,['evening']),
    P('p_03','Pasta Bar','Pasta Bar','restaurant','Hand-rolled pasta, bar seating.','Hand-rolled pasta, bar seating.','$$',['lively','indoor','wine'],60,['evening','late']),
    P('p_04','Maison','Maison','restaurant','Francouzské bistro v Karlíně.','French bistro in Karlín.','$$',['romantic','indoor','wine'],90,['evening']),
    P('p_05','Levant','Levant','restaurant','Levantské mezze, otevřená kuchyně.','Levantine mezze, open kitchen.','$$',['lively','indoor'],90,['evening']),
    P('p_06','Sakana','Sakana','restaurant','Omakase pult, 8 míst.','Omakase counter, 8 seats.','$$$',['quiet','indoor'],120,['evening']),
    P('p_07','Tržnice 22','Market 22','restaurant','Tržnice s pulty malých kuchyní.','Market hall with stalls.','$',['lively','indoor'],60,['afternoon','evening']),
    P('p_08','Zahrada','The Garden','restaurant','Letní terasa, sdílená jídla.','Summer terrace, shared plates.','$$',['outdoor','lively'],90,['evening']),
    P('p_09','Sůl & Pepř','Salt & Pepper','restaurant','Steakhouse, dřevěné uhlí.','Charcoal steakhouse.','$$$',['indoor','lively'],120,['evening']),
    P('p_10','Kavárna Slávie','Café Slavia','restaurant','Klasická kavárna-restaurace u řeky.','Classic riverside café-restaurant.','$$',['indoor','view'],90,['afternoon','evening']),
    P('p_11','Pivnice U Dubu','The Oak','restaurant','Hospůdka, tankovka, čtyři jídla na lístku.','Pub, fresh-tank beer, four-item menu.','$',['lively','indoor'],60,['evening']),
    P('p_12','Ostrov','Island','restaurant','Plovoucí restaurace u nábřeží.','Floating restaurant on the embankment.','$$$',['romantic','view','outdoor'],120,['evening']),

    // Bars (8)
    P('p_13','Hemingway','Hemingway','bar','Klasické koktejly, knihovna rumů.','Classic cocktails, rum library.','$$',['quiet','cocktails','indoor'],90,['evening','late']),
    P('p_14','Anonymous','Anonymous','bar','Speakeasy bez vývěsního štítu.','Hidden speakeasy, no signage.','$$',['quiet','cocktails','indoor'],90,['evening','late']),
    P('p_15','Vinograf','Vinograf','bar','Přírodní vína po skleničce.','Natural wines by the glass.','$$',['quiet','wine','indoor'],60,['evening']),
    P('p_16','Roof.','Roof.','bar','Střešní bar s panoramatem.','Rooftop bar, city panorama.','$$$',['view','cocktails','outdoor'],90,['evening','late']),
    P('p_17','BarBar','BarBar','bar','Plný, hlučný, dobré vibe.','Loud, full, good vibe.','$',['lively','cocktails','indoor'],60,['late']),
    P('p_18','Folio Wine Bar','Folio Wine Bar','bar','Sesterský vinný bar k Folio.','Wine-bar sister to Folio.','$$$',['quiet','wine','indoor'],60,['evening']),
    P('p_19','Beerstro','Beerstro','bar','Řemeslné pivo, deska sýrů.','Craft beer, cheese board.','$',['lively','indoor'],60,['evening']),
    P('p_20','Garden Cocktails','Garden Cocktails','bar','Zahradní bar, herbální drinky.','Garden bar, herbal drinks.','$$',['outdoor','cocktails'],90,['evening']),

    // Cafes (5)
    P('p_21','Můj Šálek','My Cup','cafe','Specialty kavárna, malé jídlo.','Specialty coffee, small plates.','$',['quiet','indoor'],60,['morning','afternoon']),
    P('p_22','Kafárna','Kafárna','cafe','Kavárna s knihovnou.','Café with reading library.','$',['quiet','indoor'],90,['morning','afternoon']),
    P('p_23','Roastery','Roastery','cafe','Vlastní pražírna, malý prostor.','In-house roastery, small space.','$',['quiet','indoor'],45,['morning','afternoon']),
    P('p_24','Letná Coffee','Letná Coffee','cafe','Park-side café, terasa.','Park-side café with terrace.','$',['outdoor','walk-friendly'],60,['morning','afternoon']),
    P('p_25','Riverside Brew','Riverside Brew','cafe','Káva u řeky, výhled na most.','Coffee by the river, bridge view.','$',['outdoor','view','walk-friendly'],60,['morning','afternoon']),

    // Activities (5)
    P('p_26','Jazz at U Malého Glena','Jazz at Glen\'s','activity','Sklepní jazz klub, dva sety za večer.','Cellar jazz, two sets a night.','$$',['live-music','indoor'],120,['evening','late']),
    P('p_27','Pottery Karlín','Karlín Pottery','activity','Hodinová lekce, dva kusy si odnesete.','One-hour class, take two pieces home.','$$',['indoor','quiet'],90,['afternoon','evening']),
    P('p_28','Rooftop Cinema','Rooftop Cinema','activity','Letní střešní kino.','Summer rooftop cinema.','$$',['outdoor','view'],120,['evening']),
    P('p_29','Wine Tasting Karlín','Karlín Wine Tasting','activity','Šest vín, sklepy v Karlíně.','Six wines, Karlín cellars.','$$',['indoor','wine','quiet'],90,['evening']),
    P('p_30','Late Gallery Walk','Late Gallery Walk','activity','Dlouhý čtvrteční noktur galerií.','Thursday late-night gallery walk.','$',['walk-friendly','indoor','quiet'],90,['evening']),
  ];

  const byId = Object.create(null);
  for (const p of window.Evora.PLACES) byId[p.id] = p;
  window.Evora.PLACE_BY_ID = byId;
  window.Evora.getPlace = (id) => (id && byId[id]) || null;
})();
