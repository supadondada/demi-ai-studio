/* ============================================
   DEMI AI STUDIO — 共通スクリプト
   例文プロンプトのワンクリックコピー機能
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  var COPY_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="9" y="9" width="12" height="12" rx="2"/>' +
    '<path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
  var CHECK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M20 6 9 17l-5-5"/></svg>';

  // 「悪い例」ボックス以外のプロンプトボックスにコピーボタンを付ける
  var boxes = document.querySelectorAll(".prompt-box:not(.bad)");

  boxes.forEach(function (box) {
    var code = box.querySelector("code, pre");
    if (!code) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.innerHTML = COPY_ICON + "<span>コピー</span>";
    btn.setAttribute("aria-label", "この例文をクリップボードにコピー");

    btn.addEventListener("click", function () {
      copyText(code.textContent.trim(), function (ok) {
        if (ok) {
          btn.classList.add("copied");
          btn.innerHTML = CHECK_ICON + "<span>コピーしました</span>";
          setTimeout(function () {
            btn.classList.remove("copied");
            btn.innerHTML = COPY_ICON + "<span>コピー</span>";
          }, 2000);
        }
      });
    });

    box.appendChild(btn);
  });

  function copyText(text, done) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { fallbackCopy(text, done); }
      );
    } else {
      fallbackCopy(text, done);
    }
  }

  // 古い環境・file://閲覧用のフォールバック
  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    done(ok);
  }
});
