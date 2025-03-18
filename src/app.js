import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import cron from "node-cron"

const app = express()

app.use(cors({
    origin: [process.env.CORS_ORIGIN1,process.env.CORS_ORIGIN2],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// To keep website alive
cron.schedule("*/10 * * * *", async () => {
    console.log("Running every 10 minutes")
})


//routes import
import studentRouter from './routes/student.routes.js'
import adminRouter from './routes/admin.routes.js'
import bookRouter from './routes/book.routes.js'
import ratingRouter from './routes/rating.routes.js'
import BookIssueRouter from "./routes/bookIssue.routes.js"
import seatRouter from "./routes/seat.routes.js"
import seatBookingRouter from "./routes/seatBooking.routes.js"
import complaintRouter from "./routes/complaint.routes.js"

//routes declaration
app.use("/api/v1/students", studentRouter)
app.use("/api/v1/admins", adminRouter)
app.use("/api/v1/books", bookRouter)
app.use("/api/v1/ratings", ratingRouter)
app.use("/api/v1/issue-books", BookIssueRouter)
app.use("/api/v1/seats", seatRouter)
app.use("/api/v1/seat-bookings", seatBookingRouter)
app.use("/api/v1/complaints", complaintRouter)

export { app }