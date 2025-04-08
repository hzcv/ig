const { IgApiClient } = require('instagram-private-api');
const { withFbns } = require('instagram_mqtt');
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const { HttpsProxyAgent } = require('https-proxy-agent');

let ig;

function initializeInstagram(username, password) {
  ig = withFbns(new IgApiClient());
  ig.state.generateDevice(username);
  return ig.account.login(username, password);
}

async function checkUsernameAvailability(targetUsername) {
  const url = `[invalid url, do not cite]
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    httpsAgent: new https.Agent({ keepAlive: true })
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    const title = $('title').text();

    if (title.includes(`@${targetUsername}`)) {
      return false; // Username is taken
    } else if (title === 'Instagram') {
      return true; // Username is available
    }
    return false; // Other cases
  } catch (error) {
    console.error('Check error:', error.message);
    return false;
  }
}

async function claimUsername(targetUsername) {
  try {
    await ig.account.editProfile({
      username: targetUsername,
      first_name: ig.state.accountUsername
    });
    return true;
  } catch (error) {
    console.error('Claim error:', error.message);
    return false;
  }
}

module.exports = {
  initializeInstagram,
  checkUsernameAvailability,
  claimUsername
};
