import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        countryCode: String,
        number: String,
        msisdn: {
            type: String,
        }
    },

}, {
    timestamps: true,
});

export default mongoose.model('TempUser', tempUserSchema);