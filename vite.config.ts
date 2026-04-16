import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Al ser repositorio de usuario (nombre.github.io), se queda así.
});