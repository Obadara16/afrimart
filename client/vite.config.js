import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  server: {
    proxy: {
      "/api/v1": "https://afrimart-backend.onrender.com/",
    },
  },
  plugins: [
    react(),
    replace({
      "process.env.STRIPE_SECRET_KEY": JSON.stringify(
        process.env.STRIPE_SECRET_KEY
      ),
      "process.env.MY_VARIABLE": JSON.stringify(process.env.MY_VARIABLE),
      preventAssignment: true,
    }),
  ],
  esbuild: {
    // this will allow dynamic require statements in faker to work correctly
    // remove this if you are not using faker or similar libraries
  },
});
