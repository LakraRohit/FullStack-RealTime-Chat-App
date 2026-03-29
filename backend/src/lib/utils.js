import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })
    // here we have created a Token

    
    // here we have send a cooki to use in only HTTP
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks
        sameSite: isProduction ? "none" : "strict", // "none" required for cross-origin on Railway
        secure: isProduction, // must be true when sameSite is "none"
    })

    return token
}