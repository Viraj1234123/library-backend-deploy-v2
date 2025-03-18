import {Router} from 'express';
import {addComplaint, deleteComplaint, getComplaint, getComplaints, updateComplaint} from '../controllers/complaint.controller.js';
import { verifyJWTAdmin } from '../middlewares/auth.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { uploadMultiple } from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/").get(verifyJWT, getComplaints);
router.route("/").post(verifyJWT, uploadMultiple, addComplaint);
router.route("/:id").get(verifyJWT, getComplaint);
router.route("/:id").patch(verifyJWTAdmin, updateComplaint);
router.route("/:id").delete(verifyJWTAdmin, deleteComplaint);

export default router;