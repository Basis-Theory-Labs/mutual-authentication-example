const axios = require('axios');
const https = require('https');

const URL = 'https://localhost:8443/echo';

module.exports = async function (req) {
  const {
    args: { token },
    configuration: { CLIENT_CERTIFICATE, CLIENT_CERTIFICATE_KEY },
  } = req;

  const httpsAgent = new https.Agent({
    cert: CLIENT_CERTIFICATE,
    key: CLIENT_CERTIFICATE_KEY,

    // for testing self-signed certificates only
    rejectUnauthorized: false,
  });

  const { data } = await axios.post(
    URL,
    {
      token,
    },
    {
      headers: {
        // add custom headers here
      },
      httpsAgent,
    },
  );

  return {
    raw: {
      data,
    },
  };
};
