import * as child_process from 'node:child_process'
import { cleanupRelay } from './src/prool.js'

export default async function () {
  let process_dialog: child_process.ChildProcess | undefined
  await fetch('http://localhost:5175').catch(() => {
    return new Promise<void>((resolve, reject) => {
      process_dialog = child_process.spawn(
        'pnpm',
        ['--filter', 'dialog', 'dev', '--mode', 'test'],
        {
          env: {
            ...(process as any).env,
            ...import.meta.env,
            ANVIL: (import.meta.env.VITE_DEFAULT_ENV === 'anvil').toString(),
            FORCE_REDUCED_MOTION: 'true',
          },
        },
      )
      process_dialog.stdout?.on('data', (data) => {
        if (data.toString().includes('ready')) resolve()
      })
      process_dialog.once('error', reject)
      process_dialog.once('exit', reject)
    })
  })
  // TODO: use prool Relay instance directly.
  let process_playground: child_process.ChildProcess | undefined
  if (import.meta.env.VITE_DEFAULT_ENV === 'anvil')
    await fetch('http://localhost:5173').catch(() => {
      return new Promise<void>((resolve, reject) => {
        process_playground = child_process.spawn(
          'pnpm',
          ['--filter', 'playground', 'dev', '--mode', 'test'],
          {
            env: {
              ...(process as any).env,
              ...import.meta.env,
              ANVIL: 'true',
            },
          },
        )
        process_playground.stdout?.on('data', (data) => {
          if (data.toString().includes('ready')) resolve()
        })
        process_playground.once('error', reject)
        process_playground.once('exit', reject)
      })
    })
  return () => {
    process_dialog?.kill()
    process_playground?.kill()
    if (import.meta.env.VITE_DEFAULT_ENV === 'anvil') cleanupRelay('playground')
  }
}
