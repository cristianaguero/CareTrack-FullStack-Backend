import Doctor from "../models/DoctorModel.js";
import jwtGenerator from "../helpers/jwtGenerator.js";
import { userExist, tokenExist } from "../services/DoctorService.js";
import idGenerator from "../helpers/idGenerator.js";

const register = async (req, res) => {
    const { email } = req.body;

    const doctor = await userExist(email);

    if (doctor) {
        const error = new Error("User already exists");
        return res.status(400).json({ message: error.message });
    } else {
        try {
            const doctor = await Doctor.create(req.body);
            const newDoctor = await doctor.save();

            res.json(newDoctor)

        } catch (error) {
            console.log(error);
        }
    }
}

const confirmAccount = async (req, res) => {
    const { token } = req.params;

    const doctor = await tokenExist(token);

    if (!doctor) {
        const error = new Error("Invalid token");
        return res.status(400).json({ message: error.message });
    } else {
        try {
            doctor.confirmed = true;
            doctor.token = null;
            await doctor.save();
            res.json({ message: "Account confirmed" })
        } catch (error) {
            console.log(error);
        }
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    const doctor = await userExist(email);

    if(!doctor) {    
        const error = new Error("Invalid credentials");
        return res.status(400).json({ message: error.message });
    }

    if(!doctor.confirmed) {
        const error = new Error("Account not confirmed");
        return res.status(400).json({ message: error.message });
    }

    if(await doctor.comparePassword(password)) {
        res.json({ token: jwtGenerator(doctor._id) });
    } else {
        const error = new Error("Invalid credentials");
        return res.status(400).json({ message: error.message });
    }
}

const profile = async (req, res) => {
    res.json({"doctor" : req.doctor});
}

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    const doctor = await userExist(email);

    if(!doctor) {
        const error = new Error("User not found");
        return res.status(400).json({ message: error.message });
    } else {
        try {
            doctor.token = idGenerator();
            await doctor.save();
            res.json({ message: 'We have sent an email with the instructions' })
        } catch (error) {
            console.log(error);
        }
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params;

    const validToken = await Doctor.findOne({ token });

    if(validToken) {
        res.json({ message: 'Token is valid' })
    } else {
        const error = new Error("Invalid token");
        return res.status(400).json({ message: error.message });
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const doctor = await tokenExist(token);

    if(!doctor) {
        const error = new Error("Invalid token");
        return res.status(400).json({ message: error.message });
    } else {
        try {
            doctor.password = password;
            doctor.token = null;
            await doctor.save();
            res.json({ message: 'Password changed' })
        } catch (error) {
            console.log(error);
        }
    }
}


export {
    register,
    confirmAccount,
    authenticate,
    profile,
    forgetPassword,
    checkToken,
    newPassword
};
