import mongoose from "mongoose";

const CatergorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
        }
    },
    { timestamps: true },
)

export default mongoose.model('CatergoryModel', CatergorySchema)