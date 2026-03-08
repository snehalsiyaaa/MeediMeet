const { Vonage } = require('@vonage/server-sdk');
const { Auth } = require('@vonage/auth');
const fs = require('fs');

const privateKeyPath = require('path').resolve(process.cwd(), 'lib/private.key');
const resolvedPrivateKey = fs.readFileSync(privateKeyPath, 'utf8');

const credentials = new Auth({
  applicationId: '0258ecb4-546a-442c-8e98-736476af32e1',
  privateKey: resolvedPrivateKey,
});

const vonage = new Vonage(credentials);

async function run() {
  try {
    const session = await vonage.video.createSession({ mediaMode: "routed" });
    console.log('Session:', session);
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
