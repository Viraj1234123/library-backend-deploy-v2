import { Router } from 'express';
import { getSeats, getSeat, addSeat, updateSeat, deleteSeat } from '../controllers/seat.controller.js';
import { verifyJWTAdmin } from '../middlewares/auth.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router()

router.route("/get-all-seats").get(verifyJWT, getSeats)
router.route("/get-seat/:id").get(verifyJWT, getSeat)   
router.route("/").post(verifyJWTAdmin, addSeat)
router.route("/").patch(verifyJWTAdmin, updateSeat)
router.route("/").delete(verifyJWTAdmin, deleteSeat)

export default router