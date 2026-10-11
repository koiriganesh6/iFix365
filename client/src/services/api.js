export async function submitRepair(payload) {
  let res;
  try { res = await fetch('/api/repairs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); }
  catch { throw { message: 'Cannot reach the server. Check your connection and try again.' }; }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { message: data.message || 'Request failed.', errors: data.errors };
  return data; // resolves only when the server confirmed the save (201)
}

// ---- admin ----
const A = '/api/admin';
const tok = () => sessionStorage.getItem('adminToken');
async function call(path, opts = {}) {
  let res;
  try { res = await fetch(A + path, { ...opts, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok()}` } }); }
  catch { throw { message: 'Cannot reach the server.' }; }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && tok()) sessionStorage.removeItem('adminToken');
  if (!res.ok) throw { message: data.message || 'Request failed.', status: res.status };
  return data;
}
export const adminLogin = async (password) => {
  const d = await call('/login', { method: 'POST', body: JSON.stringify({ password }) });
  sessionStorage.setItem('adminToken', d.token);
};
export const adminLogout = () => sessionStorage.removeItem('adminToken');
export const adminLoggedIn = () => Boolean(tok());
export const adminList = () => call('/repairs');
export const adminStatus = (id, status) => call(`/repairs/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
export const adminDelete = (id) => call(`/repairs/${id}`, { method: 'DELETE' });
