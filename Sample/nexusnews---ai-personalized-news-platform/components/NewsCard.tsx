
import React from 'react';
import { Article } from '../types';
import { useApp } from '../context/AppContext';
import { Bookmark, BookmarkCheck, ExternalLink, Share2 } from 'lucide-react';

interface NewsCardProps {
  article: Article;
  onArticleClick?: (article: Article) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onArticleClick }) => {
  const { user, toggleBookmark, language, theme } = useApp();
  const isBookmarked = user?.bookmarks.some(b => b.id === article.id);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
      <div 
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => onArticleClick?.(article)}
      >
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          {article.topic}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(article);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full text-slate-700 dark:text-slate-200 hover:text-primary-600 transition-colors"
        >
          {isBookmarked ? <BookmarkCheck className="w-5 h-5 fill-primary-600" /> : <Bookmark className="w-5 h-5" />}
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {article.source} • {article.publishedAt}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
          {article.summary}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 font-semibold text-sm flex items-center hover:underline"
          >
            Read Full <ExternalLink className="w-4 h-4 ml-1" />
          </a>
          <button className="text-slate-400 hover:text-primary-600 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
