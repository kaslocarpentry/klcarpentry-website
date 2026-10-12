// Builds the static site into dist/ from content/*.json
const fs = require('fs');
const path = require('path');
const read = (f) => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8'));
const site = read('content/site.json');
const res = read('content/resources.json');
const SITE_URL = 'https://klcarpentry.ca';
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const b = site.business;

const FONT_HEAD = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
<style>
body{margin:0;font-family:'Source Sans 3',system-ui,sans-serif;}
a{color:inherit}
</style>`;
const SERIF = "font-family: 'Libre Caslon Display', Georgia, serif; font-weight: 400";
const H2 = `margin: 0; ${SERIF}; font-size: clamp(36px, 5vw, 52px); line-height: 1`;
const WRAP = (inner) => `<div style="font-family: 'Source Sans 3', system-ui, sans-serif; color: #1B2A24; background: #F4F4F0; line-height: 1.55; font-size: 18px">\n${inner}\n</div>`;

function head({ title, description, canonical, extra = '', preload = '' }) {
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE_URL}${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE_URL}${canonical}">
<meta property="og:image" content="${SITE_URL}${site.hero.image}">
<meta name="theme-color" content="#1B2A24">
${preload}
${FONT_HEAD}
${extra}
</head>
<body>
`;
}

const callBtn = (label, style) => `<a href="tel:${esc(b.phoneLink)}" style="${style}">${label}</a>`;
const mailHref = `mailto:${esc(b.email)}`;

function footer(rightLink) {
  return `<div style="background: #1B2A24; color: #A9B6AD">
<div style="max-width: 1120px; margin: 0 auto; padding: 32px 20px; box-sizing: border-box; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; font-size: 16px">
<div style="display: flex; flex-direction: column; gap: 2px">
<div style="${SERIF}; font-size: 18px; letter-spacing: 0.14em; text-transform: uppercase; color: #ECEFE9">${esc(b.name)}</div>
<div>${esc(b.tagline)}</div>
<div>${esc(b.address)}</div>
</div>
<div style="display: flex; flex-direction: column; gap: 2px">
<div>${esc(b.phone)}</div>
<div>${esc(b.email)}</div>
</div>
${rightLink}
</div>
</div>`;
}

function homePage() {
  const h = site.hero;
  const hero = `<div style="background: #1B2A24; color: #ECEFE9">
<div style="max-width: 1120px; margin: 0 auto; padding: 24px 20px clamp(56px, 10vw, 88px); box-sizing: border-box; display: flex; flex-direction: column; gap: clamp(36px, 6vw, 64px)">
<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<div style="display: flex; flex-direction: column; gap: 2px">
<div style="${SERIF}; font-size: 20px; letter-spacing: 0.14em; text-transform: uppercase">${esc(b.name)}</div>
</div>
<a href="tel:${esc(b.phoneLink)}" style="font-size: 18px; font-weight: 500; text-decoration: none; padding: 10px 0">${esc(b.phone)}</a>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 40px 56px; align-items: stretch">
<div style="flex: 999 1 480px; min-width: 0; display: flex; flex-direction: column; gap: 24px; justify-content: center">
<h1 style="margin: 0; ${SERIF}; font-size: clamp(44px, 8vw, 100px); line-height: 1; letter-spacing: -0.01em; text-wrap: balance">${esc(h.headline)}</h1>
<p style="margin: 0; max-width: 52ch; font-size: 21px; color: #C9D2CB">${esc(h.intro)}</p>
<div style="display: flex; flex-wrap: wrap; gap: 12px; padding-top: 8px">
${callBtn('Call ' + esc(b.phone), 'display: inline-flex; align-items: center; justify-content: center; flex: 1 1 200px; min-height: 52px; padding: 0 24px; box-sizing: border-box; background: #E5A912; color: #1B2A24; font-weight: 600; font-size: 19px; text-decoration: none')}
<a href="${mailHref}" style="display: inline-flex; align-items: center; justify-content: center; flex: 1 1 200px; min-height: 52px; padding: 0 24px; box-sizing: border-box; border: 2px solid #ECEFE9; color: #ECEFE9; font-weight: 600; font-size: 19px; text-decoration: none">Email</a>
</div>
</div>
<div style="flex: 1 1 340px; min-width: 0; display: flex; flex-direction: column; gap: 12px">
<div style="position: relative; flex: 1 1 auto; min-height: clamp(260px, 60vw, 420px); background: #2A3C34; overflow: hidden">
<img src="${esc(h.image)}" alt="${esc(h.imageAlt)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 45%">
</div>
<div style="font-size: 16px; color: #9FB0A5">${esc(h.caption)}</div>
</div>
</div>
</div>
</div>`;
  const proof = `<div style="max-width: 1120px; margin: 0 auto; padding: 48px 20px 0; box-sizing: border-box">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px 40px">
${site.proof.map((p) => `<div style="display: flex; flex-direction: column; gap: 6px; border-top: 1px solid #B9C0B8; padding-top: 18px">
<div style="${SERIF}; font-size: 30px; line-height: 1.1">${esc(p.title)}</div>
<div style="color: #4A5A52">${esc(p.text)}</div>
</div>`).join('\n')}
</div>
</div>`;
  const n = site.services.length;
  const services = `<div style="max-width: 1120px; margin: 0 auto; padding: clamp(56px, 10vw, 88px) 20px 48px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 48px 64px">
<div style="flex: 1 1 240px; min-width: 0">
<h2 style="${H2}">${esc(site.servicesTitle)}</h2>
</div>
<div style="flex: 3 1 480px; min-width: 0; display: flex; flex-direction: column">
${site.services.map((s, i) => `<div style="display: flex; flex-wrap: wrap; gap: 6px 32px; padding: 22px 0; border-top: 1px solid #B9C0B8${i === n - 1 ? '; border-bottom: 1px solid #B9C0B8' : ''}">
<div style="flex: 1 1 220px; font-weight: 600; font-size: 21px">${esc(s.title)}</div>
<div style="flex: 2 1 280px; color: #4A5A52">${esc(s.text)}</div>
</div>`).join('\n')}
</div>
</div>`;
  const work = `<div style="background: #E6E8E2">
<div style="max-width: 1120px; margin: 0 auto; padding: clamp(56px, 10vw, 88px) 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 40px">
<div style="display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 16px">
<h2 style="${H2}">${esc(site.workTitle)}</h2>
<a href="${esc(b.facebook)}" style="font-weight: 600; text-decoration: underline; text-underline-offset: 4px">More on our Facebook page</a>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr)); gap: 24px">
${site.work.map((w) => `<div style="display: flex; flex-direction: column; gap: 10px">
<img loading="lazy" decoding="async" src="${esc(w.image)}" alt="${esc(w.alt)}" style="display: block; width: 100%; max-width: 100%; aspect-ratio: 4 / 3; object-fit: cover">
<div style="font-weight: 600">${esc(w.caption)}</div>
</div>`).join('\n')}
</div>
</div>
</div>`;
  const paras = (arr) => (arr || []).map((t) => `<p style="margin: 0; max-width: 56ch; color: #4A5A52">${esc(t)}</p>`).join('\n');
  const about = `<div style="max-width: 1120px; margin: 0 auto; padding: clamp(56px, 10vw, 88px) 20px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 56px 72px">
<div style="flex: 1 1 400px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<h2 style="${H2}">${esc(site.about.title)}</h2>
${site.about.photo ? `<img loading="lazy" src="${esc(site.about.photo)}" alt="${esc(site.about.photoAlt || '')}" style="display: block; width: 100%; max-width: 360px; aspect-ratio: 4 / 5; object-fit: cover">` : ''}
${site.about.ownerName ? `<div style="font-weight: 600; font-size: 21px">${esc(site.about.ownerName)}${site.about.ownerRole ? ', ' + esc(site.about.ownerRole) : ''}</div>` : ''}
${paras(site.about.paragraphs)}
</div>
<div style="flex: 1 1 400px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<h2 style="${H2}">${esc(site.area.title)}</h2>
${paras(site.area.paragraphs)}
</div>
</div>`;
  const faq = `<div style="background: #E6E8E2">
<div style="max-width: 1120px; margin: 0 auto; padding: clamp(56px, 10vw, 88px) 20px; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 48px 64px">
<div style="flex: 1 1 240px; min-width: 0">
<h2 style="${H2}">${esc(site.faqTitle)}</h2>
</div>
<div style="flex: 3 1 480px; min-width: 0; display: flex; flex-direction: column; gap: 28px">
${site.faq.map((f) => `<div style="display: flex; flex-direction: column; gap: 6px">
<h3 style="margin: 0; font-size: 20px; font-weight: 600">${esc(f.q)}</h3>
<p style="margin: 0; max-width: 60ch; color: #4A5A52">${esc(f.a)}</p>
</div>`).join('\n')}
</div>
</div>
</div>`;
  const bigNum = "font-family: 'Source Sans 3', system-ui, sans-serif; font-weight: 600; font-size: clamp(26px, 4vw, 44px); line-height: 1; letter-spacing: -0.01em; min-height: clamp(40px, 6vw, 56px); display: flex; align-items: flex-end; user-select: text; overflow-wrap: anywhere";
  const btn = 'display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; min-width: 200px; min-height: 48px; padding: 0 24px; box-sizing: border-box; font-weight: 600; font-size: 18px; text-decoration: none';
  const contact = `<div style="background: #E5A912; color: #1B2A24">
<div style="max-width: 1120px; margin: 0 auto; padding: clamp(56px, 10vw, 88px) 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 32px">
<h2 style="margin: 0; ${SERIF}; font-size: clamp(40px, 7vw, 76px); line-height: 1.02; letter-spacing: -0.01em; max-width: 16ch; text-wrap: balance">${esc(site.contact.title)}</h2>
<p style="margin: 0; max-width: 54ch; font-size: 21px">${esc(site.contact.text)}</p>
<div style="display: flex; flex-wrap: wrap; gap: 40px 64px">
<div style="display: flex; flex-direction: column; gap: 12px; min-width: 0">
<div style="${bigNum}">${esc(b.phone)}</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px"><a href="tel:${esc(b.phoneLink)}" style="${btn}; background: #1B2A24; color: #ECEFE9">Call</a></div>
</div>
<div style="display: flex; flex-direction: column; gap: 12px; min-width: 0">
<div style="${bigNum}">${esc(b.email)}</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px"><a href="${mailHref}" style="${btn}; border: 2px solid #1B2A24; color: #1B2A24">Email</a></div>
</div>
</div>
</div>
</div>`;
  const foot = footer(`<div style="display: flex; flex-direction: column; gap: 2px; align-self: flex-start">
<a href="/resources">${esc(site.footerLinkLabel)}</a>
<a href="${esc(b.facebook)}">Facebook</a>
</div>`);
  const ld = {
    '@context': 'https://schema.org', '@type': 'GeneralContractor', name: b.name, url: SITE_URL + '/',
    telephone: '+1-' + b.phoneLink.replace('+1', '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
    email: b.email, image: SITE_URL + h.image, slogan: b.tagline, foundingDate: '2019',
    address: { '@type': 'PostalAddress', addressLocality: 'Kaslo', addressRegion: 'BC', postalCode: 'V0G 1M0', addressCountry: 'CA' },
    areaServed: ['Kaslo', 'Ainsworth Hot Springs', 'Balfour', 'Lardeau', 'Meadow Creek', 'Argenta'].map((name) => ({ '@type': 'City', name })),
    knowsAbout: ['Custom homes', 'Cabins', 'Workshops and garages', 'Energy efficiency renovations', 'Foundations'],
    sameAs: [b.facebook],
  };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: site.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  const extra = `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`;
  return head({ title: site.seo.title, description: site.seo.description, canonical: '/', extra, preload: `<link rel="preload" as="image" href="${esc(h.image)}">` })
    + WRAP([hero, proof, services, work, about, faq, contact, foot].join('\n\n')) + '\n</body>\n</html>\n';
}

function resourcesPage() {
  const linkStyle = 'font-weight: 600; font-size: 21px; text-decoration: underline; text-underline-offset: 4px; overflow-wrap: anywhere';
  const header = `<div style="background: #1B2A24; color: #ECEFE9">
<div style="max-width: 1120px; margin: 0 auto; padding: 24px 20px clamp(48px, 8vw, 80px); box-sizing: border-box; display: flex; flex-direction: column; gap: clamp(32px, 5vw, 56px)">
<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 24px">
<a href="/" style="${SERIF}; font-size: 20px; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; padding: 10px 0">${esc(b.name)}</a>
<a href="tel:${esc(b.phoneLink)}" style="font-size: 18px; font-weight: 500; text-decoration: none; padding: 10px 0">${esc(b.phone)}</a>
</div>
<div style="display: flex; flex-direction: column; gap: 20px">
<h1 style="margin: 0; ${SERIF}; font-size: clamp(40px, 7vw, 84px); line-height: 1; letter-spacing: -0.01em; text-wrap: balance; max-width: 16ch">${esc(res.headline)}</h1>
<p style="margin: 0; max-width: 54ch; font-size: 21px; color: #C9D2CB">${esc(res.subheading)}</p>
</div>
</div>
</div>`;
  const groups = res.groups.map((g) => `<div style="display: flex; flex-wrap: wrap; gap: 20px 64px">
<div style="flex: 1 1 240px; min-width: 0">
<h2 style="margin: 0; ${SERIF}; font-size: clamp(32px, 4.4vw, 44px); line-height: 1.05">${esc(g.title)}</h2>
</div>
<div style="flex: 3 1 480px; min-width: 0; display: flex; flex-direction: column">
${g.items.map((it, i) => `<div style="display: flex; flex-wrap: wrap; gap: 8px 32px; padding: 24px 0; border-top: 1px solid #B9C0B8${i === g.items.length - 1 ? '; border-bottom: 1px solid #B9C0B8' : ''}">
<div style="flex: 1 1 220px; min-width: 0"><a href="${esc(it.url)}" target="_blank" rel="noopener" style="${linkStyle}">${esc(it.name)}</a></div>
<div style="flex: 2 1 300px; min-width: 0; color: #4A5A52">${esc(it.text)}</div>
</div>`).join('\n')}
</div>
</div>`).join('\n\n');
  const body = `<div style="max-width: 1120px; margin: 0 auto; padding: clamp(56px, 9vw, 88px) 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: clamp(48px, 7vw, 72px)">

${groups}

<div style="display: flex; flex-wrap: wrap; gap: 12px 24px; align-items: baseline; justify-content: space-between; color: #4A5A52; font-size: 16px">
<div>${esc(res.note)}</div>
<a href="${mailHref}" style="font-weight: 600; text-decoration: underline; text-underline-offset: 4px">${esc(res.suggestLabel)}</a>
</div>

</div>`;
  const contact = `<div style="background: #E5A912; color: #1B2A24">
<div style="max-width: 1120px; margin: 0 auto; padding: clamp(48px, 8vw, 72px) 20px; box-sizing: border-box; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px 40px">
<h2 style="margin: 0; ${SERIF}; font-size: clamp(32px, 5vw, 52px); line-height: 1.05; letter-spacing: -0.01em; max-width: 18ch; text-wrap: balance">${esc(res.contactTitle)}</h2>
<div style="display: flex; flex-wrap: wrap; gap: 12px; flex: 1 1 320px; max-width: 460px">
${callBtn('Call ' + esc(b.phone), 'display: inline-flex; align-items: center; justify-content: center; flex: 1 1 200px; box-sizing: border-box; min-height: 52px; padding: 0 24px; background: #1B2A24; color: #ECEFE9; font-weight: 600; font-size: 19px; text-decoration: none')}
<a href="${mailHref}" style="display: inline-flex; align-items: center; justify-content: center; flex: 1 1 120px; box-sizing: border-box; min-height: 52px; padding: 0 24px; border: 2px solid #1B2A24; color: #1B2A24; font-weight: 600; font-size: 19px; text-decoration: none">Email</a>
</div>
</div>
</div>`;
  const foot = footer(`<a href="/" style="align-self: flex-start; padding: 2px 0">Back to home</a>`);
  return head({ title: res.seo.title, description: res.seo.description, canonical: '/resources' })
    + WRAP([header, body, contact, foot].join('\n\n')) + '\n</body>\n</html>\n';
}

const out = path.join(__dirname, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), homePage());
fs.writeFileSync(path.join(out, 'resources.html'), resourcesPage());
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url><loc>${SITE_URL}/</loc></url>\n<url><loc>${SITE_URL}/resources</loc></url>\n</urlset>\n`);
fs.cpSync(path.join(__dirname, 'images'), path.join(out, 'images'), { recursive: true });
// Verification files for search engines, if present (google*.html, BingSiteAuth.xml)
for (const f of fs.readdirSync(__dirname)) if (/^google.*\.html$|^BingSiteAuth\.xml$/.test(f)) fs.copyFileSync(path.join(__dirname, f), path.join(out, f));
console.log('Built', fs.readdirSync(out).join(', '));
