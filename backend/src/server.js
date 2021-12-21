import {WebSocketServer} from 'ws';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv-defaults';
import express from 'express';
dotenv.config();
const url = process.env.MONGO_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("mongo db connection created"));
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});
const db = mongoose.connection;
db.once('open',() => {
    wss.on('connection', (ws) => {
        
    })
    const PORT = process.env.port || 4000;
    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
})
