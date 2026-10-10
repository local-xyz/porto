import ChildProcess from 'node:child_process'
import { PortoUi } from '@porto/ui/vite-plugin'
import Tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import React from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import Mkcert from 'vite-plugin-mkcert'
import Terminal from 'vite-plugin-terminal'
import TsconfigPaths from 'vite-tsconfig-paths'

import { Plugins } from '../~internal/vite/index'

const commitSha =
  ChildProcess.execSync('git rev-parse --short HEAD').toString().trim() ||
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const skipMkcert = env.SKIP_MKCERT === 'true' || mode === 'test'
  const allowedHosts = env.ALLOWED_HOSTS?.split(',') ?? []

  const plugins = [
    skipMkcert
      ? null
      : Mkcert({
          hosts: ['localhost', 'stg.localhost', 'anvil.localhost'],
        }),
    Tailwindcss(),
    Plugins.Icons(),
    PortoUi(),
    TsconfigPaths(),
    TanStackRouterVite(),
    React(),
  ]

  if (mode === 'development')
    plugins.push(Terminal({ output: ['terminal', 'console'] }))

  return {
    base: '/dialog/',
    build: {
      outDir: './dist/dialog',
      sourcemap: true,
    },
    define: {
      __APP_VERSION__: JSON.stringify(commitSha),
      'import.meta.env.ANVIL': process.env.ANVIL === 'true',
      'import.meta.env.FORCE_REDUCED_MOTION':
        process.env.FORCE_REDUCED_MOTION === 'true',
    },
    plugins,
    resolve: {
      dedupe: [
        '@tanstack/react-query',
        '@wagmi/core',
        'react',
        'react-dom',
        'wagmi',
      ],
    },
    server: {
      allowedHosts,
    },
  }
})
