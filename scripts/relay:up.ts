import * as fs from 'node:fs'
import * as path from 'node:path'

const updateFiles = (version: string) => [
  {
    path: 'compose.yaml',
    find: /FROM ghcr\.io\/ithacaxyz\/relay:v[\d.]+/,
    replace: `FROM ghcr.io/ithacaxyz/relay:v${version}`,
  },
  {
    path: 'apps/playground/vite.config.ts',
    find: /version: 'v[\d.]+'/,
    replace: `version: 'v${version}'`,
  },
  {
    path: 'test/src/relay.ts',
    find: /version: 'v[\d.]+'/,
    replace: `version: 'v${version}'`,
  },
]

const versionRegex = /v?(\d+\.\d+\.\d+)/

let version = process.argv[2]

if (!version) {
  console.log('No version provided, fetching latest from GitHub...')
  try {
    const response = await fetch(
      'https://api.github.com/repos/ithacaxyz/relay/releases/latest',
    )
    if (!response.ok)
      throw new Error(
        `Failed to fetch latest release: ${response.status} ${response.statusText}`,
      )

    const latestRelease = await response.json()
    const tagName = latestRelease.tag_name

    // Extract version from tag like "v23.0.8" -> "23.0.8"
    const match = tagName.match(versionRegex)
    if (!match) {
      console.error('Could not extract version from tag:', tagName)
      process.exit(1)
    }

    version = match[1]
  } catch (error) {
    console.error('Failed to fetch latest release from GitHub:', error)
    console.error('Please provide a version as the first argument')
    console.error('Usage: pnpm relay:up <version>')
    console.error('Example: pnpm relay:up 23.1.0')
    process.exit(1)
  }
}

const match = version?.match(versionRegex)
if (!match) {
  console.error(`Invalid version: ${version}`)
  console.error('Please provide a version in the format of x.x.x')
  process.exit(1)
}

version = match[1]

const rootDir = path.resolve(import.meta.dirname, '..')

// Update configuration files
for (const { path: relativePath, find, replace } of updateFiles(version!)) {
  const filePath = path.resolve(rootDir, relativePath)
  let content = fs.readFileSync(filePath, 'utf8')
  content = content.replace(find, replace)
  fs.writeFileSync(filePath, content)
}

console.log(`Successfully updated Relay to v${version}`)
