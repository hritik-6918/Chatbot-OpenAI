<<<<<<< HEAD
import { Client, Users } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);

  try {
    const response = await users.list();
    // Log messages and errors to the Appwrite Console
    // These logs won't be seen by your end users
    log(`Total users: ${response.total}`);
  } catch(err) {
    error("Could not list users: " + err.message);
  }

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
=======
import OpenAI from 'openai';
import { getStaticFile, throwIfMissing } from './utils.js';

export default async ({ req, res }) => {
  throwIfMissing(process.env, ['OPENAI_API_KEY']);

  if (req.method === 'GET') {
    return res.text(getStaticFile('index.html'), 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }

  try {
    throwIfMissing(req.body, ['prompt']);
  } catch (err) {
    return res.json({ ok: false, error: err.message }, 400);
  }

  const openai = new OpenAI();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS ?? '512'),
      messages: [{ role: 'user', content: req.body.prompt }],
    });
    const completion = response.choices[0].message.content;
    return res.json({ ok: true, completion }, 200);
  } catch (err) {
    return res.json({ ok: false, error: 'Failed to query model.' }, 500);
  }
>>>>>>> e8be25b (commit done)
};
