import express from 'express'
import handlers from '../handlers/basic.js'

const router = express.Router()
router.get('/', handlers.home)
router.get("/sobre", handlers.sobre)

router.use(express.static('./public'))
router.use(handlers.notFound)
router.use(handlers.serverError)


export default router

