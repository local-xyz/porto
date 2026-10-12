import * as ChildProcess from 'node:child_process'
import * as Crypto from 'node:crypto'
import * as Fs from 'node:fs/promises'
import * as Path from 'node:path'

export type ContractArtifact = {
  abi: readonly unknown[]
  bytecode: {
    object: string
  }
}

type ContractsLock = {
  schema: number
  repository: string
  version: string
  tag: string
  commit: string
  asset: string
  sha256: string
}

type ManifestArtifact = {
  path: string
  sha256: string
}

type Manifest = {
  schema: number
  repository: string
  version: string
  commit: string
  artifacts: Record<string, ManifestArtifact>
}

export type ContractsPackage = {
  directory: string
  manifest: Manifest
}

const root = Path.resolve(import.meta.dirname, '..')

export async function fetchContracts(): Promise<ContractsPackage> {
  const lock = await readLock()
  const cache = Path.resolve(root, '.contracts', lock.sha256)
  const archive = Path.resolve(cache, lock.asset)
  const directory = Path.resolve(cache, lock.tag)

  try {
    return await validatePackage(directory, lock)
  } catch {
    await Fs.mkdir(cache, { recursive: true })
  }

  try {
    await verifyDigest(archive, lock.sha256)
  } catch {
    await downloadRelease(lock, archive)
    await verifyDigest(archive, lock.sha256)
  }

  await Fs.rm(directory, { force: true, recursive: true })
  const result = ChildProcess.spawnSync('tar', ['-xzf', archive, '-C', cache], {
    stdio: 'inherit',
  })
  if (result.status !== 0)
    throw new Error(`Failed to extract contract release ${archive}`)

  return validatePackage(directory, lock)
}

export async function readArtifact(
  contracts: ContractsPackage,
  name: string,
): Promise<ContractArtifact> {
  const entry = contracts.manifest.artifacts[name]
  if (!entry) throw new Error(`Contract release is missing ${name}`)

  const path = resolvePackagePath(contracts.directory, entry.path)
  const artifact = JSON.parse(await Fs.readFile(path, 'utf8'))
  if (
    !Array.isArray(artifact.abi) ||
    typeof artifact.bytecode?.object !== 'string' ||
    artifact.bytecode.object.length === 0
  )
    throw new Error(`Contract artifact ${name} has no ABI or bytecode`)

  return artifact
}

async function readLock(): Promise<ContractsLock> {
  const path = Path.resolve(root, 'contracts.lock.json')
  const lock = JSON.parse(await Fs.readFile(path, 'utf8')) as ContractsLock

  if (lock.schema !== 1)
    throw new Error(`Unsupported contracts lock schema ${lock.schema}`)
  if (lock.tag !== `contracts-v${lock.version}`)
    throw new Error('Contract lock tag and version disagree')
  if (!/^[\da-f]{40}$/i.test(lock.commit))
    throw new Error('Contract lock commit must be a full Git SHA')
  if (!/^[\da-f]{64}$/i.test(lock.sha256))
    throw new Error('Contract lock SHA-256 is invalid')
  if (Path.basename(lock.asset) !== lock.asset)
    throw new Error('Contract lock asset must be a file name')

  return lock
}

async function downloadRelease(lock: ContractsLock, archive: string) {
  console.log(`Downloading ${lock.repository}/${lock.tag}...`)
  const temporary = `${archive}.tmp`
  await Fs.rm(temporary, { force: true })
  const result = ChildProcess.spawnSync(
    'gh',
    [
      'release',
      'download',
      lock.tag,
      '--repo',
      lock.repository,
      '--pattern',
      lock.asset,
      '--output',
      temporary,
    ],
    { stdio: 'inherit' },
  )
  if (result.status !== 0)
    throw new Error(
      `Failed to download contract release. Authenticate gh for ${lock.repository}.`,
    )
  await Fs.rename(temporary, archive)
}

async function validatePackage(
  directory: string,
  lock: ContractsLock,
): Promise<ContractsPackage> {
  const manifestPath = Path.resolve(directory, 'manifest.json')
  const manifest = JSON.parse(
    await Fs.readFile(manifestPath, 'utf8'),
  ) as Manifest

  if (manifest.schema !== 1)
    throw new Error(`Unsupported contracts manifest schema ${manifest.schema}`)
  if (manifest.repository !== lock.repository)
    throw new Error('Contract repository does not match lock')
  if (manifest.version !== lock.version)
    throw new Error('Contract version does not match lock')
  if (manifest.commit !== lock.commit)
    throw new Error('Contract commit does not match lock')

  for (const [name, artifact] of Object.entries(manifest.artifacts)) {
    const path = resolvePackagePath(directory, artifact.path)
    await verifyDigest(path, artifact.sha256).catch((error) => {
      throw new Error(`Contract artifact ${name} failed verification`, {
        cause: error,
      })
    })
  }

  return { directory, manifest }
}

function resolvePackagePath(directory: string, relativePath: string) {
  const path = Path.resolve(directory, relativePath)
  if (!path.startsWith(`${directory}${Path.sep}`))
    throw new Error(`Unsafe contract artifact path ${relativePath}`)
  return path
}

async function verifyDigest(path: string, expected: string) {
  const data = await Fs.readFile(path)
  const actual = Crypto.createHash('sha256').update(data).digest('hex')
  if (actual.toLowerCase() !== expected.toLowerCase())
    throw new Error(
      `SHA-256 mismatch for ${path}: expected ${expected}, got ${actual}`,
    )
}
