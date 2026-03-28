import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { exploreCopy, getLanguageCopy } from '../localization/copy';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

const topicImages = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=900&auto=format&fit=crop',
];

const FOLLOWED_TOPICS_KEY = 'followedExploreTopics';
const TOPIC_PREVIEW_COUNT = 2;

function readFollowedTopics() {
  try {
    const raw = window.localStorage.getItem(FOLLOWED_TOPICS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ExplorePage() {
  const { language } = useAppContext();
  const [topics, setTopics] = useState([]);
  const [sources, setSources] = useState([]);
  const [liveTrends, setLiveTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [followedTopicIds, setFollowedTopicIds] = useState(() => readFollowedTopics());
  const [searchParams] = useSearchParams();
  const text = getLanguageCopy(exploreCopy, language);

  const localizedTopics = useMemo(
    () => topics.map((topic) => {
      const key = String(topic.name || '').toLowerCase();
      const translated = text.topicMap[key];
      return {
        ...topic,
        name: translated?.name || topic.name,
        description: translated?.description || topic.description,
      };
    }),
    [topics, text]
  );

  const query = searchTerm.trim().toLowerCase();
  const filteredTopics = localizedTopics.filter((topic) => `${topic.name} ${topic.description}`.toLowerCase().includes(query));
  const filteredSources = sources.filter((source) => `${source.name} ${source.description}`.toLowerCase().includes(query));
  const filteredTrends = liveTrends.filter((trend) => `${trend.tag} ${trend.title} ${trend.meta}`.toLowerCase().includes(query));
  const hasNoMatches = query.length > 0 && filteredTopics.length === 0 && filteredSources.length === 0 && filteredTrends.length === 0;
  const shouldShowTopicToggle = query.length === 0 && filteredTopics.length > TOPIC_PREVIEW_COUNT;
  const visibleTopics = shouldShowTopicToggle && !showAllTopics
    ? filteredTopics.slice(0, TOPIC_PREVIEW_COUNT)
    : filteredTopics;

  useEffect(() => {
    const forcedState = (searchParams.get('state') || '').toLowerCase();

    if (forcedState === 'loading') {
      setLoading(true);
      setTopics([]);
      setSources([]);
      setLiveTrends([]);
      return;
    }

    api.getExplore().then((data) => {
      if (forcedState === 'empty') {
        setTopics([]);
        setSources([]);
        setLiveTrends([]);
      } else {
        setTopics(data.topics || []);
        setSources(data.sources || text.sources || []);
        setLiveTrends(data.liveTrends || text.liveTrendsData || []);
      }
      setLoading(false);
    });
  }, [searchParams, text.liveTrendsData, text.sources]);

  const handleToggleFollow = (topicId) => {
    setFollowedTopicIds((prev) => {
      const next = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];

      window.localStorage.setItem(FOLLOWED_TOPICS_KEY, JSON.stringify(next));
      return next;
    });
  };

  if (loading) {
    return <section className="page-panel"><div className="loading-box">{text.loading}</div></section>;
  }

  if (!topics.length && !sources.length && !liveTrends.length) {
    return (
      <section className="page-panel">
        <div className="empty-box">
          <h2>{text.noResults}</h2>
          <p>{text.noResultsBody}</p>
        </div>
      </section>
    );
  }

  if (hasNoMatches) {
    return (
      <section className="page-panel">
        <header className="page-head">
          <h1>{text.heading}</h1>
          <p>{text.subtitle}</p>
        </header>

        <div className="search-box search-box-row">
          <input
            type="text"
            className="search-input"
            placeholder={text.searchPlaceholder}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button type="button" className="tiny-btn" onClick={() => setSearchTerm('')}>{text.clearSearch}</button>
        </div>

        <div className="empty-box">
          <h2>{text.noResults}</h2>
          <p>{text.noResultsBody}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-panel">
      <div className="explore-layout">
        <div>
          <header className="page-head">
            <h1>{text.heading}</h1>
            <p>{text.subtitle}</p>
          </header>
          <div className="search-box search-box-row">
            <input
              type="text"
              className="search-input"
              placeholder={text.searchPlaceholder}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm ? (
              <button type="button" className="tiny-btn" onClick={() => setSearchTerm('')}>{text.clearSearch}</button>
            ) : null}
          </div>

          <div className="section-head">
            <h2>{text.trending}</h2>
            {shouldShowTopicToggle ? (
              <button
                className="link-btn"
                type="button"
                onClick={() => setShowAllTopics((prev) => !prev)}
              >
                {showAllTopics ? text.showLess : text.viewAll}
              </button>
            ) : null}
          </div>

          <div className={`card-grid topics-grid ${visibleTopics.length === 1 ? 'single-topic-grid' : ''}`}>
            {visibleTopics.map((topic, index) => {
              const isFollowing = followedTopicIds.includes(topic.id);

              return (
                <article className="card topic-card" key={topic.id}>
                  <div className="topic-image-wrap">
                    <img
                      className="topic-image"
                      src={topicImages[index % topicImages.length]}
                      alt={topic.name}
                    />
                  </div>
                  <h3>{topic.name}</h3>
                  <p>{topic.description}</p>
                  <p className="trend-meta" style={{ marginTop: 6 }}>
                    {text.topicArticleCount(topic.articleCount || 0)}
                  </p>

                  <div className="bookmark-actions" style={{ marginTop: 'auto', flexWrap: 'wrap' }}>
                    <button
                      className={isFollowing ? 'button secondary' : 'button'}
                      type="button"
                      aria-pressed={isFollowing}
                      onClick={() => handleToggleFollow(topic.id)}
                    >
                      {isFollowing ? text.following : text.follow}
                    </button>
                    {topic.latestArticleId ? (
                      <Link className="tiny-btn" to={`/home?topic=${encodeURIComponent(topic.name)}`}>
                        {text.viewStories}
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="section-head section-top-gap">
            <h2>{text.trustedSources}</h2>
            <span className="verified-pill">{text.verified}</span>
          </div>
          <div className="source-grid">
            {filteredSources.map((source) => (
              <article className="source-card" key={source.name}>
                <h4>{source.name}</h4>
                <p>{source.description}</p>
                <div className="bookmark-actions" style={{ marginTop: 12, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <span className="trend-meta">{text.sourceArticleCount(source.articleCount || 0)}</span>
                  {source.latestArticleId ? (
                    <Link className="tiny-btn" to={`/article/${source.latestArticleId}`}>
                      {text.latestStory}
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="trends-rail">
          <h3>{text.liveTrends}</h3>
          <div className="trend-list">
            {filteredTrends.map((item) => {
              const content = (
                <>
                  <p className="trend-tag">{item.tag}</p>
                  <h4>{item.title}</h4>
                  <p className="trend-meta">{item.meta}</p>
                </>
              );

              return item.articleId ? (
                <Link
                  key={item.id || item.title}
                  to={`/article/${item.articleId}`}
                  className="trend-item"
                  style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
                >
                  {content}
                </Link>
              ) : (
                <article className="trend-item" key={item.id || item.title}>
                  {content}
                </article>
              );
            })}
          </div>

          <div className="personalized-card">
            <h4>{text.personalizedTitle}</h4>
            <p>
              {followedTopicIds.length > 0
                ? text.personalizedWithTopics(followedTopicIds.length)
                : text.personalizedText}
            </p>
            <Link className="button" to="/home" style={{ marginTop: 12, width: '100%', textAlign: 'center' }}>
              {text.goToHome}
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}