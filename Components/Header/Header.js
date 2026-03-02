document.addEventListener("DOMContentLoaded", () => {

    const headerHTML = `
<header class="sticky top-0 z-50 flex items-center justify-between border-b border-[#d1d5db] dark:border-[#283039] bg-white dark:bg-background-dark px-6 py-3">

  <div class="flex items-center gap-10">
    <a href="index.html" class="flex items-center gap-3 text-primary">
      <div class="size-8">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.578 8.578C5.528 11.628 3.451 15.514 2.609 19.745C1.768 23.976 2.2 28.361 3.851 32.346C5.501 36.331 8.297 39.738 11.883 42.134C15.47 44.531 19.687 45.81 24 45.81C28.314 45.81 32.53 44.531 36.117 42.134C39.703 39.738 42.499 36.331 44.149 32.346C45.8 28.361 46.232 23.976 45.391 19.745C44.549 15.515 42.472 11.628 39.422 8.578L24 24L8.578 8.578Z" fill="currentColor"/>
        </svg>
      </div>
      <h2 class="text-xl font-bold tracking-tight text-[#111418] dark:text-white">
        NewsRoom
      </h2>
    </a>

    <nav class="hidden md:flex items-center gap-2">
      <a href="index.html" class="nav-link px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#283039] transition-colors">Home</a>
      <a href="explore.html" class="nav-link px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#283039] transition-colors">Explore</a>
      <a href="bookmarks.html" class="nav-link px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#283039] transition-colors">Bookmarks</a>
      <a href="settings.html" class="nav-link px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#283039] transition-colors">Settings</a>
    </nav>
  </div>

  <div class="flex items-center gap-4">
    <button class="hidden sm:flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-xs font-bold tracking-wider">
      NL / EN
    </button>

    <button id="themeToggle"
      class="flex size-10 items-center justify-center rounded-lg bg-white dark:bg-[#283039] border border-[#d1d5db] dark:border-none text-[#111418] dark:text-white">
      <span class="material-symbols-outlined">light_mode</span>
    </button>

    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#d1d5db] dark:border-[#283039]"
      style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpbqFAAwgpFzD0LJvqvh9kI9zpNqUIXZ7gRebZBbPLvQtGJsjY6__m7M4W_pnSMXEOZwWpU93jxIZ_DzrqrGvuAillA9S43dyQabxBbXdDroBfWHJ4ex7UzuvZKeyjtr9ju9tuyoHJzgjUmi70cHUFtsWye_6xkUENkK6-d-lI4uzi1XBPZUPVV4Qif0DkUloDEW1KveFrMXdKmHNsMo04Xklhny5wgvxnAPmNUS9Sn3bR6B3NjX6jmCxY2u95I1tcHqr5p9zv");'>
    </div>
  </div>

</header>
    `;

    // Injecteer header bovenaan de pagina
    document.documentElement.insertAdjacentHTML("afterbegin", headerHTML);

    // Active nav
    const links = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname;

    links.forEach(link => {
        if (currentPath.includes(link.getAttribute("href"))) {
            link.classList.add("active-nav");
        }
    });

    // Theme toggle
    const toggle = document.getElementById("themeToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark");
        });
    }
});
