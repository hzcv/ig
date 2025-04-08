const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');

async function checkProxy(proxy) {
  try {
    const response = await axios.get('https://www.instagram.com/', {
      timeout: 5000,
      httpsAgent: new HttpsProxyAgent(proxy)
    });
    return response.status === 200;
  } catch {
    return false;
  }
}

async function proxyChecker(proxyList) {
  const validProxies = [];
  for (const proxy of proxyList) {
    if (await checkProxy(proxy)) {
      validProxies.push(proxy);
    }
  }
  return validProxies;
}

module.exports = {
  proxyChecker
};
