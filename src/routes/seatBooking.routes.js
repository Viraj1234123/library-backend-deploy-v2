import { Router } from 'express';
import { getAllBookings, bookSeat, bookSeatByAdmin, cancelBooking, getBookingsByStudentId, getBookingsBySeatId, getBookingsBySeatIdForToday, rejectBooking, getBookingsOfStudent, getBookingsOfStudentWithSeatDetails, getAvailableSeatsByStartTime } from '../controllers/seatBooking.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { verifyJWTAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/").get(verifyJWTAdmin, getAllBookings);
router.route("/book-seat").post(verifyJWT, bookSeat);
router.route("/cancel-booking/:bookingId").delete(verifyJWT, cancelBooking);
router.route("/get-all-of-student").get(verifyJWT, getBookingsOfStudent);
router.route("/get-all-of-student-with-seat-details").get(verifyJWT,getBookingsOfStudentWithSeatDetails);
router.route("/get-by-student-id/:studentId").get(verifyJWTAdmin, getBookingsByStudentId);
router.route("/get-by-seat-id/:seatId").get(verifyJWT, getBookingsBySeatId);
router.route("/get-by-seat-id-for-today/:seatId").get(verifyJWT, getBookingsBySeatIdForToday);
router.route("/reject-booking").delete(verifyJWTAdmin, rejectBooking);
router.route("/book-seat-by-admin").post(verifyJWTAdmin, bookSeatByAdmin);
router.route("/get-available-seats-by-slot").get(verifyJWT, getAvailableSeatsByStartTime);

export default router;