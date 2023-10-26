import Doctor from "../models/DoctorModel.js";

const userExist = async (email) => {
    const user = await Doctor.findOne({ email });
    return user;
}

const tokenExist = async (token) => {
    const user = await Doctor.findOne({ token });
    return user;
}

export {
    userExist,
    tokenExist
}