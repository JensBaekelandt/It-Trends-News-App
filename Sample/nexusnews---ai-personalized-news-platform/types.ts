
export type Language = 'en' | 'nl' | 'zh' | 'tr';
export type Theme = 'light' | 'dark';

export interface User {
  email: string;
  name: string;
  followedTopics: string[];
  followedSources: string[];
  bookmarks: string[];
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  topic: string;
  imageUrl: string;
  publishedAt: string;
  url: string;
}

export interface NewsState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  user: User | null;
  language: Language;
  theme: Theme;
  isAuthenticated: boolean;
}
