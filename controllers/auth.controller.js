import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    const { fullName, username, email, password, role } = req.body
    if (!fullName || !username || !email || !password | !role) {
        return res.status(400).json({ err: "Fill In All Details Carefully" })
    }
    const checkUnique = await User.findOne({
        $or: [{ email: email }, { username: username }]
    });
    if (checkUnique) {
        return res.status(400).json({ err: "UserName or Email Already Exists" })
    }
    if (password.length < 8) {
        return res.status(400).json({ err: "Password Must Be At Least 8 Characters" })
    }
    if (!(email.includes("@"))) {
        return res.status(400).json({ err: "Please Enter a Valid Email" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        username: username,
        email: email,
        fullname: fullName,
        password: hashedPassword,
        role: role
    })
    return res.status(200).json({ message: "User Registered Successfully", newUser })
}
export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ err: "Please Enter Email and Password" })
    }
    const checkEmail = await User.findOne({ email })
    if (!checkEmail) {
        return res.status(400).json({ err: "Email Doesn't Exist" })
    }
    const checkPassword = await bcrypt.compare(password, checkEmail.password)
    if (!checkPassword) {
        return res.status(400).json({ err: "Password doesn't Match" })
    }
    const payload = jwt.sign({
        id: checkEmail._id,
        role: checkEmail.role
    }, process.env.JWT_SECRET)

    return res.status(200).cookie("token", payload, { httpOnly: true, secure: true }).json({ message: "Login Successfull" })
}
export const Logout = (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({ message: "Logged out successfully" });
};
