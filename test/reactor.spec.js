const fs = require('fs');
const { v4: uuid } = require('uuid');

const reactor = require('../reactor');
const { createTestServer } = require('./server');

describe('mutual authentication', function () {
  let server;

  beforeAll(() => {
    server = createTestServer();
  });

  test('should invoke echo server with mutual authentication', async () => {
    const token = uuid();
    const res = await reactor({
      args: { token },
      configuration: {
        CLIENT_CERTIFICATE: fs
          .readFileSync('test/fixtures/client-cert.pem')
          .toString(),
        CLIENT_CERTIFICATE_KEY: fs
          .readFileSync('test/fixtures/client-key.pem')
          .toString(),
      },
    });

    expect(res.raw.data.token).toStrictEqual(token);
  });

  afterAll(() => {
    server.close();
  });
});
