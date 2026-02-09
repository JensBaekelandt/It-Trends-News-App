import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { useApp } from '../context/AppContext';
import { ArrowLeft, BookmarkCheck, Bookmark, ExternalLink, Loader, AlertCircle } from 'lucide-react';
import { generateArticleSummary } from '../services/geminiService';
import { fetchArticleContent } from '../services/contentExtractor';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  const { user, toggleBookmark } = useApp();
  const [summary, setSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [articleContent, setArticleContent] = useState<string>('');
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [contentError, setContentError] = useState(false);
  const isBookmarked = user?.bookmarks.some(b => b.id === article.id);

  useEffect(() => {
    const fetchAndProcessContent = async () => {
      try {
        setIsLoadingContent(true);
        setIsLoadingSummary(true);

        // Try to fetch actual article content from the web
        let contentToUse = article.summary;
        const extracted = await fetchArticleContent(article.url);
        
        if (extracted?.content) {
          contentToUse = extracted.content;
          setArticleContent(extracted.content);
        } else {
          setArticleContent(article.summary);
          setContentError(true);
        }

        setIsLoadingContent(false);

        // Generate summary using the fetched content
        const generatedSummary = await generateArticleSummary(article.title, contentToUse);
        setSummary(generatedSummary);
        setIsLoadingSummary(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setArticleContent(article.summary);
        setContentError(true);
        setIsLoadingContent(false);

        // Still try to generate summary from article summary
        const generatedSummary = await generateArticleSummary(article.title, article.summary);
        setSummary(generatedSummary);
        setIsLoadingSummary(false);
      }
    };

    fetchAndProcessContent();
  }, [article]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 flex-1 mx-4">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Summary Section - Top */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Summary</h2>
          {isLoadingSummary ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-6 h-6 text-primary-600 animate-spin" />
              <span className="ml-3 text-slate-600 dark:text-slate-400">Generating summary...</span>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {summary}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons - Middle */}
        <div className="flex flex-col sm:flex-row gap-4 my-8 py-8 border-y border-slate-200 dark:border-slate-700">
          <button
            onClick={() => toggleBookmark(article)}
            className={`flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all ${
              isBookmarked
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-5 h-5 mr-2 fill-current" />
                Saved to Bookmarks
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5 mr-2" />
                Save to Bookmarks
              </>
            )}
          </button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-all"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Read Full Article
          </a>
        </div>

        {/* Full Content - Bottom */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article Content</h2>
          
          {isLoadingContent ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-6 h-6 text-primary-600 animate-spin" />
              <span className="ml-3 text-slate-600 dark:text-slate-400">Loading content...</span>
            </div>
          ) : contentError ? (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Unable to Fetch Full Content
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm mb-4">
                    We couldn't retrieve the full article from the source. Showing available summary instead.
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read on Original Site
                  </a>
                </div>
              </div>
            </div>
          ) : null}

          <div className="prose dark:prose-invert max-w-none mt-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {articleContent}
            </p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {article.source} • {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold px-3 py-1 rounded-full">
            {article.topic}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
