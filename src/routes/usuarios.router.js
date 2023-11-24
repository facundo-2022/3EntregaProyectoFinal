import {Router} from "express";
import { getUser, getUserById, updateUser,createUser, deleteUser, userForm, userSession} from "../Controllers/usuariosControllers.js";

const router = Router()


//desde aca llamos a mis endpoint desde controllers

router.get("/register", userForm)
router.get("/login", userSession)
router.get("/", getUser)
router.get("/uid:", getUserById)
router.post('/register', createUser)
router.post('/login', userSession)
router.delete('/:uid', deleteUser)



export default router
