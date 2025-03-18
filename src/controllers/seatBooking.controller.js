import { SeatBooking } from '../models/seatBooking.model.js';
import { Seat } from '../models/seat.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Student } from '../models/student.model.js';
import transporter from '../utils/email.js';
import { seatBookedMailHTML, cancelSeatBookingMailHTML, rejectSeatBookingMailHTML } from '../utils/mails.js';
import cron from 'node-cron';

const maxBookedSeatHoursPerDay = 5;

const bookSeat = asyncHandler(async (req, res) => {
    const { seatId } = req.body;
    let startHour = req.body.startTime;
    const student = req.student;
    const now = new Date();
    let startTime = startHour;

    if (!student) {
        throw new ApiError(404, 'Student not found');
    }

    const studentId = student._id;

    if ([seatId, startTime, studentId].some((field) => field == undefined)) {
        throw new ApiError(400, 'All fields are required');
    }

    if(startTime < 0 || startTime > 23){
        throw new ApiError(400, 'Invalid start time');
    }

    startTime = new Date().setHours(startTime,0,0,0);

    let endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    if(endTime < now){
        startTime = new Date(new Date().setDate(now.getDate() + 1)).setHours(startHour,0,0,0);
        endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1);
    }

    startTime = new Date(startTime);

    if(new Date().getHours() == 23 && new Date().getMinutes() > 55){
        throw new ApiError(400, 'Bookings cannot be made between 11:55 PM to 12:00 AM');
    }

    const seat = await Seat.findById(seatId);
    if (!seat) {
        throw new ApiError(404, 'Seat not found');
    }

    const existingBooking = await SeatBooking.findOne({ seatId, startTime });
    if (existingBooking) {
        throw new ApiError(400, 'Seat already booked');
    }

    const existingBookingForStudent = await SeatBooking.findOne({ studentId, startTime });
    if (existingBookingForStudent) {
        throw new ApiError(400, 'Student already has a seat booked for this time');
    }

    if (student.bookedSeatHours >= 5 && startTime.getDate() == new Date().getDate()) {
        throw new ApiError(400, 'Student has already booked seats for 5 hours for today');
    }

    if (student.bookedSeatHoursForTomorrow >= 5 && startTime.getDate() != new Date().getDate()) {
        throw new ApiError(400, 'Student has already booked seats for 5 hours for tomorrow');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newBooking = await SeatBooking.create(
            [
                {
                    studentId,
                    seatId,
                    startTime,
                    endTime,
                },
            ],
            { session }
        );

        if(startTime.getDate() != new Date().getDate()){
            student.bookedSeatHoursForTomorrow += 1;
        }
        else{
            student.bookedSeatHours += 1;
        }
        await student.save({ session });

        await session.commitTransaction();

        res.status(201).json(new ApiResponse(201, newBooking[0], 'Seat booked successfully'));

        const seat = await Seat.findById(seatId);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: 'Seat booked successfully in the library',
            html: seatBookedMailHTML(student.name, startTime, endTime, seat.seatNumber, seat.seatType, seat.floor),
        };

        try{
            await transporter.sendMail(mailOptions)
        }
        catch(error){
            console.log('Error sending mail');
        }

        return;

    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, error.message || 'An error occurred while booking seat');
    }
    finally {
        await session.endSession();
    }
});

const bookSeatByAdmin = asyncHandler(async (req, res) => {
    const { seatNumber, seatType, floor, rollNo } = req.body;
    let startHour = req.body.startTime;
    const student = await Student.findOne({ rollNo });

    const now = new Date();
    let startTime = startHour;

    const seat = await Seat.findOne({ seatNumber, seatType, floor });
    if (!seat) {
        throw new ApiError(404, 'Seat not found');
    }

    if (!student) {
        throw new ApiError(404, 'Student not found');
    }

    const studentId = student._id;
    const seatId = seat._id;

    if ([seatId, startTime, studentId].some((field) => field == undefined)) {
        throw new ApiError(400, 'All fields are required');
    }

    if(startTime < 0 || startTime > 23){
        throw new ApiError(400, 'Invalid start time');
    }

    startTime = new Date().setHours(startTime,0,0,0);

    let endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    if(endTime < now){
        startTime = new Date(new Date().setDate(now.getDate() + 1)).setHours(startHour,0,0,0);
        endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1);
    }

    startTime = new Date(startTime);

    if(new Date().getHours() == 23 && new Date().getMinutes() > 55){
        throw new ApiError(400, 'Bookings cannot be made between 11:55 PM to 12:00 AM');
    }

    const existingBooking = await SeatBooking.findOne({ seatId, startTime });
    if (existingBooking) {
        throw new ApiError(400, 'Seat already booked');
    }

    const existingBookingForStudent = await SeatBooking.findOne({ studentId, startTime });
    if (existingBookingForStudent) {
        throw new ApiError(400, 'Student already has a seat booked for this time');
    }

    if (student.bookedSeatHours >= 5 && startTime.getDate() == new Date().getDate()) {
        throw new ApiError(400, 'Student has already booked seats for 5 hours for today');
    }

    if (student.bookedSeatHoursForTomorrow >= 5 && startTime.getDate() != new Date().getDate()) {
        throw new ApiError(400, 'Student has already booked seats for 5 hours for tomorrow');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const newBooking = await SeatBooking.create(
            [
                {
                    studentId,
                    seatId,
                    startTime,
                    endTime,
                },
            ],
            { session }
        );

        if(startTime.getDate() != new Date().getDate()){
            student.bookedSeatHoursForTomorrow += 1;
        }
        else{
            student.bookedSeatHours += 1;
        }
        await student.save({ session });

        await session.commitTransaction();

        res.status(201).json(new ApiResponse(201, newBooking[0], 'Seat booked successfully'));

        const seat = await Seat.findById(seatId);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: 'Seat booked successfully in the library',
            html: seatBookedMailHTML(student.name, startTime, endTime, seat.seatNumber, seat.seatType, seat.floor),
        };

        try{
            await transporter.sendMail(mailOptions)
        }
        catch(error){
            console.log('Error sending mail');
        }

        return;

    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, error.message || 'An error occurred while booking seat');
    }
    finally {
        await session.endSession();
    }

});

const cancelBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const student = req.student;

    if (!student) {
        throw new ApiError(404, 'Student not found');
    }

    const booking = await SeatBooking.findById(bookingId);
    if (!booking) {
        throw new ApiError(404, 'Booking not found');
    }

    if (booking.studentId.toString() !== student._id.toString()) {
        throw new ApiError(403, 'Unauthorized');
    }

    if(booking.startTime < new Date()){
        throw new ApiError(400, 'Cannot cancel past bookings');
    }

    const seat = await Seat.findById(booking.seatId);
    const startTime = booking.startTime;
    const endTime = booking.endTime;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await SeatBooking.deleteOne({ _id: bookingId }).session(session);

        student.bookedSeatHours -= 1;
        await student.save({ session });

        await session.commitTransaction();

        res.status(200).json(new ApiResponse(200, {}, 'Booking cancelled successfully'));

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: 'Seat booking cancelled in the library',
            html: cancelSeatBookingMailHTML(student.name, startTime, endTime, seat.seatNumber, seat.seatType, seat.floor),
        };

        try{
            await transporter.sendMail(mailOptions)
        }
        catch(error){
            console.log('Error sending mail');
        }

        return; 
    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, error.message || 'An error occurred while cancelling booking');
    }
    finally {
        await session.endSession();
    }
});

const getBookingsOfStudent = asyncHandler(async (req, res) => {
    const student = req.student;

    if (!student) {
        throw new ApiError(404, 'Student not found');
    }

    const bookings = await SeatBooking.find({ studentId: student._id });

    return res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched successfully'));
});

const getAllBookings = asyncHandler(async (req, res) => {

    const bookings = await SeatBooking.find().populate('seatId','-createdAt -updatedAt').populate('studentId','-password -refreshToken -createdAt -updatedAt');

    return res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched successfully'));
});

const getBookingsOfStudentWithSeatDetails = asyncHandler(async (req, res) => {
    const student = req.student;

    if (!student) {
        throw new ApiError(404, 'Student not found');
    }

    const bookings = await SeatBooking.find({ studentId: student._id }).populate('seatId', '-createdAt -updatedAt');

    return res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched successfully'));
});

const getBookingsByStudentId = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    if (!student) {
        throw new ApiError(404, 'Student not found');
    }

    const bookings = await SeatBooking.find({ studentId });

    return res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched successfully'));
});

const getBookingsBySeatId = asyncHandler(async (req, res) => {
    const { seatId } = req.params;

    const seat = await Seat.findById(seatId);

    if (!seat) {
        throw new ApiError(404, 'Seat not found');
    }

    const bookings = await SeatBooking.find({ seatId });

    return res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched successfully'));
});

const getBookingsBySeatIdForToday = asyncHandler(async (req, res) => {
    const { seatId } = req.params;

    const seat = await Seat.findById(seatId);

    if (!seat) {
        throw new ApiError(404, 'Seat not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookings = await SeatBooking.find({ seatId, startTime: { $gte: today } });

    return res.status(200).json(new ApiResponse(200, bookings, 'Bookings fetched successfully'));
});

const rejectBooking = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;

    const booking = await SeatBooking.findById(bookingId);

    if (!booking) {
        throw new ApiError(404, 'Booking not found');
    }

    if(booking.startTime < new Date()){
        throw new ApiError(400, 'Cannot reject past bookings');
    }

    const startTime = booking.startTime;
    const endTime = booking.endTime;
    const seat = await Seat.findById(booking.seatId);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await SeatBooking.deleteOne({ _id: bookingId }).session(session);

        const student = await Student.findById(booking.studentId);
        student.bookedSeatHours -= 1;
        await student.save({ session });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: 'Seat booking rejected by the library',
            html: rejectSeatBookingMailHTML(student.name, startTime, endTime, seat.seatNumber, seat.seatType, seat.floor),
        };

        try{
            await transporter.sendMail(mailOptions)
        }
        catch(error){
            throw new ApiError(500, error.message || 'Error sending mail');
        }

        await session.commitTransaction();

        return res.status(200).json(new ApiResponse(200, {}, 'Booking rejected successfully'));
    } catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, error.message || 'An error occurred while rejecting booking');
    }
    finally {
        await session.endSession();
    }
});

const getAvailableSeatsByStartTime = asyncHandler(async (req, res) => {
    const { seatType, floor } = req.query;
    let startTime = req.query.startTime;
    startTime = new Date().setHours(startTime,0,0,0);
    startTime = new Date(startTime);

    if ([startTime, seatType, floor].some((field) => field == undefined || field == '' || field == 0)) {
        throw new ApiError(400, 'All fields are required');
    }

    if(startTime < 0 || startTime > 23){
        throw new ApiError(400, 'Invalid start time');
    }

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    if(endTime < new Date()){
        startTime = new Date().setDate(new Date().getDate() + 1);
        startTime = new Date(startTime);
    }

    const bookings = await SeatBooking.find({ startTime });

    const seats = await Seat.find({ seatType, floor });

    const bookedSeatIds = new Set(bookings.map((booking) => booking.seatId.toString()));

    const availableSeats = seats.filter((seat) => !bookedSeatIds.has(seat._id.toString()));

    return res.status(200).json(new ApiResponse(200, availableSeats, 'Available seats fetched successfully'));

});


try{
    cron.schedule('56 23 * * *', () => {
        Student.updateMany({}, { bookedSeatHours: bookedSeatHoursForTomorrow, bookedSeatHoursForTomorrow: 0 }).then(() => {
            console.log('Reset booked seat hours');
        });
    });
}
catch(err){
    console.log('Error resetting booked seat hours');
}

export { getAllBookings, bookSeat, bookSeatByAdmin, cancelBooking, getBookingsOfStudent, getBookingsByStudentId, getBookingsBySeatId, getBookingsBySeatIdForToday, rejectBooking, getBookingsOfStudentWithSeatDetails, getAvailableSeatsByStartTime };