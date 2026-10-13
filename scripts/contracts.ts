import { execFileSync } from 'node:child_process'
import * as Fs from 'node:fs'
import * as Os from 'node:os'
import * as Path from 'node:path'

/**
 * Pinned LocalXYZ contracts source.
 *
 * Bump `commit`, run `pnpm build:contracts`, and commit the regenerated files
 * under `src/core/internal/_generated/contracts`.
 *
 * Set `CONTRACTS_PATH` to a clean checkout of `local-xyz/contracts` at
 * `commit` to build from it instead of fetching.
 */
const repository = 'https://github.com/local-xyz/contracts.git'
export const commit = '1acf5122f438930ba03ec82ff123fe682ce70195'

type ContractArtifact = {
  abi: readonly unknown[]
  bytecode: {
    object: string
  }
}

export function buildContracts() {
  const checkout = prepareCheckout()
  execFileSync('forge', ['build', '--quiet'], { cwd: checkout })
  return checkout
}

export function readArtifact(checkout: string, name: string): ContractArtifact {
  const artifact = JSON.parse(
    Fs.readFileSync(
      Path.join(checkout, 'out', `${name}.sol`, `${name}.json`),
      'utf8',
    ),
  ) as ContractArtifact
  if (
    !Array.isArray(artifact.abi) ||
    typeof artifact.bytecode?.object !== 'string' ||
    artifact.bytecode.object.length <= 2
  )
    throw new Error(`The ${name} artifact has no ABI or bytecode.`)
  return artifact
}

function prepareCheckout() {
  const configured = process.env.CONTRACTS_PATH
  if (configured) {
    validateCheckout(configured)
    return configured
  }
  const cache = Path.join(Os.tmpdir(), 'porto-contracts')
  const path = Path.join(cache, commit)
  if (Fs.existsSync(path)) {
    validateCheckout(path)
    return path
  }
  Fs.mkdirSync(cache, { recursive: true })
  const temporaryPath = Fs.mkdtempSync(Path.join(cache, `${commit}.`))
  try {
    execFileSync('git', ['init', '--quiet'], { cwd: temporaryPath })
    execFileSync('git', ['remote', 'add', 'origin', repository], {
      cwd: temporaryPath,
    })
    execFileSync('git', ['fetch', '--depth', '1', 'origin', commit], {
      cwd: temporaryPath,
      stdio: 'inherit',
    })
    execFileSync('git', ['checkout', '--detach', '--quiet', 'FETCH_HEAD'], {
      cwd: temporaryPath,
    })
    execFileSync(
      'git',
      [
        'submodule',
        'update',
        '--init',
        '--recursive',
        '--depth',
        '1',
        '--quiet',
      ],
      { cwd: temporaryPath },
    )
    validateCheckout(temporaryPath)
    Fs.renameSync(temporaryPath, path)
    return path
  } catch (error) {
    Fs.rmSync(temporaryPath, { force: true, recursive: true })
    throw error
  }
}

function validateCheckout(checkout: string) {
  const status = execFileSync('git', ['status', '--porcelain'], {
    cwd: checkout,
    encoding: 'utf8',
  }).trim()
  if (status) throw new Error('The contracts checkout must be clean.')
  const head = execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: checkout,
    encoding: 'utf8',
  }).trim()
  if (head !== commit)
    throw new Error(
      `The contracts checkout must be at ${commit}, received ${head}.`,
    )
  const uninitialized = execFileSync(
    'git',
    ['submodule', 'status', '--recursive'],
    { cwd: checkout, encoding: 'utf8' },
  )
    .split('\n')
    .some((line) => line.startsWith('-'))
  if (uninitialized)
    throw new Error('The contracts checkout has uninitialized submodules.')
}
