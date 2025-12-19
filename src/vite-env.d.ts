/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_CORE_URL: string;
  readonly VITE_API_ANALYTICS_URL: string;
  readonly VITE_API_MEETING_INTELLIGENCE_URL: string;
  readonly VITE_API_STORAGE_MEDIA_URL: string;
  readonly VITE_API_USER_TENANT_URL: string;
  readonly VITE_API_INTEGRATIONS_NOTIFICATIONS_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_DEVTOOLS: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_AUTH_PROVIDER: string;
  readonly VITE_AUTH_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
