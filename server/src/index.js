import cors from 'cors';
import express from 'express';
import { store } from './store.js';

const app = express();
const port = process.env.PORT || 4000;

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
  return res.json({ user: { id: user.id, name: user.name, email: user.email } });
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
  const user = { id: `u${store.users.length + 1}`, name, email, password };
  store.users.push(user);
  return res.status(201).json({ message: 'Account created' });
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
  res.json({ topics: store.topics });
});

app.get('/api/bookmarks', (_req, res) => {
  res.json({ items: store.articles });
});

app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = store.articles.find((item) => item.id === id);
  if (!article) {
    return res.status(404).json({ message: 'Article not found' });
  }
  return res.json({ article });
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
