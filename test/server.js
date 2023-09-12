const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const https = require('https');

const createTestServer = () => {
  const app = express();
  const port = 8443;

  const options = {
    key: fs.readFileSync('test/fixtures/server-key.pem'), // Your server's private key file
    cert: fs.readFileSync('test/fixtures/server-cert.pem'), // Your server's SSL certificate file
    ca: [fs.readFileSync('test/fixtures/client-cert.pem')], // The CA certificate used to sign client certificates
    requestCert: true, // Request client certificates
    rejectUnauthorized: true, // Reject connections without a valid client certificate
  };

  app.use(bodyParser.json());

  app.post('/echo', (req, res) => {
    if (!req.client.authorized) {
      res.status(403).send('Forbidden');
      return;
    }

    const jsonData = req.body;
    if (jsonData) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(jsonData);
    } else {
      res.status(400).send('Bad Request: Invalid JSON data');
    }
  });

  const server = https.createServer(options, app);

  server.listen(port);

  return server;
};

module.exports = { createTestServer };
