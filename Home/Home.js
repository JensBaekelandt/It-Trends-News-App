/**
 * Home page UI + Functionaliteit (gecombineerde versie)
 * - States: loading / empty / content  (Home.html?state=loading / empty / content)
 * - Taal toggle (NL/EN)
 * - Thema toggle (dark/light) + icoon
 * - Dynamische feed + filters + bookmarks (localStorage)
 * - Geen wijzigingen in de HTML nodig
 */

// -------------------------------------------------------
// Shared keys used across Home + Bookmarks
// -------------------------------------------------------
const STORAGE_KEYS = {
  language: "preferredLanguage",
  theme: "preferredTheme",
  bookmarks: "savedBookmarks",
  followedTopics: "followedTopics",
};

// -------------------------------------------------------
// Translations (zelfde structuur als BookmarkList, beknopt)
// -------------------------------------------------------
const translations = {
  en: {
    pageTitle: "For You",
    pageSubtitle: "Curated stories based on your interests",

    emptyTitle: "Your feed is empty",
    emptyText:
      "Start your journey by following topics that interest you. We'll build a personalized news feed based on your choices.",
    exploreTopics: "Explore Topics",

    filters: {
      all: "All Stories",
      tech: "Tech",
      sport: "Sport",
      politics: "Politics",
      manage: "+ Manage",
    },

    loadingTitle: "Loading your feed...",
  },

  nl: {
    pageTitle: "Voor jou",
    pageSubtitle: "Geselecteerde verhalen op basis van jouw interesses",

    emptyTitle: "Je feed is leeg",
    emptyText:
      "Begin je reis door onderwerpen te volgen die je interesseren. We bouwen een gepersonaliseerde nieuwsstroom op basis van jouw keuzes.",
    exploreTopics: "Ontdek onderwerpen",

    filters: {
      all: "Alle verhalen",
      tech: "Tech",
      sport: "Sport",
      politics: "Politiek",
      manage: "+ Beheren",
    },

    loadingTitle: "Je feed wordt geladen...",
  },
};

// -------------------------------------------------------
// Utility helpers
// -------------------------------------------------------
function t(key) {
  return translations[state.lang]?.[key] ?? key;
}
function tf(path) {
  // nested translation (like 'filters.all')
  const parts = path.split(".");
  let obj = translations[state.lang];
  for (const p of parts) obj = obj?.[p];
  return obj ?? path;
}
function loadJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

// -------------------------------------------------------
// Feed data (example static items)
// -------------------------------------------------------
let FEED_ITEMS = [
  {
    id: 1,
    category: "tech",
    label: "Innovation",
    title: "Quantum Computing: The Next Frontier",
    excerpt:
      "New breakthroughs in quantum error correction could accelerate deployment...",
    source: "The Verge",
    minutes: 12,
    ago: "2 hours ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCy7zC5jCV2tMFZTdEG6GNphzrfrLZyE1W8dKJfLEuCS-sil-2ULyokq5xNECYbWfBVGHAhGaMbi6VUS64NrAoVsG-tlbEb_lvNf8HSJwq39JkVHLekY38dcxG24c8ROY1VYoONE4Ilgws70df8TlRg6Msh1oX2YwNqpJ9LVKmEKd8X0Mbdi0-DxfwrviV0F8jm4trc40u5UeW9VhPM_o7XyPrYcMPaogdlFaxdRlpmCFc5TqcdDTRocXBAFDegTquzzi85Yazy",
  },
  {
    id: 2,
    category: "politics",
    label: "Climate",
    title: "How 'Sponge Cities' Are Fighting the Flood Crisis",
    excerpt:
      "Architects are turning to nature-based solutions in the world's fastest-growing cities...",
    source: "National Geographic",
    minutes: 8,
    ago: "4 hours ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDO__--jM-fK7zSfsxqasDgoAhwGOU62dZH14ZLPiyR43rXtRdsZF9Cu_SzHugAK8TViV86ttiGcdRot2JiCxeYkkZgng-qbnMUgbEz1aaCR_9NONzJApj1dM2crEVL1e5Xrb0q_m6V7ZFNXRSY105GNVHHecZYuuX2pzYLpoYvXHg0yOEnIg1oGLyy4OD1_A0yHaEM-ljwxCy9sEpdG-lPWaETVjo8PuCNa2c07_Hi1EqZfv5y51GRwdGxD6KRsYTChXjoZQPM",
  },
  {
    id: 3,
    category: "sport",
    label: "Sports",
    title: "The Rivalry That Is Redefining Modern Tennis",
    excerpt:
      "After last night's finals, data shows a widening gap between top players...",
    source: "ESPN Sports",
    minutes: 15,
    ago: "6 hours ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpcHLjk8UZnsvoMFAew0ibDMpNbpjjF__fFrducf_UcZea0pkbKhF2mQRTekDXkCBH9ZNeMWd71hC-DWja2nvwrlFaNvMSr1o_bLed2wN_mm3o03jBMrFEkbDLmi2CmXsF4NgZ0Lfj8SdEaVtcij7_jf3upxFT25fAao5NxdAJdXWGvQoab2UwIX8wJCns6ROgPtVD1EDN6K6Gu9cUt5IgQZ0HFytGKtf_r4b1HCiwsago5Yq6JMbWofVKglIp66VBHHl0YogQ",
  },
];

// -------------------------------------------------------
// State
// -------------------------------------------------------
const state = {
  lang: "en",
  theme: "light",
  filter: "all",
  bookmarks: [],
  followedTopics: [],
};

// -------------------------------------------------------
// Main
// -------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // ---------------- DOM refs ----------------
  const loadingOverlay = document.getElementById("loadingOverlay");
  const emptyStateEl = document.getElementById("emptyState");
  const feedFiltersEl = document.getElementById("feedFilters");
  const feedListEl = document.getElementById("feedList");

  const pageTitleEl = document.querySelector("h1");
  const pageSubtitleEl = document.querySelector("h1 + p");

  // Header knoppen (exact zoals jouw HTML is opgebouwd)
  const langToggleBtn = document.querySelector(
    "header .flex.gap-2 button:first-child"
  );
  const themeToggleBtn = document.querySelector(
    "header .flex.gap-2 button:nth-child(2)"
  );
  const themeIconEl =
    themeToggleBtn?.querySelector("span.material-symbols-outlined") ||
    document.querySelector("header span.material-symbols-outlined");

  // ---------------- UI state helpers (versie1) ----------------
  function showLoading(isLoading) {
    document.body.classList.toggle("is-loading", isLoading);
    if (loadingOverlay) loadingOverlay.classList.toggle("hidden", !isLoading);
  }

  function showEmpty(isEmpty) {
    if (emptyStateEl) emptyStateEl.classList.toggle("hidden", !isEmpty);
    if (feedFiltersEl) feedFiltersEl.classList.toggle("hidden", isEmpty);
    if (feedListEl) feedListEl.classList.toggle("hidden", isEmpty);
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

  // ---------------- Theme ----------------
  function applyTheme() {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(state.theme);

    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
    if (themeIconEl) {
      themeIconEl.textContent =
        state.theme === "dark" ? "dark_mode" : "light_mode";
    }
  }

  // ---------------- Translations ----------------
  function applyTranslations() {
    if (pageTitleEl) pageTitleEl.textContent = t("pageTitle");
    if (pageSubtitleEl) pageSubtitleEl.textContent = t("pageSubtitle");

    if (feedFiltersEl) {
      const filters = feedFiltersEl.querySelectorAll("p");
      if (filters[0]) filters[0].textContent = tf("filters.all");
      if (filters[1]) filters[1].textContent = tf("filters.tech");
      if (filters[2]) filters[2].textContent = tf("filters.sport");
      if (filters[3]) filters[3].textContent = tf("filters.politics");
      if (filters[4]) filters[4].textContent = tf("filters.manage");
    }

    if (emptyStateEl) {
      const h2 = emptyStateEl.querySelector("h2");
      const p = emptyStateEl.querySelector("p");
      const a = emptyStateEl.querySelector("a");

      if (h2) h2.textContent = t("emptyTitle");
      if (p) p.textContent = t("emptyText");
      if (a) {
        // icon behouden, alleen tekst updaten
        const icon = a.querySelector(".material-symbols-outlined");
        if (icon) {
          // zorg voor tekstnode na icon
          const existingTextNode = Array.from(a.childNodes).find(
            (n) => n.nodeType === Node.TEXT_NODE
          );
          if (existingTextNode) {
            existingTextNode.textContent = " " + t("exploreTopics");
          } else {
            a.appendChild(document.createTextNode(" " + t("exploreTopics")));
          }
        } else {
          a.textContent = t("exploreTopics");
        }
      }
    }

    document.documentElement.lang = state.lang;
  }

  // ---------------- Feed render ----------------
  function renderFeed() {
    if (!feedListEl) return;
    feedListEl.innerHTML = "";

    let items =
      state.filter === "all"
        ? FEED_ITEMS
        : FEED_ITEMS.filter((x) => x.category === state.filter);

    // Empty UI al geregeld door setView('empty'), maar als je op filters klikt kan hij leeg worden
    if (items.length === 0) {
      showEmpty(true);
      return;
    } else {
      showEmpty(false);
    }

    items.forEach((item) => {
      const isSaved = state.bookmarks.includes(item.id);

      const card = document.createElement("div");
      card.className =
        "group bg-white dark:bg-[#1a242f] rounded-xl overflow-hidden shadow-sm border border-[#e5e7eb] dark:border-[#283039] flex flex-col sm:flex-row h-auto sm:h-48 cursor-pointer hover:border-primary transition-all";

      card.innerHTML = `
        <div class="w-full sm:w-64 h-48 sm:h-full bg-center bg-cover shrink-0"
             style='background-image:url("${item.image}")'></div>

        <div class="flex flex-col justify-between p-5 grow">
          <div>
            <div class="flex justify-between items-start mb-2">
              <span class="text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded">${item.label}</span>

              <button class="bookmark-btn text-[#9dabb9] hover:text-primary" data-id="${item.id}">
                <span class="material-symbols-outlined text-xl">
                  ${isSaved ? "bookmark_added" : "bookmark"}
                </span>
              </button>
            </div>

            <h3 class="text-lg font-bold leading-snug text-[#111418] dark:text-white group-hover:text-primary transition-colors">
              ${item.title}
            </h3>

            <p class="text-sm text-[#4b5563] dark:text-[#9dabb9] line-clamp-2 mt-2">
              ${item.excerpt}
            </p>
          </div>

          <div class="flex items-center gap-2 mt-4 text-xs text-[#9dabb9]">
            <span class="font-bold text-[#111418] dark:text-white">${item.source}</span>
            <span>•</span>
            <span>${item.minutes} min read</span>
            <span>•</span>
            <span>${item.ago}</span>
          </div>
        </div>
      `;

      // bookmark toggle
      card
        .querySelector(".bookmark-btn")
        ?.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleBookmark(item.id);
        });

      feedListEl.appendChild(card);
    });
  }

  // ---------------- Bookmark toggle ----------------
  function toggleBookmark(id) {
    const idx = state.bookmarks.indexOf(id);
    if (idx >= 0) state.bookmarks.splice(idx, 1);
    else state.bookmarks.push(id);

    localStorage.setItem(
      STORAGE_KEYS.bookmarks,
      JSON.stringify(state.bookmarks)
    );

    renderFeed();
  }

  // ---------------- Filters ----------------
  function setupFilters() {
    if (!feedFiltersEl) return;
    const filterCards = feedFiltersEl.querySelectorAll("div");

    filterCards.forEach((card, index) => {
      const options = ["all", "tech", "sport", "politics", "manage"];
      const filterName = options[index];

      card.addEventListener("click", () => {
        if (filterName === "manage") {
          window.location.href = "../Explore/Explore.html";
          return;
        }
        state.filter = filterName;
        renderFeed();
      });
    });
  }

  // ---------------- Events ----------------
  function setupEvents() {
    // Taal toggle (eerste button)
    langToggleBtn?.addEventListener("click", () => {
      state.lang = state.lang === "en" ? "nl" : "en";
      localStorage.setItem(STORAGE_KEYS.language, state.lang);
      applyTranslations();
      renderFeed();
    });

    // Thema toggle (tweede button)
    themeToggleBtn?.addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      applyTheme();
    });
  }

  // ---------------- Init ----------------
  // load persisted
  state.lang = localStorage.getItem(STORAGE_KEYS.language) || "en";
  state.theme = localStorage.getItem(STORAGE_KEYS.theme) || "light";
  state.bookmarks = loadJSON(STORAGE_KEYS.bookmarks, []);
  state.followedTopics = loadJSON(STORAGE_KEYS.followedTopics, []);

  // apply current prefs
  applyTheme();
  applyTranslations();
  setupFilters();
  setupEvents();

  // --- State machine (versie1) ---
  const params = new URLSearchParams(window.location.search);
  const forcedState = (params.get("state") || "").toLowerCase();

  if (["loading", "empty", "content"].includes(forcedState)) {
    setView(forcedState);
    if (forcedState === "content") {
      renderFeed();
    }
  } else {
    // Default behavior: skeleton → content
    setView("loading");
    window.setTimeout(() => {
      setView("content");
      renderFeed();
    }, 900);
  }
});