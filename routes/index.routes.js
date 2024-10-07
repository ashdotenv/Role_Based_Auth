import express from 'express'
import authRoute from './auth.routes.js'
import adminRoute from './admin.routes.js'
import userRoute from './user.routes.js'
import { isAdmin, isUser, verifyToken } from '../middleware/auth.js'
const router = express.Router()
router.use("/auth", authRoute)
router.use("/admin", verifyToken, isAdmin, adminRoute)
router.use("/user", verifyToken, isUser, userRoute)
export default router