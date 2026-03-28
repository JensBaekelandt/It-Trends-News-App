import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { bookmarkNlOverrides, bookmarksCopy, getLanguageCopy } from '../localization/copy';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

const categoryClassByName = {
  TECHNOLOGY: 'cat-tech',
  FINANCE: 'cat-finance',
  LIFESTYLE: 'cat-lifestyle',
  SCIENCE: 'cat-science',
};

const FALLBACK_IMAGE_BY_ID = {
  12: 'https://picsum.photos/id/180/600/380',
  11: 'https://picsum.photos/id/1011/600/380',
  10: 'https://picsum.photos/id/292/600/380',
  9: 'https://picsum.photos/id/1015/600/380',
  8: 'https://picsum.photos/id/1005/600/380',
  7: 'https://picsum.photos/id/1060/600/380',
};


function readHomeBookmarks(userId) {
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
// function readHomeBookmarkIds(userId) {
//   try {
//     const raw = localStorage.getItem(getBookmarkIdsKey(userId));
//     const parsed = raw ? JSON.parse(raw) : [];
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     return [];
//   }
// }
// function removeHomeBookmarkById(id) {
//   const idNumber = Number(id);
//   const ids = readHomeBookmarkIds();
//   const nextIds = ids.filter((itemId) => itemId !== idNumber && itemId !== id);
//   window.localStorage.setItem(HOME_BOOKMARK_IDS_KEY, JSON.stringify(nextIds));

//   const items = readHomeBookmarks();
//   const next = items.filter((item) => item.id !== id);
//   window.localStorage.setItem(HOME_BOOKMARKS_KEY, JSON.stringify(next));
// }

function getSortValue(item) {
  if (Number.isFinite(item.savedAt)) {
    return item.savedAt;
  }
  if (Number.isFinite(item.id)) {
    return item.id;
  }
  return 0;
}

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

  const override = bookmarkNlOverrides[item.id];
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
  const { user, language } = useAppContext();
  const text = getLanguageCopy(bookmarksCopy, language);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const perPage = 4;
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   const forcedState = (searchParams.get('state') || '').toLowerCase();

  //   if (forcedState === 'loading') {
  //     setLoading(true);
  //     setBookmarks([]);
  //     return;
  //   }

  //   api.getBookmarks(user.id).then((data) => {
  //     if (!user) return;
  //     const homeBookmarkIds = new Set(readHomeBookmarkIds(user.id));
  //     const apiFromHome = data.items.filter((item) => homeBookmarkIds.has(item.id));
  //     const homeBookmarks = readHomeBookmarks();
  //     const merged = [...homeBookmarks, ...apiFromHome];

  //     if (forcedState === 'empty') {
  //       setBookmarks([]);
  //     } else {
  //       setBookmarks(merged);
  //     }
  //     setLoading(false);
  //   });
  // }, [searchParams]);
    useEffect(() => {
    const forcedState = (searchParams.get('state') || '').toLowerCase();

    if (forcedState === 'loading') {
      setLoading(true);
      setBookmarks([]);
      return;
    }

    if (!user) return;

    api.getBookmarks(user.id).then((data) => {
      if (forcedState === 'empty') {
        setBookmarks([]);
      } else {
        setBookmarks(data.items || []);
      }
      setLoading(false);
    });
  }, [searchParams, user]);

  const normalizedBookmarks = bookmarks
    .map(withFallbackBookmark)
    .map((item) => withLanguageBookmark(item, language));

  const sorted = [...normalizedBookmarks].sort((a, b) => {
    if (sortBy === 'oldest') return getSortValue(a) - getSortValue(b);
    if (sortBy === 'az') return a.title.localeCompare(b.title);
    return getSortValue(b) - getSortValue(a);
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
              {item.externalUrl ? (
                <a className="button" href={item.externalUrl}>{text.open}</a>
              ) : (
                <Link className="button" to={`/article/${item.id}`}>{text.open}</Link>
              )}
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
