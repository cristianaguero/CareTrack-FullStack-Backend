import jwt from 'jsonwebtoken';

const jwtGenerator = (user_id) => {
    return jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: "5d" });
}

export default jwtGenerator;