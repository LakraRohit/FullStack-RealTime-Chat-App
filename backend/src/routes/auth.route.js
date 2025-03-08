import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", signup);
//     (req, res) => {
//     res.send("SignUp Route");
// }); Removing this part to Controller as this will get lenthy

router.post("/login", login);

router.post("/logout", logout);



router.put("/update-profile", protectRoute ,updateProfile)

router.get("/check", protectRoute, checkAuth)

export default router;
