/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_TITLE: string;
  VITE_USER_STORE: string;
  VITE_API_PROVINCE: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
