import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  watchPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.git/"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
