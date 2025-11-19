#!/data/data/com.termux/files/usr/bin/bash

cd ~/qrub-site || exit

# Stop previous Node servers
pkill -f "node server.js" 2>/dev/null
echo "🛑 Stopped previous Node server processes."

# Start Node server with nodemon in background
nohup nodemon server.js > qrub.log 2>&1 &
NODE_PID=$!
echo "🔥 Node server starting... (PID: $NODE_PID)"
sleep 2

# Check if Node server started
if ps -p $NODE_PID > /dev/null; then
    echo "✅ Node server is running (PID: $NODE_PID)"
else
    echo "❌ Node server failed to start. Check qrub.log"
    exit 1
fi

# Start ngrok HTTP tunnel in background
nohup ngrok http 3000 > ngrok.log 2>&1 &
NGROK_PID=$!
echo "🌐 ngrok tunnel starting... (PID: $NGROK_PID)"
sleep 5

# Fetch public URL from ngrok API
NGROK_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | grep -o 'https://[a-z0-9]*\.ngrok.io')
if [ -n "$NGROK_URL" ]; then
    echo "🌍 Public URL: $NGROK_URL"
else
    echo "⚠ Could not detect ngrok URL. Check ngrok.log"
fi

# Tail server logs
echo "📜 Showing live server logs (Ctrl+C to exit)"
tail -f qrub.log
