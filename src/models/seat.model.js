import mongoose,{ Schema } from "mongoose";

const seatSchema = new Schema(
    {
        seatType: {
            type: String,
            enum: ["cubicle", "seat", "technobooth", "GDTable"],
            required: true
        },
        seatNumber: {
            type: Number,
            required: true
        },
        floor: {
            type: Number,
            enum: [1, 2],
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);

seatSchema.index({ seatType: 1, seatNumber: 1, floor: 1 }, { unique: true });

export const Seat = mongoose.model("Seat", seatSchema);