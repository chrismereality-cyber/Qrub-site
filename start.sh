#!/data/data/com.termux/files/usr/bin/bash

# Navigate to project
cd ~/qrub-site || exit

# Stop any running Node server
pkill -f "node server.js" 2>/dev/null
pkill -f "nodemon server.js" 2>/dev/null

# Start server with nodemon for auto-reload
echo "🔥 Starting QRUB server with HOT RELOAD..."
nohup nodemon server.js > qrub.log 2>&1 &

echo "✅ Server started with auto-reload."
echo "📄 Log file: ~/qrub-site/qrub.log"
echo "🌐 Access your dashboard at http://localhost:3000 or use your device IP"
