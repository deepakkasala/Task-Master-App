import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  darkMode: "class",
  theme: {
    extend: {},
    server: {
      host: "0.0.0.0", // Accept connections from all network interfaces
      port: 5173, // Optional: Keep your existing port
    },
  },
});
