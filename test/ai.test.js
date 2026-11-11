const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { aiConfigured, CATEGORIES } = require('../server/ai');

test('AI configuration follows the documented AI_API_KEY setting', (t) => {
  const previousApiKey = process.env.AI_API_KEY;
  const previousGeminiKey = process.env.GEMINI_API_KEY;
  t.after(() => {
    if (previousApiKey === undefined) delete process.env.AI_API_KEY;
    else process.env.AI_API_KEY = previousApiKey;
    if (previousGeminiKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previousGeminiKey;
  });

  delete process.env.GEMINI_API_KEY;
  process.env.AI_API_KEY = 'test-key';
  assert.equal(aiConfigured(), true);

  delete process.env.AI_API_KEY;
  process.env.GEMINI_API_KEY = 'test-key';
  assert.equal(aiConfigured(), false);
});

test('AI categories match the complaint form categories', () => {
  const formPath = path.join(__dirname, '..', 'web', 'HTML', 'STUDENTS', 'raise_complaint.html');
  const html = fs.readFileSync(formPath, 'utf8');
  const select = html.match(/<select id="category"[^>]*>([\s\S]*?)<\/select>/);
  assert.ok(select, 'complaint category field exists');
  const formCategories = Array.from(select[1].matchAll(/<option(?:\s[^>]*)?>([\s\S]*?)<\/option>/g))
    .map((match) => match[1].replace(/&amp;/g, '&').trim())
    .filter((name) => name && !name.startsWith('--'));
  assert.deepEqual([...formCategories].sort(), [...CATEGORIES].sort());
});
