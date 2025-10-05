import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userPreferencesSchema = new mongoose.Schema({
    notifications: { type: Boolean, default: true },
    dreamAnalysis: { type: Boolean, default: true },
    dataSharing: { type: Boolean, default: false },
}, { _id: false });

const userStatsSchema = new mongoose.Schema({
    totalDreams: { type: Number, default: 0 },
    storiesGenerated: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    totalSleepHours: { type: Number, default: 0 },
}, { _id: false });



const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        age: {
            type: Number,
        },
        preferences: {
            type: userPreferencesSchema,
            default: () => ({}),
        },
        stats: {
            type: userStatsSchema,
            default: () => ({}),
        },
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_SECRET,
        {
            expiresIn: process.env.ACCESS_EXPIRY || "1d"
        }
    );
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_SECRET,
        {
            expiresIn: process.env.REFRESH_EXPIRY || "7d"
        }
    );
}

export const User = mongoose.model("User", userSchema);

