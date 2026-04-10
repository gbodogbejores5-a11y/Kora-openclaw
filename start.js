const { exec } = require('child_process');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Kora is running!');
});

server.listen(process.env.PORT || 10000, () => {
  console.log(`Server running on port ${process.env.PORT || 10000}`);
});

exec('openclaw gateway --port 10000 --host 0.0.0.0', { stdio: 'inherit' });