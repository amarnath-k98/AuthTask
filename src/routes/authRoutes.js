import { Router } from "express";
import { getUser, login, register } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";



const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getUser);


export default authRouter;