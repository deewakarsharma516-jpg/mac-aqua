/* MAC AQUA FILTRATION — shared interactions */

/* ---- mobile nav ---- */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }
})();

/* ---- scroll reveal ---- */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(function (e) { io.observe(e); });
})();

/* ---- animated counters ---- */
(function () {
  var nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  var run = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    var step = function (t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var val = Math.floor((0.5 - Math.cos(p * Math.PI) / 2) * target);
      el.textContent = val.toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('en-IN') + suffix;
    };
    requestAnimationFrame(step);
  };
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
    });
  }, { threshold: 0.5 });
  nums.forEach(function (n) { io.observe(n); });
})();

/* ---- enquiry form -> WhatsApp ---- */
(function () {
  var form = document.getElementById('enquiryForm');
  if (!form) return;
  var WA_NUMBER = '919899193589'; // enquiry WhatsApp number (91 = India)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = (form.name.value || '').trim();
    var phone = (form.phone.value || '').trim();
    var email = (form.email.value || '').trim();
    var service = form.service.value || '';
    var message = (form.message.value || '').trim();

    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }
    var text =
      '*New Enquiry — MAC Aqua Filtration*%0A%0A' +
      '*Name:* ' + encodeURIComponent(name) + '%0A' +
      '*Phone:* ' + encodeURIComponent(phone) + '%0A' +
      (email ? '*Email:* ' + encodeURIComponent(email) + '%0A' : '') +
      (service ? '*Service:* ' + encodeURIComponent(service) + '%0A' : '') +
      (message ? '*Details:* ' + encodeURIComponent(message) : '');

    window.open('https://wa.me/' + WA_NUMBER + '?text=' + text, '_blank');
    var ok = document.getElementById('formOk');
    if (ok) ok.style.display = 'block';
    form.reset();
  });
})();

/* ---- gallery / video tabs ---- */
(function () {
  var tabs = document.querySelectorAll('.sub-tab');
  if (!tabs.length) return;
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      var target = t.getAttribute('data-tab');
      document.querySelectorAll('[data-panel]').forEach(function (p) {
        p.classList.toggle('hidden', p.getAttribute('data-panel') !== target);
      });
    });
  });
})();

/* ---- default hero slides (used if site-data.js has none) ---- */
var DEFAULT_SLIDES = [
  { eyebrow:"Industrial & Commercial", title:'Industrial &amp; Commercial <span class="accent">RO Plants</span>', subtitle:"High-capacity reverse osmosis for consistent, low-TDS process and drinking water.", button:"View Services", link:"services.html", image:"prod-ro.jpg", bg:"linear-gradient(115deg,#0A2540,#1E4F9E)" },
  { eyebrow:"Water Softening & Filtration", title:'Complete <span class="accent">Water Treatment Plants</span>', subtitle:"Softeners, multigrade and carbon filters that protect your equipment from scale.", button:"View Services", link:"services.html", image:"prod-softener.jpg", bg:"linear-gradient(115deg,#0d2a4d,#155e8a)" },
  { eyebrow:"Effluent Treatment", title:'ETP — <span class="accent">Effluent Treatment Plants</span>', subtitle:"Bring industrial wastewater within pollution-control discharge norms.", button:"View Services", link:"services.html", image:"prod-etp.jpg", bg:"linear-gradient(115deg,#10233f,#1b4f9e)" },
  { eyebrow:"Sewage Treatment", title:'STP — <span class="accent">Sewage Treatment Plants</span>', subtitle:"Compact sewage treatment for buildings, townships and industry.", button:"View Services", link:"services.html", image:"prod-stp.jpg", bg:"linear-gradient(115deg,#0A2540,#12557f)" },
  { eyebrow:"Ultrafiltration", title:'UF — <span class="accent">Ultrafiltration Plants</span>', subtitle:"Chemical-free removal of turbidity, bacteria and suspended solids.", button:"View Services", link:"services.html", image:"prod-uf.jpg", bg:"linear-gradient(115deg,#12365f,#1C74B8)" },
  { eyebrow:"Demineralisation", title:'DM — <span class="accent">Demineralisation Plants</span>', subtitle:"High-purity, low-conductivity water for boilers, labs and process use.", button:"View Services", link:"services.html", image:"prod-dm.jpg", bg:"linear-gradient(115deg,#0A2540,#164a86)" }
];

/* ---- hero slider ---- */
(function () {
  var mount = document.getElementById('heroSlider');
  if (!mount) return;
  var slides = (window.SITE_DATA && Array.isArray(SITE_DATA.slides) && SITE_DATA.slides.length)
    ? SITE_DATA.slides : DEFAULT_SLIDES;

  var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var wave = '<div class="hero-waves" aria-hidden="true"><svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path fill="#ffffff" d="M0,42 C240,92 480,8 720,40 C960,72 1200,18 1440,50 L1440,90 L0,90 Z"/></svg></div>';

  var html = "";
  slides.forEach(function (s, i) {
    var bg = s.bg || "linear-gradient(115deg,#0A2540,#1E4F9E)";
    var isSplit = !!s.image;
    var text = ''
      + (s.eyebrow ? '<span class="eyebrow">' + s.eyebrow + '</span>' : '')
      + '<h1>' + (s.title || '') + '</h1>'
      + (s.subtitle ? '<p class="lead">' + s.subtitle + '</p>' : '')
      + '<div class="hero-actions">'
      + '<a href="' + (s.link || 'services.html') + '" class="btn btn-primary">' + (s.button || 'Know More') + ' ' + arrow + '</a>'
      + '<a href="contact.html" class="btn btn-ghost">Get a Free Quote</a>'
      + '</div>';
    var inner = isSplit
      ? '<div class="container hs-split"><div class="hs-text">' + text + '</div>'
        + '<div class="hs-media"><img src="' + s.image + '" alt="" loading="lazy"></div></div>'
      : '<div class="container">' + text + '</div>';
    html += '<div class="hslide' + (i === 0 ? ' active' : '') + '" style="background-image:' + bg + '">' + inner + '</div>';
  });
  if (slides.length > 1) {
    html += '<button class="hs-arrow prev" aria-label="Previous">\u2039</button>';
    html += '<button class="hs-arrow next" aria-label="Next">\u203A</button>';
    var dots = '<div class="hs-dots">';
    slides.forEach(function (s, i) { dots += '<button class="' + (i === 0 ? 'active' : '') + '" aria-label="Slide ' + (i + 1) + '"></button>'; });
    dots += '</div>';
    html += dots;
  }
  html += wave;
  mount.innerHTML = html;

  var items = mount.querySelectorAll('.hslide');
  var dotEls = mount.querySelectorAll('.hs-dots button');
  var idx = 0, timer = null;
  function go(n) {
    items[idx].classList.remove('active');
    if (dotEls[idx]) dotEls[idx].classList.remove('active');
    idx = (n + items.length) % items.length;
    items[idx].classList.add('active');
    if (dotEls[idx]) dotEls[idx].classList.add('active');
  }
  function next() { go(idx + 1); }
  function start() { if (items.length > 1) timer = setInterval(next, 6000); }
  function stop() { clearInterval(timer); }

  var p = mount.querySelector('.hs-arrow.prev'), nx = mount.querySelector('.hs-arrow.next');
  if (p) p.addEventListener('click', function () { stop(); go(idx - 1); start(); });
  if (nx) nx.addEventListener('click', function () { stop(); next(); start(); });
  dotEls.forEach(function (d, i) { d.addEventListener('click', function () { stop(); go(i); start(); }); });
  mount.addEventListener('mouseenter', stop);
  mount.addEventListener('mouseleave', start);
  start();
})();

/* ---- optional: render gallery photos from site-data.js ---- */
(function () {
  var grid = document.getElementById('galleryGrid');
  if (!grid || !(window.SITE_DATA && Array.isArray(SITE_DATA.gallery) && SITE_DATA.gallery.length)) return;
  grid.innerHTML = SITE_DATA.gallery.map(function (g) {
    return '<div class="gallery-item"><img src="' + g.image + '" alt="' + (g.caption || '') + '">'
      + (g.caption ? '<div class="cap">' + g.caption + '</div>' : '') + '</div>';
  }).join('');
})();

/* ---- optional: render blog posts from site-data.js ---- */
(function () {
  var grid = document.getElementById('blogGrid');
  if (!grid || !(window.SITE_DATA && Array.isArray(SITE_DATA.posts) && SITE_DATA.posts.length)) return;
  var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  grid.innerHTML = SITE_DATA.posts.map(function (p, i) {
    var cls = ['', 'alt', 'alt2'][i % 3];
    var thumb = p.image
      ? '<div class="thumb" style="background-image:url(\'' + p.image + '\');background-size:cover;background-position:center;"></div>'
      : '<div class="thumb ' + cls + '"></div>';
    return '<article class="post">' + thumb + '<div class="body">'
      + '<span class="meta">' + (p.category || 'Insights') + '</span>'
      + '<h3>' + (p.title || '') + '</h3>'
      + '<p>' + (p.excerpt || '') + '</p>'
      + '<a class="more" href="#">Read more ' + arrow + '</a>'
      + '</div></article>';
  }).join('');
})();

/* ---- optional: update contact info from site-data.js ---- */
(function () {
  if (!(window.SITE_DATA && SITE_DATA.contact)) return;
  var c = SITE_DATA.contact;
  if (c.phone) document.querySelectorAll('.js-phone').forEach(function (e) { e.textContent = c.phone; });
  if (c.email) document.querySelectorAll('.js-email').forEach(function (e) { e.textContent = c.email; });
})();

/* ---- products page: load from Google Sheet + detail modal ---- */
var _products = [];
var SPEC_LABELS = [
  "Rated Capacity","Membrane Configuration","Membrane Recovery Rate","Recovery Rate",
  "Feed Water TDS","Product Water TDS","Permeate TDS","Raw Water Requirement","Water Requirement",
  "Pre-Treatment","Pre Treatment","Pretreatment","High Pressure Pump","Booster Pump","Dosing Pump",
  "Control Panel","Frame / Skid","Inlet / Outlet Connection","Inlet / Outlet","Outlet Connection",
  "Power Supply","Recommended Use","Application","Warranty","Material of Construction","MOC",
  "Number of Membranes","No of Membranes","Working Pressure","Operating Pressure","Flow Rate",
  "Filtration Media","Media","Vessel","Storage Tank","Air Blower","Blower","Diffuser","Motor",
  "Capacity","Model","Voltage","Pump","Power"
];
function _escRe(s){ return s.replace(/[.*+?^${}()|[\]\\/-]/g,'\\$&'); }
function _autoSpecs(text){
  if(!text) return [];
  var labels = SPEC_LABELS.slice().sort(function(a,b){return b.length-a.length;});
  var re = new RegExp('\\b(' + labels.map(_escRe).join('|') + ')\\b','gi');
  var matches=[], m;
  while((m=re.exec(text))!==null){ matches.push({label:m[1], start:m.index, end:m.index+m[0].length}); }
  var specs=[];
  for(var i=0;i<matches.length;i++){
    var val = text.slice(matches[i].end, (i+1<matches.length)?matches[i+1].start:text.length);
    val = val.replace(/^[\s:.\-\u2013\u2014]+/,'').replace(/\s+/g,' ').trim();
    if(val) specs.push([matches[i].label, val]);
  }
  return specs;
}
function _isSpec(l){ var i=l.indexOf(':'); return i>0 && i<=45 && l.slice(i+1).trim().length>0; }
function _parseDesc(d){
  d = String(d||'');
  // 1) Manual "Label: Value" (one per line) — highest priority
  var lines=d.split(/\r?\n/).map(function(l){return l.trim();});
  var manual=[], paraLines=[], hasManual=false;
  lines.forEach(function(l){
    if(_isSpec(l)){ var i=l.indexOf(':'); manual.push([l.slice(0,i).trim(), l.slice(i+1).trim()]); hasManual=true; }
    else if(l) paraLines.push(l);
  });
  if(hasManual) return {paras:paraLines, specs:manual};
  // 2) Auto: split at "Technical Specifications"
  var low=d.toLowerCase(); var idx=low.indexOf('technical specification');
  var descPart=d, specPart='';
  if(idx>-1){ descPart=d.slice(0,idx); specPart=d.slice(idx).replace(/technical\s+specifications?/i,''); }
  var specs=_autoSpecs(specPart);
  // 3) No keyword: detect labels anywhere; text before first label = description
  if(idx===-1){
    var all=_autoSpecs(d);
    if(all.length){
      var labels=SPEC_LABELS.slice().sort(function(a,b){return b.length-a.length;});
      var mm=d.match(new RegExp('\\b('+labels.map(_escRe).join('|')+')\\b','i'));
      if(mm) descPart=d.slice(0,mm.index);
      specs=all;
    }
  }
  var paras=descPart.split(/\r?\n/).map(function(x){return x.trim();}).filter(Boolean);
  return {paras:paras, specs:specs};
}

function _specsTable(specs){
  return '<table class="spec-table"><tbody>'+specs.map(function(s){
    return '<tr><th>'+s[0]+'</th><td>'+s[1]+'</td></tr>';
  }).join('')+'</tbody></table>';
}
function _short(d){
  var p=(_parseDesc(d).paras[0])||'';
  return p.length>130 ? p.slice(0,130).replace(/\s+\S*$/,'')+'\u2026' : p;
}
var SERVICES=[
 {name:"Water Softener",category:"Water Softening",image:"prod-softener.jpg",description:"Hard water damages boilers, cooling towers, heat exchangers and laundry equipment through scale build-up. Our ion-exchange softeners remove calcium and magnesium hardness, protecting your equipment and improving efficiency. Available in manual, semi-auto and fully automatic configurations for any flow rate.",features:["Boiler feed","Cooling towers","Hotels & laundries","Process water"]},
 {name:"Industrial & Commercial RO Plant",category:"Reverse Osmosis",image:"prod-ro.jpg",description:"High-capacity reverse osmosis plants that reduce dissolved salts (TDS), producing consistent low-TDS water for drinking, process and boiler applications. Engineered with quality membranes, dosing systems and controls, and sized precisely to your daily requirement.",features:["Low-TDS output","Bottling & food","Pharma & textile","Institutions"]},
 {name:"ETP Plant",category:"Effluent Treatment",image:"prod-etp.jpg",description:"Effluent Treatment Plants treat industrial wastewater so it meets pollution-control discharge norms. We combine physical, chemical and biological stages tailored to your effluent, helping you stay compliant while reducing your environmental footprint.",features:["Norm compliance","Chemical & textile","Electroplating","Manufacturing"]},
 {name:"STP Plant",category:"Sewage Treatment",image:"prod-stp.jpg",description:"Sewage Treatment Plants for residential complexes, commercial buildings, townships and industry. Using proven MBBR / SBR / activated-sludge processes, our compact STPs turn sewage into safe, reusable water for gardening, flushing and cooling make-up.",features:["Apartments","Malls & offices","Townships","Reuse-ready"]},
 {name:"UF Plant",category:"Ultrafiltration",image:"prod-uf.jpg",description:"Ultrafiltration membranes remove suspended solids, turbidity, bacteria and cysts without chemicals, delivering clear, safe water. Often used as pre-treatment for RO or as a stand-alone stage where dissolved salts are already within limits.",features:["Turbidity removal","Bacteria & cysts","RO pre-treatment","Chemical-free"]},
 {name:"DM Plant (Demineralisation)",category:"Demineralisation",image:"prod-dm.jpg",description:"Demineralisation (DM) plants remove nearly all dissolved minerals to produce high-purity, low-conductivity water for boilers, batteries, labs and process use. Our ZeroScale DM systems include auto TDS cut-off controllers and level sensors for hands-free operation.",features:["Boiler feed","High purity","Labs & pharma","Auto TDS control"]},
 {name:"Water Recycling Plant",category:"Water Recycling / ZLD",image:"",description:"Recover and reuse treated water instead of discharging it. By combining treatment stages with recycling, we help you cut freshwater costs, reduce discharge and move toward Zero Liquid Discharge (ZLD).",features:["Cost savings","ZLD systems","Reduced discharge","Sustainability"]}
];
function _detailHTML(p){
  var parsed=_parseDesc(p.description);
  var badges='';
  if(p.model) badges+='<span class="pmeta">Model: '+p.model+'</span>';
  if(p.capacity) badges+='<span class="pmeta">Capacity: '+p.capacity+'</span>';
  var feat=(p.features&&p.features.length)?'<h4>Applications</h4><div class="chips">'+p.features.map(function(f){return '<span>'+f+'</span>';}).join('')+'</div>':'';
  var hero=p.image?'<div class="detail-hero"><img src="'+p.image+'" alt="'+(p.name||'')+'"></div>':'';
  return '<button class="detail-back" onclick="closeDetail()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg> Back to list</button>'
    + hero
    + '<div class="detail-body">'
    + (p.category?'<span class="ptag">'+p.category+'</span>':'')
    + '<h2>'+(p.name||'')+'</h2>'
    + (badges?'<div class="detail-badges">'+badges+'</div>':'')
    + parsed.paras.map(function(x){return '<p>'+x+'</p>';}).join('')
    + (parsed.specs.length?'<h4>Technical Specifications</h4>'+_specsTable(parsed.specs):'')
    + feat
    + '<div class="detail-actions"><a class="pbtn" href="contact.html">Get a Quote</a><a class="pbtn-ghost" href="https://wa.me/919899193589" target="_blank" rel="noopener">WhatsApp</a></div>'
    + '</div>';
}
function _listEl(){ return document.getElementById('productGrid') || document.getElementById('serviceList'); }
function _openDetail(html){
  var dv=document.getElementById('detailView'); if(!dv) return;
  dv.innerHTML=html; dv.classList.add('open');
  var g=_listEl(); if(g) g.classList.add('list-hidden');
  var st=document.getElementById('productStatus'); if(st) st.classList.add('list-hidden');
  var y=dv.getBoundingClientRect().top+window.pageYOffset-90;
  window.scrollTo({top:Math.max(0,y),behavior:'auto'});
}
function closeDetail(){
  var dv=document.getElementById('detailView'); if(dv){dv.classList.remove('open');dv.innerHTML='';}
  var g=_listEl(); if(g) g.classList.remove('list-hidden');
  var st=document.getElementById('productStatus'); if(st) st.classList.remove('list-hidden');
}
function openProduct(i){ var p=_products[i]; if(p) _openDetail(_detailHTML(p)); }
function openService(i){ var p=SERVICES[i]; if(p) _openDetail(_detailHTML(p)); }
document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeDetail(); });
(function () {
  var grid = document.getElementById('productGrid');
  if (!grid) return;
  var status = document.getElementById('productStatus');
  var api = (window.MAC_CONFIG && window.MAC_CONFIG.productsApi) || '';
  if (!api) { if (status) status.textContent = 'Products API set nahi hai (config.js).'; return; }
  var CACHE = 'macaqua_products_cache';
  function render(items){
    _products = items || [];
    grid.innerHTML = _products.map(function (p, i) {
      var meta = [];
      if (p.model) meta.push('<span class="pmeta">' + p.model + '</span>');
      if (p.capacity) meta.push('<span class="pmeta">' + p.capacity + '</span>');
      var thumb = p.image ? '<img class="plist-thumb" src="' + p.image + '" alt="" loading="lazy">' : '<div class="plist-thumb"></div>';
      return '<div class="plist-item" onclick="openProduct(' + i + ')">'
        + thumb
        + '<div class="plist-info">'
        + (p.category ? '<span class="ptag">' + p.category + '</span>' : '')
        + '<h3>' + (p.name || '') + '</h3>'
        + (meta.length ? '<div class="plist-meta">' + meta.join('') + '</div>' : '')
        + '</div>'
        + '<span class="plist-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
        + '</div>';
    }).join('');
    if (status) status.textContent = '';
  }
  try { var c = JSON.parse(localStorage.getItem(CACHE) || 'null'); if (c && c.length) render(c); else if (status) status.textContent = 'Loading products\u2026'; } catch(e){ if (status) status.textContent = 'Loading\u2026'; }
  fetch(api + '?action=products&t=' + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var items = (d && d.products) ? d.products : [];
      if (items.length) { render(items); try { localStorage.setItem(CACHE, JSON.stringify(items)); } catch(e){} }
      else if (!_products.length) { if (status) status.textContent = 'Abhi koi product nahi.'; }
    })
    .catch(function () { if (!_products.length && status) status.textContent = 'Products load nahi hue \u2014 internet / URL check karo.'; });
})();

/* ---- footer year ---- */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
