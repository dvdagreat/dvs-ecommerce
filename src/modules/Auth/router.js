import { Router } from "express";
import AuthController from "./AuthController";
import RequestValidator from "./middleware/RequestValidator";

const authRouter = Router();

authRouter.post('/login', RequestValidator.login, AuthController.login);
authRouter.post('/register', RequestValidator.register, AuthController.register);

export default authRouter;