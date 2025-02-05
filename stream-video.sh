mjpg_streamer -i "input_uvc.so -d /dev/video0 -r 1280x720 -f 30 -n" -o "output_http.so -p 8080 -w /usr/share/mjpg-streamer/www"

