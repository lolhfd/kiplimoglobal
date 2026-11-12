/*!
 * uiCookies:Virb — vanilla JS (Bootstrap 5)
 * Replaces jQuery + flexslider + owl + waypoints + magnific + stellar.
 */
(function () {
  'use strict';

  /* ----------------------------------------
     Page loader
  ----------------------------------------*/
  function initLoader() {
    var loader = document.querySelector('.probootstrap-loader');
    if (!loader) return;
    var hide = function () {
      loader.style.transition = 'opacity .6s ease';
      loader.style.opacity = '0';
      setTimeout(function () { loader.style.display = 'none'; }, 600);
    };
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide);
  }

  /* ----------------------------------------
     Mobile burger menu
  ----------------------------------------*/
  function initMobileMenu() {
    var burgers = document.querySelectorAll('.probootstrap-burger-menu');
    var nav = document.querySelector('.probootstrap-nav');
    if (!burgers.length) return;

    var setBurgers = function (add) {
      burgers.forEach(function (b) { b.classList.toggle('active', add); });
    };

    var setMode = function () {
      if (window.innerWidth < 768) {
        document.body.classList.add('probootstrap-mobile-menu-active');
      } else {
        document.body.classList.remove('probootstrap-mobile-menu-active');
        document.body.classList.remove('show');
        setBurgers(false);
      }
    };
    setMode();
    window.addEventListener('resize', setMode);

    burgers.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var open = document.body.classList.toggle('show');
        setBurgers(open);
      });
    });

    // Close when clicking outside the nav / burger
    document.addEventListener('click', function (e) {
      if (!document.body.classList.contains('show')) return;
      if (nav && nav.contains(e.target)) return;
      var onBurger = false;
      burgers.forEach(function (b) { if (b.contains(e.target)) onBurger = true; });
      if (onBurger) return;
      document.body.classList.remove('show');
      setBurgers(false);
    });
  }

  /* ----------------------------------------
     Back-to-top button
  ----------------------------------------*/
  function initGoToTop() {
    var wrap = document.querySelector('.js-top');
    var link = document.querySelector('.js-gotop');
    if (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    if (wrap) {
      var onScroll = function () {
        wrap.classList.toggle('active', window.pageYOffset > 200);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ----------------------------------------
     Scroll reveal (replaces waypoints)
  ----------------------------------------*/
  function initReveal() {
    var els = document.querySelectorAll('.probootstrap-animate');
    if (!els.length) return;

    var effectClass = function (el) {
      switch (el.getAttribute('data-animate-effect')) {
        case 'fadeInLeft': return 'fadeInLeft';
        case 'fadeInRight': return 'fadeInRight';
        case 'fadeIn': return 'fadeIn';
        default: return 'fadeInUp';
      }
    };

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('probootstrap-animated'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add(effectClass(el), 'probootstrap-animated');
        obs.unobserve(el);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------
     Init
  ----------------------------------------*/
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initLoader();
    initMobileMenu();
    initGoToTop();
    initReveal();
  });

})();
