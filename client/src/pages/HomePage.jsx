import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../state/AppContext';
import { api } from '../services/api';

const FOLLOWED_TOPICS_KEY = 'followedExploreTopics';

const CATEGORY_MAP = {
  tech: ['TECHNOLOGY'],
  sport: ['LIFESTYLE'],
  politics: ['SCIENCE', 'FINANCE'],
};

const TOPIC_CATEGORY_MAP = {
  technology: ['TECHNOLOGY'],
  cybersecurity: ['TECHNOLOGY', 'SCIENCE'],
  startups: ['FINANCE', 'TECHNOLOGY'],
};

function readFollowedTopics() {
  try {
    const raw = localStorage.getItem(FOLLOWED_TOPICS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function HomePage() {
  const { language } = useAppContext();
  const [searchParams] = useSearchParams();

  const [feed, setFeed] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [followedTopics, setFollowedTopics] = useState(() => readFollowedTopics());

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedBookmarks')) || [];
    } catch {
      return [];
    }
  });

  const topicFilterParam = String(searchParams.get('topic') || '').toLowerCase();
  const followedCategories = useMemo(() => {
    return followedTopics.flatMap((topicId) => {
      if (topicId === 't1') return TOPIC_CATEGORY_MAP.technology;
      if (topicId === 't2') return TOPIC_CATEGORY_MAP.cybersecurity;
      if (topicId === 't3') return TOPIC_CATEGORY_MAP.startups;
      return [];
    });
  }, [followedTopics]);

  const topicFilterCategories = TOPIC_CATEGORY_MAP[topicFilterParam] || [];

  const toggleBookmark = (id) => {
    setSaved((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('savedBookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    api.getBookmarks().then((data) => {
      setFeed(data.items || []);
      setLoading(false);
    });

    const syncFollowedTopics = () => setFollowedTopics(readFollowedTopics());
    window.addEventListener('storage', syncFollowedTopics);

    return () => {
      window.removeEventListener('storage', syncFollowedTopics);
    };
  }, []);

  const filtered = useMemo(() => {
    let items = [...feed];

    if (topicFilterCategories.length > 0) {
      items = items.filter((item) => topicFilterCategories.includes(item.category));
    } else if (filter !== 'all') {
      items = items.filter((item) => CATEGORY_MAP[filter]?.includes(item.category));
    }

    if (filter === 'all' && topicFilterCategories.length === 0 && followedCategories.length > 0) {
      items.sort((a, b) => {
        const aPreferred = followedCategories.includes(a.category) ? 1 : 0;
        const bPreferred = followedCategories.includes(b.category) ? 1 : 0;
        return bPreferred - aPreferred;
      });
    }

    return items;
  }, [feed, filter, followedCategories, topicFilterCategories]);

  const TEXT = {
    en: {
      title: topicFilterParam ? 'Topic Stories' : 'For You',
      subtitle: topicFilterParam
        ? 'Showing stories related to the selected topic.'
        : followedTopics.length > 0
          ? 'Curated stories with priority for your followed topics'
          : 'Curated stories based on your interests',
      filters: {
        all: 'All Stories',
        tech: 'Tech',
        sport: 'Sport',
        politics: 'Politics',
        manage: '+ Manage',
      },
      open: 'Open',
      trending: 'Trending',
      personalizedTitle: 'Personalized feed',
      personalizedText: 'Follow topics in Explore to tune what appears on your Home timeline.',
      followedText: `You are following ${followedTopics.length} topic${followedTopics.length === 1 ? '' : 's'}. Explore is now influencing the story order here.`,
      exploreTopics: 'Explore topics',
      clearTopicFilter: 'Clear topic filter',
    },
    nl: {
      title: topicFilterParam ? 'Verhalen per onderwerp' : 'Voor jou',
      subtitle: topicFilterParam
        ? 'Toont verhalen die passen bij het gekozen onderwerp.'
        : followedTopics.length > 0
          ? 'Geselecteerde verhalen met voorrang voor je gevolgde onderwerpen'
          : 'Geselecteerde verhalen op basis van jouw interesses',
      filters: {
        all: 'Alle verhalen',
        tech: 'Tech',
        sport: 'Sport',
        politics: 'Politiek',
        manage: '+ Beheren',
      },
      open: 'Open',
      trending: 'Trending',
      personalizedTitle: 'Gepersonaliseerde feed',
      personalizedText: 'Volg onderwerpen in Verkennen om je Home-tijdlijn af te stemmen.',
      followedText: `Je volgt ${followedTopics.length} onderwerp${followedTopics.length === 1 ? '' : 'en'}. Verkennen beïnvloedt nu de volgorde van de verhalen hier.`,
      exploreTopics: 'Onderwerpen verkennen',
      clearTopicFilter: 'Onderwerpfilter wissen',
    },
  }[language];

  return (
    <section className="page-panel">
      <div className="explore-layout">
        <div>
          <header className="page-head">
            <h1>{TEXT.title}</h1>
            <p>{TEXT.subtitle}</p>
          </header>

          <div className="filter-row">
            {['all', 'tech', 'sport', 'politics', 'manage'].map((key) => {
              const active = key === filter;

              if (key === 'manage') {
                return (
                  <button
                    key={key}
                    className="tiny-btn"
                    style={{ borderStyle: 'dashed' }}
                    onClick={() => (window.location.href = '/explore')}
                  >
                    {TEXT.filters.manage}
                  </button>
                );
              }

              return (
                <button
                  key={key}
                  className={`tiny-btn ${active && topicFilterCategories.length === 0 ? 'filter-btn-active' : ''}`}
                  onClick={() => setFilter(key)}
                >
                  {TEXT.filters[key]}
                </button>
              );
            })}

            {topicFilterParam ? (
              <Link className="tiny-btn" to="/home">
                {TEXT.clearTopicFilter}
              </Link>
            ) : null}
          </div>

          {loading && <div className="loading-box">Loading…</div>}

          {!loading &&
            filtered.map((item) => (
              <article key={item.id} className="card" style={{ marginTop: 20 }}>
                <div
                  style={{
                    height: 220,
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    marginBottom: 10,
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <span className="meta-chip">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>

                <div className="bookmark-submeta">
                  <span>{item.source}</span>
                  <span>•</span>
                  <span>{item.readMinutes} min read</span>
                  <span>•</span>
                  <span>{item.savedAgo}</span>
                </div>

                <div className="bookmark-actions" style={{ marginTop: 12 }}>
                  <button
                    className="tiny-btn"
                    style={{
                      padding: 6,
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => toggleBookmark(item.id)}
                  >
                    {saved.includes(item.id) ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#137fec">
                        <path d="M17 3H7a2 2 0 00-2 2v16l7-5 7 5V5a2 2 0 00-2-2z" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    )}
                  </button>

                  <Link className="button" to={`/article/${item.id}`}>
                    {TEXT.open}
                  </Link>
                </div>
              </article>
            ))}
        </div>

        <aside className="trends-rail home-sidebar">
          <h3>{TEXT.trending}</h3>

          <div className="trend-list">
            <article className="trend-item">
              <p className="trend-tag">Economy</p>
              <h4>Global market shifts as central banks announce new rates</h4>
              <p className="trend-meta">14.2k readers currently</p>
            </article>

            <article className="trend-item">
              <p className="trend-tag">Space</p>
              <h4>Mars rover discovers unexpected crystal formations</h4>
              <p className="trend-meta">8.5k readers currently</p>
            </article>

            <article className="trend-item">
              <p className="trend-tag">Health</p>
              <h4>New study links forest bathing to lower cortisol levels</h4>
              <p className="trend-meta">5.1k readers currently</p>
            </article>
          </div>

          <div className="personalized-card">
            <h4>{TEXT.personalizedTitle}</h4>
            <p>{followedTopics.length > 0 ? TEXT.followedText : TEXT.personalizedText}</p>
            <Link className="button" to="/explore" style={{ marginTop: 10, width: '100%', textAlign: 'center' }}>
              {TEXT.exploreTopics}
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
