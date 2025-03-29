import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from './app.js'
import { WebSocketServer } from 'ws';
dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        const server = app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
            const wss = new WebSocketServer({ server });
            wss.on('connection', ws => {
                ws.on('message', message => {
                    console.log(`Received message => ${message}`);
                    wss.clients.forEach(function each(client) {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(`${message}`);
                        }
                    });
                });
            });
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
