# Service - A collection of Cloudflare Workers Route

Swiss Knife Worker for Porto Services

## Routes

- `/cors`
- `/verify`

## Commands

### Development

```sh
pnpm --filter service dev
```

### Add a secret

```sh
echo <VALUE> | pnpm wrangler secret put <KEY> --name='service'
```

### Delete a secret

```sh
pnpm wrangler secret delete <KEY> --name='service'
```

### Remove a secret

```sh
pnpm wrangler secret delete <KEY> --name='service'
```

### Deploy

```sh
pnpm --filter service deploy
```


## LocalProtocol Coinbase sandbox

`wrangler.staging.json` builds the existing order flow as a dedicated Worker with
only `/health` and `/onramp/orders`. It starts disabled, has no routes, disables
workers.dev and preview URLs, and contains no credentials. Do not deploy using
the upstream `wrangler.json` account. Health only confirms the Worker is running;
it does not attest that Coinbase or Relay is configured.

The implemented flow is **sandbox only**. It cannot charge a card, fund Base
Sepolia, or approve a pending wallet transaction. It requests simulated Base USDC
orders and labels that limitation in the dialog. `ONRAMP_SANDBOX=false` refuses
all orders; production settlement is deliberately unavailable.

| Worker input | Required value / purpose |
| --- | --- |
| `ONRAMP_ENABLED` | `true` only after operator setup; otherwise disabled |
| `ONRAMP_SANDBOX` | `true` |
| `ONRAMP_RELAY_URL` | Explicit HTTPS staging Relay URL; no default or fallback |
| `ONRAMP_CHAIN_ID` | `84532`, the account authorization chain |
| `ONRAMP_DESTINATION_NETWORK` | `base`, Coinbase's simulated destination network |
| `ONRAMP_ALLOWED_ORIGINS` | Comma-separated exact origins; initially `https://id-staging.localprotocol.xyz` |
| `CB_API_KEY_ID`, `CB_API_KEY_SECRET` | Worker secrets: CDP key ID and 64-byte base64 Ed25519 secret |
| `ONRAMP_SECRET` | Worker secret matching Relay's `ONRAMP_WORKER_SECRET` |
| `RATE_LIMITER` | Existing Workers binding API; staging namespace 1002, 10 requests / 60 seconds per IP and account |

Build the dialog with `VITE_ONRAMP_OPTIONS=apple`,
`VITE_ONRAMP_URL=https://<operator-selected-service-host>/onramp`, and the existing
staging Relay selection (`VITE_DEFAULT_ENV=stg` / `relayEnv=stg`). Both feature
inputs are required and only chain 84532 shows the checkout. All `VITE_` inputs
are public; never put secrets in them. The Worker and dialog must use the same
staging Relay. No hostname has been published by this change.

Relay account methods require `RESEND_API_KEY`, `EMAIL_SENDER`,
`PORTO_BASE_URL`, and `ONRAMP_WORKER_SECRET`. Phone verification additionally
requires `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and
`TWILIO_VERIFY_SERVICE_SID`. Both pinned Grid `029d350163e18735f0d18dc09ea46cbc19d5cfc6`
and reviewed HEAD `c4712f17` read those three Twilio variables when launched with
`--config-only`. Checkout additionally requires the new `emailVerifiedAt` field in
`account_getOnrampContactInfo`, paired with the verified email selected by Relay.
The locked old image does not provide this field: **leave checkout disabled
until the patched Relay image is built, tested, and released**. Both old
`account_onrampStatus.email` and old contact email may fall back to an unverified
record; neither is verification evidence. The Worker rejects missing or future
email verification timestamps. Only phone verification expires after 60 days.
The existing email confirmation link and phone OTP must complete; after sending
email, the dialog waits and polls for its actual verified timestamp. Sending email
or completing phone OTP alone cannot finish email setup. The UI never manufactures
verification timestamps. Permit Relay egress to Resend,
Twilio Verify and Lookup; permit Worker access to the configured Relay and CDP.

The June 30, 2026 deprecation concerns guest checkout in the Coinbase-hosted
widget. This implementation uses the v2 headless Orders API, which Coinbase
recommends as its replacement; see the [current Onramp overview](https://docs.cdp.coinbase.com/onramp/onramp-overview).

Coinbase setup: use the production CDP API key for headless sandbox. Sandbox is
selected by the `sandbox-` user-reference prefix at the normal API endpoint.
The returned Apple Pay link gets `useApplePaySandbox=true`. For the public staging
hostname, arrange Onramp access, add the exact rendering hostname to the CDP
Onramp domain allowlist, and serve the Coinbase-provided domain-verification
file. Do not invent that file or register this hostname under another Apple
Merchant ID. Localhost has a separate sandbox exemption.
See [Coinbase headless documentation](https://docs.cdp.coinbase.com/onramp/headless-onramp/overview)
and [Create Order API](https://docs.cdp.coinbase.com/api-reference/v2/rest-api/onramp/create-an-onramp-order).

### Authorization and limits

On an explicit click after consent text, the dialog uses its stored account's
admin key to sign the message in `src/lib/onramp-authorization.ts` via
`Account.sign(..., { wrap: false })`. It uses an EIP-191 message digest wrapped
in the account's ERC1271 replay-safe digest, matching Grid's
`wallet_verifySignature` implementation. It does not use an outer application's
provider or session key. The Worker checks this signature **before** requesting
contact information. The signed fields bind origin, account, USD amount, chain,
and issue time; requests expire after 120 seconds. Agreement acceptance uses
that explicit signed consent time, independently of phone verification.

The JSON body is `{address, amount, chainId, issuedAt, signature}`; amount is a
USD decimal string with at most two fractional digits. Client domain, network,
and sandbox overrides are rejected. Payment links must have Coinbase's exact
HTTPS origin. Messages must come from the active iframe; authorization events
never signal funding and sandbox completion never invokes `onApprove`.

This minimal sandbox integration has no durable nonce store: a captured signed
request can be replayed during its two-minute validity window, subject to rate
limits. Workers rate limits are local to a Cloudflare location, not a global
financial quota. Any later production implementation needs replay/idempotency
storage and trusted settlement reconciliation before being enabled. Upstream
errors, PII and signed payment URLs are not logged or returned as error detail.
The separate Relay SMS/email endpoints still need operator abuse protection;
this Worker's limiter does not cover those endpoints.

### Verification

From the repository root:

```sh
pnpm exec vitest run --config apps/service/vitest.config.ts
pnpm exec tsc --noEmit -p apps/service/tsconfig.json
pnpm --dir apps/service exec wrangler deploy --dry-run --config wrangler.staging.json
```

The existing pull-request and main verification workflow runs the service type
check and this dedicated test suite in its independent `Onramp sandbox` job.
It needs no provider credentials or deployed Relay.

The tests mock all external calls and cover fail-closed configuration, exact
origins/preflight, stale/wrong-chain signatures, ordering of authorization and
contact access, rate limits, contact freshness, sandbox payloads, hostile links,
redacted errors, body limits, iframe source filtering and the raw admin signature
format. They do not prove live Coinbase approval, domain verification, passkey
behavior, SMS/email delivery, or a real browser checkout. An attended test using
the real staging account must qualify those after credentials and domain setup.
