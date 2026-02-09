
import React, { useEffect, useState, useCallback } from 'react';
import { useApp, AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NewsCard from './components/NewsCard';
import ArticleDetail from './components/ArticleDetail';
import Auth from './components/Auth';
import { Article, Language } from './types';
import { fetchNewsArticles } from './services/geminiService';
import { TRANSLATIONS } from './constants';
import { RefreshCw, LayoutGrid, Bookmark } from 'lucide-react';

const MainContent: React.FC = () => {
  const { user, language, isAuthenticated } = useApp();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'feed' | 'bookmarks'>('feed');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const t = TRANSLATIONS[language];

  const loadArticles = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const results = await fetchNewsArticles(user.followedTopics, user.followedSources, language);
    setArticles(results);
    setLoading(false);
  }, [user, language]);

  useEffect(() => {
    if (isAuthenticated) {
      loadArticles();
    }
  }, [isAuthenticated, loadArticles]);

  if (!isAuthenticated) return <Auth />;

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  const displayArticles = view === 'bookmarks' 
    ? user?.bookmarks || []
    : articles;

  return (
    <div className="pt-20 pb-10 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex gap-8">
          <Sidebar />
          
          <main className="flex-1">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {view === 'bookmarks' ? t.bookmarks : t.personalizedFeed}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  {new Date().toLocaleDateString(language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 self-start sm:self-center">
                <button 
                  onClick={() => setView('feed')}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'feed' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-primary-600'}`}
                >
                  <LayoutGrid className="w-4 h-4 mr-2" /> {t.trending}
                </button>
                <button 
                  onClick={() => setView('bookmarks')}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'bookmarks' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-primary-600'}`}
                >
                  <Bookmark className="w-4 h-4 mr-2" /> {t.bookmarks}
                </button>
                <button 
                  onClick={loadArticles}
                  disabled={loading}
                  className="p-2 text-slate-400 hover:text-primary-600 disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </header>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-6">
                <div className="relative">
                   <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center font-bold text-primary-600">N</div>
                </div>
                <p className="text-slate-500 font-medium animate-pulse">{t.loading}</p>
              </div>
            ) : displayArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayArticles.map(article => (
                  <NewsCard 
                    key={article.id} 
                    article={article}
                    onArticleClick={setSelectedArticle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bookmark className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.noArticles}</h3>
                <p className="text-slate-500">{t.personalizedFeed}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
