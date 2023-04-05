import express from 'express'
import handlers from '../handlers/login.js'

const router = express.Router()
router.post("/", handlers.login)
router.get("/", handlers.logout)



export default router

