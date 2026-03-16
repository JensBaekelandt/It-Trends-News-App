import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('preferredTheme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('preferredLanguage') || 'en');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('preferredTheme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const value = useMemo(
    () => ({
      theme,
      language,
      user,
      isAuthenticated: Boolean(user),
      toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === 'en' ? 'nl' : 'en')),
      login: (payload) => setUser(payload),
      logout: () => setUser(null),
    }),
    [theme, language, user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
}
