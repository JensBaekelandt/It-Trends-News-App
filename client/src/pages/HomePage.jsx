import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../state/AppContext";
import { api } from "../services/api";

export default function HomePage() {
  const { language } = useAppContext();

  const [feed, setFeed] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedBookmarks")) || [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id) => {
    setSaved((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("savedBookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    api.getBookmarks().then((data) => {
      setFeed(data.items || []);
      setLoading(false);
    });
  }, []);

  
const CATEGORY_MAP = {
  tech: ["TECHNOLOGY"],
  sport: ["LIFESTYLE"],
  politics: ["SCIENCE", "FINANCE"],
};

const filtered =
  filter === "all"
    ? feed
    : feed.filter((i) => CATEGORY_MAP[filter]?.includes(i.category));


  const TEXT = {
    en: {
      title: "For You",
      subtitle: "Curated stories based on your interests",
      filters: {
        all: "All Stories",
        tech: "Tech",
        sport: "Sport",
        politics: "Politics",
        manage: "+ Manage",
      },
    },
    nl: {
      title: "Voor jou",
      subtitle: "Geselecteerde verhalen op basis van jouw interesses",
      filters: {
        all: "Alle verhalen",
        tech: "Tech",
        sport: "Sport",
        politics: "Politiek",
        manage: "+ Beheren",
      },
    },
  }[language];

  return (
    <section className="page-panel">
      <div className="explore-layout">
        
        {/* LEFT SIDE */}
        <div>
          <header className="page-head">
            <h1>{TEXT.title}</h1>
            <p>{TEXT.subtitle}</p>
          </header>

          {/* FILTERS */}
          <div className="filter-row">
            {["all", "tech", "sport", "politics", "manage"].map((key) => {
              const active = key === filter;

              if (key === "manage") {
                return (
                  <button
                    key={key}
                    className="tiny-btn"
                    style={{ borderStyle: "dashed" }}
                    onClick={() => (window.location.href = "/explore")}
                  >
                    {TEXT.filters.manage}
                  </button>
                );
              }

              return (
                <button
                  key={key}
                  className={`tiny-btn ${active ? "filter-btn-active" : ""}`}
                  onClick={() => setFilter(key)}
                >
                  {TEXT.filters[key]}
                </button>
              );
            })}
          </div>

          {loading && <div className="loading-box">Loading…</div>}

          {/* FEED */}
          {!loading &&
            filtered.map((item) => (
              <article key={item.id} className="card" style={{ marginTop: 20 }}>
                
                <div
                  style={{
                    height: 220,
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                    marginBottom: 10,
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                    Open
                  </Link>
                </div>
              </article>
            ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="trends-rail home-sidebar">
          <h3>Trending</h3>

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
            <h4>Personalized feed</h4>
            <p>Follow topics in Explore to tune what appears on your Home timeline.</p>
            <Link className="button" to="/explore" style={{ marginTop: 10, width: "100%", textAlign: 'center' }}>
              Explore topics
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}