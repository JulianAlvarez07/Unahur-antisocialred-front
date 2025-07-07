export const API_URL =
  import.meta.env.VITE_API_URL || "https://anti-social-api.onrender.com";

// Helper function para construir URLs de la API
export const buildApiUrl = (endpoint: string) => {
  const baseUrl = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return `${baseUrl}${normalizedEndpoint}`;
};
