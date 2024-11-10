/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_TITLE: string;
  VITE_USER_STORE: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
