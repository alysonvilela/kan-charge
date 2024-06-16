import { defineConfig, loadEnv } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const processEnvValues = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return ({
    define: {
      'process.env': processEnvValues
    },
    server: {
      port: 8888
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
})