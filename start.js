const { exec, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

// Serveur HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Kora is running!');
});
server.listen(process.env.PORT || 10000, () => {
  console.log(`Server running on port ${process.env.PORT || 10000}`);
});

// Restaurer la configuration si elle n'existe pas
const configDir = '/opt/render/project/.openclaw';
if (!fs.existsSync(configDir)) {
  console.log('📦 Restoring Kora configuration...');
  exec('tar -xzvf kora-full-backup.tar.gz -C /opt/render/project/', (err) => {
    if (err) console.error('Restore error:', err);
    else console.log('✅ Configuration restored!');
  });
}

// Lancer OpenClaw
console.log('🚀 Starting OpenClaw Gateway...');
spawn('openclaw', ['gateway', '--port', '10000', '--host', '0.0.0.0'], { 
  stdio: 'inherit', 
  shell: true,
  env: { ...process.env, OPENCLAW_STATE_DIR: configDir }
});