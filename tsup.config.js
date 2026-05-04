import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.js"
    },
    format: ["cjs", "esm"],
    dts: false,
    clean: true,
    splitting: false,
    sourcemap: true,
    external: ["react", "react-dom", "motion", "motion/react", "tailwindcss", "lucide-react", "framer-motion"],
    esbuildOptions(options) {
        options.jsx = 'automatic'
    }
});