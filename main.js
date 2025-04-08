const readline = require('readline');
const { initializeInstagram, checkUsernameAvailability, claimUsername } = require('./instagram');
const workerpool = require('workerpool');
const fs = require('fs'); // For loading proxies from a file

let config = {
  targetUsername: '',
  turboAccount: {
    username: '',
    password: ''
  },
  attempts: 20,
  threads: 5,
  useProxy: false,
  validProxies: []
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query + ' ', resolve));
}

async function main() {
  config.turboAccount.username = await askQuestion('Enter account username');
  config.turboAccount.password = await askQuestion('Enter account password');
  config.targetUsername = await askQuestion('Enter target username');
  config.threads = parseInt(await askQuestion('Number of threads'));
  const useProxyAnswer = await askQuestion('Use proxies? (y/n)');
  config.useProxy = useProxyAnswer.toLowerCase() === 'y';
  if (config.useProxy) {
    // Load proxies from a file (e.g., proxies.txt)
    const proxiesFileContent = fs.readFileSync('proxies.txt', 'utf8');
    config.validProxies = proxiesFileContent.split('\n').filter(p => p.trim() !== '');
  }
  rl.close();

  // Initialize Instagram client
  await initializeInstagram(config.turboAccount.username, config.turboAccount.password);

  // Proxy setup if enabled
  if (config.useProxy) {
    const pool = workerpool.pool(__dirname + '/worker.js');
    config.validProxies = await pool.exec('proxyChecker', [config.validProxies]);
    pool.terminate();
  }

  let claimed = false;
  while (!claimed && config.attempts-- > 0) {
    const available = await checkUsernameAvailability(config.targetUsername);
    if (available) {
      claimed = await claimUsername(config.targetUsername);
      if (claimed) console.log('Username claimed successfully!');
      else console.log('Failed to claim username.');
      break;
    }
  }

  if (!claimed) console.log('Failed to claim username after all attempts.');
}

main();
