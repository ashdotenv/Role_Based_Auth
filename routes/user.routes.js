import express from 'express'
import { welcomeUser } from '../controllers/user.controller.js'
const router = express.Router()
router.get("/", welcomeUser)
export default router