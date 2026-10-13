import * as Fs from 'node:fs/promises'
import * as Path from 'node:path'

import { buildContracts, readArtifact } from './contracts.js'

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

// Foundry contract name -> generated module name.
const contracts = {
  Account: 'IthacaAccount',
  AccountNew: 'IthacaAccountNew',
  AccountOld: 'IthacaAccountOld',
  EIP7702Proxy: 'EIP7702Proxy',
  Escrow: 'Escrow',
  ExperimentERC20: 'ExperimentERC20',
  ExperimentERC721: 'ExperimentERC721',
  LayerZeroSettler: 'LayerZeroSettler',
  MultiSigSigner: 'MultiSigSigner',
  Orchestrator: 'Orchestrator',
  SimpleFunder: 'SimpleFunder',
  SimpleSettler: 'SimpleSettler',
  Simulator: 'Simulator',
} as const

// Build the contracts pinned by `scripts/contracts.ts`.
const checkout = buildContracts()

for (const [contract, name] of Object.entries(contracts)) {
  const { abi, bytecode } = readArtifact(checkout, contract)

  let code = ''
  code += `export const abi = ${JSON.stringify(abi, null, 2)} as const;\n\n`
  code += `export const code = ${JSON.stringify(
    bytecode.object,
    null,
    2,
  )} as const;\n`

  const out = Path.resolve(
    import.meta.dirname,
    `../src/core/internal/_generated/contracts/${name}.ts`,
  )

  await Fs.writeFile(out, code)
}
