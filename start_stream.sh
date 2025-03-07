#!/bin/bash


export DISPLAY=:0


echo "opening browser"
xdotool key "alt+1"
xdotool key "alt+space"
sleep 1
xdotool type "brave"
sleep 1
xdotool key "enter"

echo "browser open"

echo "wating for browser"


sleep 8

xdotool key "Escape"

xdotool key "alt+f"
sleep 2

echo "creating discord tab"

xdotool key "t";
sleep 1

xdotool type "discord.com/channels/@me"
xdotool key "enter"

echo "discord tab is open trying to join server"
echo "(waiting for discord to load)"
sleep 10

xdotool key "ctrl+shift+j"

sleep 2


xdotool type "[...document.querySelectorAll('*')].filter(s => s.innerHTML == 'g')[0].click()"

xdotool key "enter"


echo "clicked server ready to join"

sleep 2

xdotool type "[...document.querySelectorAll('*')].filter(s => s.innerHTML == 'Allgemein')[1].click()"
xdotool key "enter"

echo "joined server waiting for stream"

sleep 2

xdotool mousemove 753 193 
xdotool click 1
sleep 1

echo "starting to stream just hang on"

xdotool mousemove 206 1011 
xdotool click 1
sleep 1

echo "selecting screen 1"

xdotool mousemove 1134 132
xdotool click 1
sleep 1

echo "confirming choices"

xdotool mousemove 863 238
xdotool click 1
sleep 1

echo "last clicks"

xdotool mousemove 1235 590
xdotool click 1
sleep 1


echo "stream should now be online"

echo "starting input servers"

echo "######" > server.log
echo "date : $(date)"> server.log
echo "######" > server.log


node index.js > server.log 2>&1 & 
SERVER_PID=$!

echo "input server is running"
echo "opening input server"

cloudflared tunnel run tunnel1 &
TUNNEL_PID=$!

cleanup(){
	echo "stopping server and tunnel"

	kill $SERVER_PID 
	kill $TUNNEL_PID

}

echo "input server is now online"

trap cleanup EXIT INT TERM


wait
