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

/* ---- footer year ---- */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
