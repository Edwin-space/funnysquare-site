/* 퍼니스퀘어 회사 사이트 — 공통 동작
   메뉴 · 스크롤 상태 · 리빌 · 카운트업 · 문의 폼 */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---------- mobile sheet ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var sheet = document.getElementById("sheet");
  function setMenu(open) {
    sheet.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  menuBtn.addEventListener("click", function () {
    setMenu(!sheet.classList.contains("is-open"));
  });
  sheet.addEventListener("click", function (e) {
    if (e.target.tagName === "A" || e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- nav state + progress ---------- */
  var nav = document.getElementById("nav");
  var prog = document.getElementById("prog");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle("is-stuck", y > 12);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- active section in nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('#navLinks a[href^="#"]'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && targets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- count-up stats ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function format(n, fmt) {
    return fmt === "comma" ? n.toLocaleString("ko-KR") : String(n);
  }
  var nums = document.querySelectorAll(".num");
  function run(el) {
    var to = parseFloat(el.dataset.to);
    var fmt = el.dataset.fmt;
    if (reduce) { el.textContent = format(to, fmt); return; }
    var dur = 1300, t0 = null;
    function tick(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(to * e), fmt);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window && nums.length) {
    var ns = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); ns.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(nums, function (el) { ns.observe(el); });
  } else {
    Array.prototype.forEach.call(nums, function (el) { el.textContent = format(parseFloat(el.dataset.to), el.dataset.fmt); });
  }

  /* ---------- 문의 폼 ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var statusEl = document.getElementById("cf-status");
    var submitBtn = document.getElementById("cf-submit");
    var doneEl = document.getElementById("cf-done");
    var consentWrap = document.getElementById("cf-consent-wrap");
    var FALLBACK_MAIL = form.getAttribute("data-fallback-mail") || "contact@funny-square.com";

    function setStatus(msg, kind) {
      statusEl.textContent = msg || "";
      statusEl.className = "form__status" + (msg ? " is-on " + (kind || "") : "");
    }
    function fieldOf(el) { return el.closest("[data-field]"); }
    function mark(el, invalid) {
      var f = fieldOf(el) || (el.id === "cf-consent" ? consentWrap : null);
      if (f) f.classList.toggle("is-invalid", !!invalid);
    }
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

    function validate() {
      var bad = [];
      var name = form.name_ = document.getElementById("cf-name");
      var email = document.getElementById("cf-email");
      var type = document.getElementById("cf-type");
      var msg = document.getElementById("cf-message");
      var consent = document.getElementById("cf-consent");

      var checks = [
        [name, name.value.trim().length > 0],
        [email, validEmail(email.value.trim())],
        [type, type.value !== ""],
        [msg, msg.value.trim().length >= 10],
        [consent, consent.checked]
      ];
      checks.forEach(function (c) {
        mark(c[0], !c[1]);
        if (!c[1]) bad.push(c[0]);
      });
      return bad;
    }

    form.addEventListener("input", function (e) {
      if (e.target.matches("input,select,textarea")) mark(e.target, false);
    });
    form.addEventListener("change", function (e) {
      if (e.target.id === "cf-consent") mark(e.target, false);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      /* 허니팟: 봇이 채우면 조용히 종료 */
      if (document.getElementById("cf-website").value) {
        form.style.display = "none";
        doneEl.classList.add("is-on");
        return;
      }

      var bad = validate();
      if (bad.length) {
        setStatus("입력하지 않은 항목이 있습니다.", "bad");
        bad[0].focus();
        return;
      }

      var data = {
        name: document.getElementById("cf-name").value.trim(),
        email: document.getElementById("cf-email").value.trim(),
        organization: document.getElementById("cf-org").value.trim(),
        type: document.getElementById("cf-type").value,
        message: document.getElementById("cf-message").value.trim(),
        consent: true,
        website: document.getElementById("cf-website").value,
        submittedAt: new Date().toISOString(),
        page: location.href
      };

      var endpoint = (form.getAttribute("data-endpoint") || "").trim();

      /* 엔드포인트 미설정: 메일 클라이언트로 폴백해 문의가 유실되지 않게 한다 */
      if (!endpoint) {
        var body = [
          "이름: " + data.name,
          "이메일: " + data.email,
          "회사 · 소속: " + (data.organization || "-"),
          "문의 유형: " + data.type,
          "",
          data.message
        ].join("\n");
        location.href = "mailto:" + FALLBACK_MAIL +
          "?subject=" + encodeURIComponent("[문의] " + data.type + " — " + data.name) +
          "&body=" + encodeURIComponent(body);
        setStatus("메일 앱이 열립니다. 열리지 않으면 " + FALLBACK_MAIL + " 으로 보내주세요.", "ok");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.classList.add("is-sending");
      submitBtn.querySelector(".label").textContent = "보내는 중";
      setStatus("문의를 전송하고 있습니다…", "");

      /* Content-Type을 text/plain으로 보내는 이유:
         application/json은 CORS preflight(OPTIONS)를 유발하는데 Google Apps Script
         웹 앱은 OPTIONS를 처리하지 못해 요청이 차단된다. text/plain은 simple request라
         preflight 없이 통과하며, 서버에서는 그대로 JSON.parse 하면 된다. */
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json().catch(function () { return { ok: true }; });
      }).then(function (out) {
        if (out && out.ok === false) throw new Error(out.error || "rejected");
        form.style.display = "none";
        doneEl.classList.add("is-on");
        doneEl.scrollIntoView({ block: "center", behavior: "smooth" });
      }).catch(function () {
        setStatus("전송에 실패했습니다. 잠시 후 다시 시도하시거나 " + FALLBACK_MAIL + " 으로 보내주세요.", "bad");
      }).then(function () {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-sending");
        submitBtn.querySelector(".label").textContent = "문의 보내기";
      });
    });
  }

  /* ---------- year ---------- */
  document.getElementById("yr").textContent = new Date().getFullYear();
})();
