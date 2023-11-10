import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const userSchema = new mongoose.Schema({
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
        unique: true
    },
    phoneNumber: {
        countryCode: String,
        number: String,
        msisdn: {
            type: String,
            unique: true
        }
    },
    tcVersion: String
},{
    timestamps: true,
    autoIndex: true
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

export default mongoose.model('User', userSchema);