import { isAuthenticated, isOwner } from "../middlewares";
import { deleteUser, getAllUsers, updateUser } from "../controllers/user.controller";
import { Router } from "express";

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/deleteUser/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/updateUser/:id', isAuthenticated, isOwner, updateUser);
}