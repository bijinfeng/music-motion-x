import { resolve } from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, loadEnv } from "vite";
// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const ENV = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isDev = ENV.NODE_ENV === "development";

  return defineConfig({
    base: isDev ? "/" : "/music-motion-x/",
    plugins: [react()],
    build: {
      target: "esnext",
    },
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  });
};
