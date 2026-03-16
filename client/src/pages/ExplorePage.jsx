import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

const topicImages = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=900&auto=format&fit=crop',
];

const COPY = {
  en: {
    loading: 'Loading explore...',
    noResults: 'No results',
    noResultsBody: 'Try a different search term or clear your filters.',
    clearSearch: 'Clear search',
    heading: 'Explore Topics',
    subtitle: 'Discover new interests and trusted global news sources.',
    searchPlaceholder: 'Search Topics, Tags, or Sources...',
    trending: 'Trending Topics',
    viewAll: 'View All',
    follow: 'Follow',
    trustedSources: 'Trusted Sources',
    verified: 'VERIFIED',
    liveTrends: 'Live Trends',
    personalizedTitle: 'Personalized For You',
    personalizedText: 'We\'ve found 12 new articles matching your interests in Technology and Science.',
    liveTrendsData: [
      { tag: 'GLOBAL • LIVE', title: 'Major tech breakthrough in quantum computing reported.', meta: '12m ago • 4.2k reading' },
      { tag: 'POLITICS', title: 'New economic policy proposed in parliament today.', meta: '45m ago • 1.8k reading' },
      { tag: 'ENTERTAINMENT', title: 'Film festival winners announced for the 2024 season.', meta: '1h ago • 12k reading' },
    ],
    sources: [
      { name: 'TechCrunch', description: 'Startups, AI and product launches.' },
      { name: 'Wired', description: 'Deep dives on innovation and society.' },
      { name: 'Reuters', description: 'Global business and policy updates.' },
    ],
    topicMap: {
      technology: { name: 'Technology', description: 'AI, cloud and product innovation.' },
      cybersecurity: { name: 'Cybersecurity', description: 'Threats, policy and zero-trust updates.' },
      startups: { name: 'Startups', description: 'Funding, scale-ups and market movement.' },
    },
  },
  nl: {
    loading: 'Verkennen laden...',
    noResults: 'Geen resultaten',
    noResultsBody: 'Probeer een andere zoekterm of wis je filters.',
    clearSearch: 'Zoekopdracht wissen',
    heading: 'Onderwerpen Verkennen',
    subtitle: 'Ontdek nieuwe interesses en betrouwbare wereldwijde nieuwsbronnen.',
    searchPlaceholder: 'Zoek onderwerpen, tags of bronnen...',
    trending: 'Trending Onderwerpen',
    viewAll: 'Bekijk Alles',
    follow: 'Volgen',
    trustedSources: 'Betrouwbare Bronnen',
    verified: 'GEVERIFIEERD',
    liveTrends: 'Live Trends',
    personalizedTitle: 'Gepersonaliseerd Voor Jou',
    personalizedText: 'We hebben 12 nieuwe artikelen gevonden op basis van je interesses in Technologie en Wetenschap.',
    liveTrendsData: [
      { tag: 'WERELD • LIVE', title: 'Grote technologische doorbraak in quantum computing gemeld.', meta: '12m geleden • 4.2k lezers' },
      { tag: 'POLITIEK', title: 'Nieuw economisch beleid vandaag voorgesteld in het parlement.', meta: '45m geleden • 1.8k lezers' },
      { tag: 'ENTERTAINMENT', title: 'Winnaars van het filmfestival voor seizoen 2024 bekendgemaakt.', meta: '1u geleden • 12k lezers' },
    ],
    sources: [
      { name: 'TechCrunch', description: 'Startups, AI en productlanceringen.' },
      { name: 'Wired', description: 'Diepgaande analyses over innovatie en maatschappij.' },
      { name: 'Reuters', description: 'Wereldwijde updates over business en beleid.' },
    ],
    topicMap: {
      technology: { name: 'Technologie', description: 'AI, cloud en productinnovatie.' },
      cybersecurity: { name: 'Cybersecurity', description: 'Dreigingen, beleid en zero-trust updates.' },
      startups: { name: 'Startups', description: 'Financiering, scale-ups en marktbeweging.' },
    },
  },
};

export default function ExplorePage() {
  const { language } = useAppContext();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const text = COPY[language] || COPY.en;

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
  const filteredSources = text.sources.filter((source) => `${source.name} ${source.description}`.toLowerCase().includes(query));
  const filteredTrends = text.liveTrendsData.filter((trend) => `${trend.tag} ${trend.title} ${trend.meta}`.toLowerCase().includes(query));
  const hasNoMatches = query.length > 0 && filteredTopics.length === 0 && filteredSources.length === 0 && filteredTrends.length === 0;

  useEffect(() => {
    const forcedState = (searchParams.get('state') || '').toLowerCase();

    if (forcedState === 'loading') {
      setLoading(true);
      setTopics([]);
      return;
    }

    api.getExplore().then((data) => {
      if (forcedState === 'empty') {
        setTopics([]);
      } else {
        setTopics(data.topics);
      }
      setLoading(false);
    });
  }, [searchParams]);

  if (loading) {
    return <section className="page-panel"><div className="loading-box">{text.loading}</div></section>;
  }

  if (!topics.length) {
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
            <button className="link-btn" type="button">{text.viewAll}</button>
          </div>

          <div className={`card-grid topics-grid ${filteredTopics.length === 1 ? 'single-topic-grid' : ''}`}>
            {filteredTopics.map((topic, index) => (
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
                <button className="button">{text.follow}</button>
              </article>
            ))}
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
              </article>
            ))}
          </div>
        </div>

        <aside className="trends-rail">
          <h3>{text.liveTrends}</h3>
          <div className="trend-list">
            {filteredTrends.map((item) => (
              <article className="trend-item" key={item.title}>
                <p className="trend-tag">{item.tag}</p>
                <h4>{item.title}</h4>
                <p className="trend-meta">{item.meta}</p>
              </article>
            ))}
          </div>

          <div className="personalized-card">
            <h4>{text.personalizedTitle}</h4>
            <p>{text.personalizedText}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
