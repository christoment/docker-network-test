import dotenv from 'dotenv';
import axios from 'axios';
import http from 'http';
import { v4 } from 'uuid';

dotenv.config();

const PORT = process.env.PORT ?? 4500;
const DELAY = process.env.DELAY ?? 5000;
const mode = process.env.MODE ?? 'producer';

if (mode === 'consumer') {
    const fetcher = () => new Promise((resolve) => {
        setTimeout(async () => {
            try {
                const result = await axios.get(`http://localhost:${PORT}`);
                resolve(result.data);
            } catch (e) {
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
        res.writeHead(200);
        const randomNumber = v4();
        res.write(`Your random guid is ${randomNumber} - generated at ${new Date().toISOString()}`);
        res.end();
    }).listen(PORT);
};
