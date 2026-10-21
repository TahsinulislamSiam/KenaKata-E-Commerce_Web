// ---------------------------------------------------------------------------
// KenaKata product illustrations
// ---------------------------------------------------------------------------
// Hand-drawn-style flat SVG art for every product type, rendered in the
// Emerald & Ivory palette. Each illustration is defined once as an SVG
// fragment (viewBox 0 0 100 100) using {line}/{fill}/{soft}/{bg} tokens,
// then baked into data-URI images so the rest of the app (cards, gallery,
// suggestions, zoom) works unchanged. Swap for real product photos later by
// pointing `images` back at CDN URLs in src/data.
// ---------------------------------------------------------------------------

const svgToDataUri = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const PALETTES = {
  ivory: { bg: '#fbf9f4', line: '#0e674e', fill: '#d4a51d', soft: '#b9e6d1' },
  emerald: { bg: '#0a4235', line: '#e7cb6a', fill: '#d4a51d', soft: '#0e674e' },
  sand: { bg: '#f5f1e7', line: '#45330b', fill: '#a37c11', soft: '#efdf9d' },
};

/** Every illustration as an SVG fragment with palette tokens. */
const ART = {
  phone: `<rect x="35" y="16" width="30" height="68" rx="7" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="39" y="25" width="22" height="45" rx="2" fill="{bg}"/><rect x="45" y="19.5" width="10" height="2.5" rx="1.25" fill="{line}"/><circle cx="50" cy="77" r="2.8" fill="{line}"/><circle cx="44" cy="55" r="3" fill="{fill}"/><path d="M48 50l-4 7h3l-1 6 5-8h-3z" fill="{fill}"/>`,
  laptop: `<rect x="23" y="24" width="54" height="36" rx="4" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="28" y="29" width="44" height="26" rx="2" fill="{bg}"/><path d="M34 47l7-8 5 5 6-8 8 11z" fill="{fill}" opacity="0.9"/><path d="M14 66h72l-6 9H20z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M42 70h16" stroke="{line}" stroke-width="2" stroke-linecap="round"/>`,
  headphones: `<path d="M26 64V50a24 24 0 0 1 48 0v14" fill="none" stroke="{line}" stroke-width="3.5" stroke-linecap="round"/><rect x="19" y="57" width="14" height="22" rx="6" fill="{fill}" stroke="{line}" stroke-width="2.5"/><rect x="67" y="57" width="14" height="22" rx="6" fill="{fill}" stroke="{line}" stroke-width="2.5"/><path d="M24 34a26 26 0 0 1 52 0" fill="none" stroke="{line}" stroke-width="1.5" opacity="0.4"/>`,
  camera: `<rect x="17" y="33" width="66" height="40" rx="7" fill="{soft}" stroke="{line}" stroke-width="2.5"/><circle cx="50" cy="53" r="14" fill="{bg}" stroke="{line}" stroke-width="2.5"/><circle cx="50" cy="53" r="6.5" fill="{fill}"/><rect x="35" y="26" width="15" height="8" rx="2.5" fill="{fill}" stroke="{line}" stroke-width="2"/><circle cx="72" cy="41" r="2.5" fill="{line}"/>`,
  powerbank: `<rect x="33" y="20" width="34" height="60" rx="6" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="39" y="27" width="22" height="9" rx="2.5" fill="{bg}" stroke="{line}" stroke-width="1.5"/><path d="M53 43l-9 14h6l-2 11 10-15h-6z" fill="{fill}"/><path d="M40 74h20" stroke="{line}" stroke-width="2" stroke-linecap="round"/>`,
  mouse: `<path d="M50 20c12 0 21 9 21 22v13c0 13-9 22-21 22s-21-9-21-22V42c0-13 9-22 21-22z" fill="{soft}" stroke="{line}" stroke-width="2.5"/><path d="M50 22v17" stroke="{line}" stroke-width="2.5"/><rect x="47" y="27" width="6" height="9" rx="3" fill="{fill}"/><path d="M36 55c8 4 20 4 28 0" fill="none" stroke="{line}" stroke-width="1.5" opacity="0.5"/>`,
  monitor: `<rect x="15" y="22" width="70" height="45" rx="5" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="20" y="27" width="60" height="35" rx="2.5" fill="{bg}"/><circle cx="30" cy="36" r="3" fill="{fill}"/><path d="M26 56l8-10 6 6 8-12 12 16z" fill="{fill}" opacity="0.85"/><path d="M43 67h14v8h-14z" fill="{soft}" stroke="{line}" stroke-width="2"/><path d="M33 78h34" stroke="{line}" stroke-width="3.5" stroke-linecap="round"/>`,
  shirt: `<path d="M37 22L20 31l5 13 7-3v36h36V41l7 3 5-13-17-9-6 5H43z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M43 27l7 9 7-9" fill="none" stroke="{line}" stroke-width="2"/><path d="M50 41v26" stroke="{line}" stroke-width="1.5" opacity="0.4"/><circle cx="56" cy="50" r="1.8" fill="{fill}"/><circle cx="56" cy="60" r="1.8" fill="{fill}"/>`,
  kurti: `<path d="M40 20l-9 6 4 9-7 45h44l-7-45 4-9-9-6z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M40 20c3 4 17 4 20 0" fill="none" stroke="{line}" stroke-width="2"/><path d="M50 34v38" stroke="{line}" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/><circle cx="42" cy="48" r="2.2" fill="{fill}"/><circle cx="58" cy="58" r="2.2" fill="{fill}"/><circle cx="50" cy="68" r="2.2" fill="{fill}"/>`,
  jacket: `<path d="M38 20L20 30l5 14 6-3v36h38V41l6 3 5-14-18-10z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M42 20l8 15 8-15" fill="{bg}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M50 35v37" stroke="{line}" stroke-width="2"/><circle cx="58" cy="47" r="2" fill="{fill}"/><circle cx="58" cy="57" r="2" fill="{fill}"/><path d="M30 50h8M62 50h8" stroke="{line}" stroke-width="1.5" opacity="0.5"/>`,
  saree: `<path d="M28 22h44l-7 56H35z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M28 22c9 7 35 7 44 0" fill="none" stroke="{line}" stroke-width="2"/><path d="M35 40h30M36 50h28M37 60h26" stroke="{fill}" stroke-width="2.5" stroke-linecap="round"/><circle cx="50" cy="31" r="2.5" fill="{fill}"/>`,
  sneaker: `<path d="M16 60c9-2 15-9 21-20l9 4c4 9 15 13 32 13 6 0 8 4 8 8v7H16z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M16 72h70" stroke="{line}" stroke-width="3" stroke-linecap="round"/><path d="M40 44l8 6M47 39l8 6" stroke="{line}" stroke-width="2" stroke-linecap="round"/><path d="M22 60l6 8M32 56l6 8" stroke="{line}" stroke-width="1.5" opacity="0.5"/>`,
  watch: `<rect x="43" y="14" width="14" height="12" rx="3" fill="{fill}" stroke="{line}" stroke-width="2"/><rect x="43" y="74" width="14" height="12" rx="3" fill="{fill}" stroke="{line}" stroke-width="2"/><circle cx="50" cy="50" r="24" fill="{soft}" stroke="{line}" stroke-width="3"/><circle cx="50" cy="50" r="17" fill="{bg}"/><path d="M50 39v11l8 6" stroke="{line}" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="50" r="2" fill="{fill}"/><path d="M50 35v3M50 62v3M35 50h3M62 50h3" stroke="{line}" stroke-width="2" stroke-linecap="round"/>`,
  cargo: `<path d="M35 20h30l4 60H54l-4-32-4 32H31z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M35 28h30" stroke="{line}" stroke-width="2"/><rect x="38" y="38" width="9" height="12" rx="2" fill="{bg}" stroke="{line}" stroke-width="1.5"/><rect x="53" y="38" width="9" height="12" rx="2" fill="{bg}" stroke="{line}" stroke-width="1.5"/><path d="M50 20v8" stroke="{line}" stroke-width="1.5"/>`,
  bag: `<path d="M26 36h48l5 42H21z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M37 36v-7a13 13 0 0 1 26 0v7" fill="none" stroke="{line}" stroke-width="2.5"/><path d="M32 50h36" stroke="{fill}" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="64" r="4" fill="{bg}" stroke="{line}" stroke-width="2"/>`,
  sofa: `<rect x="17" y="45" width="66" height="23" rx="7" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="23" y="28" width="25" height="21" rx="6" fill="{bg}" stroke="{line}" stroke-width="2.5"/><rect x="52" y="28" width="25" height="21" rx="6" fill="{bg}" stroke="{line}" stroke-width="2.5"/><rect x="10" y="40" width="11" height="28" rx="5.5" fill="{fill}" stroke="{line}" stroke-width="2.5"/><rect x="79" y="40" width="11" height="28" rx="5.5" fill="{fill}" stroke="{line}" stroke-width="2.5"/><path d="M22 68v6M78 68v6" stroke="{line}" stroke-width="3" stroke-linecap="round"/>`,
  cookware: `<path d="M26 40h48v24a11 11 0 0 1-11 11H37a11 11 0 0 1-11-11z" fill="{soft}" stroke="{line}" stroke-width="2.5"/><path d="M18 42h64" stroke="{line}" stroke-width="3.5" stroke-linecap="round"/><path d="M74 48h9a5 5 0 0 1 0 10h-9M26 48h-9a5 5 0 0 0 0 10h9" fill="none" stroke="{line}" stroke-width="2.5"/><path d="M41 30c0 4-4 4-4 8M59 28c0 4-4 4-4 8" stroke="{fill}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  mattress: `<rect x="14" y="42" width="72" height="26" rx="7" fill="{soft}" stroke="{line}" stroke-width="2.5"/><path d="M14 54h72" stroke="{line}" stroke-width="2"/><path d="M22 42v-7h56v7" fill="none" stroke="{line}" stroke-width="2.5"/><circle cx="32" cy="48" r="2.2" fill="{fill}"/><circle cx="50" cy="48" r="2.2" fill="{fill}"/><circle cx="68" cy="48" r="2.2" fill="{fill}"/><path d="M20 68v5M80 68v5" stroke="{line}" stroke-width="3" stroke-linecap="round"/>`,
  kettle: `<path d="M34 34h30l5 36a9 9 0 0 1-9 10H38a9 9 0 0 1-9-10z" fill="{soft}" stroke="{line}" stroke-width="2.5"/><path d="M64 42c11 3 13 12 8 20l-6 3" fill="none" stroke="{line}" stroke-width="2.5"/><path d="M34 34c0-9 5-13 16-13s16 4 16 13" fill="none" stroke="{line}" stroke-width="2.5"/><rect x="44" y="24" width="13" height="7" rx="3.5" fill="{fill}" stroke="{line}" stroke-width="1.5"/><path d="M39 52h20" stroke="{line}" stroke-width="2" opacity="0.4"/>`,
  lamp: `<path d="M50 18l16 24H34z" fill="{fill}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M50 42v30" stroke="{line}" stroke-width="2.5"/><path d="M34 78h32" stroke="{line}" stroke-width="4" stroke-linecap="round"/><path d="M28 30l-8-6M72 30l8-6M50 12V6" stroke="{fill}" stroke-width="2.5" stroke-linecap="round"/><circle cx="50" cy="34" r="3" fill="{bg}"/>`,
  bedsheet: `<rect x="20" y="30" width="60" height="15" rx="5" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="25" y="47" width="50" height="15" rx="5" fill="{bg}" stroke="{line}" stroke-width="2.5"/><rect x="20" y="64" width="60" height="15" rx="5" fill="{fill}" stroke="{line}" stroke-width="2.5"/><path d="M30 37h8M45 54h8M35 71h8" stroke="{line}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>`,
  airfryer: `<rect x="29" y="22" width="42" height="54" rx="9" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="36" y="29" width="28" height="15" rx="3.5" fill="{bg}" stroke="{line}" stroke-width="2"/><circle cx="44" cy="36.5" r="2.5" fill="{fill}"/><circle cx="52" cy="36.5" r="2.5" fill="{fill}"/><path d="M35 52h30l-3 17H38z" fill="{fill}" stroke="{line}" stroke-width="2" stroke-linejoin="round"/><path d="M50 52v17" stroke="{line}" stroke-width="1.5" opacity="0.5"/>`,
  book: `<path d="M22 22h44a8 8 0 0 1 8 8v48H30a8 8 0 0 1-8-8z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M30 22v56" stroke="{line}" stroke-width="2.5"/><path d="M40 36h24M40 45h24M40 54h15" stroke="{line}" stroke-width="2" stroke-linecap="round"/><path d="M58 22v26l5-4 5 4V22" fill="{fill}" stroke="{line}" stroke-width="2" stroke-linejoin="round"/>`,
  bookstack: `<rect x="22" y="62" width="56" height="13" rx="4" fill="{fill}" stroke="{line}" stroke-width="2"/><rect x="27" y="49" width="48" height="13" rx="4" fill="{soft}" stroke="{line}" stroke-width="2"/><rect x="23" y="36" width="52" height="13" rx="4" fill="{bg}" stroke="{line}" stroke-width="2"/><path d="M32 68.5h6M36 55.5h6M31 42.5h6" stroke="{line}" stroke-width="2" stroke-linecap="round"/><path d="M36 30h30" stroke="{line}" stroke-width="3" stroke-linecap="round"/>`,
  serum: `<rect x="39" y="40" width="22" height="36" rx="6" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="43" y="23" width="14" height="17" rx="3.5" fill="{fill}" stroke="{line}" stroke-width="2"/><path d="M50 23v-7" stroke="{line}" stroke-width="2.5" stroke-linecap="round"/><path d="M43 56h14" stroke="{line}" stroke-width="2"/><path d="M50 60c-3 4-3 8 0 8s3-4 0-8z" fill="{fill}"/><circle cx="50" cy="31" r="3" fill="{bg}"/>`,
  lipstick: `<rect x="39" y="48" width="22" height="30" rx="4.5" fill="{soft}" stroke="{line}" stroke-width="2.5"/><path d="M44 48V32l13-9v25z" fill="{fill}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M39 58h22" stroke="{line}" stroke-width="2.5"/><path d="M44 70h12" stroke="{line}" stroke-width="1.5" opacity="0.5"/><path d="M57 23l4-3 2 4" stroke="{line}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  oil: `<path d="M41 30h18v9l6 11v27a5 5 0 0 1-5 5H40a5 5 0 0 1-5-5V50l6-11z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><rect x="44" y="20" width="12" height="10" rx="2.5" fill="{fill}" stroke="{line}" stroke-width="2"/><path d="M50 56c-5 6-5 12 0 12s5-6 0-12z" fill="{bg}" stroke="{line}" stroke-width="2"/>`,
  sunscreen: `<rect x="37" y="33" width="26" height="44" rx="9" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="43" y="22" width="14" height="11" rx="3" fill="{fill}" stroke="{line}" stroke-width="2"/><circle cx="50" cy="55" r="7.5" fill="{bg}" stroke="{line}" stroke-width="2"/><path d="M50 40v-4M67 55h4M29 55h4M63 42l3-3M34 42l-3-3" stroke="{fill}" stroke-width="2.5" stroke-linecap="round"/>`,
  perfume: `<path d="M35 42h30v29a9 9 0 0 1-9 9H44a9 9 0 0 1-9-9z" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="43" y="28" width="14" height="14" rx="2.5" fill="{fill}" stroke="{line}" stroke-width="2"/><rect x="45" y="20" width="10" height="8" rx="2" fill="{line}"/><circle cx="50" cy="57" r="7" fill="{bg}" stroke="{line}" stroke-width="2"/><path d="M72 36h8M74 44h8" stroke="{fill}" stroke-width="2.5" stroke-linecap="round"/>`,
  toothbrush: `<rect x="45" y="36" width="10" height="44" rx="5" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="41" y="18" width="18" height="19" rx="6" fill="{fill}" stroke="{line}" stroke-width="2.5"/><path d="M45 23v9M50 21v11M55 23v9" stroke="{bg}" stroke-width="2" stroke-linecap="round"/><path d="M48 62h4" stroke="{line}" stroke-width="2" stroke-linecap="round"/>`,
  hairdryer: `<path d="M26 32h27a15 15 0 0 1 0 30H26z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="40" cy="47" r="8.5" fill="{bg}" stroke="{line}" stroke-width="2"/><path d="M33 62l-5 17h13l-3-17" fill="{fill}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M62 38h12M62 47h15M62 56h12" stroke="{fill}" stroke-width="3" stroke-linecap="round"/>`,
  cricketbat: `<path d="M57 16l15 11-27 36-15-11z" fill="{soft}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M30 52l15 11" stroke="{line}" stroke-width="2"/><path d="M24 62l8 6-7 9-8-6z" fill="{fill}" stroke="{line}" stroke-width="2.5" stroke-linejoin="round"/><path d="M21 68l8 6" stroke="{line}" stroke-width="1.5"/><circle cx="72" cy="74" r="9" fill="{fill}" stroke="{line}" stroke-width="2.5"/><path d="M65 70c4 3 10 3 14 0" fill="none" stroke="{line}" stroke-width="1.5"/>`,
  dumbbell: `<path d="M30 43h40v14H30z" fill="{soft}" stroke="{line}" stroke-width="2.5"/><rect x="19" y="34" width="11" height="32" rx="4.5" fill="{fill}" stroke="{line}" stroke-width="2.5"/><rect x="70" y="34" width="11" height="32" rx="4.5" fill="{fill}" stroke="{line}" stroke-width="2.5"/><rect x="11" y="41" width="6" height="18" rx="3" fill="{bg}" stroke="{line}" stroke-width="2"/><rect x="83" y="41" width="6" height="18" rx="3" fill="{bg}" stroke="{line}" stroke-width="2"/>`,
  football: `<circle cx="50" cy="50" r="27" fill="{soft}" stroke="{line}" stroke-width="2.5"/><path d="M50 31l11 8-4 13H43l-4-13z" fill="{line}"/><path d="M50 23v8M28 41l9 4M72 41l-9 4M39 74l4-10M61 74l-4-10" stroke="{line}" stroke-width="2.5" stroke-linecap="round"/>`,
  yogamat: `<rect x="16" y="40" width="48" height="22" rx="11" fill="{soft}" stroke="{line}" stroke-width="2.5"/><circle cx="64" cy="51" r="11" fill="{bg}" stroke="{line}" stroke-width="2.5"/><circle cx="64" cy="51" r="4" fill="{fill}"/><path d="M40 40v22" stroke="{fill}" stroke-width="3.5"/><path d="M22 70h44" stroke="{line}" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>`,
  bicycle: `<circle cx="27" cy="60" r="15" fill="none" stroke="{line}" stroke-width="3"/><circle cx="73" cy="60" r="15" fill="none" stroke="{line}" stroke-width="3"/><path d="M27 60l15-21h14l17 21" fill="none" stroke="{line}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 39l-5-9h9" fill="none" stroke="{line}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M56 33h11" stroke="{line}" stroke-width="2.5" stroke-linecap="round"/><path d="M56 33l-3 7" stroke="{line}" stroke-width="2.5" stroke-linecap="round"/><path d="M38 60h18" stroke="{fill}" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="60" r="3.5" fill="{fill}" stroke="{line}" stroke-width="1.5"/>`,
  badminton: `<g transform="rotate(-22 36 34)"><ellipse cx="36" cy="34" rx="11" ry="15" fill="{soft}" stroke="{line}" stroke-width="2.5"/><path d="M28 28h16M28 34h16M28 40h16M36 22v24" stroke="{line}" stroke-width="0.9" opacity="0.6"/></g><path d="M30 47L21 70" stroke="{line}" stroke-width="3.5" stroke-linecap="round"/><g transform="rotate(22 64 34)"><ellipse cx="64" cy="34" rx="11" ry="15" fill="{soft}" stroke="{line}" stroke-width="2.5"/><path d="M56 28h16M56 34h16M56 40h16M64 22v24" stroke="{line}" stroke-width="0.9" opacity="0.6"/></g><path d="M70 47L79 70" stroke="{line}" stroke-width="3.5" stroke-linecap="round"/><path d="M46 78l4-9 4 9-4 5z" fill="{fill}" stroke="{line}" stroke-width="1.5" stroke-linejoin="round"/>`,
};

const VARIANTS = {
  ivory: 'ivory',
  emerald: 'emerald',
  sand: 'sand',
  zoom: 'ivory',
};

/** Bake an illustration into a data-URI image. */
export function buildArtImage(key, variant = 'ivory') {
  const art = ART[key] ?? ART.phone;
  const palette = PALETTES[VARIANTS[variant] ?? 'ivory'];
  const body = art.replace(/\{(line|fill|soft|bg)\}/g, (_, name) => palette[name]);
  const scaled =
    variant === 'zoom'
      ? `<g transform="translate(50 50) scale(1.55) translate(-50 -50)">${body}</g>`
      : body;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
    `<rect width="100" height="100" rx="8" fill="${palette.bg}"/>` +
    scaled +
    `<rect x="1" y="1" width="98" height="98" rx="7.5" fill="none" stroke="${palette.line}" stroke-opacity="0.18" stroke-width="1"/>` +
    `</svg>`;
  return svgToDataUri(svg);
}

/** 4 gallery images per product: ivory, emerald, zoom, sand. */
export function buildProductImages(key) {
  return ['ivory', 'emerald', 'zoom', 'sand'].map((variant) => buildArtImage(key, variant));
}

/** Category tiles use the gold-on-emerald look. */
export function buildCategoryImage(key) {
  return buildArtImage(key, 'emerald');
}
