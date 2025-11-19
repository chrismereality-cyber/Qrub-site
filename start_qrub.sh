#!/data/data/com.termux/files/usr/bin/bash
# start_qrub.sh - Start QRUB server in Termux

echo "🚀 Starting QRUB server..."
cd ~/qrub-site

# Kill any existing server.js node process
pkill -f "node server.js" 2>/dev/null

# Start server in background
nohup node server.js > qrub.log 2>&1 &

echo "✅ QRUB server started."
echo "📡 Find your local IP with: node get-ip.js"
