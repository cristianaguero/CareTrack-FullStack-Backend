import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorModel.js";

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.doctor = await Doctor.findById(decoded.user_id).select("-password -token -confirmed -__v -createdAt -updatedAt")

            return next();
        } catch (error) {
            const e = new Error("Invalid token");
            return res.status(401).json({ message: e.message });
        }
    }

    if (!token) {
        const error = new Error("Invalid token");
        return res.status(401).json({ message: error.message });
    }

    next();
}

export default checkAuth;