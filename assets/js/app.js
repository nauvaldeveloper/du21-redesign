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

  let map = null; const markers = [];
  function initMap() {
    if (!window.L || map) return;
    map = L.map('map', { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Peta &copy; Esri' }).addTo(map);
    outlets.forEach((o) => {
      if (!o.lat) return;
      const icon = L.divIcon({ className: '', html: '<div class="pin"></div>', iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28] });
      const m = L.marker([o.lat, o.lng], { icon }).addTo(map).bindPopup(`<b>DU21 ${esc(o.name)}</b><br/>${esc(shortAddr(o.addr))}<br/><a href="${mapsLink(o)}" target="_blank" rel="noopener">Petunjuk arah</a>`);
      m.on('click', () => select(o.i, false));
      markers[o.i] = m;
    });
    fitTo(outlets);
  }
  function fitTo(list) {
    if (!map) return;
    const pts = list.filter((o) => o.lat).map((o) => [o.lat, o.lng]);
    if (st.me) pts.push([st.me.lat, st.me.lng]);
    if (pts.length) map.fitBounds(pts, { padding: [24, 24], maxZoom: 13 });
  }

  function visible() {
    const q = st.q.toLowerCase();
    let list = outlets.filter((o) => (st.area === 'all' || o.area === st.area) && (!q || (o.name + ' ' + o.addr).toLowerCase().includes(q)));
    if (st.me) list = list.map((o) => ({ ...o, d: o.lat ? km(st.me, o) : Infinity })).sort((a, b) => a.d - b.d);
    return list;
  }

  function renderOutlets(refit = true) {
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
    if (refit) fitTo(list);
  }

  function select(i, fly = true) {
    st.active = i;
    markers.forEach((m, k) => m && m.getElement() && m.getElement().querySelector('.pin').classList.toggle('is-on', k === i));
    const o = outlets[i];
    if (map && o.lat && fly) { map.flyTo([o.lat, o.lng], 14, { duration: .6 }); markers[i].openPopup(); }
    renderOutlets(false);
    const li = document.querySelector(`.o[data-i="${i}"]`);
    if (li && !fly) li.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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
      if (map) L.circleMarker([st.me.lat, st.me.lng], { radius: 9, color: '#fff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }).addTo(map).bindPopup('Lokasimu');
      btn.textContent = 'Lokasi dipakai';
      renderOutlets();
      const first = visible()[0]; if (first) select(first.i);
    }, () => { btn.textContent = 'Izin lokasi ditolak'; }, { enableHighAccuracy: false, timeout: 10000 });
  }
  $('#locBtn').addEventListener('click', locate);
  document.querySelectorAll('[data-near]').forEach((a) => a.addEventListener('click', () => setTimeout(locate, 400)));

  /* ---------------- lain-lain ---------------- */
  $('#press').innerHTML = D.PRESS.map((p) => `<li>${esc(p)}</li>`).join('');
  $('#faq').innerHTML = D.FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  $('#waFloat').href = waLink('Hi DU21');
  $('#careerLink').href = D.IG;
  $('#footLinks').innerHTML = [
    ['WhatsApp ' + D.WA_DISPLAY, waLink('Hi DU21')], ['Instagram @du21group', D.IG], ['TikTok @dapurumi21', D.TIKTOK], [D.EMAIL, 'mailto:' + D.EMAIL],
  ].map(([l, h]) => `<li><a href="${h}" target="_blank" rel="noopener">${esc(l)}</a></li>`).join('');

  renderMenu(); renderOutlets(); initMap();
  window.addEventListener('load', () => { if (map) { map.invalidateSize(); fitTo(visible()); } });
})();
