import Patient from "../models/PatientModel.js";

const addPatient = async (req, res) => {

    const patient = new Patient(req.body);
    patient.doctor = req.doctor._id;

    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    }
    catch (error) {
        console.log(error);
    }
}

const getPatients = async (req, res) => {
    const patients = await Patient.find().where('doctor').equals(req.doctor);
    res.json(patients);
}

const getPatient = async (req, res) => {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    if (patient.doctor._id.toString() !== req.doctor._id.toString()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.json(patient);
}

const updatePatient = async (req, res) => {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    if (patient.doctor._id.toString() !== req.doctor._id.toString()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log(req.body.appointment)

    patient.name = req.body.name || patient.name;
    patient.surname = req.body.surname || patient.surname;
    patient.email = req.body.email || patient.email;
    patient.phone = req.body.phone || patient.phone;
    patient.residence = req.body.residence || patient.residence;
    patient.birthdate = req.body.birthdate || patient.birthdate;
    patient.pre_existing_diseases = req.body.pre_existing_diseases || patient.pre_existing_diseases;
    patient.allergies = req.body.allergies || patient.allergies;
    patient.family_background = req.body.family_background || patient.family_background;
    patient.height = req.body.height || patient.height;
    patient.weight = req.body.weight || patient.weight;
    patient.blood_type = req.body.blood_type || patient.blood_type;
    patient.current_medications = req.body.current_medications || patient.current_medications;
    patient.appointment = req.body.appointment || patient.appointment;
    patient.diagnosis = req.body.diagnosis || patient.diagnosis;
    patient.current_treatment = req.body.current_treatment || patient.current_treatment;
    patient.clinical_history = req.body.clinical_history || patient.clinical_history;
    patient.other_notes = req.body.other_notes || patient.other_notes;


    try{
        const updatedPatient = await patient.save();
        res.json(updatedPatient);
    } catch (error) {
        console.log(error);
    }
}

const deletePatient = async (req, res) => {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    if (patient.doctor._id.toString() !== req.doctor._id.toString()) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        await patient.deleteOne();
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}

export {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
}
