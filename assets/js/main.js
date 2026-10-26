document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var panel = document.getElementById('site-nav');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Event photo gallery: click a photo to see it large, arrows/keys to move between photos
  var gallery = document.querySelector('[data-gallery]');
  var box = document.querySelector('.lightbox');
  if (gallery && box && typeof box.showModal === 'function') {
    var links = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-item'));
    var img = box.querySelector('img');
    var cap = box.querySelector('figcaption');
    var current = 0;
    var show = function (i) {
      current = (i + links.length) % links.length;
      img.src = links[current].getAttribute('href');
      img.alt = links[current].dataset.caption || '';
      cap.textContent = links[current].dataset.caption || '';
    };
    links.forEach(function (a, i) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); show(i); box.showModal(); });
    });
    box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
    box.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    box.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    box.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft') show(current - 1);
      if (ev.key === 'ArrowRight') show(current + 1);
    });
    box.addEventListener('click', function (ev) { if (ev.target === box) box.close(); });
  }

  // Fade sections in as they scroll into view
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
});
