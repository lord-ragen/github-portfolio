import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const nodeProcess = (globalThis as typeof globalThis & {
  process?: { env?: { NODE_ENV?: string } };
}).process;

export default defineConfig({
  plugins: [react()],
  base: nodeProcess?.env?.NODE_ENV === "production" ? "/github-portfolio/" : "/",
});
