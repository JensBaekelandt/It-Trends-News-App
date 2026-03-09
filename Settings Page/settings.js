// Settings page UI states (loading + empty)
// Test:
//   Settings.html?state=loading
//   Settings.html?state=empty
//   Settings.html?state=content

document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("pageContent");
  const settingsContent = document.getElementById("settingsContent");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const emptyState = document.getElementById("emptyState");

  const params = new URLSearchParams(window.location.search);
  const forcedState = (params.get("state") || "").toLowerCase();

  function showLoading(isLoading) {
    document.body.classList.toggle("is-loading", isLoading);
    if (loadingOverlay) loadingOverlay.classList.toggle("hidden", !isLoading);
  }

  function showEmpty(isEmpty) {
    if (emptyState) emptyState.classList.toggle("hidden", !isEmpty);
    if (pageContent) pageContent.classList.toggle("hidden", isEmpty);
    if (settingsContent) settingsContent.classList.toggle("hidden", isEmpty);
  }

  function setView(view) {
    if (view === "loading") {
      showEmpty(false);
      showLoading(true);
      return;
    }
    showLoading(false);
    showEmpty(view === "empty");
  }

  if (["loading", "empty", "content"].includes(forcedState)) {
    setView(forcedState);
    return;
  }

  // default: short loading -> content
  setView("loading");
  window.setTimeout(() => setView("content"), 700);
});