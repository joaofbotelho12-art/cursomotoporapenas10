/* =============================================
   MECÂNICA DE MOTOS PRO – JAVASCRIPT
   Interactions, Animations & FAQ
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. FAQ ACCORDION
  ────────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ──────────────────────────────────────────
     2. SCROLL REVEAL ANIMATIONS
  ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(`
    .hero-content, .social-proof-badge,
    .section-label, .section-title, .section-subtitle,
    .card, .module-card, .testimonial-card, .package-item,
    .result-item, .forwhom-item, .faq-item,
    .different-col, .bonus-box, .pricing-card,
    .guarantee-box, .final-cta-content,
    .why-intro, .curriculum-bonus
  `);

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     3. STAGGERED CARD ANIMATIONS
  ────────────────────────────────────────── */
  const staggerGroups = [
    '.cards-grid .card',
    '.modules-grid .module-card',
    '.testimonials-grid .testimonial-card',
    '.results-list .result-item',
    '.forwhom-grid .forwhom-item',
    '.package-list .package-item',
  ];

  staggerGroups.forEach(selector => {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 60}ms`;
    });
  });


  /* ──────────────────────────────────────────
     5. SMOOTH CTA SCROLL
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href="#plano"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('plano');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  /* ──────────────────────────────────────────
     6. COUNTDOWN TIMER (Urgency)
  ────────────────────────────────────────── */
  // Show time remaining until midnight
  const urgencyBar = document.getElementById('urgency-bar');

  function getTimeLeft() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);
    const diff = midnight - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  if (urgencyBar) {
    const timerSpan = document.createElement('span');
    timerSpan.style.cssText = `
      background: rgba(255,107,0,0.15);
      border: 1px solid rgba(255,107,0,0.4);
      border-radius: 6px;
      padding: 2px 10px;
      font-weight: 700;
      font-size: 0.8rem;
      color: #FF8C2A;
      font-family: 'Outfit', monospace;
      letter-spacing: 1px;
    `;
    timerSpan.textContent = getTimeLeft();
    urgencyBar.querySelector('.urgency-inner').appendChild(timerSpan);

    setInterval(() => {
      timerSpan.textContent = getTimeLeft();
    }, 1000);
  }

  /* ──────────────────────────────────────────
     7. CTA CLICK TRACKING (placeholder)
  ────────────────────────────────────────── */
  document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Ripple effect
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.25);
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        transform: scale(0);
        animation: ripple-anim 0.6s linear;
        pointer-events: none;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-anim {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ---------------------------------------------------------------------
  // 9. TESTIMONIALS CAROUSEL NAVIGATION
  // ---------------------------------------------------------------------
  const carousel = document.querySelector('.testimonials-carousel');
  const slides = carousel ? carousel.querySelectorAll('.slide') : [];
  const prevBtn = carousel ? carousel.querySelector('.carousel-prev') : null;
  const nextBtn = carousel ? carousel.querySelector('.carousel-next') : null;
  let currentSlide = 0;

  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });
    // Update navigation button disabled state for accessibility
    if (prevBtn) prevBtn.disabled = slides.length === 0;
    if (nextBtn) nextBtn.disabled = slides.length === 0;
  }

  function showSlide(index) {
    if (slides.length === 0) return;
    currentSlide = (index + slides.length) % slides.length; // wrap around
    updateCarousel();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
  }

  // Initialize carousel to first slide
  showSlide(0);

  /* ──────────────────────────────────────────
     8. PRICING CARD ENTRANCE
  ────────────────────────────────────────── */
  const pricingCard = document.getElementById('pricing-card');
  if (pricingCard) {
    const pricingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pricingCard.style.animation = 'pricing-entrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
          pricingObserver.unobserve(pricingCard);
        }
      });
    }, { threshold: 0.3 });

    pricingObserver.observe(pricingCard);

    const pricingStyle = document.createElement('style');
    pricingStyle.textContent = `
      #pricing-card { opacity: 0; transform: scale(0.92) translateY(20px); }
      @keyframes pricing-entrance {
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;
    document.head.appendChild(pricingStyle);
  }

  /* ──────────────────────────────────────────
     9. UTM & QUERY PARAMETERS PASSTHROUGH
  ────────────────────────────────────────── */
  function getStoredOrCurrentParams() {
    const currentParams = new URLSearchParams(window.location.search);
    if (window.location.search && currentParams.toString()) {
      try {
        sessionStorage.setItem('utm_params', currentParams.toString());
        localStorage.setItem('utm_params', currentParams.toString());
      } catch (e) {}
      return currentParams;
    }

    try {
      const stored = sessionStorage.getItem('utm_params') || localStorage.getItem('utm_params');
      if (stored) {
        return new URLSearchParams(stored);
      }
    } catch (e) {}

    return new URLSearchParams();
  }

  function appendUtmsToUrl(urlStr, params) {
    if (!params || !params.toString()) return urlStr;
    try {
      const url = new URL(urlStr, window.location.origin);
      params.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      return url.toString();
    } catch (e) {
      const sep = urlStr.includes('?') ? '&' : '?';
      return urlStr + sep + params.toString();
    }
  }

  function updateAllCheckoutLinks() {
    const params = getStoredOrCurrentParams();
    if (!params.toString()) return;

    const links = document.querySelectorAll('a[href*="ggcheckout.app"], a[href*="checkout"], #cta-basic, #cta-pricing');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        link.href = appendUtmsToUrl(href, params);
      }
    });
  }

  updateAllCheckoutLinks();

  // Intercept click to guarantee parameters are appended dynamically
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && (href.includes('ggcheckout.app') || href.includes('checkout')) && !href.startsWith('#') && !href.startsWith('javascript:')) {
      const params = getStoredOrCurrentParams();
      if (params.toString()) {
        link.href = appendUtmsToUrl(link.href, params);
      }
    }
  }, true);

});


