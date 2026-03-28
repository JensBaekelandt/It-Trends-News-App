import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { store } from './store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 4000;

const TOPIC_CATEGORY_MAP = {
  technology: ['TECHNOLOGY'],
  cybersecurity: ['TECHNOLOGY', 'SCIENCE'],
  startups: ['FINANCE', 'TECHNOLOGY'],
};

function parseSummaryJson(textContent) {
  const normalized = textContent.trim();
  const fencedMatch = normalized.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const jsonText = fencedMatch?.[1] || normalized;
  return JSON.parse(jsonText);
}

function getTopicCategories(topicName) {
  return TOPIC_CATEGORY_MAP[String(topicName || '').toLowerCase()] || [];
}

function buildExplorePayload() {
  const topics = store.topics.map((topic) => {
    const categories = getTopicCategories(topic.name);
    const relatedArticles = store.articles.filter((article) => categories.includes(article.category));
    const latestArticle = relatedArticles[0] || null;

    return {
      ...topic,
      articleCount: relatedArticles.length,
      latestArticleId: latestArticle?.id || null,
    };
  });

  const sources = Array.from(new Set(store.articles.map((article) => article.source))).map((sourceName) => {
    const sourceArticles = store.articles.filter((article) => article.source === sourceName);
    const latestArticle = sourceArticles[0] || null;

    return {
      name: sourceName,
      description: latestArticle?.summary || 'Latest coverage from this source.',
      articleCount: sourceArticles.length,
      latestArticleId: latestArticle?.id || null,
    };
  });

  const liveTrends = store.articles.slice(0, 3).map((article) => ({
    id: `trend-${article.id}`,
    articleId: article.id,
    tag: article.category,
    title: article.title,
    meta: `${article.savedAgo} • ${article.source}`,
  }));

  return { topics, sources, liveTrends };
}

async function generateAnthropicSummary(article, language = 'en') {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  const model = process.env.ANTHROPIC_MODEL?.trim() || 'claude-sonnet-4-6';

  if (!apiKey) {
    const error = new Error('ANTHROPIC_API_KEY is not configured');
    error.statusCode = 500;
    throw error;
  }

  const languageLabel = language === 'nl' ? 'Dutch' : 'English';
  const prompt = [
    `Summarize the following news article in ${languageLabel}.`,
    'Return valid JSON only in this exact shape:',
    '{"headline":"...","bullets":["...","...","..."],"takeaway":"..."}',
    'Rules:',
    '- headline max 8 words',
    '- exactly 3 bullets',
    '- each bullet max 18 words',
    '- takeaway max 24 words',
    '',
    `Title: ${article.title}`,
    `Summary: ${article.summary}`,
    `Content: ${article.content}`,
  ].join('\n');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      temperature: 0.3,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    const error = new Error(`Anthropic request failed: ${response.status} ${details}`);
    error.statusCode = response.status;
    throw error;
  }

  const payload = await response.json();
  const textContent = payload.content?.find((item) => item.type === 'text')?.text;

  if (!textContent) {
    const error = new Error('Anthropic response did not contain summary text');
    error.statusCode = 502;
    throw error;
  }

  try {
    const parsed = parseSummaryJson(textContent);
    return {
      headline: parsed.headline,
      bullets: Array.isArray(parsed.bullets) ? parsed.bullets.slice(0, 3) : [],
      takeaway: parsed.takeaway,
    };
  } catch {
    const error = new Error('Anthropic response could not be parsed as JSON');
    error.statusCode = 502;
    throw error;
  }
}

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find((item) => item.email === email && item.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.json({ user: { id: user.id, name: user.name, email: user.email, bookmarks: user.bookmarks || [],} });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  const exists = store.users.some((item) => item.email === email);
  if (exists) {
    return res.status(409).json({ message: 'Email already exists' });
  }
  const user = { id: `u${store.users.length + 1}`, name, email, password, bookmarks: [],};
  store.users.push(user);
  return res.status(201).json({
    message: 'Account created',
    user: { id: user.id, name: user.name, email: user.email, bookmarks: user.bookmarks || [], },
  });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  return res.json({ message: 'If this email exists, a reset link was sent.' });
});

app.post('/api/auth/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  const user = store.users.find((item) => item.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.password = newPassword;
  return res.json({ message: 'Password updated' });
});

app.get('/api/explore', (_req, res) => {
  res.json(buildExplorePayload());
});

app.get('/api/articles', (_req, res) => {
  res.json({ items: store.articles });
});

app.get('/api/bookmarks', (req, res) => {
  const userId = req.query.userId;

  const user = store.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const items = store.articles.filter(article =>
    user.bookmarks.includes(article.id)
  );

  res.json({ items });
});

app.post('/api/bookmarks/toggle', (req, res) => {
  const { userId, articleId } = req.body;

  const user = store.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const id = Number(articleId);
  const exists = user.bookmarks.includes(id);

  if (exists) {
    user.bookmarks = user.bookmarks.filter(b => b !== id);
  } else {
    user.bookmarks.push(id);
  }

  res.json({ bookmarks: user.bookmarks });
});

app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = store.articles.find((item) => item.id === id);
  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }
  return res.json({ article });
});

app.post('/api/articles/:id/summary', async (req, res) => {
  const id = Number(req.params.id);
  const article = store.articles.find((item) => item.id === id);

  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }

  try {
    const summary = await generateAnthropicSummary(article, req.body?.language || 'en');
    return res.json({ summary });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || 'Summary generation failed' });
  }
});

app.get('/api/settings', (_req, res) => {
  res.json({ settings: store.settings });
});

app.put('/api/settings', (req, res) => {
  const { theme, language } = req.body;
  if (theme) {
    store.settings.theme = theme;
  }
  if (language) {
    store.settings.language = language;
  }
  res.json({ settings: store.settings });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
