import mongoose from "mongoose";

const ContractorSchema = new mongoose.Schema(
    {
        // userId: { 
        //     type: mongoose.Schema.Types.ObjectId, 
        //     ref: 'User', 
        //     required: true, 
        //     unique: true
        // },
        category: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "CategoryModel",
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        experienceThumb: {
            type: String,
        },
        rating: {
            type: String,
        },
        reviews: {
            type: Number,
        },
        startPrice: {
            type: Number,
        },
        description: {
            type: String,
        },
        avatar: {
            type: String,
            default: ""
        }
    },
    { timestamps: true },
)

export default mongoose.model('ContractorModel', ContractorSchema)