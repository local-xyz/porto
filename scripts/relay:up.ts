import * as ChildProcess from 'node:child_process'
import * as Fs from 'node:fs'
import * as Path from 'node:path'

type ContractsLock = {
  commit: string
  sha256: string
}

type ImageManifest = {
  digest?: string
  Digest?: string
}

const root = Path.resolve(import.meta.dirname, '..')
const repository = 'local-xyz/grid'
const image = 'ghcr.io/local-xyz/grid-relay'
const requestedRef = process.argv[2]

if (!requestedRef) {
  console.error('Usage: pnpm relay:up <grid-ref>')
  process.exit(1)
}

const commit = run('gh', [
  'api',
  `repos/${repository}/commits/${requestedRef}`,
  '--jq',
  '.sha',
])
const tag = commit.slice(0, 7)
const reference = `${image}:${tag}`
const manifest = JSON.parse(
  run('docker', [
    'buildx',
    'imagetools',
    'inspect',
    reference,
    '--format',
    '{{json .Manifest}}',
  ]),
) as ImageManifest
const digest = manifest.digest ?? manifest.Digest

if (!digest?.startsWith('sha256:'))
  throw new Error(`Could not resolve the digest for ${reference}`)

const gridContracts = JSON.parse(
  Buffer.from(
    run('gh', [
      'api',
      `repos/${repository}/contents/contracts.lock.json?ref=${commit}`,
      '--jq',
      '.content',
    ]).replaceAll('\n', ''),
    'base64',
  ).toString('utf8'),
) as ContractsLock
const portoContracts = JSON.parse(
  Fs.readFileSync(Path.resolve(root, 'contracts.lock.json'), 'utf8'),
) as ContractsLock

if (
  gridContracts.commit !== portoContracts.commit ||
  gridContracts.sha256 !== portoContracts.sha256
)
  throw new Error(
    'Grid and Porto must pin the same contract release before updating Relay.',
  )

Fs.writeFileSync(
  Path.resolve(root, 'relay.lock.json'),
  `${JSON.stringify(
    {
      commit,
      contracts: {
        commit: gridContracts.commit,
        sha256: gridContracts.sha256,
      },
      digest,
      image,
      repository,
      schema: 1,
      tag,
    },
    null,
    2,
  )}\n`,
)

const composePath = Path.resolve(root, 'compose.yaml')
const compose = Fs.readFileSync(composePath, 'utf8')
const updatedCompose = compose.replace(
  /FROM ghcr\.io\/(?:ithacaxyz\/relay:[^\s]+|local-xyz\/grid-relay@[^\s]+)/,
  `FROM ${image}@${digest}`,
)
if (updatedCompose === compose)
  throw new Error('Could not update the Relay image in compose.yaml')
Fs.writeFileSync(composePath, updatedCompose)

console.log(`Pinned ${reference} at ${digest}.`)

function run(command: string, args: string[]) {
  const result = ChildProcess.spawnSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  })
  if (result.status !== 0)
    throw new Error(`${command} ${args.join(' ')} failed`)
  return result.stdout.trim()
}
