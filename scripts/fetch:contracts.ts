import { fetchContracts } from './contracts.js'

const contracts = await fetchContracts()
console.log(`Using contracts at ${contracts.directory}`)
