
import { Language } from './types';

export const TOPICS = [
  'Technology', 'Politics', 'Business', 'Science', 'Health', 'Sports', 'Entertainment', 'World', 'Environment'
];

export const SOURCES = [
  'Global Times', 'The Verge', 'BBC News', 'TechCrunch', 'Reuters', 'Bloomberg', 'Wired', 'The Guardian', 'NOS', 'Hürriyet'
];

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    welcome: 'Welcome to NexusNews',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    personalizedFeed: 'Your Personalized Feed',
    topics: 'Topics',
    sources: 'Sources',
    bookmarks: 'Bookmarks',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    search: 'Search news...',
    follow: 'Follow',
    following: 'Following',
    noArticles: 'No articles found. Try following more topics!',
    loading: 'Generating your feed...',
    readMore: 'Read More',
    email: 'Email Address',
    password: 'Password',
    googleLogin: 'Continue with Google',
    createAccount: 'Create an account',
    trending: 'Trending Now'
  },
  nl: {
    welcome: 'Welkom bij NexusNews',
    login: 'Inloggen',
    signup: 'Aanmelden',
    logout: 'Uitloggen',
    personalizedFeed: 'Uw Persoonlijke Feed',
    topics: 'Onderwerpen',
    sources: 'Bronnen',
    bookmarks: 'Bladwijzers',
    settings: 'Instellingen',
    language: 'Taal',
    theme: 'Thema',
    search: 'Nieuws zoeken...',
    follow: 'Volgen',
    following: 'Volgend',
    noArticles: 'Geen artikelen gevonden. Probeer meer onderwerpen te volgen!',
    loading: 'Uw feed genereren...',
    readMore: 'Lees meer',
    email: 'E-mailadres',
    password: 'Wachtwoord',
    googleLogin: 'Doorgaan met Google',
    createAccount: 'Maak een account aan',
    trending: 'Nu trending'
  },
  zh: {
    welcome: '欢迎来到 NexusNews',
    login: '登录',
    signup: '注册',
    logout: '登出',
    personalizedFeed: '您的个性化推荐',
    topics: '主题',
    sources: '媒体来源',
    bookmarks: '我的收藏',
    settings: '设置',
    language: '语言',
    theme: '主题',
    search: '搜索新闻...',
    follow: '关注',
    following: '已关注',
    noArticles: '未找到文章。尝试关注更多主题！',
    loading: '正在为您生成内容...',
    readMore: '阅读更多',
    email: '邮箱地址',
    password: '密码',
    googleLogin: '使用 Google 登录',
    createAccount: '创建账号',
    trending: '今日热点'
  },
  tr: {
    welcome: 'NexusNews\'a Hoş Geldiniz',
    login: 'Giriş Yap',
    signup: 'Kayıt Ol',
    logout: 'Çıkış Yap',
    personalizedFeed: 'Kişiselleştirilmiş Akışınız',
    topics: 'Konular',
    sources: 'Kaynaklar',
    bookmarks: 'Yer İşaretleri',
    settings: 'Ayarlar',
    language: 'Dil',
    theme: 'Tema',
    search: 'Haber ara...',
    follow: 'Takip Et',
    following: 'Takip Ediliyor',
    noArticles: 'Makale bulunamadı. Daha fazla konu takip etmeyi deneyin!',
    loading: 'Akışınız oluşturuluyor...',
    readMore: 'Devamını Oku',
    email: 'E-posta Adresi',
    password: 'Şifre',
    googleLogin: 'Google ile devam et',
    createAccount: 'Hesap oluştur',
    trending: 'Gündemdekiler'
  }
};
