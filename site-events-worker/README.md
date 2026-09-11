# Kelvin site visit reports

Cloudflare Worker that accepts privacy-limited visit events from the Kelvin
Vercel deployment and forwards them to Telegram.

The public production origin is `https://kelvin-iota.vercel.app`; technical
Vercel deployment URLs for this project are also accepted.

Required Worker secrets:

```sh
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

The bot token and chat ID must never be committed or added to browser code.
