// ===========================
// Nexus — script.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────
  // Sticky nav shadow on scroll
  // ──────────────────────────
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });


  // ──────────────────────────
  // Mobile burger menu
  // ──────────────────────────
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
    }
  });


  // ──────────────────────────
  // Scroll reveal
  // ──────────────────────────
  const revealTargets = [
    '.feature-card',
    '.tcard',
    '.section-label',
    '.section-title',
    '.section-sub',
    '.logos-row',
    '.cta__title',
    '.cta__sub',
    '.cta__form',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger children in a grid
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60 * (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  // Add stagger delays to grid children
  document.querySelectorAll('.features__grid .feature-card').forEach((el, i) => {
    el.dataset.delay = i;
  });
  document.querySelectorAll('.testimonials__grid .tcard').forEach((el, i) => {
    el.dataset.delay = i;
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  // ──────────────────────────
  // CTA form submission
  // ──────────────────────────
  const ctaBtn = document.getElementById('ctaBtn');
  const emailInput = document.getElementById('emailInput');
  const successMsg = document.getElementById('successMsg');

  ctaBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();

    if (!email || !isValidEmail(email)) {
      shakeInput(emailInput);
      return;
    }

    // Simulate submission
    ctaBtn.textContent = 'Sending...';
    ctaBtn.disabled = true;

    setTimeout(() => {
      emailInput.style.display = 'none';
      ctaBtn.style.display = 'none';
      successMsg.style.display = 'block';
    }, 900);
  });

  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') ctaBtn.click();
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeInput(el) {
    el.style.borderColor = '#e8564a';
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.35s ease';

    setTimeout(() => {
      el.style.borderColor = '';
    }, 1200);
  }

  // inject shake keyframe dynamically
  const styleSheet = document.styleSheets[0];
  try {
    styleSheet.insertRule(`
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%       { transform: translateX(-6px); }
        40%       { transform: translateX(6px); }
        60%       { transform: translateX(-4px); }
        80%       { transform: translateX(4px); }
      }
    `, styleSheet.cssRules.length);
  } catch(e) {
    // already exists or blocked, no problem
  }


  // ──────────────────────────
  // Smooth scroll for anchor links
  // ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ──────────────────────────
  // Animated bar chart in hero mock
  // ──────────────────────────
  const bars = document.querySelectorAll('.mock-chart .bar');
  const barHeights = ['40%', '65%', '50%', '80%', '60%', '95%'];

  function animateBars() {
    bars.forEach((bar, i) => {
      const randomH = Math.floor(Math.random() * 60) + 30;
      bar.style.height = randomH + '%';
    });
    // Keep the last one active always
    bars[bars.length - 1].style.height = '95%';
  }

  setInterval(animateBars, 2800);

});
