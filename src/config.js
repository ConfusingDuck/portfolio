/**
 * This file contains configuration settings for the application,
 * such as API endpoints that change between environments.
 */

// Base URL for API calls - always try the local API endpoint
export const API_BASE_URL = 'http://localhost:3001/api';

// If needed, we can add more environment-specific configurations here
export const config = {
  // How long to wait before timing out API requests (in ms)
  apiTimeout: 3000, // Reduce timeout to 3 seconds for faster fallback
  
  // Whether to use local data fallbacks when API calls fail
  useLocalFallbacks: true,
  
  // Image path handling
  getImagePath: (path) => {
    if (!path) return `${process.env.PUBLIC_URL}/images/placeholder.png`;
    if (path.startsWith('http')) return path;
    return `${process.env.PUBLIC_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}; 