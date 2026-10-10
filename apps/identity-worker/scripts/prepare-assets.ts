import { cp, mkdir, rm, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const workerDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
)
const appsDirectory = join(workerDirectory, '..')
const outputDirectory = join(workerDirectory, 'dist', 'assets')
const identityDirectory = join(appsDirectory, 'id', 'dist')
const dialogDirectory = join(appsDirectory, 'dialog', 'dist', 'dialog')

await Promise.all([
  stat(join(identityDirectory, 'index.html')),
  stat(join(dialogDirectory, 'index.html')),
])

await rm(outputDirectory, { force: true, recursive: true })
await mkdir(outputDirectory, { recursive: true })
await cp(identityDirectory, outputDirectory, { recursive: true })
await cp(dialogDirectory, join(outputDirectory, 'dialog'), {
  recursive: true,
})
