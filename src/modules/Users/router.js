import { Router } from "express";
import UserController from "./UserController";

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', UserController.createUser);
userRouter.delete('/:id', UserController.deleteUser);
userRouter.patch('/:id', UserController.patchUser);

export default userRouter;