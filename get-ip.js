const os = require('os');

const interfaces = os.networkInterfaces();
for (const name of Object.keys(interfaces)) {
  for (const intf of interfaces[name]) {
    if (intf.family === 'IPv4' && !intf.internal) {
      console.log(`📡 Local IP: ${intf.address}`);
    }
  }
}
