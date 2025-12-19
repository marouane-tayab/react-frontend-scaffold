// Global app configuration and constants.

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Insight Frontend';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '0.0.1';

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || '',
  core: import.meta.env.VITE_API_CORE_URL || '',
  analytics: import.meta.env.VITE_API_ANALYTICS_URL || '',
  meetingIntelligence: import.meta.env.VITE_API_MEETING_INTELLIGENCE_URL || '',
  storageMedia: import.meta.env.VITE_API_STORAGE_MEDIA_URL || '',
  userTenant: import.meta.env.VITE_API_USER_TENANT_URL || '',
  integrationsNotifications: import.meta.env.VITE_API_INTEGRATIONS_NOTIFICATIONS_URL || '',
};

export const FEATURE_FLAGS = {
  enableDevtools: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
};

export const AUTH_CONFIG = {
  provider: import.meta.env.VITE_AUTH_PROVIDER || 'local',
  redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI || '',
};
