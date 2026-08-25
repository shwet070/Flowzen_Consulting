// ---- year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- mobile menu ----
const burger = document.getElementById('burgerBtn');
const overlay = document.getElementById('menuOverlay');
const menu = document.getElementById('mobileMenu');

function openMenu(){
  burger.setAttribute('aria-expanded', 'true');
  overlay.hidden = false;
  menu.hidden = false;
  document.body.classList.add('menu-open');
}
function closeMenu(){
  burger.setAttribute('aria-expanded', 'false');
  overlay.hidden = true;
  menu.hidden = true;
  document.body.classList.remove('menu-open');
}
if (burger) {
  burger.addEventListener('click', () => {
    burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
}
if (overlay) overlay.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
if (menu) {
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}
window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });

// ---- scroll reveal (below-the-fold sections) ----
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---- stat count-up ----
function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

const statEls = Array.from(document.querySelectorAll('.stat-value'));
let statsStarted = false;

function runStats(){
  if (statsStarted) return;
  statsStarted = true;
  statEls.forEach((el, i) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500 + i * 80;
    const startOffset = 480 + i * 90;

    setTimeout(() => {
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = easeOutCubic(p);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(tick);
    }, startOffset);
  });
}

const statsRow = document.getElementById('statsRow');
if (statsRow && 'IntersectionObserver' in window) {
  const statsIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runStats();
        statsIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  statsIo.observe(statsRow);
} else if (statsRow) {
  runStats();
}

// ---- faq accordion ----
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
const growthForm = document.getElementById("growthForm");
const thankYouMessage = document.getElementById("thankYouMessage");
const backToForm = document.getElementById("backToForm");

growthForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Hide form
    growthForm.style.display = "none";

    // Show thank-you message
    thankYouMessage.hidden = false;

    // Optional: clear form
    growthForm.reset();
});

backToForm.addEventListener("click", function () {
    thankYouMessage.hidden = true;
    growthForm.style.display = "";
});
/* =========================================
   HEADER HIDE ON SCROLL DOWN / SHOW ON UP
========================================= */

const siteHeader = document.getElementById("siteHeader");

let lastScrollY = window.scrollY;
let scrollTicking = false;

const SCROLL_THRESHOLD = 8;
const TOP_OFFSET = 20;

function updateHeaderOnScroll() {
    if (!siteHeader) return;

    // Keep header visible while mobile menu is open
    if (document.body.classList.contains("menu-open")) {
        siteHeader.classList.remove("header-hidden");
        scrollTicking = false;
        return;
    }

    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;

    // Always show header near the top
    if (currentScrollY <= TOP_OFFSET) {
        siteHeader.classList.remove("header-hidden");
        lastScrollY = currentScrollY;
        scrollTicking = false;
        return;
    }

    // Ignore tiny movements
    if (Math.abs(scrollDifference) < SCROLL_THRESHOLD) {
        scrollTicking = false;
        return;
    }

    // Scrolling DOWN → hide
    if (scrollDifference > 0) {
        siteHeader.classList.add("header-hidden");
    }

    // Scrolling UP → show
    else {
        siteHeader.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
    scrollTicking = false;
}

window.addEventListener("scroll", () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateHeaderOnScroll);
        scrollTicking = true;
    }
}, { passive: true });

