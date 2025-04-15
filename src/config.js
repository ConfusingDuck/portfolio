/**
 * This file contains configuration settings for the application,
 * such as API endpoints that change between environments.
 */

// Determine if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

// Base URL for API calls
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001/api' 
  : '';  // Empty string for production since we'll use fallback data

// If needed, we can add more environment-specific configurations here
export const config = {
  // How long to wait before timing out API requests (in ms)
  apiTimeout: 5000,
  
  // Whether to use local data fallbacks when API calls fail
  useLocalFallbacks: true,
  
  // Image path handling
  getImagePath: (path) => {
    if (!path) return `${process.env.PUBLIC_URL}/images/placeholder.png`;
    if (path.startsWith('http')) return path;
    return `${process.env.PUBLIC_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}; 