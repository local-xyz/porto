# Playground Anvil Lifecycle Design

## Problem

The playground Vite plugin starts Anvil through Prool but discards the stop
function returned by `start()`. Prool cleans up the child when the Vite process
exits normally, but a Vite in-process server restart can leave that Anvil
running. The restarted plugin then fails because port 8545 is still occupied.

The upstream Porto implementation has the same lifecycle gap. The LocalXYZ fork
already stops Relay when the Vite HTTP server closes, but does not stop Anvil.

## Desired behavior

- Stop the Anvil instance owned by the playground when its Vite HTTP server
  closes or restarts.
- Keep a concurrent second `pnpm dev:anvil` launch as an error. It must not stop
  or reuse the first stack.
- Preserve the existing Relay lifecycle behavior.
- Do not attempt to handle `SIGKILL`, because the process cannot run cleanup
  code for that signal.

## Design

Capture the stop function returned by the existing Anvil `start()` call. Register
it immediately with a one-time `close` listener on `server.httpServer`, using the
same callback style as the existing Relay cleanup.

Registering the listener immediately after Anvil starts ensures cleanup is
available even if Relay initialization later fails. Keep the Anvil and Relay
listeners separate so the change remains small and follows the current code.

Do not add port probing, process discovery, PID files, signal handlers, or
automatic takeover. Those approaches add cross-process ownership decisions that
are unnecessary for the requested lifecycle behavior.

## Error handling

An occupied port remains a startup error. This is correct for a genuinely
concurrent second stack and avoids terminating an unrelated process.

Normal Vite shutdown and restart invoke the owned Anvil stop function. Prool's
existing process cleanup remains a fallback when the parent Vite process exits.

## Verification

1. Start `pnpm dev:anvil` and verify Anvil listens on port 8545.
2. Trigger a Vite server restart and verify the stack restarts without an
   `Address already in use` error.
3. Stop the stack with Ctrl-C and verify port 8545 and the `playground` Relay
   container are released.
4. While one stack is running, start a second stack and verify it still fails
   rather than taking ownership of the first stack.
5. Run the relevant type check for the playground configuration.
