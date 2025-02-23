./wake_seb_relay.sh

node control-centre.js &
CONTROL_PID=$!



mjpg_streamer -i "input_uvc.so -d /dev/video0 -r 1920x1080 -f 30 -n" -o "output_http.so -p 5000 -w /usr/share/mjpg-streamer/www" &
STREAM_PID=$!

cleanup(){

	kill $CONTROL_PID
	kill $STREAM_PID
}

trap cleanup EXIT INT TERM

wait
