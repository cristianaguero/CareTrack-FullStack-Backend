import mongoose from "mongoose";
import idGenerator from "../helpers/idGenerator.js";
import bcrypt from "bcrypt";

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    speciality: {
        type: String,
        default: null,
    },
    hospital: {
        type: String,
        default: null,
    },
    location: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    token: {
        type: String,
        default: idGenerator(),
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    }]
}, {
    timestamps: true,
    });

DoctorSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

DoctorSchema.methods.comparePassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;