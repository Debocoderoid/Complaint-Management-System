const test = require('node:test');
const assert = require('node:assert/strict');
const { aiConfigured } = require('../server/ai');

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
