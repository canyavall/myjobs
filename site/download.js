// Fills the download table from the signed release manifest. Until the first release the
// manifest 404s and the page keeps its "coming soon" text and links to the releases page.
(function () {
  var MANIFEST = "https://raw.githubusercontent.com/canyavall/myjobs/main/manifest/latest.json";
  var LABEL = {
    "windows-x64": "Windows", "darwin-arm64": "macOS (Apple silicon)",
    "darwin-x64": "macOS (Intel)", "linux-x64": "Linux",
  };

  // Apple silicon vs Intel cannot be told from a browser reliably: default to arm64, the
  // table lists both. Phones and tablets get no guess.
  function detect() {
    var ua = navigator.userAgent.toLowerCase();
    var p = ((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "").toLowerCase();
    if (/android|iphone|ipad/.test(ua)) return null;
    if (p.indexOf("win") === 0) return "windows-x64";
    if (p.indexOf("mac") === 0) return "darwin-arm64";
    if (p.indexOf("linux") === 0) return "linux-x64";
    return null;
  }

  var mine = detect();
  var main = document.getElementById("dl-main");
  if (mine) {
    main.textContent = "Download for " + LABEL[mine];
    var row = document.querySelector('tr[data-platform="' + mine + '"]');
    if (row) row.classList.add("mine");
  }

  fetch(MANIFEST, { cache: "no-store" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (m) {
      var app = m && m.app;
      if (!app || !app.version || !app.binaries) throw new Error("bad manifest");
      document.getElementById("dl-status").textContent = "Version " + app.version + ". One file, nothing to install.";
      document.querySelectorAll("tr[data-platform]").forEach(function (tr) {
        var b = app.binaries[tr.getAttribute("data-platform")];
        if (!b) return;
        tr.querySelector("a").href = b.url;
        tr.querySelector(".size").textContent = (b.size / 1048576).toFixed(0) + " MB";
        tr.querySelector(".sha").textContent = b.sha256;
      });
      var b = mine && app.binaries[mine];
      if (b) {
        main.href = b.url;
        document.getElementById("dl-main-note").textContent =
          "Version " + app.version + ". Other platforms and checksums are under Download.";
      }
    })
    .catch(function () { /* no release yet, or offline: the static fallback stays */ });
})();
