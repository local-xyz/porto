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

// Generate the production contracts from the release pinned by contracts.lock.json.
const contracts = await fetchContracts()
const releaseContracts = {
  account: 'Account',
  account_new: 'AccountNew',
  account_old: 'AccountOld',
  account_proxy: 'EIP7702Proxy',
  escrow: 'Escrow',
  experiment_erc20: 'ExperimentERC20',
  experiment_erc721: 'ExperimentERC721',
  layerzero_settler: 'LayerZeroSettler',
  multi_sig_signer: 'MultiSigSigner',
  orchestrator: 'Orchestrator',
  simple_funder: 'SimpleFunder',
  simple_settler: 'SimpleSettler',
  simulator: 'Simulator',
} as const

for (const [artifact, name] of Object.entries(releaseContracts))
  await writeContract(name, await readArtifact(contracts, artifact))
