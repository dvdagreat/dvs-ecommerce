import { Router } from "express";
import RequestValidator from "./middleware/RequestValidator";
import UserController from "./UserController";

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', RequestValidator.getUserById, UserController.getUserById);
userRouter.post('/', RequestValidator.createUser, UserController.createUser);
userRouter.delete('/:id', RequestValidator.deleteUser, UserController.deleteUser);
userRouter.patch('/:id', RequestValidator.patchUser, UserController.patchUser);

export default userRouter;