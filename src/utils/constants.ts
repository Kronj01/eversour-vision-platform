
export const APP_CONFIG = {
  name: 'Eversour',
  description: 'Next-Generation Digital Solutions',
  version: '1.0.0',
  author: 'Eversour Team',
} as const;

export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
} as const;

export const THEME_CONFIG = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#06B6D4',
    accent: '#F59E0B',
  },
} as const;
