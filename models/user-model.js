import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName: { 
            type: String, 
            required: true
        },
        lastName: { 
            type: String, 
            required: true
        },
        middleName: { 
            type: String 
        },
        phone: {
            type: String,
            required: true
        },
        role: { 
            type: String, 
            enum: ["organizer", "contractor"], 
            required: true },
        image: {
            type: String,
        },
        password: {
            type: String,
            required: true
        }, 
    },
    { timestamps: true },
)

export default mongoose.model('UserModel', UserSchema)