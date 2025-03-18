import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
import cron from 'node-cron'

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

// To keep website alive
cron.schedule("*/1 * * * *", async () => {
    console.log("Running every 1 minutes")
})