(function () {
  var STORAGE_KEY = 'brm-lang';
  var DEFAULT_LANG = 'bg';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    var opposite = lang === 'bg' ? 'en' : 'bg';

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      if (el.dataset.lang === lang) {
        el.classList.add('lang-active');
      } else {
        el.classList.remove('lang-active');
      }
    });

    document.querySelectorAll('[data-bg], [data-en]').forEach(function (el) {
      if (el.dataset.lang) return;
      var text = lang === 'bg' ? el.dataset.bg : el.dataset.en;
      if (text !== undefined) {
        el.textContent = text;
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.textContent = opposite.toUpperCase();
      btn.setAttribute('aria-label', 'Switch to ' + (opposite === 'bg' ? 'Bulgarian' : 'English'));
    });

    document.documentElement.lang = lang;
  }

  function toggleLang() {
    var current = getLang();
    setLang(current === 'bg' ? 'en' : 'bg');
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', toggleLang);
    });

    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', open);
      });
    }
  });
})();
