const http = require('http');

let server;

function request(pathname) {
  return new Promise((resolve, reject) => {
    const { port } = server.address();

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: pathname,
        method: 'GET'
      },
      (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body
          });
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

beforeAll(() => {
  process.env.PORT = '0';
  // Ensure each test run gets a fresh server instance.
  jest.resetModules();
  server = require('../app');
});

afterAll((done) => {
  server.close(done);
});

test('GET / returns hello payload with ISO timestamp', async () => {
  const response = await request('/');

  expect(response.statusCode).toBe(200);
  expect(response.headers['content-type']).toContain('application/json');

  const payload = JSON.parse(response.body);
  expect(payload.message).toBe('Hello from devops-study-project');
  expect(typeof payload.time).toBe('string');
  expect(Number.isNaN(Date.parse(payload.time))).toBe(false);
});

test('GET /health returns app health status', async () => {
  const response = await request('/health');

  expect(response.statusCode).toBe(200);
  expect(response.headers['content-type']).toContain('application/json');

  const payload = JSON.parse(response.body);
  expect(payload.status).toBe('ok');
  expect(typeof payload.uptime).toBe('number');
  expect(payload.uptime).toBeGreaterThanOrEqual(0);
});
