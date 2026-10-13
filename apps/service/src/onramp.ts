import { Hono } from 'hono'
import { secureHeaders } from 'hono/secure-headers'
import { onrampApp } from './routes/onramp'

// Dedicated staging entrypoint; do not publish unrelated Porto service routes.
const app = new Hono<{ Bindings: Cloudflare.Env }>()
app.use(secureHeaders())
app.get('/health', (c) => c.text('ok'))
app.route('/onramp', onrampApp)
export default app
