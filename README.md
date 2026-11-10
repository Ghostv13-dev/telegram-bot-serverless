# Reusable Telegram Bot Template

A small, reusable Telegram bot starter built for [Telegram Serverless](https://core.telegram.org/bots/serverless). It runs on Telegram infrastructure, uses the built-in SQLite-backed database, and needs no webhook server or always-on host.

## Included

- `/start` and `/help` starter commands
- `/remember <text>` for compact per-chat persistent notes
- `/memory` to read stored information
- Message counter stored in the built-in database
- Separate schema, shared library, and update handler files
- No external runtime packages

## Setup

1. In BotFather, enable **Serverless** for the bot and copy its CLI access token.
2. Install dependencies with `npm install`.
3. Link this folder with `npm run login`.
4. Review local changes with `npm run status`.
5. Deploy code with `npm run deploy`.
6. Apply the database schema with `npm run migrate`.

For local handler testing, use for example:

```bash
npm run run -- handlers/message '{ chat: { id: 1 }, text: "/help" }'
```

## Customize it

- Add update handlers inside `tgcloud/handlers/`.
- Put reusable behavior in `tgcloud/lib/`.
- Add tables in `tgcloud/schema.js`, then run `npm run deploy` followed by `npm run migrate`.
- Keep stored data small and scoped to the chat or user that owns it.

The `.tgcloud/` directory contains local CLI credentials and should never be committed.
