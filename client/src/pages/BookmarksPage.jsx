import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

const COPY = {
  en: {
    loading: 'Loading bookmarks...',
    emptyTitle: 'No bookmarks yet',
    emptyBody: 'Save articles to read later. Your bookmarks will appear here.',
    title: 'Saved Bookmarks',
    subtitle: 'Manage your curated list of saved articles and resources.',
    sortBy: 'Sort by',
    newest: 'Newest First',
    oldest: 'Oldest First',
    az: 'Alphabetical (A-Z)',
    open: 'Open article',
    delete: 'Delete',
    previous: 'Previous',
    next: 'Next Page',
    showing: (from, to, total) => `Showing ${from}-${to} of ${total} saved articles`,
    savedLabel: (time) => `Saved ${time}`,
    readLabel: (minutes) => `${minutes} min read`,
  },
  nl: {
    loading: 'Bladwijzers laden...',
    emptyTitle: 'Nog geen bladwijzers',
    emptyBody: 'Sla artikels op om later te lezen. Je bladwijzers verschijnen hier.',
    title: 'Opgeslagen bladwijzers',
    subtitle: 'Beheer je lijst met opgeslagen artikelen en bronnen.',
    sortBy: 'Sorteren op',
    newest: 'Nieuwste eerst',
    oldest: 'Oudste eerst',
    az: 'Alfabetisch (A-Z)',
    open: 'Artikel openen',
    delete: 'Verwijderen',
    previous: 'Vorige',
    next: 'Volgende pagina',
    showing: (from, to, total) => `Toont ${from}-${to} van ${total} opgeslagen artikelen`,
    savedLabel: (time) => `Opgeslagen ${time}`,
    readLabel: (minutes) => `${minutes} min leestijd`,
  },
};

const categoryClassByName = {
  TECHNOLOGY: 'cat-tech',
  FINANCE: 'cat-finance',
  LIFESTYLE: 'cat-lifestyle',
  SCIENCE: 'cat-science',
};

const BOOKMARK_NL_OVERRIDES = {
  12: {
    category: 'TECHNOLOGIE',
    source: 'TechCrunch',
    title: 'EU AI Act: wat verandert er voor productteams',
    summary: 'Een praktisch overzicht van de compliance-impact voor softwareteams.',
  },
  11: {
    category: 'FINANCIËN',
    source: 'Bloomberg',
    title: 'Hoe edge AI mainstream toepassingen binnenkomt',
    summary: 'On-device modellen worden praktischer voor moderne producten.',
  },
  10: {
    category: 'LIFESTYLE',
    source: 'NY Times',
    title: '10 gezondste superfoods om toe te voegen in 2024',
    summary: 'Een praktische lijst met voedzame keuzes voor elke dag.',
  },
  9: {
    category: 'WETENSCHAP',
    source: 'NASA Nieuws',
    title: 'Telescoop detecteert waterdamp op verre exoplaneet',
    summary: 'Nieuwe metingen verbeteren het inzicht in exoplaneetklimaten.',
  },
  8: {
    category: 'TECHNOLOGIE',
    source: 'The Verge',
    title: 'Quantum computing en de volgende veiligheidsgrens',
    summary: 'Waarom quantumbeleid nu een board-level onderwerp is.',
  },
  7: {
    category: 'FINANCIËN',
    source: 'Reuters',
    title: 'Centrale banken sturen op nieuwe beleidswijzigingen',
    summary: 'Markten reageren op nieuwe richtlijnen en renteverwachtingen.',
  },
};

const FALLBACK_IMAGE_BY_ID = {
  12: 'https://picsum.photos/id/180/600/380',
  11: 'https://picsum.photos/id/1011/600/380',
  10: 'https://picsum.photos/id/292/600/380',
  9: 'https://picsum.photos/id/1015/600/380',
  8: 'https://picsum.photos/id/1005/600/380',
  7: 'https://picsum.photos/id/1060/600/380',
};

function withFallbackBookmark(item) {
  const fallbackImage = FALLBACK_IMAGE_BY_ID[item.id] || 'https://picsum.photos/seed/newsroom/600/380';
  return {
    ...item,
    imageUrl: item.imageUrl || fallbackImage,
    savedAgo: item.savedAgo || 'recently',
    readMinutes: Number.isFinite(item.readMinutes) ? item.readMinutes : 5,
  };
}

function withLanguageBookmark(item, language) {
  if (language !== 'nl') {
    return item;
  }

  const override = BOOKMARK_NL_OVERRIDES[item.id];
  if (!override) {
    return item;
  }

  return {
    ...item,
    category: override.category,
    source: override.source,
    title: override.title,
    summary: override.summary,
  };
}

export default function BookmarksPage() {
  const { language } = useAppContext();
  const text = COPY[language] || COPY.en;
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const perPage = 4;
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const forcedState = (searchParams.get('state') || '').toLowerCase();

    if (forcedState === 'loading') {
      setLoading(true);
      setBookmarks([]);
      return;
    }

    api.getBookmarks().then((data) => {
      if (forcedState === 'empty') {
        setBookmarks([]);
      } else {
        setBookmarks(data.items);
      }
      setLoading(false);
    });
  }, [searchParams]);

  const normalizedBookmarks = bookmarks
    .map(withFallbackBookmark)
    .map((item) => withLanguageBookmark(item, language));

  const sorted = [...normalizedBookmarks].sort((a, b) => {
    if (sortBy === 'oldest') return a.id - b.id;
    if (sortBy === 'az') return a.title.localeCompare(b.title);
    return b.id - a.id;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const start = (page - 1) * perPage;
  const visibleItems = sorted.slice(start, start + perPage);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return <section className="page-panel"><div className="loading-box">{text.loading}</div></section>;
  }

  if (!bookmarks.length) {
    return (
      <section className="page-panel">
        <div className="empty-box">
          <h2>{text.emptyTitle}</h2>
          <p>{text.emptyBody}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-panel">
      <header className="page-head split-head">
        <h1>{text.title}</h1>
        <p>{text.subtitle}</p>

        <div className="sort-block">
          <label htmlFor="sortSelect">{text.sortBy}</label>
          <select id="sortSelect" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="newest">{text.newest}</option>
            <option value="oldest">{text.oldest}</option>
            <option value="az">{text.az}</option>
          </select>
        </div>
      </header>

      <div className="bookmark-list">
        {visibleItems.map((item) => (
          <article className="bookmark-row" key={item.id}>
            <div className="bookmark-thumb-wrap">
                  <img
                    className="bookmark-thumb"
                    src={item.imageUrl}
                    alt={item.title}
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_IMAGE_BY_ID[item.id] || 'https://picsum.photos/seed/newsroom/600/380';
                    }}
                  />
            </div>

            <div className="bookmark-main">
              <div className="bookmark-meta-line">
                <span className={`bookmark-category ${categoryClassByName[item.category] || ''}`}>{item.category}</span>
                <span className="bookmark-source">• {item.source}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.summary}</p>

              <div className="bookmark-submeta">
                <span>{text.savedLabel(item.savedAgo)}</span>
                <span>{text.readLabel(item.readMinutes)}</span>
              </div>
            </div>

            <div className="bookmark-actions">
              <Link className="button" to={`/article/${item.id}`}>{text.open}</Link>
              <button className="tiny-btn" type="button" onClick={() => removeBookmark(item.id)}>{text.delete}</button>
            </div>
          </article>
        ))}
      </div>

      <footer className="pager-row">
        <p>{text.showing(start + 1, Math.min(start + visibleItems.length, sorted.length), sorted.length)}</p>
        <div>
          <button className="tiny-btn" type="button" disabled={page <= 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>{text.previous}</button>
          <button className="button" type="button" disabled={page >= totalPages} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>{text.next}</button>
        </div>
      </footer>
    </section>
  );
}
