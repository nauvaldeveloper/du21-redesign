/* =========================================================
   ES TELER DU21 — menu, pencari outlet + peta, pesanan acara
   ========================================================= */
(function () {
  'use strict';
  const D = window.DU21;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rp = (n) => 'Rp' + Math.round(n).toLocaleString('id-ID');
  const waLink = (text) => `https://wa.me/${D.WA_NUMBER}?text=${encodeURIComponent(text)}`;
  const mapsLink = (o) => o.lat ? `https://www.google.com/maps/search/?api=1&query=${o.lat},${o.lng}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Es Teler DU21 ' + o.addr)}`;
  const shortAddr = (a) => a.replace(/,?\s*Jawa Barat.*$/i, '').replace(/,?\s*\d{5}.*$/, '');

  /* ---------------- menu ---------------- */
  let filter = 'all';
  function renderMenu() {
    $('#grid').innerHTML = D.MENU.filter((m) => filter === 'all' || m.tags.includes(filter)).map((m) => `
      <article class="item">
        <div class="item__img"><img src="assets/img/menu/${m.id}.webp" alt="${esc(m.name)}" loading="lazy" width="560" height="560" />${m.first ? '<span class="item__tag">Yang pertama</span>' : ''}</div>
        <div class="item__body"><h3>${esc(m.name)}</h3><p>${esc(m.note)}</p><span class="item__price">${rp(m.price)}</span></div>
      </article>`).join('');
  }
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    filter = b.dataset.f;
    $('#filters').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    renderMenu();
  });

  /* ---------------- outlets ---------------- */
  const st = { q: '', area: 'all', me: null, active: null };
  const km = (a, b) => {
    const R = 6371, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const outlets = D.OUTLETS.map((o, i) => ({ ...o, i }));

  $('#areas').innerHTML = [{ id: 'all', label: 'Semua' }, ...D.AREAS].map((a) => `<button type="button" data-area="${a.id}" aria-pressed="${a.id === 'all'}">${esc(a.label)}</button>`).join('');

  // Peta: Google Maps embed (tanpa API key), menampilkan outlet yang sedang dipilih
  const embed = (o) => `https://maps.google.com/maps?q=${o.lat ? `${o.lat},${o.lng}` : encodeURIComponent('Es Teler DU21 ' + o.addr)}&z=16&hl=id&output=embed`;
  function showMap(o) {
    const f = $('#gmap');
    if (f.dataset.i === String(o.i)) return;
    f.dataset.i = o.i; f.src = embed(o); f.title = `Peta outlet DU21 ${o.name}`;
    $('#mapName').textContent = `DU21 ${o.name}`;
    $('#mapAddr').textContent = shortAddr(o.addr);
    $('#mapGo').href = mapsLink(o);
  }

  function visible() {
    const q = st.q.toLowerCase();
    let list = outlets.filter((o) => (st.area === 'all' || o.area === st.area) && (!q || (o.name + ' ' + o.addr).toLowerCase().includes(q)));
    if (st.me) list = list.map((o) => ({ ...o, d: o.lat ? km(st.me, o) : Infinity })).sort((a, b) => a.d - b.d);
    return list;
  }

  function renderOutlets() {
    const list = visible();
    $('#count').textContent = list.length
      ? (st.me ? `${list.length} outlet, diurutkan dari yang paling dekat denganmu` : `${list.length} outlet ditemukan`)
      : 'Belum ada outlet di pencarian itu. Coba kota lain.';
    $('#list').innerHTML = list.map((o) => {
      const order = [
        o.gofood ? `<a class="go" href="${o.gofood}" target="_blank" rel="noopener">GoFood</a>` : '',
        o.shopee ? `<a class="sp" href="${o.shopee}" target="_blank" rel="noopener">ShopeeFood</a>` : '',
        !o.gofood && !o.shopee ? `<a href="${waLink(`Halo DU21, saya mau pesan online dari outlet ${o.name}. Bisa lewat aplikasi apa ya?`)}" target="_blank" rel="noopener">Tanya pesan online</a>` : '',
      ].join('');
      return `<li class="o${st.active === o.i ? ' is-on' : ''}" data-i="${o.i}">
        <div class="o__top"><h3>${esc(o.name)}</h3>${st.me && isFinite(o.d) ? `<span class="o__km">± ${o.d < 10 ? o.d.toFixed(1) : Math.round(o.d)} km</span>` : ''}</div>
        <p>${esc(shortAddr(o.addr))}</p>
        <div class="o__acts"><a href="${mapsLink(o)}" target="_blank" rel="noopener">Petunjuk arah</a>${order}</div>
      </li>`;
    }).join('');
    if (st.active == null && list[0]) showMap(list[0]);
  }

  function select(i, scroll = false) {
    st.active = i;
    showMap(outlets[i]);
    renderOutlets();
    const li = document.querySelector(`.o[data-i="${i}"]`);
    if (li && scroll) li.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    if (window.innerWidth < 960) $('#mapCard').scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  $('#list').addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const li = e.target.closest('.o'); if (li) select(Number(li.dataset.i));
  });
  let qt; $('#q').addEventListener('input', (e) => { clearTimeout(qt); qt = setTimeout(() => { st.q = e.target.value.trim(); renderOutlets(); }, 120); });
  $('#areas').addEventListener('click', (e) => {
    const b = e.target.closest('[data-area]'); if (!b) return;
    st.area = b.dataset.area;
    $('#areas').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b));
    renderOutlets();
  });

  function locate() {
    const btn = $('#locBtn');
    if (!navigator.geolocation) { btn.textContent = 'Lokasi tidak didukung'; return; }
    btn.textContent = 'Mencari lokasimu…';
    navigator.geolocation.getCurrentPosition((p) => {
      st.me = { lat: p.coords.latitude, lng: p.coords.longitude };
      btn.textContent = 'Lokasi dipakai';
      st.active = null; renderOutlets();
      const first = visible()[0]; if (first) select(first.i, true);
    }, () => { btn.textContent = 'Izin lokasi ditolak'; }, { enableHighAccuracy: false, timeout: 10000 });
  }
  $('#locBtn').addEventListener('click', locate);
  document.querySelectorAll('[data-near]').forEach((a) => a.addEventListener('click', () => setTimeout(locate, 400)));

  /* ---------------- galeri ---------------- */
  const PLAY = '<span class="tile__play"><svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg></span>';
  const tile = (g, i) => `<button type="button" class="tile tile--${g.shape}" data-g="${i}" aria-label="${g.type === 'video' ? 'Putar video' : 'Lihat foto'}: ${esc(g.title)}">
      <img src="assets/img/galeri/${g.poster}.webp" alt="" loading="lazy" />${g.type === 'video' ? PLAY : ''}
      <span class="tile__info"><b>${esc(g.title)}</b><span>${esc(g.sub)}</span></span></button>`;
  $('#galTv').innerHTML = D.GALLERY.map((g, i) => g.kind === 'tv' ? tile(g, i) : '').join('');
  $('#galPf').innerHTML = D.GALLERY.map((g, i) => g.kind === 'pf' ? tile(g, i) : '').join('');
  const lb = $('#lb');
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-g]'); if (!t) return;
    const g = D.GALLERY[Number(t.dataset.g)];
    $('#lbMedia').innerHTML = g.type === 'video'
      ? `<video src="${g.src}" poster="assets/img/galeri/${g.poster}.webp" controls autoplay playsinline preload="metadata"></video>`
      : `<img src="assets/img/galeri/${g.poster}.webp" alt="${esc(g.title)}" />`;
    $('#lbCap').textContent = `${g.title} · ${g.sub}`;
    lb.showModal();
  });
  const closeLb = () => { lb.close(); };
  $('#lbX').addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  lb.addEventListener('close', () => { $('#lbMedia').innerHTML = ''; });
  $('#igLink').href = D.IG;

  /* ---------------- lain-lain ---------------- */
  $('#press').innerHTML = D.PRESS.map((p) => `<li>${esc(p)}</li>`).join('');
  $('#faq').innerHTML = D.FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  $('#waFloat').href = waLink('Hi DU21');
  $('#careerLink').href = D.IG;
  $('#footLinks').innerHTML = [
    ['WhatsApp ' + D.WA_DISPLAY, waLink('Hi DU21')], ['Instagram @du21group', D.IG], ['TikTok @dapurumi21', D.TIKTOK], [D.EMAIL, 'mailto:' + D.EMAIL],
  ].map(([l, h]) => `<li><a href="${h}" target="_blank" rel="noopener">${esc(l)}</a></li>`).join('');

  renderMenu(); renderOutlets();
})();
