import Doctor from "../models/DoctorModel.js";

const userExist = async (email) => {
    console.log("trying to find the user with the email of " + email)
    const user = await Doctor.findOne({ email });
    console.log("found the user with the email " + user)
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