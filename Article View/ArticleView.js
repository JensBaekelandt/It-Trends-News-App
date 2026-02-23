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