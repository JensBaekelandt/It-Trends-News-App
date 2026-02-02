
import React from 'react';
import { useApp } from '../context/AppContext';
import { TOPICS, SOURCES, TRANSLATIONS } from '../constants';
import { Hash, Radio, CheckCircle2, Circle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, toggleFollowTopic, toggleFollowSource, language } = useApp();
  const t = TRANSLATIONS[language];

  if (!user) return null;

  return (
    <aside className="w-72 hidden lg:block h-[calc(100vh-80px)] overflow-y-auto sticky top-20 pr-4 space-y-8 custom-scrollbar">
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
          <Hash className="w-4 h-4 mr-2" /> {t.topics}
        </h3>
        <div className="space-y-1">
          {TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => toggleFollowTopic(topic)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                user.followedTopics.includes(topic)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{topic}</span>
              {user.followedTopics.includes(topic) ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 opacity-20" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
          <Radio className="w-4 h-4 mr-2" /> {t.sources}
        </h3>
        <div className="space-y-1">
          {SOURCES.map(source => (
            <button
              key={source}
              onClick={() => toggleFollowSource(source)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                user.followedSources.includes(source)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{source}</span>
              {user.followedSources.includes(source) ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 opacity-20" />}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
