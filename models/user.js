import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    phoneNumber: {
        countryCode: String,
        number: String
    },
    creationDate: Date
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema);