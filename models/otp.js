import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    purpose: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tempUser'  // Assuming your user model's name is 'User'
    },
    otp: String,
    verified: Boolean
}, {
    timestamps: true,
});

export default mongoose.model('OTP', otpSchema);