import * as Fs from 'node:fs/promises'
import * as Path from 'node:path'

import {
  type ContractArtifact,
  fetchContracts,
  readArtifact,
} from './contracts.js'

await Fs.rm(
  Path.resolve(
    import.meta.dirname,
    '../src/core/internal/_generated/contracts',
  ),
  { force: true, recursive: true },
)
await Fs.mkdir(
  Path.resolve(
    import.meta.dirname,
    '../src/core/internal/_generated/contracts',
  ),
  {
    recursive: true,
  },
)

async function writeContract(name: string, artifact: ContractArtifact) {
  let code = ''
  code += `export const abi = ${JSON.stringify(artifact.abi, null, 2)} as const;\n\n`
  code += `export const code = ${JSON.stringify(
    artifact.bytecode.object,
    null,
    2,
  )} as const;\n`

  const out = Path.resolve(
    import.meta.dirname,
    `../src/core/internal/_generated/contracts/${name}.ts`,
  )

  await Fs.writeFile(out, code)
}

async function writeFoundryContracts(outPath: string) {
  for (const file of await Fs.readdir(outPath)) {
    const path = Path.resolve(outPath, file)
    const name = Path.basename(path, '.json')
    await writeContract(name, JSON.parse(await Fs.readFile(path, 'utf-8')))
  }
}

// Generate the production contracts from the release pinned by contracts.lock.json.
const contracts = await fetchContracts()
const releaseContracts = {
  account: 'Account',
  account_new: 'AccountNew',
  account_old: 'AccountOld',
  account_proxy: 'EIP7702Proxy',
  escrow: 'Escrow',
  layerzero_settler: 'LayerZeroSettler',
  multi_sig_signer: 'MultiSigSigner',
  orchestrator: 'Orchestrator',
  simple_funder: 'SimpleFunder',
  simple_settler: 'SimpleSettler',
  simulator: 'Simulator',
} as const

for (const [artifact, name] of Object.entries(releaseContracts))
  await writeContract(name, await readArtifact(contracts, artifact))

// Generate Porto-owned demo contracts from local Foundry artifacts.
for await (const file of Fs.glob(
  Path.resolve(import.meta.dirname, '../contracts/demo/src/**/*.sol'),
)) {
  const name = Path.basename(file)
  const outPath = Path.resolve(
    import.meta.dirname,
    '../contracts/demo/out',
    name,
  )
  await writeFoundryContracts(outPath)
}
