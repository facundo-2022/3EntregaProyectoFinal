import {Router} from "express";
import { getUser, getUserById, updateUser,createUser, deleteUser, getUserByEmail, /* , userForm  */
userSession} from "../Controllers/usuariosControllers.js";

const router = Router()


//desde aca llamos a mis endpoint desde controllers

/* router.get("/register", userForm) */

router.get("/", getUser)
/* router.get('/register', userForm) */ 
router.get("/:uid", getUserById)
router.post('/register', createUser)
router.post('/:uid', updateUser)
router.delete('/:uid', deleteUser)
router.get("/:email", getUserByEmail)
router.get("/", userSession)



export default router
