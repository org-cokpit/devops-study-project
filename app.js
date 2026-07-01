/* Minimal Node HTTP server for devops-study-project */
(function () {
  const http = require('http');
  const PORT = process.env.PORT || 3000;

  const server = http.createServer((req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ message: 'Hello from devops-study-project', time: new Date().toISOString() })
    );
  });

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${PORT}`);
  });

  module.exports = server;
})();
