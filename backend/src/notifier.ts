import fetch from 'node-fetch';
export async function sendSlack(emailDoc: any) {
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  if (!slackUrl) return;
  const text = `*Interested* lead from ${emailDoc.from}\nSubject: ${emailDoc.subject}\nSnippet: ${emailDoc.snippet}\nAccount: ${emailDoc.account}`;
  try {
    await fetch(slackUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
  } catch (e) {
    console.error('slack send error', e);
  }
}
export async function triggerWebhook(emailDoc: any) {
  const webhookUrl = process.env.WEBHOOK_SITE_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(emailDoc) });
  } catch (e) {
    console.error('webhook send error', e);
  }
}
