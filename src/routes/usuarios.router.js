import express from "express";
import {Router} from 'express'
import { getUser, getUserById, createUser, updateUser, deleteUser, userForm, userSession} from "../Controllers/usuariosControllers.js";

const router = Router()


//desde aca llamos a mis endpoint desde controllers

router.get("/register", userForm)
router.get("/login", userSession)
router.get("/", getUser)
router.get("/uid:", getUserById)
router.put('/', saveUser)
router.post('/register', createUser)
router.post('/login', userSession)



export default router
