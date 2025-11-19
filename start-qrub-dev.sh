#!/data/data/com.termux/files/usr/bin/bash

cd ~/qrub-site || exit

# Stop any previous Node server
pkill -f "nodemon server.js" 2>/dev/null
echo "🛑 Stopped any previous Node server processes."

# Stop any previous ngrok tunnels
pkill -f "ngrok" 2>/dev/null
echo "🛑 Stopped any previous ngrok processes."

# Start Node server with nodemon (auto-reload)
nohup nodemon server.js > qrub.log 2>&1 &
sleep 2
PID=$(pgrep -f "nodemon server.js")

if [ -n "$PID" ]; then
    echo "🔥 Node server started with HOT RELOAD (PID: $PID)"
    echo "📄 Node logs: ~/qrub-site/qrub.log"
    
    # Local and network access
    LOCAL_IP=$(ip -f inet addr show wlan0 2>/dev/null | awk '/inet / {print $2}' | cut -d/ -f1)
    echo "🌐 Access locally: http://127.0.0.1:3000"
    echo "🌐 Access on Wi-Fi network: http://${LOCAL_IP}:3000"

    # Start ngrok in background
    nohup ngrok http 3000 > ngrok.log 2>&1 &
    echo "🌐 Starting ngrok tunnel..."

    # Continuously display ngrok public URL
    echo "🚀 Waiting for ngrok to initialize..."
    while true; do
        NGROK_URL=$(curl --silent http://127.0.0.1:4040/api/tunnels | grep -Po '"public_url":"\K[^"]+')
        if [ -n "$NGROK_URL" ]; then
            echo "🌍 External access via ngrok: ${NGROK_URL}"
            break
        fi
        sleep 1
    done

    echo "💡 You can check ngrok logs at ~/qrub-site/ngrok.log"
    echo "🔁 nodemon will auto-reload the server on code changes."
else
    echo "❌ Node server failed to start. Check qrub.log for errors."
fi
