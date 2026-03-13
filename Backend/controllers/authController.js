import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signUp = async (req, res) => {
    try {
        const { username, password, email } = req.body

        if (!username || !password || !email) {
            res.status(400).send({ message: "provide all input" })
        }

        let isUser = await User.findOne({ email })
        if (isUser) {
            res.status(400).send({ message: "user already exist" })
        }
        else {
            let hashPassword = await bcrypt.hash(password, 10)
            let userDetail = new User({ ...req.body, password: hashPassword })
            await userDetail.save()
            res.status(201).send({ message: "user created" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).send({ message: "provide all field" })
    }

    let isUser = await User.findOne({ email })
    if (isUser) {
        let matched = await bcrypt.compare(password, isUser.password)
        if (!matched) {
            res.status(400).send({ message: "wrong password" })
        }
        
        const token = jwt.sign({ id: isUser._id }, "projectkey", { expiresIn: "1d" })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        })
        res.status(200).send({ message: "login successfully" })
    }
}


export const logOut = async(req,res)=>{
    req.clearCookie("token")
    res.json("Logged out")
}