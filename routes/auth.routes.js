import express from 'express'
import { Logout, login, register } from '../controllers/auth.controller.js'
const router = express.Router()
router.post("/login", login)
router.post("/register", register)
router.get("/logout", Logout)
export default router