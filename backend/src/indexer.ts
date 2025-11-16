import { es, ensureIndex } from './lib/elastic';
import OpenAI from 'openai';
import { sendSlack, triggerWebhook } from './notifier';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Ensure index on startup
ensureIndex().catch(console.error);

export async function indexEmail({ accountId, folder, parsed }: any) {
  const bodyText = parsed.text || parsed.html || parsed.subject || '';
  const doc = {
    account: accountId,
    folder,
    from: parsed.from?.text || '',
    to: parsed.to?.text || '',
    subject: parsed.subject || '',
    body: bodyText,
    snippet: (bodyText || '').slice(0, 400),
    received_at: parsed.date || new Date().toISOString(),
    raw: parsed.html || parsed.text
  };

  const label = await classifyEmail(bodyText, parsed.subject || '');
  const esDoc = { ...doc, label };

  try {
    const res = await es.index({ index: 'emails_v1', body: esDoc, refresh: 'wait_for' });
    // Notify if interested
    if (label === 'Interested') {
      await sendSlack(esDoc);
      await triggerWebhook(esDoc);
    }
    return res;
  } catch (e) {
    console.error('ES index error', e);
    throw e;
  }
}

// Deterministic classification: few-shot + strict label return
async function classifyEmail(body: string, subject: string) {
  const prompt = `You are an assistant that must classify the email into exactly one of the labels: Interested, Meeting Booked, Not Interested, Spam, Out of Office.
Return only the label (no extra text).
Subject: ${subject}
Body: ${body.replace(/\n/g,' ')}
Label:`;
  try {
    const r = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 8,
      temperature: 0
    });
    const text = r.choices?.[0]?.message?.content?.trim() || '';
    const allowed = ['Interested','Meeting Booked','Not Interested','Spam','Out of Office'];
    return allowed.includes(text) ? text : 'Not Interested';
  } catch (e) {
    console.error('classification error', e);
    return 'Not Interested';
  }
}
