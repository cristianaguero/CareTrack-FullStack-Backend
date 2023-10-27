import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    residence: {
        type: String,
        default: null,
    },
    birthdate: {
        type: Date,
        default: null,
    },
    pre_existing_diseases: {
        type: String,
        default: null,
    },
    allergies: {
        type: String,
        default: null,
    },
    family_background: {
        type: String,
        default: null,
    },
    height: {
        type: String,
        default: null,
    },
    weight: {
        type: String,
        default: null,
    },
    reason_for_visit: {
        type: String,
        default: null,
    },
    blood_type: {
        type: String,
        default: null,
    },
    current_medications: {
        type: String,
        default: null,
    },
    next_appointment: {
        type: Date,
        default: null,
    },
    current_symptoms: {
        type: String,
        default: null,
    },
    current_treatment: {
        type: String,
        default: null,
    },
    diagnosis: {
        type: String,
        default: null,
    },
    clinical_history: [{
        type: String,
        default: null,
    }],
    other_notes: {
        type: String,
        default: null,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    }
}, {
    timestamps: true,
});

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;