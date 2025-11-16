// @ts-ignore
import Imap from 'imap';
import { simpleParser } from 'mailparser';
import { DateTime } from 'luxon';
import { indexEmail } from '../indexer';
import { v4 as uuidv4 } from 'uuid';

export type ImapAccount = { id: string; host: string; port: number; tls: boolean; user: string; password: string };
const accountsStore: Record<string, ImapAccount> = {};
const connections: Record<string, Imap> = {};

export function addAccountToStore(cfg: ImapAccount) {
  accountsStore[cfg.id] = cfg;
  // Start client immediately
  startImapClient(cfg);
}
export function listAccountsFromStore() { return Object.values(accountsStore).map(a=>({ id: a.id, user: a.user })); }

export function startAllSavedImapClients() {
  Object.values(accountsStore).forEach(startImapClient);
}

function startImapClient(accountConfig: ImapAccount) {
  try {
    const imap = new Imap({
      user: accountConfig.user,
      password: accountConfig.password,
      host: accountConfig.host,
      port: accountConfig.port,
      tls: accountConfig.tls,
      connTimeout: 10000,
      keepalive: true
    });
    connections[accountConfig.id] = imap;

    imap.once('ready', () => {
        ... (truncated for brevity)
