import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"],
  format: ["cjs", "esm"],
  dts: false,
  clean: true,
  splitting: false,
  sourcemap: true,
  external: [
    "react", 
    "react-dom", 
    "motion", 
    "motion/react", 
    "tailwindcss", 
    "lucide-react", 
    "framer-motion",
    "react-icons",
    "react-icons/si",
    "react-icons/fa",
    "react-icons/fi",
    "react-icons/bs",
    "react-router-dom"
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  }
});