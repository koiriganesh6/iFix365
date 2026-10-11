const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const apiUrl = (path) => `${API_BASE_URL}${path}`;

async function post(path, payload) {
  let response;
  try {
    response = await fetch(apiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw { message: 'Cannot reach the server. Check your connection and try again.' };
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw { message: data.message || 'Request failed.', errors: data.errors };
  return data;
}

export const submitRepair = (payload) => post('/api/repairs', payload);
export const submitContact = (payload) => post('/api/contact', payload);
