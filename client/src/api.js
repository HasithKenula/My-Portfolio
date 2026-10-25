const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.errors = data.errors;
    throw err;
  }
  return data;
}

export const getProfile = () => request('/profile');
export const getProjects = () => request('/projects');
export const sendMessage = (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) });
