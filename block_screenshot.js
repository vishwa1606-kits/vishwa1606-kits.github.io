// block_screenshot.js — lightweight screenshot deterrent (no watermark)
(function () {
  // ---- 1. Disable right click ----
  document.addEventListener("contextmenu", (e) => e.preventDefault(), true);

  // ---- 2. Disable keyboard shortcuts for copy/print/devtools ----
  document.addEventListener("keydown", (e) => {
    const ctrl = e.ctrlKey || e.metaKey;
    const blockKeys = ["p", "P", "s", "S", "u", "U", "i", "I", "j", "J", "c", "C"];
    if (ctrl && blockKeys.includes(e.key)) {
      e.preventDefault();
      alert("Action blocked for security reasons.");
    }
    if (e.key === "F12") {
      e.preventDefault();
      alert("Developer tools are disabled on this page.");
    }
    if (e.key === "PrintScreen" || e.keyCode === 44) {
      document.body.style.filter = "blur(20px)";
      setTimeout(() => (document.body.style.filter = "none"), 3000);
      alert("Screenshot blocked.");
    }
  });

  // ---- 3. Blur when page loses focus (switch tab/app) ----
  window.addEventListener("blur", () => {
    document.body.style.filter = "blur(10px) grayscale(0.6)";
  });
  window.addEventListener("focus", () => {
    document.body.style.filter = "none";
  });

  // ---- 4. Disable printing ----
  window.addEventListener("beforeprint", (e) => {
    e.preventDefault();
    alert("Printing disabled for this page.");
    setTimeout(() => window.stop && window.stop(), 10);
  });

  // ---- 5. Optional: block selection ----
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
})();