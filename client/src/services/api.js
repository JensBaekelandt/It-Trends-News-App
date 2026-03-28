const API_BASE = 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getExplore: () => request('/explore'),
  getBookmarks: (userId) => request(`/bookmarks?userId=${userId}`),
  toggleBookmark: (payload) =>
  request('/bookmarks/toggle', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getArticles: () => request('/articles'),
  getArticle: (id) => request(`/articles/${id}`),
  generateArticleSummary: (id, payload) =>
    request(`/articles/${id}/summary`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getSettings: () => request('/settings'),
  updateSettings: (payload) =>
    request('/settings', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  signup: (payload) =>
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  forgotPassword: (payload) =>
    request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  resetPassword: (payload) =>
    request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
