//this lets you hide the toolbar
let toolbarHidden = false;

function toggleToolbar() {
  const toolbar = document.getElementById("floatingToolbar");

  if (!toolbarHidden) {
    toolbar.style.bottom = "-60px"; // duwt hem tegen onderrand
    toolbarHidden = true;
  } else {
    toolbar.style.bottom = "32px"; // originele bottom-8 (8 = 2rem = 32px)
    toolbarHidden = false;
  }
}

// UI states: loading + empty
document.addEventListener("DOMContentLoaded", () => {
  const pageContent = document.getElementById("pageContent");
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

  // Default: short loading -> content
  setView("loading");
  window.setTimeout(() => setView("content"), 700);
});