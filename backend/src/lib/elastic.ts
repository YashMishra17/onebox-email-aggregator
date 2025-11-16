import { Client } from '@elastic/elasticsearch';
const ES_URL = process.env.ES_URL || 'http://localhost:9200';
export const es = new Client({ node: ES_URL });

export async function ensureIndex() {
  try {
    const { body: exists } = await es.indices.exists({ index: 'emails_v1' });
    if (!exists) {
      await es.indices.create({ index: 'emails_v1', body: {
        mappings: {
          properties: {
            account: { type: 'keyword' },
            folder: { type: 'keyword' },
            from: { type: 'keyword' },
            to: { type: 'keyword' },
            subject: { type: 'text' },
            body: { type: 'text' },
            snippet: { type: 'text' },
            received_at: { type: 'date' },
            label: { type: 'keyword' },
            raw: { type: 'text' }
          }
        }
      } });
      console.log('Created index emails_v1');
    }
  } catch (e) {
    console.error('ensureIndex error', e);
  }
}
