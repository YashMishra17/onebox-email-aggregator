import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { addAccountHandler, listAccountsHandler } from './routes/accounts';
import { searchEmailsHandler, getEmailHandler, labelEmailHandler } from './routes/emails';
import { suggestReplyHandler } from './routes/suggest';
import { upsertHandler } from './routes/rag';

import { startAllSavedImapClients } from './imap/client';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.post('/api/accounts', addAccountHandler);
app.get('/api/accounts', listAccountsHandler);

app.get('/api/emails', searchEmailsHandler);
app.get('/api/emails/:id', getEmailHandler);
app.post('/api/emails/:id/label', labelEmailHandler);

app.post('/api/suggest-reply', suggestReplyHandler);

// RAG doc upsert
app.post('/api/rag/upsert', upsertHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`API listening on ${PORT}`);
  startAllSavedImapClients();
});
