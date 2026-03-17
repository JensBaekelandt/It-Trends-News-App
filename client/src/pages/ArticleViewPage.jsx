import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { articleCopy, getLanguageCopy } from '../localization/copy';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

export default function ArticleViewPage() {
  const { language } = useAppContext();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatedSummary, setGeneratedSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const [searchParams] = useSearchParams();
  const text = getLanguageCopy(articleCopy, language);

  useEffect(() => {
    if (!id) return;
    const forcedState = (searchParams.get('state') || '').toLowerCase();

    if (forcedState === 'loading') {
      setLoading(true);
      setArticle(null);
      return;
    }

    api.getArticle(id).then((data) => {
      if (forcedState === 'empty') {
        setArticle(null);
      } else {
        setArticle(data.article);
      }
      setGeneratedSummary(null);
      setSummaryError('');
      setLoading(false);
    });
  }, [id, searchParams]);

  const articleId = Number(id);
  const translatedArticle = article
    ? {
        ...article,
        ...(text.overrides?.[articleId] || {}),
      }
    : null;

  if (loading) {
    return <p>{text.loading}</p>;
  }

  if (!translatedArticle) {
    return <section className="page-panel"><div className="empty-box"><h2>{text.emptyTitle}</h2><p>{text.emptyBody}</p></div></section>;
  }

  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    setSummaryError('');

    try {
      const result = await api.generateArticleSummary(articleId, { language });
      setGeneratedSummary(result.summary);
    } catch {
      setSummaryError(text.summaryError);
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <section className="article-shell">
      <nav className="breadcrumbs">{text.breadcrumbs}</nav>
      <div className="article-top-actions">
        <button className="button" type="button" onClick={handleGenerateSummary} disabled={summaryLoading}>
          {summaryLoading ? text.generatingSummary : text.generateSummary}
        </button>
      </div>
      <h1 className="article-title">{translatedArticle.title}</h1>

      <div className="author-row">
        <div className="author-avatar" />
        <div>
          <p className="author-name">{text.authorName}</p>
          <p className="author-meta">{text.authorMeta}</p>
        </div>
      </div>

      <div className="summary-card">
        <h3>{generatedSummary ? text.generatedBadge : text.summaryTitle}</h3>
        {generatedSummary ? (
          <div className="ai-summary-content">
            <p className="ai-summary-headline">{generatedSummary.headline}</p>
            <ul className="ai-summary-list">
              {generatedSummary.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className="ai-summary-takeaway"><strong>{text.takeaway}:</strong> {generatedSummary.takeaway}</p>
          </div>
        ) : (
          <div className="ai-summary-content">
            <p className="ai-summary-headline">{text.summaryEmpty}</p>
            <p>{text.summaryEmptyBody}</p>
          </div>
        )}
        {summaryError ? <p className="summary-error">{summaryError}</p> : null}
      </div>

      <article className="article-body">
        <p>{translatedArticle.content}</p>
        <h2>{text.sectionOne}</h2>
        <p>{text.sectionOneBody}</p>
        <blockquote>"{text.quote}"</blockquote>
        <h2>{text.sectionTwo}</h2>
        <p>{text.sectionTwoBody}</p>
      </article>

      <div className="tag-row">
        {text.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <section className="related-section">
        <h3>{text.relatedTitle}</h3>
        <div className="related-grid">
          {text.related.map((item) => (
            <article className="card" key={item}>
              <h4>{item}</h4>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
