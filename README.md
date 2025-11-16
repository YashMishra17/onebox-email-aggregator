# Onebox - Option B (Practical full-feature)

## Prerequisites
- Node.js 18+
- npm
- Docker & Docker Compose
- OpenAI API key
- Two IMAP accounts (Mailtrap recommended for testing)

## Quick start
1. Copy `.env.example` → `.env` and set `OPENAI_API_KEY`, optional `SLACK_WEBHOOK_URL`, `WEBHOOK_SITE_URL`.
2. Start Elasticsearch:
   ```bash
   docker compose up -d
   ```
3. Backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
4. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
5. Use Postman or the frontend UI to add IMAP accounts (POST `/api/accounts`) — add two.
6. Send test emails to those IMAP inboxes.
7. Search, filter, label, and use Suggest Reply.

## Postman
Import `postman_collection.json` in repo to test endpoints.

## Demo checklist (5 min)
1. Start Docker Elasticsearch.
2. Start backend & frontend.
3. POST /api/accounts (two accounts).
4. Send email => show immediate indexing (no cron).
5. Filter/search UI open in Chrome.
6. Label as Interested => Slack / webhook.site receives payload.
7. POST /api/suggest-reply => receive reply.

## Security note
This is a demo. Do not commit `.env`. For production, secure ES, use OAuth for Gmail, store secrets securely, enable TLS.
