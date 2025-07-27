// Centralized configuration for different environments
const config = {
  development: {
    API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"
  },
  production: {
    // In production, both frontend and backend are served from the same Flask server
    API_URL: import.meta.env.VITE_API_URL || "/api",  // API prefix for same origin
    FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || ""
  }
};

// Auto-detect environment or use environment variable
const environment = import.meta.env.MODE || 'development';
const currentConfig = config[environment] || config.development;

// Export the API URL (keeping backward compatibility)
const API_URL = currentConfig.API_URL;
export default API_URL;

// Export the full config for other uses
export const CONFIG = currentConfig;
export const FRONTEND_URL = currentConfig.FRONTEND_URL;
