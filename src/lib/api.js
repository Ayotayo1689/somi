const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://somi-backend-yx4i.onrender.com/api";

export function getAdminToken() {
  return localStorage.getItem("simi_admin_token");
}

export function setAdminToken(token) {
  localStorage.setItem("simi_admin_token", token);
}

export function clearAdminToken() {
  localStorage.removeItem("simi_admin_token");
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;
  if (!isFormData) headers.set("Content-Type", "application/json");

  const token = getAdminToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  getBootstrap: () => apiRequest("/bootstrap"),
  login: (payload) => apiRequest("/auth/login", { method: "POST", body: payload }),
  getSettings: () => apiRequest("/site-settings"),
  updateSettings: (payload) => apiRequest("/site-settings", { method: "PATCH", body: payload }),
  getNavigation: () => apiRequest("/navigation"),
  updateNavigation: (payload) => apiRequest("/navigation", { method: "PATCH", body: payload }),
  getPage: (slug) => apiRequest(`/pages/${slug}`),
  updatePage: (slug, payload) => apiRequest(`/pages/${slug}`, { method: "PATCH", body: payload }),
  list: (collection) => apiRequest(`/${collection}`),
  create: (collection, payload) => apiRequest(`/${collection}`, { method: "POST", body: payload }),
  update: (collection, id, payload) => apiRequest(`/${collection}/${id}`, { method: "PATCH", body: payload }),
  remove: (collection, id) => apiRequest(`/${collection}/${id}`, { method: "DELETE" }),
  createEnquiry: (payload) => apiRequest("/enquiries", { method: "POST", body: payload }),
  listEnquiries: () => apiRequest("/enquiries"),
  uploadMedia: (formData) => apiRequest("/media/upload", { method: "POST", body: formData }),
  listMedia: () => apiRequest("/media"),
};
