// src/api/client.ts
const baseURL = import.meta.env.VITE_API_BASE_URL || "https://localhost:44306";

export type ApiOptions = RequestInit & { json?: any };

async function api<T = any>(path: string, opts: ApiOptions = {}): Promise<T> {
  const headers: Record<string,string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string,string> || {})
  };
  const token = localStorage.getItem("smarterr_token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${baseURL}${path}`, {
    ...opts,
    headers,
    body: opts.json ? JSON.stringify(opts.json) : opts.body,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json();
}

export default api;
