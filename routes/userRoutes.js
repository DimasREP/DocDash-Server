'use strict'
const express = require('express')
const usersController = require('../controllers/usersController')

const router = express.Router()

router.get(`/api/v1/user`, usersController.index)
router.delete(`/api/v1/user/:id`, usersController.destroy)

module.exports = router
