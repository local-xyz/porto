import * as fs from 'node:fs'
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'
import {
  anvil,
  anvil2,
  anvil3,
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  sepolia,
} from './src/core/Chains.js'
import * as anvilAddresses from './test/src/_generated/addresses.js'

// Legacy demo deployments. Keep code generation independent from a hosted Relay.
const exp1Address = '0xfCA413a634C4dF6B98ebb970A44d9a32F8f5c64E'
const exp2Address = '0xaCB60Ce1E9d71C15A34c3AFD903F552520B4A28f'

const address = {
  exp1: {
    [anvil3.id]: anvilAddresses.exp1Address,
    [anvil.id]: anvilAddresses.exp1Address,
    [anvil2.id]: anvilAddresses.exp1Address,
    [sepolia.id]: exp1Address,
    [baseSepolia.id]: exp1Address,
    [optimismSepolia.id]: exp1Address,
    [arbitrumSepolia.id]: exp1Address,
  },
  exp2: {
    [anvil3.id]: anvilAddresses.exp2Address,
    [anvil.id]: anvilAddresses.exp2Address,
    [anvil2.id]: anvilAddresses.exp2Address,
    [sepolia.id]: exp2Address,
    [baseSepolia.id]: exp2Address,
    [optimismSepolia.id]: exp2Address,
    [arbitrumSepolia.id]: exp2Address,
  },
  expNft: {
    [anvil3.id]: anvilAddresses.expNftAddress,
    [anvil.id]: anvilAddresses.expNftAddress,
    [anvil2.id]: anvilAddresses.expNftAddress,
    [baseSepolia.id]: '0xDa70DA3391054b0930a0c7Fd57f6e75b61EE5787',
    [optimismSepolia.id]: '0x1B8276D9De24FaAAdC7cB4fF626e01bD4E037E41',
  },
} as const

const examples = fs
  .readdirSync('examples')
  .filter((dir) => fs.statSync(`examples/${dir}`).isDirectory())
  .map((dir) => `examples/${dir}/src`)

export default defineConfig([
  ...['apps/wagmi/src', ...examples].map((path) => ({
    contracts: [],
    out: `${path}/contracts.ts`,
    plugins: [
      foundry({
        deployments: {
          ExperimentERC20: address.exp1[baseSepolia.id],
          ExperimentERC721: address.expNft[baseSepolia.id],
        },
        forge: {
          build: false,
        },
        getName(name) {
          if (name === 'ExperimentERC20') return 'exp1'
          if (name === 'ExperimentERC721') return 'expNft'
          return name
        },
        project: './contracts/demo',
      }),
      foundry({
        deployments: {
          ExperimentERC20: address.exp2[baseSepolia.id],
        },
        forge: {
          build: false,
        },
        getName(name) {
          if (name === 'ExperimentERC20') return 'exp2'
          return name
        },
        include: ['ExperimentERC20.json'],
        project: './contracts/demo',
      }),
    ],
  })),
  ...['apps/~internal', 'test/src'].map((path) => ({
    contracts: [],
    out: `${path}/_generated/contracts.ts`,
    plugins: [
      foundry({
        deployments: {
          ExperimentERC20: address.exp1,
          ExperimentERC721: address.expNft,
        },
        forge: {
          build: false,
        },
        getName(name) {
          if (name === 'ExperimentERC20') return 'exp1'
          if (name === 'ExperimentERC721') return 'expNft'
          return name
        },
        project: './contracts/demo',
      }),
      foundry({
        deployments: {
          ExperimentERC20: address.exp2,
        },
        forge: {
          build: false,
        },
        getName(name) {
          if (name === 'ExperimentERC20') return 'exp2'
          return name
        },
        include: ['ExperimentERC20.json'],
        project: './contracts/demo',
      }),
    ],
  })),
])
