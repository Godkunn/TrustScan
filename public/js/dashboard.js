document.addEventListener("DOMContentLoaded", () => {
  // Dashboard Core Elements
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("drawer-backdrop");
  const openSidebarBtn = document.getElementById("open-sidebar");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const copyBtn = document.querySelector('[data-action="copy-api-key"]');
  const apiKeyString = document.getElementById("active-api-key-string");
  const recentScanFeed = document.getElementById("recent-scan-feed");
  const emptyState = document.getElementById("scan-history-empty");

  // Mobile Sidebar Handlers
  const openSidebar = () => {
    if (!sidebar || !backdrop) return;
    sidebar.classList.add("sidebar-open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    if (!sidebar || !backdrop) return;
    sidebar.classList.remove("sidebar-open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (openSidebarBtn) openSidebarBtn.addEventListener("click", openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", closeSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  // API Key Clipboard Logic
  if (copyBtn && apiKeyString) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(apiKeyString.textContent.trim());
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.style.color = "#10b981"; // Emerald green on success
        
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.style.color = ""; // Revert to CSS default
        }, 2000);
      } catch (err) {
        console.error("TrustScan clipboard error:", err);
      }
    });
  }

  // Dynamic Scan History (Mock Data Pipeline)
  const mockScans = [
    { id: "SCAN-9021", type: "Image", status: "Fake", score: "98%", time: "2 mins ago", pill: "red" },
    { id: "SCAN-9020", type: "Video", status: "Authentic", score: "12%", time: "1 hour ago", pill: "green" },
    { id: "SCAN-9019", type: "Receipt", status: "Tampered", score: "85%", time: "3 hours ago", pill: "amber" },
    { id: "SCAN-9018", type: "ID Card", status: "Authentic", score: "04%", time: "5 hours ago", pill: "blue" }
  ];

  // Map theme colors dynamically
  const pillStyle = (pill) => {
    switch (pill) {
      case "green": return "background:#ecfdf5; color:#047857; border:1px solid #a7f3d0;";
      case "red": return "background:#fff1f2; color:#be123c; border:1px solid #fecdd3;";
      case "amber": return "background:#fffbeb; color:#b45309; border:1px solid #fde68a;";
      case "blue": default: return "background:#eff6ff; color:#0369a1; border:1px solid #bae6fd;";
    }
  };

  // Inject Data into DOM
  if (recentScanFeed && emptyState) {
    emptyState.remove(); // Clear empty state gracefully

    mockScans.forEach((scan) => {
      const row = document.createElement("div");
      row.className = "scan-row";
      row.innerHTML = `
        <div class="scan-left">
          <div class="scan-score" style="${pillStyle(scan.pill)}">${scan.score}</div>
          <div class="scan-meta">
            <strong style="display:flex; align-items:center;">
              ${scan.id} 
              <span style="margin-left:8px; font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; color:#64748b; background:#f8fafc; border:1px solid #e2e8f0; border-radius:999px; padding:3px 8px;">
                ${scan.type}
              </span>
            </strong>
            <span style="font-size:0.8rem; color:#64748b; margin-top:2px;">${scan.time}</span>
          </div>
        </div>
        <div class="scan-state" style="${pillStyle(scan.pill)}">${scan.status}</div>
      `;
      recentScanFeed.appendChild(row);
    });
  }
});