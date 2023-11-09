import Doctor from "../models/DoctorModel.js";
import jwtGenerator from "../helpers/jwtGenerator.js";
import { userExist, tokenExist } from "../services/DoctorService.js";
import idGenerator from "../helpers/idGenerator.js";
import emailRegister from "../helpers/emailRegister.js";
import emailForgetPassword from "../helpers/emailForgetPassword.js";


const register = async (req, res) => {
    const { email } = req.body;

    const doctor = await userExist(email);

    if (doctor) {
        const error = new Error("User already exists");
        return res.status(400).json({ message: error.message });
    } else {
        try {
            const doctor = new Doctor(req.body);
            doctor.token = idGenerator();
            await doctor.save();

            emailRegister({email: doctor.email, name: doctor.name, surname: doctor.surname, token: doctor.token});


            res.json({ message: "Doctor created successfully", doctor})

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
    let doctor = null;
    try{
         doctor = await userExist(email);
    } catch (error) {
        console.log(error);
    }
   

    if(!doctor) {    
        const error = new Error("Invalid credentials");
        return res.status(400).json({ message: error.message });
    }

    if(!doctor.confirmed) {
        const error = new Error("Account not confirmed");
        return res.status(400).json({ message: error.message });
    }

    if(await doctor.comparePassword(password)) {
        res.json({ 
            _id: doctor._id,
            name: doctor.name,
            surname: doctor.surname,
            email: doctor.email,
            confirmed: doctor.confirmed,
            token: jwtGenerator(doctor._id) });
    } else {
        const error = new Error("Invalid credentials");
        return res.status(400).json({ message: error.message });
    }
}

const profile = async (req, res) => {
    res.json(req.doctor);
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

            emailForgetPassword({email: doctor.email, name: doctor.name, surname: doctor.surname, token: doctor.token});

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
        res.json({ message: 'Set a new password' })
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
            res.json({ message: 'Password changed successfully' })
        } catch (error) {
            console.log(error);
        }
    }
}

const updateProfile = async (req, res) => {
    const { name, surname, speciality, hospital, location, phone } = req.body;

    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if(!doctor) {
        const error = new Error("User not found");
        return res.status(400).json({ message: error.message });
    } else {
        try {
            doctor.name = name || doctor.name;
            doctor.surname = surname || doctor.surname;
            doctor.speciality = speciality || doctor.speciality;
            doctor.hospital = hospital || doctor.hospital;
            doctor.location = location || doctor.location;
            doctor.phone = phone || doctor.phone;

            const updatedProfile = await doctor.save();

            res.json({ message: 'Profile updated succesfully', updatedProfile})

        } catch (error) {
            console.log(error);
        }
    }
}

const updatePassword = async (req, res) => {
const { currentPassword, newPassword } = req.body;

    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if(!doctor) {
        const error = new Error("User not found");
        return res.status(400).json({ message: error.message });
    }

    if(await doctor.comparePassword(currentPassword)) {
        try {
            doctor.password = newPassword;
            await doctor.save();
            res.json({ message: 'Password changed successfully' })
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error("Invalid credentials");
        return res.status(400).json({ message: error.message });
    }
}


export {
    register,
    confirmAccount,
    authenticate,
    profile,
    forgetPassword,
    checkToken,
    newPassword,
    updateProfile,
    updatePassword
};
