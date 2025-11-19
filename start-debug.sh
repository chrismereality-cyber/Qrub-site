#!/data/data/com.termux/files/usr/bin/bash

cd ~/qrub-site || exit

# Stop any previous Node server
pkill -f "node server.js" 2>/dev/null

echo "🛑 Stopped any previous Node server processes."

# Start Node server in foreground with live logs
echo "🔥 Starting Node server..."
node server.js
