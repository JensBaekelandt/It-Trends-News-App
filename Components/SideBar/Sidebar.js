(function() {
  const container = document.getElementById('sidebarContainer');
  if (!container) return;

  container.innerHTML = `
  <aside class="w-64 flex flex-col h-[calc(100vh-64px)] sticky top-16 p-4 gap-2 border-r border-[#d1d5db] dark:border-[#283039] bg-white dark:bg-background-dark ml-[-32px]">
    <nav class="flex flex-col gap-1">
      <a href="../Home/Home.html" class="sidebar-link"><span class="material-symbols-outlined">home</span> Home</a>
      <a href="../Explore/Explore.html" class="sidebar-link"><span class="material-symbols-outlined">explore</span> Explore</a>
      <a href="../Bookmark List/BookmarkList.html" class="sidebar-link"><span class="material-symbols-outlined">bookmark</span> Bookmarks</a>
      <a href="../Settings Page/Settings.html" class="sidebar-link"><span class="material-symbols-outlined">settings</span> Settings</a>
    </nav>
  </aside>
`;

  // Optioneel: markeer actieve pagina
  const links = container.querySelectorAll('a.sidebar-link');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
})();