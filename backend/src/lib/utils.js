import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })
    // here we have created a Token

    
    // here we have send a cooki to use in only HTTP
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, // MS
        httpOnly: true, // prevent XSS ATTACKS 
        sameSite:"strict", // CSRF attacks
        secure: process.env.NODE_ENV  !=="development"
    })

    return token
}