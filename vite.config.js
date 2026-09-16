import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), babel({ presets: [reactCompilerPreset()] })],

  server: {
    host: "127.0.0.1",
  },

  base: "/Chart",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
