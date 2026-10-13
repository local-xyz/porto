import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { include: ['apps/service/test/**/*.test.ts'] },
})
