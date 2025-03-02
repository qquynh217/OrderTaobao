/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_TITLE: string;
  VITE_USER_STORE: string;
  VITE_API_PROVINCE: string;
  VITE_EXCHANGE_RATE: number | string;
  VITE_JWT_TOKEN: string;
  VITE_CONFIG_STORE: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
