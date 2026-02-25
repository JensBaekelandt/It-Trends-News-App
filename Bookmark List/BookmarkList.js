const STORAGE_KEYS = {
  language: "preferredLanguage", // "en" or "nl"
  theme: "preferredTheme"        // "light" or "dark"
};

const translations = {
  en: {
    navFeed: "Feed",
    navExplore: "Explore",
    navBookmarks: "Bookmarks",
    navSettings: "Settings",

    premiumPlan: "Premium Plan",
    premiumText: "Unlock unlimited storage and offline reading mode.",
    upgrade: "Upgrade",

    pageTitle: "Saved Bookmarks",
    pageSubtitle: "Manage your curated list of saved articles and resources.",
    sortBy: "Sort by",

    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    sortAZ: "Alphabetical (A-Z)",

    previous: "Previous",
    nextPage: "Next Page",

    showingText: "Showing {from}-{to} of {total} saved articles",
    savedLabel: "Saved {time}",
    readLabel: "{min} min read",

    deleteAria: "Remove bookmark"
  },
  nl: {
    navFeed: "Feed",
    navExplore: "Verkennen",
    navBookmarks: "Bladwijzers",
    navSettings: "Instellingen",

    premiumPlan: "Premium Plan",
    premiumText: "Ontgrendel onbeperkte opslag en offline leesmodus.",
    upgrade: "Upgrade",

    pageTitle: "Opgeslagen bladwijzers",
    pageSubtitle: "Beheer je lijst met opgeslagen artikelen en bronnen.",
    sortBy: "Sorteren op",

    sortNewest: "Nieuwste eerst",
    sortOldest: "Oudste eerst",
    sortAZ: "Alfabetisch (A-Z)",

    previous: "Vorige",
    nextPage: "Volgende pagina",

    showingText: "Toont {from}-{to} van {total} opgeslagen artikelen",
    savedLabel: "Opgeslagen {time}",
    readLabel: "{min} min leestijd",

    deleteAria: "Bladwijzer verwijderen"
  }
};

let bookmarks = [
  {
    id: 12,
    category: "TECHNOLOGY",
    categoryStyle: "tech",
    source: "TechCrunch",
    title: "The Future of Generative AI in Professional Web Development Workflow",
    savedAgo: "2 hours ago",
    readMinutes: 5,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/12"
  },
  {
    id: 11,
    category: "FINANCE",
    categoryStyle: "finance",
    source: "Bloomberg",
    title: "Global Markets React to New Sustainable Energy Regulations",
    savedAgo: "6 hours ago",
    readMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/11"
  },
  {
    id: 10,
    category: "LIFESTYLE",
    categoryStyle: "lifestyle",
    source: "NY Times",
    title: "10 Healthiest Superfoods to Add to Your Daily Diet in 2024",
    savedAgo: "yesterday",
    readMinutes: 12,
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/10"
  },
  {
    id: 9,
    category: "SCIENCE",
    categoryStyle: "science",
    source: "NASA News",
    title: "James Webb Telescope Discovers Atmospheric Water Vapor on Distant Exoplanet",
    savedAgo: "3 days ago",
    readMinutes: 4,
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/9"
  },

  {
    id: 8,
    category: "TECHNOLOGY",
    categoryStyle: "tech",
    source: "The Verge",
    title: "Quantum Computing: The Next Frontier in Global Security",
    savedAgo: "5 days ago",
    readMinutes: 10,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/8"
  },
  {
    id: 7,
    category: "FINANCE",
    categoryStyle: "finance",
    source: "Reuters",
    title: "Central banks signal policy shifts as inflation expectations cool",
    savedAgo: "1 week ago",
    readMinutes: 6,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/7"
  },
  {
    id: 6,
    category: "LIFESTYLE",
    categoryStyle: "lifestyle",
    source: "Guardian",
    title: "Healthy habits that actually stick: a practical weekly routine guide",
    savedAgo: "1 week ago",
    readMinutes: 7,
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/6"
  },
  {
    id: 5,
    category: "SCIENCE",
    categoryStyle: "science",
    source: "Nature",
    title: "A new method improves error correction for large-scale quantum systems",
    savedAgo: "2 weeks ago",
    readMinutes: 9,
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/5"
  },

  {
    id: 4,
    category: "TECHNOLOGY",
    categoryStyle: "tech",
    source: "Wired",
    title: "Inside the next wave of AI tools for software developers",
    savedAgo: "3 weeks ago",
    readMinutes: 6,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/4"
  },
  {
    id: 3,
    category: "FINANCE",
    categoryStyle: "finance",
    source: "FT",
    title: "Energy rules reshape long-term investment priorities across Europe",
    savedAgo: "3 weeks ago",
    readMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/3"
  },
  {
    id: 2,
    category: "LIFESTYLE",
    categoryStyle: "lifestyle",
    source: "NY Times",
    title: "How to build a balanced weekly meal plan without overcomplicating it",
    savedAgo: "1 month ago",
    readMinutes: 11,
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/2"
  },
  {
    id: 1,
    category: "SCIENCE",
    categoryStyle: "science",
    source: "ESA",
    title: "New observations reveal details about distant galaxies and dust clouds",
    savedAgo: "1 month ago",
    readMinutes: 5,
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=1200&auto=format&fit=crop",
    url: "https://example.com/bookmark/1"
  }
];

const state = {
  lang: "en",
  theme: "light",
  sort: "newest",
  page: 1,
  perPage: 4
};

// DOM
const htmlEl = document.documentElement;
const bookmarksContainer = document.getElementById("bookmarksContainer");
const showingTextEl = document.getElementById("showingText");
const sortSelectEl = document.getElementById("sortSelect");
const prevBtnEl = document.getElementById("prevBtn");
const nextBtnEl = document.getElementById("nextBtn");
const langToggleBtn = document.getElementById("langToggleBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIconEl = document.getElementById("themeIcon");

// labels
const navFeedLabel = document.getElementById("navFeedLabel");
const navExploreLabel = document.getElementById("navExploreLabel");
const navBookmarksLabel = document.getElementById("navBookmarksLabel");
const navSettingsLabel = document.getElementById("navSettingsLabel");
const proPlanTitle = document.getElementById("proPlanTitle");
const proPlanText = document.getElementById("proPlanText");
const upgradeBtn = document.getElementById("upgradeBtn");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const sortByLabel = document.getElementById("sortByLabel");

// ---------- Helpers ----------
function t(key) {
  return translations[state.lang][key] || key;
}

function format(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCategoryClasses(categoryStyle) {
  switch (categoryStyle) {
    case "tech":
      return "text-primary bg-primary/10";
    case "finance":
      return "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/20";
    case "lifestyle":
      return "text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-500/20";
    case "science":
      return "text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-500/20";
    default:
      return "text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-500/20";
  }
}

function getSortedBookmarks() {
  const items = [...bookmarks];

  if (state.sort === "newest") {
    items.sort((a, b) => b.id - a.id);
  } else if (state.sort === "oldest") {
    items.sort((a, b) => a.id - b.id);
  } else if (state.sort === "az") {
    items.sort((a, b) => a.title.localeCompare(b.title));
  }

  return items;
}

// ---------- Theme ----------
function applyTheme() {
  htmlEl.classList.remove("light", "dark");
  htmlEl.classList.add(state.theme);
  localStorage.setItem(STORAGE_KEYS.theme, state.theme);

  themeIconEl.textContent = state.theme === "dark" ? "dark_mode" : "light_mode";
}

// ---------- Language ----------
function applyTranslations() {
  navFeedLabel.textContent = t("navFeed");
  navExploreLabel.textContent = t("navExplore");
  navBookmarksLabel.textContent = t("navBookmarks");
  navSettingsLabel.textContent = t("navSettings");

  proPlanTitle.textContent = t("premiumPlan");
  proPlanText.textContent = t("premiumText");
  upgradeBtn.textContent = t("upgrade");

  pageTitle.textContent = t("pageTitle");
  pageSubtitle.textContent = t("pageSubtitle");
  sortByLabel.textContent = t("sortBy");

  // sort select labels
  sortSelectEl.options[0].text = t("sortNewest");
  sortSelectEl.options[1].text = t("sortOldest");
  sortSelectEl.options[2].text = t("sortAZ");

  prevBtnEl.textContent = t("previous");
  nextBtnEl.textContent = t("nextPage");

  // html lang
  htmlEl.lang = state.lang;
}

// ---------- Rendering ----------
function renderBookmarks() {
  const allItems = getSortedBookmarks();
  const total = allItems.length;

  const totalPages = Math.max(1, Math.ceil(total / state.perPage));
  if (state.page > totalPages) state.page = totalPages;

  const startIndex = (state.page - 1) * state.perPage;
  const visibleItems = allItems.slice(startIndex, startIndex + state.perPage);

  bookmarksContainer.innerHTML = "";

  visibleItems.forEach(item => {
    const savedText = format(t("savedLabel"), { time: item.savedAgo });
    const readText = format(t("readLabel"), { min: item.readMinutes });
    const categoryClasses = getCategoryClasses(item.categoryStyle);

    const card = document.createElement("article");
    card.className = "bookmark-card group bg-white dark:bg-[#1a242f] rounded-xl border border-[#e5e7eb] dark:border-[#283039] p-3 sm:p-4 flex items-center gap-4 transition-all duration-200 cursor-pointer";
    card.tabIndex = 0;

    card.innerHTML = `
      <div class="w-[146px] h-[92px] rounded-lg overflow-hidden shrink-0 border border-[#e5e7eb] dark:border-[#283039]">
        <img src="${escapeHtml(item.imageUrl)}" alt="" class="w-full h-full object-cover" />
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-2">
              <span class="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${categoryClasses}">
                ${escapeHtml(item.category)}
              </span>
              <span class="text-xs text-[#9dabb9] font-semibold">• ${escapeHtml(item.source)}</span>
            </div>

            <h3 class="text-[17px] leading-snug font-bold text-[#111418] dark:text-white line-clamp-2">
              ${escapeHtml(item.title)}
            </h3>

            <div class="flex items-center gap-4 mt-3 text-xs text-[#94a3b8] dark:text-[#9dabb9]">
              <span class="inline-flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base !leading-none">calendar_today</span>
                <span>${escapeHtml(savedText)}</span>
              </span>
              <span class="inline-flex items-center gap-1.5">
                <span class="material-symbols-outlined text-base !leading-none">schedule</span>
                <span>${escapeHtml(readText)}</span>
              </span>
            </div>
          </div>

          <button class="delete-btn shrink-0 inline-flex items-center justify-center size-10 rounded-lg bg-[#f8fafc] dark:bg-[#283039] text-[#94a3b8] hover:text-red-500 transition-colors"
                  aria-label="${escapeHtml(t("deleteAria"))}"
                  title="${escapeHtml(t("deleteAria"))}">
            <span class="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>
    `;

    // open article on card click (except delete button)
    const openArticle = () => {
      window.open(item.url, "_blank", "noopener,noreferrer");
    };

    card.addEventListener("click", (e) => {
      if (e.target.closest(".delete-btn")) return;
      openArticle();
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") openArticle();
    });

    // delete bookmark
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      bookmarks = bookmarks.filter(b => b.id !== item.id);

      const newTotalPages = Math.max(1, Math.ceil(bookmarks.length / state.perPage));
      if (state.page > newTotalPages) state.page = newTotalPages;

      render();
    });

    bookmarksContainer.appendChild(card);
  });

  // footer showing text
  const from = total === 0 ? 0 : startIndex + 1;
  const to = Math.min(total, startIndex + visibleItems.length);

  showingTextEl.textContent = format(t("showingText"), {
    from,
    to,
    total
  });

  // pager state
  prevBtnEl.disabled = state.page <= 1;
  nextBtnEl.disabled = state.page >= totalPages;
}

// ---------- Main render ----------
function render() {
  applyTranslations();
  renderBookmarks();
}

// ---------- Events ----------
function setupEvents() {
  sortSelectEl.addEventListener("change", (e) => {
    state.sort = e.target.value;
    state.page = 1;
    render();
  });

  prevBtnEl.addEventListener("click", () => {
    if (state.page > 1) {
      state.page -= 1;
      render();
    }
  });

  nextBtnEl.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(bookmarks.length / state.perPage));
    if (state.page < totalPages) {
      state.page += 1;
      render();
    }
  });

  langToggleBtn.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "nl" : "en";
    localStorage.setItem(STORAGE_KEYS.language, state.lang);
    render();
  });

  themeToggleBtn.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme();
  });
}

// ---------- Init ----------
function init() {
  const savedLang = localStorage.getItem(STORAGE_KEYS.language);
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

  if (savedLang) {
    const normalized = savedLang.toLowerCase();
    if (normalized === "en" || normalized === "nl") {
      state.lang = normalized;
    }
  }

  if (savedTheme === "light" || savedTheme === "dark") {
    state.theme = savedTheme;
  }

  sortSelectEl.value = state.sort;
  applyTheme();
  setupEvents();
  render();
}

document.addEventListener("DOMContentLoaded", init);