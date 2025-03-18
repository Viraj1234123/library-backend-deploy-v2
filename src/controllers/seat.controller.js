import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Seat } from "../models/seat.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { SeatBooking } from "../models/seatBooking.model.js";
import { Student } from "../models/student.model.js";

const getSeats = asyncHandler(async(req, res) => {
    const seats = await Seat.find()
    return res.status(200).json(
        new ApiResponse(200, seats, "Seats fetched successfully")
    )
});

const getSeat = asyncHandler(async(req, res) => {
    const seat = await Seat.findById(req.params.id)
    if (!seat) {
        throw new ApiError(404, "Seat not found")
    }
    return res.status(200).json(
        new ApiResponse(200, seat, "Seat fetched successfully")
    )
});

const addSeat = asyncHandler(async(req, res) => {
    const { seatType, seatNumber, floor } = req.body

    if(!seatType || !seatNumber || !floor){
        throw new ApiError(400, "All fields are required")
    }

    if(seatNumber < 1){
        throw new ApiError(400, "Seat number cannot be less than 1");
    }

    const existingSeat = await Seat.findOne({ seatType: seatType, seatNumber: seatNumber, floor: floor });
    
    if(existingSeat) {
        throw new ApiError(409, "This seat already exists");
    }

    const seat = await Seat.create({ seatType, seatNumber, floor })

    if(!seat){
        throw new ApiError(500, "Error while adding seat")
    }

    return res.status(201).json(
        new ApiResponse(201, seat, "Seat added successfully")
    )
});

const updateSeat = asyncHandler(async(req, res) => {
    const { seatType, seatNumber, floor, isAvailable } = req.body

    if(!seatType && !seatNumber && !floor && !isAvailable){
        throw new ApiError(400, "Some field is required")
    }

    const seat = await Seat.findById(req.body.id);

    if(seatType){
        seat.seatType = seatType
    }
    if(seatNumber){
        seat.seatNumber = seatNumber
    }
    if(floor){
        seat.floor = floor
    }
    if(isAvailable){
        seat.isAvailable = isAvailable
    }

    await seat.save()

    if(!seat){
        throw new ApiError(500, "Error while updating seat")
    }

    return res.status(200).json(
        new ApiResponse(200, seat, "Seat updated successfully")
    )
});

const deleteSeat = asyncHandler(async(req, res) => {
    const seat = await Seat.findById(req.body.id)
    if (!seat) {
        throw new ApiError(404, "Seat not found")
    }
    const seatBookings = await SeatBooking.find({ seatId: seat._id });

    const session = await Seat.startSession();
    session.startTransaction();

    try{
        for (let i = 0; i < seatBookings.length; i++) {
            if(seatBookings[i].startTime > new Date()){
                const student = await Student.findById(seatBookings[i].studentId);
                if(seatBookings[i].startTime.getDate() === new Date().getDate()){
                    student.bookedSeatHours -= 1;
                }
                else{
                    student.bookedSeatHoursForTomorrow -= 1;
                }
                await student.save({session});
            }
            await seatBookings[i].deleteOne({ _id: seatBookings[i]._id }).session(session);
        }
        await seat.deleteOne({ _id: seat._id }).session(session);
        await session.commitTransaction();
        return res.status(200).json(
            new ApiResponse(200, {}, "Seat deleted successfully")
        )
    }
    catch (error) {
        await session.abortTransaction();
        throw new ApiError(500, "Internal Server Error");
    }
    finally {
        session.endSession();
    }
});

export { getSeats, getSeat, addSeat, updateSeat, deleteSeat }