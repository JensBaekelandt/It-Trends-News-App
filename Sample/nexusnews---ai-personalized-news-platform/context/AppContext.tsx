
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Language, Theme } from '../types';
import { TOPICS, SOURCES } from '../constants';

interface AppContextType {
  user: User | null;
  language: Language;
  theme: Theme;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  toggleFollowTopic: (topic: string) => void;
  toggleFollowSource: (source: string) => void;
  toggleBookmark: (articleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('nexus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nexus_user');
    }
  }, [user]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const login = (email: string) => {
    setUser({
      email,
      name: email.split('@')[0],
      followedTopics: [TOPICS[0], TOPICS[1], TOPICS[2]],
      followedSources: [SOURCES[0], SOURCES[1]],
      bookmarks: []
    });
  };

  const logout = () => setUser(null);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const toggleFollowTopic = (topic: string) => {
    if (!user) return;
    const isFollowing = user.followedTopics.includes(topic);
    setUser({
      ...user,
      followedTopics: isFollowing 
        ? user.followedTopics.filter(t => t !== topic)
        : [...user.followedTopics, topic]
    });
  };

  const toggleFollowSource = (source: string) => {
    if (!user) return;
    const isFollowing = user.followedSources.includes(source);
    setUser({
      ...user,
      followedSources: isFollowing 
        ? user.followedSources.filter(s => s !== source)
        : [...user.followedSources, source]
    });
  };

  const toggleBookmark = (articleId: string) => {
    if (!user) return;
    const isBookmarked = user.bookmarks.includes(articleId);
    setUser({
      ...user,
      bookmarks: isBookmarked
        ? user.bookmarks.filter(id => id !== articleId)
        : [...user.bookmarks, articleId]
    });
  };

  return (
    <AppContext.Provider value={{
      user, language, theme, isAuthenticated,
      login, logout, setLanguage, toggleTheme,
      toggleFollowTopic, toggleFollowSource, toggleBookmark
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
