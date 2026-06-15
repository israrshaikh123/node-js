const express = require('express')
const router = express.Router()

const dashboardController = require('../controllers/dashboardController')

router.get('/',dashboardController.index)
router.get('/tables',dashboardController.tables)
router.get('/forms' , dashboardController.forms)
router.get('/login' , dashboardController.login)
router.get('/mailbox' , dashboardController.mailbox)

module.exports = router