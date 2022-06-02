import dotenv from 'dotenv';
import axios from 'axios';
import http from 'http';
import { v4 } from 'uuid';

dotenv.config();

const PORT = process.env.PORT ?? 4500;
const DELAY = process.env.DELAY ?? 5000;
const mode = process.env.MODE ?? 'producer';
const ATTEMPT_HEADER = 'x-attempt';

if (mode === 'consumer') {
    let failedCount = 0;
    let attemptCount = 0;
    
    const fetcher = () => new Promise((resolve) => {
        setTimeout(async () => {
            try {
                attemptCount++;
                
                if (failedCount > 0) {
                    console.log(`Request #${attemptCount} initiated. Retry attempt #${failedCount}`);
                } else {
                    console.log(`Request #${attemptCount} initiated.`);
                }

                const result = await axios.get(`http://localhost:${PORT}`, { headers: { [ATTEMPT_HEADER]: attemptCount.toString() }});
                failedCount = 0;
                resolve(result.data);
            } catch (e) {
                failedCount++;
                console.error('Failed to fetch.', e.message);
                resolve(null);
            }
        }, DELAY);
    });

    while(true) {
        const msg = await fetcher();
        if (msg) {
            console.log(msg);
        }
    }
} else {
    http.createServer((req, res) => {
        const requestIndex = req.headers[ATTEMPT_HEADER] ?? 'N/A';
        console.log(`Request #${requestIndex} received.`);
        const randomNumber = v4();
        res.writeHead(200);
        res.write(`Your random guid is ${randomNumber} - generated at ${new Date().toISOString()}`);
        res.end();
    }).listen(PORT);
};
