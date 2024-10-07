import express from 'express'
import { welcomeAdmin } from '../controllers/admin.,controller.js'
const router = express.Router()
router.get("/", welcomeAdmin)
export default router