document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("drawer-backdrop");
  const openSidebarBtn = document.getElementById("open-sidebar");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const copyBtn = document.querySelector('[data-action="copy-api-key"]');
  const apiKeyString = document.getElementById("active-api-key-string");
  const recentScanFeed = document.getElementById("recent-scan-feed");
  const emptyState = document.getElementById("scan-history-empty");

  const openSidebar = () => {
    if (!sidebar || !backdrop) return;
    sidebar.classList.add("sidebar-open");
    backdrop.classList.add("open");
  };

  const closeSidebar = () => {
    if (!sidebar || !backdrop) return;
    sidebar.classList.remove("sidebar-open");
    backdrop.classList.remove("open");
  };

  if (openSidebarBtn) openSidebarBtn.addEventListener("click", openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", closeSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  if (copyBtn && apiKeyString) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(apiKeyString.textContent.trim());
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = original;
        }, 1500);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    });
  }

  const mockScans = [
    { id: "SCAN-9021", type: "Image", status: "Fake", score: "98%", time: "2 mins ago", pill: "red" },
    { id: "SCAN-9020", type: "Video", status: "Authentic", score: "12%", time: "1 hour ago", pill: "green" },
    { id: "SCAN-9019", type: "Receipt", status: "Tampered", score: "85%", time: "3 hours ago", pill: "amber" },
    { id: "SCAN-9018", type: "ID Card", status: "Authentic", score: "04%", time: "5 hours ago", pill: "blue" }
  ];

  const pillStyle = (pill) => {
    if (pill === "green") return "background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;";
    if (pill === "red") return "background:#fff1f2;color:#be123c;border:1px solid #fecdd3;";
    if (pill === "amber") return "background:#fffbeb;color:#b45309;border:1px solid #fde68a;";
    return "background:#eff6ff;color:#0369a1;border:1px solid #bae6fd;";
  };

  if (recentScanFeed && emptyState) {
    emptyState.remove();

    mockScans.forEach((scan) => {
      const row = document.createElement("div");
      row.className = "scan-row";
      row.innerHTML = `
        <div class="scan-left">
          <div class="scan-score" style="${pillStyle(scan.pill)}">${scan.score}</div>
          <div class="scan-meta">
            <strong>${scan.id} <span style="margin-left:8px; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.14em; color:#64748b; background:#fff; border:1px solid #e2e8f0; border-radius:999px; padding:4px 8px;">${scan.type}</span></strong>
            <span>${scan.time}</span>
          </div>
        </div>
        <div class="scan-state" style="${pillStyle(scan.pill)}">${scan.status}</div>
      `;
      recentScanFeed.appendChild(row);
    });
  }
});