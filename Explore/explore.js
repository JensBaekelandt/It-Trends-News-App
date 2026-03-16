// Explore page UI states (loading + empty)
// Test: Explore.html?state=loading

document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.getElementById("loadingOverlay");
  const emptyState = document.getElementById("emptyState");
  const exploreContent = document.getElementById("exploreContent");

  const params = new URLSearchParams(window.location.search);
  const forcedState = (params.get("state") || "").toLowerCase();

  function showLoading(isLoading) {
    document.body.classList.toggle("is-loading", isLoading);
    if (loadingOverlay) loadingOverlay.classList.toggle("hidden", !isLoading);
  }

  function showEmpty(isEmpty) {
    if (emptyState) emptyState.classList.toggle("hidden", !isEmpty);
    if (exploreContent) exploreContent.classList.toggle("hidden", isEmpty);
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

  setView("loading");
  window.setTimeout(() => setView("content"), 800);
});