#!/data/data/com.termux/files/usr/bin/bash

cd ~/qrub-site || exit

# Stop any running Node server
pkill -f "nodemon server.js" 2>/dev/null
pkill -f "node server.js" 2>/dev/null

# Start server with Nodemon (auto-reload)
echo "🔥 Starting QRUB server with HOT RELOAD..."
nohup nodemon server.js > qrub.log 2>&1 &

echo "✅ Server started with auto-reload."
echo "📄 Log file: ~/qrub-site/qrub.log"
echo "🌐 Access: http://localhost:3000"
