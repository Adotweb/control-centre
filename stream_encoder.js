const {WebSocket} = require('ws');


const MJPEG_URL = 'http://localhost:5000/?action=stream'; // MJPEG-Streamer URL
const PORT = 3000;

const ws = new WebSocket("wss://localhost-njg5.onrender.com/stream");

console.log(`WebSocket MJPEG relay running on ws://localhost:${PORT}`);

async function streamMJPEG(ws) {
    try {
        const response = await fetch(MJPEG_URL);
        if (!response.ok) throw new Error(`Failed to fetch MJPEG stream: ${response.status}`);

        const reader = response.body.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            ws.send(value);
        }

    } catch (error) {
        console.error("Error fetching MJPEG stream:", error);
        ws.close();
    }
}

async function streamMJPEG(ws) {
    try {
        const response = await fetch(MJPEG_URL);
        if (!response.ok) throw new Error(`Failed to fetch MJPEG stream: ${response.status}`);

        const reader = response.body.getReader();
        let buffer = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer.push(...value);

            // Search for JPEG Start & End markers
            let startIdx = buffer.indexOf(0xFF);
            while (startIdx !== -1) {
                if (buffer[startIdx + 1] === 0xD8) { // Start of JPEG (0xFFD8)
                    let endIdx = buffer.indexOf(0xFF, startIdx + 2);
                    while (endIdx !== -1) {
                        if (buffer[endIdx + 1] === 0xD9) { // End of JPEG (0xFFD9)
                            // Extract full JPEG frame
                            let jpegFrame = buffer.slice(startIdx, endIdx + 2);
                            ws.send(Buffer.from(jpegFrame)); // Send only full frames

                            // Remove processed frame from buffer
                            buffer = buffer.slice(endIdx + 2);
                            break;
                        }
                        endIdx = buffer.indexOf(0xFF, endIdx + 1);
                    }
                }
                startIdx = buffer.indexOf(0xFF, startIdx + 1);
            }
        }

    } catch (error) {
        console.error("Error fetching MJPEG stream:", error);
        ws.close();
    }
}

ws.onopen = async () => {
	
	ws.send("sender")

   try {
        const response = await fetch(MJPEG_URL);
        if (!response.ok) throw new Error(`Failed to fetch MJPEG stream: ${response.status}`);

        const reader = response.body.getReader();
        let buffer = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer.push(...value);

            // Search for JPEG Start & End markers
            let startIdx = buffer.indexOf(0xFF);
            while (startIdx !== -1) {
                if (buffer[startIdx + 1] === 0xD8) { // Start of JPEG (0xFFD8)
                    let endIdx = buffer.indexOf(0xFF, startIdx + 2);
                    while (endIdx !== -1) {
                        if (buffer[endIdx + 1] === 0xD9) { // End of JPEG (0xFFD9)
                            // Extract full JPEG frame
                            let jpegFrame = buffer.slice(startIdx, endIdx + 2);
                            ws.send(Buffer.from(jpegFrame)); // Send only full frames

                            // Remove processed frame from buffer
                            buffer = buffer.slice(endIdx + 2);
                            break;
                        }
                        endIdx = buffer.indexOf(0xFF, endIdx + 1);
                    }
                }
                startIdx = buffer.indexOf(0xFF, startIdx + 1);
            }
        }

    } catch (error) {
        console.error("Error fetching MJPEG stream:", error);
        ws.close();
    }

}


const input_websocket = new WebSocket("http://192.168.1.101:3000");

input_websocket.onerror = e => {
	console.log(e)
}

ws.onmessage = (proto) => {

	try {
	
		if(input_websocket.OPEN){
			input_websocket.send((proto.data))
		}
		

	}catch(e){
	}

}

ws.onclose = () => {
	console.log("websocket closed")
}
