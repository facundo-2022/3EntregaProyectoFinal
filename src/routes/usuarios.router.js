import {Router} from "express";
import { getUser, getUserById, updateUser,createUser, deleteUser, getUserByEmail } from "../Controllers/usuariosControllers.js";

const router = Router()


//desde aca llamos a mis endpoint desde controllers

/* router.get("/register", userForm) */

router.get("/", getUser)
router.get("/:uid", getUserById)
router.post('/register', createUser)
router.post('/:uid', updateUser)
router.delete('/:uid', deleteUser)

router.get("/:email", getUserByEmail)




export default router
