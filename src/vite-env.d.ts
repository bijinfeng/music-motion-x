/// <reference types="vite/client" />

declare module "intersection-observer";

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MUSIC_API: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
