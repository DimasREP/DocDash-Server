'use strict'
const express = require('express')
const users = require('../controllers/usersController')

const router = express.Router()

router.get(`/api/v1/user`, users.index)

module.exports = router