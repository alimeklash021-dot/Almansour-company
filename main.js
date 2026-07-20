(function () {
  "use strict";

  /* ---------- Loader ---------- */
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (loader) {
      setTimeout(function () { loader.classList.add("loaded"); }, 300);
    }
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky navbar ---------- */
  var nav = document.getElementById("mainNav");
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");

    var backBtn = document.getElementById("backToTop");
    if (backBtn) {
      if (window.scrollY > 600) backBtn.classList.add("visible");
      else backBtn.classList.remove("visible");
    }
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    menu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Arabic-Indic digit conversion ---------- */
  var arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  var toArabicNumber = function (num) {
    return String(num).replace(/[0-9]/g, function (d) { return arabicDigits[d]; });
  };

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll(".stat-num, .achv-num");
  var animateCounter = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1600;
    var start = null;

    var step = function (ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = toArabicNumber(value) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = toArabicNumber(target) + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  if (counters.length && "IntersectionObserver" in window) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { counterIO.observe(el); });
  }

  /* ---------- Contact form (front-end only, opens the visitor's email client) ---------- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cf-name").value.trim();
      var phone = document.getElementById("cf-phone").value.trim();
      var subject = document.getElementById("cf-subject").value.trim();
      var message = document.getElementById("cf-message").value.trim();

      if (!name || !phone || !subject || !message) return;

      var body =
        "الاسم: " + name + "\n" +
        "رقم الهاتف: " + phone + "\n\n" +
        message;

      var mailto =
        "mailto:Almansourforcontracting@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  /* ---------- Button ripple ---------- */
  document.querySelectorAll(".btn-ripple").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      var size = Math.max(rect.width, rect.height);
      ripple.className = "ripple-el";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);
    });
  });
})();
