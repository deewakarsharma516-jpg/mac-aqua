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
  {
    eyebrow: "Total Water & Environment Management · Since 2019",
    title: 'Refreshing industry with <span class="accent">clean, reusable water.</span>',
    subtitle: "Complete water and wastewater treatment plants — from softening and RO to ETP, STP and zero-liquid-discharge recycling.",
    button: "Know More", link: "services.html",
    image: "prod-ro.jpg"
  },
  {
    eyebrow: "24×7 Service & Support",
    title: 'Turnkey plants, <span class="accent">expertly serviced.</span>',
    subtitle: "Design, installation, commissioning, AMC and on-site support — one accountable team for the life of your plant.",
    button: "Our Services", link: "services.html",
    bg: "linear-gradient(115deg,#12365f,#12B5CB)"
  },
  {
    eyebrow: "Adding value across sectors",
    title: 'Solutions for <span class="accent">industry, homes & communities.</span>',
    subtitle: "360° water and wastewater treatment for factories, institutions, residential complexes and townships.",
    button: "Get a Quote", link: "contact.html",
    bg: "linear-gradient(115deg,#0A2540,#2AA0C4)"
  }
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
    var bg = s.image ? ("url('" + s.image + "')") : (s.bg || "linear-gradient(115deg,#0A2540,#1E4F9E)");
    html += '<div class="hslide' + (i === 0 ? ' active' : '') + '" style="background-image:' + bg + '">'
      + '<div class="container">'
      + (s.eyebrow ? '<span class="eyebrow">' + s.eyebrow + '</span>' : '')
      + '<h1>' + (s.title || '') + '</h1>'
      + (s.subtitle ? '<p class="lead">' + s.subtitle + '</p>' : '')
      + '<div class="hero-actions">'
      + '<a href="' + (s.link || 'services.html') + '" class="btn btn-primary">' + (s.button || 'Know More') + ' ' + arrow + '</a>'
      + '<a href="contact.html" class="btn btn-ghost">Get a Free Quote</a>'
      + '</div></div></div>';
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

/* ---- footer year ---- */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
