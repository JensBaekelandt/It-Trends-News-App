
import React from 'react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import { 
  Search, Moon, Sun, Languages, 
  LogOut, Bell, User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { Language } from '../types';

const Navbar: React.FC = () => {
  const { user, theme, toggleTheme, language, setLanguage, logout, isAuthenticated } = useApp();
  const t = TRANSLATIONS[language];

  return (
    <nav className="h-16 border-b border-slate-200 dark:border-slate-800 glass fixed top-0 left-0 right-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">NexusNews</span>
        </div>
        
        {isAuthenticated && (
          <div className="relative hidden md:block w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="group relative">
          <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors flex items-center">
            <Languages className="w-5 h-5" />
            <span className="ml-1 text-xs font-bold uppercase">{language}</span>
          </button>
          <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            {(['en', 'nl', 'zh', 'tr'] as Language[]).map(lang => (
              <button 
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 first:rounded-t-xl last:rounded-b-xl ${language === lang ? 'text-primary-600 font-bold' : ''}`}
              >
                {lang === 'en' ? 'English' : lang === 'nl' ? 'Nederlands' : lang === 'zh' ? '中文' : 'Türkçe'}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {isAuthenticated ? (
          <div className="flex items-center space-x-4 border-l border-slate-200 dark:border-slate-700 pl-4">
            <button className="p-2 text-slate-600 dark:text-slate-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="flex items-center space-x-2 group cursor-pointer relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-400 to-primary-700 flex items-center justify-center text-white font-bold text-xs">
                {user?.name[0].toUpperCase()}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-bold truncate">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <button onClick={logout} className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-b-xl flex items-center">
                  <LogOut className="w-4 h-4 mr-2" /> {t.logout}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
